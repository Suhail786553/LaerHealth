export default function RoleDropdown({ user, onChange }) {
    return (
      <select
        value={user.role}
        onChange={(e) => onChange(user.id, e.target.value)}
        className="border p-1 rounded"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
      </select>
    );
  }
  