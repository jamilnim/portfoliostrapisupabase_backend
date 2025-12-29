module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'upload-supabase',
        providerOptions: {
          supabaseUrl: env('SUPABASE_URL'),
          supabaseServiceRoleKey: env('SUPABASE_SERVICE_ROLE_KEY'),
        },
      },
    },
  });
  