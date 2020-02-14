import React from 'react'

import * as S from './styled'

type Props = {
  type: string
  value: string
}

const Button = ({ type, value }: Props) => (
  <S.Wrapper>
    <S.Button type={type}>{value}</S.Button>
  </S.Wrapper>
)

export default Button
