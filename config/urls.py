from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

import authapp.views as auth_views
import mainapp.views as mainapp_views

router = DefaultRouter()
router.register("users", auth_views.CustomUserViewSet)
router.register("projects", mainapp_views.ProjectViewSet)
router.register("ToDos", mainapp_views.ToDoViewSet, basename="ToDo")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api-token-auth/", views.obtain_auth_token),
    path("api-jwt-token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api-jwt-token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("", include(router.urls)),
]
