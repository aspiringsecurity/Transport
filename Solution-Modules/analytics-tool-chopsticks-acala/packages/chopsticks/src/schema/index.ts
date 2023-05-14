import { BuildBlockMode } from '../blockchain/txpool'
import { z } from 'zod'

export const genesisSchema = z.object({
  id: z.string(),
  name: z.string(),
  properties: z.object({
    ss58Format: z.number().optional(),
    tokenDecimals: z.union([z.number(), z.array(z.number())]).optional(),
    tokenSymbol: z.union([z.string(), z.array(z.string())]).optional(),
  }),
  genesis: z.object({ raw: z.object({ top: z.record(z.string()) }) }),
})

export type Genesis = z.infer<typeof genesisSchema>

export const configSchema = z
  .object({
    port: z.number().optional(),
    endpoint: z.string().optional(),
    block: z.union([z.string().length(66).startsWith('0x'), z.number(), z.null()]).optional(),
    'build-block-mode': z.nativeEnum(BuildBlockMode).optional(),
    'import-storage': z.any().optional(),
    'mock-signature-host': z.boolean().optional(),
    db: z.string().optional(),
    'wasm-override': z.string().optional(),
    genesis: z.union([z.string(), genesisSchema]).optional(),
    timestamp: z.number().optional(),
    'registered-types': z.any().optional(),
    'runtime-log-level': z.number().min(0).max(5).optional(),
  })
  .strict()

export type Config = z.infer<typeof configSchema>
