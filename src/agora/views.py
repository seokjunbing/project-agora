import os

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Category, Listing, Message, Conversation, UserProfile
from .serializers import CategorySerializer, ListingSerializer, MessageSerializer, ConversationSerializer, UserSerializer
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


class ListingViewSet(viewsets.ModelViewSet):
    serializer_class = ListingSerializer
    queryset = Listing.objects.all()

    def get_queryset(self):
        # print("hello\n")
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """

        if 'cate' in self.kwargs:
            cate = self.kwargs['cate']
            return Listing.objects.filter(category__name=cate)
        elif 'title' in self.kwargs:
            title = self.kwargs['title']
            return Listing.objects.filter(title=title)
        elif 'low' in self.kwargs or 'high' in self.kwargs:
            low = 0
            high = 20000
            if 'low' in self.kwargs:
                low = self.kwargs['low']
            if 'high' in self.kwargs:
                high = self.kwargs['high']

            return Listing.objects.filter(price__gte=low).filter(price__lte=high)

        else:
            return Listing.objects.all()

            # try:
            #
            # except KeyError:
            #     try:
            #         search = self.kwargs['title']
            #     except KeyError:
            #         print('in KEYERROR\n')
            #         return Listing.objects.all()
            #
            #
            #
            # print('SEARCHING....\n')
            # # cate = self.kwargs['cate']
            # return Listing.objects.filter(category__name=cate)

            # queryset =


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
        return Listing.objects.filter(title=title)
