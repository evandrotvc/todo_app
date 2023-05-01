require 'rails_helper'

RSpec.describe TodosController do
  let(:json) { response.parsed_body }

  describe 'GET /index' do
    context 'with valid parameters' do
      let(:todos) { create_list(:todo, 3) }

      let(:do_request) do
        get :index, as: :json
      end

      before { do_request }

      it 'must to return all documents' do
        expect(response).to have_http_status(:ok)
        expect(json['todos']).should_not be_nil
      end
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      let(:params) do
        {
          title: 'study for 2 hours'
        }
      end
      let(:do_request) do
        post :create, params: { todo: params }, as: :json
      end

      it 'must to created document' do
        expect { do_request }.to change(Todo, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end
  end

  describe 'PUT /create' do
    context 'with valid parameters' do
      let!(:todo) { create(:todo, title: 'study') }

      let(:params) do
        {
          title: 'read'
        }
      end
      let(:do_request) do
        put :update, params: { id: todo.id, todo: params }, as: :json
      end

      it 'must to created todo' do
        do_request
        expect do
          todo.reload
        end.to change(todo, :title).from('study').to('read')

        expect(response).to have_http_status(:ok)
      end
    end
  end
end
