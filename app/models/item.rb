class Item < ApplicationRecord
  belongs_to :todo

  validates :description, presence: true

  after_create :new_task_email

  private

  def new_task_email
    TodoMailer.with(item: self).new_task.deliver_later
  end
end
