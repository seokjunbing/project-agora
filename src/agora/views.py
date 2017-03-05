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
from .permissions import *
from .send_email import construct_and_send_admin_contact_email

from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response
from rest_framework import viewsets, generics, renderers, permissions
from rest_framework.decorators import list_route, api_view, detail_route
from rest_framework.exceptions import APIException, PermissionDenied
from rest_framework.permissions import IsAuthenticated
import rest_framework.status as status
import datetime

# caching
from django.utils.cache import get_cache_key
from django.core.cache import cache
from django.http import HttpRequest

from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, TokenHasScope
from django.shortcuts import redirect


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
                return redirect('/confirmed')
    return Response(data={"detail": "User email not verified."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def send_contact_admin_email(request):
    data = request.data  # request.POST.get('email') or request.data['email'] or request.data.get('email')

    # print(data)

    email = data.get('email')
    customer_name = data.get('name')
    title = data.get('title')
    content = data.get('content')

    construct_and_send_admin_contact_email(customer_name, email, title, content)

    return redirect('/contact_sent')


@api_view(['POST'])
def start_conversation(request):
    req = request.body.decode('unicode-escape')
    req = json.loads(req)
    if req['listing'] and req['users'] and req['user'] and req['text']:
        try:
            l = Listing.objects.get(pk=req['listing'])
            users = []
            for user in req['users']:
                u = User.objects.get(pk=user)
                users.append(u)
            c = Conversation.objects.filter(listing=l, users__in=users).distinct() # check if convo exists
            if not c:
                c = Conversation(listing=l)
                c.save()
                for user in req['users']:
                    u = User.objects.get(pk=user)
                    c.users.add(u)
            else:
                c = c[0]
            u = User.objects.get(pk=req['user'])
            m = Message(text=req['text'], user=u, conversation=c)
            m.save()
            return Response(data={"detail": "Created conversation."}, status=status.HTTP_201_CREATED)
        except Exception:
            return Response(data={"detail": "Unable to create conversation."}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(data={"detail": "Invalid input."}, status=status.HTTP_400_BAD_REQUEST)


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
    author_pk = django_filters.CharFilter(name='author_pk')

    class Meta:
        model = Listing
        fields = ['price_type', 'sale_type', 'category__name', 'min_price', 'max_price', 'description', 'title',
                  'listing_date', 'views', 'number_of_inquiries', 'author_pk', 'closed', 'closing_date']


class ListingViewSet(viewsets.ModelViewSet):

    # disable listing after 5 flags
    queryset = Listing.objects.filter(flags__lt = 5)

    serializer_class = ListingSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter)
    permission_classes = (ListingOwnerCanEdit,)
    filter_class = ListingFilter
    ordering_filter = OrderingFilter()
    ordering_fields = ('price', 'views')
    search_fields = ('title', 'description')

    def perform_create(self, serializer):
        # drf does NOT call check_object_permissions on create(). Need to handle explicitly here.
        user = self.request.user
        if user.is_authenticated() and user.profile.verified:
            # if self.check_object_permissions(request=self.request, obj=Listing(serializer.data)):
            serializer.save()
        else:
            raise ForbiddenException

    @detail_route()
    def close_listing(self, request, pk=None):
        listing = Listing.objects.get(pk=pk)
        user = request.user

        if user.is_authenticated() and user.profile.verified and listing.author == user:
            if not listing.closed:
                listing.closed = True
                listing.closing_date = datetime.datetime.now()
                listing.save()
                return Response(data={'detail": "Closed listing.'}, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(data={'detail': 'Listing already closed'}, status=status.HTTP_409_CONFLICT)
        else:
            return Response(data={"detail": "Invalid input."}, status=status.HTTP_403_FORBIDDEN)

    @list_route(permission_classes=(IsAuthenticated,))  # IsAuthenticated should suffice, as you need to be verified to create a listing
    def get_for_user(self, request):
        user = request.user
        # if user.is_authenticated() and user.profile.verified:
        queryset = Listing.objects.filter(author=user)
        serializer = ListingSerializer(queryset, many=True, context=self.get_serializer_context())
        return Response(serializer.data)


class MessagePagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'


class ConversationPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('-date')
    permission_classes = (MessagePermission,)
    serializer_class = MessageSerializer
    pagination_class = MessagePagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('conversation',)

    # TODO do this. How do you check the object, though?
    # def perform_create(self, serializer):
    #     user = self.request.user
    # # can I check Message(serializer.data).conversation?
    #     if user.is_authenticated() and user.profile.verified :
    #         serializer.save()
    #     else:
    #         raise ForbiddenException

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
        name = request.GET['user']
        user_arr = []
        user_arr.append(name)
        serializer = ConversationSerializer(Conversation.objects.filter(users__in=user_arr), many=True,
                                            context=self.get_serializer_context())

        return Response(serializer.data)

        # def list(self, request, *args, **kwargs):
        #     user = request.user
        #     if user.is_superuser:
        #         viewsets.ModelViewSet.list(self, request, *args, **kwargs)
        #
        #     else:
        #         return Response({"detail": "You cannot see this."}, status=status.HTTP_403_FORBIDDEN)


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

        # def list(self, request, *args, **kwargs):
        #     user = request.user
        #     if user.is_superuser:
        #         return viewsets.ModelViewSet.list(self, request, *args, **kwargs)
        #     else:
        #         return Response({"detail": "You cannot see this."}, status=status.HTTP_403_FORBIDDEN)
