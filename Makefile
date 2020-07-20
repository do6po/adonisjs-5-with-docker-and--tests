.SILENT:

include .env

dc = docker-compose -p ${APP_NAME}

web = web
db = db
db_testing = db_testing
cache = cache
node = node

build: chmod build_containers chmod information

start: start_containers chmod information

build_containers:
	$(dc) up --build --force-recreate -d

start_containers:
	$(dc) start

stop:
	$(dc) stop

down:
	$(dc) down

logs:
	$(dc) logs

logs_f:
	$(dc) logs -f

ps:
	$(dc) ps

db_bash:
	$(dc) exec $(db) bash

db_testing_bash:
	$(dc) exec $(db_testing) bash

node_bash:
	$(dc) exec $(node) bash

start_watch:
	${dc} exec $(node) node ace serve --watch

restart:
	$(dc) restart

chmod:
	sudo chmod 777 -R .

information:
	echo "WEB - http://${DOCKER_BRIDGE}"
