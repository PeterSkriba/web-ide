import React, { useState, useEffect } from 'react'
import { CodeRounded } from '@material-ui/icons'
import { Match } from 'react-router-dom'
import { Monaco, SnackBar } from 'components'

import LooksOneRoundedIcon from '@material-ui/icons/LooksOneRounded'
import LooksTwoRoundedIcon from '@material-ui/icons/LooksTwoRounded'
import Looks3RoundedIcon from '@material-ui/icons/Looks3Rounded'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded'

import { useAuth } from 'hooks'

import { useDispatch } from 'react-redux'
import { setLoadingAction } from 'actions'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { CODE } from 'apollo/queries'
import { UPDATE_CODE, RUN_CODE } from 'apollo/mutations'

import * as S from './styled'

type MousePos = {
  x: number
  y: number
}

type SnackbarState = {
  message: string
  isOpen: boolean
}

type Output = {
  output: string
  log: string
  exitCode: number
}

enum TestStatus {
  NONE,
  OK,
  FAIL
}

type Props = {
  match: Match
}

const KeyCodes = {
  S: 83,
  R: 82
}

const Editor = ({ match }: Props) => {
  const dispatch = useDispatch()

  const [meData, meLoading] = useAuth()

  const [horDragging, setHorDragging] = useState<boolean>(false)
  const [verDragging, setVerDragging] = useState<boolean>(false)
  const [mousePos, setMousePos] = useState<MousePos>({ x: 70, y: 50 })

  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: 'loading...',
    isOpen: false
  })

  const [logIsOpen, setLogIsOpen] = useState<boolean>(false)
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false)
  const [testActive, setTestActive] = useState<number>(0)

  const { loading, data, refetch } = useQuery(CODE, {
    skip: meLoading,
    variables: {
      user_id: meData?.me?.id,
      exercise_slug: match.params.exercise
    }
  })

  const [update] = useMutation(UPDATE_CODE)
  const [run] = useMutation(RUN_CODE)

  const [code, setCode] = useState<string>('loading...')
  const [stdin, setStdin] = useState<string>('loading...')
  const [output, setOutput] = useState<Output>({
    output: '',
    log: '',
    exitCode: 0
  })

  useEffect(() => {
    const codeBody = data?.codeOwn?.body
    const stdinBody = data?.codeOwn?.exercise?.stdin[testActive]
    const exerciseBody = data?.codeOwn?.exercise?.body

    if (codeBody) setCode(codeBody)
    else if (exerciseBody)
      setCode(exerciseBody.replace(/\\n/g, '\n').replace(/\\t/g, '\t'))
    if (stdinBody) setStdin(stdinBody)

    setLogIsOpen(!!output.log)

    dispatch(setLoadingAction({ visible: !data?.codeOwn })) // TODO: ?
  }, [data, output.log, testActive])

  const save = () => {
    if (!loading)
      update({
        variables: {
          where: { id: data?.codeOwn?.id },
          data: { body: code }
        }
      })
    refetch()
    setSnackbarState({ message: 'Successfully saved', isOpen: true })
  }

  const saveAndRun = () => {
    if (!loading)
      update({
        variables: {
          where: { id: data?.codeOwn?.id },
          data: { body: code }
        }
      }).then(() =>
        run({
          variables: {
            where: {
              code_id: data?.codeOwn?.id,
              test_no: testActive,
              test_body: stdin
            }
          }
        }).then(res => {
          setOutput({
            output: res.data.runCode.output,
            log: res.data.runCode.log,
            exitCode: res.data.runCode.exitCode
          })
          refetch().then(res => {
            window.scrollTo(0, document.body.scrollHeight)
            setSnackbarState({
              message: `Test ${testActive + 1}: ${
                res?.data?.codeOwn?.tests[testActive] == TestStatus.OK
                  ? 'OK'
                  : 'FAIL'
              }`,
              isOpen: true
            })
          })
        })
      )
    setSnackbarState({ message: 'Running', isOpen: true })
  }

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === KeyCodes.S) {
      e.preventDefault()
      save()
    }
    if ((e.ctrlKey || e.metaKey) && e.keyCode === KeyCodes.R) {
      e.preventDefault()
      saveAndRun()
    }
  }

  const isNotSaved = (): boolean =>
    code != data?.codeOwn?.body && code != data?.codeOwn?.exercise?.body

  return (
    <S.Main onMouseUp={handleStopDragging} onMouseMove={handleDragging}>
      <S.Sidebar isOpen={sidebarIsOpen}>
        <S.SidebarWrapper>
          <S.ToggleSidebar
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            isOpen={sidebarIsOpen}
          >
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </S.ToggleSidebar>

          <header>
            <AssignmentTurnedInIcon fontSize="small" />
            <h2>{data?.codeOwn?.exercise?.title}</h2>
          </header>

          <S.SidebarBody>
            <pre>{data?.codeOwn?.exercise?.description}</pre>
          </S.SidebarBody>
        </S.SidebarWrapper>
      </S.Sidebar>

      <S.Container
        onKeyDown={handleKeyPress}
        isOpenSidebar={sidebarIsOpen}
        tabIndex="0"
      >
        <S.Wrapper style={{ width: `calc(${mousePos.x}% - 10px)` }}>
          <S.Box type="editor">
            <S.BoxHeader>
              <CodeRounded fontSize="small" />

              <S.CodeTitle isNotSaved={isNotSaved()}>
                {`${data?.codeOwn?.exercise?.slug}.c`}
              </S.CodeTitle>

              <div>
                <S.CircleButton onClick={save} color="orange">
                  <S.Tooltip left="-35px">Click to save</S.Tooltip>
                </S.CircleButton>
                <S.CircleButton onClick={saveAndRun} color="green">
                  <S.Tooltip left="-35px">Click to run</S.Tooltip>
                </S.CircleButton>
              </div>
            </S.BoxHeader>

            <Monaco code={code} setCode={setCode} focus />
          </S.Box>

          <S.Box type="log" isOpen={logIsOpen}>
            <S.BoxHeader>
              Compile log
              <S.CircleButton onClick={() => setLogIsOpen(false)} color="red">
                <S.Tooltip left="-40px">Click to close</S.Tooltip>
              </S.CircleButton>
            </S.BoxHeader>

            <pre>{output.log}</pre>
          </S.Box>
        </S.Wrapper>

        <S.Divider isVertical onMouseDown={() => setHorDragging(true)} />

        <S.Wrapper style={{ width: `calc(${100 - mousePos.x}% - 10px)` }}>
          <S.Box type="inout" style={{ height: `calc(${mousePos.y}% - 10px)` }}>
            <S.BoxHeader>
              Stdin
              <div>
                <S.TestButton
                  onClick={() => setTestActive(0)}
                  isActive={testActive === 0}
                  isOk={data?.codeOwn?.tests[0] == TestStatus.OK}
                  isFail={data?.codeOwn?.tests[0] == TestStatus.FAIL}
                >
                  <LooksOneRoundedIcon fontSize="small" />
                </S.TestButton>

                <S.TestButton
                  onClick={() => setTestActive(1)}
                  isActive={testActive === 1}
                  isOk={data?.codeOwn?.tests[1] == TestStatus.OK}
                  isFail={data?.codeOwn?.tests[1] == TestStatus.FAIL}
                >
                  <LooksTwoRoundedIcon fontSize="small" />
                </S.TestButton>

                <S.TestButton
                  onClick={() => setTestActive(2)}
                  isActive={testActive === 2}
                  isOk={data?.codeOwn?.tests[2] == TestStatus.OK}
                  isFail={data?.codeOwn?.tests[2] == TestStatus.FAIL}
                >
                  <Looks3RoundedIcon fontSize="small" />
                </S.TestButton>
              </div>
            </S.BoxHeader>

            <Monaco
              code={stdin.replace(/\\n/g, '\n').replace(/\\t/g, '\t')}
              setCode={setStdin}
            />
          </S.Box>

          <S.Divider isHorizontal onMouseDown={() => setVerDragging(true)} />

          <S.Box
            id="scrollToOutput"
            type="inout"
            style={{ height: `calc(${100 - mousePos.y}% - 10px)` }}
          >
            <S.BoxHeader>Stdout</S.BoxHeader>

            <Monaco
              code={
                output.exitCode && !output.output
                  ? '> exit code: ' + output.exitCode
                  : output.output
              }
              readOnly
            />
          </S.Box>
        </S.Wrapper>
      </S.Container>

      <SnackBar
        message={snackbarState.message}
        isOpen={snackbarState.isOpen}
        onClose={() => setSnackbarState({ ...snackbarState, isOpen: false })}
      />
    </S.Main>
  )
}

export default Editor
