from __future__ import print_function
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User, AnonymousUser
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist
import hashlib
import httplib2
import os
# from .helpers import do_something

from .models import Listing, Category, Profile, Message, Conversation, create_auth_token

EMAIL_SUFFIX = '@dartmouth.edu'

UserModel = get_user_model()


def validate_email(email):
    try:
        ind = email.index(EMAIL_SUFFIX)
        return True
    except ValueError:
        return False


def get_username(validated_email):
    """
    :param email: User email.
    :return:
    """
    validated_email = validated_email.lower()
    try:
        index = validated_email.rindex(EMAIL_SUFFIX)
    except ValueError:
        index = len(validated_email)
    return '_'.join(validated_email[:index].split('.'))


class ListingSerializer(serializers.ModelSerializer):
    # Useful for visualization; breaks browsable API.
    # author = serializers.StringRelatedField()

    class Meta:
        model = Listing
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        # fields = '__all__'
        fields = ('verified',)
        read_only_fields = ('verified',)


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         profile = ProfileSerializer(source='profile_set')
#         fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'profile')
#         depth = 1
#         extra_kwargs = {'password': {'write_only': True}}
#         write_only_fields = ('password',)
#         read_only_fields = ('id', 'username', 'profile')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'profile')
        extra_kwargs = {'password': {'write_only': True}}
        read_only_fields = ('id', 'username')

    def create(self, validated_data):

        if validate_email(validated_data['email']):
            # Handle duplicate users without crashing
            try:
                User.objects.get(email=validated_data['email'])
                return AnonymousUser
            except ObjectDoesNotExist:
                pass
            # Create user
            user = User.objects.create(
                username=get_username(validated_data['email']),
                email=validated_data['email'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name']
            )
            user.set_password(validated_data['password'])
            user.save()

            # token = create_auth_token(instance=user)
            token = Token.objects.get_or_create(user=user)
            # print(token)
            # TODO send email on backend.

            user_profile = Profile(user=user)
            user_email = validated_data['email'].encode('utf-8')

            # TODO salt the user's email - easily guessable right now.
            verif_code = hashlib.sha256(user_email).hexdigest()
            user_profile.verification_code = verif_code
            user_profile.save()

            return user
        else:
            return AnonymousUser


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = '__all__'
