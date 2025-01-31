import { ChangeEvent, ReactNode } from 'react'

type Props = {
  children: ReactNode
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FileInput = ({ onChange, children }: Props) => {
  return (
    <div className="bg-white97 hover:bg-black25 disabled:bg-white98 relative flex h-64 w-[365px] cursor-pointer flex-col items-center justify-end gap-[25px] rounded-[10px] py-3 text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-25">
      <input
        type="file"
        accept="image/*"
        className="absolute h-full w-full cursor-pointer opacity-0"
        onChange={onChange}
      ></input>
      <div className="pointer-events-none absolute flex flex-col items-center gap-[25px]">
        {children}
      </div>
    </div>
  )
}
