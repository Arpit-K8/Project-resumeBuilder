import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import { ArrowLeftIcon,User,FileText,Briefcase,GraduationCap,FolderIcon, Sparkles, ChevronRight, ChevronLeft
 } from 'lucide-react';
import PersonalInfoForm from '../components/PersonalInfoForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id:'',
    title: '',
    personal_info:{},
    professional_summary: "",
    experience:[],
    education:[],
    project:[],
    skills:[],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  })

  const loadExistingResume = async() =>{
    const resume = dummyResumeData.find(resume => resume._id === resumeId);
    if(resume){
      setResumeData(resume);
      document.title = resume.title ;
    }
  }

  const sections = [
    {id: 'personal',name:"Personal_info", icon: User},
    {id:"summary", name:"Summary", icon: FileText},
    {id:"experience", name:"Experience", icon: Briefcase},
    {id:"education", name:"Education", icon: GraduationCap},
    {id:"projects", name:"Projects", icon: FolderIcon},
    {id:"skills", name:"Skills", icon: Sparkles}
  ]

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const ActiveSection = sections[activeSectionIndex];

  useEffect(()=>{
    loadExistingResume();
  }, [])

  return (
    <div>
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <Link to="/app" className='inline-flex gap-2 items-center text-indigo-500 hover:text-indigo-700 transition-all'> 
            <ArrowLeftIcon className='size-4'/>Back to Dashboard
          </Link>
        </div>

        <div className='max-w-7xl mx-auto px-4 pb-8'>
          <div className='grid lg:grid-cols-12 gap-8'>
            {/* left pannel for form inputs and right panel for resume preview */}
            <div className='relative lg:col-span-5 rounded-lg overflow-hidden border border-slate-300'>
              <div className='bg-whte rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
                <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
                <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 border-none transition-all duration-2000 ' style={{width: `${activeSectionIndex * 100 / (sections.length-1)}%`}} />
              
                {/* section navigation */}
                <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
                  <div className='flex items-center gap-2'>
                    <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({...prev, template}))}/>

                      <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({...prev, accent_color: color}))}/>
                  </div>
                  <div className='flex items-center'>
                    {activeSectionIndex !==0 && (
                      <button onClick={()=> setActiveSectionIndex((prev) => Math.max(prev-1,0))} className="flex items-center gap-1 p-3 rounded-lg text-sm
                      font-medium tex text-indigo-600 hover:bg-indigo-200 transition-all" 
                      disabled = {activeSectionIndex === 0}>
                        <ChevronLeft className='size-4'/>
                      Previous</button>
                    )}

                    <button onClick={()=> setActiveSectionIndex((prev) => Math.min(prev+1, sections.length - 1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm
                      font-medium text-indigo-600 hover:bg-indigo-200 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`} 
                      disabled = {activeSectionIndex === sections.length - 1}>
                      Next
                      <ChevronRight className='size-4'/>
                      </button>
                  </div>
                </div>

                {/* form */}
                <div className='space-y-6'>
                    {ActiveSection.id === 'personal' && (
                        <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({...prev, personal_info: data}) )} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>
                     )}

                      {ActiveSection.id === 'summary' && (
                        <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({...prev, professional_summary: data}) )} setResumeData={setResumeData}/>
                      )}

                      {ActiveSection.id === 'experience' && (
                        <ExperienceForm data={resumeData.experience} 
                        onChange={(data) => setResumeData(prev => ({...prev, experience: data}))}
                        />
                      )}

                      {ActiveSection.id === 'education' && (
                        <EducationForm data={resumeData.education} 
                        onChange={(data) => setResumeData(prev => ({...prev, education: data}))}
                        />
                      )}                      
                </div>
              </div>
            </div>
            
            {/* right panel for resume preview */}
            <div className="lg:col-span-7 max-lg:mt-6">
                  <div>  
                      {/*button*/}
                  </div>
              <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color}/>
            </div>
          </div>

        </div>

    </div>
  )
}

export default ResumeBuilder