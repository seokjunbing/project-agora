from rest_framework import serializers
from .models import Listing, Category, UserProfile


# test123
class ListSerializer(serializers.ModelSerializer):
    # Useful for visualization; breaks browsable API.
    # author = serializers.StringRelatedField()

    class Meta:
        model = Listing
        fields = ('author', 'price', 'priceType', 'saleType',
                  'category', 'description', 'title', 'pictures',
                  'flags', 'listingDate', 'views', 'numberOfInquiries')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile


class UserSerializer(serializers.ModelSerializer):
    user = ProfileSerializer()
