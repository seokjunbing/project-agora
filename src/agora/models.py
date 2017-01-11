from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.conf import settings
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

# for messaging
#from django.contrib.contenttypes import generic
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import ugettext_lazy as _


# String representation for user
def user_str(self):
    return "%s %s" % (self.first_name, self.last_name)


User.__str__ = user_str


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class UserProfile(models.Model):
    user = models.OneToOneField(User)

    # messages = models.ManyToOneRel(Message)

    class Meta:
        verbose_name_plural = "user profiles"


class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "categories"

    # python 3.x
    def __str__(self):
        return self.name


class Subcategory(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "subcategories"

    def __unicode__(self):
        return self.name


class Listing(models.Model):
    def create(self, validated_data):
        return Listing.objects.create(**validated_data)
        # return Listing(**validated_data)

    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    SALE_TYPES = (
        ('SA', 'Sale'),
        ('RE', 'Rent'),
    )

    PRICE_TYPES = (
        ('PT', 'Per term'),
        ('MO', 'Monthly'),
        ('WE', 'Weekly'),
        ('DA', 'Daily'),
        ('OT', 'One time'),
    )

    price = models.DecimalField(decimal_places=2, max_digits=7)

    price_type = models.CharField(
        max_length=2,
        choices=PRICE_TYPES,
        default='OT',
    )

    sale_type = models.CharField(
        max_length=2,
        choices=SALE_TYPES,
        default='SA',
    )

    category = models.ForeignKey(
        Category,
        default=1,
        on_delete=models.CASCADE)

    description = models.CharField(max_length=5000)

    title = models.CharField(max_length=100)

    pictures = models.CharField(max_length=5000, null=True, blank=True)

    flags = models.PositiveIntegerField(default=0)

    listing_date = models.DateField(auto_now_add=True)

    # views(internal for popularity filtering)
    views = models.PositiveIntegerField(default=0)

    # numberOfInquiries(internal for filtering)
    number_of_inquiries = models.PositiveIntegerField(default=0)

"""
messaging classes adapted from: http://pydoc.net/Python/django-conversation/1.2/conversation.models/
"""
class Conversation(models.Model):

    users = models.ManyToManyField(
        'auth.User',
        verbose_name=_('Users'),
        related_name='conversations',
        default=0,
    )

    read_by = models.ManyToManyField(
        'auth.User',
        verbose_name=_('Read by'),
        related_name='read_conversations',
        blank=True,
    )

    # Generic FK to the object this conversation is about
    listing = models.ForeignKey(
        Listing,
        related_name='conversation_listing',
        default=0,
    )

class Message(models.Model):

    user = models.ForeignKey(
        'auth.User',
        verbose_name=_('User'),
        related_name='messages',
        default=0,
    )

    conversation = models.ForeignKey(
        Conversation,
        verbose_name=_('Conversation'),
        related_name='messages',
        default=0,
    )

    date = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Date'),
    )

    text = models.TextField(
        max_length=2048,
        verbose_name=_('Text'),
    )
