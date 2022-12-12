from django.contrib.auth import get_user_model
from rest_framework import mixins, viewsets
from rest_framework.pagination import PageNumberPagination

from .serializers import CustomUserModelSerializer, CustomUserModelSerializerExt

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

    def get_serializer(self, *args, **kwargs):
        kwargs["context"] = self.get_serializer_context()
        if self.request.version == "2.0":
            return CustomUserModelSerializerExt(*args, **kwargs)
        return CustomUserModelSerializer(*args, **kwargs)

    # pagination_class = CustomUserPaginations
