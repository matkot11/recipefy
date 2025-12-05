import yaml
from pathlib import Path
from django.conf import settings
from django.http import HttpResponse, Http404
from rest_framework.exceptions import ValidationError
from rest_framework.schemas.generators import BaseSchemaGenerator


class FileBasedSchemaGenerator(BaseSchemaGenerator):
    def __init__(self, *args, **kwargs) -> None:
        # Pop api_version which is not accepted by parent class
        kwargs.pop("api_version", None)

        super().__init__(*args, **kwargs)

    def get_schema(self, *args, **kwargs) -> dict:
        """Load the schema from a YAML file and return it as dict."""
        try:
            with open(settings.SPECTACULAR_SCHEMA_FILE_PATH, "r") as schema_file:
                schema = yaml.safe_load(schema_file)
        except FileNotFoundError as error:
            raise ValidationError(
                f"Schema file not found at {settings.SPECTACULAR_SCHEMA_FILE_PATH}"
            ) from error
        except yaml.YAMLError as error:
            raise ValidationError("Error parsing YAML schema") from error

        return schema


def serve_schema_file(request):
    """Serve the OpenAPI schema YAML file."""
    schema_path = Path(settings.SPECTACULAR_SCHEMA_FILE_PATH)

    # Resolve relative paths from BASE_DIR
    if not schema_path.is_absolute():
        schema_path = Path(settings.BASE_DIR) / schema_path

    try:
        with open(schema_path, "r") as schema_file:
            content = schema_file.read()
    except FileNotFoundError:
        raise Http404(f"Schema file not found at {schema_path}")

    response = HttpResponse(content, content_type="application/x-yaml")
    response["Content-Disposition"] = 'inline; filename="open-api.yaml"'
    return response
