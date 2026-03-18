import React from 'react'
import { Trash2, Plus } from 'lucide-react';

const ProjectForm = ({data = [], onChange}) => {

    const normalizeMonthInput = (value) => {
        if (!value || typeof value !== 'string') return '';

        const trimmed = value.trim();
        const isoMonth = /^\d{4,}-\d{2}$/;
        if (isoMonth.test(trimmed)) {
            const month = Number(trimmed.split('-')[1]);
            return month >= 1 && month <= 12 ? trimmed : '';
        }

        return '';
    };
  
    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            tech_stack: "",
            project_link: "",
            end_date: "",
            is_current: false,
            description: "",
        };
        onChange([...data, newProject]);
    };

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    }

    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    }

    return (
    <div className='space-y-6'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
            <div className='pr-2'>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-700'>
                    Projects
                </h3>
                <p className='text-sm text-gray-500'>
                    Add details for your projects here.
                </p>
            </div>
            <button type='button' className='flex w-full items-center justify-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors shrink-0 sm:mt-1 sm:w-auto' onClick={addProject}>
                <Plus className='size-4'/> Add Project
            </button>
        </div>
            <div className='space-y-4 mt-6'>
                {data.map((project, index) => (
                    <div key={index} className='border border-gray-300 rounded-lg p-4 space-y-3'>
                        <div className='flex justify-between items-start'>
                            <h4>Project #{index + 1}</h4>
                            <button type='button' className='text-red-500 hover:text-red-700 transition-colors' 
                            onClick={() => removeProject(index)}>
                                <Trash2 className='size-4' />
                            </button>
                        </div>
                        <div className='grid gap-3'>
                            <input type="text"
                            placeholder="Project Name" 
                            value={project.name || ""} 
                            onChange={(e) => updateProject(index, 'name', e.target.value)} 
                            className='px-3 py-2 text-sm rounded-lg'/>

                            <input type="text" placeholder="Project Type" 
                            value={project.type || ""} 
                            onChange={(e) => updateProject(index, 'type', e.target.value)} 
                            className='px-3 py-2 text-sm rounded-lg'/>

                            <input type="text" placeholder="Tech Stack (e.g. React, Node.js, MongoDB)" 
                            value={project.tech_stack || ""} 
                            onChange={(e) => updateProject(index, 'tech_stack', e.target.value)} 
                            className='px-3 py-2 text-sm rounded-lg'/>

                            <input type="url" placeholder="Project Website Link" 
                            value={project.project_link || ""} 
                            onChange={(e) => updateProject(index, 'project_link', e.target.value)} 
                            className='px-3 py-2 text-sm rounded-lg'/>

                            <input type="month" placeholder="End Date" 
                            value={normalizeMonthInput(project.end_date)} 
                            onChange={(e) => updateProject(index, 'end_date', e.target.value)} 
                            className='px-3 py-2 text-sm rounded-lg'
                            disabled={project.is_current}/>

                            <label className='flex items-center gap-2'>
                                <input
                                    type='checkbox'
                                    checked={project.is_current || false}
                                    onChange={(e) => {
                                        const updated = [...data];
                                        updated[index] = {
                                            ...updated[index],
                                            is_current: e.target.checked,
                                            end_date: e.target.checked ? '' : (updated[index]?.end_date || '')
                                        };
                                        onChange(updated);
                                    }}
                                    className='w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-500'
                                />
                                <span className='text-sm text-gray-700'>Present Working</span>
                            </label>
            
                            <textarea 
                                rows={4}
                                placeholder="Project Description" 
                                value={project.description || ""} 
                                onChange={(e) => updateProject(index, 'description', e.target.value)} 
                                className='w-full px-3 py-2 text-sm rounded-lg resize-none'
                            />
                        </div>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default ProjectForm