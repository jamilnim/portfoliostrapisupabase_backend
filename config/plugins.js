module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'supabase', // matches your file name without extension
        providerOptions: {},
      },
    },
  });
  