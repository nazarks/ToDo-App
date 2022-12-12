from mainapp import models as mainapp_models
from mainapp import serializers as mainapp_serializers
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilter, ToDoFilter


class ProjectPaginations(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100


class ToDoPaginations(PageNumberPagination):
    page_size = 20


class ProjectViewSet(ModelViewSet):
    queryset = mainapp_models.Project.objects.all()
    serializer_class = mainapp_serializers.ProjectModelSerializer
    # pagination_class = ProjectPaginations
    filterset_class = ProjectFilter


class ToDoViewSet(ModelViewSet):
    serializer_class = mainapp_serializers.ToDoModelSerializer
    # pagination_class = ToDoPaginations
    filterset_class = ToDoFilter

    def get_queryset(self):
        queryset = mainapp_models.ToDo.objects.filter(is_active=True)
        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
