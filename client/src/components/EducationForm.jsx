import React from 'react'
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

const EducationForm = ({data, onChange}) => {
  
      const addEducation = () => {
        const newEducation = {
            // id: Date.now(),
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa:"",
        };
        onChange([...data, newEducation]);
    };

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    }

    return (
    <div className='space-y-6'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
            <div className='pr-2'>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-700'>
                    Education
                </h3>
                <p className='text-sm text-gray-500'>
                    Add details for your educational background here.
                </p>
            </div>
            <button className='flex w-full items-center justify-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors shrink-0 sm:mt-1 sm:w-auto' onClick={addEducation}>
                <Plus className='size-4'/> Add Education
            </button>
        </div>
        {data.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
                <GraduationCap className='h-12 w-12 mx-auto mb-3 text-gray-300' />
                <p className='text-sm'>Click "Add Education" to get started.</p>
            </div>
        ) : (
            <div className='space-y-4'>
                {data.map((education, index) => (
                    <div key={index} className='border border-gray-300 rounded-lg p-4 space-y-3'>
                        <div className='flex justify-between items-start'>
                            <h4>Education #{index + 1}</h4>
                            <button className='text-red-500 hover:text-red-700 transition-colors' 
                            onClick={() => removeEducation(index)}>
                                <Trash2 className='size-4' />
                            </button>
                        </div>
                        <div className='grid md:grid-cols-2 gap-3'>
                            <input type="text"
                            placeholder="Institution Name" 
                            value={education.institution || ""} 
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)} 
                            className='px-3 py-2 text-sm rounded-lg'/>

                            <input type="text" placeholder="Degree (eg. Bachelor of Science in Computer Science)" 
                            value={education.degree || ""} 
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)} 
                            className='px-3 py-2 text-sm rounded-lg'/>

                            <input type="text" placeholder="Field of study" value={education.field || ""} 
                            onChange={(e) => updateEducation(index, 'field', e.target.value)} 
                            className='px-3 py-2 text-sm rounded-lg'/>

                            <input type="month" placeholder="Graduation Date" value={education.graduation_date || ""} 
                            onChange={(e) => updateEducation(index, 'graduation_date', e.target.value)} 
                            className='px-3 py-2 text-sm rounded-lg'/>
                        </div>
                        <input type="text" placeholder="GPA (optional)" value={education.gpa || ""} 
                        onChange={(e) => updateEducation(index, 'gpa', e.target.value)} 
                        className='px-3 py-2 text-sm rounded-lg w-24'/>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default EducationForm