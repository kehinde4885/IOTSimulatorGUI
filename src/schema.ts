import * as z from 'zod'

const relationshipItemSchema = z.record(z.string(), z.array(z.string())).refine(
  (item) => {
    const keys = Object.keys(item)
    if (keys.length !== 1) return false
    const key = keys[0]
    return key !== '' && item[key].length > 0
  },
  { message: 'Select a relationship type and at least one device' },
)
export const formSchema = z.object({
  id: z.string().min(1, 'an Id is required'),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  subtype: z.string().min(1, 'Subtype is required'),
  relationships: z
    .array(relationshipItemSchema)
    .min(1, 'At least one relationship is required'),
})

export type FormValues = z.infer<typeof formSchema>
