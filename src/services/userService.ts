import { PrismaClient } from "@prisma/client";
import { UserPayload } from "../validation";
import { User } from "../types";

export const createUserService = (prisma: PrismaClient) => ({
  findById: async (id: string): Promise<User | null> =>
    prisma.user.findUnique({ where: { id } }),
  findAll: async (): Promise<User[]> => prisma.user.findMany(),
  create: async (data: UserPayload): Promise<User> =>
    prisma.user.create({ data }),
  update: async (id: string, data: UserPayload): Promise<User> =>
    prisma.user.update({ where: { id }, data }),
});
