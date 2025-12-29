'use strict';

const { createClient } = require('@supabase/supabase-js');
const path = require('path');

module.exports = {
  init(config) {
    const supabase = createClient(
      config.supabaseUrl,
      config.supabaseServiceRoleKey
    );

    return {
      async upload(file) {
        const ext = path.extname(file.name);
        const filePath = `${Date.now()}-${file.hash}${ext}`;

        const { error } = await supabase.storage
          .from('uploads') // ✅ your bucket name
          .upload(filePath, file.buffer, {
            contentType: file.mime,
            upsert: true,
          });

        if (error) {
          console.error('❌ Supabase upload error:', error);
          throw error;
        }

        // ✅ REQUIRED: mutate file object so Strapi saves it
        file.url = `${config.supabaseUrl}/storage/v1/object/public/uploads/${filePath}`;
        file.provider = 'supabase';
        file.provider_metadata = {
          bucket: 'uploads',
          path: filePath,
        };
      },

      async delete(file) {
        if (!file.provider_metadata?.path) return;

        await supabase.storage
          .from('uploads')
          .remove([file.provider_metadata.path]);
      },
    };
  },
};
