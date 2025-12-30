import { ReactNode } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface SectionProps {
    children: ReactNode
    className?: string
    id?: string
    fullWidth?: boolean
}

export default function Section({
    children,
    className,
    id,
    fullWidth = false,
}: SectionProps) {
    return (
        <section
            id={id}
            className={cn(
                'relative py-20 md:py-32 overflow-hidden',
                className
            )}
        >
            {fullWidth ? (
                children
            ) : (
                <div className="container mx-auto px-6 relative z-10">
                    {children}
                </div>
            )}
        </section>
    )
}
