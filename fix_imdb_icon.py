#!/usr/bin/env python3
"""Remove white corners from IMDb icon and optimize"""

from PIL import Image

def remove_white_corners_and_optimize(input_path, output_path):
    """Remove white pixels and optimize the icon"""
    # Open the image
    img = Image.open(input_path)
    
    # Convert to RGBA if not already
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Get pixel data
    pixels = img.load()
    width, height = img.size
    
    # More aggressive white threshold - remove very light pixels
    white_threshold = 220  # Lower threshold to catch more white/light pixels
    
    # Process each pixel - make white/light pixels transparent
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # If pixel is white/light, make it transparent
            # Check if it's close to white (high values in all channels)
            if r > white_threshold and g > white_threshold and b > white_threshold:
                pixels[x, y] = (r, g, b, 0)  # Set alpha to 0
    
    # Additional pass: remove isolated white pixels in corners
    # Check corner regions more aggressively
    corner_size = min(50, width // 10, height // 10)  # Check corners
    
    # Top-left corner
    for y in range(corner_size):
        for x in range(corner_size):
            r, g, b, a = pixels[x, y]
            if r > 200 or g > 200 or b > 200:  # Very aggressive in corners
                pixels[x, y] = (r, g, b, 0)
    
    # Top-right corner
    for y in range(corner_size):
        for x in range(width - corner_size, width):
            r, g, b, a = pixels[x, y]
            if r > 200 or g > 200 or b > 200:
                pixels[x, y] = (r, g, b, 0)
    
    # Bottom-left corner
    for y in range(height - corner_size, height):
        for x in range(corner_size):
            r, g, b, a = pixels[x, y]
            if r > 200 or g > 200 or b > 200:
                pixels[x, y] = (r, g, b, 0)
    
    # Bottom-right corner
    for y in range(height - corner_size, height):
        for x in range(width - corner_size, width):
            r, g, b, a = pixels[x, y]
            if r > 200 or g > 200 or b > 200:
                pixels[x, y] = (r, g, b, 0)
    
    # Find the bounding box of non-transparent content
    bbox = img.getbbox()
    
    if bbox:
        # Crop to content
        cropped = img.crop(bbox)
        
        # Save as PNG with transparency
        cropped.save(output_path, 'PNG', optimize=True)
        print(f"✓ Processed: {img.size} -> {cropped.size}")
        print(f"✓ Removed white corners aggressively, saved to: {output_path}")
        return True
    else:
        print("✗ Could not find content")
        return False

if __name__ == '__main__':
    # Use the original JPG as source
    input_path = 'public/images/imdb.jpg'
    output_path = 'public/images/imdb.png'
    
    remove_white_corners_and_optimize(input_path, output_path)
