from python:3.10.9

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
&& apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev

RUN pip3 install --upgrade pip

COPY . ./

RUN pip3 install -r requirements.txt
RUN pip3 install gunicorn

COPY var/scripts/wait-for-postgres.sh .

RUN chmod +x wait-for-postgres.sh