import { describe, it, beforeEach, expect, vi, afterEach } from "vitest";
import Fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./users";
import { userService } from "../plugins/userService";
import { mockNewUserRequest, mockUser } from "../__mocks__/user";
import { User } from "@prisma/client";

// Mock userService
vi.mock("../plugins/userService", () => ({
  userService: {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
}));

describe("test the endpoints in userRoutes", () => {
  let fastify: FastifyInstance;

  beforeEach(async () => {
    fastify = Fastify();
    fastify.register(userRoutes, { prefix: "/users" });
    await fastify.ready();
  });

  afterEach(async () => {
    await fastify.close();
    vi.clearAllMocks();
  });

  it("GET /users should return list of users", async () => {
    const mockUsers = [mockUser, mockUser] as User[];
    userService.findAll.mockResolvedValue(mockUsers);

    const response = await fastify.inject({
      method: "GET",
      url: "/users",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(mockUsers);
    expect(userService.findAll).toHaveBeenCalled();
  });

  it("GET /users/:id returns a user", async () => {
    const user = mockUser as User;
    userService.findById.mockResolvedValue(user);

    const response = await fastify.inject({
      method: "GET",
      url: "/users/1",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(user);
    expect(userService.findById).toHaveBeenCalledWith("1");
  });

  it("GET /users/:id returns 404 if user not found", async () => {
    userService.findById.mockResolvedValue(null);

    const response = await fastify.inject({
      method: "GET",
      url: "/users/123",
    });

    expect(response.statusCode).toBe(404);
    expect(userService.findById).toHaveBeenCalledWith("123");
  });

  it("POST /users should create a user", async () => {
    const payload = mockNewUserRequest;
    const createdUser = { id: "2", ...payload };
    userService.create.mockResolvedValue(createdUser);

    const response = await fastify.inject({
      method: "POST",
      url: "/users",
      payload,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(createdUser);
    expect(userService.create).toHaveBeenCalledWith(payload);
  });

  it("PUT /users/:id should update a user", async () => {
    const payload = { name: "Charlie", email: "charlie@example.com" };
    const updatedUser = { id: "3", ...payload };
    userService.update.mockResolvedValue(updatedUser);

    const response = await fastify.inject({
      method: "PUT",
      url: "/users/3",
      payload,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(updatedUser);
    expect(userService.update).toHaveBeenCalledWith("3", payload);
  });
});
