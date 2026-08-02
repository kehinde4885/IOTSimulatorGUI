import type { EntityCardProps, RelationshipGroup } from '#/types.ts'
import { Check, Copy, Link2, TrashIcon } from 'lucide-react'
import { deleteEntity } from '#/lib/useDeleteEntity.ts'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '#/components/ui/card.tsx'
import { Badge } from '#/components/ui/badge.tsx'
import { Button } from '#/components/ui/button.tsx'

const DOT_CAP = 5

export function EntityCard({
  entity,
  entityLookup,
  fetchEntities,
}: EntityCardProps) {
  const [copied, setCopied] = useState(false)

  const totalCount = countRelationships(entity.relationships)

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(entity.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleDelete = () => {
    deleteEntity(entity.id).then(() => {
      console.log('deleted Entity')
      fetchEntities().then()
    })
  }

  return (
    <Card className="relative flex flex-col justify-between transition-shadow hover:shadow-md">
      <CardHeader className="space-y-1.5 pb-3">
        <h3 className="truncate text-base font-semibold leading-tight">
          {entity.name}
        </h3>
        <button
          onClick={handleCopyId}
          className="group flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="truncate font-mono">{entity.id}</span>
          {copied ? (
            <Check className="h-3 w-3 shrink-0 text-emerald-600" />
          ) : (
            <Copy className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </button>
      </CardHeader>

      <CardContent className="flex-1 space-y-2.5 pb-3">
        {entity.relationships.length === 0 ? (
          <span className="text-xs text-muted-foreground">
            No relationships
          </span>
        ) : (
          entity.relationships.map((group, groupIndex) =>
            Object.entries(group).map(([type, ids]) => (
              <div key={`${groupIndex}-${type}`} className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  {type}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ids.map((id) => {
                    const target = entityLookup.get(id)
                    return (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="font-mono font-normal">
                        {target ? target.subtype : `Unknown (${id})`}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )),
          )
        )}
      </CardContent>

      <CardFooter className="flex items-center gap-2 border-t pt-3">
        <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
        <div className="flex items-center gap-0.5">
          {Array.from({ length: Math.min(totalCount, DOT_CAP) }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          ))}
          {totalCount === 0 && (
            <span className="h-1.5 w-1.5 rounded-full bg-muted" />
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {totalCount} connection{totalCount === 1 ? '' : 's'}
        </span>
      </CardFooter>

      <Button
        onClick={() => handleDelete()}
        aria-label={'Delete'}
        className="absolute right-1"
        variant="outline"
        size="icon">
        <TrashIcon></TrashIcon>
      </Button>
    </Card>
  )
}

function flattenRelationships(relationships: RelationshipGroup[]) {
  return relationships.flatMap((group) =>
    Object.entries(group).flatMap(([type, ids]) =>
      ids.map((targetId) => ({ type, targetId })),
    ),
  )
}

function countRelationships(relationships: RelationshipGroup[]) {
  return flattenRelationships(relationships).length
}
