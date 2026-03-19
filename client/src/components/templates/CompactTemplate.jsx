import { Mail, Phone, MapPin, Linkedin, Globe, Star } from "lucide-react";

const CompactTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-900 p-8">
            {/* Header with Accent Background */}
            <div className="mb-8 pb-6" style={{ backgroundColor: `${accentColor}15`, borderBottom: `3px solid ${accentColor}` }}>
                <h1 className="text-3xl font-bold mb-1" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                {data.personal_info?.profession && (
                    <p className="text-lg text-gray-600 font-medium">{data.personal_info.profession}</p>
                )}
                
                <div className="flex flex-wrap gap-4 text-xs mt-4 text-gray-600">
                    {data.personal_info?.email && (
                        <span className="flex items-center gap-1">
                            <Mail size={14} />
                            {data.personal_info.email}
                        </span>
                    )}
                    {data.personal_info?.phone && (
                        <span className="flex items-center gap-1">
                            <Phone size={14} />
                            {data.personal_info.phone}
                        </span>
                    )}
                    {data.personal_info?.location && (
                        <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {data.personal_info.location}
                        </span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {/* Left Column - Skills & Summary */}
                <div className="col-span-1">
                    {/* Professional Summary */}
                    {data.professional_summary && (
                        <section className="mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: accentColor }}>
                                About
                            </h3>
                            <p className="text-xs text-gray-700 leading-relaxed">
                                {data.professional_summary.substring(0, 150)}...
                            </p>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: accentColor }}>
                                Skills
                            </h3>
                            <div className="space-y-2">
                                {data.skills.slice(0, 8).map((skill, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <Star size={12} style={{ color: accentColor }} fill={accentColor} />
                                        <span className="text-xs text-gray-700">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column - Experience & Education */}
                <div className="col-span-2 space-y-8">
                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: accentColor }}>
                                Experience
                            </h2>
                            <div className="space-y-4">
                                {data.experience.slice(0, 3).map((exp, index) => (
                                    <div key={index} className="pb-4 border-b border-gray-200">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-semibold text-gray-900 text-sm">{exp.position}</h3>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(exp.start_date)} - {exp.is_current ? "Now" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-xs font-medium" style={{ color: accentColor }}>{exp.company}</p>
                                        {exp.description && (
                                            <p className="text-xs text-gray-700 mt-2 line-clamp-2">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: accentColor }}>
                                Education
                            </h2>
                            <div className="space-y-3">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="pb-3 border-b border-gray-200">
                                        <h3 className="font-semibold text-gray-900 text-sm">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p className="text-xs font-medium" style={{ color: accentColor }}>{edu.institution}</p>
                                        <p className="text-xs text-gray-500">
                                            {edu.is_current ? "Present" : formatDate(edu.graduation_date)}
                                            {edu.gpa && ` • GPA: ${edu.gpa}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompactTemplate;
