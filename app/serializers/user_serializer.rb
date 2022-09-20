class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :user_role, :user_balance, :user_savings
end
