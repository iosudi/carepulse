"use server";
import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
  try {
    await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await await users.list([
        Query.equal("email", [user.email]),
      ]);

      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return user;
  } catch (error) {
    console.log(error);
  }
};
