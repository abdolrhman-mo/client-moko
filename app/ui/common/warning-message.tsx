'use client'

import FloatingContainer from './floating-container'
import Heading from './heading'
import Button from './button'
import { NextPage } from 'next'
import { useAppDispatch } from '@/redux/store'
import { hidePopup } from '@/redux/features/popup/popupSlice'
import clsx from 'clsx'
import { useAppSelector } from '@/redux/hooks'

interface Props { 
  message: string
  onSuccess?: any
  name: string
}

const WarningMessage: NextPage<Props> = ({ message, onSuccess, name }) => {
  const dispatch = useAppDispatch()
  const activePopup = useAppSelector(state => state.popup.activePopup)

  const handleCancel = () => {
    dispatch(hidePopup())
  }

  return (
    <FloatingContainer className={clsx(
      'text-center',
      {
        'hidden' : activePopup !== name
      }
    )}>
      <Heading level={5}>Confirm Action</Heading>

      {message}

      <div className="flex justify-between mt-8 space-x-4">
        <Button onClick={handleCancel} theme='muted' className='w-2/5'>cancel</Button>
        {onSuccess &&
          <Button 
            onClick={() => {
              onSuccess()
              dispatch(hidePopup())
            }} 
            theme='warning' 
            className='w-2/5'
          >
            Yes I'm sure
          </Button>
        }
      </div>
    </FloatingContainer>
  )
}

export default WarningMessage