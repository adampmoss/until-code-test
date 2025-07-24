import { PrismaClient } from "@prisma/client";
import { createUserService } from "../services/userService";

const prisma = new PrismaClient();
export const userService = createUserService(prisma);
