import styled, { css } from 'styled-components'
import { colors } from 'styles/variables'
import * as common from 'styles/common'

// https://medium.com/@uiuxlab/the-most-used-responsive-breakpoints-in-2017-of-mine-9588e9bd3a8a

export const Main = styled.main`
  ${common.flexCenterVH}
  min-height: 100vh;
  flex-direction: column;
`

export const Container = styled.div`
  transition: all 500ms linear;
  display: flex;
  height: 750px;
  /* min-height: 750px; */
  /* height: 100%; */
  width: 100%;
  max-width: 1700px;
  padding: 0 8%;
  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    min-height: 750px;
    height: 100%;
  }
`

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  /* height: 750px; */
  @media only screen and (max-width: 1000px) {
    width: 100% !important;
  }
`

const hide = css`
  height: 0 !important;
  min-height: 0 !important;
  margin: 0 !important;
  overflow: hidden;
`

const open = css`
  min-height: 120px !important;
`

const log = css`
  transition-property: min-height, margin;
  transition: 500ms linear;
  flex-grow: 0;
  margin-top: 20px;
  max-height: 200px;
  margin-top: 20px;
  padding: 0;
  p { overflow-y: auto; }
  ${p => p.isOpen ? open : hide};
`

const editor = css`
  height: 80%;
  height: 600px !important;
`

const inout = css`
  @media only screen and (max-width: 1000px) {
    height: 200px !important;
    margin-top: 20px;
  }
`

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  background: ${colors.box};
  box-shadow: 6px 6px 15px ${colors.shadow};
  border-radius: 6px;
  padding: 25px;
  ${p => p.type == 'log' && log || p.type == 'editor' && editor || p.type == 'inout' && inout}
`

export const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 25px;
  align-items: center;
`

export const Divider = styled.button`
  ${common.flexCenterVH}
  background: transparent;
  z-index: 100;
  ${p => p.isVertical
    ? 'min-width: 20px; cursor: ew-resize;'
    : 'min-height: 20px; cursor: ns-resize;'
  }
  ::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 20px;
    background: ${colors.text};
    opacity: .2;
    ${p => p.isVertical
      ? 'width: 2px; height: 50px;'
      : 'height: 2px; width: 50px;'
    }
  }
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`

export const Tooltip = styled.span`
  visibility: hidden;
  white-space: nowrap;
  padding: 5px 8px;
  background: #000;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  position: absolute;
  top: -30px;
  left: ${p => p.left};
  z-index: 100;
  opacity: .5;
`


export const CircleButton = styled.button`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-left: 7px;
  position: relative;
  display: inline-block;
  &:hover ${Tooltip} {
    visibility: visible;
  }
  background: ${p => {
    switch(p.color) {
      case 'red': return colors.btnRed;
      case 'green': return colors.btnGreen;
      case 'orange': return colors.btnOrange;
      }
    }
  }
`

export const TestButton = styled.div`
  cursor: pointer;
  float: left;
  transition: all 100ms linear;
  ${p => p.isActive && 'margin-top: -5px'};
  color: ${p => p.isOk && colors.btnGreen || p.isFail && colors.btnRed};
  :hover { transform: scale(1.1); }
`

export const Footer = styled.footer`
  ${common.flexCenterVH}
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
  font-size: 12px;
  /*max-height: 100px;*/
  min-height: 80px;
  /* MOZNO PADDING */
`

export const Header = styled.header`
  ${common.flexCenterVH}
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
  min-height: 80px;
`