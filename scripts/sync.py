import json
import os
import sys


SLOT = sys.argv[1]
DIR = "catalog/" + SLOT + "/"


with open(DIR + "/catalog.json") as jf:
    catalog = json.load(jf)

images = [file for file in os.listdir(DIR) if file != "catalog.json"]

if len(catalog) != len(images):
    print(f"error: image mismatch (catalog: {len(catalog)}, images: {len(images)})")
else:
    for item, image in zip(catalog, images):
        image_male = catalog[item]["image_male"]
        os.rename(DIR + image, image_male.rsplit(".", 1)[0] + ".png")
    
    print("synced.")
