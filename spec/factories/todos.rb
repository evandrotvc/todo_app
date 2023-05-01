FactoryBot.define do
  factory :todo do
    title { Faker::Movie.title }
    status { :pending }
  end
end
