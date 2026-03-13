import { Sparkle } from 'lucide-react'
import React from 'react'

const ProfessionalSummaryForm = ({data,onChange, setResumeData}) => {
  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-700'>
                    Professional Summary
                </h3>
                <p className='text-sm text-gray-500'>
                    Add summary for your resume here.
                </p>
            </div>
            <button className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 shrink-0'>
                <Sparkle className='size-4'/> AI Enhance
            </button>
        </div>
        <div className='mt-6'>
            <textarea 
                name="professionalSummary" 
                id="professionalSummary" 
                className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none'
                placeholder="Write a compelling professional summary that highlights your key strengths, skills, and career objectives..."
                value={data || ""}
                onChange={(e) => onChange(e.target.value)} rows={7}
            />
            <p className='text-xs text-gray-500 mt-2 max-w-4/5 mx-auto text-center'>
                Tip: Keep it concise and highlight your most relevant achievements and skills.
            </p>
        </div>
    </div>
  )
}

export default ProfessionalSummaryForm