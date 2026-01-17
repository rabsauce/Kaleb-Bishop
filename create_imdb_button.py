#!/usr/bin/env python3
"""Create a custom IMDb button matching the official logo design - larger size"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_imdb_button(output_path, size_px=200):
    """Create IMDb button: black rounded rectangle with white 'IMDb' text, transparent background"""
    # Create image with fully transparent background
    img = Image.new('RGBA', (size_px, size_px), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Calculate dimensions for the black rounded rectangle
    width, height = size_px, size_px
    
    # Make the button much larger - fill most of the canvas
    # The IMDb logo is a horizontal black rounded rectangle
    button_height = int(size_px * 0.80)  # 80% of canvas height (much larger)
    button_width = int(size_px * 0.90)   # 90% of canvas width (wider, horizontal)
    
    # Center the button
    x1 = (width - button_width) // 2
    y1 = (height - button_height) // 2
    x2 = x1 + button_width
    y2 = y1 + button_height
    
    # Corner radius (rounded corners)
    corner_radius = int(button_height * 0.2)  # 20% of button height
    
    # Draw black rounded rectangle (the button)
    draw.rounded_rectangle(
        [(x1, y1), (x2, y2)],
        radius=corner_radius,
        fill=(0, 0, 0, 255)  # Black background
    )
    
    # Add white "IMDb" text
    try:
        # Try to find a bold system font
        font_size = int(button_height * 0.60)  # 60% of button height for text (larger)
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
    
    # Draw "IMDb" text in white (I, M, D uppercase, b lowercase)
    text = "IMDb"
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    # Center the text in the button
    text_x = x1 + (button_width - text_width) // 2
    text_y = y1 + (button_height - text_height) // 2 - int(text_height * 0.1)
    
    # Draw white text
    draw.text(
        (text_x, text_y),
        text,
        fill=(255, 255, 255, 255),  # White text
        font=font
    )
    
    # Save with transparent background (no white)
    img.save(output_path, 'PNG', optimize=True)
    print(f"✓ Created IMDb button: {size_px}x{size_px}, saved to {output_path}")
    print(f"  Button size: {button_width}x{button_height}, corner radius: {corner_radius}")
    print(f"  Button fills {button_width/size_px*100:.0f}% width, {button_height/size_px*100:.0f}% height")
    print(f"  Background: Transparent (no white)")
    return True

if __name__ == '__main__':
    # Create high-resolution version with much larger button
    output_path = 'public/images/imdb_button_large.png'
    create_imdb_button(output_path, size_px=200)
    print(f"✓ IMDb button created with much larger size and transparent background")
