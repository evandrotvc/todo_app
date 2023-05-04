# frozen_string_literal: true

class TodoMailer < ApplicationMailer
  def new_task
    @item = params[:item]

    mail(to: 'test@mail.com',
      subject: I18n.t('activerecord.messages.todo.create.success',
        description: @item.description))
  end
end
