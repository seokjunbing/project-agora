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

class Listing(models.Model):

    SALE_TYPES = (
        "SA", "Sale",
        "RE", "Rental"
    )

    PRICE_TYPES = (
        "MO", "Monthly",
        "WE", "Weekly",
        "DA", "Daily"
    )

    # author = models.ForeignKey('auth.User')
    # price = models.DecimalField
    # priceType(monthly, weekly, etc.)
    # saleType(sale, rental)
    # description
    # title
    # pictures
    # flags
    # listing
    # date
    # views(internal for popularity filtering)
    # numberOfInquiries(internal for filtering)

