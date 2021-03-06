import styled from "styled-components"

export const FormContainer = styled.div`
  width: 100%;
  display: grid;
  word-wrap: break-word;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 24px;
  --indent-bottom-for-form: 16px;
  margin-bottom: 24px;
  height: 100%;
`

export const TabContainer = styled.div`
  padding: 24px 24px 0 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
`
