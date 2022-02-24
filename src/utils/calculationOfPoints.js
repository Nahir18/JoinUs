import memoizeOne from "memoize-one";

export const calculationOfPoints = memoizeOne((data = []) => {
   let sum = 0
   data.forEach(({stages}) => {
     for(let i = 0; i < stages.length; i++){
       sum = sum + parseInt(stages[i].point)
     }
   })
   return sum
 })
