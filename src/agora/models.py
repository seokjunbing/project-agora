from django.db import models
from django.contrib.auth.models import User
from enum import Enum


# String representation for user
def user_str(self):
    return "%s %s" % (self.first_name, self.last_name)


User.__str__ = user_str


# TODO unsure about subcategories

# class Pricetype(models.Model):
#     name = models.CharField(max_length=50)
#
#     class Meta:
#         verbose_name_plural = "pricetypes"
#
#     def __unicode__(self):
#         return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User)

    # messages = models.ManyToOneRel(Message)

    class Meta:
        verbose_name_plural = "user profiles"
        # def create(self, validated_data):
        #     return Listing.objects.create(**validated_data)
        # return Listing(**validated_data)


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


# class Saletype(models.Model):
#     name = models.CharField(max_length=50)
#
#     class Meta:
#         verbose_name_plural = "saletypes"
#
#     def __unicode__(self):
#         return self.name


class Listing(models.Model):
    def create(self, validated_data):
        return Listing.objects.create(**validated_data)
        # return Listing(**validated_data)

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

    # CATEGORIES = (
    #     ('EL', 'Electronics'),
    #     ('BO', 'Books'),
    #     ('FU', 'Furniture'),
    #     ('OT', 'Other'),
    # )

    # author = models.ForeignKey(User, on_delete=models.CASCADE)

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

    pictures = models.ImageField(blank=True, null=True)

    flags = models.PositiveIntegerField(default=0)

    listing_date = models.DateField(auto_now_add=True)

    # views(internal for popularity filtering)
    views = models.PositiveIntegerField(default=0)

    # numberOfInquiries(internal for filtering)
    number_of_inquiries = models.PositiveIntegerField(default=0)


class Conversation(models.Model):
    """
    Conversation
    """

    listing = models.ForeignKey(Listing)

    # TODO Change?
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)


class Message(models.Model):
    """
    A single message in a conversation thread.
    """
    text = models.TextField(max_length=5000)

    date = models.DateField(auto_now_add=True)

    read = models.BooleanField(default=False)

    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, null=True)
