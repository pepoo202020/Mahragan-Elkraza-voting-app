import { z } from "zod";

export const editProfileSchema = () => {
  return z.object({
    name: z.string(),
    bio: z.string(),
  });
};

export type EditProfileSchemaType = z.infer<
  ReturnType<typeof editProfileSchema>
>;
