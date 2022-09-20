class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :user_role
      t.integer :user_balance
      t.integer :user_savings
      t.timestamps
    end
  end
end
