'use strict';

async function backfill() {
  const blogs = await strapi.db.query('api::blog.blog').findMany({
    populate: ['mainImage', 'subImage'],
  });

  for (const blog of blogs) {
    let updated = false;

    if (blog.mainImage && !blog.mainImageUrl) {
      blog.mainImageUrl = blog.mainImage.url.startsWith('http')
        ? blog.mainImage.url
        : process.env.PUBLIC_URL + blog.mainImage.url;
      updated = true;
    }

    if (blog.subImage && !blog.subImageUrl) {
      blog.subImageUrl = blog.subImage.url.startsWith('http')
        ? blog.subImage.url
        : process.env.PUBLIC_URL + blog.subImage.url;
      updated = true;
    }

    if (updated) {
      await strapi.db.query('api::blog.blog').update({
        where: { id: blog.id },
        data: {
          mainImageUrl: blog.mainImageUrl || null,
          subImageUrl: blog.subImageUrl || null,
        },
      });
      console.log(`Updated blog ID ${blog.id}`);
    }
  }

  console.log('✅ Backfill complete!');
}

backfill()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
