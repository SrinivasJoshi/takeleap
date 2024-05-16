"use server";

import db from "@/db/db";
import { redirect } from "next/navigation";
import { mentorSchema } from "@/zod/mentorSchema";
import { menteeSchema } from "@/zod/menteeSchema";


export async function addMentor(prevState: unknown, formData: FormData) {
  const result = mentorSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
 
  await db.mentor.create({
    data: {
     name: data.name,
     gender: data.gender,
     currentLocation : data.currentLocation,
     currentStatus : data.currentStatus,

     postGraduateInstitution : data.postGraduateInstitution,
     postGraduateDegree : data.postGraduateDegree,
     programName : data.programName,
     universityName : data.universityName,
     underGradDegree: data.underGradDegree,
     underGradInstitution: data.underGradInstitution,
     
     publications : {
        create: data.publications.map(pub => ({
            title: pub.title,
            journalName: pub.journalName,
            link: pub.link
          }))
     },
     professionalExps : {
        create: data.professionalExps.map(pub => ({
            title: pub.title,
            startDate: pub.startDate,
            endDate: pub.endDate,
            companyName : pub.companyName,
            description : pub.description,
            awardsRecognition : pub.awardsRecognition,
            numberOfPromotions : pub.numberOfPromotions,
        }))
     },
    },
  });

  redirect("/dashboard");
}

export async function addMentee(prevState: unknown, formData:FormData){
  const result = menteeSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
 
  await db.mentee.create({
    data: {
      name: data.name,
      gender: data.gender,
      currentLocation : data.currentLocation,
      currentStatus : data.currentStatus,
      undergraduateGPA: data.undergraduateGPA,
      classRank: data.classRank,
      greTotalScore: data.greScore.total,
      greQuantitative: data.greScore.Q,    
      greVerbal:data.greScore.V,  
      greAWA: data.greScore.AWA,             
      toeflTotalScore: data.toeflScore.total,
      toeflSpeaking:data.toeflScore.speaking     ,
      toeflWriting:data.toeflScore.writing       ,
      toeflReading:data.toeflScore.reading      , 
      toeflListening:data.toeflScore.listening     ,
      resumeLink:data.links.resumeLink         ,
      sopLink:data.links.sop1Link  ,
      lorsLink:data.links.lor1Link ,

      academics: {
        
        
      }, 
      
      coCurriculars:{create: data.coCurricularActivites.map(pub => ({
        title: pub.title,
        organisation: pub.organisation,
        description: pub.description
      }))},
      extraCurriculars:{create: data.extraCurricularActivites.map(pub => ({
        title: pub.title,
        organisation: pub.organisation,
        description: pub.description
      }))},
      publications: {create: data.publications.map(pub => ({
        title: pub.title,
            journalName: pub.journalName,
            link: pub.link
      }))},   
      professionalExps:{create: data.professionalExps.map(pub => ({
        title: pub.title,
        startDate: pub.startDate,
        endDate: pub.endDate,
        companyName : pub.companyName,
        description : pub.description,
        awardsRecognition : pub.awardsRecognition,
        numberOfPromotions : pub.numberOfPromotions,
      }))},
    },
  });

  redirect("/dashboard");
}