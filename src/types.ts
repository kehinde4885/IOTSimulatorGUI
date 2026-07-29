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
