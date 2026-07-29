import { useGetEntityOptions } from '#/lib/useGetEntityOptions.ts'
import { useGetEntities } from '#/lib/useGetEntities.ts'

import { createFormHook, useSelector } from '@tanstack/react-form'
import { fieldContext, formContext, useFormContext } from '../formContext.ts'

import type { FormValues } from '#/schema.ts'
import { formSchema } from '#/schema.ts'

import { useNavigate } from '@tanstack/react-router'

import { NameField } from '#/components/fields/nameField.tsx'
import { IDField } from '#/components/fields/idField.tsx'
import { typeField } from '#/components/fields/typeField.tsx'
import { subTypeField } from '#/components/fields/subTypeField.tsx'
import { RelationshipField } from '#/components/fields/relationshipField.tsx'

import { Button } from '#/components/ui/button.tsx'

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    NameField,
    IDField,
    typeField,
    subTypeField,
    RelationshipField,
  },
  formComponents: {},
})

// These are the form fields in my form
const defaultData: FormValues = {
  id: '1',
  name: '',
  type: '',
  subtype: '',
  relationships: [],
}

export function EntityForm() {
  const navigate = useNavigate()

  const { data: entityTypes, rel: relationships } = useGetEntityOptions()

  const { data: entities } = useGetEntities()

  const form = useAppForm({
    defaultValues: { ...defaultData },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(await createEntity(value))
      await navigate({ to: '..' })
    },
  })

  return (
    <>
      <div>
        <h1>Entity Details</h1>
        <p>Core properties for the new Entity</p>
      </div>

      <form.AppForm>
        {/* JSX form element*/}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className={'space-y-5'}>
          {/* Tanstack Field Object*/}
          <FormErrors />

          <form.AppField name={'id'} children={(field) => <field.IDField />} />

          <form.AppField
            name={'name'}
            children={(field) => <field.NameField />}
          />

          <form.AppField
            name="type"
            children={(field) => <field.typeField entityTypes={entityTypes} />}
          />

          {/*  Subtype - depends on the selected category*/}
          <form.AppField
            name={'subtype'}
            children={(field) => (
              <field.subTypeField entityTypes={entityTypes} />
            )}
          />

          <form.AppField
            name={'relationships'}
            mode={'array'}
            children={(field) => (
              <field.RelationshipField
                relationshipsArray={relationships}
                entities={entities}
              />
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? 'Submitting...' : 'submit'}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </form.AppForm>
    </>
  )
}

async function createEntity(values: FormValues) {
  const response = await fetch('http://localhost:3001/createEntity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })

  if (!response.ok) {
    throw new Error(`Failed to create entity: ${response.statusText}`)
  }

  console.log(response)

  return response.json()
}

function FormErrors() {
  const form = useFormContext()
  const errors = useSelector(form.store, (state) => state.errors)

  if (errors.length === 0) return null

  return (
    <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 space-y-1">
      {errors.map((error, index) => (
        <p key={index} className="text-sm text-destructive">
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </p>
      ))}
    </div>
  )
}
