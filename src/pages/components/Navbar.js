import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        Laer Health
      </Link>

      {user ? (
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaUserCircle className="text-gray-600 text-2xl" />
            <span className="text-gray-700">{user.displayName || "User"}</span>
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2">
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Profile Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link href="/login" className="mr-4 text-blue-600">
            Login
          </Link>
          <Link href="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
