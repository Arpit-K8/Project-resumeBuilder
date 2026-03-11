import { Check, Layout } from 'lucide-react';
import React from 'react'

const TemplateSelector = ({selectedTemplate, onChange}) => {
        const [isOpen, setIsOpen] = React.useState(false);
        const templates = [
            {id:"classic", name:"Classic",preview:"A clean, traditional resume format with clear sections and professional typography. Ideal for conservative industries and job seekers with extensive experience."},
            {id:"modern", name:"Modern", preview:"Sleek design with strategic use of color and modern font choices. Perfect for creative professionals and those looking to make a bold statement."},
            {id:"minimal", name:"Minimal", preview:"Minimal desgin with a single image and clean typography. Great for job seekers in creative fields or those with limited experience who want to highlight their skills and potential."},
            {id:"minimal-image", name:"Minimal with Image", preview:"Ultra-clean desgin that puts your content front and center. Ideal for job seekers in creative fields or those with limited experience who want to highlight their skills and potential."},
            {id:"creative", name:"Creative", preview:"A visually striking design with bold colors, unique layouts, and creative use of typography. Best for professionals in creative industries looking to showcase their personality and stand out."}
        ]
    return (
    <div className='relative'>
        <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-all'>
            <Layout size={14}/><span className='max-sm:hidden'>Change Template</span>
        </button>
        {isOpen && (
            <div className='absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md shadow-md border border-gray-200 max-h-96 overflow-y-auto'>
                {templates.map((template) => (
                    <div key={template.id} onClick={() => {onChange(template.id); setIsOpen(false)}} className={`relative border rounded-md p-3 cursor-pointer transition-all ${selectedTemplate === template.id ? "bg-indigo-100 border border-indigo-500" : "hover:bg-gray-100 border-gray-300 hover:border-gray-400"}`}>
                        {selectedTemplate === template.id && (
                            <div className='absolute top-2 right-2'>
                                <div className='size-5 bg-blue-400 rounded-full flex items-center justify-center'>
                                    <Check className='w-3 h-3 text-white'/>
                                </div>
                            </div>
                        )}
                        <div className='space-y-1'>
                            <h4 className='font-medium text-gray-800'>{template.name}</h4>
                            <div className='mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic'>{template.preview}</div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default TemplateSelector