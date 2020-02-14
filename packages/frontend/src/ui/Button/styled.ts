import styled from 'styled-components'
import * as common from 'styles/common'
import { colors, vars } from 'styles/variables'

export const Wrapper = styled.div`
  position: relative;
  padding: ${vars.gap} 0 10px 0;
`

export const Button = styled.button`
  display: flex;
  justify-content: space-around;
  width: 150px;
  padding: 14px 0;
  color: ${colors.primary};
  border: 1.5px solid ${colors.primary};
  border-radius: ${vars.borderRadius};
`
