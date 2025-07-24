import { PrismaClient } from "@prisma/client";
import { User } from "../types";
import { UserPayload } from "../validation";

const prisma = new PrismaClient();

export const findById = async (id: string): Promise<User | null> => {
	return prisma.user.findUnique({ where: { id } });
};

export const findAll = async (): Promise<User[]> => {
	return prisma.user.findMany();
};

export const create = async (data: UserPayload): Promise<User> => {
	return prisma.user.create({ data });
};

export const update = async (id: string, data: UserPayload): Promise<User> => {
	return prisma.user.update({ where: { id }, data });
};
