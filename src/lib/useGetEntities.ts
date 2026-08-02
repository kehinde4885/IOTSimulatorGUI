import { useCallback, useEffect, useState } from 'react'
import type { Entity } from '#/types.ts'

async function getEntities() {
  const res = await fetch('http://localhost:3001/getEntities')
  if (!res.ok) throw new Error('Failed to fetch entity options')

  return res.json()
}

export function useGetEntities() {
  const [data, setData] = useState<Entity[]>([])
  const [error, setError] = useState<Error | null>(null)

  const fetchEntities = useCallback(async () => {
    try {
      console.log('Fetching Entities')
      const res: Entity[] = await getEntities()
      setData(res)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown Error'))
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchEntities().then()
  }, [])

  return { data, fetchEntities }
}
