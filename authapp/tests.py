from django.test import RequestFactory, TestCase
from mixer.backend.django import mixer
from rest_framework import status

from .models import CustomUser
from .views import CustomUserViewSet


class TestCustomUserViewSet(TestCase):
    def test_get_list_status_code(self):
        factory = RequestFactory()
        request = factory.get("/users/")
        view = CustomUserViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_data_count(self):
        users_count = 10
        mixer.cycle(users_count).blend(CustomUser)
        factory = RequestFactory()
        request = factory.get("/users/")
        view = CustomUserViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(len(response.data), users_count)
