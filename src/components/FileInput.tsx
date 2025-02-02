import { ChangeEvent, ReactNode } from 'react'

type Props = {
  children: ReactNode
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}

export const FileInput = ({ onChange, children, disabled }: Props) => {
  const handleFocus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.currentTarget.focus()
  }

  return (
    <button
      disabled={disabled}
      className="bg-white97 hover:bg-black25 disabled:bg-white98 outline-primary50 relative flex h-64 w-[365px] cursor-pointer flex-col items-center justify-end rounded-[10px] py-3 text-[15px] font-semibold focus:outline-2 disabled:cursor-not-allowed disabled:opacity-25"
      onMouseDown={handleFocus}
    >
      <input
        disabled={disabled}
        type="file"
        accept="image/*"
        className="absolute h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        onChange={onChange}
      ></input>
      <div className="pointer-events-none absolute flex flex-col items-center gap-[25px]">
        {children}
      </div>
    </button>
  )
}
