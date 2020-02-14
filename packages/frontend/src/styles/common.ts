import { css } from 'styled-components'
import { colors, vars } from 'styles/variables'

export const flexCenterVH = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`

export const box = css`
  background: ${colors.box};
  box-shadow: ${colors.boxShadow1};
  border-radius: ${vars.borderRadius};
`
