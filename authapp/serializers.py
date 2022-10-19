from django.contrib.auth import get_user_model
from rest_framework.serializers import HyperlinkedModelSerializer


class CustomUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "username", "first_name", "last_name", "email")