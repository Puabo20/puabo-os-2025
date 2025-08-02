#!/bin/bash

# SSL Setup Script for PUABO OS
# Run this after deploy.sh to enable HTTPS

set -e

DOMAIN=${1:-"your-domain.com"}

echo "🔐 Setting up SSL for domain: $DOMAIN"

# Install Certbot
echo "📦 Installing Certbot..."
sudo apt update
sudo apt install -y certbot python3-certbot-nginx

# Stop containers temporarily
echo "⏸️ Stopping containers..."
cd /opt/puabo-os
docker-compose down

# Get SSL certificate
echo "🎫 Obtaining SSL certificate..."
sudo certbot certonly --standalone -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Create SSL directory
sudo mkdir -p /opt/puabo-os/ssl
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem /opt/puabo-os/ssl/cert.pem
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem /opt/puabo-os/ssl/private.key
sudo chown -R $USER:$USER /opt/puabo-os/ssl

# Update nginx config for HTTPS
cat > /opt/puabo-os/nginx-ssl.conf << EOF
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    server {
        listen 80;
        server_name $DOMAIN;
        return 301 https://\$server_name\$request_uri;
    }
    
    server {
        listen 443 ssl http2;
        server_name $DOMAIN;
        
        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/private.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
        
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files \$uri \$uri/ /index.html;
        }
        
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)\$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
EOF

# Update docker-compose to use SSL config
sed -i 's|nginx.conf|nginx-ssl.conf|g' /opt/puabo-os/docker-compose.yml

# Start containers with SSL
echo "🚀 Starting containers with SSL..."
docker-compose up -d

# Setup auto-renewal
echo "🔄 Setting up SSL auto-renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet && docker-compose -f /opt/puabo-os/docker-compose.yml restart puabo-os") | crontab -

echo "✅ SSL setup completed!"
echo "🌐 Your application is now available at https://$DOMAIN"