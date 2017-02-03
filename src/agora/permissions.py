from rest_framework.permissions import BasePermission

class CanEditProfile(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.pk == obj.user.pk

class ReadOnlyIfNotLoggedIn(BasePermission):
    def has_permission(self, request, view):
        if view.action in ('create', 'update', 'partial_update', 'destroy',):
            return request.user.is_authenticated()
        else:
            return True
