import { useEntityOptions } from '#/lib/useEntityOptions.ts'
import { useDevices } from '#/lib/useDevices.ts'

import { createFormHook } from '@tanstack/react-form'

import * as z from 'zod'

import { Field, FieldError, FieldLabel } from '#/components/ui/field.tsx'
import { Input } from '#/components/ui/input.tsx'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '#/components/ui/button.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui/popover.tsx'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '#/components/ui/command.tsx'
import { Checkbox } from '#/components/ui/checkbox.tsx'

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    NameField,
  },
  formComponents: {},
})

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  subtype: z.string().min(1, 'Subtype is required'),
  relationships: z.array(z.record(z.string(), z.array(z.string()))),
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
  const {
    data: entityTypes,
    isLoading,
    error,
    refetch,
    rel: relationships,
  } = useEntityOptions()

  const { data: devices } = useDevices()

  console.log('EF', entityTypes)
  //
  // const form = useForm({
  //   defaultValues: { ...defaultData },
  //   validators: {
  //     onChange: formSchema,
  //   },
  // })

  const form = useAppForm({
    defaultValues: { ...defaultData },
    validators: {
      onChange: formSchema,
    },
  })

  return (
    <>
      <div>
        <h1>Entity Details</h1>
        <p>Core properties for the new Entity</p>
      </div>

      {/* JSX form element*/}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className={'space-y-5'}>
        {/* Tanstack Field Object*/}
        {/*  ID */}
        <form.Field
          name="id"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
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
          }}></form.Field>

        {/* Name */}
        <form.AppField
          name={'name'}
          children={(field) => <field.NameField />}
        />

        {/* Type */}
        <form.Field name="type">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
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
          }}
        </form.Field>

        {/*  Subtype - depends on the selected category*/}
        {/*  form.Subscribe only rerenders when the value that is subscribed to 
      changes.
      */}
        <form.Subscribe selector={(state) => state.values.type}>
          {(selectedType) => {
            const selectedtypeObject = entityTypes.find(
              (t) => t.value === selectedType,
            )

            return (
              <form.Field name={'subtype'}>
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
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
                            {selectedtypeObject?.subtypes.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            )
          }}
        </form.Subscribe>

        {/*  Relationships*/}
        <Label>Relationships</Label>

        <form.Subscribe
          selector={(state) => {
            console.log(state)
            return state.values.relationships
          }}
          children={(stateRelationships) => {
            return (
              <form.Field name={'relationships'} mode={'array'}>
                {(field) => {
                  // The field value here is the Array of Relationships
                  // field.state.value = [{isCapOf: []},{isLocatedIn: []}]
                  return (
                    <div className={'space-y-3'}>
                      {field.state.value.map((_, index) => {
                        return (
                          <div key={index} className={'flex items-start gap-2'}>
                            <form.Field name={`relationships[${index}]`}>
                              {(subField) => {
                                /**
                                 * Tanstack form passes each entry in the
                                 * array as its own form field(called subField here)
                                 * subfield.state.value = {isCapOf: []}
                                 */

                                // returns "isCapOf" | empty string
                                const currentKey =
                                  Object.keys(subField.state.value)[0] ?? ''

                                // returns array of ids | empty array
                                const currentValues =
                                  subField.state.value[currentKey] ?? []

                                /**
                                 * This first returns an array of strings,
                                 * with each string being the relationship KEY
                                 * Then the filter operation is run on the returned
                                 * array, the filter array contains all relationship
                                 * keys that have been selected in the form.
                                 */
                                const selectedKeys = stateRelationships
                                  .map((item) => Object.keys(item)[0])
                                  .filter((key) => key && key !== currentKey)

                                /**
                                 * Remove the selected relationships key from the main
                                 * relationship array
                                 */
                                const availableRelationships =
                                  relationships.filter(
                                    (rel) => !selectedKeys.includes(rel),
                                  )

                                return (
                                  <div className={'flex flex-1 gap-2'}>
                                    <Select
                                      value={currentKey}
                                      onValueChange={(value) => {
                                        subField.handleChange({
                                          [value ?? '']: currentValues,
                                        })
                                      }}>
                                      <SelectTrigger className={'w-48'}>
                                        <SelectValue
                                          placeholder={'Select Relationship'}
                                        />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          {availableRelationships.map((rel) => (
                                            <SelectItem key={rel} value={rel}>
                                              {rel}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>

                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          type="button"
                                          variant="outline"
                                          className="flex-1 justify-between font-normal">
                                          {currentValues.length > 0
                                            ? `${currentValues.length} selected`
                                            : 'Select devices'}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-64 p-0">
                                        <Command>
                                          <CommandInput placeholder="Search devices..." />
                                          <CommandList>
                                            <CommandEmpty>
                                              No devices found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                              {devices.map((device) => {
                                                const isChecked =
                                                  currentValues.includes(
                                                    device.id,
                                                  )

                                                return (
                                                  <CommandItem
                                                    key={device.id}
                                                    onSelect={() => {
                                                      const nextValues =
                                                        isChecked
                                                          ? currentValues.filter(
                                                              (v) =>
                                                                v !== device.id,
                                                            )
                                                          : [
                                                              ...currentValues,
                                                              device.id,
                                                            ]
                                                      subField.handleChange({
                                                        [currentKey]:
                                                          nextValues,
                                                      })
                                                    }}>
                                                    <Checkbox
                                                      checked={isChecked}
                                                      className="mr-2"
                                                    />
                                                    {device.name}
                                                  </CommandItem>
                                                )
                                              })}
                                            </CommandGroup>
                                          </CommandList>
                                        </Command>
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                )
                              }}
                            </form.Field>

                            <Button
                              type={'button'}
                              variant="outline"
                              size={'icon'}
                              onClick={() => field.removeValue(index)}>
                              <span>X</span>
                            </Button>
                          </div>
                        )
                      })}

                      <Button
                        type={'button'}
                        variant="outline"
                        disabled={
                          stateRelationships.length >= relationships.length
                        }
                        onClick={() => field.pushValue({ '': [] })}>
                        Add Relationship
                      </Button>
                    </div>
                  )
                }}
              </form.Field>
            )
          }}
        />
      </form>
    </>
  )
}

function NameField() {
  const field = useFieldContext<string>()
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
    </Field>
  )
}

function IDField() {
  const field = useContext
}
