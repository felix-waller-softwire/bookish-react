class CopiesController < ApplicationController
  def index
    render json: Book.find(params[:book_id]).copies
  end

  def show
    render json: Copy.find(params[:id])
  end

  def create
    book = Book.find(params[:book_id])
    copy = book.copies.new(copy_params)

    if copy.save
      render json: { id: copy.id }
    else
      render(
        json: { errors: copy.errors },
        status: :unprocessable_entity)
    end
  end

  def update
    copy = Copy.find(params[:id])

    if copy.update(copy_params)
      head :no_content
    else
      render(
        json: { errors: copy.errors },
        status: :unprocessable_entity)
    end
  end

  def destroy
    Copy.find(params[:id]).destroy
    head :no_content
  end

  private

  def copy_params
    params.require(:copy).permit(:borrower, :due_date)
  end
end
