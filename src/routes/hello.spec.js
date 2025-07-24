import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import * as api from "../services/user.js";
import app from "../index.js";

describe("GET api/hello", () => {
	it("returns a random joke", async () => {
		vi.spyOn(api, "getJoke").mockResolvedValue({
			value: "Chuck Norris can divide by zero.",
		});

		const response = await request(app).get("/api/hello");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("joke");
		expect(response.body.joke.value).toBe("Chuck Norris can divide by zero.");
	});
});
