// lib/sanity.ts
import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'your_project_id', // Replace with your Sanity project ID
  dataset: 'production', // or your dataset
  useCdn: true,
});
