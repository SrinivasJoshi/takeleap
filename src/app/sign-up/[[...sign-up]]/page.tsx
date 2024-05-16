"use client"
import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from "@/components/ui/label";

import { Input } from '@/components/ui/input';
import { AtSign } from 'lucide-react';

export default function CustomSignUp() {
  const [role, setRole] = useState('MENTEE');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp } = useSignUp();
  const router = useRouter();

  const handleSignUp = async (event:any) => {
    event.preventDefault();
    if (!signUp) {
      console.error('SignUp instance not available');
      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        password,
        unsafeMetadata: { role },
      });
      await signUp.prepareEmailAddressVerification();
      router.push('/complete-profile');
    } catch (err) {
      console.error('Error signing up:', err);
    }
  };

  const handleOAuthSignUp = async () => {
    if (!signUp) {
      console.error('SignUp instance not available');
      return;
    }

    try {
      await signUp.create({
        strategy: 'oauth_google',
        unsafeMetadata: { role },
        redirectUrl:'/complete-profile'
      });
      await signUp.prepareVerification({ strategy : 'oauth_google', redirectUrl:'/complete-profile'});

    } catch (err) {
      console.error('Error signing up with OAuth:', err);
    }
  };

  return (
    <form onSubmit={handleSignUp} className='flex flex-col items-start justify-evenly w-1/5 mx-auto h-[500px]'>
      <h2 className='text-3xl font-bold self-center'>Sign Up</h2>

      <div className='flex flex-col items-start justify-evenly' >
      <Label htmlFor="role" className='mb-4'>Sign up as</Label>
      <Select onValueChange={(value) => setRole(value)} defaultValue={role}>
        <SelectTrigger>
          <span>{role === 'MENTOR' ? 'Mentor' : 'Mentee'}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="MENTOR">Mentor</SelectItem>
          <SelectItem value="MENTEE">Mentee</SelectItem>
        </SelectContent>
      </Select>
      </div>

      <div className="my-1 border-t-2 border-gray-300 w-full"></div>

      <div>
      <Label htmlFor="email">Email</Label>
      <Input type="text" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
      </div>

      {/* Email and Password fields if using email/password sign-up */}
      <Button type="submit">Sign Up with Email</Button>

      <div className="my-2 border-t-2 border-gray-300 w-full"></div>

      <Button type="button" className='w-full' onClick={handleOAuthSignUp}><AtSign size={15}/>  Sign Up with Gmail</Button>
    </form>
  );
};
