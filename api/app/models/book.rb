class BookValidator < ActiveModel::Validator
  def validate(record)
    puts record.copies.size, record.total_copies
    unless record.copies.size <= record.total_copies
      record.errors.add :total_copies, "must be at least the number of currently checked-out copies (#{record.copies.size})."
    end
    puts record.errors.full_messages
  end
end

class Book < ApplicationRecord
  has_many :copies
  validates_with BookValidator
  validates :title, presence: true
  validates :author, length: { in: 2..30 }
  validates :isbn, format: { with: /\A(\d{10}|\d{13})\z/, message: 'must be 10 or 13 digits long' }
  validates :total_copies, numericality: { only_integer: true, greater_than: 0 }
end
