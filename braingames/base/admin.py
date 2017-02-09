from django.contrib import admin

from import_export import resources
from import_export.admin import ExportMixin

from braingames.base import models


class ResultResource(resources.ModelResource):
    class Meta:
        model = models.Result


class ResultAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = ResultResource
    list_display = ('id', 'game', 'created')
    list_filter = ('game', 'created')
    readonly_fields = ('game', 'created', 'data')
    list_display_links = ('id', 'game')


admin.site.register(models.Result, ResultAdmin)
