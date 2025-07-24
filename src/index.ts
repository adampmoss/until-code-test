import Fastify from "fastify";
import { userRoutes } from "./routes/users";
import { setupErrorHandler } from "./utils/errors";
import sensible from "@fastify/sensible";

const server = Fastify();

setupErrorHandler(server);

await server.register(sensible);
server.register(userRoutes, { prefix: "/users" });

server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server listening at ${address}`);
});

export default server;
