import styled, { css } from 'styled-components'
import * as common from 'styles/common'
import { colors, vars } from 'styles/variables'

import { NavLink } from 'react-router-dom'

export const Wrapper = styled.div`
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

const headerFont = css`
  letter-spacing: 0.3px;
  color: ${colors.text};
  font-weight: 600; // ? 700
`

export const Footer = styled.footer`
  ${common.flexCenterVH}
  ${headerFont}
  width: 100%;
  font-size: 12px;
  height: 100px;
  text-shadow: ${colors.boxShadow2};
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 calc(8% - ${vars.gap});
  width: 100%;
  height: 100px;
`

export const Navigation = styled.nav`
  ${common.flexCenterVH}
  height: 100%;
  display: flex;
`

export const MyLink = styled(NavLink)`
  @media only screen and (max-width: 1000px) {
    display: none;
  }
  ${common.flexCenterVH}
  padding: ${vars.gap};
  ${headerFont}
  position: relative;
  text-shadow: ${colors.boxShadow2};

  &.active {
    &:before {
      content: '';
      position: absolute;
      height: 1px;
      width: 20px;
      background: ${colors.primary};
      bottom: 22px;
    }
  }
`

export const ProfileWrapper = styled.div`
  ${common.flexCenterVH}
  height: 100%;
  span {
    color: ${colors.text};
    padding: 0 20px;
    font-weight: 300;
    opacity: 0.5;
    font-size: 18px;
  }
`

export const Profile = styled(NavLink)`
  ${common.flexCenterVH}
  height: 100%;
  p {
    ${headerFont}
    padding: 0 16px;
    text-shadow: ${colors.boxShadow2};
    @media only screen and (max-width: 1000px) {
      display: none;
    }
  }
`

export const ProfilePicture = styled.div`
  ${common.flexCenterVH}
  width: 30px;
  height: 30px;
  border: 2px solid ${colors.primary};
  border-radius: 50%;
  box-shadow: ${colors.boxShadow1};
  svg {
    font-size: 20px;
    color: ${colors.text};
  }
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 ${vars.gap} 0 16px;
  padding: 4px 12px;
  border: 1.5px solid ${colors.primary};
  background: transparent;
  border-radius: ${vars.borderRadius};
  box-shadow: ${colors.boxShadow1};
  color: ${colors.primary};
  font-weight: 600;
  transition: color, background 1s ${vars.transition};
  @media only screen and (max-width: 1000px) {
    padding: 5px;
  }
  p {
    margin-right: 8px;
    @media only screen and (max-width: 1000px) {
      display: none;
    }
  }
  &:hover {
    background: ${colors.primary};
    color: ${colors.background};
  }
`

export const Menu = styled(Button)`
  ${common.flexCenterVH}
  margin: 0 ${vars.gap};
  padding: 0;
  height: 35px;
  width: 35px;
  @media only screen and (min-width: 1000px) {
    display: none;
  }
`
