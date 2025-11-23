// Zod schema for resource frontmatter
// Drafted to match the shape in `src/types.ts` and to provide a validate helper.

import { z } from 'zod';

/** Resource type enum used in frontmatter */
export const ResourceTypeEnum = z.enum([
  'agent',
  'checklist',
  'command',
  'knowledge-base',
  'task',
  'template',
]);

/** Frontmatter schema for resources */
export const FrontmatterSchema = z.object({
  title: z.string().optional(),
  description: z.string().max(200).optional(),
  type: ResourceTypeEnum.optional(),
  category: z.string().optional(),
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+(?:[-+].*)?$/)
    .optional(),
  tags: z.array(z.string()).optional(),

  // Type-specific fields (kept permissive)
  reference: z.string().optional(),
  applies_to: z.array(z.string()).optional(),
  temperature: z.number().min(0).max(1).optional(),
  mode: z.string().optional(),
  estimated_duration: z.string().optional(),
  difficulty: z.string().optional(),
  related_resources: z.array(z.string()).optional(),
});

export type FrontmatterSchemaType = z.infer<typeof FrontmatterSchema>;

/**
 * Validate raw frontmatter object against schema.
 *
 * @param raw - Parsed YAML frontmatter object
 * @returns An object with `valid: true` and `data` when valid, or `valid: false` and `errors` when invalid
 */
export const validateFrontmatter = (raw: unknown) => {
  try {
    const data = FrontmatterSchema.parse(raw);
    return { valid: true as const, data };
  } catch (err) {
    if (err instanceof z.ZodError) {
      // ZodError exposes `issues` for detailed validation problems
      return { valid: false as const, errors: err.issues };
    }

    return { valid: false as const, errors: [{ message: String(err) }] };
  }
};
