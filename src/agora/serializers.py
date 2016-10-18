from rest_framework import serializers
from .models import Listing


# test123
class ListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Listing
        fields = ('author', 'price', 'priceType', 'saleType',
                  'category', 'description', 'title', 'pictures',
                  'flags', 'listingDate', 'views', 'numberOfInquiries')
