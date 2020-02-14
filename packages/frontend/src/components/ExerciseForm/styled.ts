import styled from 'styled-components'
import * as common from 'styles/common'
import { colors } from 'styles/variables'

export const Wrapper = styled.form`
  ${common.flexCenterVH}
  width: 100%;
  flex-direction: column;
  padding: 0 25px 25px 25px;
`

export const Submit = styled.button`
  padding: 8px 0;
  width: 100%;
  background: ${colors.btnGreen};
`

export const EditorWrapper = styled.div`
  width: 100%;
  height: 500px;
  padding: 25px;
  background: ${colors.background};
  margin-bottom: 8px;
`

export const Textarea = styled.textarea`
  width: 100%;
  height: 300px;
  margin-bottom: 8px;
  padding: 4px 8px;
`

export const StdWrapper = styled.div`
  ${common.flexCenterVH}
  width: 100%;
`

export const Std = styled.textarea`
  flex-grow: 1;
  height: 100px;
  margin-bottom: 8px;
  padding: 4px 8px;
`
