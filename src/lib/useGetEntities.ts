export function useGetEntities() {
  const data1 = { name: 'A', id: '1', type: 'capability', data: 698 }
  const data2 = { name: 'B', id: '2', type: 'capability', data: 698 }
  const data3 = { name: 'C', id: '3', type: 'capability', data: 698 }
  const data4 = { name: 'D', id: '4', type: 'capability', data: 698 }

  const data = [data1, data2, data3, data4]

  return { data }
}

//
// <Input
//   placeholder="comma-seperated values"
// aria-label={'ids'}
// value={currentValues.join(',')}
// onChange={(e) => {
//   const values = e.target.value
//     .split(',')
//     .map((v) => v.trim())
//     .filter(Boolean)
//   subField.handleChange({
//     [currentKey]: values,
//   })
// }}
// />
