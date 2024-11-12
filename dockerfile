FROM python:3-alpine

WORKDIR /backend

COPY requirements.txt /backend


COPY log.ini /backend

COPY app /backend/app

RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps musl-dev postgresql-dev 
 
RUN apk add gcc \
  && apk add g++ \
  && apk add unixodbc unixodbc-dev 


RUN pip install -r /backend/requirements.txt

COPY run.py /backend

CMD ["python", "/backend/run.py"]