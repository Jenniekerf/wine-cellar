class BottlesController < ApplicationController

  def index
    @bottles = Bottle.all
  end
end
