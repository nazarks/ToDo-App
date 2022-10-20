from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "This command loads users in the database, usage 'loadtestusers' "

    def handle(self, *args, **options):
        call_command("loaddata", "authapp/fixtures/001_users.json")
