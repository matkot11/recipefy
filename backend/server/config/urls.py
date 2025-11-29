from django.contrib import admin
from django.urls import path
from api.views import HelloApi

urlpatterns = [
    path("admin/", admin.site.urls),
    path("hello/", HelloApi.as_view()),
]
