import { z } from 'zod';

// Publications Schema
export const publicationSchema = z.array(z.object({
  title: z.string().min(1, "Title is required"),
  journalName: z.string().min(1, "Journal name is required"),
  link: z.string().url().optional(),
}));

// Professional Experience Schema
export const professionalExpSchema = z.array(z.object({
  title: z.string().min(1, "Title is required"),
  startDate: z.date(),
  endDate: z.date().optional(),
  companyName: z.string().min(1, "Company name is required"),
  description: z.string().min(1, "Description is required"),
  awardsRecognition: z.string().optional(),
  numberOfPromotions: z.number().min(0).optional(),
}));

// Combine all schemas for final submission
export const mentorSchema = z.object({
  name: z.string(),
  gender: z.enum(['Male', 'Female', 'Other']),
  currentLocation: z.string(),
  currentStatus: z.enum(['Working', 'Student']),

  postGraduateInstitution: z.string(),
  postGraduateDegree: z.string(),
  programName: z.string(),
  universityName: z.string(),
  underGradInstitution: z.string(),
  underGradDegree: z.string(),

  publications: publicationSchema,
  professionalExps: professionalExpSchema
});

export type MentorFormDataType = z.infer<typeof mentorSchema>;
