from PIL import Image
import os

gallery_dir = 'foto'
optimized_dir = 'foto/optimized_images'

os.makedirs(optimized_dir, exist_ok=True)

for filename in os.listdir(gallery_dir):
    if filename.lower().endswith('.jpg'):
        img_path = os.path.join(gallery_dir, filename)
        optimized_path = os.path.join(optimized_dir, filename)
        with Image.open(img_path) as img:
            # Calculate new dimensions to fit within 1200 pixels on the longest side
            max_dim = 1200
            if img.width > max_dim or img.height > max_dim:
                if img.width > img.height:
                    new_width = max_dim
                    new_height = int(img.height * (max_dim / img.width))    
            else:
                new_height = max_dim
                new_width = int(img.width * (max_dim / img.height))
            img = img.resize((new_width, new_height), Image.LANCZOS)
        img.save(optimized_path, 'JPEG', quality=85)
print('Images optimized successfully!')