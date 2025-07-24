import { describe, it, beforeEach, expect, vi, afterEach } from "vitest";
import Fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./users";
import { userService } from "../plugins/userService";
import { mockNewUserRequest, mockUser } from "../__mocks__/user";
import { User } from "@prisma/client";
import { setupErrorHandler } from "../utils/errors";
import sensible from "@fastify/sensible";

describe("test the endpoints in userRoutes", () => {
  let fastify: FastifyInstance;

  beforeEach(async () => {
    fastify = Fastify();
    await fastify.register(sensible);
    setupErrorHandler(fastify);
    fastify.register(userRoutes, { prefix: "/users" });
    await fastify.ready();
  });

  afterEach(async () => {
    await fastify.close();
    vi.clearAllMocks();
  });

  it("GET /users should return list of users", async () => {
    const mockUsers = [mockUser, mockUser] as User[];
    vi.spyOn(userService, "findAll").mockResolvedValue(mockUsers);

    const response = await fastify.inject({
      method: "GET",
      url: "/users",
    });

    const expected = mockUsers.map((user) => ({
      ...user,
      dateOfBirth: user.dateOfBirth.toISOString(),
    }));

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(expected);
    expect(userService.findAll).toHaveBeenCalled();
  });

  it("GET /users/:id returns a user", async () => {
    const user = mockUser as User;
    vi.spyOn(userService, "findById").mockResolvedValue(user);

    const response = await fastify.inject({
      method: "GET",
      url: "/users/1",
    });

    const expected = {
      ...user,
      dateOfBirth: user.dateOfBirth.toISOString(),
    };

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(expected);
    expect(userService.findById).toHaveBeenCalledWith("1");
  });

  it("GET /users/:id returns 404 if user not found", async () => {
    vi.spyOn(userService, "findById").mockResolvedValue(null);

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
    vi.spyOn(userService, "create").mockResolvedValue(createdUser);

    const response = await fastify.inject({
      method: "POST",
      url: "/users",
      payload,
    });

    const expected = {
      ...createdUser,
      dateOfBirth: createdUser.dateOfBirth.toISOString(),
    };

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(expected);
    expect(userService.create).toHaveBeenCalledWith(payload);
  });

  it("POST /users should should return 402 if payload invalid", async () => {
    const payload = { ...mockNewUserRequest, firstName: "" };

    const response = await fastify.inject({
      method: "POST",
      url: "/users",
      payload,
    });

    expect(response.statusCode).toBe(402);
  });

  it("PUT /users/:id should update a user", async () => {
    const payload = { ...mockNewUserRequest, firstName: "Jane" };
    const updatedUser = { ...mockUser };
    vi.spyOn(userService, "update").mockResolvedValue(updatedUser);

    const response = await fastify.inject({
      method: "PUT",
      url: "/users/3",
      payload,
    });

    const expected = {
      ...updatedUser,
      dateOfBirth: updatedUser.dateOfBirth.toISOString(),
    };

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(expected);
    expect(userService.update).toHaveBeenCalledWith("3", payload);
  });

  it("PUT /users/:id should should return 402 if payload invalid", async () => {
    const payload = { id: "123", ...mockNewUserRequest, firstName: "" };

    const response = await fastify.inject({
      method: "PUT",
      url: "/users/123",
      payload,
    });

    expect(response.statusCode).toBe(402);
  });
});
