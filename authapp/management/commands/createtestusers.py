from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

User = get_user_model()


class Command(BaseCommand):
    help = (
        "This command creates users in the database, usage 'createtestusers number_users', example: createtestusers 5"
    )

    def add_arguments(self, parser):
        parser.add_argument("number_users")

    def users_iterator(self, number_users=5):
        for i in range(number_users):
            is_superuser = True if i == 0 else False
            username = username = f"user{i}"
            user = User(
                first_name=f"First{i}",
                is_staff=is_superuser,
                is_superuser=is_superuser,
                last_name=f"Last{i}",
                username=username,
                email=f"{username}@1.com",
            )
            user.set_password(f"{username}@123")
            yield user

    def handle(self, *args, **options):
        number_users = int(options["number_users"])
        list_created_users = User.objects.bulk_create(
            objs=iter(self.users_iterator(number_users=number_users)),
            ignore_conflicts=True,
        )
        print(f"{len(list_created_users)} users created successfully!")
