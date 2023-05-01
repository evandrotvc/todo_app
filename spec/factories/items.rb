FactoryBot.define do
    factory :item do
      description { Faker::Movie.title }
      status { :pending }
      todo { create(:todo) }
    end
  end
  