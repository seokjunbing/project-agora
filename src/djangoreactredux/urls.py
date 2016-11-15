from django.conf import settings
from django.conf.urls import include, url
from django.views.decorators.cache import cache_page
from django.contrib import admin
from agora.views import IndexView, CategoryViewSet, ListingViewSet, MessageViewSet, ConversationViewSet, UserViewSet
from rest_framework import routers
from rest_framework.authtoken import views

router = routers.DefaultRouter()

router.register(r'listings', ListingViewSet)

router.register(r'categories', CategoryViewSet)

router.register(r'messages', MessageViewSet)

router.register(r'conversations', ConversationViewSet)

router.register(r'users', UserViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'api/auth-token', views.obtain_auth_token), # TODO Temporary fix. Move to routers at some point.
    url(r'^api/', include(router.urls)),

    # comment this out to test the API (Backend team)
    #url(r'', cache_page(settings.PAGE_CACHE_SECONDS)(IndexView.as_view()), name='index'),
]
