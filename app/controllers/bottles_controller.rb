class BottlesController < ApplicationController

  def index
    @bottles = Bottle.all
  end

  def show
    @bottle = Bottle.find(params[:id])
  end

  def new
    @bottle = current_user.bottles.build
    @categories = Category.all.map{ |cat| [cat.name, cat.id] }
  end

  def create
    @bottle = current_user.bottles.build(bottle_params)
    @bottle.category_id = params[:category_id]

    if @bottle.save
      redirect_to root_path
    else
      render 'new'
    end
  end

  def edit
    @bottle = Bottle.find(params[:id])
    @categories = Category.all.map{ |cat| [cat.name, cat.id] }
  end

  def update
    @bottle = Bottle.find(params[:id])
    @bottle.category_id = params[:category_id]
    if @bottle.update(bottle_params)
      redirect_to bottle_path(@bottle)
    else
      render 'edit'
    end
  end

  def destroy
    @bottle = Bottle.find(params[:id])
    @bottle.destroy
    redirect_to bottle_path
  end

  private

  def bottle_params
    params.require(:bottle).permit(:name, :variety, :producer, :year, :price_cents, :category_id)
  end

end
