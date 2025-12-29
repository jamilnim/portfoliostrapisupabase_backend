module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'local',
        providerOptions: {
          path: './src/providers/upload/supabase.js',
        },
      },
    },
  });
  