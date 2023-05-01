# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Todo do
  subject(:todo) { build(:todo) }

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
  end

  describe 'todo create' do
    before { todo.save }

    it { is_expected.to be_persisted }
  end
end
