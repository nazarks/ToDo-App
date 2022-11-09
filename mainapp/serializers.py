from django.contrib.auth import get_user_model
from rest_framework import serializers

from mainapp import models as mainapp_models

User = get_user_model()


class ProjectModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = mainapp_models.Project
        fields = ["id", "name", "url", "users"]


class ToDoModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = mainapp_models.ToDo
        fields = ["id", "description", "is_active", "project", "user"]
