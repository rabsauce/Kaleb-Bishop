// schemas/gallery.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      description: 'e.g., "Action Stunts Gallery"',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true }, // Lets editors crop/focus images
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text (SEO + accessibility)',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
})