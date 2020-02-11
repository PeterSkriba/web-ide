import styled, { css } from 'styled-components'
import { colors } from 'styles/variables'
import * as common from 'styles/common'

export const Main = styled.div`
  display: flex;
  width: 100%;
  @media only screen and (max-width: 1000px) {
    flex-direction: column;
  }
`

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 750px;
  padding: 0 8%;
  ${p => p.isOpenSidebar && 'padding-left: 56px;'}
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
  @media only screen and (max-width: 1000px) {
    width: 100% !important;
  }
`

const hide = css`
  max-height: 0 !important;
  margin-top: 0 !important;
  overflow: hidden;
`

const log = css`
  margin-top: 20px;
  max-height: 999px;
  pre {
    max-height: 200px;
    min-height: 60px;
    margin: 0 0 25px 25px;
    padding-right: 25px;
    overflow-y: auto;
    white-space: pre-wrap;
  }
  transition-property: max-height, margin-top;
  transition: ${p => (p.isOpen ? '1s' : '.5s')} cubic-bezier(0, 1, 0, 1);
  ${p => !p.isOpen && hide};
`

const editor = css`
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
  background: ${colors.box};
  box-shadow: 6px 6px 15px ${colors.shadow};
  border-radius: 6px;
  ${p =>
    (p.type == 'log' && log) ||
    (p.type == 'editor' && editor) ||
    (p.type == 'inout' && inout)}
`

export const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 66px;
  padding: 25px;
  align-items: center;
`

export const Divider = styled.button`
  ${common.flexCenterVH}
  background: transparent;
  z-index: 100;
  ${p =>
    p.isVertical
      ? 'min-width: 20px; cursor: ew-resize;'
      : 'min-height: 20px; cursor: ns-resize;'}
  &:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 20px;
    background: ${colors.text};
    opacity: 0.2;
    ${p =>
      p.isVertical ? 'width: 2px; height: 50px;' : 'height: 2px; width: 50px;'}
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
  opacity: 0.5;
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
    switch (p.color) {
      case 'red':
        return colors.btnRed
      case 'green':
        return colors.btnGreen
      case 'orange':
        return colors.btnOrange
    }
  }};
`

export const TestButton = styled.button`
  background: transparent;
  float: left;
  color: ${colors.text};
  transition: all 100ms linear;
  ${p => p.isActive && 'margin-top: -5px'};
  color: ${p => (p.isOk && colors.btnGreen) || (p.isFail && colors.btnRed)};
  &:hover {
    transform: scale(1.1);
  }
`

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  height: 750px;
  background: ${colors.box};
  box-shadow: 6px 6px 15px ${colors.shadow};
  border-radius: 0 6px 6px 0;
  position: relative;
  transition: width 0.5s cubic-bezier(0, 1, 0, 1);
  width: ${p => (p.isOpen ? '350px' : '0px')};
  @media only screen and (max-width: 1300px) {
    width: ${p => (p.isOpen ? '250px' : '0px')};
  }
  @media only screen and (max-width: 1000px) {
    width: 100% !important;
    border-radius: 0;
    margin-bottom: 20px;
    height: auto;
    max-height: 400px;
  }
  div {
    overflow: hidden;
    display: flex;
    align-items: center;
    h2 {
      margin-left: 8px;
      font-weight: 500;
      font-size: 18px;
    }
  }
`

export const SidebarBody = styled.div`
  overflow: hidden;
  margin-bottom: 25px;
  pre {
    width: 100%;
    height: 100%;
    padding: 0 35px;
    font-family: inherit;
    overflow-y: auto;
    white-space: pre-wrap;
    @media only screen and (max-width: 1000px) {
      max-height: 300px;
    }
  }
`

export const ToggleSidebar = styled.button`
  ${common.flexCenterVH}
  z-index: 100;
  position: absolute;
  width: 50px;
  padding: 5px;
  height: 50px;
  border-radius: 50%;
  right: -25px;
  top: calc(50% - 20px);
  background: ${colors.text};
  color: ${colors.box};
  transform: scale(${p => (p.isOpen ? -1 : 1)});
  ${p => !p.isOpen && 'justify-content: flex-end;'}
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`

export const CodeTitle = styled.div`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: -15px;
    top: calc(50% - 5px);
    display: none;
    ${p => p.isNotSaved && 'display: block;'}
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background: ${colors.text};
  }
`
