import os
from PIL import Image
import threading


SLOT = "face"
DIR = "catalog/" + SLOT + "/"


def crop_image(file):
    image = Image.open(DIR + file)
    left = 420
    right = 1500
    top = 0
    bottom = 1080
    cropped = image.crop((left, top, right, bottom))
    cropped.resize(()).save(DIR + file)


files = [file for file in os.listdir(DIR) if file != "catalog.json"]
threads = []

for file in files:
    thread = threading.Thread(target=crop_image, args=(file,))
    thread.start()
    threads.append(thread)
    
for thread in threads:
    thread.join()
