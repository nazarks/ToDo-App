import graphene
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from mainapp.models import Project, ToDo

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = "__all__"


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    all_todos = graphene.List(ToDoType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    todo_by_id = graphene.Field(ToDoType, id=graphene.Int(required=True))
    projects_by_user_name = graphene.List(ProjectType, name=graphene.String(required=False))
    todos_by_user_name = graphene.List(ToDoType, name=graphene.String(required=False))

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_todos(root, info):
        return ToDo.objects.filter(is_active=True)

    def resolve_user_by_id(self, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_todo_by_id(self, info, id):
        try:
            return ToDo.objects.get(id=id, is_active=True)
        except ToDo.DoesNotExist:
            return None

    def resolve_projects_by_user_name(self, info, name=None):
        projects = Project.objects.all()
        if name:
            projects = projects.filter(users__in=User.objects.filter(username__icontains=name))
        return projects

    def resolve_todos_by_user_name(self, info, name=None):
        todos = ToDo.objects.filter(is_active=True)
        if name:
            todos = todos.filter(user__username__contains=name)
        return todos


class ToDoMutation(graphene.Mutation):
    class Arguments:
        description = graphene.String(required=True)
        id = graphene.ID()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, description, id):
        todo = ToDo.objects.get(pk=id, is_active=True)
        todo.description = description
        todo.save()
        return ToDoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = ToDoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
