# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TodoMailer do
  describe '#new_task' do
    let(:item) { create(:item) }
    let(:mail) { described_class.with(item:).new_task }

    it 'renders the headers', :aggregate_failures do
      expect(mail.subject).to eq("Task #{item.description} adicionada com sucesso!")
      expect(mail.to).to eq(['test@mail.com'])
      expect(mail.from).to eq(['from@example.com'])
      expect { mail.deliver_now }.to change { ActionMailer::Base.deliveries.count }.by(1)
    end
  end
end
