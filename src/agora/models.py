# from django.db import models
# from pygments.lexers import get_all_lexers
# from pygments.styles import get_all_styles
#
# LEXERS = [item for item in get_all_lexers() if item[1]]
# LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
# STYLE_CHOICES = sorted((item, item) for item in get_all_styles())
#
#
# class Snippet(models.Model):
#     created = models.DateTimeField(auto_now_add=True)
#     title = models.CharField(max_length=100, blank=True, default='')
#     code = models.TextField()
#     linenos = models.BooleanField(default=False)
#     language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)
#     style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=100)
#
#     class Meta:
#         ordering = ('created',)


from django.db import models
from django.contrib.auth.models import User

from enum import Enum


class Listing(models.Model):

    SALE_TYPES = (
        ('SA', 'Sale'),
        ('RE', 'Rent'),
    )

    PRICE_TYPES = (
        ('MO', 'Monthly'),
        ('WE', 'Weekly'),
        ('DA', 'Daily'),
    )

    CATEGORIES = (
        ('EL', 'Electronics'),
        ('BO', 'Books'),
        ('FU', 'Furniture'),
        ('OT', 'Other'),
    )

    # author = models.ForeignKey('auth.User',on_delete=models.CASCADE)

    price = models.DecimalField
    priceType = models.CharField(max_length=1, choices=PRICE_TYPES)

    saleType = models.CharField(max_length=1, choices=SALE_TYPES)

    category = models.CharField(max_length=1, choices=CATEGORIES)

    description = models.CharField(max_length=5000)

    title = models.CharField(max_length=100)

    pictures = models.ImageField()

    flags = models.BooleanField()

    listingDate = models.DateField(auto_now_add=True)

    # views(internal for popularity filtering)
    views = models.PositiveIntegerField(default=0)

    # numberOfInquiries(internal for filtering)
    numberOfInquiries = models.PositiveIntegerField(default=0)


# TODO unsure about subcategories
