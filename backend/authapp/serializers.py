from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer


class CustomUserModelSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "username", "first_name", "last_name", "email")


class CustomUserModelSerializerExt(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_superuser",
            "is_staff",
        )
