#!/usr/bin/env python3
"""Process both imdb and imdb2: create rounded buttons with white text, remove square edges"""

from PIL import Image, ImageDraw
import math

def create_rounded_button(input_path, output_path, button_name):
    """Process image to create rounded button with white IMDb text"""
    # Open image
    img = Image.open(input_path)
    
    # Convert to RGB first
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Convert to RGBA for transparency
    img_rgba = img.convert('RGBA')
    pixels = img_rgba.load()
    width, height = img_rgba.size
    
    center_x, center_y = width // 2, height // 2
    
    # Step 1: Find the main icon content (colored pixels, not white background)
    colored_pixels = []
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y][:3]
            # Not white/very light background
            if not (r > 240 and g > 240 and b > 240):
                colored_pixels.append((x, y))
    
    if not colored_pixels:
        print(f"✗ {button_name}: No colored content found")
        return False
    
    # Find content bounds
    min_x = min(p[0] for p in colored_pixels)
    max_x = max(p[0] for p in colored_pixels)
    min_y = min(p[1] for p in colored_pixels)
    max_y = max(p[1] for p in colored_pixels)
    
    content_width = max_x - min_x
    content_height = max_y - min_y
    content_center_x = (min_x + max_x) // 2
    content_center_y = (min_y + max_y) // 2
    
    print(f"{button_name}: Content bounds: ({min_x}, {min_y}) to ({max_x}, {max_y})")
    print(f"{button_name}: Content size: {content_width}x{content_height}")
    
    # Step 2: Fill dark "IMDb" text with white
    text_region_size = min(content_width, content_height) * 0.6  # 60% of content size
    dark_threshold = 50
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # Check if in center region (where text is)
            in_center = (abs(x - content_center_x) < text_region_size and 
                        abs(y - content_center_y) < text_region_size)
            
            if in_center:
                # Check if pixel is dark (text)
                is_dark = r < dark_threshold and g < dark_threshold and b < dark_threshold
                
                if is_dark:
                    # Fill with white
                    pixels[x, y] = (255, 255, 255, 255)
    
    # Step 3: Remove all white background pixels
    white_threshold = 240
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            is_white = r > white_threshold and g > white_threshold and b > white_threshold
            
            if is_white:
                # Check if within content bounds
                in_content = (min_x <= x <= max_x and min_y <= y <= max_y)
                
                if not in_content:
                    # Outside content - make transparent
                    pixels[x, y] = (r, g, b, 0)
                else:
                    # Inside content - check if it's text or background
                    has_colored_neighbor = False
                    for dy in [-2, -1, 0, 1, 2]:
                        for dx in [-2, -1, 0, 1, 2]:
                            if dx == 0 and dy == 0:
                                continue
                            nx, ny = x + dx, y + dy
                            if 0 <= nx < width and 0 <= ny < height:
                                nr, ng, nb, na = pixels[nx, ny]
                                if na > 0 and not (nr > 240 and ng > 240 and nb > 240):
                                    has_colored_neighbor = True
                                    break
                        if has_colored_neighbor:
                            break
                    
                    # If no colored neighbors, it's background
                    if not has_colored_neighbor:
                        pixels[x, y] = (r, g, b, 0)
    
    # Step 4: Crop to content
    bbox = img_rgba.getbbox()
    if not bbox:
        print(f"✗ {button_name}: Could not find content")
        return False
    
    cropped = img_rgba.crop(bbox)
    crop_width, crop_height = cropped.size
    
    # Step 5: Create rounded button mask
    # Calculate corner radius (about 10-15% of smaller dimension)
    corner_radius = min(crop_width, crop_height) * 0.12
    
    # Create mask for rounded rectangle
    mask = Image.new('L', (crop_width, crop_height), 0)
    draw = ImageDraw.Draw(mask)
    
    # Draw rounded rectangle
    draw.rounded_rectangle(
        [(0, 0), (crop_width - 1, crop_height - 1)],
        radius=int(corner_radius),
        fill=255
    )
    
    # Apply mask to remove square edges
    result = Image.new('RGBA', (crop_width, crop_height), (0, 0, 0, 0))
    result.paste(cropped, (0, 0), mask)
    
    # Save
    result.save(output_path, 'PNG', optimize=True)
    print(f"✓ {button_name}: Processed {img.size} -> {result.size}, saved to {output_path}")
    return True

if __name__ == '__main__':
    # Process both images
    inputs = [
        ('public/images/imdb.jpg', 'public/images/imdb.png', 'imdb'),
        ('images/imdb2.jpg', 'public/images/imdb2.png', 'imdb2')
    ]
    
    for input_path, output_path, name in inputs:
        try:
            create_rounded_button(input_path, output_path, name)
        except Exception as e:
            print(f"✗ Error processing {name}: {e}")
