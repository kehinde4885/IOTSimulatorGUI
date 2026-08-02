import type { FormValues } from '#/schema.ts'

export async function createEntity(values: FormValues) {
  const response = await fetch('http://localhost:3001/createEntity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })

  if (!response.ok) {
    throw new Error(`Failed to create entity: ${response.statusText}`)
  }

  console.log(response)

  return response.json()
}
