// src/components/Auth.tsx
import React, { useState } from "react";
import * as api from "../services/api";

interface AuthProps {
  setToken: (token: string) => void;
}

const Auth: React.FC<AuthProps> = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let response;
      if (isLogin) {
        response = await api.loginUser(email, password);
        if (response.ok) {
          const data = await response.json();
          setToken(data.access_token);
        } else {
          const errData = await response.json();
          throw new Error(errData.detail || "Login failed");
        }
      } else {
        response = await api.registerUser(username, email, password);
        if (response.ok) {
          alert("Registration successful! Please log in.");
          setIsLogin(true);
        } else {
          const errData = await response.json();
          throw new Error(errData.detail || "Registration failed");
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4"
          role="alert"
        >
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-6">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          className="font-medium text-blue-600 hover:underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
