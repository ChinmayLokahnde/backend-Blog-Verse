# Use a Node.js + Python base image
FROM node:18-bullseye


RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv && \
    apt-get clean


ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"


COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt


WORKDIR /app
COPY . .

RUN npm install

EXPOSE 5000
CMD ["npm", "start"]
