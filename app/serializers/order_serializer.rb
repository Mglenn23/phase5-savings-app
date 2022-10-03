class OrderSerializer < ActiveModel::Serializer
  attributes :id,:order_status,:user_id,:item_id
end
