const jsonCatalog = {
    "face": undefined, 
    "feet": undefined, 
    "head": undefined, 
    "inner-torso": undefined, 
    "legs": undefined, 
    "outer-torso": undefined, 
    "outfit": undefined,
};

const subcatalogs = {
    "face": undefined, 
    "feet": undefined, 
    "head": undefined, 
    "inner-torso": undefined, 
    "legs": undefined, 
    "outer-torso": undefined, 
    "outfit": undefined,
};

const buttons = {
    "face": undefined, 
    "feet": undefined, 
    "head": undefined, 
    "inner-torso": undefined, 
    "legs": undefined, 
    "outer-torso": undefined, 
    "outfit": undefined,
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
    for (var slot in jsonCatalog) {
        const response = await fetch("catalog/" + slot + "/catalog.json");
    
        if (response.status !== 200) {
            throw response.status;
        }
    
        jsonCatalog[slot] = await response.json()
    }
}

function initSubcatalogs() {
    const catalog = document.getElementById("catalog");

    for (var slot in subcatalogs) {
        const subcatalog = document.createElement("div");
        subcatalog.className = "subcatalog";
        subcatalogs[slot] = subcatalog;

        for (var item in jsonCatalog[slot]) {
            const itemDiv = document.createElement("div");
            const textDiv = document.createElement("div");
            const img = document.createElement("img");

            itemDiv.className = "itemDiv";
            textDiv.textContent = jsonCatalog[slot][item]["command"];
            textDiv.style.color = "white";
            textDiv.style.display = "none";
            img.src = jsonCatalog[slot][item]["image_male"];
            img.className = "image";

            itemDiv.addEventListener("click", () => {
                if (textDiv.style.display === "none") {
                    textDiv.style.display = "initial";
                } else {
                    textDiv.style.display = "none";
                }
            });
            
            itemDiv.appendChild(img);
            itemDiv.appendChild(textDiv);
            subcatalog.appendChild(itemDiv);
        }

        if (slot !== "face") {
            subcatalog.style.display = "none";
        }

        catalog.appendChild(subcatalog);
    }
}

function setActiveSubcatalog(button) {
    const slot = buttonToSlot(button.textContent);

    for (var subcatalog in subcatalogs) {
        if (subcatalog === slot) {
            buttons[active].classList.toggle("activeButton");
            active = slot;
            buttons[active].classList.toggle("activeButton");
            subcatalogs[subcatalog].style.display = "flex";
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        } else {
            subcatalogs[subcatalog].style.display = "none";
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
            setActiveSubcatalog(button);
        });
    }
}

async function main() {
    await initCatalog();
    initSubcatalogs();
    initButtons();
    buttons[active].classList.toggle("activeButton");
}




main();
