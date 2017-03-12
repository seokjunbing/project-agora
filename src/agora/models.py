from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.dispatch import receiver
from django.conf import settings
from django.db.models.signals import post_save
from django.db.models.signals import post_delete
from rest_framework.authtoken.models import Token
from allauth.account.signals import user_signed_up

"""
messaging imports
"""
from django.utils.translation import ugettext_lazy as _

"""
cashing imports
"""
from django.utils.cache import get_cache_key
from django.core.cache import cache
from django.http import HttpRequest


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=200, null=True)

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

    author = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

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

    images = ArrayField(models.CharField(max_length=500, blank=True), blank=True, null=True, )

    image_dimensions = ArrayField(ArrayField(models.IntegerField(), blank=True), blank=True, null=True, )

    image_captions = ArrayField(models.CharField(max_length=500, blank=True), blank=True, null=True, )

    flags = models.PositiveIntegerField(default=0)

    # flagged_by = ArrayField(models.IntegerField)

    new = models.BooleanField(default=True)

    # date of creation
    listing_date = models.DateField(auto_now_add=True)

    # date of closing
    closing_date = models.DateField(null=True)

    # boolean to indicate if this listing is closed.
    closed = models.BooleanField(default=False)

    # views(internal for popularity filtering)
    views = models.PositiveIntegerField(default=0)

    # numberOfInquiries(internal for filtering)
    number_of_inquiries = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title


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


def expire_page(path):
    request = HttpRequest()
    request.path = request.get_full_path()
    try:
        key = get_cache_key(request)
        if key in cache:
            cache.delete(key)

    except KeyError:
        pass


def invalidate_cache(sender, instance, **kwargs):
    expire_page(instance)


# Signals
@receiver(user_signed_up, dispatch_uid='some.unique.string.for.allauth.user_signed_up')
def user_signed_up(request, user, **kwargs):
    print('User signed up. Sending verification now.')


# String representations

def user_str(self):
    return "%s %s %s" % (self.first_name, self.last_name, self.email)


def listing_str(self):
    return 'Title: %s, price: %.2f' % (self.title, self.price)


def conversation_str(self):
    return 'Title: %s' % (self.listing.title)


User.__str__ = user_str
Listing.__str__ = listing_str
Conversation.__str__ = conversation_str

# Caching
# post_save.connect(invalidate_cache, sender=Listing)
# post_delete.connect(invalidate_cache, sender=Listing)
# post_save.connect(invalidate_cache, sender=Category)
# post_delete.connect(invalidate_cache, sender=Category)
# post_save.connect(invalidate_cache, sender=Message)
# post_delete.connect(invalidate_cache, sender=Message)
# post_save.connect(invalidate_cache, sender=User)
# post_delete.connect(invalidate_cache, sender=User)
# post_save.connect(invalidate_cache, sender=Conversation)
# post_delete.connect(invalidate_cache, sender=Conversation)
