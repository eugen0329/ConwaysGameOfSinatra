require "sinatra"

configure do 
  set :root, File.dirname(__FILE__)
  set :public_directory, './public'
  set :views, settings.root + '/views'
  
end
  
get '/'  do
  erb :"index.html",  :format => :html5
end

not_found do
     status 404
     "Something wrong"
end
