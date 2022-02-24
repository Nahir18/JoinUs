export function calculationOfStages(data = []) {
  let sum = 0
  data.forEach(({stages}) => {
    sum = sum + stages.length
  })
  return sum
}
