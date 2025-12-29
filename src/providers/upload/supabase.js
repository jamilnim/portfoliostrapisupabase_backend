'use strict';

console.log("🔥 SUPABASE UPLOAD PROVIDER LOADED");

const { createClient } = require("@supabase/supabase-js");

module.exports = {
  init({ env }) {
    const supabase = createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"));

    return {
      async upload(file) {
        console.log("🔥 UPLOADING FILE TO SUPABASE:", file.name);

        const { error } = await supabase.storage
          .from("uploads")
          .upload(file.hash + file.ext, file.buffer, {
            contentType: file.mime,
            upsert: true,
          });

        if (error) throw error;

        // Return Strapi-compatible object
        return {
          url: `${env("SUPABASE_URL")}/storage/v1/object/public/uploads/${file.hash}${file.ext}`,
          name: file.name,
          hash: file.hash,
          ext: file.ext,
        };
      },

      async delete(file) {
        await supabase.storage.from("uploads").remove([file.hash + file.ext]);
      },
    };
  },
};
