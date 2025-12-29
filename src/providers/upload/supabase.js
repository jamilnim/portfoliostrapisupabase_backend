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
        const { error } = await supabase.storage
          .from('uploads')
          .upload(file.hash + file.ext, file.buffer, {
            contentType: file.mime,
            upsert: true,
          });

        if (error) throw error;

        // Strapi-compatible return
        return {
          url: `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${file.hash}${file.ext}`,
          name: file.name,
          hash: file.hash,
          ext: file.ext,
        };
      },

      async delete(file) {
        await supabase.storage.from('uploads').remove([file.hash + file.ext]);
      },
    };
  },
};
