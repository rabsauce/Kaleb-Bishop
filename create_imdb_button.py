#!/usr/bin/env python3
"""Create a custom IMDb button that looks like the official black and white logo"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_imdb_button(output_path, size_px=100):
    """Create a custom IMDb button with black background and white text"""
    # Create image with transparent background
    img = Image.new('RGBA', (size_px, size_px), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Calculate dimensions
    width, height = size_px, size_px
    padding = int(size_px * 0.15)  # 15% padding
    corner_radius = int(size_px * 0.25)  # 25% corner radius for rounded button
    
    # Draw rounded rectangle (black background)
    # The IMDb logo is typically black with white text
    draw.rounded_rectangle(
        [(padding, padding), (width - padding, height - padding)],
        radius=corner_radius,
        fill=(0, 0, 0, 255)  # Black background
    )
    
    # Try to use a bold font, fallback to default if not available
    try:
        # Try to find a bold system font
        font_size = int(size_px * 0.35)  # 35% of size for text
        font_paths = [
            '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
            '/System/Library/Fonts/Helvetica.ttc',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        ]
        font = None
        for font_path in font_paths:
            if os.path.exists(font_path):
                try:
                    font = ImageFont.truetype(font_path, font_size)
                    break
                except:
                    continue
        
        if font is None:
            # Use default font
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()
    
    # Draw "IMDb" text in white
    text = "IMDb"
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    # Center the text
    text_x = (width - text_width) // 2
    text_y = (height - text_height) // 2 - int(text_height * 0.1)  # Slight vertical adjustment
    
    # Draw white text
    draw.text(
        (text_x, text_y),
        text,
        fill=(255, 255, 255, 255),  # White text
        font=font
    )
    
    # Save the button
    img.save(output_path, 'PNG', optimize=True)
    print(f"✓ Created IMDb button: {size_px}x{size_px}, saved to {output_path}")
    return True

if __name__ == '__main__':
    # Create a high-resolution version first (for quality)
    high_res_path = 'public/images/imdb_button_large.png'
    create_imdb_button(high_res_path, size_px=200)
    
    # The actual size will be controlled by CSS (h-5 = 20px)
    # But we create a good quality base image
    print(f"✓ IMDb button created successfully")
