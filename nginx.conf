server {
    listen 80;
    server_name ai.eron.co;

    location / {
        client_max_body_size 64m;
        proxy_http_version 1.1;
        proxy_pass http://one-api:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Accept-Encoding gzip;
    }
}

server {
    listen 443 ssl;
    server_name ai.eron.co;

    ssl_certificate /etc/letsencrypt/live/ai.eron.co/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ai.eron.co/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        client_max_body_size 64m;
        proxy_http_version 1.1;
        proxy_pass http://one-api:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Accept-Encoding gzip;
    }
}
