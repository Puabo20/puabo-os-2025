# PUABO OS VPS Deployment Guide

## Prerequisites
- Ubuntu 20.04+ VPS with root access
- Domain name pointing to your VPS IP
- At least 2GB RAM and 20GB storage

## Quick Deployment

### 1. Initial Setup
```bash
# Connect to your VPS
ssh root@your-server-ip

# Clone or upload PUABO OS files
git clone <your-repo> /opt/puabo-os
# OR upload files via SCP/SFTP

cd /opt/puabo-os
chmod +x deploy.sh setup-ssl.sh
```

### 2. Configure Environment
```bash
# Edit production environment
nano .env.production

# Update these values:
VITE_SUPABASE_URL=https://zkfmmurtionfafbzpohy.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key
VITE_APP_DOMAIN=your-domain.com
```

### 3. Deploy Application
```bash
# Run deployment script
./deploy.sh

# Check if containers are running
docker-compose ps
```

### 4. Setup SSL (Optional but Recommended)
```bash
# Setup SSL with your domain
./setup-ssl.sh your-domain.com
```

## Manual Configuration

### Docker Commands
```bash
# View logs
docker-compose logs -f puabo-os

# Restart application
docker-compose restart puabo-os

# Update application
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### NGINX Configuration
- HTTP config: `nginx.conf`
- HTTPS config: `nginx-ssl.conf` (auto-generated)

### Firewall Setup
```bash
# Allow required ports
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

## Troubleshooting

### Check Application Status
```bash
# Container status
docker-compose ps

# Application logs
docker-compose logs puabo-os

# System resources
docker stats
```

### Common Issues
1. **Port conflicts**: Ensure ports 80/443 are free
2. **SSL issues**: Check domain DNS and certificate paths
3. **Memory issues**: Ensure adequate RAM (2GB minimum)

## Monitoring
- Application: http://your-domain.com
- Container stats: `docker stats`
- System logs: `/var/log/nginx/`

## Backup
```bash
# Backup application data
docker-compose exec puabo-os tar -czf /backup.tar.gz /usr/share/nginx/html

# Backup environment
cp .env .env.backup
```