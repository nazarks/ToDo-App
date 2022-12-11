import authapp.views as auth_views
import mainapp.views as mainapp_views
from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView
from rest_framework.authtoken import views
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.views import TokenVerifyView

schema_view = get_schema_view(
    openapi.Info(
        title="ToDo-App",
        default_version="1.0",
        description="ToDo project documentation",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[AllowAny],
)


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
    path("api-jwt-token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("", include(router.urls)),
    path("graphql/", GraphQLView.as_view(graphiql=True)),
    # documentation
    re_path(r"^swagger(?P<format>\.json|\.yaml)$", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]
