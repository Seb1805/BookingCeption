FROM python:3.14

WORKDIR /app

COPY app ./

COPY requirements.txt ./

COPY run.py ./

COPY log.ini ./

RUN pip install -r requirements.txt

RUN createvenv

RUN fastapiVenv/Script/activate

CMD ["python", "run.py"]