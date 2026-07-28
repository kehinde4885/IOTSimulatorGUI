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

interface Device {
  name: string
  id: string
}

export type RelationshipFieldProps = {
  relationshipsArray: string[]
  devices: Device[]
}

export type RelationshipRowProps = {
  field: AnyFieldApi
  relationshipsArray: string[]
  devices: Device[]
  selectedKeys: string[]
  onRemove: () => void
}
