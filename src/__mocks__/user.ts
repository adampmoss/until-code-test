import { User } from "../types";

export const mockUser: User = {
  id: "2a3f4069-dee3-40ae-a4f7-026cfd1479f0",
  firstName: "John Doe",
  lastName: "john.doe@example.com",
  dateOfBirth: new Date("1990-01-01"),
};

export const mockNewUserRequest = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: new Date(),
};
