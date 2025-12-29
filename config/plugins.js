module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'supabase',
        providerOptions: {
          supabaseUrl: env('SUPABASE_URL'),
          supabaseKey: env('SUPABASE_ANON_KEY'),
          bucket: 'uploads',
        },
      },
    },
  });
  