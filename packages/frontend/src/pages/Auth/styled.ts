import styled, { css } from 'styled-components'
import * as common from 'styles/common'
import { colors } from 'styles/variables'

export const Wrapper = styled.div`
  background: ${colors.box};
`

export const Header = styled.div`
  ${common.flexCenterVH}
  width: 100%;
  padding: 0 25px;
  font-size: 16px;
`

export const HeaderButton = styled.button`
  text-transform: uppercase;
  font-weight: 600;
  color: ${p => (p.isActive ? colors.btnOrange : colors.text)};
  flex-grow: 1;
  padding: 25px 0;
`
