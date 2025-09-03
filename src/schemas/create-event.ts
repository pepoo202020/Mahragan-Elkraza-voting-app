import { z } from "zod";

export const createEventSchema = () => {
  return z.object({
    name: z.string().min(3, "Name is required"),
    votingStartTime: z.string(),
    votingEndTime: z.string(),
    description: z.string(),
    year: z.string(),
    artworkIds: z.array(z.string()).optional(),
  });
};

export type CreateEventInput = z.infer<ReturnType<typeof createEventSchema>>;
