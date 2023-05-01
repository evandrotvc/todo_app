class Item < ApplicationRecord
  belongs_to :todo

  validates :description, :status, presence: true

  enum status: {
    pending: 'pending', finished: 'finished', canceled: 'canceled'
  }, _default: :pending
end
