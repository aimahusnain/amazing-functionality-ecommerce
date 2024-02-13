// src/app/api/auth/[...nextauth]/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

import { authOptions } from '@/lib/auth'; // Adjust the path as needed

// Ensure the exported default function is named `handler`
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Pass the request, response, and authentication options to NextAuth
  await NextAuth(req, res, authOptions);
}
