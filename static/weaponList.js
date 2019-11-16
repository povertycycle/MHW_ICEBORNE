DIV_WEAPON_LIST.onmouseenter = function()
{   
    WEAPON_LIST_DISPLAY.style.display = "unset";
}

WEAPON_LIST_DISPLAY.onmouseleave = function()
{
    WEAPON_LIST_DISPLAY.style.display = "none";
}

function makeID(text)
{
    var id = document.createAttribute("id");
    id.value = text;
    return id;
}

function makeClass(cText)
{
    var cls = document.createAttribute("class");
    cls.value = cText;
    return cls;
}

function toTitleCase(str) 
{
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function initWeaponTypeDiv(type)
{
    var div = document.createElement("div");
    div.style.width = DROP_DOWN_MENU_WIDTH + "px";
    div.style.height = DROP_DOWN_TAB_HEIGHT + "px";
    div.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
    div.setAttributeNode(makeClass("weaponType"));   
    div.setAttributeNode(makeID(type)); 
    div.style.border = "white";
    div.style.borderRadius = BORDER_RADIUS + "px";
    div.onclick = function(e)
    {
        CURRENT_TREE_TYPE = type;
        WEAPON_LIST_DISPLAY.style.display = "none";
        drawWeaponTree(e.target.id);
    }
    var icon = new Image();
    icon.setAttributeNode(makeID(type)); 
    icon.src = "static/weapons/"+type.replace(/_/g, "-")+"-icon.png";
    icon.style.width = icon.style.height = DROP_DOWN_TAB_HEIGHT + "px";
    var font = document.createElement("font");
    font.textContent = toTitleCase(type.replace(/-/g, " "));
    font.setAttributeNode(makeClass("weaponType"));
    font.setAttributeNode(makeID(type)); 
    div.appendChild(icon);
    div.append(font);
    return div;
}

for (i=0; i< WEAPON_TYPES.length; i++)
{
    WEAPON_LIST_DISPLAY.appendChild(initWeaponTypeDiv(WEAPON_TYPES[i]));
}

$('.weaponType').on('mouseout mouseenter', function(e) 
{
    var target;
    if (e.target.nodeName != "DIV")
    {
       target = e.target.parentNode;
    }
    else 
    {
        target = e.target;
    }
    if (e.type == "mouseenter")
    {
        target.style.borderStyle = "solid";
    }
    else if (e.type == "mouseout")
    {
        target.style.borderStyle = "";
    }
});

function processSharpness(div, sharpness)
{
    var sum = 0;
    var colors = Object.keys(sharpness);
    var to_from = {};
    
    for (var i=0; i< colors.length; i++)
    {
        if (sharpness[colors[i]] == 0) {
            to_from[colors[i]] = [0, 0];
        }
        else
        {
            to_from[colors[i]] = [sum, sum+sharpness[colors[i]]];
            sum += sharpness[colors[i]]
        }
        
    }
    var bar = "linear-gradient(to right";
    for (var i = 0; i < colors.length; i++)
    {
        var c = to_from[colors[i]];
        bar += ", " + colors[i] + " " + c[0]/4 + "% " + c[1]/4 + "% "
    }
    if (sum != 400) bar += ",black "+(400-sum)/4+"%"
    bar += ")";
    console.log(bar);
    div.style.backgroundImage = bar;    
}

function displaySharpness(sharpness)
{
    for (var j = 0; j < sharpness.length; j++)
    {
        var div = document.getElementById("handicraft"+j);
        div.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
        div.style.width = PROPERTIES_WIDTH/2 + "px";
        div.style.height = PROPERTIES_SECTION_HEIGHT - 4*BORDER_RADIUS + "px";
        processSharpness(div, sharpness[j]);
    }
}

function processMaterials(div, material)
{
    var itemQuantity = document.createElement("div");
    itemQuantity.innerText = "x" + material["quantity"];
    itemQuantity.style.float = "right";
    itemQuantity.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
    itemQuantity.style.height = PROPERTIES_SECTION_HEIGHT - 4*BORDER_RADIUS + "px";
    div.appendChild(itemQuantity);
}

function displayCraftingMaterials(materials)
{
    while (WEAPON_CRAFTING_MATS.firstChild)
    {
        WEAPON_CRAFTING_MATS.removeChild(WEAPON_CRAFTING_MATS.firstChild);
    }
    WEAPON_CRAFTING_MATS.style.left = PROPERTIES_WIDTH + BORDER_RADIUS - GAP_WIDTH + "px";
    var mats = Object.keys(materials);
    for (var j = 0; j < mats.length; j++)
    {  
        var container = document.createElement("div");
        container.style.display = "flex";
        container.style.border = "white";
        container.style.borderStyle = "solid";
        var div = document.createElement("div");
        div.innerText = materials[mats[j]]["item"]["name"];
        div.style.width = PROPERTIES_WIDTH *3/4 + "px";
        container.appendChild(div);
        processMaterials(container, materials[mats[j]]);
        WEAPON_CRAFTING_MATS.appendChild(container);
    }
}

function displayUpgradeMaterials(materials)
{
    while (WEAPON_UPGRADE_MATS.firstChild)
    {
        WEAPON_UPGRADE_MATS.removeChild(WEAPON_UPGRADE_MATS.firstChild);
    }
    WEAPON_UPGRADE_MATS.style.left = PROPERTIES_WIDTH + BORDER_RADIUS - GAP_WIDTH + "px";
    var mats = Object.keys(materials);
    for (var j = 0; j < mats.length; j++)
    {  
        var container = document.createElement("div");
        container.style.display = "flex";
        container.style.border = "white";
        container.style.borderStyle = "solid";
        var div = document.createElement("div");
        div.innerText = materials[mats[j]]["item"]["name"];
        div.style.width = PROPERTIES_WIDTH *3/4 + "px";
        container.appendChild(div);
        processMaterials(container, materials[mats[j]]);
        WEAPON_UPGRADE_MATS.appendChild(container);
    }
}

function processCraftUpgrade(json)
{
    if (json["craftable"])
    {
        WEAPON_CRAFTABLE.innerText = "Yes";
        DIV_HAVE_CRAFTING.style.display = "";
        WEAPON_CRAFTING_MATS.style.display = "none";
        displayCraftingMaterials(json["craftingMaterials"]);
        DIV_HAVE_CRAFTING.onmouseenter = function() { WEAPON_CRAFTING_MATS.style.display = "unset"; }
        DIV_HAVE_CRAFTING.onmouseout = function() { WEAPON_CRAFTING_MATS.style.display = "none"; }
    }
    else
    {
        DIV_HAVE_CRAFTING.style.display = "none";
        WEAPON_CRAFTABLE.innerText = "No";
    }
    if (json["upgradeMaterials"].length > 0)
    {
        DIV_HAVE_UPGRADE.style.display = "";
        WEAPON_UPGRADE_MATS.style.display = "none";
        displayUpgradeMaterials(json["upgradeMaterials"]);
        DIV_HAVE_UPGRADE.onmouseenter = function() { WEAPON_UPGRADE_MATS.style.display = "unset"; }
        DIV_HAVE_UPGRADE.onmouseout = function() { WEAPON_UPGRADE_MATS.style.display = "none"; }
    }
    else
    {
        DIV_HAVE_UPGRADE.style.display = "none";
    }
}

function processWeaponElement(json, elderseal)
{
    if (json.length > 0)
    {
        var elementArr = json[0];
        ELEMENT_TYPE.innerText = toTitleCase(elementArr["type"]);
        if (elementArr["type"]=="dragon")
        {
            DIV_HAVE_ELDERSEAL.style.display = "";
            WEAPON_ELDERSEAL.innerText = elderseal ? toTitleCase(elderseal) : "";
        }
        else
        {
            DIV_HAVE_ELDERSEAL.style.display = "none";
        }
        if (elementArr["hidden"])
        {
            ELEMENT_VALUE.style.color = GREY; 
            ELEMENT_VALUE.innerText = "("+toTitleCase(elementArr["damage"])+")";
        }
        else
        {
            ELEMENT_VALUE.innerText = elementArr["damage"];
        }
    }
}

async function displayWeaponProperties(e, id) 
{
    WEAPON_PROPERTIES.style.top = e.clientY - SMALL_ICON/2 + "px";
    WEAPON_PROPERTIES.style.left = e.clientX - SMALL_ICON/2 + "px";
    WEAPON_PROPERTIES.style.display = "unset";
    const response = await fetch('https://mhw-db.com/weapons/' + id);
    const json = await response.json();               
    WEAPON_IMAGE.src = json["assets"]["image"];
    WEAPON_NAME.innerText = json["name"];
    WEAPON_ICON.src = json["assets"]["icon"];
    WEAPON_RARITY.style.color = RARITY_COLOR[json["rarity"]];
    WEAPON_RARITY.innerText = "Rarity " + json["rarity"];
    WEAPON_ATTACK.innerText = "Display: " + json["attack"]["display"] + " | Raw: " + json["attack"]["raw"];
    WEAPON_SHARPNESS.style.left = PROPERTIES_WIDTH + BORDER_RADIUS - GAP_WIDTH + "px";
    displaySharpness(json["durability"]);
    DIV_SHARPNESS.onmouseenter = function() { WEAPON_SHARPNESS.style.display = "unset"; }
    DIV_SHARPNESS.onmouseout = function() { WEAPON_SHARPNESS.style.display = "none"; }
    WEAPON_AFFINITY.innerText = json["attributes"];
    processCraftUpgrade(json["crafting"]);
    processWeaponElement(json["elements"], json["elderseal"]);
}

function initWeaponDiv(weapon, nTop, nLeft)
{
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.width = SMALL_ICON + "px";
    div.style.height = SMALL_ICON + "px";
    var img = new Image();
    img.src = item["assets"]["icon"];
    img.style.width = img.style.height = SMALL_ICON + "px"
    var id = document.createAttribute("id");
    id.value = weapon["name"];
    div.setAttributeNode(id);
    div.style.top = nTop + "px";
    div.style.left = nLeft + "px";
    div.style.borderStyle = "";
    div.style.border = "white";
    div.style.borderRadius = BORDER_RADIUS + "px";
    div.appendChild(img);
    div.onmouseenter = img.onmouseenter = function() { div.style.borderStyle = "solid"; }
    div.onmouseout = img.onmouseout = function() { div.style.borderStyle = ""; }
    div.onclick = function(e) { displayWeaponProperties(e, weapon["id"]); }
    return div;
}

async function drawWeaponTree(type)
{
    while (DISPLAY_DETAILS.firstChild)
    {
        DISPLAY_DETAILS.removeChild(DISPLAY_DETAILS.firstChild);
    }
    var weaponList = WEAPON_LIST[type];
    var nextTop = GAP_WIDTH;
    var nextLeft = GAP_WIDTH;
    var dropped = false;
    var prevWeapon;
    for (item of weaponList)
    {
        var prevID = item["crafting"]["previous"];
        if (dropped)
        {
            if (prevID)
            {
                const response = await fetch('https://mhw-db.com/weapons/' + prevID);
                const json = await response.json();               
                prevWeapon = document.getElementById(json["name"]);
                nextLeft = parseInt(prevWeapon.style.left) + ICON_GAP;             
            }
            else
            { 
                nextLeft = GAP_WIDTH;
            }
        }
        
        
        DISPLAY_DETAILS.appendChild(initWeaponDiv(item, nextTop, nextLeft));
        if (prevID)
        {
            var line = document.createElement("div");
            line.style.borderBottom = LINE_SIZE + "px solid green";
            line.style.width = ICON_GAP - SMALL_ICON + "px";
            line.style.position = "absolute";
            line.style.top = nextTop + SMALL_ICON/2 - LINE_SIZE + "px";
            line.style.left = nextLeft - ICON_GAP + SMALL_ICON + "px";
            DISPLAY_DETAILS.appendChild(line);
        }
        if (dropped)
        {
            var line = document.createElement("div");
            line.style.borderLeft = LINE_SIZE + "px solid green";
            line.style.position = "absolute";
            line.style.top = parseInt(prevWeapon.style.top) + SMALL_ICON + "px";
            line.style.height = nextTop - parseInt(line.style.top) + "px";
            line.style.left = nextLeft - ICON_GAP + SMALL_ICON/2 - LINE_SIZE + "px";
            DISPLAY_DETAILS.appendChild(line);
            dropped = false;
        }
        nextLeft += ICON_GAP;
        if (item["crafting"]["branches"].length == 0)
        {
            nextTop += ICON_GAP_HEIGHT;
            dropped = true;
        }
    }
}
