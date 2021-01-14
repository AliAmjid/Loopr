args =

dockerComposeFiles = -f docker-compose.yml

dev-build:
	sudo docker-compose $(dockerComposeFiles) build $(args)
dev-up:
	sudo docker-compose $(dockerComposeFiles) up $(args)
dev-up-build:
	sudo docker-compose $(dockerComposeFiles) up --build $(args)
dev-down:
	sudo docker-compose $(dockerComposeFiles) down $(args)

api-generate-jwt:
	sudo docker-compose $(dockerComposeDevFiles) exec php sh -c 'set -e apk add openssl mkdir -p config/jwt jwt_passphrase=${JWT_PASSPHRASE:-$(grep ''^JWT_PASSPHRASE='' .env | cut -f 2 -d ''='')} echo "$jwt_passphrase" | openssl genpkey -out config/jwt/private.pem -pass stdin -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096 echo "$jwt_passphrase" | openssl pkey -in config/jwt/private.pem -passin stdin -out config/jwt/public.pem -pubout setfacl -R -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt setfacl -dR -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt '
api-load-resources:
	sudo docker-compose $(dockerComposeDevFiles) exec php bin/console acl:load-resources
api-encode-password:
	sudo docker-compose $(dockerComposeDevFiles) exec php bin/console security:encode-password
api-tests:
	sudo docker-compose $(dockerComposeDevFiles) exec php bin/phpunit
api-dump-env:
	sudo docker-compose $(dockerComposeDevFiles) exec php composer dump-env dev
api-messenger:
	sudo docker-compose $(dockerComposeDevFiles) exec php php bin/console messenger:consume async
api-generate-schema:
	sudo docker-compose $(dockerComposeDevFiles) exec php bin/console api:graphql:export
api-clear-cache:
	sudo docker-compose $(dockerComposeDevFiles) exec php bin/console cache:clear

