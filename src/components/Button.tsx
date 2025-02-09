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
  disabled,
  ...props
}) => {
  let variantClasses = ''
  switch (variant) {
    case 'primary':
      variantClasses =
        'text-[15px] bg-primary text-white px-8 h-10 rounded-[5px] tracking-[.5px] hover:bg-darkprimary focus:outline-2 outline-primary50 disabled:bg-black25 disabled:cursor-not-allowed'
      break
    case 'text':
      variantClasses = 'text-lg text-black100'
      break
    case 'tile':
      variantClasses =
        'flex-1 flex-col gap-[25px] h-64 min-w-[270px] xl:max-w-[365px] justify-end bg-white97 rounded-[10px] py-3 hover:bg-black25 disabled:bg-white98 disabled:cursor-not-allowed disabled:opacity-25 focus:outline-2 outline-primary50'
      break
  }
  const classes = `font-semibold flex gap-2 items-center ${variantClasses} ${className ? className : ''}`
  return (
    <button disabled={disabled} className={classes} {...props}>
      {icon && variant === 'tile' && (
        <img src={icon} alt="Button icon" width={128}></img>
      )}
      {children}
      {icon && variant !== 'tile' && <img src={icon} alt="Button icon"></img>}
    </button>
  )
}
