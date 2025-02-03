import Alert from '../assets/icons/alert.svg'
import { Button } from './Button.js'
import Close from '../assets/icons/close.svg'

export type Props = {
  onCancel: () => void
  onReset: () => void
}

export const Modal = ({ onCancel, onReset }: Props) => {
  return (
    <div className="modal">
      <div className="flex h-[584px] max-h-full w-[643px] max-w-full flex-col items-center justify-center rounded-[10px] bg-white p-8 text-center">
        <Button className="self-end" variant="text" onClick={onCancel}>
          <img src={Close} alt="Close icon"></img>
        </Button>
        <img src={Alert} width={290} height={290}></img>
        <div className="text-black100 mb-2 w-[387px] text-[32px] font-bold">
          WARNING
        </div>
        <div className="text-black75 mb-12 w-[387px] text-lg">
          You're about to reset whole process. Are you sure you want to do it?
        </div>
        <div className="flex items-center gap-6">
          <Button className="leading-[27px]" variant="text" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onReset}>Reset</Button>
        </div>
      </div>
    </div>
  )
}
