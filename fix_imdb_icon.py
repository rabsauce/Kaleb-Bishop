#!/usr/bin/env python3
"""Process IMDb icon: remove white background but preserve white text"""

from PIL import Image

def process_imdb_icon(input_path, output_path):
    """Remove white background edges but preserve white text content"""
    # Open the original JPG
    img = Image.open(input_path)
    
    # Convert to RGB first
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Convert to RGBA for transparency
    img_rgba = img.convert('RGBA')
    pixels = img_rgba.load()
    width, height = img_rgba.size
    
    # Strategy: Only remove white pixels that are clearly background
    # Background white is usually at edges/corners and isolated
    # White text is usually in the center and surrounded by colored (yellow) background
    
    # Process: Only make transparent if pixel is:
    # 1. Very white (RGB > 245) AND
    # 2. At the edges/corners (background area)
    
    edge_size = 150  # Pixels from edge to consider as background
    corner_size = 200  # Corner region size
    white_threshold = 245  # Very white threshold
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # Check if pixel is very white
            is_very_white = r > white_threshold and g > white_threshold and b > white_threshold
            
            if is_very_white:
                # Check if pixel is at edge
                is_edge = (x < edge_size or x > width - edge_size or 
                          y < edge_size or y > height - edge_size)
                
                # Check if pixel is in corner region
                is_corner = ((x < corner_size and y < corner_size) or
                            (x > width - corner_size and y < corner_size) or
                            (x < corner_size and y > height - corner_size) or
                            (x > width - corner_size and y > height - corner_size))
                
                # Only make transparent if it's at edge/corner (background)
                # Keep white pixels in center area (text)
                if is_edge or is_corner:
                    pixels[x, y] = (r, g, b, 0)
                # Otherwise, keep the white pixel (it's part of the text)
    
    # Find bounding box of non-transparent content
    bbox = img_rgba.getbbox()
    
    if bbox:
        # Crop to content
        cropped = img_rgba.crop(bbox)
        
        # Save as PNG with transparency
        cropped.save(output_path, 'PNG', optimize=True)
        print(f"✓ Processed: {img.size} -> {cropped.size}")
        print(f"✓ Preserved white text, removed white background edges, saved to: {output_path}")
        return True
    else:
        print("✗ Could not find content")
        return False

if __name__ == '__main__':
    # Use the original JPG as source
    input_path = 'public/images/imdb.jpg'
    output_path = 'public/images/imdb.png'
    
    process_imdb_icon(input_path, output_path)
