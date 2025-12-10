from django.contrib.auth.models import User
from django.test import Client
import pytest
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED


class TestLogout:
    @pytest.mark.django_db
    def test_logout_success(self, client: Client):
        # Given existing user
        user = User.objects.create_user(
            username="testuser",
            email="test@test.com",
            password="testpassword",
        )

        # And user is logged in
        client.login(username=user.username, password="testpassword")

        # When user logs out
        response = client.post(
            "/api/auth/logout/",
        )

        # Then response is successful
        assert response.status_code == HTTP_200_OK
        response_data = response.json()
        assert response_data["detail"] == "Logged out"

    @pytest.mark.django_db
    def test_logout_not_authenticated(self, client: Client):
        # When user logs out without being authenticated
        response = client.post(
            "/api/auth/logout/",
        )

        # Then response is unsuccessful
        assert response.status_code == HTTP_401_UNAUTHORIZED
        response_data = response.json()
        assert response_data["detail"] == "Not logged in"
