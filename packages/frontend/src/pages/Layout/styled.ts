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

export const Footer = styled.footer`
  ${common.flexCenterVH}
  width: 100%;
  font-size: 12px;
  height: 80px;
`

export const Header = styled.header`
  ${common.flexCenterVH}
  width: 100%;
  height: 80px;
`
