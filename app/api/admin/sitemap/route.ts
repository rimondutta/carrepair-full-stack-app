import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Revalidate the Next.js sitemap cache
    revalidatePath('/sitemap.xml');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Sitemap cache revalidated successfully.' 
    });
  } catch (error) {
    console.error('Failed to trigger sitemap revalidation:', error);
    return NextResponse.json({ error: 'Failed to update sitemap.' }, { status: 500 });
  }
}
