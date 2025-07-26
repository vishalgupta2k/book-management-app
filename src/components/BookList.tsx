// src/components/BookList.tsx
import React from "react";
import { type Book } from "../types";

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (uid: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-white rounded-xl shadow-md">
        <h3 className="text-lg font-medium text-gray-700">No books found.</h3>
        <p className="text-gray-500">
          Add a new book using the form above to get started.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Your Books</h3>
      <ul className="space-y-3">
        {books.map((book) => (
          <li
            key={book.uid}
            className="p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:bg-gray-50"
          >
            <div>
              <p className="font-semibold text-gray-800">{book.title}</p>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(book)}
                className="bg-yellow-400 text-white py-1 px-3 rounded-md text-sm hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(book.uid)}
                className="bg-red-500 text-white py-1 px-3 rounded-md text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
