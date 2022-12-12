from django.contrib.auth import get_user_model
from mainapp import models as mainapp_models
from rest_framework import serializers

User = get_user_model()


class ProjectModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = mainapp_models.Project
        fields = ["id", "name", "url", "users"]


class ToDoModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = mainapp_models.ToDo
        fields = [
            "id",
            "description",
            "is_active",
            "project",
            "user",
            "created",
        ]
