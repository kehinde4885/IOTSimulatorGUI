import { useFieldContext } from '#/formContext.ts'
import { FieldLabel, Field, FieldError } from '#/components/ui/field.tsx'
import { Input } from '#/components/ui/input.tsx'

export function NameField() {
  const field = useFieldContext<string>()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  return (
    <Field>
      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        aria-label={'name'}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder="e.g. Living Room HVAC"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
