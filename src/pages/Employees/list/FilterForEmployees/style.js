import styled from "styled-components"
import DatePicker from "../../../../components/Fields/DatePicker";

export const FilterContainer = styled.div`
  --background-input: var(--color-white);
  --height-input: 32px;
  display: grid;
  grid-template-columns: minmax(220px, 320px) minmax(280px, 400px) minmax(300px, 1fr);
  grid-column-gap: 24px;
  // todo изменение ширины
  //@media (max-width: 1470px) {
  //  grid-template-columns: minmax(220px, 280px) minmax(280px, 380px) 1fr;
  //}
  //@media (max-width: 1280px) {
  //  grid-template-columns: minmax(200px, 240px) minmax(280px, 380px) 1fr;
  //}
`


export const StyleDate = styled(DatePicker)`
  width: 160px;
  // todo изменение ширины
  //@media (max-width: 1470px) {
  //  width: 130px;
  //}
`
