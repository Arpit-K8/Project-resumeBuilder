import {Zap} from 'lucide-react'

export default function Banner() {
    return (
        <div className="w-full py-2.5 font-medium text-sm text-slate-300 text-center bg-black border-b border-white/10 flex items-center justify-center">
        <p className="flex items-center justify-center">
            <span className="px-3 py-1 rounded-full text-white bg-indigo-600 mr-2 text-xs">
            New
            </span>
            AI Feature Added
            <Zap width="16" height="16" className="ml-2" />
        </p>
        </div>
    );
};