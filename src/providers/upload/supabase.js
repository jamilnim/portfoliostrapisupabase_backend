'use strict';

const { createClient } = require('@supabase/supabase-js');

module.exports = {
  init(providerOptions) {
    const supabase = createClient(
      providerOptions.supabaseUrl,
      providerOptions.supabaseKey
    );

    const bucket = providerOptions.bucket || 'uploads';

    return {
      async upload(file) {
        const fileName = `${file.hash}${file.ext}`;

        const fileData = file.buffer
          ? file.buffer
          : await streamToBuffer(file.stream);

        const { error } = await supabase.storage
          .from(bucket)
          .upload(fileName, fileData, {
            contentType: file.mime,
            upsert: true,
          });

        if (error) {
          console.error('Supabase upload error:', error);
          throw error;
        }

        file.url = `${providerOptions.supabaseUrl}/storage/v1/object/public/${bucket}/${fileName}`;
      },

      async delete(file) {
        const fileName = `${file.hash}${file.ext}`;
        await supabase.storage.from(bucket).remove([fileName]);
      },
    };
  },
};

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}
