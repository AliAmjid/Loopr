dockerComposeDevFiles = -f docker-compose.yml -f docker-compose.dev.yml

dev-build:
	sudo docker-compose $(dockerComposeDevFiles) build
dev-up:
	sudo docker-compose $(dockerComposeDevFiles) up
dev-up-build:
	sudo docker-compose $(dockerComposeDevFiles) up --build
dev-down:
	sudo docker-compose $(dockerComposeDevFiles) down
