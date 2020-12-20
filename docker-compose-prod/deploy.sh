cd /var/www/loopr
docker-compose -f ./docker-compose-prod/docker-compose.yml down
docker-compose -f ./docker-compose-prod/docker-compose.yml pull
docker-compose -f docker-compose-prod/docker-compose.yml up -d
