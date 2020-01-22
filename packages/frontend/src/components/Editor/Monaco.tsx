import React from 'react'
import MonacoEditor from 'react-monaco-editor';

import * as S from './styled'

// https://photos.google.com/search/screenshot/photo/AF1QipMJlLb_ilOdUwGlKlPy8vuku6DKdsjEmO3bWRPt
// https://www.npmjs.com/package/compile-run

type Props = {
  code?: string,
  focus?: boolean
}

const Monaco = ({ code = '', focus = false }: Props) => {
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
    fontSize: 14
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