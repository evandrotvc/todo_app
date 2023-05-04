# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Item do
  subject(:item) { build(:item, description: 'ler') }

  describe 'validations' do
    it { is_expected.to validate_presence_of(:description) }
  end

  describe 'item create' do
    before { item.save }

    it { is_expected.to be_persisted }
  end

  describe 'item description duplicated' do
    let!(:todo) { create(:todo) }
    let(:item2) { create(:item, description: 'ler', todo:) }
    let!(:item_duplicated) { build(:item, description: item2.description, todo:) }

    it 'will raise exception', :aggregate_failures do
      expect { item_duplicated.save! }.to raise_error(ActiveRecord::RecordNotUnique)
    end
  end
end
