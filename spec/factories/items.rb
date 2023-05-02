FactoryBot.define do
  factory :item do
    description { Faker::Movie.title }
    done { false }
    todo { create(:todo) }
  end
end
