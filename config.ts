export type Config = {
  quoteMultiplier: number
  feeMultiplier: number
  emergencyMultiplier: number
  marginReserve: number
  minMarginCents: number
  capacityFraction: number
  maxApproachMinutes: number
  minLeadMinutes: number
  strictNotes: boolean
  offers: boolean
}

// These are deliberately visible hypotheses, not fitted simulation constants.
export const defaults: Config = {
  quoteMultiplier: 1.60,
  feeMultiplier: 1.35,
  emergencyMultiplier: 2.40,
  marginReserve: 0.22,
  minMarginCents: 4500,
  capacityFraction: 0.28,
  maxApproachMinutes: 100,
  minLeadMinutes: 210,
  strictNotes: true,
  offers: true,
}

export function validateConfig(value: unknown): Config {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Config must be an object")
  const config = { ...defaults, ...value }
  for (const key of Object.keys(config)) {
    if (!(key in defaults)) throw new Error(`Unknown config setting: ${key}`)
    const v = config[key as keyof Config]
    if (typeof defaults[key as keyof Config] === "boolean") {
      if (typeof v !== "boolean") throw new Error(`${key} must be boolean`)
    } else if (typeof v !== "number" || !Number.isFinite(v) || v <= 0) throw new Error(`${key} must be positive and finite`)
  }
  if (config.marginReserve >= 1 || config.capacityFraction > 1) throw new Error("marginReserve must be < 1 and capacityFraction <= 1")
  if (config.emergencyMultiplier < config.feeMultiplier) throw new Error("emergencyMultiplier must be at least feeMultiplier")
  return config
}
