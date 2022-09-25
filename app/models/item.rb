class Item < ApplicationRecord
    has_many :likes
    validates :item_name, presence: true, uniqueness: true
end
