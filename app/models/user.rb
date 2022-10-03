class User < ApplicationRecord
    has_many :likes, dependent: :delete_all
    has_many :orders, dependent: :delete_all
    validates :username, presence: true, uniqueness: true
    has_secure_password
end
