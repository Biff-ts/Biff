// src/core/export-schema.ts
import { zodToJsonSchema } from 'zod-to-json-schema'
import type { BevelIntent } from './define-intent'

/**
 * Convert intent definition to JSON Schema for use in Viewer
 */
export function exportFunctionSchema(intent: BevelIntent<any, any>) {
  return {
    name: intent.name,
    description: intent.description ?? '',
    parameters: zodToJsonSchema(intent.input)
  }
}
