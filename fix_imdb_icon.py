#!/usr/bin/env python3
"""Process IMDb icon: ensure white text is white and remove white background"""

from PIL import Image

def process_imdb_icon(input_path, output_path):
    """Process icon to ensure white text stays white and remove background"""
    # Open the original JPG
    img = Image.open(input_path)
    
    # Convert to RGB first
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Convert to RGBA for transparency
    img_rgba = img.convert('RGBA')
    pixels = img_rgba.load()
    width, height = img_rgba.size
    
    # Strategy: 
    # 1. Identify the center area (where text is)
    # 2. Make sure white/light pixels in center are pure white (255,255,255)
    # 3. Remove white background at edges/corners
    
    center_x, center_y = width // 2, height // 2
    center_region = 400  # Region around center to consider as text area
    
    edge_size = 150  # Pixels from edge to consider as background
    corner_size = 200  # Corner region size
    white_threshold = 245  # Very white threshold
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # Check if pixel is in center region (text area)
            in_center = (abs(x - center_x) < center_region and 
                        abs(y - center_y) < center_region)
            
            # Check if pixel is very light/white
            is_very_light = r > white_threshold and g > white_threshold and b > white_threshold
            
            if is_very_light:
                if in_center:
                    # In center region - ensure it's pure white (text)
                    pixels[x, y] = (255, 255, 255, 255)
                else:
                    # Check if pixel is at edge/corner (background)
                    is_edge = (x < edge_size or x > width - edge_size or 
                              y < edge_size or y > height - edge_size)
                    
                    is_corner = ((x < corner_size and y < corner_size) or
                                (x > width - corner_size and y < corner_size) or
                                (x < corner_size and y > height - corner_size) or
                                (x > width - corner_size and y > height - corner_size))
                    
                    # Make transparent if it's at edge/corner (background)
                    if is_edge or is_corner:
                        pixels[x, y] = (r, g, b, 0)
    
    # Find bounding box of non-transparent content
    bbox = img_rgba.getbbox()
    
    if bbox:
        # Crop to content
        cropped = img_rgba.crop(bbox)
        
        # Save as PNG with transparency
        cropped.save(output_path, 'PNG', optimize=True)
        print(f"✓ Processed: {img.size} -> {cropped.size}")
        print(f"✓ Ensured white text is pure white, removed white background edges")
        return True
    else:
        print("✗ Could not find content")
        return False

if __name__ == '__main__':
    # Use the original JPG as source
    input_path = 'public/images/imdb.jpg'
    output_path = 'public/images/imdb.png'
    
    process_imdb_icon(input_path, output_path)
