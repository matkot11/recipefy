from django.urls import path
from authentication.api.token import CsrfTokenView
from authentication.api.user import UserView
from authentication.api.register import RegisterView
from authentication.api.logout import LogoutView
from authentication.api.login import LoginView

urlpatterns = [
    path("csrf-token/", CsrfTokenView.as_view(), name="csrf-token"),
    path("user/", UserView.as_view(), name="user"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
