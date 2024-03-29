class Api::CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :update, :destroy]
  
    def index
      render json: Category.order(:name)
    end
  
    def show
      render json: @category
    end
  
    def create
      category = Category.create(category_params)
      if category.save
        render json: Category.order(:name)
      else
        render json: { errors: category.errors.full_messages.join(',') }, status: 422
      end
    end
  
    def update
      if @category.update(category_params)
        render json: @category
      else
        render json: { errors: @category.errors.full_messages.join(',') }, status: 422
      end
    end
  
    def destroy
      @category.destroy
      render json: Category.order(:name)
    end
  
    private
      def set_category
        @category = Category.find(params[:id])
      end
  
      def category_params
        params.require(:category).permit(:name)
      end
  end
