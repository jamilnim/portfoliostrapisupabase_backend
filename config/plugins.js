module.exports = ({ env }) => ({
    upload: {
      provider: 'upload-supabase', // your custom provider folder
      providerOptions: {
        SUPABASE_URL: env('SUPABASE_URL'),
        SUPABASE_SERVICE_ROLE_KEY: env('SUPABASE_SERVICE_ROLE_KEY'),
        bucket: 'strapi-uploads',
      },
    },
  });
  