import { useFieldContext, useFormContext } from '#/formContext.ts'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select.tsx'
import { Field, FieldError } from '#/components/ui/field.tsx'
import { Label } from '#/components/ui/label.tsx'

import type { EntityTypeOption } from '#/lib/useEntityOptions.ts'

type TypeFieldProps = {
  entityTypes: EntityTypeOption[]
}

export function typeField({ entityTypes }: TypeFieldProps) {
  const field = useFieldContext<string>()
  const form = useFormContext()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  return (
    <Field data-invalid={isInvalid} className={'space-y-1.5'}>
      <Label htmlFor={field.name}>Type</Label>
      <Select
        name={field.name}
        value={field.state.value}
        onValueChange={(value) => {
          field.handleChange(value ?? '')
          form.setFieldValue('subtype', '')
        }}>
        <SelectTrigger
          aria-invalid={isInvalid}
          id={field.name}
          className="w-full max-w-64">
          <SelectValue placeholder={'Select Entity Type'} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {entityTypes.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
