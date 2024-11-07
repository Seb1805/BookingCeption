FROM python:3.13

WORKDIR /backend

COPY requirements.txt /backend

COPY run.py /backend

COPY log.ini /backend

COPY createvenv.bat /backend

COPY app /backend/app

RUN pip install -r requirements.txt

# RUN createvenv

# RUN fastapiVenv/Script/activate

# CMD [ "pip", "install", "-r", "requirements.txt" ]

CMD ["python", "run.py"]