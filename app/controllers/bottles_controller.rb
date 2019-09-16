class BottlesController < ApplicationController
skip_before_action :verify_authenticity_token, only: [:home_index, :create]
skip_before_action :require_login, only: [:index, :show, :cheap, :moderate, :fancy, :red_wine, :white_wine, :rosé_wine, :orange_wine, :sparkling_wine, :dessert_wine]
before_action :find_bottle, only: [:show, :edit, :update, :destroy]

  def index
    if params[:name]
      @bottles = Bottle.where('name LIKE ?', "%#{params[:name]}%")
    else
     @bottles = Bottle.all
  end
  end

  def show
    #@comment = @bottle.comments.build
    respond_to do |f|
      f.html
      f.json {render json: @bottle}
  end
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
    @bottles = Bottle.red_wine
  end

  def white_wine
    @bottles = Bottle.white_wine
  end

  def rosé_wine
    @bottles = Bottle.rosé_wine
  end

  def sparkling_wine
    @bottles = Bottle.sparkling_wine
  end

  def orange_wine
    @bottles = Bottle.orange_wine
  end

  def dessert_wine
    @bottles = Bottle.dessert_wine
  end

  def home
    @bottles = current_user.bottles
  end

  def home_index
  bottles = current_user.bottles
  render json: bottles
 end

  def new
    @bottle = current_user.bottles.build
  end

  def create
    @bottle = current_user.bottles.build(bottle_params)
    if @bottle.save
      render json: @bottle, status: 201
    else
      render json: @bottle, status: :bad_request
    end
    # @bottle = current_user.bottles.build(bottle_params)
    #
    # if @bottle.save
    #   redirect_to bottles_home_path
    # else
    #   render 'new'
    #   end
  end

  def edit

  end

  def update
    if @bottle.update(bottle_params)
      redirect_to bottle_path(@bottle)
    else
      render 'edit'
    end
  end

  def destroy
    @bottle.destroy
    redirect_to bottles_path
  end

  private

  def bottle_params
    params.require(:bottle).permit(:name, :variety, :producer, :year, :price_cents, :category)
  end

  def find_bottle
  @bottle = Bottle.find(params[:id])
  end




end
