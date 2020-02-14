import styled, { css } from 'styled-components'
import * as common from 'styles/common'
import { colors } from 'styles/variables'

export const Wrapper = styled.div`
  ${common.flexCenterVH}
  flex-direction: column;
  width: 40%;
  background: ${colors.box};
  padding: 25px;
`
