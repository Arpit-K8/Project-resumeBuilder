import { useEffect, useState } from 'react'
import { XIcon, FilePenLineIcon, Form, PencilIcon, PlusIcon, Trash2Icon, UploadCloudIcon } from 'lucide-react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const colors = [ "#ef4444", "#8b5cf6", "#f97316", "#14b8a6"];
  const [allResumes, setAllResumes] = useState([])

  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)

  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const navigate = useNavigate();
  const createResume = async(event) =>{
    event.preventDefault();
    setShowCreateResume(false);
    navigate('/app/builder/res123')
  }

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  }

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className='max-w-7xl mx-auto py-8 px-4'>
        <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text text sm:hidden'>welcome, Arpit</p>
        <div className='flex gap-4'>
            <button onClick={()=>setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
              <PlusIcon className='size-11 trabsition-all duration-300 p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full' />
              <p className='text-sm group-hover:text-blue-600 transition-all duration-300'>Create Resume</p>
            </button>
            <button className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full'/>
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Upload Existing</p>
            </button>
        </div>
        <hr className='border-slate-300 my-6 sm:w-[305px]'/>
        <div className='grid grid-cols-2 gap-4 sm:flex sm:flex-wrap '>
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button key={index} className='group relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-slate-300 hover:border-gray-400 hover:shadow-md transition-all duration-300 cursor-pointer' style={{background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40 )`, borderColor: baseColor + '40'}}>

                <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{color: baseColor}}/>
                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{color: baseColor}}>{resume.title}</p>
                < p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{color: baseColor + '90'}}>
                  updated on {new Date(resume.updatedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })} 
                </p>
                <div className='absolute top-1 right-1 group-hover:flex hidden items-center gap-1'>
                 <Trash2Icon className='size-7 p-1.5 hover:bg-red-100 hover:text-red-600 rounded transition-colors text-slate-700'/>
                 <PencilIcon className='size-7 p-1.5 hover:bg-indigo-100 hover:text-indigo-600 rounded transition-colors text-slate-700'/>   
                </div>
              </button> 
            )
          })}
        </div>
        {showCreateResume && (
          <form onSubmit={createResume} onClick={()=>setShowCreateResume(false)} className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10'>
            <div onClick={e => e.stopPropagation()} className='relative bg-gradient-to-b from-indigo-900 to-indigo-950 border border-indigo-700 shadow-xl rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-2xl font-bold mb-4 text-white'>Create a Resume</h2>
              <input type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 rounded-lg bg-white/10 border border-indigo-300/30 text-white placeholder:text-indigo-200/70 focus:outline-none focus:ring-2 focus:ring-indigo-300/50' />
              <button className='w-full bg-white text-indigo-900 px-4 py-2 rounded hover:bg-indigo-100 transition-colors font-medium'>Create</button>

              <XIcon className='absolute top-4 right-4 size-6 text-indigo-200 cursor-pointer hover:text-white transition-colors' onClick={() => { setShowCreateResume(false); setTitle('')}}/>
            </div>

          </form>)
          }
      </div>
    </div>
  )
}

export default Dashboard