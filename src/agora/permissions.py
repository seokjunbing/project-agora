from rest_framework.permissions import BasePermission, SAFE_METHODS


class ReadOnlyIfNotLoggedIn(BasePermission):
    def has_permission(self, request, view):
        if view.action in ('create', 'update', 'partial_update', 'destroy'):
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
            return request.user.is_authenticated() and request.user.profile.verified
        else:
            return request.user == obj


class ConversationPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.users.all()


class OwnerCanEdit(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        if request.method in SAFE_METHODS:
            return user.is_authenticated() and user.profile.verified
        else:
            return obj.user == user and user.profile.verified


class ListingOwnerCanEdit(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        if request.method in SAFE_METHODS or request.method == 'create':
            return user.is_authenticated and user.profile.verified
        else:
            return user.profile.verified and obj.author == user


class IsVerified(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.profile.verified

    def has_object_permission(self, request, view, obj):
        user = request.user
        return user.is_authenticated and user.profile.verified
