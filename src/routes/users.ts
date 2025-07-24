import { FastifyPluginAsync } from "fastify";
import * as userService from "../services/user";
import { userPayloadSchema, UserPayload } from "../validation/user";

export const userRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.get("/", async (req, res) => {
		try {
			const users = await userService.getAll();
			res.send(users);
		} catch (err: Error | any) {
			req.log.error(err);
			res.status(err.statusCode ?? 500).send(err.message);
		}
	});

	fastify.get("/:id", async (req, res) => {
		try {
			const { id } = req.params as { id: string };
			const user = await userService.getById(id);
			if (!user) throw fastify.httpErrors.notFound("User not found");
			res.send(user);
		} catch (err: Error | any) {
			req.log.error(err);
			res.status(err.statusCode ?? 500).send(err.message);
		}
	});

	fastify.post("/", async (req, res) => {
		try {
			const input = userPayloadSchema.parse(req.body as UserPayload);
			const user = await userService.create(input);
			res.send(user);
		} catch (err: Error | any) {
			req.log.error(err);
			res.status(err.statusCode ?? 500).send(err.message);
		}
	});

	fastify.put("/:id", async (req, res) => {
		try {
			const { id } = req.params as { id: string };
			if (!id) {
				throw fastify.httpErrors.badRequest("ID is required");
			}

			const input = userPayloadSchema.parse(req.body as UserPayload);
			const user = await userService.update(id, input);
			res.send(user);
		} catch (err: Error | any) {
			req.log.error(err);
			res.status(err.statusCode ?? 500).send(err.message);
		}
	});
};
