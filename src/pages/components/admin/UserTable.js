import { useEffect, useState } from "react";
import RoleDropdown from "./RoleDropdown";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/admin/user") 
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleRemoveUser = async (userId) => {
    try {
      const response = await fetch(`/api/admin/user/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        console.error("Error removing user:", data.message);
      }
    } catch (err) {
      console.error("Failed to remove user:", err);
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200 text-black">
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Role</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-2">{user.name || "N/A"}</td>
              <td className="p-2">{user.email || "N/A"}</td>
              <td className="p-2">
                <RoleDropdown user={user} />
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleRemoveUser(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center p-4">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}