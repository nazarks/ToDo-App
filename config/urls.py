from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

import authapp.views as auth_views
import mainapp.views as mainapp_views

router = DefaultRouter()
router.register("users", auth_views.CustomUserViewSet)
router.register("projects", mainapp_views.ProjectViewSet)
router.register("ToDos", mainapp_views.ToDoViewSet, basename="ToDo")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("", include(router.urls)),
]
