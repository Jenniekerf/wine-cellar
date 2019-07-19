class BottlesController < ApplicationController
  skip_before_action :require_login, only: [:index, :show, :cheap, :moderate, :fancy, :red_wine, :white_wine, :rosé_wine, :orange_wine, :sparkling_wine, :dessert_wine]


  def index
    @bottles = Bottle.all
  end

  def show
    @bottle = Bottle.find(params[:id])
  end

  def cheap
    @bottles = Bottle.cheap
  end

  def moderate
    @bottles = Bottle.moderate
  end

  def fancy
    @bottles = Bottle.fancy
  end

  def red_wine
    @red_wine = Bottle.red_wine
  end

  def white_wine
    @white_wine = Bottle.white_wine
  end

  def rosé_wine
    @rosé_wine = Bottle.rosé_wine
  end

  def sparkling_wine
    @sparkling_wine = Bottle.sparkling_wine
  end

  def orange_wine
    @orange_wine = Bottle.orange_wine
  end

  def dessert_wine
    @dessert_wine = Bottle.dessert_wine
  end

  def home
    @bottles = current_user.bottles
  end

  def new
    @bottle = current_user.bottles.build
  end

  def create
    @bottle = current_user.bottles.build(bottle_params)

    if @bottle.save
      redirect_to bottles_path
    else
      render 'new'
    end
  end

  def edit
    @bottle = Bottle.find(params[:id])
  end

  def update
    @bottle = Bottle.find(params[:id])
    if @bottle.update(bottle_params)
      redirect_to bottle_path(@bottle)
    else
      render 'edit'
    end
  end

  def destroy
    @bottle = Bottle.find(params[:id])
    @bottle.destroy
    redirect_to bottles_path
  end

  private

  def bottle_params
    params.require(:bottle).permit(:name, :variety, :producer, :year, :price_cents, :category)
  end




end
