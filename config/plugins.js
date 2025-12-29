module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'supabase', // ✅ must match filename supabase.js
        providerOptions: {
          supabaseUrl: env('SUPABASE_URL'),
          supabaseKey: env('SUPABASE_SERVICE_ROLE_KEY'),
          bucketName: 'uploads',
        },
      },
    },
  });
  