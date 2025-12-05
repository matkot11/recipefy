from rest_framework import routers

from drf_spectacular.views import SpectacularSwaggerView


class DefaultExtendableRouter(routers.DefaultRouter):
    """Extends `DefaultRouter` class to add a method for extending url routes from another router."""

    def get_api_root_view(self, api_urls=None):
        """
        Override the default API root view to use Swagger UI instead.
        """
        return SpectacularSwaggerView.as_view(url_name="api:open-api")

    def extend(self, router):
        """
        Extend the routes with url routes of the passed in router.

        Args:
             router: SimpleRouter instance containing route definitions.
        """
        self.registry.extend(router.registry)
