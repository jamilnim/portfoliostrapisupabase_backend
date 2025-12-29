'use strict';

const { createClient } = require('@supabase/supabase-js');

module.exports = {
  init() {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    return {
      async upload(file) {
        const fileName = file.hash + file.ext;

        // Convert file.stream or buffer to ArrayBuffer for Supabase
        let fileData;
        if (file.buffer) {
          fileData = file.buffer;
        } else if (file.stream) {
          fileData = await streamToBuffer(file.stream);
        } else {
          throw new Error('No file data found for upload');
        }

        const { error } = await supabase.storage
          .from('uploads')
          .upload(fileName, fileData, {
            contentType: file.mime,
            upsert: true,
          });

        if (error) throw error;

        return {
          name: file.name,
          hash: file.hash,
          ext: file.ext,
          mime: file.mime,
          size: file.size,
          url: `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`,
        };
      },

      async delete(file) {
        const fileName = file.hash + file.ext;
        const { error } = await supabase.storage.from('uploads').remove([fileName]);
        if (error) throw error;
      },
    };
  },
};

// Helper: convert stream to buffer
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}
