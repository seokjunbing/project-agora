import os

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View
from rest_framework import viewsets
from .models import Category, Listing
from .serializers import CategorySerializer, ListingSerializer


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
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all().order_by('price')
    serializer_class = ListingSerializer
