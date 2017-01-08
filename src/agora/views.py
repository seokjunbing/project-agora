import os
import django_filters.rest_framework
from django.conf import settings
import boto, mimetypes, json
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from django.conf import settings
from django.http import HttpResponse
from rest_framework.response import Response
from django.views.generic import View
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Category, Listing, Message, Conversation, UserProfile
from .serializers import CategorySerializer, ListingSerializer, MessageSerializer, ConversationSerializer, \
    UserSerializer
from rest_framework import generics, renderers
from rest_framework.decorators import list_route, api_view

# import environment variables
conn = boto.connect_s3(settings.AWS_ACCESS_KEY_ID, settings.AWS_SECRET_ACCESS_KEY)

@api_view(['GET'])
def sign_s3_upload(request):
    object_name = request.GET['objectName']
    content_type = mimetypes.guess_type(object_name)[0]

    signed_url = conn.generate_url(
        300,
        "PUT",
        'www.agoradartmouth.com',
        'images/' + object_name,
        headers = {'Content-Type': content_type, 'x-amz-acl':'public-read'})

    return HttpResponse(json.dumps({'signedUrl': signed_url}))

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
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        try:
            cate = self.kwargs['cate']
        except KeyError:
            return Category.objects.all()

        return Category.objects.filter(name=cate)


class ListFilter(django_filters.rest_framework.FilterSet):
    min_price = django_filters.NumberFilter(name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(name="price", lookup_expr='lte')

    class Meta:
        model = Listing
        fields = ['price_type', 'sale_type', 'category__name', 'min_price', 'max_price', 'description', 'title',
                  'listing_date', 'views', 'number_of_inquiries']


# class ListingViewSet(generics.ListAPIView):
class ListingViewSet(viewsets.ModelViewSet):

    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)

    filter_class = ListFilter
    ordering_filter = OrderingFilter()
    ordering_fields = ('price', 'views')


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('date')
    serializer_class = MessageSerializer


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all().order_by('listing')
    serializer_class = ConversationSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @list_route()
    def current_user(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class ListingList(generics.ListAPIView):
    serializer_class = ListingSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        title = self.kwargs['title']

        # a hyphen "-" in front of "check_in" indicates descending order; ascending order is implied
        return Listing.objects.filter(title=title).order_by('-check_in')
