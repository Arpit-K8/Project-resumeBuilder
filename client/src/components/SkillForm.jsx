import React from 'react'
import { Plus, X, Sparkles } from 'lucide-react';

const SkillForm = ({data, onChange}) => {
  const [newSkill, setNewSkill] = React.useState("");
  
  const addSkill = () => {
    if(newSkill.trim() === "") return;
    if(newSkill.trim() && !data.includes(newSkill.trim())){
        onChange([...data, newSkill.trim()]);
        setNewSkill("");
    }
  }
  
  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  }

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
        e.preventDefault();
        addSkill();
    }
    }
  return (
    <div className='space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
        <div className='space-y-4'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-slate-900'>
                  Skills
                </h3>
                <p className='text-sm text-slate-500'>
                  Add your technical and soft skills
                </p>
            </div>
            <div className='flex flex-col gap-3 sm:flex-row'>
                <input
                    type="text"
                    className='min-w-0 flex-1 px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:bg-white'
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter a skill...(eg. Java, Communication)"
                />
                <button
                 onClick={addSkill}
                 disabled={!newSkill.trim()}
                 className='inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed sm:self-start'>
                   <Plus className="size-4" />Add
                </button>
            </div>
        </div>
        {data.length > 0 ? (
            <div className='flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3'>
                {data.map((skill, index) => (
                    <span key={index} className='inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-blue-800 shadow-sm'>
                        {skill}
                        <button
                            onClick={() => removeSkill(index)}
                            className='rounded-full p-1 text-blue-500 transition hover:bg-blue-100 hover:text-blue-700'
                            aria-label={`Remove ${skill}`}>
                            <X className="size-3" />
                        </button>
                    </span>
                ))}
            </div>
        ) : (
          <div className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center text-slate-500'>
            <Sparkles className="mx-auto mb-3 h-10 w-10 text-slate-300"/>
            <p className='text-sm font-medium text-slate-700'>No skills added yet.</p>
            <p className='mt-1 text-sm'>Add your technical and soft skills to showcase your expertise.</p>
          </div>
        )}
        <div className='rounded-xl border border-blue-100 bg-linear-to-r from-blue-50 to-sky-50 p-4'>
          <p className='text-sm leading-6 text-blue-800'>
            <strong>Tip:</strong> Include a mix of technical skills (e.g., programming languages, tools) and soft skills (e.g., communication, teamwork) to create a well-rounded profile.
          </p>
        </div>
    </div>
  )
}

export default SkillForm