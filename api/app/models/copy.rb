class CopyValidator < ActiveModel::Validator
  def validate(record)
    unless record.book.copies.size <= record.book.total_copies
      record.errors.add :total_copies, 'exceeded.'
    end

    unless record.due_date.future?
      record.errors.add :due_date, 'must be in the future.'
    end
  end
end

class Copy < ApplicationRecord
  belongs_to :book
  validates_with CopyValidator
  validates :borrower, length: { in: 2..30 }
end
