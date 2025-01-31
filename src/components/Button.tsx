import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'text' | 'tile'
  icon?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  icon,
  ...props
}) => {
  let variantClasses = ''
  switch (variant) {
    case 'primary':
      variantClasses =
        'text-[15px] bg-primary text-white px-8 h-10 rounded-[5px] tracking-[.5px] hover:bg-darkprimary'
      break
    case 'text':
      variantClasses = 'text-lg text-black100'
      break
    case 'tile':
      variantClasses =
        'flex-col gap-[25px] h-64 w-[365px] justify-end bg-white97 rounded-[10px] py-3 hover:bg-black25 disabled:bg-white98 disabled:cursor-not-allowed disabled:opacity-25'
      break
  }
  const classes = `font-semibold flex gap-2 items-center ${variantClasses} ${className ? className : ''}`
  return (
    <button className={classes} {...props}>
      {icon && variant === 'tile' && (
        <img src={icon} alt="Button icon" width={128}></img>
      )}
      {children}
      {icon && variant !== 'tile' && <img src={icon} alt="Button icon"></img>}
    </button>
  )
}
