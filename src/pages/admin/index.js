import { useEffect, useState } from "react";
import UserTable from "../components/admin/UserTable";
import InviteUserForm from "../components/admin/InviteUserForm";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch("/api/admin/User") // Correct API path
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data))
  //     .catch((err) => console.error("Error fetching users:", err));
  // }, []);
  useEffect(() => {
    fetch("/api/admin/user")
      .then((res) => res.json()) // Ensure response is JSON
      .then((data) => {
        console.log("Fetched Users:", data);
        setUsers(data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);
  
  const handleUserRemove = (userId) => {
    fetch(`/api/admin/removeuser?id=${userId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((err) => console.error("Error removing user:", err));
  };

  const handleRoleChange = (userId, newRole) => {
    fetch("/api/admin/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, newRole }),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
      })
      .catch((err) => console.error("Error updating role:", err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Organization Management</h1>
      <InviteUserForm />
      <UserTable users={users} setUsers={setUsers} onRemove={handleUserRemove} onRoleChange={handleRoleChange} />
    </div>
  );
}
