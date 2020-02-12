import styled from 'styled-components'
import * as common from 'styles/common'
import { colors } from 'styles/variables'

export const Wrapper = styled.form`
  ${common.flexCenterVH}
  flex-direction: column;
  padding: 0 25px 25px 25px;
`

export const Submit = styled.button`
  padding: 8px 0;
  width: 100%;
  background: ${colors.btnGreen};
`
