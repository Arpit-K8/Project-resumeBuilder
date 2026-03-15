import { useEffect, useState } from 'react'
import {
  XIcon,
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  UploadCloudIcon,
  ArrowRightIcon,
  Clock3Icon,
  SparklesIcon,
  CheckCircle2Icon,
} from 'lucide-react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import dummy_profile from '../assets/dummy_profile.png'
import DashboardFooter from '../components/DashboardFooter'

const Dashboard = () => {
  const colors = ["#4f46e5", "#0ea5e9", "#7c3aed", "#14b8a6"];
  const [allResumes, setAllResumes] = useState([])

  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)

  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const navigate = useNavigate();
  
  const editTitle = async(event) =>{
    event.preventDefault();
    // setEditResumeId('');
    // setTitle('');
  }
  const deleteResume = async(resumeId) =>{
    const confirm  = window.confirm('Are you sure you want to delete this resume?');
    if(confirm){
      // api call to delete resume
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
    }

  }

  const createResume = async(event) =>{
    event.preventDefault();
    setShowCreateResume(false);
    navigate('/app/builder/res123')
  }

  const uploadResume = async(event) =>{
    event.preventDefault();
    setTitle('');
    setResume(null);
    setShowUploadResume(false);
    navigate('/app/builder/res123')
  }
  
  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  }

  useEffect(() => {
    loadAllResumes();
  }, []);

  const lastUpdatedResume = allResumes[0];

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/40 to-sky-50 flex flex-col'>
      <div className='flex-1'>
        <div className='max-w-7xl mx-auto py-8 px-4'>
        <div className='grid gap-6 lg:grid-cols-12'>
          <div className='lg:col-span-7'>
            <div className='flex gap-4'>
              <button onClick={()=>setShowCreateResume(true)} className='h-48 w-full rounded-lg border border-dashed border-indigo-200 bg-linear-to-br from-white to-indigo-50 text-indigo-700 transition-all duration-300 hover:border-indigo-400 hover:shadow-lg group sm:max-w-36'>
                <div className='flex h-full flex-col items-center justify-center gap-2'>
                  <PlusIcon className='size-11 rounded-full bg-linear-to-br from-indigo-500 to-sky-500 p-2.5 text-white transition-all duration-300' />
                  <p className='text-sm transition-all duration-300 group-hover:text-indigo-600'>Create Resume</p>
                </div>
              </button>

              <button onClick={()=>setShowUploadResume(true)} className='h-48 w-full rounded-lg border border-dashed border-indigo-200 bg-linear-to-br from-white to-sky-50 text-indigo-700 transition-all duration-300 hover:border-indigo-400 hover:shadow-lg group sm:max-w-36'>
                <div className='flex h-full flex-col items-center justify-center gap-2'>
                  <UploadCloudIcon className='size-11 rounded-full bg-linear-to-br from-indigo-500 to-sky-500 p-2.5 text-white transition-all duration-300'/>
                  <p className='text-sm transition-all duration-300 group-hover:text-indigo-600'>Upload Existing</p>
                </div>
              </button>
            </div>

            <hr className='my-6 border-indigo-200 sm:w-80'/>

            <div className='grid grid-cols-2 gap-4 sm:flex sm:flex-wrap'>
              {allResumes.map((resume, index) => {
                const baseColor = colors[index % colors.length];
                return (
                  <button key={index}
                  onClick={()=> navigate(`/app/builder/${resume._id}`)}
                  className='group relative h-48 w-full rounded-lg border text-slate-700 transition-all duration-300 hover:shadow-md sm:max-w-36' style={{background: `linear-gradient(145deg, ${baseColor}12, ${baseColor}38)`, borderColor: baseColor + '4D'}}>
                    <div className='flex h-full flex-col items-center justify-center gap-2'>
                      <FilePenLineIcon className='size-7 transition-all group-hover:scale-105' style={{color: baseColor}}/>
                      <p className='px-2 text-center text-sm transition-all group-hover:scale-105' style={{color: baseColor}}>{resume.title}</p>
                      <p className='absolute bottom-1 px-2 text-center text-[11px] text-slate-400 transition-all duration-300 group-hover:text-slate-500' style={{color: baseColor + '90'}}>
                        updated on {new Date(resume.updatedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <div onClick={e=>e.stopPropagation()} className='absolute right-1 top-1 hidden items-center gap-1 group-hover:flex'>
                      <Trash2Icon
                        onClick={() => deleteResume(resume._id)}
                        className='size-7 rounded p-1.5 text-slate-700 transition-colors hover:bg-red-100 hover:text-red-600'/>
                      <PencilIcon
                        onClick={()=> {
                          setEditResumeId(resume._id);
                          setTitle(resume.title)
                        }}
                        className='size-7 rounded p-1.5 text-slate-700 transition-colors hover:bg-indigo-100 hover:text-indigo-600'/>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className='lg:col-span-5'>
            <div className='relative h-full min-h-120 overflow-hidden rounded-2xl border border-indigo-200 bg-linear-to-br from-indigo-50 via-white to-sky-100 p-6 shadow-sm'>
              <div className='absolute -right-10 -top-10 h-36 w-36 rounded-full bg-indigo-200/40 blur-2xl' />
              <div className='absolute -bottom-16 -left-8 h-44 w-44 rounded-full bg-sky-200/40 blur-2xl' />

              <div className='relative z-10 space-y-5'>
                <div className='inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs font-medium text-indigo-700'>
                  <SparklesIcon className='size-3.5' />
                  Career Workspace
                </div>

                <div>
                  <h2 className='text-2xl font-bold leading-tight text-slate-900'>
                    Design resumes that feel personal and polished.
                  </h2>
                  <p className='mt-2 text-sm leading-6 text-slate-600'>
                    Keep multiple role-focused versions in one place, update faster, and ship applications with confidence.
                  </p>
                </div>

                <div className='rounded-xl border border-white/70 bg-white/70 p-4 backdrop-blur'>
                  <img src={dummy_profile} alt='Profile preview' className='h-24 w-24 rounded-xl border border-indigo-100 object-cover shadow-sm' />

                  <div className='mt-3 grid grid-cols-2 gap-3 text-sm'>
                    <div className='rounded-lg bg-indigo-50 p-3'>
                      <p className='text-xs text-indigo-500'>Total resumes</p>
                      <p className='text-lg font-semibold text-indigo-800'>{allResumes.length}</p>
                    </div>
                    <div className='rounded-lg bg-sky-50 p-3'>
                      <p className='text-xs text-sky-500'>Last updated</p>
                      <p className='text-sm font-semibold text-sky-800'>
                        {lastUpdatedResume
                          ? new Date(lastUpdatedResume.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                          : '--'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-2 rounded-xl bg-slate-900 p-4 text-slate-100'>
                  <p className='flex items-center gap-2 text-sm'>
                    <CheckCircle2Icon className='size-4 text-emerald-300' />
                    Keep each resume role-specific
                  </p>
                  <p className='flex items-center gap-2 text-sm'>
                    <Clock3Icon className='size-4 text-sky-300' />
                    Refresh projects and skills weekly
                  </p>
                  <button onClick={()=>setShowCreateResume(true)} className='mt-1 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-white'>
                    Start a new resume
                    <ArrowRightIcon className='size-4' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showCreateResume && (
          <form onSubmit={createResume} onClick={()=>setShowCreateResume(false)} className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10'>
            <div onClick={e => e.stopPropagation()} className='relative w-full max-w-sm rounded-xl border border-indigo-200 bg-linear-to-b from-white to-indigo-50 p-6 text-slate-800 shadow-2xl'>
              <h2 className='mb-4 text-2xl font-bold text-slate-900'>Create a Resume</h2>
              <input onChange={(e)=>setTitle(e.target.value)} 
                value={title} type="text" placeholder='Enter resume title' className='mb-4 w-full rounded-lg border border-indigo-200 bg-white px-4 py-2 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300' required />
              <button className='w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700'>Create</button>

              <XIcon className='absolute right-4 top-4 size-6 cursor-pointer text-slate-400 transition-colors hover:text-slate-700' onClick={() => { setShowCreateResume(false); setTitle('')}}/>
            </div>
          </form>)
          }

          {showUploadResume && (
            <form onSubmit={uploadResume} onClick={()=>setShowUploadResume(false)} className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10'>
              <div onClick={e => e.stopPropagation()} className='relative w-full max-w-sm rounded-xl border border-indigo-200 bg-linear-to-b from-white to-sky-50 p-6 text-slate-800 shadow-2xl'>
                <h2 className='mb-4 text-2xl font-bold text-slate-900'>Upload Your Resume</h2>
                <input
                  onChange={(e)=>setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder='Enter resume title'
                  className='mb-4 w-full rounded-lg border border-indigo-200 bg-white px-4 py-2 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300'
                  required
                />
                <div>
                  <label htmlFor="resume-input" className='mb-2 block text-sm text-slate-600'>Select a resume file
                  <div className='group my-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-indigo-200 bg-indigo-50/50 p-4 py-10 text-slate-500 transition-colors hover:border-indigo-500 hover:text-indigo-600'>
                    {resume ? (
                      <p className='text-indigo-600'>{resume.name}</p>
                    ):(
                      <>
                        <UploadCloudIcon className='size-14 stroke-1'/>
                        <p>
                      <XIcon className='absolute right-4 top-4 size-6 cursor-pointer text-slate-400 transition-colors hover:text-slate-700' onClick={() => { setShowUploadResume(false); setResume(null); setTitle('')}}/>
                        </p>
                      </>  
                      )}                      
                  </div>
                  </label>
                  <input id='resume-input' type="file" accept=".pdf,.doc,.docx" className='hidden' onChange={(e)=>setResume(e.target.files[0])} required/>
                </div>

                <button className='w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700'>Upload</button>

                <XIcon className='absolute right-4 top-4 size-6 cursor-pointer text-slate-400 transition-colors hover:text-slate-700' onClick={() => { setShowUploadResume(false); setTitle('')}}/>
                </div>
            </form>)
          }

          {editResumeId && (
          <form onSubmit={editTitle} onClick={()=>setEditResumeId ('')} className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10'>
            <div onClick={e => e.stopPropagation()} className='relative w-full max-w-sm rounded-xl border border-indigo-200 bg-linear-to-b from-white to-indigo-50 p-6 text-slate-800 shadow-2xl'>
              <h2 className='mb-4 text-2xl font-bold text-slate-900'>Edit Resume Title</h2>
              <input onChange={(e)=>setTitle(e.target.value)} 
                value={title} type="text" placeholder='Enter resume title' className='mb-4 w-full rounded-lg border border-indigo-200 bg-white px-4 py-2 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300' required />
              <button className='w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700'>Update</button>

              <XIcon className='absolute right-4 top-4 size-6 cursor-pointer text-slate-400 transition-colors hover:text-slate-700' onClick={() => { setEditResumeId(''); setTitle('')}}/>
            </div>
          </form>)
          }

        </div>
      </div>

      <DashboardFooter/>
    </div>
  )
}

export default Dashboard