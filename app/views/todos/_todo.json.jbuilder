json.extract! todo, :id, :title

json.items todo.items.each do |item|
  json.extract! item, :id, :description, :done
end
