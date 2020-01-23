import React, { useState } from 'react'
import { CodeRounded } from '@material-ui/icons';
import LooksOneRoundedIcon from '@material-ui/icons/LooksOneRounded';
import LooksTwoRoundedIcon from '@material-ui/icons/LooksTwoRounded';
import Looks3RoundedIcon from '@material-ui/icons/Looks3Rounded';

import { Monaco, SnackBar } from 'components';

import { useQuery } from '@apollo/react-hooks'
import { CODE, EXERCISE } from 'apollo/queries'

import * as S from './styled'

type MousePos = {
  x: number
  y: number
}

type SnackbarState = {
  message: string,
  isOpen: boolean
}

const Editor = () => {
  const [horDragging, setHorDragging] = useState<boolean>(false)
  const [verDragging, setVerDragging] = useState<boolean>(false)
  const [mousePos, setMousePos] = useState<MousePos>({ x: 70, y: 50 })

  const [logIsOpen, setLogIsOpen] = useState<boolean>(true)

  const [testActive, setTestActive] = useState<number>(0)

  const handleDragging = (e: React.MouseEvent) => {
    const x = (e.nativeEvent.pageX / window.innerWidth) * 100
    const y = (e.nativeEvent.pageY / window.innerHeight) * 100

    if (horDragging && x >= 25 && x <= 80) setMousePos({ ...mousePos, x })
    if (verDragging && y >= 20 && y <= 80) setMousePos({ ...mousePos, y })
  }

  const handleStopDragging = () => {
    setHorDragging(false)
    setVerDragging(false)
  }

  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: '',
    isOpen: false
  })

  const save = () => {
    setSnackbarState({ message: 'Successfully saved', isOpen: true })
  }

  const run = () => {
    save()
    setSnackbarState({ message: 'Running', isOpen: true })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
      e.preventDefault()
      save()
    }
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 82) {
      e.preventDefault()
      run()
    }
  }

  const { loading: exercise_loading, data: exercise_data } = useQuery(EXERCISE, {
    variables: { id: 0 }
  })

  const { loading: code_loading, data: code_data } = useQuery(CODE, {
    variables: {
      user_id: 0,
      exercise_id: exercise_data?.exercise?.exercise_id | -1
    }
  })

  const getClangTitle = (str: String) => (
    str.replace(/ /g, '-').toLowerCase().replace(/[^a-z0-9]/gi, '').concat('.c')
  )

  return (
    <S.Main
      onMouseUp={handleStopDragging}
      onMouseMove={handleDragging}
    >
      <S.Header></S.Header>

      <S.Container onKeyDown={handleKeyPress} tabIndex="0">

        <S.Wrapper style={{ width: `calc(${mousePos.x}% - 10px)` }}>
          <S.Box type="editor">
            <S.BoxHeader>
              <CodeRounded fontSize="small" />
              { (!exercise_loading) ? getClangTitle(exercise_data?.exercise?.title) : "" }
              <div>
                <S.CircleButton onClick={save} color="orange">
                  <S.Tooltip left="-35px">Click to save</S.Tooltip>
                </S.CircleButton>
                <S.CircleButton onClick={run} color="green">
                  <S.Tooltip left="-35px">Click to run</S.Tooltip>
                </S.CircleButton>
              </div>
            </S.BoxHeader>
            <Monaco code={code_data?.code?.body} focus />
          </S.Box>

          <S.Box type="log" isOpen={logIsOpen}>
            <div style={{ padding: "25px" }}>
              <S.BoxHeader>
                Compile log
                <S.CircleButton onClick={() => setLogIsOpen(false)} color="red">
                  <S.Tooltip left="-40px">Click to close</S.Tooltip>
                </S.CircleButton>
              </S.BoxHeader>
              <p>
                log
              </p>
            </div>
          </S.Box>
        </S.Wrapper>

        <S.Divider isVertical onMouseDown={() => setHorDragging(true)} />

        <S.Wrapper style={{ width: `calc(${100 - mousePos.x}% - 10px)` }}>
          <S.Box type="inout" style={{ height: `calc(${mousePos.y}% - 10px)` }} >
            <S.BoxHeader>
              Stdin
              <div>
                <S.TestButton
                  onClick={() => setTestActive(0)}
                  isActive={testActive === 0}
                  isOk={code_data?.code?.tests[0] == true}
                  isFail={code_data?.code?.tests[0] == false}
                >
                  <LooksOneRoundedIcon fontSize="small" />
                </S.TestButton>
                <S.TestButton
                  onClick={() => setTestActive(1)}
                  isActive={testActive === 1}
                  isOk={code_data?.code?.tests[1] == true}
                  isFail={code_data?.code?.tests[1] == false}
                >
                  <LooksTwoRoundedIcon fontSize="small" />
                </S.TestButton>
                <S.TestButton
                  onClick={() => setTestActive(2)}
                  isActive={testActive === 2}
                  isOk={code_data?.code?.tests[2] == true}
                  isFail={code_data?.code?.tests[2] == false}
                >
                  <Looks3RoundedIcon fontSize="small" />
                </S.TestButton>
              </div>
            </S.BoxHeader>
            <Monaco code={exercise_data?.exercise?.stdin[testActive]} />
          </S.Box>

          <S.Divider isHorizontal onMouseDown={() => setVerDragging(true)} />

          <S.Box type="inout" style={{ height: `calc(${100 - mousePos.y}% - 10px)` }} >
            <S.BoxHeader>Stdout</S.BoxHeader>
            <Monaco code="" readOnly />
          </S.Box>
        </S.Wrapper>

      </S.Container>

      <S.Footer><p>&copy; 2020 Peter Škríba</p></S.Footer>

      <SnackBar
        message={snackbarState.message}
        isOpen={snackbarState.isOpen}
        onClose={() => setSnackbarState({ ...snackbarState, isOpen: false })}
      />
    </S.Main>
  )
}

export default Editor