import {Zap} from 'lucide-react' 

const Feature = () => {
    const featuresData = [
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 size-8 mt-4"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>),
            title: "Quick & Easy Builder",
            description: "Create a professional resume in minutes using our intuitive drag-and-drop editor.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 size-8 mt-4"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>),
            title: "ATS-Friendly Templates",
            description: "Choose from modern, industry-approved designs to pass Applicant Tracking Systems.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 size-8 mt-4"><path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/></svg>),
            title: "Export in Multiple Formats",
            description: "Download your completed resume instantly as a high-quality PDF or DOCX file.",
        }
    ];
    return (
        <div id="features" className="py-16 bg-black text-white">
            <div className="text-center mt-5">
                <p className="text-center font-medium text-indigo-400 px-10 py-1.5 rounded-full bg-indigo-950 border border-indigo-800 w-max mx-auto justify-center items-center flex"><Zap width="16" height="16" className="mr-2" />Features </p>
                <h2 className="text-3xl font-semibold text-center mx-auto mt-10 text-white">Stand out from the crowd</h2>
                <p className="mt-4 text-slate-300 max-w-xl mx-auto">
                    Everything you need to craft a winning resume and land your dream job.
                </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-10 px-6">
                {featuresData.map((feature, index) => (
                    <div key={index} className={`hover:-translate-y-0.5 transition duration-300 ${index === 1 ? 'p-px rounded-[13px] bg-gradient-to-br from-indigo-500 to-slate-800' : ''}`}>
                        <div className="p-8 rounded-xl space-y-5 border border-slate-800 bg-slate-950 max-w-96 w-full min-h-[250px]">
                            {feature.icon}
                            <h3 className="text-lg font-medium text-white">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 line-clamp-3 pb-4">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Feature