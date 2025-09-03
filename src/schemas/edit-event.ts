import z from "zod";

export const editEventSchema = () => {
  return z.object({
    title: z.string().min(3, "title is required"),
    description: z.string(),
    votingStartTime: z.string(),
    votingEndTime: z.string(),
    year: z.number(),
    artworkIds: z.array(z.string()).optional(),
  });
};

export type EditEventInput = z.infer<ReturnType<typeof editEventSchema>>;
