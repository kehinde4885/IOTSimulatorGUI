import { Label } from '#/components/ui/label.tsx'
import { useFieldContext, useFormContext } from '#/formContext.ts'
import { useSelector } from '@tanstack/react-form'

import type { subTypeFieldProps } from '#/types.ts'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select.tsx'
import { Field, FieldError } from '#/components/ui/field.tsx'

export function subTypeField({ entityTypes }: subTypeFieldProps) {
  const form = useFormContext()
  const field = useFieldContext<string>()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  const selectedType = useSelector(form.store, (state) => state.values.type)

  const subTypes =
    entityTypes.find((item) => item.value === selectedType)?.subtypes ?? []

  return (
    <Field data-invalid={isInvalid} className={'space-y-1.5'}>
      <Label htmlFor={field.name}>SubType</Label>
      <Select
        name={field.name}
        value={field.state.value}
        onValueChange={(value) => {
          field.handleChange(value ?? '')
        }}>
        <SelectTrigger
          aria-invalid={isInvalid}
          id={field.name}
          className="w-full max-w-64">
          <SelectValue placeholder={'Select Entity Subtype'} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {subTypes.map((item) => (
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
