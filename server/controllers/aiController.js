//CONTROLLER FOR ENHANCING RESUME USING AI
// POST: /api/ai/enhance-pro-sum
import ai from '../configs/ai.js';
import Resume from '../models/Resume.js';

export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if(!userContent) {
            return res.status(400).json({ error: "User content is required" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {   role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the professional summary provided by the user.The summary should be 1-2 sentences long, highlighting the user's key skills, experience, and career goals. Make it concise, impactful, and tailored to the job market and ATS-Friendly. And only return text no options or anything else." 
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })
        const enhancedSummary = response.choices[0].message.content;
        return res.status(200).json({ enhancedSummary });
    } catch (error) {
        console.error("Error enhancing professional summary:", error);
        return res.status(400).json({message:error.message || "Failed to enhance professional summary" });
    }
};

// CONTROLLER FOR ENHANCING RESUME'S JOB DESCRIPTION
// POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if(!userContent) {
            return res.status(400).json({ error: "User content is required" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {   role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the job description provided by the user. The description should be 1-2 sentences long, highlighting the user's key skills, experience, and career goals. Make it concise, impactful, and tailored to the job market and ATS-Friendly. And only return text no options or anything else." 
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })
        const enhancedJobDesc = response.choices[0].message.content;
        return res.status(200).json({ enhancedJobDesc });
    } catch (error) {
        console.error("Error enhancing job description:", error);
        return res.status(400).json({message:error.message || "Failed to enhance job description" });
    }
};

//CONTROLLER FOR UPLOADING A RESUME TO THE DATABASE
// POST: /api/ai/upload-resume

export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        if(!resumeText || !title) {
            return res.status(400).json({ error: "Resume text and title are required" });
        }
        const userId = req.userId; 
        
        const systemPrompt = "You are an expert in resume parsing. Your task is to extract key information from the resume provided by the user. The information should include the user's name, contact details, education, work experience, skills, and any other relevant sections.";
        
        const userPrompt = `extract data from this resume: ${resumeText}
        Provide data in the following JSON format with no additional text before or after:
        {
            professional_summary: {
                type: String,
                default: ""
            },
            skills: [{
                type: String,
                default: ''
            }],
            personal_info: {
                image: { type: String, default: '' },
                full_name: { type: String, default: '' },
                profession: { type: String, default: '' },
                email: { type: String, default: '' },
                phone: { type: String, default: '' },
                location: { type: String, default: '' },
                linkedin: { type: String, default: '' },
                website: { type: String, default: '' }
            },
            experience: [{
                company: { type: String },
                position: { type: String },
                start_date: { type: String },
                end_date: { type: String },
                description: { type: String },
                is_current: { type: Boolean }
            }],
            projects: [{
                name: { type: String },
                type: { type: String },
                tech_stack: { type: String },
                project_link: { type: String },
                end_date: { type: String },
                is_current: { type: Boolean },
                description: { type: String },
            }],
            education: [{
                institution: { type: String },
                degree: { type: String },
                field: { type: String },
                graduation_date: { type: String },
                gpa: { type: String },
                is_current: { type: Boolean }
            }],
        }`;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {   role: "system",
                    content: systemPrompt
                },{
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: {
                type: "json_object",
            }
        });

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);
        // Logic for uploading resume to database
        const newResume = await Resume.create({
            userId,title,...parsedData,
        });
        return res.status(200).json({ message: "Resume uploaded successfully", resume: newResume });
    } catch (error) {
        console.error("Error uploading resume:", error);
        return res.status(400).json({message:error.message || "Failed to upload resume" });
    }
};