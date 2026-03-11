import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
            {/* Header Section */}
            <header className="relative overflow-hidden pt-12 pb-8" style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)` }}>
                <div className="relative z-10 px-8">
                    <h1 className="text-5xl font-bold mb-2 tracking-tight">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="text-lg opacity-90 font-light">
                        {data.personal_info?.profession || "Professional"}
                    </p>
                </div>

                {/* Decorative Shape */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-10 rounded-full" style={{ background: accentColor }}></div>
            </header>

            {/* Contact Information */}
            <div className="px-8 py-6 border-b border-gray-700">
                <div className="flex flex-wrap gap-6 text-sm">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-2">
                            <Mail className="size-4" style={{ color: accentColor }} />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone className="size-4" style={{ color: accentColor }} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="size-4" style={{ color: accentColor }} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <a target="_blank" href={data.personal_info?.linkedin} className="flex items-center gap-2 hover:opacity-75 transition">
                            <Linkedin className="size-4" style={{ color: accentColor }} />
                            <span className="break-all text-xs">{data.personal_info.linkedin.split("https://www.")[1] || data.personal_info.linkedin}</span>
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a target="_blank" href={data.personal_info?.website} className="flex items-center gap-2 hover:opacity-75 transition">
                            <Globe className="size-4" style={{ color: accentColor }} />
                            <span className="break-all text-xs">{data.personal_info.website.split("https://")[1] || data.personal_info.website}</span>
                        </a>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="px-8 py-8">
                {/* Professional Summary */}
                {data.professional_summary && (
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1 h-6" style={{ backgroundColor: accentColor }}></div>
                            <h2 className="text-2xl font-bold uppercase tracking-widest">About</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6" style={{ backgroundColor: accentColor }}></div>
                            <h2 className="text-2xl font-bold uppercase tracking-widest">Experience</h2>
                        </div>

                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="relative pl-6 border-l-2 border-gray-700 hover:border-gray-600 transition">
                                    <div className="absolute -left-3 top-0 w-4 h-4 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-xl font-bold" style={{ color: accentColor }}>{exp.position}</h3>
                                                <p className="text-gray-300">{exp.company}</p>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <p className="text-gray-400 leading-relaxed whitespace-pre-line text-sm">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project && data.project.length > 0 && (
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6" style={{ backgroundColor: accentColor }}></div>
                            <h2 className="text-2xl font-bold uppercase tracking-widest">Projects</h2>
                        </div>

                        <div className="grid sm:grid-cols-1 gap-4">
                            {data.project.map((proj, index) => (
                                <div key={index} className="bg-gray-800 border-l-4 p-4 rounded-lg hover:bg-gray-750 transition" style={{ borderLeftColor: accentColor }}>
                                    <h3 className="text-lg font-bold mb-1">{proj.name}</h3>
                                    <p className="text-gray-400 text-sm mb-2">{proj.type}</p>
                                    {proj.description && (
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {proj.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education & Skills Side by Side */}
                <div className="grid sm:grid-cols-2 gap-8">
                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-6" style={{ backgroundColor: accentColor }}></div>
                                <h2 className="text-2xl font-bold uppercase tracking-widest">Education</h2>
                            </div>

                            <div className="space-y-4">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="bg-gray-800 p-4 rounded-lg">
                                        <h3 className="font-bold" style={{ color: accentColor }}>
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p className="text-gray-300 text-sm">{edu.institution}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500">
                                                {formatDate(edu.graduation_date)}
                                            </span>
                                            {edu.gpa && <span className="text-xs text-gray-500">GPA: {edu.gpa}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-6" style={{ backgroundColor: accentColor }}></div>
                                <h2 className="text-2xl font-bold uppercase tracking-widest">Skills</h2>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 text-sm font-medium rounded-full bg-gray-800 border border-gray-700 hover:border-gray-600 transition"
                                        style={{ color: accentColor }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreativeTemplate;
