#!/usr/bin/env python3
"""Process IMDb icon: aggressively remove all white edges, keep only icon content"""

from PIL import Image

def process_imdb_icon(input_path, output_path):
    """Remove ALL white background, keep only the black icon with white text"""
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
    # 1. Find the main content area (black icon with yellow background)
    # 2. Remove all white pixels outside this area
    # 3. Keep white pixels only if they're part of text (surrounded by colored pixels)
    
    center_x, center_y = width // 2, height // 2
    
    # First, identify the main icon area by finding colored (non-white) pixels
    # The icon has a yellow/orange background with black and white elements
    colored_pixels = []
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y][:3]
            # Not white/very light
            if not (r > 240 and g > 240 and b > 240):
                colored_pixels.append((x, y))
    
    if not colored_pixels:
        print("✗ No colored content found")
        return False
    
    # Find bounding box of colored content
    min_x = min(p[0] for p in colored_pixels)
    max_x = max(p[0] for p in colored_pixels)
    min_y = min(p[1] for p in colored_pixels)
    max_y = max(p[1] for p in colored_pixels)
    
    print(f"Content bounds: ({min_x}, {min_y}) to ({max_x}, {max_y})")
    
    # Now process: remove white pixels that are clearly background
    white_threshold = 240
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # Check if pixel is white/very light
            is_white = r > white_threshold and g > white_threshold and b > white_threshold
            
            if is_white:
                # Check if pixel is within the content bounds
                in_content_area = (min_x <= x <= max_x and min_y <= y <= max_y)
                
                if not in_content_area:
                    # Outside content area - definitely background, make transparent
                    pixels[x, y] = (r, g, b, 0)
                else:
                    # Inside content area - check if it's text or background
                    # White text should be surrounded by colored pixels
                    has_colored_neighbor = False
                    for dy in [-2, -1, 0, 1, 2]:
                        for dx in [-2, -1, 0, 1, 2]:
                            if dx == 0 and dy == 0:
                                continue
                            nx, ny = x + dx, y + dy
                            if 0 <= nx < width and 0 <= ny < height:
                                nr, ng, nb, na = pixels[nx, ny]
                                # Check if neighbor is colored (not white/transparent)
                                if na > 0 and not (nr > 240 and ng > 240 and nb > 240):
                                    has_colored_neighbor = True
                                    break
                        if has_colored_neighbor:
                            break
                    
                    # If white pixel has no colored neighbors, it's likely background
                    if not has_colored_neighbor:
                        pixels[x, y] = (r, g, b, 0)
    
    # Additional pass: remove white pixels at the very edges of content area
    edge_margin = 20
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a > 0 and r > white_threshold and g > white_threshold and b > white_threshold:
                # Check if near edge of content bounds
                near_edge = (x < min_x + edge_margin or x > max_x - edge_margin or
                            y < min_y + edge_margin or y > max_y - edge_margin)
                if near_edge:
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
