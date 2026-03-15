import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import ResumePreview from '../components/ResumePreview';
import { ArrowLeftIcon } from 'lucide-react';
import Loader from '../components/Loader';

const Preview = () => {
  const {resumeId} = useParams();
  const [resumeData, setResumeData] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(true);

  const loadResume = async() =>{
    setIsLoading(false);
    setResumeData(dummyResumeData.find(resume => resume._id === resumeId || null));
  }

  useEffect(()=>{
    loadResume();
  },[])

  return resumeData ? (
    <div className='bg-slate-100'>
      <div className='mx-auto max-w-3xl py-10 '>
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes='py-4 bg-white'/> 
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? <Loader /> : (
      <div className='flex flex-col items-center justify-center h-screen'>
        <p className='text-center text-6xl text-slate-400 font-medium'>Resume not found</p>
        <a href='/' className='mt-6 bg-indigo-500 hover:bg-indigo-600 text-white
        rounded-full px-6 h-9 m-1 ring-offset-1 right-1 ring-indigo-400 flex items-center '>
          <ArrowLeftIcon className='size-5 mr-2' />
          Back to Home Page
        </a>
      </div>
      )}
    </div>
  )
}

export default Preview