import os
import django_filters.rest_framework
from django.conf import settings
import boto, mimetypes, json
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View
from django.contrib.auth.models import User
# Agora
from .models import Category, Listing, Message, Conversation, Profile
from .serializers import CategorySerializer, ListingSerializer, MessageSerializer, ConversationSerializer, \
    UserSerializer, ProfileSerializer
from .permissions import CanEditProfile, MessagePermission, UserPermission, ConversationPermission

from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response
from rest_framework import viewsets, generics, renderers, permissions
from rest_framework.decorators import list_route, api_view
from rest_framework.exceptions import APIException, PermissionDenied
from rest_framework.permissions import IsAuthenticated
import rest_framework.status as status

# caching
from django.utils.cache import get_cache_key
from django.core.cache import cache
from django.http import HttpRequest

from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, TokenHasScope


class ForbiddenException(APIException):
    status_code = 403
    default_detail = 'You are not authorized to perform that action.'
    default_code = 'Forbidden'


# import environment variables
conn = boto.connect_s3(settings.AWS_ACCESS_KEY_ID, settings.AWS_SECRET_ACCESS_KEY)


@api_view(['GET'])
def sign_s3_upload(request):
    object_name = request.GET['objectName']
    content_type = mimetypes.guess_type(object_name)[0]

    signed_url = conn.generate_url(
        300,
        "PUT",
        'agoradartmouth',
        'images/' + object_name,
        headers={'Content-Type': content_type, 'x-amz-acl': 'public-read'})

    return HttpResponse(json.dumps({'signedUrl': signed_url}))


@api_view(['GET'])
def verify_user(request):
    # TODO make this an actual webpage, not just an api endpoint.
    email = request.GET.get('email')
    verification_code = request.GET.get('code')
    if email is not None and verification_code is not None:
        user_queryset = User.objects.filter(email=email)
        if len(user_queryset) > 0:
            user = user_queryset[0]
            if user.profile.verification_code == verification_code:  # match
                user.profile.verified = True
                user.profile.save()
                return Response({"message": "Thank you for veryfing your email."})
    return Response(data={"detail": "User email not verified."}, status=status.HTTP_400_BAD_REQUEST)


class IndexView(View):
    """Render main page."""

    def get(self, request):
        """Return html for main application page."""

        abspath = open(os.path.join(settings.BASE_DIR, 'static_dist/index.html'), 'r')
        return HttpResponse(content=abspath.read())


# original
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed or edited. Read only as no need to expose an API endpoint
    to create categories; this can be done in the admin site.
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


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ListingFilter(django_filters.rest_framework.FilterSet):
    min_price = django_filters.NumberFilter(name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(name="price", lookup_expr='lte')

    class Meta:
        model = Listing
        fields = ['price_type', 'sale_type', 'category__name', 'min_price', 'max_price', 'description', 'title',
                  'listing_date', 'views', 'number_of_inquiries']


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    # uncomment to require authentication for listings
    # permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    filter_class = ListingFilter
    ordering_filter = OrderingFilter()
    ordering_fields = ('price', 'views')

    # def create(self, request, *args, **kwargs):
    #     user = request.user
    #     instance = self.get_object()
    #     if user.is_authenticated() and user.profile.verified:
    #         viewsets.ModelViewSet.perform_create(self, instance)
    #     else:
    #         return Response(status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        user = request.user
        instance = self.get_object()
        if user.is_authenticated() and user == instance.author and user.profile.verified:
            viewsets.ModelViewSet.perform_destroy(self, instance)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


class MessagePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'


class ConversationPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('-date')
    permission_classes = (MessagePermission,)
    serializer_class = MessageSerializer
    pagination_class = MessagePagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('conversation',)

    # def list(self, request, *args, **kwargs):
    #     user = request.user
    #     if user.is_superuser:
    #         viewsets.ModelViewSet.list(self, request, *args, **kwargs)
    #     else:
    #         return Response({"detail": "You cannot see this."}, status=status.HTTP_403_FORBIDDEN)


class ConversationViewSet(viewsets.ModelViewSet):
    # TODO figure out permissions
    queryset = Conversation.objects.all()
    permission_classes = (ConversationPermission,)
    serializer_class = ConversationSerializer
    pagination_class = ConversationPagination

    @list_route()
    def get_for_user(self, request):
        name = str(request.GET['user'])
        serializer = ConversationSerializer(Conversation.objects.filter(users__in=name), many=True)

        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        user = request.user
        if user.is_superuser:
            viewsets.ModelViewSet.list(self, request, *args, **kwargs)
        else:
            return Response({"detail": "You cannot see this."}, status=status.HTTP_403_FORBIDDEN)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (CanEditProfile,)
    permission_classes = (UserPermission,)

    @list_route()
    def current_user(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

        # def destroy(self, request, *args, **kwargs):
        #     user = request.user
        #     instance = self.get_object()
        #     if user.is_authenticated() and user == instance:
        #         viewsets.ModelViewSet.perform_destroy(self, instance)
        #         return Response(
        #             {"message": "You have successfully deleted your profile on Agora. We hope to see you back soon."})
        #     raise ForbiddenException()
        # return Response(status=status.HTTP_403_FORBIDDEN)

    def list(self, request, *args, **kwargs):
        user = request.user
        if user.is_superuser:
            viewsets.ModelViewSet.list(self, request, *args, **kwargs)
        else:
            return Response({"detail": "You cannot see this."}, status=status.HTTP_403_FORBIDDEN)


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
