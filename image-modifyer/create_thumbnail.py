from PIL import Image
import os

gallery_dir = 'img/gallery'
thumbs_dir = 'img/gallery/thumbnails'

os.makedirs(thumbs_dir, exist_ok=True)

for filename in os.listdir(gallery_dir):
    print(filename)
    if filename.lower().endswith(('.jpg', '.png')):
        img_path = os.path.join(gallery_dir, filename)
        thumb_path = os.path.join(thumbs_dir, filename)
        with Image.open(img_path) as img:
            img.thumbnail((500, 500))
            if filename.lower().endswith('.png'):
                img.save(thumb_path, 'PNG')
            else:
                img.save(thumb_path, 'JPEG', quality=95)
print('Thumbnails created successfully!')