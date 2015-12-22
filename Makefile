.PHONY: build

build:
	$(MAKE) build-app
	$(MAKE) build-dev

build-app:
	npm install
	npm run-script app:build

build-dev:
	npm install
	npm run-script dev:build
