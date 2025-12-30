import { LucideIcon } from 'lucide-react'

interface SpecItem {
    label: string
    value: string | number
    icon?: LucideIcon
}

interface SpecsGridProps {
    specs: SpecItem[]
    title?: string
}

export default function SpecsGrid({ specs, title }: SpecsGridProps) {
    return (
        <div className="bg-white/5 border border-white/10 p-8 rounded-lg backdrop-blur-sm">
            {title && <h3 className="font-serif text-xl border-b border-white/10 pb-4 mb-6">{title}</h3>}
            <div className="space-y-6">
                {specs.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                            {spec.icon && <spec.icon className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />}
                            <span className="text-gray-400 text-sm uppercase tracking-widest">{spec.label}</span>
                        </div>
                        <span className="text-white font-medium text-lg">{spec.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
