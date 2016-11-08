from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from .models import Listing, Category, UserProfile, Message, Conversation

UserModel = get_user_model()


def validate_email(email):
    try:
        ind = email.index("@")
    except ValueError:
        print("asd")


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
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}
        # write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        user_profile = UserProfile(user=user)
        user_profile.save()

        return user


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
