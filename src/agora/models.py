from django.db import models
from django.contrib.auth.models import User
from enum import Enum


# TODO unsure about subcategories

class Pricetype(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "pricetypes"

    def __unicode__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "categories"

    def __unicode__(self):
        return self.name


class Subcategory(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "subcategories"

    def __unicode__(self):
        return self.name


class Saletype(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "saletypes"

    def __unicode__(self):
        return self.name


class Listing(models.Model):
    # SALE_TYPES = (
    #     ('SA', 'Sale'),
    #     ('RE', 'Rent'),
    # )
    #
    # PRICE_TYPES = (
    #     ('MO', 'Monthly'),
    #     ('WE', 'Weekly'),
    #     ('DA', 'Daily'),
    # )
    #
    # CATEGORIES = (
    #     ('EL', 'Electronics'),
    #     ('BO', 'Books'),
    #     ('FU', 'Furniture'),
    #     ('OT', 'Other'),
    # )

    author = models.ForeignKey('accounts.User')

    price = models.DecimalField(decimal_places=2, max_digits=7)

    priceType = models.ForeignKey(
        Pricetype,
        default=1,
        on_delete=models.CASCADE)

    saletype = models.ForeignKey(
        Saletype,
        default=1,
        on_delete=models.CASCADE)

    category = models.ForeignKey(
        Category,
        default=1,
        on_delete=models.CASCADE)

    description = models.CharField(max_length=5000)

    title = models.CharField(max_length=100)

    pictures = models.ImageField()

    flags = models.BooleanField()

    listingDate = models.DateField(auto_now_add=True)

    # views(internal for popularity filtering)
    views = models.PositiveIntegerField(default=0)

    # numberOfInquiries(internal for filtering)
    numberOfInquiries = models.PositiveIntegerField(default=0)


"""
A single message in a conversation thread.
"""
class Message(models.Model):
    text = models.TextField(max_length=5000)

    date = models.DateField(auto_now_add=True)

    author = models.ForeignKey('accounts.User')

    read = models.BooleanField(default=False)

"""
Conversation
"""
class Conversation(models.Model):
    users = [
        models.ForeignKey('accounts.User'),
    ]

    listing = models.ForeignKey(Listing)

    messages = [
        models.ForeignKey(Message),
    ]
