# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Item do
  subject(:item) { build(:item) }

  describe 'validations' do
    it { is_expected.to validate_presence_of(:description) }
    it { is_expected.to validate_presence_of(:status) }
  end

  describe 'item create' do
    before { item.save }

    it { is_expected.to be_persisted }
  end
end
