import React from 'react'
import { ArrowLeft, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const About = () => {
  const highlights = [
    {
      title: 'Built for placements & hiring',
      description:
        'Templates and sections designed for internships, fresher roles, and experienced hiring—without clutter.',
    },
    {
      title: 'ATS-friendly by design',
      description:
        'Clean structure, consistent headings, and export-ready formatting to help your resume pass automated screening.',
    },
    {
      title: 'Fast editing, clean output',
      description:
        'Focus on your story—our builder keeps spacing, typography, and layout consistent across the entire resume.',
    },
  ]

  const principles = [
    {
      title: 'Clarity over noise',
      description:
        'Recruiters skim. We prioritize readable sections, strong hierarchy, and scannable content.',
    },
    {
      title: 'Guidance, not guesswork',
      description:
        'We help you choose what to write—impact-driven bullets, skills that match roles, and consistent phrasing.',
    },
    {
      title: 'Control stays with you',
      description:
        'You own your content. Export when you want, edit anytime, and keep your resume future-proof.',
    },
  ]

  return (
    <div className="bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <section className="relative bg-black text-white pb-14 pt-10 bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-3.svg)] bg-center bg-cover">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-200 hover:text-white transition"
            >
              <ArrowLeft width="20" height="20" className="text-indigo-500" />
              <span className="font-medium">Back to Home</span>
            </Link>

            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/app?state=login"
                className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/app?state=register"
                className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start">
            <p className="font-medium text-indigo-400 px-6 py-1.5 rounded-full bg-indigo-950 border border-indigo-800 w-max flex items-center">
              <Zap width="16" height="16" className="mr-2" />
              About
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold max-w-4xl mt-6 leading-tight bg-linear-to-r from-white to-[#748298] text-transparent bg-clip-text">
              Resumify helps you tell your story—clearly, confidently, and fast.
            </h1>

            <p className="text-slate-300 text-sm md:text-lg max-w-2xl mt-5 leading-relaxed">
              We didn’t start by guessing what recruiters want—we started by listening.
              After meeting recruiters and hiring teams across different companies, we saw
              the same pattern: great candidates get skipped because their resumes are hard
              to scan, poorly structured, or filled with noise.
              <br />
              <br />
              That’s when we decided to build Resumify: a resume builder that keeps your
              resume clean, ATS-friendly, and easy to read—so your skills and impact come
              through in seconds. Simple enough for first-time applicants, powerful enough
              for professionals, and polished enough to send with confidence.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-7 rounded-xl border border-slate-800 bg-slate-950/70 backdrop-blur"
                >
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-sm font-medium text-indigo-400 px-6 py-1.5 rounded-full bg-indigo-950 border border-indigo-800 w-max flex items-center">
                <Zap width="16" height="16" className="mr-2" />
                Our mission
              </p>

              <h2 className="text-3xl md:text-4xl font-semibold mt-6 text-white">
                Make “resume-ready” the default.
              </h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                A resume is often your first impression. Our goal is to make it easy to
                create a document that is readable, structured, and tailored to your
                target role—without spending hours fighting spacing and formatting.
              </p>

              <div className="mt-8 space-y-3 text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <p>
                    Get a clean layout that hiring teams can scan in seconds.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <p>
                    Highlight impact with strong bullet structure and consistent sections.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <p>
                    Export confidently—your resume stays polished across devices.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-px rounded-2xl bg-linear-to-br from-indigo-500 to-slate-900">
              <div className="rounded-2xl border border-slate-800 bg-[#020204] p-8">
                <h3 className="text-xl font-semibold text-white">How it works</h3>
                <div className="mt-6 space-y-5">
                  <div className="flex gap-4">
                    <div className="h-9 w-9 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-semibold">
                      1
                    </div>
                    <div>
                      <p className="text-slate-200 font-medium">Pick a template</p>
                      <p className="text-slate-400 text-sm mt-1">
                        Start from a layout that’s designed to be ATS-friendly and recruiter-readable.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-9 w-9 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-semibold">
                      2
                    </div>
                    <div>
                      <p className="text-slate-200 font-medium">Fill your details</p>
                      <p className="text-slate-400 text-sm mt-1">
                        Add experience, projects, education, and skills with clean section structure.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-9 w-9 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-semibold">
                      3
                    </div>
                    <div>
                      <p className="text-slate-200 font-medium">Export and apply</p>
                      <p className="text-slate-400 text-sm mt-1">
                        Download a crisp PDF and start applying—your resume stays consistent and professional.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/app"
                    className="px-7 py-2.5 bg-indigo-600 hover:bg-indigo-700 font-medium transition rounded-full text-center shadow-[0_0_20px_rgba(79,70,229,0.35)]"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    to="/#features"
                    className="px-7 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded-full font-medium transition text-center"
                  >
                    Explore features
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
            {principles.map((item) => (
              <div
                key={item.title}
                className="p-7 rounded-xl border border-slate-800 bg-slate-950"
              >
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </div>
  )
}

export default About