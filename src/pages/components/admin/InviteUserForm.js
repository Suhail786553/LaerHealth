import { useState } from "react";

export default function InviteUserForm() {
  const [email, setEmail] = useState("");

  const handleInvite = (e) => {
    e.preventDefault();
    fetch("/api/admin/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Invitation sent!");
        setEmail("");
      })
      .catch((err) => console.error("Error sending invite:", err));
  };

  return (
    <form onSubmit={handleInvite} className="mb-4">
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
        Send Invite
      </button>
    </form>
  );
}
