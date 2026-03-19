import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ExecutiveTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-6xl mx-auto bg-white text-gray-900">
            <div className="grid grid-cols-3 gap-0 min-h-screen">
                {/* Left Sidebar */}
                <div className="col-span-1 p-8 text-white" style={{ backgroundColor: accentColor }}>
                    <h1 className="text-3xl font-bold mb-8">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>

                    {/* Contact */}
                    <div className="mb-10">
                        <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 opacity-70">Contact</h3>
                        <div className="space-y-3 text-sm">
                            {data.personal_info?.email && (
                                <div className="flex items-start gap-2">
                                    <Mail className="size-4 mt-1 flex-shrink-0" />
                                    <span>{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.phone && (
                                <div className="flex items-start gap-2">
                                    <Phone className="size-4 mt-1 flex-shrink-0" />
                                    <span>{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-start gap-2">
                                    <MapPin className="size-4 mt-1 flex-shrink-0" />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}
                            {data.personal_info?.linkedin && (
                                <a target="_blank" href={data.personal_info?.linkedin} className="flex items-start gap-2">
                                    <Linkedin className="size-4 mt-1 flex-shrink-0" />
                                    <span className="break-all text-xs">{data.personal_info.linkedin.split("https://www.")[1] || data.personal_info.linkedin}</span>
                                </a>
                            )}
                            {data.personal_info?.website && (
                                <a target="_blank" href={data.personal_info?.website} className="flex items-start gap-2">
                                    <Globe className="size-4 mt-1 flex-shrink-0" />
                                    <span className="break-all text-xs">{data.personal_info.website.split("https://")[1] || data.personal_info.website}</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 opacity-70">Skills</h3>
                            <div className="space-y-2 text-sm">
                                {data.skills.slice(0, 10).map((skill, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full opacity-70"></div>
                                        <span>{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Content */}
                <div className="col-span-2 p-10">
                    {/* Professional Summary */}
                    {data.professional_summary && (
                        <section className="mb-10">
                            <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: accentColor }}>
                                Professional Summary
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: accentColor }}>
                                Experience
                            </h2>
                            <div className="space-y-6">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                                                <p style={{ color: accentColor }} className="font-medium text-sm">{exp.company}</p>
                                            </div>
                                            <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                                                {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
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
                            <h2 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: accentColor }}>
                                Education
                            </h2>
                            <div className="space-y-4">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-semibold text-gray-900">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p style={{ color: accentColor }} className="text-sm font-medium">{edu.institution}</p>
                                        <p className="text-xs text-gray-500">{edu.is_current ? "Present" : formatDate(edu.graduation_date)}</p>
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

export default ExecutiveTemplate;
