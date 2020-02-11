import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

import * as S from './styled'

type Props = {
  message: string
  isOpen: boolean
  onClose: () => void
}

const SnackBar = ({ message, isOpen, onClose }: Props) => (
  <Snackbar
    style={{ opacity: 0.5 }}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    autoHideDuration={2000}
    key={`${'bottom'},${'left'}`}
    open={isOpen}
    onClose={onClose}
    message={message}
  />
)

export default SnackBar
