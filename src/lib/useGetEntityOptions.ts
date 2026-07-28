// CUSTOM HOOK

import { useCallback, useEffect, useState } from 'react'
import type { EntityOptionsResponse, EntityTypeOption } from '#/types.ts'

async function getEntityOptions(): Promise<EntityOptionsResponse> {
  const res = await fetch('http://localhost:3001/api/entity-options')
  if (!res.ok) throw new Error('Failed to fetch entity options')

  return res.json()
}

export function useGetEntityOptions() {
  const [data, setData] = useState<EntityTypeOption[]>([])
  const [rel, setRel] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // useCallback caches the function but doesn't call it.
  const fetchOptions = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await getEntityOptions()
      setData(res.types)
      setRel(res.relationships)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('unknown Error'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  // you can use built in hooks in your
  // custom hooks
  useEffect(() => {
    fetchOptions().then()
  }, [fetchOptions])

  return { data, isLoading, error, refetch: fetchOptions, rel }
}
