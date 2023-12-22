const catalog = {
    "face": undefined, 
    // "feet": undefined, 
    // "head": undefined, 
    // "inner-torso": undefined, 
    // "legs": undefined, 
    // "outer-torso": undefined, 
    // "outfit": undefined,
};

const tables = {
    "face": undefined, 
    // "feet": undefined, 
    // "head": undefined, 
    // "inner-torso": undefined, 
    // "legs": undefined, 
    // "outer-torso": undefined, 
    // "outfit": undefined,
};

const buttons = {
    "face": undefined, 
    // "feet": undefined, 
    // "head": undefined, 
    // "inner-torso": undefined, 
    // "legs": undefined, 
    // "outer-torso": undefined, 
    // "outfit": undefined,
};

var active = "face";




function buttonToSlot(button) {
    switch (button) {
        case "Face":
            return "face";
        case "Feet":
            return "feet";
        case "Head":
            return "head";
        case "Inner Torso":
            return "inner-torso";
        case "Legs":
            return "legs";
        case "Outer Torso":
            return "outer-torso";
        case "Outfit":
            return "outfit";
        default:
            console.warn("unknown button: " + button);
            return "";
    }
}

function slotToButton(slot) {
    switch (slot) {
        case "face":
            return "Face";
        case "feet":
            return "Feet";
        case "head":
            return "Head";
        case "inner-torso":
            return "Inner Torso";
        case "legs":
            return "Legs";
        case "outer-torso":
            return "Outer Torso";
        case "outfit":
            return "Outfit";
        default:
            console.warn("unknown slot: " + slot);
            return "";
    }
}

async function initCatalog() {
    for (var slot in catalog) {
        const response = await fetch("catalog/" + slot + "/catalog.json");
    
        if (response.status !== 200) {
            throw response.status;
        }
    
        catalog[slot] = await response.json()
    }
}

function initTables() {
    const body = document.getElementById("body");

    for (var slot in catalog) {
        const table = document.createElement("table");
        const thead = document.createElement("thead")
        const tbody = document.createElement("tbody");
        tables[slot] = table;
        
        thead.appendChild(document.createElement("th")).textContent = "Command";
        thead.appendChild(document.createElement("th")).textContent = "Name (Male)";
        thead.appendChild(document.createElement("th")).textContent = "Image (Male)";
        thead.appendChild(document.createElement("th")).textContent = "Name (Female)";
        thead.appendChild(document.createElement("th")).textContent = "Image (Female)";
        table.append(thead);
        
        for (var item in catalog[slot]) {
            const tr = document.createElement("tr");
            
            for (var attr in catalog[slot][item]) {
                const td = document.createElement("td");

                if (attr === "image_male" || attr === "image_female") {
                    const img = document.createElement("img");
                    img.src = catalog[slot][item][attr];
                    img.width = 400;
                    img.height = 400;
                    td.appendChild(img);
                } else {
                    td.textContent = catalog[slot][item][attr];
                }

                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }

        table.append(tbody);

        if (slot !== "face") {
            table.style.display = "none";
        }

        body.appendChild(table);
    }
}

function setActiveTable(button) {
    const slot = buttonToSlot(button.textContent);

    for (var table in tables) {
        if (table === slot) {
            buttons[active].classList.toggle("activeButton");
            active = slot;
            buttons[active].classList.toggle("activeButton");
            tables[table].style.display = "initial";
        } else {
            tables[table].style.display = "none";
        }
    }
}

function initButtons() {
    const footer = document.getElementById("footer");

    for (var i = 0; i < footer.children.length; i++) {
        const button = footer.children[i];
        const slot = buttonToSlot(button.textContent);
        buttons[slot] = button;
    }

    for (var i = 0; i < footer.children.length; i++) {
        const button = footer.children[i];

        button.addEventListener("click", () => {
            setActiveTable(button);
        });
    }
}

async function main() {
    await initCatalog();
    initTables();
    initButtons();
    buttons[active].classList.toggle("activeButton");
}




main();
