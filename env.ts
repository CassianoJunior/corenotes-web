import { z } from 'zod'

const nodeEnv = z.enum(['development', 'production', 'test'])

const requiredOnEnv = (env: z.infer<typeof nodeEnv>) => (value: unknown) => {
  if (env === process.env.NODE_ENV && !value) {
    return false
  }

  return true
}

const envSchema = z.object({
  NODE_ENV: nodeEnv.default('development'),
  API_URL: z.string().url().refine(requiredOnEnv('production')),
})

export const env = envSchema.parse(process.env)
