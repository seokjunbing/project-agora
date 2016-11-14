from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User, AnonymousUser
from rest_framework.authtoken.models import Token

from .models import Listing, Category, UserProfile, Message, Conversation, create_auth_token

EMAIL_SUFFIX = '@dartmouth.edu'

UserModel = get_user_model()

#@api_view(['GET'])
def current_user(request):
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email
    })


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
        model = UserProfile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}
        # write_only_fields = ('password',)
        read_only_fields = ('id', 'username')

    def create(self, validated_data):

        if validate_email(validated_data['email']):
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
            print(token)

            user_profile = UserProfile(user=user)
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
