import { describe, it, expect, vi, beforeEach } from "vitest";
import { createUserService } from "./userService";
import { PrismaClient, User } from "@prisma/client";
import { mockUser, mockNewUserRequest } from "../__mocks__/user";

describe("userService", () => {
  let mockPrisma: {
    user: {
      findUnique: ReturnType<typeof vi.fn>;
      findMany: ReturnType<typeof vi.fn>;
      create: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
    };
  };

  let userService: ReturnType<typeof createUserService>;

  beforeEach(() => {
    mockPrisma = {
      user: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
    };

    userService = createUserService(mockPrisma as unknown as PrismaClient);
  });

  it("should find user by ID", async () => {
    const user = { ...mockUser };
    mockPrisma.user.findUnique.mockResolvedValue(user);

    const result = await userService.findById("abc");

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: "abc" },
    });
    expect(result).toEqual(user);
  });

  it("should return all users", async () => {
    const users = [mockUser, mockUser];

    mockPrisma.user.findMany.mockResolvedValue(users);

    const result = await userService.findAll();

    expect(mockPrisma.user.findMany).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it("should create a user", async () => {
    const payload = mockNewUserRequest;
    const createdUser = mockUser;

    mockPrisma.user.create.mockResolvedValue(createdUser);

    const result = await userService.create(payload);

    expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: payload });
    expect(result).toEqual(createdUser);
  });

  it("should update a user", async () => {
    const id = "4";
    const payload = { ...mockNewUserRequest, firstName: "Jane" };
    const updatedUser = { id, ...payload } as User;

    mockPrisma.user.update.mockResolvedValue(updatedUser);

    const result = await userService.update(id, payload);

    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id },
      data: payload,
    });
    expect(result).toEqual(updatedUser);
  });
});
