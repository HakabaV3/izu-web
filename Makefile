.PHONY: build

build:
	$(MAKE) build-dev

build-dev:
	npm install
	npm run-script dev:build
