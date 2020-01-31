import styled, { css } from 'styled-components'
import * as common from 'styles/common'

export const Main = styled.div`
  ${common.flexCenterVH}
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
`

export const Content = styled.main`
  ${common.flexCenterVH}
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
`