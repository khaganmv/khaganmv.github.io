import sys
import json


SLOT = sys.argv[1]
DIR = "catalog/" + SLOT + "/catalog.json"


items = {}

with open(DIR) as jf:
    catalog = json.load(jf)
    
    for item in catalog:
        name = catalog[item]["name_male"]
        
        if name in items:
            print(f"duplicate found: {name}")
        else:
            items[name] = True
