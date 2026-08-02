import type { AnyFieldApi } from '@tanstack/react-form'

interface EntityOption {
  value: string
  label: string
}

export interface EntityTypeOption extends EntityOption {
  subtypes: EntityOption[]
}

export interface EntityOptionsResponse {
  types: EntityTypeOption[]
  relationships: string[]
}

export type subTypeFieldProps = {
  entityTypes: EntityTypeOption[]
}

export interface Entity {
  name: string
  id: string
  subtype: string
  relationships: []
}

export type RelationshipFieldProps = {
  relationshipsArray: string[]
  entities: Entity[]
}

export type RelationshipRowProps = {
  field: AnyFieldApi
  relationshipsArray: string[]
  entities: Entity[]
  selectedKeys: string[]
  onRemove: () => void
}

export interface entityPageProps {}

export interface EntityCardProps {
  entity: Entity
  entityLookup: Map<string, Entity>
  fetchEntities: () => Promise<void>
}

export type RelationshipGroup = Record<string, string[]>
