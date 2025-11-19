const contentful = require('contentful');

module.exports = async (req, res) => {
  const { content_type } = req.query;

  if (!content_type) {
    return res.status(400).json({ error: 'Missing content_type parameter' });
  }

  try {
    const client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });

    const entries = await client.getEntries({
      content_type: content_type,
    });

    res.status(200).json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from Contentful' });
  }
};
