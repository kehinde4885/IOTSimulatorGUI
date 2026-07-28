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

export function RelationshipField({
  relationshipsArray,
  devices,
}: RelationshipFieldProps) {
  const form = useFormContext()
  const field = useFieldContext<Record<string, string[]>[]>()

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
                devices={devices}
                selectedKeys={selectedKeys}
                onRemove={() => field.removeValue(index)}
              />
            )}
          </form.Field>
        ))}
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
  devices,
  selectedKeys,
  onRemove,
}: RelationshipRowProps) {
  const currentKey = Object.keys(field.state.value)[0] ?? ''
  const currentValues = field.state.value[currentKey] ?? []

  // if the key has not been selected already
  // and it is the current key for this subfield,
  // then it is available
  const availableRelationships = relationshipsArray.filter(
    (rel) => !selectedKeys.includes(rel) || rel == currentKey,
  )

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
                <CommandEmpty>No devices found</CommandEmpty>
                <CommandGroup>
                  {devices.map((device) => {
                    const isChecked = currentValues.includes(device.id)

                    return (
                      <CommandItem
                        key={device.id}
                        onSelect={() => {
                          const nextValues = isChecked
                            ? currentValues.filter((v) => v !== device.id)
                            : [...currentValues, device.id]

                          field.handleChange({ [currentKey]: nextValues })
                        }}>
                        <Checkbox checked={isChecked} className={'mr-2'} />
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
