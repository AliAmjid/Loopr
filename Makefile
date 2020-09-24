args =


dockerComposeDevFiles = -f docker-compose.yml -f docker-compose.dev.yml
dockerComposeProdFiles = -f docker-compose.yml -f docker-compose.prod.yml

dev-build:
	sudo docker-compose $(dockerComposeDevFiles) build $(args)
dev-up:
	sudo docker-compose $(dockerComposeDevFiles) up $(args)
dev-up-build:
	sudo docker-compose $(dockerComposeDevFiles) up --build $(args)
dev-down:
	sudo docker-compose $(dockerComposeDevFiles) down $(args)

prod-build:
	sudo docker-compose $(dockerComposeProdFiles) build $(args)
prod-up:
	sudo docker-compose $(dockerComposeProdFiles) up $(args)
prod-up-build:
	sudo docker-compose $(dockerComposeProdFiles) up --build $(args)
prod-down:
	sudo docker-compose $(dockerComposeProdFiles) down $(args)

api-generate-jwt:
	sudo ě
api-load-resources:
	sudo docker-compose exec php bin/console acl:load-resources

api-encode-password:
	sudo docker-compose exec php bin/console security:encode-password

api-tests:
	sudo docker-compose exec php bin/phpunit
