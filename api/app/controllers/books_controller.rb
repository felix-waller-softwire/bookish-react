class BooksController < ApplicationController
  def index
    render json: Book.all
  end

  def show
    render json: Book.find(params[:id])
  end

  def new
    @book = Book.new
  end

  def create
    @book = Book.create(book_params)
    redirect_to book_url(@book)
  end

  def edit
    @book = Book.find(params[:id])
  end

  def update
    @book = Book.find(params[:id])
    @book.update(book_params)
    redirect_to book_url(@book)
  end

  def destroy
    Book.find(params[:id]).destroy
    redirect_to books_url
  end

  private

  def book_params
    params.require(:book).permit(:title, :author, :isbn)
  end
end
