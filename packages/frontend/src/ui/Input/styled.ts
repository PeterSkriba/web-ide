import styled from 'styled-components'
import * as common from 'styles/common'
import { colors, vars } from 'styles/variables'

export const Wrapper = styled.div`
  position: relative;
  padding: ${vars.gap} 0 10px 0;
`

export const Input = styled.input`
  transition: background, color 0.5s ease;
  width: 300px;
  padding: 20px 18px;
  padding-right: 50px;
  background: ${colors.box};
  color: ${colors.text};
  border-radius: ${vars.borderRadius};
  box-shadow: ${colors.boxShadow1};
  ${p =>
    p.isError && `background: ${colors.btnRed}; color: ${colors.background};`}
  &:focus,
  &:active {
    padding-top: 28px;
    padding-bottom: 12px;
  }
`

export const Label = styled.label`
  position: absolute;
  transition: color, top 0.5s ease;
  left: 18px;
  top: 44px;
  font-size: 12px;
  color: ${colors.text};
  ${p => p.isError && `color: ${colors.background};`}
  ${Input}:focus ~ & {
    top: 36px;
  }
`

export const Icon = styled.div`
  transition: color 0.5s ease;
  color: ${colors.text};
  ${p => p.isError && `color: ${colors.background};`}
  position: absolute;
  right: 18px;
  top: 44px;
  svg {
    font-size: 18px;
  }
`

export const ErrorBox = styled.div`
  position: absolute;
  font-size: 13px;
  color: ${colors.btnRed};
  transition: visibility, top 0.5s ease;
  top: 44px;
  visibility: hidden;
  ${p => p.isError && 'top: 0; visibility: visible;'}
  width: 100%;
  ${common.flexCenterVH}
`
