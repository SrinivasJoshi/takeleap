"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormState, useFormStatus } from "react-dom";
import { addMentor } from "../_actions/mentors";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2Icon } from "lucide-react";
import {professionalExpSchema} from '@/zod/mentorSchema';
import { z } from "zod";
import { DatePicker } from "@/components/extras/DatePicker";
import { Textarea } from "@/components/ui/textarea";

export type ProfessionalExperience = z.infer<typeof professionalExpSchema>[number];

let emptyExperience: ProfessionalExperience = {
  title:'',
  startDate: new Date(),
  endDate: undefined,
  companyName : '',
  description : '',
  awardsRecognition : undefined,
  numberOfPromotions : undefined,
}

export default function MentorForm() {
  const [error, action] = useFormState(addMentor, {});
  const [step, setStep] = useState(0);
  const [publications, setPublications] = useState([{ title: '', journalName: '', link: '' }]);
  const [experience, setExperience] = useState([emptyExperience]);

  const handlePublicationChange = (index:number, field:'title'|'journalName'|'link', value:string) => {
    const newPublications = [...publications];
    newPublications[index][field] = value;
    setPublications(newPublications);
  };

  // Assuming error is structured with paths like "publications[0].title"
  const getPublicationError = (index: number, field: number): string | undefined => {
    // Directly access nested error messages
    return error.publications && error.publications[index] && error.publications[index][field];
  };
  
  const addPublication = () => {
    setPublications([...publications, { title: '', journalName: '', link: '' }]);
  };

  const deletePublication = (index: number) => {
    if(index===0){
      alert('Cannot delete!');
      return;
    }
    setPublications(publications.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index:number, field:  keyof ProfessionalExperience , value:string | Date | number) => {
    const newExperience = [...experience];
    (newExperience[index] as any)[field] = value;
    setExperience(newExperience);
  };

  // Assuming error is structured with paths like "publications[0].title"
  const getExperienceError = (index: number, field: number): string | undefined => {
    // Directly access nested error messages
    return error.professionalExps && error.professionalExps[index] && error.professionalExps[index][field];
  };
  
  const addExperience = () => {
    setExperience([...experience, emptyExperience]);
  };

  const deleteExperience = (index: number) => {
    if(index===0){
      alert('Cannot delete!');
      return;
    }
    setExperience(experience.filter((_, i) => i !== index));
  };

  const handleStepNext = () => {
    setStep((step) => step+1);
  }

  const handleStepBack = () => {
    setStep((step) => step-1);
  }

  return (
    <div className="flex flex-col items-center pt-10">
      <h2 className="text-4xl mb-4">Mentor Form</h2>
    <form action={action} className="space-y-4 w-2/5">
      {step === 0 && 
      <>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className="space-y-2">
        <Select name="gender">
          <Label htmlFor="gender">Gender</Label>
          <SelectTrigger className="w-[350px]">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Genders</SelectLabel>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {error && error.gender && <div className="text-destructive">{error.gender}</div>}
      </div>

      <div>
        <Label htmlFor="currentLocation">Current Location</Label>
        <Input type="text" id="currentLocation" name="currentLocation" required />
        {error.currentLocation && <div className="text-destructive">{error.currentLocation}</div>}
      </div>

      <div className="space-y-2">
        <Select name="currentStatus">
          <Label htmlFor="currentStatus">Current Status</Label>
          <SelectTrigger className="w-[350px]">
            <SelectValue placeholder="Select Current Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Working">Working</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {error && error.currentStatus && <div className="text-destructive">{error.currentStatus}</div>}
      </div>

      </>
      }

      { step ===1 && 
      <>
        <div>
          <Label htmlFor="postGraduateInstitution">Post Graduate Institution</Label>
          <Input type="text" id="postGraduateInstitution" name="postGraduateInstitution" required />
          {error.postGraduateInstitution && <div className="text-destructive">{error.postGraduateInstitution}</div>}
        </div>

        <div>
          <Label htmlFor="postGraduateDegree">Post Graduate Degree</Label>
          <Input type="text" id="postGraduateDegree" name="postGraduateDegree" required />
          {error.postGraduateDegree && <div className="text-destructive">{error.postGraduateDegree}</div>}
        </div>

      <div>
        <Label htmlFor="programName">Program Name</Label>
        <Input type="text" id="programName" name="programName" required />
        {error.programName && <div className="text-destructive">{error.programName}</div>}
      </div>

      <div>
        <Label htmlFor="universityName">University Name</Label>
        <Input type="text" id="universityName" name="universityName" required />
        {error.universityName && <div className="text-destructive">{error.universityName}</div>}
      </div>

      <div>
        <Label htmlFor="underGradInstitution">Undergraduate Institution</Label>
        <Input type="text" id="underGradInstitution" name="underGradInstitution" required />
        {error.underGradInstitution && <div className="text-destructive">{error.underGradInstitution}</div>}
      </div>

      <div>
        <Label htmlFor="underGradDegree">Undergraduate Degree</Label>
        <Input type="text" id="underGradDegree" name="underGradDegree" required />
        {error.underGradDegree && <div className="text-destructive">{error.underGradDegree}</div>}
      </div>
      </>
      }

      {
        step === 2 &&
        <>
        <h3 className="text-2xl mb-4">Publications</h3>
       
        <div className="max-h-[700px] overflow-y-auto py-2 px-4 border border-gray-300 rounded-sm">
        {publications.map((pub, index) => (
          <div key={index} className="my-10">
            <Label htmlFor={`title-${index}`}>Title</Label>
            <Input type="text" id={`title-${index}`} name={`title-${index}`} value={pub.title} onChange={e => handlePublicationChange(index, 'title', e.target.value)} required />
            <div className="text-destructive">{getPublicationError(index,0)}</div>

            <Label htmlFor={`journalName-${index}`}>Journal Name</Label>
            <Input type="text" id={`journalName-${index}`} name={`journalName-${index}`} value={pub.journalName} onChange={e => handlePublicationChange(index, 'journalName', e.target.value)} required />
            <div className="text-destructive">{getPublicationError(index, 1)}</div>

            <Label htmlFor={`link-${index}`}>Link (Optional)</Label>
            <Input type="text" id={`link-${index}`} name={`link-${index}`} value={pub.link} onChange={e => handlePublicationChange(index, 'link', e.target.value)} />
            <div className="text-destructive">{getPublicationError(index,2)}</div>

            <Trash2Icon onClick={() => deletePublication(index)} className="mt-5" />
          </div>
        ))}
        </div>

        <Button onClick={addPublication}>Add More</Button>
        </>
      }

      {
        step === 3 &&
        <>
        <h3 className="text-2xl mb-4">Professional Experience</h3>
       
        <div className="max-h-[700px] overflow-y-auto py-2 px-4 border border-gray-300 rounded-sm">
        {experience.map((exp, index) => (
          <div key={index} className="my-10">
            <Label htmlFor={`title-${index}`}>Title</Label>
            <Input type="text" id={`title-${index}`} name={`title-${index}`} value={exp.title} onChange={e => handleExperienceChange(index, 'title', e.target.value)} required />
            <div className="text-destructive">{getExperienceError(index,0)}</div>

            <Label htmlFor={`startDate-${index}`}>Start Date</Label>
            <DatePicker handleExperienceChange={handleExperienceChange} index={index} field="startDate" />
            <div className="text-destructive">{getExperienceError(index, 1)}</div>

            <Label htmlFor={`endDate-${index}`}>End Date (Optional)</Label>
            <DatePicker handleExperienceChange={handleExperienceChange} index={index} field="endDate" />
            <div className="text-destructive">{getExperienceError(index, 2)}</div>

            <Label htmlFor={`companyName-${index}`}>Company Name</Label>
            <Input type="text" id={`companyName-${index}`} name={`companyName-${index}`} value={exp.companyName} onChange={e => handleExperienceChange(index, 'companyName', e.target.value)} required />
            <div className="text-destructive">{getExperienceError(index, 3)}</div>

            <Label htmlFor={`description-${index}`}>Description</Label>
            <Textarea placeholder="Your description here..." id={`description-${index}`} name={`description-${index}`} value={exp.description} onChange={e => handleExperienceChange(index, 'description', e.target.value)} required />
            <div className="text-destructive">{getExperienceError(index, 4)}</div>

            <Label htmlFor={`awardsRecognition-${index}`}>Awards / Recognition (Optional)</Label>
            <Input type="text" id={`awardsRecognition-${index}`} name={`awardsRecognition-${index}`} value={exp.awardsRecognition} onChange={e => handleExperienceChange(index, 'awardsRecognition', e.target.value)}  />
            <div className="text-destructive">{getExperienceError(index, 5)}</div>

            <Label htmlFor={`numberOfPromotions-${index}`}>Number of Promotions (Optional)</Label>
            <Input type="number" id={`numberOfPromotions-${index}`} name={`numberOfPromotions-${index}`} value={exp.numberOfPromotions} onChange={e => handleExperienceChange(index, 'numberOfPromotions', e.target.value)}  />
            <div className="text-destructive">{getExperienceError(index, 6)}</div>

            <Trash2Icon onClick={() => deleteExperience(index)} className="mt-5" />
          </div>
        ))}
        </div>

        <Button onClick={addExperience}>Add More</Button>
        </>
      }

      <div className="flex justify-between items-center">
      <Button onClick={handleStepBack} disabled={step===0}> Back </Button>
      {step === 3 ? <SubmitButton /> : <Button onClick={handleStepNext}> Next </Button>}
      </div>

    </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}
