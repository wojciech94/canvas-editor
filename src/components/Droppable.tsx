import { useDroppable } from '@dnd-kit/core'
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react'
import { Dimensions } from '../App.js'

type Props = {
  children: ReactNode
  setDroppableDimensions: Dispatch<SetStateAction<Dimensions | null>>
}

export const Droppable: React.FC<Props> = ({
  children,
  setDroppableDimensions,
}) => {
  const { setNodeRef } = useDroppable({
    id: 'droppable',
    data: {
      accept: ['text', 'image'],
    },
  })

  const droppableRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (droppableRef) {
      setNodeRef(droppableRef.current)
    }
  }, [droppableRef])

  useEffect(() => {
    calculateDimensions()
    window.addEventListener('resize', calculateDimensions)

    return () => {
      window.removeEventListener('resize', calculateDimensions)
    }
  }, [])

  const calculateDimensions = () => {
    if (droppableRef.current) {
      const { width, height } = droppableRef.current.getBoundingClientRect()
      setDroppableDimensions({ width, height })
    }
  }

  return (
    <div
      ref={droppableRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  )
}
