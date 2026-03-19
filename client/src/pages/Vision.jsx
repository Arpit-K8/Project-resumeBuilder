import React from 'react'
import { Zap, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Vision = () => {
  const pillars = [
    {
      title: 'Placement-ready by default',
      description:
        'We optimize the flow, sections, and structure so freshers and professionals can create a credible resume fast.',
    },
    {
      title: 'Simple, modern, consistent',
      description:
        'A resume should look clean on every screen and print well. Consistency is a product feature—not a struggle.',
    },
    {
      title: 'Built for real hiring',
      description:
        'We focus on what recruiters actually read: impact, skills alignment, and scannability—without fluff.',
    },
  ]

  const roadmap = [
    {
      title: 'Smarter writing support',
      description:
        'More targeted suggestions for bullets, projects, and role-based keywords—so your content sounds confident and specific.',
    },
    {
      title: 'More templates, same clarity',
      description:
        'More design options while keeping ATS-friendly structure and predictable spacing across layouts.',
    },
    {
      title: 'One-click tailoring',
      description:
        'Quickly tailor the same resume for different roles without rewriting from scratch—keep versions organized.',
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
                to="/about"
                className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition"
              >
                About
              </Link>
              <Link
                to="/app"
                className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex flex-col items-start">
              <p className="font-medium text-indigo-400 px-6 py-1.5 rounded-full bg-indigo-950 border border-indigo-800 w-max flex items-center">
                <Zap width="16" height="16" className="mr-2" />
                Vision
              </p>

              <div className="flex items-center gap-2 border border-white/15 rounded-full px-4 py-2 text-xs sm:text-sm mt-5 max-w-[90vw]">
                <p>Explore how we create perfect CVs for placements.</p>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold max-w-4xl mt-6 leading-tight bg-linear-to-r from-white to-[#748298] text-transparent bg-clip-text">
                A resume builder that respects your time—and recruiters’ attention.
              </h1>

              <p className="text-slate-300 text-sm md:text-lg max-w-2xl mt-5 leading-relaxed">
                Our vision is to help every learner and professional present their work with clarity.
                We’re building a product that turns messy drafts into clean, credible resumes—without
                fighting formatting.
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {pillars.map((item) => (
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
        </div>
      </section>

      <section className="bg-black py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-sm font-medium text-indigo-400 px-6 py-1.5 rounded-full bg-indigo-950 border border-indigo-800 w-max flex items-center">
                <Zap width="16" height="16" className="mr-2" />
                What we believe
              </p>

              <h2 className="text-3xl md:text-4xl font-semibold mt-6 text-white">
                The best resumes are easy to scan and hard to ignore.
              </h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                We design for the real-world: short recruiter attention spans, ATS parsing, and
                applications at scale. That means clean typography, strong hierarchy, and content
                that is focused on impact.
              </p>

              <div className="mt-8 space-y-3 text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <p>
                    Structure matters: headings, spacing, and order improve readability.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <p>
                    Proof beats claims: achievements, metrics, and outcomes should stand out.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <p>
                    Keep it honest: clarity and accuracy build trust with hiring teams.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-px rounded-2xl bg-linear-to-br from-indigo-500 to-slate-900">
              <div className="rounded-2xl border border-slate-800 bg-[#020204] p-8">
                <h3 className="text-xl font-semibold text-white">What we’re building next</h3>
                <p className="text-slate-400 text-sm mt-2">
                  We’re iterating toward a faster, smarter builder—while keeping the output clean.
                </p>

                <div className="mt-6 space-y-4">
                  {roadmap.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-slate-800 bg-slate-950 p-6"
                    >
                      <p className="text-slate-200 font-medium">{item.title}</p>
                      <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/app?state=register"
                    className="px-7 py-2.5 bg-indigo-600 hover:bg-indigo-700 font-medium transition rounded-full text-center shadow-[0_0_20px_rgba(79,70,229,0.35)]"
                  >
                    Create your resume
                  </Link>
                  <Link
                    to="/#testimonials"
                    className="px-7 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded-full font-medium transition text-center"
                  >
                    See success stories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </div>
  )
}

export default Vision