import { User } from "@repo/shared";
import { db } from "../config/firebaseConfig";

const userCollection = db.collection("users");

export const getUsers = async () => {
  const snapshot = await db.collection("users").get();

  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return users;
};

export const addUser = async (user: User) => {
  const newUserRef = userCollection.doc();
  user.id = newUserRef.id;
  user.createdAt = new Date();
  user.updatedAt = new Date();

  await newUserRef.set(user);
  return user;
};

export const updateUser = async (id: string, user: Partial<User>) => {
  const userRef = userCollection.doc(id);
  const existingUser = await userRef.get();

  if (!existingUser.exists) {
    throw new Error("User not found");
  }

  user.updatedAt = new Date();
  await userRef.update(user);
  return { id, ...user };
};

export const deleteUser = async (id: string) => {
  const userRef = userCollection.doc(id);
  await userRef.delete();

  return "Successfully deleting user";
};
