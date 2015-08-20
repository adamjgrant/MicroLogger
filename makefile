build:
	@git submodule update --init --recursive
	@make build-icons
	@make build-default
	@make build-rails
	@make build-node

build-default:
	@echo "Getting latest..."
	@git pull origin master
	
	@echo "Installing node dependencies..."
	@npm install
	
	@echo "Installing ruby dependencies..."
	@bundle
	
	@echo "Running tests..."
	@gulp docs:test
	
	@echo "Building project"
	@gulp build

build-rails:
	@echo "Bumping Rails gem version"
	@cd lib-docs/rails;gem bump
	
	@echo "Copying in assets"
	@mkdir -p rails
	@rm -rf rails/*
	@cp -r lib-docs/rails/app rails/
	@cp -r lib-docs/rails/lib rails/
	# @cp -r lib/sass/* rails/app/assets/stylesheets/
	@rsync -av --exclude-from 'rsync-exclude.txt' lib-core/sass/ rails/app/assets/stylesheets/
	@cp lib-core/sass/themes/default/theme.sass lib-docs/sass/themes/default/
	@cp public/js/script.js rails/app/assets/javascripts/kickstart_rails/kickstart.js
	@cp lib-docs/rails/Gemfile lib-docs/rails/kickstart_rails.gemspec lib-docs/rails/LICENSE lib-docs/rails/Rakefile lib-docs/rails/README.md rails/
	@cd rails;gem release

build-node:
	@npm version patch
	@npm publish

build-icons:
	@mkdir -p docs
	@mkdir -p docs/svgs
	@echo "Generating SVGs"
	@./build.rb

setup:
	@make build-icons
	@sudo npm install -g gulp
	@sudo npm install
	@bundle install
	@make build-default

# # This will move over only the docs from 3.x that haven't changed in 4.x
# sync-docs:
# 	@rsync -av --exclude-from '4.x-pages.txt' lib-docs/jade/docs/3.x/ lib-docs/jade/docs/4.x/
