module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'custom',
        providerOptions: {
          path: './src/providers/upload/supabase.js',
        },
      },
    },
  });
  