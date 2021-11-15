build:
	docker-compose --project-name biograph  --env-file ./.env build --parallel
force-rebuild:
	docker-compose build --force-recreate --no-deps $(service)
run:
	docker-compose up
