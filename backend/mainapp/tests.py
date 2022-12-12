import json

from authapp.models import CustomUser
from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient

from .models import Project, ToDo


class TestProjectViewSet(TestCase):
    def test_get_detail(self):
        project = mixer.blend(Project)
        client = APIClient()
        response = client.get(f"/projects/{project.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project_data = json.loads(response.content)
        self.assertEqual(project_data["name"], project.name)

    def test_create_guest(self):
        user = mixer.blend(CustomUser)
        client = APIClient()
        response = client.post(
            "/projects/",
            {
                "name": "Max Leon",
                "url": "https://www.valentine.com/category/homepage/",
                "users": [
                    user.id,
                ],
            },
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        user = mixer.blend(CustomUser)
        client = APIClient()
        CustomUser.objects.create_superuser("admin", "admin@admin.com", "pass")
        client.login(username="admin", password="pass")
        response = client.post(
            "/projects/",
            {
                "name": "Max Leon",
                "url": "https://www.test.com/",
                "users": [
                    user.id,
                ],
            },
        )
        project_data = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(project_data["name"], "Max Leon")

    def test_edit_admin(self):
        project = mixer.blend(Project)
        user = mixer.blend(CustomUser)
        client = APIClient()
        CustomUser.objects.create_superuser("admin", "admin@admin.com", "pass")
        client.login(username="admin", password="pass")
        response = client.put(
            f"/projects/{project.id}/",
            {
                "name": "New project",
                "url": "https://www.new-project.com/",
                "users": [
                    user.id,
                ],
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project = Project.objects.get(id=project.id)
        self.assertEqual("New project", project.name)


class TestToDoViewSet(TestCase):
    def test_get_list(self):
        todos_count = 10
        mixer.cycle(todos_count).blend(ToDo)
        response = self.client.get("/ToDos/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(json.loads(response.content)), todos_count)

    def test_delete_guest(self):
        todo = mixer.blend(ToDo)
        response = self.client.delete(f"/ToDos/{todo.id}/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_admin(self):
        todo = mixer.blend(ToDo)
        CustomUser.objects.create_superuser("admin", "admin@admin.com", "pass")
        self.client.login(username="admin", password="pass")
        response = self.client.delete(f"/ToDos/{todo.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ToDo.objects.filter(id=todo.id, is_active=False).exists(), True)
