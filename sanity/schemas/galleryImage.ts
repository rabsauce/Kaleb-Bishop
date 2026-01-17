import { defineField, defineType } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Important for SEO and accessibility',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Headshot', value: 'headshot' },
          { title: 'Action', value: 'action' },
          { title: 'On Set', value: 'onset' },
          { title: 'Burn', value: 'burn' },
          { title: 'Crash', value: 'crash' },
          { title: 'Wire', value: 'wire' },
          { title: 'Driving', value: 'driving' },
          { title: 'Combat', value: 'combat' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Order (for sorting)',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
    },
    prepare({ title, media, category }) {
      return {
        title: title,
        subtitle: category ? `Category: ${category}` : '',
        media: media,
      }
    },
  },
})