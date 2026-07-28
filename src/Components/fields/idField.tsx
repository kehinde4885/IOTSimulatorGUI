import { useFieldContext } from '#/formContext'
import { Field, FieldError, FieldLabel } from '#/components/ui/field.tsx'
import { Input } from '#/components/ui/input.tsx'

export function IDField() {
  const field = useFieldContext<number>()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field className="space-y-2">
      <FieldLabel htmlFor={field.name}>ID</FieldLabel>
      <Input
        required
        aria-label={field.name}
        id={field.name}
        type="number"
        value={field.state.value}
        onChange={(e) => {
          // set input field value
          field.handleChange(parseInt(e.target.value))
        }}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
