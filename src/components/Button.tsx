import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'text'
  icon?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  icon,
  ...props
}) => {
  const variantClasses = variant === 'text' ? 'text-red' : 'bg-primary'
  const classes = `text-[15px] font-semibold flex gap-2 items-center ${variantClasses} ${className ? className : ''}`
  return (
    <button className={classes} {...props}>
      {children}
      {icon && <img src={icon} alt="Button icon"></img>}
    </button>
  )
}
