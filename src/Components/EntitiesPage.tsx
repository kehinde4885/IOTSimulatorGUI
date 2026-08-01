import { EntityCard } from '#/components/EntityCard.tsx'
import type { Entity, entityPageProps } from '#/types.ts'
import { useMemo } from 'react'

export function EntitiesPage({ entities }: entityPageProps) {
  const entityLookup = useMemo(() => buildEntityLookup(entities), [entities])

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Entities</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {entities.length} entit{entities.length === 1 ? 'y' : 'ies'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entities.map((entity) => (
          <EntityCard
            key={entity.id}
            entity={entity}
            entityLookup={entityLookup}
          />
        ))}
      </div>
    </div>
  )
}

function buildEntityLookup(entities: Entity[]): Map<string, Entity> {
  return new Map(entities.map((entity) => [entity.id, entity]))
}
