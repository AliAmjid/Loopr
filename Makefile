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
	sudo docker-compose exec php sh -c 'set -e apk add openssl mkdir -p config/jwt jwt_passphrase=${JWT_PASSPHRASE:-$(grep ''^JWT_PASSPHRASE='' .env | cut -f 2 -d ''='')} echo "$jwt_passphrase" | openssl genpkey -out config/jwt/private.pem -pass stdin -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096 echo "$jwt_passphrase" | openssl pkey -in config/jwt/private.pem -passin stdin -out config/jwt/public.pem -pubout setfacl -R -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt setfacl -dR -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt '
api-load-resources:
	sudo docker-compose exec php bin/console acl:load-resources
api-encode-password:
	sudo docker-compose exec php bin/console security:encode-password
api-tests:
	sudo docker-compose exec php bin/phpunit
