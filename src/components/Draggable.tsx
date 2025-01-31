import { useDraggable } from '@dnd-kit/core'
import { useState, useEffect, useRef, ChangeEvent } from 'react'
import Move from '../assets/icons/move.svg'
import Delete from '../assets/icons/delete.svg'
import { Dimensions } from '../App.js'

type Size = { w: number; h: number }

interface DraggableProps {
  type?: 'text' | 'image'
  id: string
  onDragRemove: () => void
  onTextChange?: (e: string) => void
  children?: React.ReactNode
  text?: string
  droppableDimensions: Dimensions | null
  initSize?: Size | null
}

const textColors = ['#353535', '#FFFFFF', '#cb0000', '#0055ff', '#00da16']

export function Draggable({
  type = 'text',
  id,
  onDragRemove,
  onTextChange,
  children,
  text,
  droppableDimensions,
  initSize = type === 'text' ? { w: 350, h: 120 } : { w: 128, h: 128 },
}: DraggableProps) {
  const defaultPosition =
    droppableDimensions && initSize
      ? {
          x: droppableDimensions.width / 2 - initSize.w / 2,
          y: droppableDimensions.height / 2 - initSize.h / 2,
        }
      : { x: 0, y: 0 }
  const minSize = type === 'text' ? { w: 250, h: 72 } : { w: 128, h: 128 }
  const [position, setPosition] = useState(defaultPosition)
  const [initPosition, setInitPosition] = useState(defaultPosition)
  const [size, setSize] = useState(initSize || { w: 128, h: 128 })
  const handleRef = useRef<HTMLDivElement | null>(null)
  const [textColor, setTextColor] = useState(textColors[0])
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { type },
  })

  useEffect(() => {
    if (transform) {
      const dimOffset =
        droppableDimensions && size
          ? {
              x: droppableDimensions.width - size.w,
              y: droppableDimensions.height - size.h,
            }
          : { x: 0, y: 0 }
      setPosition({
        x: Math.min(Math.max(initPosition.x + transform.x, 0), dimOffset.x),
        y: Math.min(Math.max(initPosition.y + transform.y, 0), dimOffset.y),
      })
    }
  }, [transform])

  const style: React.CSSProperties = {
    left: position.x,
    top: position.y,
    width: size.w,
    height: size.h,
  }

  const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onTextChange) {
      onTextChange(e.target.value)
    }
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = size.w
    const startHeight = size.h

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(minSize.w, startWidth + (e.clientX - startX))
      const newHeight = Math.max(minSize.h, startHeight + (e.clientY - startY))

      setSize({ w: newWidth, h: newHeight })
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      ref={setNodeRef}
      className={`border-primary absolute z-40 border-2 ${type === 'text' ? 'px-6 py-3' : ''}`}
      style={style}
      onMouseUp={() => setInitPosition({ x: position.x, y: position.y })}
    >
      <div
        ref={handleRef}
        className="absolute -top-5 -left-5 cursor-grab rounded-full bg-white"
        {...listeners}
        {...attributes}
      >
        <img src={Move} alt="Move cursor icon"></img>
      </div>
      <div
        className="absolute -top-3 -right-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white"
        onClick={onDragRemove}
      >
        <img src={Delete} alt="Trash icon" width={18}></img>
      </div>
      <div
        className="bg-primary absolute -right-3 -bottom-3 flex h-6 w-6 cursor-nwse-resize items-center justify-center rounded-full border-4 border-white"
        onMouseDown={handleResizeStart}
      ></div>
      {type === 'text' ? (
        <>
          <textarea
            placeholder="Type your text here"
            className="placeholder:text-black100 h-full w-full resize-none overflow-hidden text-center text-[32px] font-bold outline-none placeholder:opacity-25"
            style={{ color: textColor }}
            value={text}
            onChange={(e) => changeText(e)}
          ></textarea>
          <div className="absolute -bottom-6 left-0 flex gap-3">
            {textColors.map((t) => (
              <div
                role={'button'}
                className="h-4 w-4 cursor-pointer rounded-full"
                style={{ backgroundColor: t }}
                onClick={() => setTextColor(t)}
              ></div>
            ))}
          </div>
        </>
      ) : (
        <div className="h-full w-full">{children}</div>
      )}
    </div>
  )
}
