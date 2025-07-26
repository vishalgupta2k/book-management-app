// src/App.tsx
import React, { useState, useEffect, Fragment } from "react";
import Auth from "./components/Auth";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import * as api from "./services/api";
import type { Book } from "./types";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    if (!token) return;
    try {
      setError("");
      const response = await api.getBooks(token);
      if (!response.ok) throw new Error("Failed to fetch books");
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchBooks();
    } else {
      localStorage.removeItem("token");
      setBooks([]);
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  const handleFormSubmit = async (bookData: Omit<Book, "uid">) => {
    if (!token) return;
    try {
      setError("");
      if (editingBook) {
        await api.updateBook(editingBook.uid, bookData, token);
      } else {
        await api.addBook(bookData, token);
      }
      fetchBooks();
      setEditingBook(null);
    } catch (err) {
      setError("Failed to save book.");
    }
  };

  const handleDelete = async (uid: string) => {
    if (!token) return;
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        setError("");
        await api.deleteBook(uid, token);
        fetchBooks();
      } catch (err) {
        setError("Failed to delete book.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Manager</h1>
        {token && (
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
          >
            Logout
          </button>
        )}
      </header>

      <main>
        {!token ? (
          <Auth setToken={setToken} />
        ) : (
          <Fragment>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
                role="alert"
              >
                {error}
              </div>
            )}
            <BookForm
              bookToEdit={editingBook}
              onFormSubmit={handleFormSubmit}
              onCancel={() => setEditingBook(null)}
            />
            <BookList
              books={books}
              onEdit={setEditingBook}
              onDelete={handleDelete}
            />
          </Fragment>
        )}
      </main>
    </div>
  );
}

export default App;
