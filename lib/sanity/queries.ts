// GROQ queries for fetching data from Sanity

// Profile query
export const profileQuery = `*[_type == "profile"][0]`

// Credits query (sorted by year descending, then by order)
export const creditsQuery = `
  *[_type == "credit"] | order(year desc, order asc)
`

// Gallery images query
export const galleryImagesQuery = `
  *[_type == "galleryImage"] | order(order asc) {
    _id,
    title,
    "imageUrl": image.asset->url,
    alt,
    category,
    order
  }
`

// Flow gallery images query
export const flowGalleryImagesQuery = `
  *[_type == "flowGalleryImage"] | order(order asc) {
    _id,
    title,
    "imageUrl": image.asset->url,
    alt,
    order
  }
`

// Single credit query
export const creditQuery = (id: string) => `
  *[_type == "credit" && _id == "${id}"][0]
`