import pytest
from django.test import Client
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED
from django.contrib.auth.models import User


class TestUser:
    @pytest.mark.django_db
    def test_user_success(self, client: Client):
        # Given existing user
        user = User.objects.create_user(
            username="testuser",
            email="test@test.com",
            password="testpassword",
        )

        client.login(username=user.username, password="testpassword")

        # When user gets user
        response = client.get(
            "/api/auth/user/",
        )

        # Then response is successful
        assert response.status_code == HTTP_200_OK
        response_data = response.json()
        assert response_data["username"] == user.username
        assert response_data["email"] == user.email

    @pytest.mark.django_db
    def test_user_not_authenticated(self, client: Client):
        # When user gets user without being authenticated
        response = client.get(
            "/api/auth/user/",
        )

        # Then response is unsuccessful
        assert response.status_code == HTTP_401_UNAUTHORIZED
        assert response.json() == {"detail": "Not logged in"}
