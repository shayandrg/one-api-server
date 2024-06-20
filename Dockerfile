FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /etc/letsencrypt/live/ai.livecdn.website/
COPY /path/to/certificates/fullchain.pem /etc/letsencrypt/live/ai.livecdn.website/fullchain.pem
COPY /path/to/certificates/privkey.pem /etc/letsencrypt/live/ai.livecdn.website/privkey.pem
