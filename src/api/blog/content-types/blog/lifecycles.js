module.exports = {
    async beforeCreate(event) {
      await syncImageUrls(event);
    },
  
    async beforeUpdate(event) {
      await syncImageUrls(event);
    },
  };
  
  async function syncImageUrls(event) {
    const data = event.params.data;
  
    // MAIN IMAGE
    if (data.mainImage?.connect?.length) {
      const fileId = data.mainImage.connect[0].id;
  
      const file = await strapi.db
        .query('plugin::upload.file')
        .findOne({ where: { id: fileId } });
  
      if (file?.url) {
        data.mainImageUrl = file.url.startsWith('http')
          ? file.url
          : `${strapi.config.get('server.url')}${file.url}`;
      }
    }
  
    // SUB IMAGE
    if (data.subImage?.connect?.length) {
      const fileId = data.subImage.connect[0].id;
  
      const file = await strapi.db
        .query('plugin::upload.file')
        .findOne({ where: { id: fileId } });
  
      if (file?.url) {
        data.subImageUrl = file.url.startsWith('http')
          ? file.url
          : `${strapi.config.get('server.url')}${file.url}`;
      }
    }
  }
  