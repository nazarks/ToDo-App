from django.contrib import admin

from mainapp import models as mainapp_models


@admin.register(mainapp_models.Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "get_users",
        "url",
    ]

    def get_users(self, obj):
        return ", ".join((i.username for i in obj.users.all()))


@admin.register(mainapp_models.ToDo)
class ToDoAdmin(admin.ModelAdmin):
    list_display = [
        "project",
        "description",
        "user",
        "is_active",
    ]
    list_editable = [
        "is_active",
    ]
