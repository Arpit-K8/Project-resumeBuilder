import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import api from '../configs/api'
import { toast } from 'react-hot-toast'
import logo from '../assets/logo.svg'


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_REGEX = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/
const STRONG_PASSWORD_REGEX = /^(?=\S{8,64}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/

/* ── Small icon components ── */
const IconUser = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const IconMail = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
)

const IconLock = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const IconEyeOpen = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const IconEyeClosed = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

const GoogleLogo = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-3 h-3 fill-amber-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const ErrorMsg = ({ msg }) => (
  <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5">
    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
    {msg}
  </p>
)

/* ── Reusable input field ── */
const Field = ({ label, icon: Icon, error, right, inputProps }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        {label}
      </label>
    )}
    <div className={`flex items-center gap-2.5 h-11 px-3.5 rounded-xl bg-white/[0.04] border transition-all duration-200 focus-within:bg-indigo-500/[0.06] focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/15 hover:bg-white/[0.07] hover:border-white/20 ${error ? 'border-red-500/50' : 'border-white/[0.08]'}`}>
      {Icon && <Icon className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />}
      <input
        className="flex-1 bg-transparent outline-none border-none ring-0 text-sm text-zinc-200 placeholder-zinc-600 h-full min-w-0 font-light"
        {...inputProps}
      />
      {right}
    </div>
    {error && <ErrorMsg msg={error} />}
  </div>
)

