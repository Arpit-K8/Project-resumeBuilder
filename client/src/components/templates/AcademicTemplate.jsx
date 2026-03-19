import { Mail, Phone, MapPin, Linkedin, Globe, ArrowRight } from "lucide-react";

const AcademicTemplate = ({ data, accentColor = "#1a1a2e" }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const accentBg         = { backgroundColor: accentColor };
    const accentText       = { color: accentColor };
    const accentBorder     = { borderColor: accentColor };
    const accentFaintBg    = { backgroundColor: `${accentColor}08` };
    const accentFaintBorder= { borderColor: `${accentColor}30` };

    const SectionTitle = ({ label, title }) => (
        <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 5px", ...accentText }}>
                {label}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, ...accentText }}>{title}</h2>
                <div style={{ flex: 1, height: 1, backgroundColor: `${accentColor}25` }} />
            </div>
        </div>
    );

    return (
        <div style={{ maxWidth: 820, margin: "0 auto", backgroundColor: "#fff", fontFamily: "'Georgia', serif", color: "#111" }}>

            {/* ── HEADER ── */}
            <header style={{ padding: "52px 64px 40px", borderBottom: `3px solid ${accentColor}`, textAlign: "center" }}>
                <h1 style={{ fontFamily: "Georgia, serif", fontSize: 42, fontWeight: 700, letterSpacing: -0.5, margin: "0 0 6px", color: "#111", lineHeight: 1.1 }}>
                    {data?.personal_info?.full_name || "Your Name"}
                </h1>

                {/* Thin rule under name */}
                <div style={{ width: 48, height: 3, borderRadius: 2, margin: "14px auto 18px", ...accentBg }} />

                {/* Contact row — table layout so separators never orphan */}
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "6px 0", fontFamily: "'DM Sans', sans-serif" }}>
                    {[
                        data?.personal_info?.email,
                        data?.personal_info?.phone,
                        data?.personal_info?.location,
                        data?.personal_info?.linkedin,
                        data?.personal_info?.website,
                    ].filter(Boolean).map((val, i, arr) => (
                        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 0 }}>
                            <span style={{ fontSize: 13, color: "#555", padding: "0 10px" }}>{val}</span>
                            {i < arr.length - 1 && (
                                <span style={{ fontSize: 11, color: `${accentColor}60`, userSelect: "none" }}>·</span>
                            )}
                        </span>
                    ))}
                </div>
            </header>

            {/* ── BODY ── */}
            <div style={{ padding: "44px 64px" }}>

                {/* ── SUMMARY ── */}
                {data?.professional_summary && (
                    <section style={{ marginBottom: 44 }}>
                        <SectionTitle label="Overview" title="Professional Summary" />
                        <p style={{ fontSize: 14.5, lineHeight: 1.85, color: "#444", margin: 0, textAlign: "justify", fontStyle: "italic" }}>
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* ── EDUCATION ── */}
                {data?.education?.length > 0 && (
                    <section style={{ marginBottom: 44 }}>
                        <SectionTitle label="Academic Background" title="Education" />
                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                            {data.education.map((edu, i) => (
                                <div key={i} style={{
                                    borderLeft: `3px solid ${accentColor}`,
                                    paddingLeft: 20,
                                    paddingTop: 2,
                                }}>
                                    <div style={{ display: "table", width: "100%", marginBottom: 3 }}>
                                        <span style={{ display: "table-cell", fontSize: 15.5, fontWeight: 700, color: "#111", fontFamily: "Georgia, serif" }}>
                                            {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                                        </span>
                                        {edu.gpa && (
                                            <span style={{ display: "table-cell", textAlign: "right", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif", ...accentText }}>
                                                GPA: {edu.gpa}
                                            </span>
                                        )}
                                    </div>
                                    <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 3px", fontFamily: "'DM Sans', sans-serif", ...accentText }}>
                                        {edu.institution}
                                    </p>
                                    <p style={{ fontSize: 12, color: "#999", margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                                        {edu.is_current ? "Present" : formatDate(edu.graduation_date)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── EXPERIENCE ── */}
                {data?.experience?.length > 0 && (
                    <section style={{ marginBottom: 44 }}>
                        <SectionTitle label="Work History" title="Professional Experience" />
                        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                            {data.experience.map((exp, i) => (
                                <div key={i} style={{
                                    borderLeft: `3px solid ${accentColor}`,
                                    paddingLeft: 20,
                                    paddingTop: 2,
                                }}>
                                    {/* Title + Date row using table to prevent wrapping */}
                                    <div style={{ display: "table", width: "100%", marginBottom: 3 }}>
                                        <span style={{ display: "table-cell", fontSize: 15.5, fontWeight: 700, color: "#111", fontFamily: "Georgia, serif" }}>
                                            {exp.position}
                                        </span>
                                        <span style={{ display: "table-cell", textAlign: "right", fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif", color: "#999" }}>
                                            {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 10px", fontFamily: "'DM Sans', sans-serif", ...accentText }}>
                                        {exp.company}
                                    </p>
                                    {exp.description && (
                                        <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "#555", margin: 0, whiteSpace: "pre-line", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── PROJECTS ── */}
                {data?.projects?.length > 0 && (
                    <section style={{ marginBottom: 44 }}>
                        <SectionTitle label="Research & Development" title="Projects" />
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18 }}>
                            {data.projects.map((proj, i) => (
                                <div key={i} style={{
                                    border: `1.5px solid ${accentColor}25`,
                                    borderTop: `3px solid ${accentColor}`,
                                    borderRadius: "0 0 6px 6px",
                                    padding: "18px 20px",
                                    backgroundColor: `${accentColor}04`,
                                    boxSizing: "border-box",
                                }}>
                                    <p style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 4px", fontFamily: "Georgia, serif" }}>
                                        {proj.name}
                                    </p>
                                    {proj.type && (
                                        <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px", opacity: 0.65, fontFamily: "'DM Sans', sans-serif", ...accentText }}>
                                            {proj.type}
                                        </p>
                                    )}
                                    {proj.tech_stack && (
                                        <p style={{ fontSize: 11.5, color: "#aaa", fontStyle: "italic", margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>
                                            {proj.tech_stack}
                                        </p>
                                    )}
                                    {proj.description && (
                                        <p style={{ fontSize: 13, lineHeight: 1.65, color: "#666", margin: 0, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                                            {proj.description}
                                        </p>
                                    )}
                                    {proj.project_link && (
                                        <a
                                            href={proj.project_link}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, marginTop: 10, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", ...accentText }}
                                        >
                                            View Project <ArrowRight size={10} />
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── SKILLS ── */}
                {data?.skills?.length > 0 && (
                    <section>
                        <SectionTitle label="Competencies" title="Skills" />
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                            {data.skills.map((skill, i) => (
                                <span key={i} style={{
                                    fontSize: 12.5,
                                    fontWeight: 500,
                                    padding: "5px 14px",
                                    borderRadius: 3,
                                    border: `1.5px solid ${accentColor}30`,
                                    backgroundColor: `${accentColor}06`,
                                    fontFamily: "'DM Sans', sans-serif",
                                    letterSpacing: 0.2,
                                    ...accentText,
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};

export default AcademicTemplate;