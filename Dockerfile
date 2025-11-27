FROM debian:bookworm-slim AS workspace

# --- Initialize Global Tools ---
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PATH="/root/.local/bin:$PATH" \
    UV_LINK_MODE="copy" \
    UV_NO_CACHE="true"

# Install common packages
RUN CommonDeps="ca-certificates git git-lfs gnupg2 curl ssh-client vim make tree less htop bash-completion wait-for-it" \
    BackendDeps="gettext g++ libpq-dev postgresql-client openjdk-17-jre-headless" \
    && apt-get update && apt-get install -y --no-install-recommends $CommonDeps $BackendDeps \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Task
RUN sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b /root/.local/bin v3.43.3 \
    && task --completion bash > ~/.task_bash_completion \
    # Add bash completion is required for Task completion to work
    && echo "source /etc/bash_completion" >> ~/.bashrc \
    && echo "source $HOME/.task_bash_completion" >> ~/.bashrc

# Setup UV (must be installed before using it)
COPY --from=ghcr.io/astral-sh/uv:0.6.14 /uv /uvx /bin/
RUN uv generate-shell-completion bash > ~/.uv_bash_completion \
    && echo "source $HOME/.uv_bash_completion" >> ~/.bashrc

## Setup Ruff with autocompletion
RUN uv tool install ruff==0.14.6 \
    && ruff generate-shell-completion bash > ~/.ruff_bash_completion \
    && echo "source $HOME/.ruff_bash_completion" >> ~/.bashrc

# Setup Poetry for MetaBase Application Backend
ENV POETRY_NO_INTERACTION=true \
    POETRY_VIRTUALENVS_CREATE=true \
    POETRY_VIRTUALENVS_IN_PROJECT=true
RUN uv tool install --python 3.12.8 --verbose poetry==2.2.0

WORKDIR /app
CMD [ "/bin/bash" ]

# Setup Node 20 for frontend
ENV NODE_VERSION=20.19.0
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin:$PATH"
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash \
    && . "/root/.nvm/nvm.sh" \
    && nvm install $NODE_VERSION


# --- Initialize Frontend ---

COPY frontend/package.json frontend/package-lock.json frontend/.npmrc \
    /app/frontend/

RUN cd /app/frontend \
    && npm clean-install \
    && cd /app

# --- Initialize Backend ---

COPY backend/pyproject.toml backend/poetry.lock \
    /app/backend/

RUN cd /app/backend \
    && poetry install --no-root --no-cache \
    && rm -rf ~/.cache/pypoetry \
    && cd /app
