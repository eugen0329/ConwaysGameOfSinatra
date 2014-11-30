require "sinatra"
require "data_mapper"
require_relative "lib/map.rb"
require_relative "lib/cell.rb"

MAP_SIZE = Lifegame::Coordinates.new(40,40)

configure do 
  set :root, File.dirname(__FILE__)
  set :public_directory, './public'
  set :views, settings.root + '/views'

  set :port, 9000
end

helpers do
  class Game
    @@instance = Lifegame::Map.new(MAP_SIZE.y,MAP_SIZE.x)
    def self.instance
      @@instance
    end
  end
end

get '/' do
  @title = "Game of life"
  erb :home
end

post "/next-gen" do
  if request.xhr? 
    cells =  params[:cells].each_char.map(&:to_i)
    Game.instance.each_cell { |cell| cell.stat = cells.shift }
    Game.instance.change_gen
    Game.instance.each_cell.map(&:stat).join
  else
    redirect "/"
  end
end

get "/randomized" do
  if request.xhr? 
    Game.instance.randomize.each_cell.map(&:stat).join
  else
    redirect "/"
  end
end

not_found do
  halt 404, "Something wrong"
end
