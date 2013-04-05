coffee:
	coffee --watch --compile --map js/

server:
	node server.js

.PHONY: coffee