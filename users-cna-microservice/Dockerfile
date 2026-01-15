FROM python:3.10-slim

RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Pipfile Pipfile.lock ./

RUN pip install --upgrade pip \
    && pip install pipenv \
    && pipenv requirements > requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8003

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]

