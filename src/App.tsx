import './App.css'
import Logo from './assets/icons/logo.svg'
import Icon from './assets/icons/text.svg'
import Img from './assets/icons/img.svg'
import Background from './assets/icons/background.svg'
import { Button } from './components/Button.js'
import ResetIcon from './assets/icons/reset.svg'
import { DndContext } from '@dnd-kit/core'

import { Draggable } from './components/Draggable.js'
import { Droppable } from './components/Droppable.js'
import { ChangeEvent, useRef, useState } from 'react'
import { FileInput } from './components/FileInput.js'
import { Modal } from './components/Modal.js'
import html2canvas from 'html2canvas'

export type Dimensions = {
  width: number
  height: number
}

function App() {
  const [draggableText, setDraggableText] = useState<string>('')
  const [isTextActive, setIsTextActive] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(true)
  const [draggableImage, setDraggableImage] = useState<string | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [droppableDimensions, setDroppableDimensions] =
    useState<Dimensions | null>(null)
  const [topElement, setTopElement] = useState<'text' | 'image'>('text')
  const exportRef = useRef(null)

  const handleDragRemove = (type: 'text' | 'image') => {
    if (type === 'text') {
      setIsTextActive(false)
    } else {
      setDraggableImage(null)
    }
  }

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    isBackground: boolean
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (isBackground) {
          setBackgroundImage(reader.result as string)
        } else {
          setDraggableImage(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTextChange = (value: string) => {
    setDraggableText(value)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleReset = () => {
    setDraggableText('')
    setIsTextActive(false)
    setDraggableImage(null)
    setBackgroundImage(null)
    setIsModalOpen(false)
  }

  const handleExportImage = async () => {
    if (exportRef.current) {
      const html2canvasFunc = (html2canvas as any).default || html2canvas
      const canvas = await html2canvasFunc(exportRef.current, {
        width: 1080,
        height: 1350,
        backgroundColor: null,
      })
      const image = canvas.toDataURL('image/png')

      const link = document.createElement('a')
      link.href = image
      link.download = 'exported-canvas.png'
      link.click()
    }
  }

  const bgStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {}

  return (
    <DndContext>
      <div className="flex h-screen w-full flex-wrap justify-center gap-6 p-8">
        <div
          ref={exportRef}
          className={`${!isTextActive && !draggableImage ? 'bg-background' : ''} bg-black50 bg-order order-2 aspect-[4/5] h-full max-w-[762px] flex-1`}
          style={bgStyle}
        >
          <Droppable
            setDroppableDimensions={setDroppableDimensions}
            setIsEditMode={setIsEditMode}
          >
            {draggableImage && (
              <Draggable
                id="dragimage"
                type="image"
                onDragRemove={() => handleDragRemove('image')}
                droppableDimensions={droppableDimensions}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                setTopElement={setTopElement}
                className={`${topElement === 'image' ? 'z-20' : 'z-10'}`}
              >
                <img
                  src={draggableImage}
                  alt="Draggable image"
                  className="h-full w-full object-cover"
                />
              </Draggable>
            )}
            {isTextActive && (
              <Draggable
                id="dragtext"
                onDragRemove={() => handleDragRemove('text')}
                onTextChange={handleTextChange}
                text={draggableText}
                droppableDimensions={droppableDimensions}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                setTopElement={setTopElement}
                className={`${topElement === 'text' ? 'z-20' : 'z-10'}`}
              ></Draggable>
            )}
          </Droppable>
        </div>
        <div className="order-1 flex min-h-[800px] max-w-[762px] min-w-[420px] flex-1 flex-col gap-8">
          <div className="text-primary flex items-center gap-3">
            <img src={Logo} alt="Logo" width={64}></img>
            <div className="flex-grow text-[32px] font-bold">CanvasEditor</div>
            <Button
              variant="text"
              className="text-red border-red border-b-2 hover:border-b-transparent"
              icon={ResetIcon}
              onClick={() => setIsModalOpen(true)}
            >
              Reset
            </Button>
          </div>
          <div className="bg-white97 rounded-[10px] px-6 py-4">
            <span className="font-bold">Add content</span>
          </div>
          <div className="flex flex-wrap items-start gap-8 rounded-[5px]">
            <Button
              variant="tile"
              icon={Icon}
              disabled={isTextActive}
              onClick={() => {
                setIsTextActive(true)
                setTopElement('text')
              }}
            >
              <span className="leading-6">Text</span>
            </Button>
            <FileInput
              disabled={draggableImage !== null}
              onChange={(e) => handleImageChange(e, false)}
            >
              <img src={Img} alt="Image icon" width={128}></img>
              <span className="leading-6">Image</span>
            </FileInput>
            <FileInput
              disabled={backgroundImage !== null}
              onChange={(e) => handleImageChange(e, true)}
            >
              <img src={Background} alt="Background icon" width={128}></img>
              <span className="leading-6">Background</span>
            </FileInput>
          </div>
          <div className="flex flex-grow items-end justify-end">
            <Button onClick={handleExportImage}>Export to PNG</Button>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onCancel={handleCancel} onReset={handleReset} />}
    </DndContext>
  )
}

export default App
