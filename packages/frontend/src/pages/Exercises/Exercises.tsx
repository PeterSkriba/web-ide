import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { EXERCISES } from 'apollo/queries'

import * as S from './styled'

type Props = {
  me: any
}

const Exercises = ({ me }: Props) => {
  const { loading, data } = useQuery(EXERCISES)
  const history = useHistory()

  const handleClick = (slug: string) => {
    history.push(`/editor/${slug}`)
  }

  return (
    <>
      <h1>Exercises</h1>
      <ul>
        {!loading && data?.exercises.map(
          (exercise, idx) => (
            <Link to={`/editor/${exercise.slug}`} key={`exercise-${idx}`}>{ exercise.title }</Link>
          )
        )}
      </ul>
    </>
  )
}

export default Exercises