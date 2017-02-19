from __future__ import print_function
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User, AnonymousUser
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist
import hashlib
from rest_framework.exceptions import APIException
from django.core import serializers as ser
import json
# from rest_framework.serializers import
import httplib2
import os
# from .helpers import do_something

from .models import Listing, Category, Profile, Message, Conversation, create_auth_token

# verification email
from .send_email import construct_and_send_verification_email
from django.conf import settings
from datetime import date

EMAIL_SUFFIX = '@dartmouth.edu'

UserModel = get_user_model()


class ConflictException(APIException):
    status_code = 409
    default_detail = 'This resource is already created, cannot successfully create'
    default_code = 'conflict'


class InvalidDataException(APIException):
    status_code = 400
    default_detail = 'Client error. Please verify your data is correct and try again.'
    default_code = 'client error'


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
    category_name = serializers.SerializerMethodField('get_category_name_func')
    author_str = serializers.SerializerMethodField('get_author_str_func')

    def get_category_name_func(self, obj):
        return obj.category.name

    def get_author_str_func(self, obj):
        return '%s %s' % (obj.author.first_name, obj.author.last_name)

        # Useful for visualization; breaks browsable API.

    # author = serializers.StringRelatedField()

    # author_id = serializers.SerializerMethodField('get_author_func')
    # author_name = serializers.SerializerMethodField('get_author_name_func')

    # def get_author_func(self, obj):
    #     user = self.context['request'].user
    #     print('User: ' + str(user))
    #     logged_in = user.is_authenticated()
    #     if user.is_authenticated() and user.profile.verified:
    #         return obj.author.pk
    #     else:
    #         return -1  # For now, to keep it an integer
    ##         return self.context['request'].user # access the request object
    #
    # def get_author_name_func(self, obj):
    #     user = self.context['request'].user
    #     logged_in = user.is_authenticated()
    #     if user.is_authenticated() and user.profile.verified:
    #         return '%s %s' % (obj.author.first_name, obj.author.last_name)
    #     else:
    #         return 'Anonymous'

    class Meta:
        model = Listing
        # fields = ('sale_type', 'price', 'price_type', 'sale_type', 'category', 'description', 'title',
        #           'images', 'flags', 'listing_date', 'views', 'number_of_inquiries', 'author_id', 'author_name',
        #           'author', 'pk')
        fields = '__all__'
        # extra_kwargs = {'author': {'write_only': True}}
        # fields = ('price_type', 'get_sr_price')


class AnonymousListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('price_type', 'price')


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
                raise ConflictException('Error: There is already a user registered with that email.')
            except ObjectDoesNotExist:
                pass
            # Create user
            user = User.objects.create(
                username=validated_data['email'],
                email=validated_data['email'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name']
            )
            user.set_password(validated_data['password'])
            user.save()

            user_profile = Profile(user=user)
            user_email = validated_data['email'].encode('utf-8')

            # TODO salt the user's email - easily guessable right now.
            verification_code = hashlib.sha256(user_email).hexdigest()
            user_profile.verification_code = verification_code
            user_profile.save()

            # print(settings.HOSTURL)
            # TODO send email on backend, change domain.
            construct_and_send_verification_email(user, domain=settings.HOSTURL)
            return user
        else:
            raise InvalidDataException("Please enter a Dartmouth email")


class MessageSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField('get_author_func')

    def get_author_func(self, obj):
        author_pk = obj.user.pk
        author = User.objects.filter(pk=author_pk)[0]
        return '%s %s' % (author.first_name, author.last_name)

    class Meta:
        model = Message
        fields = '__all__'


class MessageField(serializers.RelatedField):
    def to_representation(self, value):
        return '%s' % (value.text)


class ConversationSerializer(serializers.ModelSerializer):
    # title = serializers.SerializerMethodField('get_title_func')
    all_messages = serializers.SerializerMethodField('get_messages_func')
    related_listing = serializers.SerializerMethodField('get_listing_func')
    most_recent_msg = serializers.SerializerMethodField('get_most_recent_msg_func')

    # messages_all = serializers.ManyRelatedField(source='messages', child_relation='messages')
    #  THIS KIND OF WORKS
    # messages = MessageField(many=True, read_only=True)
    # messages = serializers.HyperlinkedRelatedField(many=True, queryset=Message.objects.all())

    # messages = serializers.ReadOnlyField()

    # m = serializers.ModelSerializer(data=Conversation.listing)
    # m = ListingSerializer(source='conversation_set')

    def get_listing_func(self, obj):
        return ListingSerializer(obj.listing).data

    def get_messages_func(self, obj):
        conversation_pk = obj.pk
        queryset = Message.objects.filter(conversation=conversation_pk)
        l = []
        if len(queryset) > 0:
            for q in queryset:
                l.append(MessageSerializer(q).data)
        return l

    def get_most_recent_msg_func(self, obj):
        conversation_pk = obj.pk
        queryset = Message.objects.filter(conversation=conversation_pk)
        most_recent_msg = queryset[len(queryset) - 1].date
        return most_recent_msg

    class Meta:
        model = Conversation
        fields = '__all__'
