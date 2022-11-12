from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet

from .serializers import CustomUserModelSerializer

User = get_user_model()


class CustomUserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserModelSerializer
