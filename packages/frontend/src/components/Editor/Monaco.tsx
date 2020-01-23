import React from 'react'
import MonacoEditor from 'react-monaco-editor';

import * as S from './styled'

// https://www.npmjs.com/package/compile-run

type Props = {
  code?: string,
  focus?: boolean,
  readOnly?: boolean
}

const Monaco = ({ code = '', focus = false, readOnly = false }: Props) => {
  const editorDidMount = (editor, monaco) => {
    console.log('editorDidMount')
    if (focus) editor.focus()
  }

  const onChange = (newValue, e) => {
    console.log('onChange', newValue, e)
  }

  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    lineHeight: 20,
    autoIndent: "full" as const,
    fontLigatures: true,
    fontSize: 14,
    readOnly: readOnly
  }

  return (
    <MonacoEditor
      height="100%"
      language="cpp"
      theme="vs-dark"
      value={code}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  )
}

export default Monaco