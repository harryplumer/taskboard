class Api::TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]
  
    def index
      render :json => Task.order(:due_date).to_json(:include => { :category => { :only => :id }})
    end
  
    def show
      render json: @task
    end
  
    def create
      @category = Category.find(params[:task][:category])
      task = @category.tasks.new(task_params)
      if task.save
        render :json =>  task.to_json(:include => { :category => { :only => :id }})
      else
        render json: { errors: task.errors.full_messages.join(',') }, status: 422
      end
    end
  
    def update
      if @task.update(task_params)
        render :json =>  @task.to_json(:include => { :category => { :only => :id }})
      else
        render json: { errors: @task.errors.full_messages.join(',') }, status: 422
      end
    end
  
    def destroy
      @task.destroy
    end
  
    private
      def set_category
        @category = Category.find(params[:category_id])
      end

      def set_task
        @task = Task.find(params[:id])
      end 
  
      def task_params
        params.require(:task).permit(:title, :description, :color, :due_date)
      end
end
