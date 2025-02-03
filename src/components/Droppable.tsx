import { useDroppable } from '@dnd-kit/core'
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react'
import { Dimensions } from '../App.js'

type Props = {
  children: ReactNode
  setDroppableDimensions: Dispatch<SetStateAction<Dimensions | null>>
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const Droppable: React.FC<Props> = ({
  children,
  setDroppableDimensions,
  setIsEditMode,
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
      let { width, height } = droppableRef.current.getBoundingClientRect()
      height = width * 1.2
      setDroppableDimensions({ width, height })
    }
  }

  const onDroppableClick = () => {
    setIsEditMode(false)
  }

  return (
    <div
      ref={droppableRef}
      className="relative h-full w-full overflow-hidden"
      onMouseDown={onDroppableClick}
    >
      {children}
    </div>
  )
}
