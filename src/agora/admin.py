from django.contrib import admin
from .models import Category, Listing, Message, Conversation

admin.site.register(Category)
admin.site.register(Listing)
admin.site.register(Message)
admin.site.register(Conversation)
