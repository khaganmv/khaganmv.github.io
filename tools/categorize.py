import json
import shutil


DIR = "catalog/"

SLOTS = [
    "inner-torso",
    "outer-torso",
]

JUMPSUITS = [
    "unitard",
    "jumpsuit",
    "motorcycle suit",
    "racing suit",
    "tracksuit",
]


jumpsuit_catalog = {}
dress_catalog = {}

for slot in SLOTS:
    cf = open(DIR + slot + "/catalog.json")
    catalog = json.load(cf)
    cf.close()
    
    for item in list(catalog):
        TweakDB_id = item.lower()
        name_male = catalog[item]["name_male"]
        
        if "dress" in TweakDB_id or "dress" in name_male:
            dress_catalog[item] = catalog[item]
            dress_catalog[item]["image_male"] = "catalog/dress/" + item + "_male.jpeg"
            dress_catalog[item]["image_female"] = "catalog/dress/" + item + "_female.jpeg"
            shutil.move(
                DIR + slot + "/" + item + "_male.jpeg", 
                DIR + "dress/" + item + "_male.jpeg"
            )
            del catalog[item]
        else:
            for jumpsuit in JUMPSUITS:
                if jumpsuit in TweakDB_id or jumpsuit in name_male:
                    jumpsuit_catalog[item] = catalog[item]
                    jumpsuit_catalog[item]["image_male"] = "catalog/jumpsuit/" + item + "_male.jpeg"
                    jumpsuit_catalog[item]["image_female"] = "catalog/jumpsuit/" + item + "_female.jpeg"
                    shutil.move(
                        DIR + slot + "/" + item + "_male.jpeg", 
                        DIR + "jumpsuit/" + item + "_male.jpeg"
                    )
                    del catalog[item]
                    break
                    
    cf = open(DIR + slot + "/catalog.json", "w")
    json.dump(catalog, cf, indent=4)
    cf.close()

with open(DIR + "jumpsuit/catalog.json", "w") as cf:
    json.dump(jumpsuit_catalog, cf, indent=4)

with open(DIR + "dress/catalog.json", "w") as cf:
    json.dump(dress_catalog, cf, indent=4)
