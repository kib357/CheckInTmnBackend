module.exports = {
    "shopSettings": {
        "type": "single",
        "display": "list",
        "navOrder": 0,
        "navGroup": "shop",
        "label": "{{$i18n.storeLabel}}",
        "labels": [
            {
                "icon": "fa fa-power-off",
                "text": "{{#if $item.disabled}}Выключен{{else}}Включен{{/if}}",
                "color": "{{#if $item.disabled}}#E0E0E0{{else}}#00E676{{/if}}",
            },
        ],
        "props": {
            "disabled": {
                "type": "bool",
                "display": "none",
                "default": false,
            },
            "email": {
                "type": "string",
                "display": "textInput",
                "label": "E-mail адрес для отправки уведомлений о заказах",
                "formOrder": 0,
            },
        },
        "actions": [
            {
                "_id": "switchOnOff",
                "label": "{{#if $item.disabled}}Включить{{else}}Выключить{{/if}}",
                "dynamicLabel": true,
                "multi": false,
                "script": function ($db, $item) {
                    return $db.set({ "_id": "shopSettings", disabled: !$item.disabled }, "shopSettings");
                },
            },
        ],
        "objectLifeCycle": {},
        "storeLifeCycle": {},
        "filters": {},
        "httpHooks": [],
        "tasks": [],
        "i18n": {
            "storeLabel": "Настройки",
        },
        "access": [
            {"role": "manager", "permissions": "crud" },
        ],
    },
};