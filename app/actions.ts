'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createClient } from '@/lib/supabase-server';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().optional(),
  role: z.enum(['buyer', 'seller', 'broker']).optional()
});

const boatSchema = z.object({
  title: z.string().min(6),
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.coerce.number().int().min(1900).max(new Date().getFullYear() + 1).nullable().optional(),
  price_gbp: z.coerce.number().int().positive().nullable().optional(),
  length_ft: z.coerce.number().positive().nullable().optional(),
  beam_ft: z.coerce.number().positive().nullable().optional(),
  draft_ft: z.coerce.number().positive().nullable().optional(),
  location: z.string().min(2),
  country: z.string().default('United Kingdom'),
  category: z.string().min(2),
  fuel_type: z.string().optional(),
  engine_summary: z.string().optional(),
  engine_hours: z.coerce.number().int().nonnegative().nullable().optional(),
  description: z.string().min(30),
  main_image_url: z.string().url().nullable().optional()
});

function nullableNumber(value: FormDataEntryValue | null) {
  if (value === null || value === '') return null;
  return value;
}

export async function signUp(formData: FormData) {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
    full_name: formData.get('full_name')?.toString(),
    role: formData.get('role')?.toString() || 'buyer'
  });
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: { full_name: data.full_name, role: data.role }
    }
  });
  if (error) redirect(`/auth?error=${encodeURIComponent(error.message)}`);
  redirect('/dashboard');
}

export async function signIn(formData: FormData) {
  const data = authSchema.pick({ email: true, password: true }).parse({
    email: formData.get('email'),
    password: formData.get('password')
  });
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) redirect(`/auth?error=${encodeURIComponent(error.message)}`);
  redirect('/dashboard');
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/');
}

export async function createBoat(formData: FormData) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect('/auth');

  const parsed = boatSchema.parse({
    title: formData.get('title'),
    make: formData.get('make'),
    model: formData.get('model'),
    year: nullableNumber(formData.get('year')),
    price_gbp: nullableNumber(formData.get('price_gbp')),
    length_ft: nullableNumber(formData.get('length_ft')),
    beam_ft: nullableNumber(formData.get('beam_ft')),
    draft_ft: nullableNumber(formData.get('draft_ft')),
    location: formData.get('location'),
    country: formData.get('country') || 'United Kingdom',
    category: formData.get('category'),
    fuel_type: formData.get('fuel_type')?.toString(),
    engine_summary: formData.get('engine_summary')?.toString(),
    engine_hours: nullableNumber(formData.get('engine_hours')),
    description: formData.get('description'),
    main_image_url: formData.get('main_image_url') || null
  });

  const { error } = await supabase.from('boats').insert({
    ...parsed,
    owner_id: userData.user.id,
    status: 'pending'
  });

  if (error) redirect(`/sell?error=${encodeURIComponent(error.message)}`);
  revalidatePath('/dashboard');
  redirect('/dashboard?created=1');
}

export async function approveBoat(formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id')?.toString();
  const status = formData.get('status')?.toString();
  if (!id || !['approved', 'rejected', 'sold'].includes(status || '')) return;

  await supabase.from('boats').update({ status }).eq('id', id);
  revalidatePath('/admin');
}

export async function createEnquiry(formData: FormData) {
  const supabase = createClient();
  const boat_id = formData.get('boat_id')?.toString();
  const message = formData.get('message')?.toString();
  const email = formData.get('email')?.toString();
  const name = formData.get('name')?.toString();
  if (!boat_id || !message || !email) return;
  await supabase.from('enquiries').insert({ boat_id, message, email, name });
  revalidatePath(`/boats/${boat_id}`);
}
