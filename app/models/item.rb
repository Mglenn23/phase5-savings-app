class Item < ApplicationRecord
    has_many :likes, dependent: :delete_all
    has_many :orders, dependent: :delete_all
    validates :item_name, presence: true, uniqueness: true
end
