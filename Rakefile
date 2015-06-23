namespace :coffee do

  desc "Compile"
  task :compile do
    require 'coffee-script'

    puts "Compiling Coffeescript"

    core = CoffeeScript.compile File.read("#{Dir.pwd}/src/form.authy.core.coffee")
    File.open("#{Dir.pwd}/src/form.authy.core.js", 'w') { |file| file.write(core) }
    FileUtils.copy("#{Dir.pwd}/src/form.authy.core.js", "#{Dir.pwd}/src/form.authy.js")

    main = CoffeeScript.compile File.read("#{Dir.pwd}/src/form.authy.coffee")
    File.open("#{Dir.pwd}/src/form.authy.js", 'a') { |file| file.write(main) }
  end
end


namespace :css do
  desc "Compile"
  task :compress do
    puts "Compressing css"
    require "yui/compressor"
    css = File.read("#{Dir.pwd}/src/flags.authy.css")
    css += File.read("#{Dir.pwd}/src/form.authy.css")

    compressor = YUI::CssCompressor.new
    min_css =  compressor.compress(css)
    File.open("#{Dir.pwd}/src/form.authy.min.css", 'w') { |file| file.write(min_css) }
  end
end


namespace :js do
  desc "Compile"
  task :compress do
    puts "Compressing javascript"
    require "yui/compressor"

    %w(form.authy form.authy.core).each do |filename|
      js = File.read("#{Dir.pwd}/src/#{filename}.js")
      compressor = YUI::JavaScriptCompressor.new
      min_js = compressor.compress(js)
      File.open("#{Dir.pwd}/src/#{filename}.min.js", 'w') { |file| file.write(min_js) }
    end
  end
end

task :compile => ["coffee:compile","css:compress", "js:compress"] do
end

task :package => ["compile"] do
  puts "Generating form.authy.zip ..."
  system "cd src; zip form.authy.zip form.authy.min.js form.authy.core.min.js form.authy.min.css images/**/*; mv form.authy.zip .."
end

task :default => :compile
