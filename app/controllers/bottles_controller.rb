class BottlesController < ApplicationController

  def index
    @bottles = Bottle.all
  end

  def new
    @bottle = Bottle.new
  end

  def create
    @bottle = Bottle.new(bottle_params)
    if @bottle.save
      redirect_to root_path
    else
      render 'new'
    end 
  end


  private

  def bottle_params
    params.require(:bottle).permit(:name, :variety, :producer, :year, :category)
  end

end
