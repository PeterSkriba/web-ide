import React, { useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { Monaco } from 'components'
import { Input } from 'ui'

import { EXIST_EXERCISE } from 'apollo/queries'
import { RUN_CODE_BODY, CREATE_EXERCISE } from 'apollo/mutations'

import * as S from './styled'

type Std = {
  one: string
  two: string
  three: string
}

type FormData = {
  title: string
  description: string
  stdin: Std
  stdout: Std
}

const ExerciseForm = () => {
  const history = useHistory()

  const [body, setBody] = useState<string>(
    '// starting code\n#include <stdio.h>\n\nint main() {\n\n\treturn 0;\n}'
  )
  const [code, setCode] = useState<string>('// correct code')

  const [existExercise, { data: existTitle }] = useLazyQuery(EXIST_EXERCISE)

  const fetch = (title: string): boolean => {
    existExercise({ variables: { title: title } })
    return !existTitle?.existExercise
  }

  const { register, handleSubmit, errors, watch, setValue } = useForm<FormData>(
    {
      mode: 'onChange',
      reValidateMode: 'onChange',
      submitFocusError: true
    }
  )

  const [runCode] = useMutation(RUN_CODE_BODY)

  const handleRun = (test: string) => {
    runCode({
      variables: {
        data: {
          body: code,
          input: watch(`stdin.${test}`)
        }
      }
    }).then(res => {
      setValue(`stdout.${test}`, res?.data?.runCodeBody?.output)
    })
  }

  const [createExercise] = useMutation(CREATE_EXERCISE)

  const onSubmit = data => {
    Object.values(data.stdin).forEach((test, idx) => {
      runCode({
        variables: {
          data: {
            body: code,
            input: test
          }
        }
      }).then(res => {
        if (
          res?.data?.runCodeBody?.output != data.stdout[idx] ||
          !!res?.data?.runCodeBody?.exitCode ||
          !!res?.data?.runCodeBody?.log
        )
          throw new Error('Code Error')
      })
    })
    // TODO: code error handle await
    createExercise({
      variables: {
        data: {
          title: data.title,
          body: body,
          description: data.description,
          stdin: Object.values(data.stdin),
          stdout: Object.values(data.stdout)
        }
      }
    }).then(res => history.push(`/${res?.data?.createExercise?.slug}`))
    // TODO: isPending and only author when isPending can see
  }

  return (
    <S.Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register}
        errors={errors}
        type="text"
        name="title"
        title="Title"
        placeholder="Enter Title"
        options={{
          required: true,
          pattern: /^[A-Z0-9 ]+$/i,
          minLength: 5,
          maxLength: 30,
          validate: {
            exist: value =>
              fetch(value) || 'Exercise with this title already exists.'
          }
        }}
      />

      <S.EditorWrapper>
        <Monaco code={body} setCode={setBody} />
      </S.EditorWrapper>

      <S.EditorWrapper>
        <Monaco code={code} setCode={setCode} />
      </S.EditorWrapper>

      <S.Textarea
        name="description"
        placeholder="Enter description"
        ref={register({
          required: 'Description is required.',
          minLength: {
            value: 5,
            message: 'Description must be at least 5 characters long.'
          },
          maxLength: {
            value: 1000,
            message: 'Description must be at the most 1000 characters long.'
          }
        })}
      />
      {/*TODO: error message ui / component  required ?? */}

      <S.StdWrapper>
        <S.Std name="stdin.one" placeholder="Enter stdin 1" ref={register} />
        <S.Std
          name="stdout.one"
          placeholder="Enter stdout 1 or run code"
          ref={register}
        />
        <button type="button" onClick={() => handleRun('one')}>
          Run Test 1
        </button>
      </S.StdWrapper>

      <S.StdWrapper>
        <S.Std name="stdin.two" placeholder="Enter stdin 2" ref={register} />
        <S.Std
          name="stdout.two"
          placeholder="Enter stdout 2 or run code"
          ref={register}
        />
        <button type="button" onClick={() => handleRun('two')}>
          Run Test 2
        </button>
      </S.StdWrapper>

      <S.StdWrapper>
        <S.Std name="stdin.three" placeholder="Enter stdin 3" ref={register} />
        <S.Std
          name="stdout.three"
          placeholder="Enter stdout 3 or run code"
          ref={register}
        />
        <button type="button" onClick={() => handleRun('three')}>
          Run Test 3
        </button>
      </S.StdWrapper>

      <S.Submit type="submit">Submit</S.Submit>
    </S.Wrapper>
  )
}

export default ExerciseForm
