// src/components/BookForm.tsx
import React, { useState, useEffect } from "react";
import { type Book } from "../types";

type BookFormData = Omit<Book, "uid">;

interface BookFormProps {
  bookToEdit: Book | null;
  onFormSubmit: (book: BookFormData) => Promise<void>;
  onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({
  bookToEdit,
  onFormSubmit,
  onCancel,
}) => {
  const initialState: BookFormData = {
    title: "",
    author: "",
    publisher: "",
    published_date: "",
    page_count: 0,
    language: "",
  };
  const [book, setBook] = useState<BookFormData>(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bookToEdit) {
      const { uid, ...editableData } = bookToEdit;
      setBook(editableData);
    } else {
      setBook(initialState);
    }
  }, [bookToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: name === "page_count" ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onFormSubmit(book);
    setLoading(false);
    if (!bookToEdit) {
      setBook(initialState);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {bookToEdit ? "Edit Book" : "Add a New Book"}
      </h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg"
          name="publisher"
          value={book.publisher}
          onChange={handleChange}
          placeholder="Publisher"
          required
        />
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg"
          name="published_date"
          value={book.published_date}
          onChange={handleChange}
          placeholder="Published Date (YYYY-MM-DD)"
          required
        />
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg"
          type="number"
          name="page_count"
          value={book.page_count}
          onChange={handleChange}
          placeholder="Page Count"
          required
        />
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg"
          name="language"
          value={book.language}
          onChange={handleChange}
          placeholder="Language"
          required
        />
        <div className="md:col-span-2 flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Saving..." : bookToEdit ? "Update Book" : "Add Book"}
          </button>
          {bookToEdit && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookForm;
