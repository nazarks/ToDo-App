from django.contrib.auth import get_user_model
from rest_framework import mixins, viewsets
from rest_framework.pagination import PageNumberPagination

from .serializers import CustomUserModelSerializer

User = get_user_model()


class CustomUserPaginations(PageNumberPagination):
    page_size = 10


class CustomUserViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.all()
    serializer_class = CustomUserModelSerializer
    # pagination_class = CustomUserPaginations
