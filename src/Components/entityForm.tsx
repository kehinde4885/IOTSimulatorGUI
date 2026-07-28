import { useGetEntityOptions } from '#/lib/useGetEntityOptions.ts'
import { useGetEntities } from '#/lib/useGetEntities.ts'

import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from '../formContext.ts'

import { NameField } from '#/components/fields/nameField.tsx'
import { IDField } from '#/components/fields/idField.tsx'
import { typeField } from '#/components/fields/typeField.tsx'
import { subTypeField } from '#/components/fields/subTypeField.tsx'
import { RelationshipField } from '#/components/fields/relationshipField.tsx'

import * as z from 'zod'
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

const formSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  subtype: z.string().min(1, 'Subtype is required'),
  relationships: z.array(
    z.record(z.string().min(1, 'pick a relationship'), z.array(z.string())),
  ),
})

type FormValues = z.infer<typeof formSchema>

// These are the form fields in my form
const defaultData: FormValues = {
  id: 1,
  name: '',
  type: '',
  subtype: '',
  relationships: [],
}

export function EntityForm() {
  const { data: entityTypes, rel: relationships } = useGetEntityOptions()

  const { data: devices } = useGetEntities()

  const form = useAppForm({
    defaultValues: { ...defaultData },
    validators: {
      onChange: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log('submitted', value)
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
                devices={devices}
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
