require 'rails_helper'

RSpec.describe ItemsController do
  let(:json) { response.parsed_body }
  let!(:todo) { create(:todo) }


  describe 'GET /index' do
    context 'with valid parameters' do
      let!(:items) { create_list(:item, 3, todo: todo) }

      let(:do_request) do
        get :index, params: { todo_id: todo.id }, as: :json
      end

      before { do_request }

      it 'must to return all documents' do
        expect(response).to have_http_status(:ok)

        expect(json['items']).should_not be_nil
      end
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      let(:params) do
        {
          description: 'study for 2 hours'
        }
      end
      let(:do_request) do
        post :create, params: { todo_id: todo.id, item: params }, as: :json
      end

      it 'must to created document' do
        expect { do_request }.to change(Item, :count).by(1)
        expect(response).to have_http_status(:created)
        expect(todo.items.count).to eq(1)
      end
    end
  end

  describe 'PUT /update' do
    context 'with valid parameters' do
      let!(:item) { create(:item, description: 'study', todo:) }

      let(:params) do
        {
          description: 'read'
        }
      end
      let(:do_request) do
        put :update, params: { todo_id: todo.id, id: item.id, item: params }, as: :json
      end

      it 'must to created todo' do
        do_request
        expect do
          item.reload
        end.to change(item, :description).from('study').to('read')

        expect(response).to have_http_status(:ok)
      end
    end
  end
end
