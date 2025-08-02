#!/bin/bash

# PUABO OS VPS Deployment Script
# Run this script on your Ubuntu VPS

set -e

echo "🚀 Starting PUABO OS deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

# Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null; then
    echo "🔧 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Create application directory
echo "📁 Setting up application directory..."
sudo mkdir -p /opt/puabo-os
sudo chown $USER:$USER /opt/puabo-os
cd /opt/puabo-os

# Copy environment file
if [ ! -f .env ]; then
    echo "⚙️ Creating environment file..."
    cp .env.production .env
    echo "Please edit .env file with your actual Supabase keys!"
fi

# Build and start containers
echo "🏗️ Building and starting containers..."
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

# Setup firewall
echo "🔒 Configuring firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

echo "✅ PUABO OS deployment completed!"
echo "🌐 Your application should be available at http://$(curl -s ifconfig.me)"
echo "📝 Don't forget to:"
echo "   1. Update .env with your actual Supabase keys"
echo "   2. Configure your domain DNS to point to this server"
echo "   3. Set up SSL certificates if using HTTPS"