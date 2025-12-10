import pytest
from django.test import Client
from rest_framework.status import HTTP_200_OK


class TestToken:
    @pytest.mark.django_db
    def test_token_success(self, client: Client):
        # When user gets CSRF token
        response = client.get(
            "/api/auth/csrf-token/",
        )

        # Then response is successful
        assert response.status_code == HTTP_200_OK
        response_data = response.json()
        assert response_data["detail"] == "CSRF cookie set"
