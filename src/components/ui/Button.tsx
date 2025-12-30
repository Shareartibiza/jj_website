import { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

export default function Button({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center rounded-sm font-medium transition-all duration-300 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
        primary: 'bg-primary text-secondary hover:bg-white hover:text-black focus:ring-primary',
        outline: 'border border-primary text-primary hover:bg-primary hover:text-secondary focus:ring-primary',
        ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
    }

    const sizes = {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-8 text-sm',
        lg: 'h-14 px-10 text-base',
    }

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    )
}
