from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

from config.routers import DefaultExtendableRouter
from config.generators import serve_schema_file
from api.views import HelloApi

router = DefaultExtendableRouter()

apiUrls = [
    path("", include(router.urls)),
    path(
        "open-api.yaml",
        serve_schema_file,
        name="open-api",
    ),
    path(
        "docs/",
        RedirectView.as_view(url="/api/", permanent=True),
        name="swagger-ui-redirect",
    ),
    path("hello/", HelloApi.as_view()),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include((apiUrls, "api"), namespace="api")),
]
