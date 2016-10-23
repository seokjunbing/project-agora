from django.conf import settings
from django.conf.urls import include, url
from django.views.decorators.cache import cache_page
from django.contrib import admin
from agora.views import IndexView, CategoryViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    url(r'^admin/?', admin.site.urls),
    url(r'^api/?', include(router.urls)),
    # catch all others because of how history is handled by react router - cache this page because it will never change

    # comment this out to test the API (Backend team)
    url(r'', cache_page(settings.PAGE_CACHE_SECONDS)(IndexView.as_view()), name='index'),
]
