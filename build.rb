#!/usr/bin/env ruby

require 'pathname'
require 'json'

def build
  @svg_names = Dir.entries("./lib-core/svgs/lg").reject{|entry| entry =~ /^\.{1,2}$/}

  # Edit array to only contain root name
  @svg_names.map! {|item| File.basename(item, '.svg')}
  createIconList
  createResponsiveSVG
  createSingleFidelitySVG('sm')
  createSingleFidelitySVG('rg')
  createSingleFidelitySVG('lg')

  # Debugging
  @svg_names.each do |svg_name|
    puts svg_name
  end
end

def createIconList
  File.open("./docs/icons.js", "w+") do |f|
    f.puts "var icons = #{@svg_names.to_json}"
    f.puts "\n"
    f.puts "module.exports = icons;"
  end
end

def createResponsiveSVG
  # Write to responsive svg file
  File.open("./docs/svgs/icons-responsive.svg", "w+") do |f|
    f.truncate 0
    f.puts "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"display: none\">\n"
    @svg_names.each do |svg_name|
      f.puts "  <symbol id=\"#{svg_name}\" viewBox=\"0 0 32 32\">"
      # f.puts "    <svg width=\"32\" height=\"32\">"
      addPathsToFile(f, "lg", svg_name, true)
      addPathsToFile(f, "rg", svg_name, true)
      addPathsToFile(f, "sm", svg_name, true)
      # f.puts "    </svg>"
      f.puts "  </symbol>"
    end
    f.puts "</svg>\n"
  end
end

def createSingleFidelitySVG(fidelity = 'sm')
  File.open("./docs/svgs/icons-#{fidelity}.svg", "w+") do |f|
    f.truncate 0
    f.puts "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"display: none\">\n"
    @svg_names.each do |svg_name|
      f.puts "  <symbol id=\"#{svg_name}\" viewBox=\"0 0 32 32\">"
      # f.puts "    <svg width=\"32\" height=\"32\">"
      addPathsToFile(f, fidelity, svg_name)
      # f.puts "    </svg>"
      f.puts "  </symbol>"
    end
    f.puts "</svg>\n"
  end
end

def addPathsToFile(f, dir = nil, className = nil, responsive = false)
  File.open("./lib-core/svgs/#{dir}/#{className}.svg", 'r') do |d|
    while line = d.gets
      line = line.gsub %r{<svg([^<]+)>}, ''
      line = line.gsub '</svg>', ''
      if responsive
        line = line.gsub '<path ', "<path class=\"#{dir}\" "
        line = line.gsub '<g ', "<g class=\"#{dir}\" "
        line = line.gsub '<rect ', "<rect class=\"#{dir}\" "
        line = line.gsub '<polygon ', "<polygon class=\"#{dir}\" "
      end
      f.puts "    #{line}"
    end
  end
end

build
