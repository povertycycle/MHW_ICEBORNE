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

function findPath(name)
{
    var leftVal = GAP_WIDTH;
    var currWeapon = CURRENT_DISPLAYED_TREE[name];
    var safetyNet = 0;
    while(!currWeapon.rootWeapon)
    {
        currWeapon = CURRENT_DISPLAYED_TREE[currWeapon.prev_upgrade];
        leftVal += ICON_GAP;
        safetyNet += 1;
        if(safetyNet >= 30) break;
        console.log("Looking for paths...")
    }
    return leftVal;
}

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
        console.log(j);
        var div = document.getElementById("handicraft"+j);
        div.style.top = WEAPON_NAME_HEIGHT + PROPERTIES_WIDTH + 2*PROPERTIES_SECTION_HEIGHT + j*PROPERTIES_SECTION_HEIGHT + "px";
        div.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
        div.style.borderRadius = BORDER_RADIUS + "px";
        div.style.border = "white";
        div.style.display = "unset";
        div.style.width = PROPERTIES_WIDTH/2 + "px";
        processSharpness(div, sharpness[j]);
        div.style.borderStyle = "solid";
    }
}

async

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
    WEAPON_ATTACK.innerText = json["attack"]["display"];
    displaySharpness(json["durability"]);
    DIV_SHARPNESS.onmouseenter = function() { WEAPON_SHARPNESS.style.display = "unset"; }
    DIV_SHARPNESS.onmouseout = function() { WEAPON_SHARPNESS.style.display = "none"; }
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
    for (item of weaponList)
    {
        
        if (dropped)
        {
            
            var prevID = item["crafting"]["previous"];
            if (prevID)
            {
                const response = await fetch('https://mhw-db.com/weapons/' + prevID);
                const json = await response.json();               
                nextLeft = parseInt(document.getElementById(json["name"]).style.left) + ICON_GAP;   
            }
            else
            {
                nextLeft = GAP_WIDTH;
            }
            dropped = false;
        }
        DISPLAY_DETAILS.appendChild(initWeaponDiv(item, nextTop, nextLeft));
        nextLeft += ICON_GAP;
        if (item["crafting"]["branches"].length == 0)
        {
            nextTop += ICON_GAP_HEIGHT;
            dropped = true;
        }
    }
}
