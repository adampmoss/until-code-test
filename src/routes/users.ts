import { FastifyPluginAsync } from "fastify";
import * as userService from "../services/user";
import { userPayloadSchema, UserPayload } from "../validation/user";

export const userRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.get("/", async (req, res) => {
		const users = await userService.getAll();
		res.send(users);
	});

	fastify.get("/:id", async (req, res) => {
		const { id } = req.params as { id: string };
		const user = await userService.getById(id);
		if (!user) throw fastify.httpErrors.notFound("User not found");
		res.send(user);
	});

	fastify.post("/", async (req, res) => {
		const input = userPayloadSchema.parse(req.body as UserPayload);
		const user = await userService.create(input);
		res.send(user);
	});

	fastify.put("/:id", async (req, res) => {
		const { id } = req.params as { id: string };
		if (!id) {
			throw fastify.httpErrors.badRequest("ID is required");
		}

		const input = userPayloadSchema.parse(req.body as UserPayload);
		const user = await userService.update(id, input);
		res.send(user);
	});
};
