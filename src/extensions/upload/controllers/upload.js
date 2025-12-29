'use strict';

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = {
  async upload(ctx) {
    const files = ctx.request.files?.files;

    if (!files) {
      return ctx.badRequest('No file uploaded');
    }

    const fileArray = Array.isArray(files) ? files : [files];
    const uploadedFiles = [];

    for (const file of fileArray) {
      const fileStream = fs.createReadStream(file.path);
      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from('uploads')
        .upload(fileName, fileStream, {
          contentType: file.type,
          upsert: true,
        });

      if (error) {
        throw error;
      }

      const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;

      uploadedFiles.push({
        name: file.name,
        url: publicUrl,
        mime: file.type,
        size: file.size,
      });
    }

    ctx.body = uploadedFiles;
  },
};
