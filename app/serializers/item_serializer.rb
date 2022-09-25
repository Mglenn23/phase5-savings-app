class ItemSerializer < ActiveModel::Serializer
  attributes :id, :item_name, :item_price, :item_type, :item_url
end
