import { createClient } from '@supabase/supabase-js';
import stream from 'stream';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (chunk) => chunks.push(chunk));
    readableStream.on('end', () => resolve(Buffer.concat(chunks)));
    readableStream.on('error', reject);
  });
}

export async function uploadFile(ctx) {
  const { files } = ctx.request.files;

  const file = Array.isArray(files) ? files[0] : files; // single file
  const fileName = `${Date.now()}_${file.name}`;
  
  let fileBuffer;
  if (file.buffer) {
    fileBuffer = file.buffer;
  } else if (file.stream) {
    fileBuffer = await streamToBuffer(file.stream);
  } else {
    ctx.throw(400, "No file data found");
  }

  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(fileName, fileBuffer, {
      contentType: file.type,
      upsert: true
    });

  if (error) ctx.throw(500, error.message);

  // Return full public URL
  const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;

  return { url: publicUrl, name: fileName };
}
