export const prerender = false;

import type { APIRoute } from 'astro';
import { submitContact, type ContactFormData } from '../../lib/api';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: ContactFormData = await request.json();

    if (!data.name || !data.email || !data.subject || !data.message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Semua field wajib diisi'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Format email tidak valid'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const result = await submitContact(data);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Terjadi kesalahan server'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
