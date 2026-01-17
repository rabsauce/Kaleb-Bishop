import { defineField, defineType } from 'sanity'

export const credit = defineType({
  name: 'credit',
  title: 'Credit',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(2100),
    }),
    defineField({
      name: 'project',
      title: 'Project',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Stunt Performer', value: 'Stunt Performer' },
          { title: 'Stunt Double', value: 'Stunt Double' },
          { title: 'Stunt Coordinator', value: 'Stunt Coordinator' },
          { title: 'Stunt Driver', value: 'Stunt Driver' },
          { title: 'Specialty Stunt', value: 'Specialty Stunt' },
          { title: 'Stunt Previs', value: 'Stunt Previs' },
          { title: 'Utility Stunts', value: 'Utility Stunts' },
          { title: 'Actor', value: 'Actor' },
          { title: 'Location Management', value: 'Location Management' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Feature Film', value: 'Feature Film' },
          { title: 'TV Series', value: 'TV Series' },
          { title: 'Streaming', value: 'Streaming' },
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Music Video', value: 'Music Video' },
          { title: 'Short', value: 'Short' },
          { title: 'TV Movie', value: 'TV Movie' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'director',
      title: 'Director',
      type: 'string',
    }),
    defineField({
      name: 'coordinator',
      title: 'Coordinator',
      type: 'string',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight (Featured Work)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order (for sorting)',
      type: 'number',
      description: 'Lower numbers appear first. Leave empty to sort by year.',
    }),
  ],
  preview: {
    select: {
      title: 'project',
      subtitle: 'role',
      year: 'year',
    },
    prepare({ title, subtitle, year }) {
      return {
        title: `${title} (${year})`,
        subtitle: subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Year, Newest',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
    {
      title: 'Year, Oldest',
      name: 'yearAsc',
      by: [{ field: 'year', direction: 'asc' }],
    },
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})