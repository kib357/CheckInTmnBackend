module.exports = {
    "orders": {
        "display": "list",
        "navOrder": 0,
        "orderBy": "-createdAt",
        "label": "{{$i18n.storeLabel}}",
        "labels": [
            {
                "text": "{{$item.clientPhone}} - {{$item.clientName}}",
                "showInList": 1,
                "hideInForm": true,
            },
            {
                "text": "{{moment $item.createdAt format=\"dd D MMMM HH:mm\"}}",
                "hideInForm": true,
                "showInList": 2,
                "hidden": "!$item.createdAt",
            },
        ],
        "headerTemplate": "{{$item.name}}",
        "formGroupsOrder": ["Клиент", "Заказ"],
        "props": {
            "name": {
                "type": "string",
                "default": "Новый заказ",
            },
            "clientName": {
                "type": "string",
                "display": "textInput",
                "label": "ФИО",
                "formGroup": "Клиент",
                "formOrder": 0,
                "required": true,
            },
            "clientPhone": {
                "type": "string",
                "display": "masked",
                "label": "Телефон",
                "mask": "+7 (|||) |||-||-||",
                "formOrder": 10,
                "formGroup": "Клиент",
                "required": true,
            },
            "clientEmail": {
                "type": "string",
                "display": "textInput",
                "label": "Е-mail",
                "formGroup": "Клиент",
                "formOrder": 20,
            },
            "product": {
                "type": "ref",
                "display": "searchBox",
                "store": "products",
                "searchBy": ["name"],
                "label": "Прогулка",
                "formOrder": 0,
                "formGroup": "Заказ",
                "required": true,
            },
            "comment": {
                "type": "string",
                "display": "textArea",
                "label": "Комментарий",
                "formGroup": "Заказ",
                "formOrder": 10,
            },
        },
        "actions": [],
        "objectLifeCycle": require("./_itemHooks.js"),
        "storeLifeCycle": {},
        "filters": {
            "_default": {
                "query": {
                    "$or": [
                        {
                            "name": {
                                "$regex": "$value",
                                "$options": "i",
                            },
                        },
                        {
                            "clientPhone": {
                                "$regex": "$value",
                                "$options": "i",
                            },
                        },
                        {
                            "clientName": {
                                "$regex": "$value",
                                "$options": "i",
                            },
                        },
                    ],
                },
            },
        },
        "httpHooks": require("./_httpHooks.js"),
        "tasks": [],
        "i18n": {
            "storeLabel": "Заказы",
        },
        "access": [
            { "role": "manager", "permissions": "crud" },
        ],
    },
};