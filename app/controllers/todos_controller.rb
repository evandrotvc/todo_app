# frozen_string_literal: true

class TodosController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_todo,
      only: %i[show edit update destroy]
  
    def index
      @todos = Todo.all
  
      render :index, status: :ok
    end
  
    def show
      render status: :ok, json: @todo
    end
  
    def new
      @todo = Todo.new
    end
  
    def edit; end

    def create
      @todo = Todo.new(todo_params)
  
      if @todo.save
        render json: @todo, status: :created
      else
        render json: @todo.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if @todo.update(todo_params)
        render json: @todo, status: :ok
      else
        render json: @todo.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @todo.destroy!
  
      render status: :ok, json: { message: 'Todo was destroyed with sucess' }
    end
  
    private

    def set_todo
      @todo = Todo.find(params[:id])
    end

    def todo_params
      params.require(:todo).permit(:title)
    end
end
