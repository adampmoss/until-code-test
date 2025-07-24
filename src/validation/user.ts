import { z } from "zod";

export const userPayloadSchema = z.object({
	firstName: z
		.string()
		.min(1, "First name is required")
		.max(50, "First name must be less than 50 characters"),
	lastName: z
		.string()
		.min(1, "Last name is required")
		.max(50, "Last name must be less than 50 characters"),
	dateOfBirth: z.preprocess(
		(val) => (typeof val === "string" ? new Date(val) : val),
		z.date(),
	),
});

export type UserPayload = z.infer<typeof userPayloadSchema>;
