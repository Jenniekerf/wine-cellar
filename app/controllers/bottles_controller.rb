class BottlesController < ApplicationController

  def index
    @bottles = Bottle.all
  end

  def new
    @bottle = Bottle.new
  end

  def create
    @bottle = Bottle.new(bottle_params)
  end


  private

  def bottle_params
    params.require(:bottle).permit(:name, :variety, :producer, :year)
  end

end
