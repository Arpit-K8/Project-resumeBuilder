import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from "lucide-react";

const ModernTemplate = ({ data, accentColor = "#2563eb" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white text-gray-800 font-sans leading-relaxed tracking-wide">
      {/* Header - Compact & Centered */}
      <header className="text-center pb-10 border-b border-gray-200">
        <h1
          className="text-4xl font-extrabold tracking-tight mb-3"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600 mt-3">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="size-4" />
              <span className="break-all">{data.personal_info.linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="size-4" />
              <span className="break-all">{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.professional_summary && (
        <section className="mt-10 mb-12">
          <h2
            className="text-lg font-bold uppercase tracking-wider mb-4"
            style={{ color: accentColor }}
          >
            Profile
          </h2>
          <p className="text-gray-700 leading-7">{data.professional_summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-12">
          <h2
            className="text-lg font-bold uppercase tracking-wider mb-6"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          <div className="space-y-9">
            {data.experience.map((exp, i) => (
              <div key={i} className="relative pl-6">
                <div
                  className="absolute left-0 top-1.5 w-3 h-3 rounded-full"
                  style={{ backgroundColor: accentColor }}
                ></div>
                <div className="flex justify-between items-baseline gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {exp.position}
                    </h3>
                    <p className="text-gray-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {formatDate(exp.start_date)} —{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </div>
                </div>

                {exp.description && (
                  <div className="mt-3 text-gray-700 leading-7 whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section className="mb-12">
          <h2
            className="text-lg font-bold uppercase tracking-wider mb-6"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <div className="space-y-8">
            {data.projects.map((proj, i) => (
              <div key={i} className="group">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold text-gray-900">
                    {proj.name}
                    {proj.type && (
                      <span
                        className="ml-2 text-sm font-normal"
                        style={{ color: accentColor }}
                      >
                        {proj.type}
                      </span>
                    )}
                  </h3>

                  {(proj.is_current || proj.end_date) && (
                    <span className="text-sm text-gray-500">
                      {proj.is_current ? "Ongoing" : formatDate(proj.end_date)}
                    </span>
                  )}
                </div>

                {proj.tech_stack && (
                  <p className="text-sm text-gray-600 mt-1">
                    {proj.tech_stack}
                  </p>
                )}

                {proj.project_link && (
                  <a
                    href={proj.project_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm mt-1 inline-block hover:underline"
                    style={{ color: accentColor }}
                  >
                    View Project →
                  </a>
                )}

                <p className="mt-2 text-gray-700 leading-7">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-12">
          <h2
            className="text-lg font-bold uppercase tracking-wider mb-6"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-6">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-start gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree}
                    {edu.field && <span> — {edu.field}</span>}
                  </h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>
                  )}
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {edu.is_current ? "Present" : formatDate(edu.graduation_date)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <h2
            className="text-lg font-bold uppercase tracking-wider mb-5"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <div
                key={i}
                className="px-3 py-1.5 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;