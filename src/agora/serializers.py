from rest_framework import serializers
from .models import Listing, Category, UserProfile, Message, Conversation


# test123
class ListingSerializer(serializers.ModelSerializer):
    # Useful for visualization; breaks browsable API.
    # author = serializers.StringRelatedField()

    class Meta:
        model = Listing


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile


class UserSerializer(serializers.ModelSerializer):
    user = ProfileSerializer()


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
