import os

import django_filters.rest_framework
from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Category, Listing, Message, Conversation, UserProfile
from .serializers import CategorySerializer, ListingSerializer, MessageSerializer, ConversationSerializer, \
    UserSerializer
from rest_framework import generics


class IndexView(View):
    """Render main page."""

    def get(self, request):
        """Return html for main application page."""

        abspath = open(os.path.join(settings.BASE_DIR, 'static_dist/index.html'), 'r')
        return HttpResponse(content=abspath.read())


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        # print("hello\n")
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        try:
            cate = self.kwargs['cate']
        except KeyError:
            print('in KEYERROR\n')
            return Category.objects.all()

        print('SEARCHING....\n')
        # cate = self.kwargs['cate']
        return Category.objects.filter(name=cate)


class ListFilter(django_filters.rest_framework.FilterSet):
    min_price = django_filters.NumberFilter(name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(name="price", lookup_expr='lte')

    # views = django_filters.NumberFilter(name="views", lookup_expr='exact')
    # title = django_filters.CharFilter(name='title')
    # category = django_filters.CharFilter(name='category__name')

    class Meta:
        model = Listing
        fields = ['price_type', 'sale_type', 'category__name', 'min_price', 'max_price', 'description', 'title',
                  'listing_date', 'views', 'number_of_inquiries']


# class ListingViewSet(generics.ListAPIView):
class ListingViewSet(viewsets.ModelViewSet):
    print("IN LISTINGVIEWSET")
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    filter_backends = (DjangoFilterBackend,)
    # filter_fields = ('title', 'views', 'category__name')
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_class = ListFilter

    # return Listing.objects.all()

    # def get_queryset(self):
    #     # print("hello\n")
    #     """
    #     This view should return a list of all the purchases for
    #     the user as determined by the username portion of the URL.
    #     """
    #
    #     if 'cate' in self.kwargs:
    #         cate = self.kwargs['cate']
    #         return Listing.objects.filter(category__name=cate)
    #     elif 'title' in self.kwargs:
    #         title = self.kwargs['title']
    #         return Listing.objects.filter(title=title)
    #     elif 'low' in self.kwargs or 'high' in self.kwargs:
    #         low = 0
    #         high = 20000
    #         if 'low' in self.kwargs:
    #             low = self.kwargs['low']
    #         if 'high' in self.kwargs:
    #             high = self.kwargs['high']
    #
    #         return Listing.objects.filter(price__gte=low).filter(price__lte=high)
    #
    #     else:
    #         return Listing.objects.all()


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('date')
    serializer_class = MessageSerializer


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all().order_by('listing')
    serializer_class = ConversationSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ListingList(generics.ListAPIView):
    serializer_class = ListingSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        title = self.kwargs['title']
        # print("hahaha" + str(title))

        # a hyphen "-" in front of "check_in" indicates descending order; ascending order is implied
        return Listing.objects.filter(title=title).order_by('-check_in')
