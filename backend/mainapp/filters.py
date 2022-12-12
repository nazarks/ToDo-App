from django_filters import rest_framework as filters
from mainapp import models as mainapp_models


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = mainapp_models.Project
        fields = ["name"]


class ToDoFilter(filters.FilterSet):
    created = filters.DateFromToRangeFilter()
    description = filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = mainapp_models.ToDo
        fields = ["created", "description", "project", "user"]
