// import { useEffect, useState } from "react";
// import RoleDropdown from "./RoleDropdown";

// export default function UserTable() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("/api/admin/users")
//       .then((res) => res.json())
//       .then(setUsers)
//       .catch((err) => console.error("Error fetching users:", err));
//   }, []);

//   const handleRoleChange = (userId, newRole) => {
//     fetch(`/api/admin/roles`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId, newRole }),
//     })
//       .then((res) => res.json())
//       .then((updatedUser) => {
//         setUsers(users.map(user => user._id === userId ? updatedUser : user));
//       })
//       .catch((err) => console.error("Error updating role:", err));
//   };

//   const handleRemoveUser = (userId) => {
//     fetch(`/api/admin/removeuser?id=${userId}`, { method: "DELETE" })
//       .then((res) => res.json())
//       .then(() => {
//         setUsers(users.filter(user => user._id !== userId));
//       })
//       .catch((err) => console.error("Error removing user:", err));
//   };

//   return (
//     <table className="w-full border-collapse">
//       <thead>
//         <tr className="bg-gray-200 text-black">
//           <th className="p-2">Name</th>
//           <th className="p-2">Email</th>
//           <th className="p-2">Role</th>
//           <th className="p-2">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <tr key={user._id} className="border-b">
//             <td className="p-2">{user.name || "N/A"}</td>
//             <td className="p-2">{user.email}</td>
//             <td className="p-2">
//               <RoleDropdown user={user} onChange={handleRoleChange} />
//             </td>
//             <td className="p-2">
//               <button
//                 onClick={() => handleRemoveUser(user._id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Remove
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
import { useEffect, useState } from "react";
import RoleDropdown from "./RoleDropdown";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/admin/User") // ✅ Correct API path
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

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
              <td className="p-2">{user.email}</td>
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
