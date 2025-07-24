import * as api from "./api";
import { describe, it, expect, vi } from "vitest";

describe("API Service", () => {
	it("should fetch a random joke", async () => {
		vi.spyOn(api, "getJoke").mockResolvedValue({
			value: "Chuck Norris can divide by zero.",
		});

		const joke = await api.getJoke();
		expect(joke).toHaveProperty("value");
		expect(typeof joke.value).toBe("string");
	});
});
