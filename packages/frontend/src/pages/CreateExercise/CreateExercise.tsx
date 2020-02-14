import React from 'react'

import { useAuthorCheck } from 'hooks'

import { ExerciseForm } from 'components'

import * as S from './styled'

const CreateExercise = () => {
  const [meData, meLoading] = useAuthorCheck()

  return (
    <S.Wrapper>
      <h1>Create Exercise</h1>
      <ExerciseForm />
    </S.Wrapper>
  )
}

export default CreateExercise