const Login = () => {
  const query = new URLSearchParams(window.location.search)
  const [state, setState] = useState(query.get("state") || "login")
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  const validateForm = () => {
    const errs = {}
    const name = formData.name.trim().replace(/\s+/g, ' ')
    const email = formData.email.trim().toLowerCase()
    const password = formData.password

    if (state === 'signup') {
      if (!name) errs.name = 'Name is required'
      else if (name.length < 2 || name.length > 50 || !NAME_REGEX.test(name))
        errs.name = 'Name must be 2–50 letters only'
    }
    if (!email) errs.email = 'Email is required'
    else if (email.length > 254 || !EMAIL_REGEX.test(email))
      errs.email = 'Enter a valid email address'
    if (!password) errs.password = 'Password is required'
    else if (state === 'signup' && !STRONG_PASSWORD_REGEX.test(password))
      errs.password = 'Use 8–64 chars with upper, lower, number & symbol'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      const payload = {
        name: formData.name.trim().replace(/\s+/g, ' '),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      }
      const endpoint = state === 'login' ? 'login' : 'register'
      const body = state === 'login' ? { email: payload.email, password: payload.password } : payload
      const { data } = await api.post(`/api/users/${endpoint}`, body)
      dispatch(login({ user: data.user, token: data.token }))
      localStorage.setItem('token', data.token)
      toast.success(data.message)
    } catch (err) {
      const status = err.response?.status
      const serverMessage = err.response?.data?.message
      console.error('Auth request failed', {
        endpoint,
        status,
        message: serverMessage || err.message
      })
      toast.error(serverMessage || (status ? `Request failed (${status})` : err.message))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const switchState = (next) => {
    setErrors({})
    setFormData({ name: '', email: '', password: '' })
    setState(next)
  }

  return (
    <div className="relative flex min-h-svh w-full overflow-hidden bg-zinc-950 text-zinc-100">

      {/* Ambient gradient blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 right-0 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-violet-600/[0.08] blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 h-[300px] w-[300px] rounded-full bg-blue-600/[0.05] blur-[80px]" />
      </div>

      {/* ════════ LEFT PANEL ════════ */}
      <div className="relative hidden flex-1 flex-col justify-end overflow-hidden p-12 md:flex xl:p-16">

        {/* Background photo */}
        <img
          src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1400&auto=format&fit=crop"
          alt="Professional workspace"
          className="absolute inset-0 z-0 h-full w-full object-cover saturate-50 brightness-50"
        />

        {/* Overlay gradients */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-transparent to-zinc-950/90" />

        {/* Content */}
        <div className="relative z-20 max-w-md">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-300">
              AI-powered resume builder
            </span>
          </div>

          {/* Heading — using font-serif (maps to Georgia / serif fallback) */}
          <h1 className="mb-5 font-serif text-4xl font-normal leading-[1.12] tracking-tight text-white xl:text-5xl">
            Build the resume that{' '}
            <em className="italic text-indigo-300">gets you hired</em>
          </h1>

          <p className="mb-8 text-base font-light leading-relaxed text-zinc-400">
            Craft ATS-optimised resumes that stop recruiters mid-scroll. Stand out
            from thousands of applicants with expertly designed templates.
          </p>

          {/* Stats row */}
          <div className="mb-8 flex items-center gap-6">
            {[
              { val: '12k+', label: 'Active users' },
              { val: '94%', label: 'Interview rate' },
              { val: '4.9', label: 'Avg rating' },
            ].map(({ val, label }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <div className="h-8 w-px bg-white/10" />}
                <div>
                  <div className="font-serif text-2xl text-white">{val}</div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-widest text-zinc-500">{label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Avatars + trust */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {[
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100',
                'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100',
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="-ml-2.5 first:ml-0 h-9 w-9 rounded-full border-2 border-zinc-950 object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-300">1,000+ professionals trust us</p>
              <div className="mt-1 flex gap-0.5">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------- RIGHT PANEL ------- */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-5 pb-10 pt-20 md:w-[480px] md:shrink-0 md:pt-10 lg:w-[520px]">

        {/* Close button */}
        <Link
          to="/"
          className="absolute right-4 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/30 text-zinc-400 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-zinc-200 sm:right-5 sm:top-5 sm:h-9 sm:w-9"
          aria-label="Close"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Link>

        {/* Glass card */}
        <div className="w-full max-w-[400px] rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 shadow-2xl shadow-black/60 backdrop-blur-2xl">

          {/* Logo */}
          <div className="mb-6 flex items-center gap-2.5">
              <img src={logo} alt="Resumify Logo" className="w-40 h-15 mb-[-15px] mr-[25px]"/>
          </div>

          {/* Heading */}
          <h2 className="mb-1 font-serif text-[1.75rem] font-normal leading-tight tracking-tight text-white">
            {state === 'login' ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="mb-6 text-xs font-light text-zinc-500">
            {state === 'login'
              ? 'Sign in to continue building your perfect resume.'
              : 'Start crafting resumes that get you noticed.'}
          </p>

          {/* Google */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-150 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.09] active:translate-y-0"
          >
            <GoogleLogo />
            {state === 'login' ? 'Continue with Google' : 'Sign up with Google'}
          </button>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.07]" />
            <span className="text-[10px] uppercase tracking-widest text-zinc-600">or continue with email</span>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>

          {/* Form fields */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">

            {state === 'signup' && (
              <Field
                label="Full name"
                icon={IconUser}
                error={errors.name}
                inputProps={{
                  name: 'name',
                  type: 'text',
                  placeholder: 'Jane Doe',
                  value: formData.name,
                  onChange: handleChange,
                  maxLength: 50,
                  minLength: 2,
                  autoComplete: 'name',
                }}
              />
            )}

            <Field
              label="Email address"
              icon={IconMail}
              error={errors.email}
              inputProps={{
                name: 'email',
                type: 'email',
                placeholder: 'you@example.com',
                value: formData.email,
                onChange: handleChange,
                maxLength: 254,
                autoComplete: 'email',
              }}
            />

            <Field
              label="Password"
              icon={IconLock}
              error={errors.password}
              right={
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="flex-shrink-0 text-zinc-600 transition-colors hover:text-zinc-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <IconEyeClosed /> : <IconEyeOpen />}
                </button>
              }
              inputProps={{
                name: 'password',
                type: showPassword ? 'text' : 'password',
                placeholder: state === 'signup' ? 'Min 8 chars, upper + symbol' : '••••••••',
                value: formData.password,
                onChange: handleChange,
                minLength: 8,
                maxLength: 64,
                autoComplete: state === 'login' ? 'current-password' : 'new-password',
              }}
            />

            {/* Remember / Forgot */}
            {state === 'login' && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex cursor-pointer items-center gap-2 text-xs text-zinc-500">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 cursor-pointer accent-indigo-500 rounded"
                  />
                  Remember me
                </label>
                <a
                  href="FutureUpdate"
                  className="text-xs text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold tracking-wide text-white shadow-lg shadow-indigo-600/30 transition-all duration-150 hover:-translate-y-px hover:shadow-indigo-600/50 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Please wait…'
                : state === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {/* Toggle */}
          <p className="mt-6 text-center text-xs text-zinc-600">
            {state === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <span
              onClick={() => switchState(state === 'login' ? 'signup' : 'login')}
              className="cursor-pointer font-medium text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
            >
              {state === 'login' ? 'Sign up free' : 'Sign in'}
            </span>
          </p>
        </div>
      </div>

    </div>
  )
}

export default Login