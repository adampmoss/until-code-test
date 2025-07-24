import { FastifyInstance } from "fastify";
import { ZodError } from "zod";

export const setupErrorHandler = (fastify: FastifyInstance) => {
	fastify.setErrorHandler((error, req, res) => {
		req.log.error(error);

		if (error instanceof ZodError) {
			return res.status(402).send(error);
		}

		const statusCode = error.statusCode ?? 500;
		const message = error.message ?? "Something went wrong";

		return res.status(statusCode).send({ message });
	});
};
