'use client'

import { useState } from 'react'
import { Upload, X, Check } from 'lucide-react'

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles((prev) => [...prev, ...selectedFiles])
    setError(null)
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
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        const data = await response.json()
        uploadedUrls.push(data.url)
      }

      setUploaded(uploadedUrls)
      setFiles([])
      alert(`Successfully uploaded ${uploadedUrls.length} image(s)!`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
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
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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
      </div>
    </div>
  )
}
