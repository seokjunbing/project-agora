from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.request import Request

class CanEditProfile(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.pk == obj.user.pk
        
class ReadOnlyIfNotLoggedIn(BasePermission):
    def has_permission(self, request, view):
        if view.action in ('create', 'update', 'partial_update', 'destroy',):
            return request.user.is_authenticated()
        else:
            return True


class CanEditListing(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.pk == obj.listing.author.pk


class MessagePermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.conversation.users.all() or request.user == obj.user


class UserPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        else:
            return request.user == obj


class ConversationPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.users.all() or request.user == obj.user

