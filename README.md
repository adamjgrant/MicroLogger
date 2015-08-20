Kickstart
=========

Kickstart is a modern front-end CSS library for clean HTML and fast performance.

[getkickstart.com](http://getkickstart.com)

[ ![Codeship Status for adamjgrant/kickstart](https://www.codeship.io/projects/bf939ac0-1a88-0132-7edc-6605d664157f/status)](https://www.codeship.io/projects/34696)

[![Code Climate](https://codeclimate.com/github/adamjgrant/Kickstrap/badges/gpa.svg)](https://codeclimate.com/github/adamjgrant/Kickstrap)

## Quickstart with Gulp 

Clone the repository and run `make setup` in the directory created. This is only required when starting the project.

Run gulp to again build and watch the project. A browser tab should open in your
default browser automatically when ready. You'll also get an external URL you
can use on other devices.

Alternatively, run `gulp build` to build the project without watching or creating a server.

## Going further

If when running the `gulp` command, node warns you a module is missing, a
dependency probably wasn't installed. It may be enough to run `npm install` again
to catch the missing dependency. In some cases, this problem can be solved by
deleting the `node_modules` directory and running `npm install` again.

### Javascript assets

JavaScript assets can be written as modules in lib/coffee. Add each module to app.coffee
in this same directory to output a single, minified JavaScript file with Kickstart.js
included.

### CSS assets

A style.sass should currently exist in lib/sass. Use this to write your styles, importing 
any other sass files you create along the way. To change themes, simply change the theme
import at the top of the file.

# Building getkickstart.com and Kickstart core

## Gulp

Directions are similar to the above, however, you should run `gulp watch:docs` exclusively for
docs creation. This will output to /docs instead of /public.

Alternatively, run `gulp build:docs` to build without watching.

## Rails gem and Node.js package

To build gem/package, run `make build-all`. This will automatically fire up gulp
to compile files, bump version numbers, and deploy to NPM/RubyGems.org respectively.

## Deployment

- Deployed with [CodeShip](http://codeship.io)
- master deploys to getkickstart.com
- stage deploys to stage.getkickstart.com
