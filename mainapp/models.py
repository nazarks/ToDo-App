from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _


class Project(models.Model):
    name = models.CharField(max_length=256, unique=True, verbose_name=_("Name"))
    url = models.URLField(max_length=256, verbose_name=_("Url"))
    created = models.DateTimeField(auto_now_add=True, editable=False, verbose_name=_("Created"))
    updated = models.DateTimeField(auto_now=True, editable=False, verbose_name=_("Updated"))
    users = models.ManyToManyField(get_user_model(), related_name="projects")

    class Meta:
        verbose_name = _("Project")
        verbose_name_plural = _("Projects")

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, related_name="ToDo_project", on_delete=models.CASCADE)
    description = models.TextField(verbose_name=_("Description"))
    user = models.ForeignKey(get_user_model(), related_name="ToDo_user", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, verbose_name=_("Created"), editable=False)
    updated = models.DateTimeField(auto_now=True, verbose_name=_("Edited"), editable=False)
    is_active = models.BooleanField(_("active"), default=True)

    def __str__(self):
        return self.description[:20]

    class Meta:
        ordering = ["description"]
        verbose_name = _("ToDo")
        verbose_name_plural = _("ToDoS")
