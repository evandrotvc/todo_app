FactoryBot.define do
  factory :todo do
    title { Faker::Movie.title }
  end
end
