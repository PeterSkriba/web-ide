import React from 'react'
import { ErrorMessage } from 'react-hook-form'

import * as S from './styled'

const getError = (name: string, value?: string) => ({
  required: `${name} is required.`,
  minLength: `${name} must be at least ${value} characters long.`,
  maxLength: `${name} must be at the most ${value} characters long.`,
  pattern: `Invalid ${name} format.`
})

// warning

type Options = {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  validate?: object
}

type Props = {
  register: any
  errors: object
  type: string
  name: string
  title: string
  placeholder?: string
  options?: Options
}

const Input = ({
  register,
  errors,
  type,
  name,
  title,
  placeholder,
  options
}: Props) => (
  <S.Wrapper>
    <S.Input
      type={type}
      name={name}
      isError={!!errors[name]}
      placeholder={placeholder}
      ref={register({
        required: options?.required && getError(title).required,
        minLength: {
          value: options?.minLength,
          message:
            options?.minLength &&
            getError(title, options?.minLength.toString()).minLength
        },
        maxLength: {
          value: options?.maxLength,
          message:
            options?.maxLength &&
            getError(title, options?.maxLength.toString()).maxLength
        },
        pattern: {
          value: options?.pattern,
          message: options?.pattern && getError(title).pattern
        },
        validate: options?.validate
      })}
    />
    <S.ErrorBox isVisible={!!errors[name]}>
      <ErrorMessage errors={errors} name={name} />
    </S.ErrorBox>
  </S.Wrapper>
)

export default Input
