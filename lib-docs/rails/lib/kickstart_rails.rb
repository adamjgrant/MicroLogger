module Kickstart_rails
  class Engine < Rails::Engine
    initializer 'kickstart_rails.assets.precompile' do |app|
      %w(stylesheets javascripts).each do |sub|
        app.config.assets.paths << root.join('assets', sub)
      end
    end
  end

  def gem_path
    @gem_path ||= File.expand_path '..', File.dirname(__FILE__)
  end

  def assets_path
    @assets_path ||= File.join gem_path, 'app/assets'
  end

  def stylesheets_path
    File.join assets_path, 'stylesheets'
  end

  def javascripts_path
    File.join assets_path, 'javascripts'
  end

  def configure_sass
    require 'sass'

    ::Sass.load_paths << stylesheets_path
    ::Sass::Script::Number.precision = [10, ::Sass::Script::Number.precision].max
  end 
end
