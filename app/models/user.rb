class User < ApplicationRecord
    has_many :likes
    validates :username, presence: true, uniqueness: true
    has_secure_password
end
