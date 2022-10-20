from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.functions import Lower
from django.utils.translation import gettext_lazy as _


class CustomUser(AbstractUser):

    email = models.EmailField(
        _("email address"),
        blank=False,
        max_length=256,
        unique=True,
        error_messages={
            "unique": _("A user with that email address already exists."),
        },
    )

    REQUIRED_FIELDS = ["email"]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        constraints = [
            models.UniqueConstraint(Lower("username"), name="username_case_insensitive"),
        ]
        verbose_name = _("user")
        verbose_name_plural = _("users")
