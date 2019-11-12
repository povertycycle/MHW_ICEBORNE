DROP_DOWN_MENU.style.width = DROP_DOWN_MENU_WIDTH + "px";
DROP_DOWN_MENU.style.height = DROP_DOWN_MENU_HEIGHT + "px";
DROP_DOWN_MENU.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;

DIV_WEAPON_LIST.style.width = DIV_MONSTER_LIST.style.width = DIV_ITEM_LIST.style.width = DROP_DOWN_MENU_WIDTH + "px";
DIV_WEAPON_LIST.style.height = DIV_MONSTER_LIST.style.height = DIV_ITEM_LIST.style.height = DROP_DOWN_TAB_HEIGHT + "px";
DIV_WEAPON_LIST.style.backgroundColor = DIV_MONSTER_LIST.style.backgroundColor = DIV_ITEM_LIST.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;

DROP_DOWN_MENU.style.border = DIV_WEAPON_LIST.style.border = DIV_MONSTER_LIST.style.border = DIV_ITEM_LIST.style.border = "white";
DROP_DOWN_MENU.style.borderRadius = DIV_WEAPON_LIST.style.borderRadius = DIV_MONSTER_LIST.style.borderRadius = DIV_ITEM_LIST.style.borderRadius = BORDER_RADIUS + "px";

WEAPON_LIST_DISPLAY.style.position = "absolute";
WEAPON_LIST_DISPLAY.style.left = DROP_DOWN_MENU_WIDTH + "px";
WEAPON_LIST_DISPLAY.style.top = DROP_DOWN_MENU_HEIGHT + "px";

DISPLAY_DETAILS.style.width = window.innerWidth - DROP_DOWN_MENU_WIDTH*2 + "px";
DISPLAY_DETAILS.style.height = window.innerHeight - GAP_WIDTH*2 + "px";
DISPLAY_DETAILS.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
DISPLAY_DETAILS.style.left = DROP_DOWN_MENU_WIDTH*2 + "px";
DISPLAY_DETAILS.style.top = 0 + "px";
DISPLAY_DETAILS.style.position = "absolute";
DISPLAY_DETAILS.style.overflow = "scroll";



var PROPERTIES = $('.weaponProperties');
for (i = 0; i < PROPERTIES.length; i++)
{
    PROPERTIES[i].style.height = PROPERTIES_SECTION_HEIGHT + "px";
    PROPERTIES[i].style.marginLeft = GAP_WIDTH + "px";
}

var VALUES = $('.weaponValue');
for (i = 0; i < VALUES.length; i++)
{
    VALUES[i].style.float = "right";
    VALUES[i].style.marginRight = GAP_WIDTH + "px";
}

var COLORS = $('.colorPalette');
for (i = 0; i < COLORS.length; i++)
{
    COLORS[i].style.height = PROPERTIES_SECTION_HEIGHT + "px";
    COLORS[i].style.position = "absolute";
}

PROPERTIES_HEIGHT = WEAPON_NAME_HEIGHT + PROPERTIES_WIDTH + PROPERTIES.length* PROPERTIES_SECTION_HEIGHT + "px";

WEAPON_PROPERTIES.style.border = "white";
WEAPON_PROPERTIES.style.borderRadius = BORDER_RADIUS + "px";
WEAPON_PROPERTIES.style.borderStyle = "solid";
WEAPON_PROPERTIES.style.display = "none";
WEAPON_PROPERTIES.style.width = PROPERTIES_WIDTH + "px";
WEAPON_PROPERTIES.style.height = PROPERTIES_HEIGHT + "px";
WEAPON_PROPERTIES.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;

WEAPON_IMAGE.style.width = WEAPON_IMAGE.style.height = PROPERTIES_WIDTH + "px";
WEAPON_NAME.style.display = "contents";
WEAPON_NAME.style.height = WEAPON_ICON.style.height = WEAPON_ICON.style.width = WEAPON_NAME_HEIGHT + "px";
WEAPON_NAME.style.width = PROPERTIES_WIDTH - WEAPON_NAME_HEIGHT + "px";
WEAPON_NAME.style.fontSize = TEXT_SIZE + "px";

WEAPON_SHARPNESS.style.display = "none";


$('article').on('mouseout mouseenter', function(e) 
{
    if (e.type == "mouseenter")
    {
        e.target.style.borderStyle = "solid";
    }
    else if (e.type == "mouseout")
    {
        e.target.style.borderStyle = "";
    }
});

fetch(WEAPON_LIST_PATH)
    .then(response => response.json())
    .then(weapons => {
        for (var i=0; i < weapons.length; i++)
        {
            WEAPON_LIST[weapons[i].type].push(weapons[i]);
        }
    });
// $.ajax({
//     dataType: 'json',
//     async: false,
//     url: ,
//     success: function(json) 
//     {
//         console.log(json);
//     }
// });
