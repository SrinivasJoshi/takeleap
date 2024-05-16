import { z } from 'zod';
import { professionalExpSchema, publicationSchema } from './mentorSchema';

const greScoreSchema = z.object({
    Q : z.number(),
    V : z.number(),
    AWA : z.number(),
    total : z.number(),
}).refine(data => data.total === data.Q + data.V + data.AWA, {
    message: "Total must be the sum of Q, V, and AWA",
    path: ["total"],
});

const toeflScoreSchema = z.object({
    speaking : z.number(),
    writing : z.number(),
    listening : z.number(),
    reading : z.number(),
    total : z.number(),
}).refine(data => data.total === data.speaking + data.writing + data.listening + data.reading, {
    message: "Total must be the sum of Speaking, Writing, Listening and Reading",
    path: ["total"],
});

const acedemicSchema = z.object({
    underGradInstitution:z.string(),
    underGradDegree: z.string(),
    majorBranch: z.string(),
    minors: z.string().optional(),
    gpa : z.number().min(0).max(4),
    courseWorks : z.array(z.object({
        courseName:z.string(),
        courseGrade:z.string(),
    }))
});

const activitiesSchema = z.array(z.object({
    title: z.string().min(1, "Title is required"),
    organisation: z.string(),
    description: z.string(),
  }));

const linksScheme = z.object({
    resumeLink : z.string().url(),
    sop1Link : z.string().url(),
    lor1Link : z.string().url(),
})

// Combine all schemas for final submission
export const menteeSchema = z.object({
  name: z.string(),
  gender: z.enum(['Male', 'Female', 'Other']),
  currentLocation: z.string(),
  currentStatus: z.enum(['Working', 'Student']),
  undergraduateGPA: z.number().min(0).max(4),
  classRank: z.number(),
  greScore: greScoreSchema, 
  toeflScore: toeflScoreSchema,

  academics : acedemicSchema,

  publications: publicationSchema,

  coCurricularActivites : activitiesSchema,

  extraCurricularActivites : activitiesSchema,

  professionalExps: professionalExpSchema,
  
  links:linksScheme,
});

export type MenteeFormDataType = z.infer<typeof menteeSchema>;
