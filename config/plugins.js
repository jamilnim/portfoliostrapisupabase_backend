module.exports = ({ env }) => ({
    // Upload plugin
    upload: {
      config: {
        provider: "supabase",
        providerOptions: {
          url: env("SUPABASE_URL"),
          key: env("SUPABASE_SERVICE_ROLE_KEY"),
          bucket: env("SUPABASE_BUCKET", "uploads"),
        },
      },
    },
  });
  