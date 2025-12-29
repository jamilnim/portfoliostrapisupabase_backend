'use strict';

const { createClient } = require('@supabase/supabase-js');

module.exports = ({ env }) => {
  const supabase = createClient(
    env('SUPABASE_URL'),
    env('SUPABASE_SERVICE_ROLE_KEY')
  );

  return {
    upload: async (file) => {
      const { data, error } = await supabase.storage
        .from('strapi-uploads')
        .upload(file.name, file.buffer, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.mime
        });

      if (error) throw error;

      // Return Strapi-compatible response
      return {
        url: `${env('SUPABASE_URL')}/storage/v1/object/public/strapi-uploads/${file.name}`,
      };
    },

    delete: async (file) => {
      const { error } = await supabase.storage
        .from('strapi-uploads')
        .remove([file.name]);

      if (error) throw error;
    },
  };
};
