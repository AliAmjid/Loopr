cd /var/www/loopr
gcloud --quiet auth configure-docker
sudo docker-compose -f ./docker-compose-prod/docker-compose.yml down
sudo docker-compose -f ./docker-compose-prod/docker-compose.yml pull
sudo docker-compose -f docker-compose-prod/docker-compose.yml up -d
