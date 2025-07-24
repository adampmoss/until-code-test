import * as userRepository from "../repositories/userRepository";
import * as user from "./user";
import { mockUser, mockNewUserRequest } from "../__mocks__/user";
import { describe, it, expect, vi } from "vitest";

describe("test the different user service methods", () => {
  it("getById should return a user from the repository", async () => {
    vi.spyOn(userRepository, "findById").mockResolvedValue(mockUser);

    const fetchedUser = await user.getById('123');

		expect(userRepository.findById).toHaveBeenCalledWith("123");
    expect(fetchedUser).toBe(mockUser);
  });

	it("getById should throw an error if an error occurs duing the fetch", async () => {
		vi.spyOn(userRepository, "findById").mockRejectedValue(new Error("Database error"));
		await expect(user.getById("123")).rejects.toThrow("Database error");
	});

	it("create should call the repository to create a user", async () => {
		const newUser = { ...mockNewUserRequest };
		vi.spyOn(userRepository, "create").mockResolvedValue(mockUser);

		const createdUser = await user.create(newUser);

		expect(userRepository.create).toHaveBeenCalledWith(newUser);
		expect(createdUser).toBe(mockUser);
	});

	it("create should throw an error if an error occurs duing the fetch", async () => {
		const newUser = { ...mockNewUserRequest };
    vi.spyOn(userRepository, "create").mockRejectedValue(
      new Error("Database error")
    );
    await expect(user.create(newUser)).rejects.toThrow("Database error");
  });

	it("update should call the repository to update a user", async () => {
		const updatedUser = { ...mockUser, firstName: "Updated" };

		vi.spyOn(userRepository, "update").mockResolvedValue(updatedUser);

		const result = await user.update("123", updatedUser);

		expect(userRepository.update).toHaveBeenCalledWith("123", updatedUser);
		expect(result).toBe(updatedUser);
	});

	it("update should throw an error if an error occurs duing the fetch", async () => {
		const updatedUser = { ...mockUser, firstName: "Updated" };

    vi.spyOn(userRepository, "update").mockRejectedValue(
      new Error("Database error")
    );
    await expect(user.update("123",updatedUser)).rejects.toThrow("Database error");
  });

	it("getAll should return all users from the repository", async () => {

		vi.spyOn(userRepository, "findAll").mockResolvedValue([
      mockUser,
      mockUser,
      mockUser,
    ]);
		const result = await user.getAll();

		expect(userRepository.findAll).toHaveBeenCalledOnce();
    expect(result).toStrictEqual([mockUser, mockUser, mockUser]);
	});

	it("getAll should throw an error if an error occurs duing the fetch", async () => {
    vi.spyOn(userRepository, "findAll").mockRejectedValue(
      new Error("Database error")
    );

    await expect(user.getAll()).rejects.toThrow(
      "Database error"
    );
  });


});
