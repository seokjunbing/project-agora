from django.conf import settings
from django.conf.urls import include, url
from django.views.decorators.cache import cache_page
from django.contrib import admin
from agora.views import IndexView, CategoryViewSet, ListingViewSet, MessageViewSet, ConversationViewSet, UserViewSet
from rest_framework import routers
from rest_framework.authtoken import views

router = routers.DefaultRouter()

# router.register(r'^listings/c/(?P<cate>.+)', ListingViewSet, base_name='1')
# router.register(r'^listings/t/(?P<title>.+)', ListingViewSet, base_name='1')
# router.register(r'^listings/p/low=(?P<low>\d+)&high=(?P<high>\d+)', ListingViewSet, base_name='1')
router.register(r'listings', ListingViewSet)

# router.register(r'^categories/(?P<cate>.+)', CategoryViewSet, base_name='1')

router.register(r'categories', CategoryViewSet)

router.register(r'messages', MessageViewSet)

router.register(r'conversations', ConversationViewSet)

router.register(r'users', UserViewSet)

# router.register(r'curruser', CurrentUserViewSet)

# router.register(r'api-token-auth', views.obtain_auth_token, base_name=1)

# router.register(r'^listing/(?P<title>.+)/$', ListingViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'api/auth-token', views.obtain_auth_token), # TODO Temporary fix. Move to routers at some point.
    url(r'^api/', include(router.urls))


    # url(r'^api/categories/(?P<cate>.+)/$', CategoryViewSet.as_view),
    # url(r'^listing/(?P<author>.+)/$', ListingViewSet.get_queryset()),
    # url(r'^category/(?P<cate>.+)/$', CategoryViewSet),
    # catch all others because of how history is handled by react router - cache this page because it will never change

    # comment this out to test the API (Backend team)
    #url(r'', cache_page(settings.PAGE_CACHE_SECONDS)(IndexView.as_view()), name='index'),
]
