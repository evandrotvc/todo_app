# frozen_string_literal: true

class ItemsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_item,
      only: %i[show edit update destroy]
    before_action :set_todo
  
    def index
      @items = @todo.items

      render :index, status: :ok
    end
  
    def show
      render status: :ok, json: @item
    end
  
    def new
      @item = Item.new
    end
  
    def edit; end

    def create
      @item = Item.new(item_params)
      @item.todo = @todo
  
      if @item.save
        render json: @item, status: :created
      else
        render json: @item.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if @item.update(item_params)
        render json: @item, status: :ok
      else
        render json: @item.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @item.destroy!
  
      render status: :ok, json: { message: 'item was destroyed with sucess' }
    end
  
    private

    def set_todo
      @todo = Todo.find(params[:todo_id])
    end

    def set_item
        @item = Item.find(params[:id])
      end

    def item_params
      params.require(:item).permit(:description)
    end
end
