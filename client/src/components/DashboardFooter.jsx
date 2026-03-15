import React from "react";
import logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <footer className='relative mt-3 overflow-hidden rounded-t-4xl border-t border-indigo-300/30 bg-linear-to-b from-slate-950 via-slate-900 to-[#111a2d]'>
      <div className='pointer-events-none absolute -top-20 left-1/2 h-36 w-160 -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-16 left-1/2 h-36 w-md -translate-x-1/2 rounded-full bg-sky-300/20 blur-3xl' />

      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row'>
        <div className='flex flex-col items-center gap-2 sm:items-start'>
          <img src={logo} alt='Logo' className='h-14 w-auto object-contain' />
          <p className='text-xs text-indigo-200/80'>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </div>

        <p className='max-w-md text-center text-sm leading-6 text-slate-300/80'>
          Keep your resumes polished, customized, and application-ready from one beautiful workspace.
        </p>

        <nav className='flex items-center gap-6 text-sm text-slate-300/80'>
          <a href='#' className='transition-colors hover:text-white'>Terms &amp; Conditions</a>
          <a href='#' className='transition-colors hover:text-white'>Privacy Policy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;