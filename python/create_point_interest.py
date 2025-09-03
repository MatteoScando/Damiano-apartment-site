from PIL import Image
import os

gallery_dir = 'img/point-of-interest'
thumbs_dir = 'img/point-of-interest/thumbnails'

os.makedirs(thumbs_dir, exist_ok=True)

for filename in os.listdir(gallery_dir):
    print(filename)
    if filename.lower().endswith(('.jpg', '.png')):
        img_path = os.path.join(gallery_dir, filename)
        thumb_path = os.path.join(thumbs_dir, filename)
        with Image.open(img_path) as img:
            img.thumbnail((400, 400))
            if filename.lower().endswith('.png'):
                img.save(thumb_path, 'PNG')
            else:
                img.save(thumb_path, 'JPEG', quality=50)
print('Thumbnails created successfully!')