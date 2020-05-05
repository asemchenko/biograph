clean:
	mvn clean
build:
	mvn package
deploy: clean
	mvn clean heroku:deploy
logs:
	heroku logs --tail
