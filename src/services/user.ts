import * as repo from "../repositories/userRepository";
import { User } from "../types/user";
import { UserPayload } from "../validation";

export const getAll = (): Promise<User[]> => {
	return repo.findAll();
};
export const getById = (id: string): Promise<User | null> => {
	return repo.findById(id);
};
export const create = (data: UserPayload): Promise<User> => {
	return repo.create(data);
};
export const update = (id: string, data: UserPayload): Promise<User> => {
	return repo.update(id, data);
};
