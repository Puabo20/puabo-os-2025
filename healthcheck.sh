#!/bin/bash

# PUABO OS Health Check Script
# Run this to verify deployment status

echo "🔍 PUABO OS Health Check"
echo "========================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running"
    exit 1
else
    echo "✅ Docker is running"
fi

# Check if containers are running
cd /opt/puabo-os 2>/dev/null || cd .

CONTAINERS=$(docker-compose ps -q)
if [ -z "$CONTAINERS" ]; then
    echo "❌ No containers are running"
    exit 1
else
    echo "✅ Containers are running"
fi

# Check container health
UNHEALTHY=$(docker-compose ps | grep -c "unhealthy\|Exit")
if [ "$UNHEALTHY" -gt 0 ]; then
    echo "⚠️  Some containers are unhealthy"
    docker-compose ps
else
    echo "✅ All containers are healthy"
fi

# Check if application is responding
if curl -f -s http://localhost > /dev/null; then
    echo "✅ Application is responding on HTTP"
else
    echo "❌ Application is not responding on HTTP"
fi

# Check SSL if configured
if [ -f "ssl/cert.pem" ]; then
    if curl -f -s -k https://localhost > /dev/null; then
        echo "✅ Application is responding on HTTPS"
    else
        echo "❌ Application is not responding on HTTPS"
    fi
fi

# Check disk space
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 90 ]; then
    echo "⚠️  Disk usage is high: ${DISK_USAGE}%"
else
    echo "✅ Disk usage is normal: ${DISK_USAGE}%"
fi

# Check memory usage
MEMORY_USAGE=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
if [ "$MEMORY_USAGE" -gt 90 ]; then
    echo "⚠️  Memory usage is high: ${MEMORY_USAGE}%"
else
    echo "✅ Memory usage is normal: ${MEMORY_USAGE}%"
fi

echo ""
echo "🌐 Access your application at:"
echo "   HTTP:  http://$(curl -s ifconfig.me)"
if [ -f "ssl/cert.pem" ]; then
    echo "   HTTPS: https://$(curl -s ifconfig.me)"
fi

echo ""
echo "📊 Quick Stats:"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"