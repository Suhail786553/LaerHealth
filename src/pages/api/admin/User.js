// export default function handler(req, res) {
//     if (req.method === "GET") {
//       const users = [
//         { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
//         { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
//       ];
//       res.status(200).json(users);
//     } else {
//       res.status(405).end();
//     }
//   }
// import dbConnect from "../../utils/dbConnect";
// import User from "../../models/User";

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === "POST") {
//     const { email, role } = req.body;
//     await User.create({ email, role });

//     res.status(200).json({ message: "User added with role!" });
//   } else {
//     res.status(405).end();
//   }
// }

// import dbConnect from "../../utils/dbConnect";
// import User from "../../models/User";

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === "GET") {
//     try {
//       const users = await User.find({});
//        // ✅ Convert users to plain JSON format
//        const plainUsers = users.map(user => user.toObject({ getters: true }));
//       res.status(200).json(users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       res.status(500).json({ error: "Failed to fetch users." });
//     }
//   } else {
//     res.status(405).end();
//   }
// }
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const users = await User.find({});
      return res.status(200).json({ success: true, users });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ success: false, error: "Failed to fetch users" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
}
