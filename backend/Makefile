clean:
	mvn clean
build:
	mvn package
deploy: clean build
	mvn clean heroku:deploy
logs:
	heroku logs --tail
sloc:
	wc -l `find src -iname '*.java'`
