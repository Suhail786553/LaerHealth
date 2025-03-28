export default function handler(req, res) {
    if (req.method === "POST") {
      const { userId, newRole } = req.body;
      console.log(`User ${userId} role changed to ${newRole}`);
      res.status(200).json({ id: userId, role: newRole });
    } else {
      res.status(405).end();
    }
  }
  