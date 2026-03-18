import { Sparkle } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import api from '../configs/api.js';

const ProfessionalSummaryForm = ({data,onChange, setResumeData}) => {

    const {token} = useSelector(state => state.auth);
    const [isGenerating, setIsGenerating] = React.useState(false);

    const generateSummary = async () => {
        try {
            setIsGenerating(true);
            const prompt  = `enhance my professional summary "${data}"`;
            const response = await  api.post('/api/ai/enhance-pro-sum', {userContent: prompt}, {
                headers: {
                        Authorization: `Bearer ${token}`
                }
            })
            setResumeData(prev => ({...prev, professional_summary: response.data.enhancedSummary}));
        } catch (error) {
            console.error('Error generating summary:', error);
            toast.error(error.response?.data?.message || error.message || "Failed to generate summary");
        }
        finally{
            setIsGenerating(false);
        }

    };

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
            <button 
            disabled = {isGenerating} 
            onClick={generateSummary}
            className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 shrink-0'>
                {isGenerating ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-700"></div>
                ) : (
                    <Sparkle className='size-4'/>
                )}
                {isGenerating ? "Generating..." : "AI Enhance"}
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