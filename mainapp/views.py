from rest_framework.viewsets import ModelViewSet

from mainapp import models as mainapp_models
from mainapp import serializers as mainapp_serializers


class ProjectViewSet(ModelViewSet):
    queryset = mainapp_models.Project.objects.all()
    serializer_class = mainapp_serializers.ProjectModelSerializer


class ToDoViewSet(ModelViewSet):
    queryset = mainapp_models.ToDo.objects.all()
    serializer_class = mainapp_serializers.ToDoModelSerializer
