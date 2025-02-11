const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// Initialize Firebase Admin SDK
initializeApp();
const db = getFirestore();
const usersCollection = db.collection("users");

// Middleware function for API key authentication
const authenticate = (handler) => {
  return onRequest(async (req, res) => {
    const apiKey = req.headers["ebuddy-api-key"];

    if (!apiKey || apiKey !== "my-secret-key") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    return handler(req, res);
  });
};

async function getUsers() {
  const usersSnapshot = await usersCollection.get();
  const users = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return users;
}

// Fetch all users
exports.fetchUserData = authenticate(async (req, res) => {
  try {
    const users = await getUsers();

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new user
exports.addUserData = authenticate(async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const newUserRef = await usersCollection.add({ name, email, age });
    const users = await getUsers();

    res.status(201).json({ users });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update an existing user
exports.updateUserData = authenticate(async (req, res) => {
  try {
    const { name, email, age, id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const userRef = usersCollection.doc(id);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    await userRef.update({ name, email, age });

    const users = await getUsers();

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a user
exports.deleteUserData = authenticate(async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const userRef = usersCollection.doc(id);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    await userRef.delete();

    const users = await getUsers();

    res.status(200).json({ message: "User deleted successfully", users });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
