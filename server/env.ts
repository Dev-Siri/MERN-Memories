import { z } from "zod";

const envSchema = z.object({
  CONNECTION_URL: z.string().nonempty(),
  JWT_SECRET: z.string().nonempty(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export default envSchema;
