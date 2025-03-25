import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center text-black">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mt-4 rounded text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mt-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded mt-4 cursor-pointer">
          Login
        </button>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account? <Link href="/signup" className="text-blue-600">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
