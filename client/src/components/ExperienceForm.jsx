import { Briefcase, Sparkle, Plus,Trash2, Loader2 } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';
import api from '../configs/api.js';
import toast from 'react-hot-toast';

const ExperienceForm = ({data, onChange}) => {

    const {token} = useSelector(state => state.auth);
    const [generatingIndex, setGeneratingIndex] = React.useState(-1);

    const addExperience = () => {
        const newExperience = {
            // id: Date.now(),
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false
        };
        onChange([...data, newExperience]);
    };

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    }

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    }

    const normalizeMonthInput = (value) => {
        if (!value || typeof value !== 'string') return '';

        const trimmed = value.trim();
        const isoMonth = /^\d{4,}-\d{2}$/;
        if (isoMonth.test(trimmed)) {
            const month = Number(trimmed.split('-')[1]);
            return month >= 1 && month <= 12 ? trimmed : '';
        }

        const cleaned = trimmed
            .replace(/â|’|'|,/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        const parts = cleaned.split(' ');
        if (parts.length >= 2) {
            const monthToken = parts[0].toLowerCase().slice(0, 3);
            const yearToken = parts.find((p) => /^\d{4}$/.test(p));
            const monthMap = {
                jan: '01',
                feb: '02',
                mar: '03',
                apr: '04',
                may: '05',
                jun: '06',
                jul: '07',
                aug: '08',
                sep: '09',
                oct: '10',
                nov: '11',
                dec: '12'
            };

            if (yearToken && monthMap[monthToken]) {
                return `${yearToken}-${monthMap[monthToken]}`;
            }
        }

        return '';
    };

    const generateDescription = async (index) => {
        setGeneratingIndex(index);
        const experience = data[index];
        const prompt = `enhance the description for this experience: ${experience.position} at ${experience.company}`;
        try {
            const response = await api.post('/api/ai/enhance-job-desc', {userContent: prompt}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            updateExperience(index, 'description', response?.data?.enhancedJobDesc || '');
        } catch (error) {
            console.error('Error generating description:', error);
            toast.error(error.response?.data?.message || error.message || "Failed to generate description");
        } finally {
            setGeneratingIndex(-1);
        }
    };

    return (
    <div className='space-y-6'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-700'>
                    Professional Experience
                </h3>
                <p className='text-sm text-gray-500'>
                    Add details for your professional experience here.
                </p>
            </div>
            <button className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors  shrink-0' onClick={addExperience}>
                <Plus className='size-4'/> Add Experience
            </button>
        </div>
        {data.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
                <Briefcase className='h-12 w-12 mx-auto mb-3 text-gray-300' />
                <p className='text-sm'>Click "Add Experience" to get started.</p>
            </div>
        ) : (
            <div className='space-y-4'>
                {data.map((experience, index) => (
                    <div key={index} className='border border-gray-300 rounded-lg p-4 space-y-3'>
                        <div className='flex justify-between items-start'>
                            <h4>Experience #{index + 1}</h4>
                            <button className='text-red-500 hover:text-red-700 transition-colors' 
                            onClick={() => removeExperience(index)}>
                                <Trash2 className='size-4' />
                            </button>
                        </div>
                        <div className='grid md:grid-cols-2 gap-3'>
                            <input type="text"
                            placeholder="Company Name" 
                            value={experience.company || ""} 
                            onChange={(e) => updateExperience(index, 'company', e.target.value)} 
                            className='px-3 py-2 text-sm rounded-lg'/>

                            <input type="text" placeholder="Job Title" value={experience.position || ""} 
                            onChange={(e) => updateExperience(index, 'position', e.target.value)} 
                            className='px-3 py-2 text-sm rounded-lg'/>

                            <input type="month" placeholder="Start Date" value={normalizeMonthInput(experience.start_date)} 
                            onChange={(e) => updateExperience(index, 'start_date', e.target.value)} 
                            className='px-3 py-2 text-sm rounded-lg'/>

                            <input type="month" 
                            placeholder="End Date" 
                            value={normalizeMonthInput(experience.end_date)} 
                            onChange={(e) => updateExperience(index, 'end_date', e.target.value)} 
                            className='px-3 py-2 text-sm rounded-lg'
                            disabled={experience.is_current}/>
                        </div>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" 
                            name="is_current" 
                            id={`is_current_${index}`} 
                            checked={experience.is_current || false} 
                            onChange={(e) => {
                                updateExperience(index, 'is_current', e.target.checked);
                                if (e.target.checked) updateExperience(index, 'end_date', '');
                            }} 
                            className='w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-500'/>    
                            <span className="text-sm text-gray-700">
                                I currently work here
                            </span>
                        </label>
                        <div className="space-y-2">
                            <div className='flex item-center justify-between'>
                                <label className='text-sm text-gray-700 font-medium'>
                                   Job Description 
                                </label>
                                <button 
                                onClick={() => generateDescription(index)}
                                disabled={generatingIndex === index || !experience.position || !experience.company}
                                className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-10 transition-colors disabled:opacity-50'>
                                        {generatingIndex === index ? (<Loader2 className='w-3 h-3 animate-spin'/> ) : (
                                    <Sparkle className='w-3 h-3'/> )}
                                    Enhance with AI
                                </button>
                            </div>
                            <textarea
                                rows={4}
                                className='w-full text-sm px-3 py-2 rounded-lg resize-none'
                                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                placeholder="Describe your responsibilities, achievements, and skills you utilized in this role."
                                value={experience.description || ""}
                            />
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ExperienceForm