class Todo < ApplicationRecord
  validates :title, :status, presence: true

  enum status: {
    pending: 'pending', finished: 'finished', canceled: 'canceled'
  }, _default: :pending
end
