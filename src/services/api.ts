import type { Book } from "../types";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Type for the book data when creating (uid is not needed)
type CreateBookDto = Omit<Book, "uid">;

export const registerUser = (
  username: string,
  email: string,
  password: string
): Promise<Response> => {
  return fetch(`${API_URL}/user/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
};

export const loginUser = (
  email: string,
  password: string
): Promise<Response> => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);
  return fetch(`${API_URL}/user/login`, {
    method: "POST",
    body: formData,
  });
};

export const getBooks = (token: string): Promise<Response> => {
  return fetch(`${API_URL}/books/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addBook = (
  book: CreateBookDto,
  token: string
): Promise<Response> => {
  return fetch(`${API_URL}/books/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(book),
  });
};

export const updateBook = (
  uid: string,
  book: CreateBookDto,
  token: string
): Promise<Response> => {
  return fetch(`${API_URL}/books/${uid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(book),
  });
};

export const deleteBook = (uid: string, token: string): Promise<Response> => {
  return fetch(`${API_URL}/books/${uid}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
