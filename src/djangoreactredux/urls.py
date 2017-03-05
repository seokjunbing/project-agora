from django.conf import settings
from django.conf.urls import include, url
from django.views.decorators.cache import cache_page
from django.contrib import admin
from agora.views import IndexView, CategoryViewSet, ListingViewSet, MessageViewSet, ConversationViewSet, UserViewSet, \
    sign_s3_upload, ProfileViewSet, verify_user, start_conversation, send_contact_admin_email

from rest_framework import routers
from rest_framework.authtoken import views
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

router = routers.DefaultRouter()

router.register(r'listings', ListingViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'conversations', ConversationViewSet)
router.register(r'users', UserViewSet)
# router.register(r'token', include('oauth2_provider.urls', namespace='oauth2_provider'))
# router.register(r'token-auth', verify_user, base_name='Token')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'api/auth-token', views.obtain_auth_token),  # TODO Temporary fix. Move to routers at some point.
    url(r'^api/get_s3_url', sign_s3_upload),
    url(r'^api/token-auth/', obtain_jwt_token),
    url(r'^api/token-refresh/', refresh_jwt_token),
    # url(r'^api/verify/(?P<code>.*)/', verify_user),
    url(r'^api/verify/', verify_user),
    url(r'^api/start_convo/', start_conversation),
    url(r'^api/contact/', send_contact_admin_email),

    # comment this out to test the API (Backend team)
    url(r'', cache_page(settings.PAGE_CACHE_SECONDS)(IndexView.as_view()), name='index'),
]
