import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const content = await kv.get<string>('clipboard:content');
    return NextResponse.json({ content: content || '' });
  } catch (error) {
    console.error('Error fetching clipboard:', error);
    return NextResponse.json({ content: '' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();
    await kv.set('clipboard:content', content);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving clipboard:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
