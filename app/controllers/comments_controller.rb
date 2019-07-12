class CommentsController < ApplicationController

  def new
    @bottle = Bottle.find(params[:bottle_id])
    @comment = Comment.new
  end

  def create
    @bottle = Bottle.find(params[:bottle_id])
    @comment = Comment.new(comment_params)
    @comment.bottle_id = @bottle.id
    @comment.user_id = current_user.id

    if @comment.save
      redirect_to bottle_path(@bottle)
    else
      render 'new'
    end
  end

  def edit
    @bottle = Bottle.find(params[:bottle_id])
    @comment = Comment.find(params[:id])
  end

  def update
    @bottle = Bottle.find(params[:bottle_id])
    @comment = Comment.find(params[:id])

    if @comment.update(comment_params)
      redirect_to bottle_path(@bottle)
    else
      render 'edit'
    end
  end

  def destroy
    @bottle = Bottle.find(params[:bottle_id])
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to bottle_path(@bottle)
  end

  private

  def comment_params
    params.require(:comment).permit(:tasting_note)
  end

end
