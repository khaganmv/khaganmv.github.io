import json
import os
from pathlib import Path


DIR = "catalog/"


for subdir in os.listdir(DIR):
    jf = open(DIR + subdir + "/catalog.json", "r") 
    catalog = json.load(jf)
    jf.close()
    
    for item in catalog:
        image_male = catalog[item]["image_male"]
        image_female = catalog[item]["image_female"]
        
        image_male = image_male.rsplit(".", 1)[0] + ".jpeg"
        image_female = image_female.rsplit(".", 1)[0] + ".jpeg"
    
        catalog[item]["image_male"] = image_male
        catalog[item]["image_female"] = image_female
    
    jf = open(DIR + subdir + "/catalog.json", "w")
    json.dump(catalog, jf, indent=4)
    jf.close()
