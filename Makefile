coffee:
	coffee --watch --compile --map js/

optimize:
	node r.js -o build.js

.PHONY: coffee