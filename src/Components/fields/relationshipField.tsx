import { useFieldContext, useFormContext } from '#/formContext.ts'
import { Label } from '#/components/ui/label.tsx'
import { useSelector } from '@tanstack/react-form'

import type { RelationshipFieldProps, RelationshipRowProps } from '#/types.ts'

import { Button } from '#/components/ui/button.tsx'
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  Select,
} from '@/components/ui/select'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Command,
} from '@/components/ui/command'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldError } from '#/components/ui/field.tsx'

export function RelationshipField({
  relationshipsArray,
  entities,
}: RelationshipFieldProps) {
  const form = useFormContext()
  const field = useFieldContext<Record<string, string[]>[]>()

  console.log(entities)

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Relationships is the subscribed value, so this component would rerender
  // whenever relationships changes/
  const selectedRelationshipsArray: [] = useSelector(
    form.store,
    (state) => state.values.relationships,
  )

  // the categories that have been selected by the user
  const selectedKeys = selectedRelationshipsArray
    .map((item) => Object.keys(item)[0])
    .filter(Boolean)

  // console.log('FR', field.state.meta.errors)

  return (
    <div className={'space-y-3'}>
      <Label>Relationships</Label>
      <div className={'space-y-3'}>
        {field.state.value.map((_, index) => (
          <form.Field key={index} name={`relationships[${index}]` as never}>
            {(subField) => (
              <RelationshipRow
                field={subField}
                relationshipsArray={relationshipsArray}
                entities={entities}
                selectedKeys={selectedKeys}
                onRemove={() => field.removeValue(index)}
              />
            )}
          </form.Field>
        ))}
        {isInvalid && (
          <FieldError errors={field.state.meta.errors}></FieldError>
        )}
      </div>
      <Button
        type={'button'}
        variant={'outline'}
        disabled={
          selectedRelationshipsArray.length >= relationshipsArray.length
        }
        onClick={() => field.pushValue({ '': [] })}>
        Add Relationship
      </Button>
    </div>
  )
}

function RelationshipRow({
  field,
  relationshipsArray,
  entities,
  selectedKeys,
  onRemove,
}: RelationshipRowProps) {
  const currentKey = Object.keys(field.state.value)[0] ?? ''
  const currentValues = field.state.value[currentKey] ?? []

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // if the key has not been selected already,
  // and it is the current key for this subfield,
  // then it is available
  const availableRelationships = relationshipsArray.filter(
    (rel) => !selectedKeys.includes(rel) || rel == currentKey,
  )

  // console.log('ROW', field.state.meta.errors)

  return (
    <div className={'flex items-start gap-2'}>
      <div className={'flex flex-1 gap2'}>
        <Select
          value={currentKey}
          onValueChange={(value) => {
            field.handleChange({ [value ?? '']: currentValues })
          }}>
          <SelectTrigger className={'w-48'}>
            <SelectValue placeholder={'Select Relationship'} />
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
          <PopoverTrigger
            render={
              <Button
                type={'button'}
                variant={'outline'}
                className="flex-1 justify-between font-normal">
                {currentValues.length > 0
                  ? `${currentValues.length} selected`
                  : 'Select devices'}{' '}
              </Button>
            }></PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder={'Search devices...'} />
              <CommandList>
                <CommandEmpty>No Entities found</CommandEmpty>
                <CommandGroup>
                  {entities.map((entity) => {
                    console.log(entity)
                    const isChecked = currentValues.includes(entity.id)

                    return (
                      <CommandItem
                        key={entity.id}
                        onSelect={() => {
                          const nextValues = isChecked
                            ? currentValues.filter(
                                (entId: string) => entId !== entity.id,
                              )
                            : [...currentValues, entity.id]

                          field.handleChange({ [currentKey]: nextValues })
                        }}>
                        <Checkbox checked={isChecked} className={'mr-2'} />
                        {entity.name}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {isInvalid && (
          <FieldError errors={field.state.meta.errors}></FieldError>
        )}
      </div>

      <Button
        type={'button'}
        variant="outline"
        size={'icon'}
        onClick={onRemove}>
        <span className="size-4"> X</span>
      </Button>
    </div>
  )
}
