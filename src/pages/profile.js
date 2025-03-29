import { useState, useEffect } from "react";
import { FaCamera, FaSave } from "react-icons/fa";

export default function Profile() {
  const [userData, setUserData] = useState({
    displayName: "Guest",
    email: "",
    bio: "",
    photoURL: "",
  });
  const [preview, setPreview] = useState("/default-avatar.png");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedData = typeof window !== "undefined"
      ? localStorage.getItem("userData")
      : null;
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setUserData(parsedData);
      setPreview(parsedData.photoURL || "/default-avatar.png");
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setUserData(prev => ({ ...prev, photoURL: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = () => {
    setLoading(true);
    try {
  
      if (typeof window !== "undefined") {
        localStorage.setItem("userData", JSON.stringify(userData));
        window.dispatchEvent(new Event("storage"));
      }
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800">Profile Settings</h2>
      <div className={`mt-3 p-2 ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"} rounded`}>
        {message}
      </div>
      <div className="flex items-center mt-4">
        <label className="relative cursor-pointer">
          <img
            src={preview || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border object-cover border-gray-300"
          />
          <FaCamera className="absolute bottom-0 right-0 text-white bg-gray-700 p-2 border rounded-full text-lg" />
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="mt-6">
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded text-black"
          value={userData.displayName}
          onChange={(e) => setUserData(prev => ({ ...prev, displayName: e.target.value }))}
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">Bio</label>
        <textarea
          className="w-full p-2 border rounded text-black"
          value={userData.bio}
          onChange={(e) => setUserData(prev => ({ ...prev, bio: e.target.value }))}
        />
      </div>

      <button
        onClick={handleUpdate}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded flex items-center justify-center w-full"
        disabled={loading}
      >
        {loading ? "Saving..." : <>
          <FaSave className="mr-2" /> Save Changes
        </>}
      </button>
    </div>

  );
}