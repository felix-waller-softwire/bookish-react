class CopiesController < ApplicationController
  def index
    render json: Book.find(params[:book_id]).copies
  end

  def show
    render json: Copy.find(params[:id])
  end

  def create
    book = Book.find(params[:book_id])

    if book.copies.size >= book.total_copies
      return render json: {error: "No copies available."}, status: :unprocessable_entity
    end

    copy = book.copies.create(copy_params)
    render json: { id: copy.id }
  end

  def update
    copy = Copy.find(params[:id])
    copy.update(copy_params)
    head :no_content
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
