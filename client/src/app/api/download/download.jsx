import { NextResponse } from 'next/server';

export async function GET(request) {
  // Extract the file name from the query parameters
  const url = request.url; // or use URL constructor if you need more control
  const fileName = new URL(url).searchParams.get('file');

  if (!fileName) {
    return NextResponse.json({ error: 'File name is required' }, { status: 400 });
  }

  // Construct the Cloudinary URL (replace with your Cloudinary cloud name and file path)
  const cloudinaryUrl = `https://res.cloudinary.com/pm/c-406746aa8ba31cb28e42c659bc5f74/media-explorer/pdfs/${fileName}`;

  return NextResponse.redirect(cloudinaryUrl);
}
