import Resume from "../models/Resume.js";
import imagekit from "../configs/imageKit.js";
import fs from 'fs';

//controller for creating a new resume
//POST: /api/resumes/create

export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        const newResume = await Resume.create({
            userId, title
        });
        return res.status(201).json({
            message: 'Resume created successfully',
            resume: newResume
        });
    }
    catch (error) {
        console.error('Error creating resume:', error);
        return res.status(400).json({ message: error.message });
    }
}

// controller for deleting a resume
//DELETE: /api/resumes/delete

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const deletedResume = await Resume.findOneAndDelete({
            userId, _id: resumeId
        });
        if (!deletedResume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        return res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Error deleting resume:', error);
        return res.status(400).json({ message: error.message });
    }
}

// get user resumes by id
// GET: /api/resumes/get

export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({
            userId, _id: resumeId
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        resume.__v = undefined; // Exclude __v from response
        resume.createdAt = undefined; // Exclude createdAt from response
        resume.updatedAt = undefined; // Exclude updatedAt from response      

        return res.status(200).json({ resume });
    } catch (error) {
        console.error('Error fetching resume:', error);
        return res.status(400).json({ message: error.message });
    }
}


// get resume by id public
// GET: /api/resumes/public

export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({
            _id: resumeId, public: true
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        return res.status(200).json({ resume });
    } catch (error) {
        console.error('Error fetching public resume:', error);
        return res.status(400).json({ message: error.message });
    }
}

// controller for updating a resume
// PUT: /api/resumes/update

export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const shouldRemoveBackground = ['true', '1', 'yes', 'on'].includes(
            String(removeBackground).toLowerCase()
        );

        const image = req.file;
        let resumeDataCopy;
        if (typeof resumeData === "string") {
            resumeDataCopy = await JSON.parse(resumeData);
        }
        else {
            resumeDataCopy = structuredClone(resumeData);
        }
        if (image) {
            const imageBufferData = fs.createReadStream(image.path)

            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation: {
                    pre: 'w-300,h-300,fo-face,z-0.75' +
                        (shouldRemoveBackground ? ',e-bgremove,f-png' : '')
                }
            });

            resumeDataCopy.personal_info.image = response.url;
        }
        else if (
            shouldRemoveBackground &&
            resumeDataCopy?.personal_info?.image &&
            typeof resumeDataCopy.personal_info.image === 'string'
        ) {
            const response = await imagekit.files.upload({
                file: resumeDataCopy.personal_info.image,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation: {
                    pre: 'w-300,h-300,fo-face,z-0.75,e-bgremove,f-png'
                }
            });

            resumeDataCopy.personal_info.image = response.url;
        }

        // Remove immutable fields to avoid Mongoose errors
        delete resumeDataCopy._id;
        delete resumeDataCopy.userId;
        delete resumeDataCopy.createdAt;
        delete resumeDataCopy.updatedAt;
        delete resumeDataCopy.__v;

        const resume = await Resume.findOneAndUpdate(
            { userId, _id: resumeId },
            resumeDataCopy,
            { new: true }
        );

        return res.status(200).json({
            message: 'Resume updated successfully',
            resume
        });
    } catch (error) {
        console.error('Error updating resume:', error);
        return res.status(400).json({ message: error.message });
    }
}