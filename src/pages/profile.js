import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaCamera, FaSave } from "react-icons/fa";

export default function Profile() {
  const [user] = useAuthState(auth);

  // State for user details
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(user?.photoURL || "");
  const [preview, setPreview] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle Profile Picture Upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    setProfilePic(file);
  };

  // Handle Profile Update
  const handleUpdate = async () => {
    if (!user) return;

    setLoading(true);
    try {
      let imageUrl = user.photoURL;

      // Only upload new profile picture if it's a new file
      if (profilePic instanceof File) {
        const storageRef = ref(storage, `profilePics/${user.uid}`);
        await uploadBytes(storageRef, profilePic);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Update Firebase Auth Profile
      await updateProfile(user, {
        displayName: name,
        photoURL: imageUrl,
      });

      // Update Firestore User Data
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        displayName: name,
        email: email,
        bio: bio,
        photoURL: imageUrl,
      });

      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Update Error:", error);
      setMessage("Error updating profile: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800">Profile Settings</h2>
      {message && (
        <div className={`mt-3 p-2 ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"} rounded`}>
          {message}
        </div>
      )}

      {/* Profile Picture Upload */}
      <div className="flex items-center mt-4">
        <label className="relative cursor-pointer">
          <img
            src={preview}
            alt="Profile"
            className="w-24 h-24 rounded-full border object-cover"
          />
          <FaCamera className="absolute bottom-0 right-0 text-white bg-gray-700 p-2 rounded-full text-lg" />
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {/* Personal Information */}
      <div className="mt-6">
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded bg-gray-100"
          value={email}
          disabled
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">Bio</label>
        <textarea
          className="w-full p-2 border rounded"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      {/* Security Settings */}
      <div className="mt-6">
        <label className="block text-gray-700">Change Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Save Button */}
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
