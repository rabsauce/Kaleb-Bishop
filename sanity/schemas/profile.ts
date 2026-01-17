import { defineField, defineType } from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'imdbUrl',
      title: 'IMDb URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'reelUrl',
      title: 'Stunt Reel URL',
      type: 'url',
    }),
    defineField({
      name: 'flowReelUrl',
      title: 'Flow Reel URL',
      type: 'url',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        defineField({ name: 'yearsActive', title: 'Years Active', type: 'number' }),
        defineField({ name: 'credits', title: 'Credits', type: 'number' }),
        defineField({ name: 'specialties', title: 'Specialties', type: 'number' }),
        defineField({ name: 'height', title: 'Height', type: 'string' }),
        defineField({ name: 'weight', title: 'Weight', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})