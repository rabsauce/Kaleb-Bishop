'use client'

import { useState, useEffect } from 'react'
import { Upload, X, Check, Trash2, GripVertical } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'

interface GalleryPhoto {
  _key: string
  alt: string
  caption?: string
  asset: {
    _ref: string
    _type: 'reference'
  }
}

interface GalleryData {
  _id: string
  title?: string
  photos?: GalleryPhoto[]
}

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [gallery, setGallery] = useState<GalleryData | null>(null)
  const [loadingGallery, setLoadingGallery] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [reordering, setReordering] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const maxSize = 4 * 1024 * 1024 // 4MB in bytes (Vercel serverless limit is 4.5MB, using 4MB for safety)
    
    // Validate file sizes
    const validFiles: File[] = []
    const errors: string[] = []
    
    selectedFiles.forEach((file) => {
      if (file.size > maxSize) {
        errors.push(`${file.name} is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum size is 4MB.`)
      } else if (!file.type.startsWith('image/')) {
        errors.push(`${file.name} is not an image file.`)
      } else {
        validFiles.push(file)
      }
    })
    
    if (errors.length > 0) {
      setError(errors.join(' '))
    }
    
    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles])
    }
    
    if (errors.length === 0 && validFiles.length > 0) {
      setError(null)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select at least one image')
      return
    }

    setUploading(true)
    setError(null)
    const uploadedUrls: string[] = []

    try {
      for (const file of files) {
        // Create FormData
        const formData = new FormData()
        formData.append('file', file)
        formData.append('alt', file.name.replace(/\.[^/.]+$/, '')) // Use filename as alt text

        // Upload to your API route
        let response: Response
        try {
          response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })
        } catch (fetchError) {
          throw new Error(`Network error: ${fetchError instanceof Error ? fetchError.message : 'Failed to connect to server'}`)
        }

        // Handle 413 Payload Too Large specifically
        if (response.status === 413) {
          throw new Error(`File "${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum file size is 4MB due to server limits. Please compress the image or use a smaller file.`)
        }

        let responseData: any
        try {
          responseData = await response.json()
        } catch (jsonError) {
          // If we can't parse JSON, provide a helpful error based on status code
          if (response.status === 413) {
            throw new Error(`File "${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum file size is 4MB.`)
          }
          throw new Error(`Server returned invalid response (Status: ${response.status} ${response.statusText})`)
        }

        if (!response.ok) {
          throw new Error(responseData.details || responseData.error || `Server error: ${response.status} ${response.statusText}`)
        }

        if (!responseData.success) {
          throw new Error(responseData.error || 'Upload failed')
        }

        uploadedUrls.push(responseData.url || responseData.assetId)
      }

      setUploaded(uploadedUrls)
      setFiles([])
      
      // Refresh gallery immediately after successful upload
      try {
        const galleryResponse = await fetch('/api/gallery')
        if (galleryResponse.ok) {
          const galleryData = await galleryResponse.json()
          setGallery(galleryData)
        }
      } catch (galleryErr) {
        console.error('Error refreshing gallery:', galleryErr)
      }
      
      alert(`Successfully uploaded ${uploadedUrls.length} image(s)!`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      console.error('Upload error:', err)
      setError(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  // Fetch existing gallery photos
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery')
        if (response.ok) {
          const data = await response.json()
          setGallery(data)
        }
      } catch (err) {
        console.error('Error fetching gallery:', err)
      } finally {
        setLoadingGallery(false)
      }
    }
    fetchGallery()
  }, [])

  const handleDeleteClick = (photoKey: string) => {
    setDeleteConfirm(photoKey)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm || !gallery?._id) return

    const photoKeyToDelete = deleteConfirm
    setDeleting(photoKeyToDelete)
    setDeleteConfirm(null)
    try {
      const response = await fetch(`/api/gallery/delete?key=${encodeURIComponent(photoKeyToDelete)}&galleryId=${gallery._id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.details || errorData.error || 'Failed to delete photo')
      }

      // Refresh gallery
      const galleryResponse = await fetch('/api/gallery')
      if (galleryResponse.ok) {
        const data = await galleryResponse.json()
        setGallery(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete photo')
    } finally {
      setDeleting(null)
    }
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', index.toString())
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Only clear if we're leaving the element (not entering a child)
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverIndex(null)
    }
  }

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverIndex(null)

    if (draggedIndex === null || !gallery?._id || !gallery.photos) {
      setDraggedIndex(null)
      return
    }
    if (draggedIndex === dropIndex) {
      setDraggedIndex(null)
      return
    }

    setReordering(true)
    try {
      // Create new order
      const newPhotos = [...gallery.photos]
      const [moved] = newPhotos.splice(draggedIndex, 1)
      newPhotos.splice(dropIndex, 0, moved)

      const response = await fetch('/api/gallery/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          galleryId: gallery._id,
          photoKeys: newPhotos.map((p) => p._key || p.asset._ref),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to reorder photos')
      }

      // Update local state
      setGallery({ ...gallery, photos: newPhotos })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder photos')
    } finally {
      setReordering(false)
      setDraggedIndex(null)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 text-white">
          Upload Photos
        </h1>

        {/* File Input */}
        <div className="mb-8">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 4MB</p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
            />
          </label>
        </div>

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Selected Files ({files.length})
            </h2>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-900 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">IMG</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{file.name}</p>
                      <p className="text-gray-400 text-xs">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={files.length === 0 || uploading}
          className="w-full px-6 py-4 bg-accent-blue text-black font-semibold rounded-lg hover:bg-accent-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload {files.length > 0 && `${files.length} `}Photo{files.length !== 1 ? 's' : ''}
            </>
          )}
        </button>

        {/* Success Message */}
        {uploaded.length > 0 && (
          <div className="mt-6 p-4 bg-green-900/20 border border-green-500 rounded-lg">
            <div className="flex items-center gap-2 text-green-400">
              <Check className="w-5 h-5" />
              <p>Successfully uploaded {uploaded.length} image(s)!</p>
            </div>
          </div>
        )}

        {/* Existing Gallery Photos */}
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-white">
            Gallery Photos ({gallery?.photos?.length || 0})
          </h2>

          {loadingGallery ? (
            <div className="text-center py-8 text-gray-400">Loading gallery...</div>
          ) : !gallery?.photos || gallery.photos.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No photos in gallery yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.photos.map((photo, index) => {
                const imageSource = { asset: photo.asset }
                const imageUrl = urlFor(imageSource).width(600).fit('max').url()
                const isDragging = draggedIndex === index
                const isDragOver = dragOverIndex === index

                return (
                  <div
                    key={photo._key || photo.asset._ref || index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={(e) => handleDragLeave(e)}
                    onDrop={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleDrop(e, index)
                    }}
                    className={`relative group bg-gray-900 rounded-lg overflow-hidden cursor-move transition-all select-none ${
                      isDragging ? 'opacity-50 scale-95' : ''
                    } ${isDragOver ? 'ring-2 ring-accent-blue scale-105' : ''}`}
                    style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                  >
                    {/* Delete button - top right */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleDeleteClick(photo._key || photo.asset._ref)
                      }}
                      disabled={deleting === (photo._key || photo.asset._ref)}
                      className="absolute top-2 right-2 z-20 p-2 bg-red-900/90 rounded-full hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors opacity-0 group-hover:opacity-100 pointer-events-auto"
                      title="Delete"
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                      }}
                    >
                      {deleting === (photo._key || photo.asset._ref) ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <X className="w-4 h-4 text-white" />
                      )}
                    </button>

                    {/* Drag handle - top left */}
                    <div className="absolute top-2 left-2 z-10 p-2 bg-gray-800/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <GripVertical className="w-4 h-4 text-gray-300" />
                    </div>

                    <div className="relative w-full aspect-square pointer-events-none">
                      <Image
                        src={imageUrl}
                        alt={photo.alt || 'Gallery image'}
                        fill
                        className="object-contain rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        draggable={false}
                      />
                    </div>
                    {photo.alt && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-white text-xs truncate">
                        {photo.alt}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Delete Photo?</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this photo? This action cannot be undone.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting === deleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {deleting === deleteConfirm ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
