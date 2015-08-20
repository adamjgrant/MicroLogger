# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'kickstart_rails/version'

Gem::Specification.new do |spec|
  spec.name          = "kickstart_rails"
  spec.version       = Kickstart_rails::VERSION
  spec.authors       = ["Adam Kochanowicz"]
  spec.email         = ["adamjgrant@gmail.com"]
  spec.summary       = %q{The front-end library for clean HTML and fast websites.}
  spec.description   = %q{The front-end library for clean HTML and fast websites.}
  spec.homepage      = "http://getkickstart.com"
  spec.license       = "MIT"

  spec.files         = Dir.glob(["{app,lib}/**/*"]).reject{ |f| f['LICENSE']} + %w(README.md Rakefile)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.6"
  spec.add_development_dependency "rake", "~> 10.0"

  spec.add_dependency "sass", "~> 3.3"
  spec.add_dependency "normalize-rails", "~> 3.0"
  spec.add_dependency "autoprefixer-rails", "~> 3.0"
end
