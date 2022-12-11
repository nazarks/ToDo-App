from django.contrib import admin
from django.contrib.auth import get_user_model


@admin.register(get_user_model())
class CustomUserAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "username",
        "first_name",
        "last_name",
        "email",
        "is_active",
        "is_superuser",
    ]
    list_editable = ["is_active"]
    list_filter = ["is_active", "is_staff"]
