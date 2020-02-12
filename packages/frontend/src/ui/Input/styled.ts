import styled from 'styled-components'
import * as common from 'styles/common'
import { colors } from 'styles/variables'

export const Wrapper = styled.div`
  position: relative;
`

export const Input = styled.input`
  padding: 4px 8px;
  margin-bottom: 8px;
  transition: background 0.5s ease;
  ${p => p.isError && `background: ${colors.btnRed};`}
`

export const Submit = styled.button`
  padding: 8px 0;
  width: 100%;
  background: ${colors.btnGreen};
`

export const ErrorBox = styled.div`
  display: ${p => (p.isVisible ? 'block' : 'none')};
  color: ${colors.btnRed};
  padding-bottom: 8px;
`
