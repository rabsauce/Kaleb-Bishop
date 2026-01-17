#!/usr/bin/env python3
"""Process IMDb icon: remove all white edges, keep black icon with white text"""

from PIL import Image

def process_imdb_icon(input_path, output_path):
    """Remove all white background edges, keep only the icon content"""
    # Open the original JPG
    img = Image.open(input_path)
    
    # Convert to RGB first
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Convert to RGBA for transparency
    img_rgba = img.convert('RGBA')
    pixels = img_rgba.load()
    width, height = img_rgba.size
    
    # Strategy: Remove ALL white/light pixels at edges
    # Keep only the black icon with white text in the center
    
    # More aggressive white detection - remove anything that's very light
    white_threshold = 240  # Lower threshold to catch more white
    
    # First pass: identify and remove white background pixels
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # Check if pixel is white/very light
            is_white = r > white_threshold and g > white_threshold and b > white_threshold
            
            if is_white:
                # Check if it's likely background (at edges or isolated)
                # Calculate distance from center
                center_x, center_y = width // 2, height // 2
                dist_from_center = ((x - center_x) ** 2 + (y - center_y) ** 2) ** 0.5
                max_dist = ((width // 2) ** 2 + (height // 2) ** 2) ** 0.5
                
                # Check if at edge
                edge_margin = 100
                is_at_edge = (x < edge_margin or x > width - edge_margin or 
                             y < edge_margin or y > height - edge_margin)
                
                # Check if in corner
                corner_size = 150
                is_in_corner = ((x < corner_size and y < corner_size) or
                               (x > width - corner_size and y < corner_size) or
                               (x < corner_size and y > height - corner_size) or
                               (x > width - corner_size and y > height - corner_size))
                
                # Check if far from center (likely background)
                is_far_from_center = dist_from_center > max_dist * 0.7
                
                # Remove white pixels that are at edges, corners, or far from center
                # But keep white pixels that are near center (text)
                center_region = 300  # Region around center to preserve
                in_center_region = (abs(x - center_x) < center_region and 
                                   abs(y - center_y) < center_region)
                
                if (is_at_edge or is_in_corner or is_far_from_center) and not in_center_region:
                    pixels[x, y] = (r, g, b, 0)  # Make transparent
    
    # Second pass: remove any remaining isolated white pixels
    # Check for white pixels that are completely surrounded by transparent pixels
    for y in range(1, height - 1):
        for x in range(1, width - 1):
            r, g, b, a = pixels[x, y]
            if a > 0 and r > white_threshold and g > white_threshold and b > white_threshold:
                # Check neighbors
                transparent_neighbors = 0
                for dy in [-1, 0, 1]:
                    for dx in [-1, 0, 1]:
                        if dx == 0 and dy == 0:
                            continue
                        nr, ng, nb, na = pixels[x + dx, y + dy]
                        if na == 0:
                            transparent_neighbors += 1
                
                # If mostly surrounded by transparent, it's likely background
                if transparent_neighbors >= 6:
                    pixels[x, y] = (r, g, b, 0)
    
    # Find bounding box of non-transparent content
    bbox = img_rgba.getbbox()
    
    if bbox:
        # Crop tightly to content
        cropped = img_rgba.crop(bbox)
        
        # Save as PNG with transparency
        cropped.save(output_path, 'PNG', optimize=True)
        print(f"✓ Processed: {img.size} -> {cropped.size}")
        print(f"✓ Removed all white edges, kept icon content, saved to: {output_path}")
        return True
    else:
        print("✗ Could not find content")
        return False

if __name__ == '__main__':
    # Use the original JPG as source
    input_path = 'public/images/imdb.jpg'
    output_path = 'public/images/imdb.png'
    
    process_imdb_icon(input_path, output_path)
