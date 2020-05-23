clean:
	echo 'TODO asem add clean hook to Makefile'
build:
	ng build --prod
deploy: clean build
	firebase deploy
sloc:
	wc -l `find src -iname '*.ts'` `find src -iname '*.html'` `find src -iname '*.less'`
