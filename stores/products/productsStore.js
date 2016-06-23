module.exports = {
    "products": {
        "display": "list",
        "navOrder": 10,
        "navGroup": "shop",
        "label": "{{$i18n.storeLabel}}",
        "labels": [],
        "props": {
            "number": {
                "type": "string",
                "display": "textInput",
                "label": "Артикул",
                "formOrder": 0,
            },
            "price": {
                "type": "int",
                "display": "numberInput",
                "label": "Стоимость",
                "formOrder": 10,
            },
        },
        "actions": [],
        "objectLifeCycle": {},
        "storeLifeCycle": {},
        "filters": {},
        "httpHooks": [],
        "tasks": [],
        "i18n": {
            "storeLabel": "Прогулки",
        },
        "access": [
            {"role": "manager", "permissions": "crud" },
        ],
    },
};