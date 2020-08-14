dockerComposeDevFiles = -f docker-compose.yml -f docker-compose.dev.yml
dockerComposeProdFiles = -f docker-compose.yml -f docker-compose.prod.yml

dev-build:
	sudo docker-compose $(dockerComposeDevFiles) build
dev-up:
	sudo docker-compose $(dockerComposeDevFiles) up
dev-up-build:
	sudo docker-compose $(dockerComposeDevFiles) up --build
dev-down:
	sudo docker-compose $(dockerComposeDevFiles) down

prod-build:
	sudo docker-compose $(dockerComposeProdFiles) build
prod-up:
	sudo docker-compose $(dockerComposeProdFiles) up
prod-up-build:
	sudo docker-compose $(dockerComposeProdFiles) up --build
prod-down:
	sudo docker-compose $(dockerComposeProdFiles) down
loopr:
	docker-compose exec php bin/console
