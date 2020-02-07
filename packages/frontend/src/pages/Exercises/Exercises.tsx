import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { EXERCISES } from 'apollo/queries'

import * as S from './styled'

type Props = {
  me: any
}

const Exercises = ({ me }: Props) => {
  const { loading, data } = useQuery(EXERCISES)

  return (
    <>
      <h1>Exercises</h1>
      <div>
        {!loading && data?.exercises.map(
          (exercise, idx) => (
            <Link to={`/${exercise.slug}`} key={`exercise-${idx}`}>
              <div>
                { exercise.title }
              </div>
            </Link>
          )
        )}
      </div>
    </>
  )
}

export default Exercises