FROM python:3.14

WORKDIR /app

COPY app ./

COPY requirements.txt ./

COPY run.py ./

COPY log.ini ./

RUN pip install -r requirements.txt

CMD ["python", "run.py"]