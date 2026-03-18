import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import api from '../configs/api'
import { toast } from 'react-hot-toast'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_REGEX = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/
const STRONG_PASSWORD_REGEX = /^(?=\S{8,64}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/

const Login = () => {
    const query = new URLSearchParams(window.location.search)
    const urlstate = query.get("state")
    const [state, setState] = useState(urlstate || "login")

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch()

    const validateForm = () => {
        const validationErrors = {}
        const name = formData.name.trim().replace(/\s+/g, ' ')
        const email = formData.email.trim().toLowerCase()
        const password = formData.password

        if (state === 'signup') {
            if (!name) {
                validationErrors.name = 'Name is required'
            } else if (name.length < 2 || name.length > 50 || !NAME_REGEX.test(name)) {
                validationErrors.name = 'Name must be 2-50 letters only'
            }
        }

        if (!email) {
            validationErrors.email = 'Email is required'
        } else if (email.length > 254 || !EMAIL_REGEX.test(email)) {
            validationErrors.email = 'Enter a valid email address'
        }

        if (!password) {
            validationErrors.password = 'Password is required'
        } else if (state === 'signup' && !STRONG_PASSWORD_REGEX.test(password)) {
            validationErrors.password = 'Use 8-64 chars with upper, lower, number, special char'
        }

        setErrors(validationErrors)
        return Object.keys(validationErrors).length === 0
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
            const endpoint = state === 'login' ? 'login' : 'register';
            const requestBody = state === 'login'
                ? { email: payload.email, password: payload.password }
                : payload

            const {data} = await api.post(`/api/users/${endpoint}`, requestBody)
            console.log("Login successful:", data)
            dispatch(login({user: data.user, token: data.token}))
            localStorage.setItem('token', data.token);
            toast.success(data.message)
        } catch (error) {
            console.error("Error submitting form:", error)
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsSubmitting(false)
        }

        console.log("Submitting:", state, formData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="flex min-h-screen w-full bg-black text-white bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-3.svg')] bg-center bg-cover">
            {/* Left side: Professional Image */}
            <div className="w-full hidden md:flex md:w-1/2 relative flex-col justify-center px-12 xl:px-24">
                {/* Background image with overlay and gradient fade */}
                <div className="absolute inset-0 z-0 bg-slate-900/60 mix-blend-multiply"></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                
                {/* A professional high-accuracy picture reflecting modern workspace & resumes */}
                <img 
                    className="absolute inset-0 w-full h-full object-cover z-[-1]" 
                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop" 
                    alt="Professional workspace resume" 
                />
                
                <div className="relative z-10 max-w-lg mb-8 drop-shadow-lg">
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-[#748298] text-transparent bg-clip-text mb-6">
                        Build the Perfect Resume That Gets You Hired
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                        Create professional, placement-ready resumes that impress recruiters and land your dream job. Stand out from the competition with our expertly designed templates.
                    </p>
                </div>
                
                <div className="relative z-10 flex items-center gap-4 mt-10">
                    <div className="flex -space-x-3">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100" alt="user1" className="size-10 object-cover rounded-full border-2 border-black" />
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100" alt="user2" className="size-10 object-cover rounded-full border-2 border-black" />
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="user3" className="size-10 object-cover rounded-full border-2 border-black" />
                    </div>
                    <div className="text-sm">
                        <p className="text-white font-medium">Trusted by 1000+ users</p>
                        <div className="flex text-indigo-500 mt-1">
                            {[...Array(5)].map((_, i) => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                        </div>
                    </div>
                </div>
            </div>
        
            {/* Right side: Form alignment centrally */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10">
                
                {/* Back Link / Arrow to return Home */}
                <Link to="/" className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:top-12 lg:right-12 text-slate-400 hover:text-white transition-colors p-2 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </Link>

                <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col justify-center">
                    <h2 className="text-3xl sm:text-4xl text-white font-medium mb-3 text-center sm:text-left">
                        {state === "login" ? "Sign in" : "Sign up"}
                    </h2>
                    <p className="text-sm text-slate-400 mb-8 text-center sm:text-left">
                        {state === "login" ? "Welcome back! Please sign in to continue." : "Create a new account to build your perfect resume."}
                    </p>
        
                    <button type="button" className="w-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center p-3 sm:h-12 rounded-full overflow-hidden">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" className="w-15 h-15" />
                        <span className="ml-3 text-sm font-medium text-slate-200">
                            {state === "login" ? "Sign in with Google" : "Sign up with Google"}
                        </span>
                    </button>
        
                    <div className="flex items-center gap-4 w-full my-6 opacity-70">
                        <div className="w-full h-px bg-white/20"></div>
                        <p className="w-full text-nowrap text-sm text-slate-400 text-center">
                            or {state === "login" ? "sign in" : "sign up"} with email
                        </p>
                        <div className="w-full h-px bg-white/20"></div>
                    </div>

                    {state === "signup" && (
                        <>
                            <div className="flex items-center w-full mb-2 bg-black/40 border border-white/10 hover:border-white/30 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all h-12 rounded-full overflow-hidden pl-5 pr-2 gap-3">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <input onChange={handleChange} value={formData.name} name="name" type="text" placeholder="Full name" className="bg-transparent text-slate-200 placeholder-slate-500 outline-none border-none focus:ring-0 text-sm w-full h-full" required maxLength={50} minLength={2} />
                            </div>
                            {errors.name && <p className="text-xs text-red-400 mb-3">{errors.name}</p>}
                        </>
                    )}
        
                    <div className="flex items-center w-full bg-black/40 border border-white/10 hover:border-white/30 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all h-12 rounded-full overflow-hidden pl-5 pr-2 gap-3">
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#9CA3AF"/>
                        </svg>
                        <input onChange={handleChange} value={formData.email} name="email" type="email" placeholder="Email id" className="bg-transparent text-slate-200 placeholder-slate-500 outline-none border-none focus:ring-0 text-sm w-full h-full" required maxLength={254} />
                    </div>
                    {errors.email && <p className="text-xs text-red-400 mt-2">{errors.email}</p>}
        
                    <div className="flex items-center mt-5 w-full bg-black/40 border border-white/10 hover:border-white/30 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all h-12 rounded-full overflow-hidden pl-5 pr-2 gap-3 relative">
                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#9CA3AF"/>
                        </svg>
                        <input onChange={handleChange} value={formData.password} name="password" type={showPassword ? "text" : "password"} placeholder="Password" className="bg-transparent text-slate-200 placeholder-slate-500 outline-none border-none focus:ring-0 text-sm w-full h-full pr-10" required minLength={8} maxLength={64} />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 text-slate-400 hover:text-white transition-colors flex items-center justify-center p-1"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            )}
                        </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-400 mt-2">{errors.password}</p>}
        
                    {state === "login" && (
                        <div className="w-full flex items-center justify-between mt-6 text-slate-400">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <input className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-black cursor-pointer accent-indigo-500" type="checkbox" id="checkbox" />
                                <label className="text-sm cursor-pointer select-none" htmlFor="checkbox">Remember me</label>
                            </div>
                            <a className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition-colors" href="#">Forgot password?</a>
                        </div>
                    )}
        
                    <button disabled={isSubmitting} type="submit" className="mt-8 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed font-medium transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]">
                        {isSubmitting ? 'Please wait...' : (state === "login" ? "Login" : "Sign up")}
                    </button>
                    
                    {state === "login" ? (
                        <p className="text-slate-400 text-sm mt-6 text-center">
                            Don’t have an account? <span onClick={() => setState("signup")} className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline transition-colors cursor-pointer">Sign up</span>
                        </p>
                    ) : (
                        <p className="text-slate-400 text-sm mt-6 text-center">
                            Already have an account? <span onClick={() => setState("login")} className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline transition-colors cursor-pointer">Login</span>
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login