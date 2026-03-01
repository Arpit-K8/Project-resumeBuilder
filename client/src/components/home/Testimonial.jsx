import {Zap} from 'lucide-react'

const Testimonial = () => {
    const testimonials = [
        { id: 1, description: "This resume builder transformed my job search. The ATS-friendly templates got me more interviews in a week than I had in months.", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", name: "Alex Turner", company: "Software Engineer" },
        { id: 2, description: "I landed my dream role thanks to how clean and professional my resume looked. The drag-and-drop interface is a lifesaver.", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", name: "Harry Peter", company: "Product Manager" },
        { id: 3, description: "Creating a resume used to be a daunting task. Now, it literally takes me minutes, and the exported PDFs always look pixel-perfect.", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60", name: "Jason Kim", company: "Data Analyst" },
        { id: 4, description: "I love the suggestions and pre-written phrases. It helped me highlight my achievements much better than I could have on my own.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop", name: "Sofia Martinez", company: "Marketing Lead" },
        { id: 5, description: "The best resume builder I've ever used. Clean layouts to pass through automated screening systems flawlessly. Highly recommended!", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60", name: "Alex Johnson", company: "UX Designer" },
        { id: 6, description: "This platform gave me the confidence to apply for senior roles. The design templates automatically made my profile stand out.", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", name: "Emily Karter", company: "Financial Advisor" },
        { id: 7, description: "Creating a resume used to be a daunting task. Now, it literally takes me minutes, and the exported PDFs always look pixel-perfect.", image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png", name: "Christofer Levin", company: "Consultant" },
        { id: 8, description: "This resume builder transformed my job search. The ATS-friendly templates got me more interviews in a week than I had in months.", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", name: "Alex Turner", company: "Software Engineer" },
        { id: 9, description: "I landed my dream role thanks to how clean and professional my resume looked. The drag-and-drop interface is a lifesaver.", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", name: "Harry Peter", company: "Product Manager" }
    ]

    const columns = [
        { start: 0, end: 3, className: "animate-scroll-up-1" },
        { start: 3, end: 6, className: "hidden md:block animate-scroll-up-2" },
        { start: 6, end: 9, className: "hidden lg:block animate-scroll-up-3" }
    ]

    const renderCard = (testimonial, index) => (
        <div key={`${testimonial.id}-${index}`} className="bg-linear-to-b from-[#020204] to-[#191130] border border-slate-800 rounded-xl p-6 mb-4 hover:border-slate-700 transition-all duration-300">
            <div className="mb-5">
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13.056c.464 0 .91-.131 1.237-.364.329-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88C7.91 6.97 7.464 6.838 7 6.838c-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.513-.879.328-.233.773-.364 1.237-.364.232 0 .455-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.619-.181c-1.392 0-2.728.393-3.712 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.513.88.328.233.773.364 1.237.364zm9.83 0c.465 0 .91-.131 1.238-.364.328-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88-.328-.233-.773-.364-1.237-.364-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.512-.879.329-.233.774-.364 1.238-.364.232 0 .454-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.62-.181c-1.391 0-2.727.393-3.711 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.512.88.329.233.774.364 1.238.364z"/></g>
                </svg>
            </div>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                {testimonial.description}
            </p>
            <div className="flex items-center gap-3">
                <img src={testimonial.image} alt={testimonial.name} className="size-9 rounded-full border border-slate-800" />
                <div>
                    <p className="text-sm text-slate-300">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.company}</p>
                </div>
            </div>
        </div>
    )
    return (
        <div id="testimonials" className="py-16 bg-black text-white">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }

                    @keyframes scroll-up {
                        0% {
                            transform: translateY(0);
                        }
                        100% {
                            transform: translateY(-50%);
                        }
                    }
                    .animate-scroll-up-1 {
                        animation: scroll-up 25s linear infinite;
                    }
                    .animate-scroll-up-2 {
                        animation: scroll-up 30s linear infinite;
                    }
                    .animate-scroll-up-3 {
                        animation: scroll-up 20s linear infinite; 
                    }
                `}
            </style>
            
            
            <div className="bg-black flex flex-col items-center justify-center py-16 px-4">
                <p className="text-center font-medium text-indigo-400 px-10 py-1.5 rounded-full bg-indigo-950 border border-indigo-800 w-max mx-auto justify-center items-center flex mb-12 mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 stroke-indigo-400"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="12" cy="13" r="2"/><path d="M12 15v5"/></svg>Testimonials </p>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium text-white mb-4">
                        Success Stories
                    </h1>
                    <p className="text-sm text-slate-200 max-w-md mx-auto">
                        Real stories from professionals who have used our resume builder to land their dream jobs and elevate their careers.
                    </p>
                </div>

                <div className="relative w-full max-w-6xl overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent z-10 pointer-events-none"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[600px] overflow-hidden">
                        {columns.map((col, colIndex) => (
                            <div key={colIndex} className={col.className}>
                                {[...testimonials.slice(col.start, col.end), ...testimonials.slice(col.start, col.end)].map((testimonial, index) =>
                                    renderCard(testimonial, index)
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Testimonial;