import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { EXERCISES } from 'apollo/queries'

import { useAuth } from 'hooks'

import * as S from './styled'

const Exercises = () => {
  const [meData, meLoading] = useAuth()

  const { loading, data } = useQuery(EXERCISES)

  return (
    <>
      <h1>Exercises {meData?.me?.email} </h1>
      <div>
        {!loading &&
          data?.exercises.map((exercise, idx) => (
            <Link to={`/${exercise.slug}`} key={`exercise-${idx}`}>
              <div>{exercise.title}</div>
            </Link>
          ))}
      </div>
    </>
  )
}

export default Exercises
