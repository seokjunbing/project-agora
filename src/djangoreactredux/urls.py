from django.conf import settings
from django.conf.urls import include, url
from django.views.decorators.cache import cache_page
from django.contrib import admin
from agora.views import IndexView

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    # catch all others because of how history is handled by react router - cache this page because it will never change
    url(r'', cache_page(settings.PAGE_CACHE_SECONDS)(IndexView.as_view()), name='index'),
]
