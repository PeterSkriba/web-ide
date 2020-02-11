import styled, { css } from 'styled-components'
import * as common from 'styles/common'

export const Main = styled.div`
  position: fixed;
  z-index: 900;
  ${common.flexCenterVH}
  background: red;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`
