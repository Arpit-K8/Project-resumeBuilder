import React from 'react'
import { Check, Palette } from 'lucide-react';

const ColorPicker = ({selectedColor, onChange}) => {
    const colors = [
        {name:"Blue", value:"#3b82f6"},
        {name:"Red", value:"#ef4444"},
        {name:"Green", value:"#10b981"},
        {name:"Yellow", value:"#f59e0b"},
        {name:"Purple", value:"#8b5cf6"},
        {name:"Pink", value:"#ec4899"},
        {name:"Indigo", value:"#6366f1"},
        {name:"Teal", value:"#14b8a6"},
        {name:"Orange", value:"#f97316"},
        {name:"Gray", value:"#6b7280"},
        {name:"Black", value:"#111111"},
        {name:'violet', value:"#7c3aed"}
    ]

    const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className='relative'>  
        <button 
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Palette size={16}/><span className='max-sm:hidden'>Accent</span>
        </button>
        {isOpen && (
            <div className='grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm'>
                {colors.map((color) => (
                    <div
                        key={color.value}
                        className="cursor-pointer group flex flex-col"
                        onClick={() => {onChange(color.value); setIsOpen(false)}}>
                        <div className="relative w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors"
                        style={{ backgroundColor: color.value }}>
                        {selectedColor === color.value && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Check className="w-5 h-5 text-white" />
                            </div>
                        )}
                        </div>
                        <p className="text-xs text-center mt-1 text-gray-600">{color.name}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ColorPicker