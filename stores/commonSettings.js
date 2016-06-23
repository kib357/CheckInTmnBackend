module.exports = {
    "_commonSettings": {
        "type": "map",
        "access": [
            {
                "role": "guest",
                "permissions": "crud",
            },
            {
                "role": "all",
                "permissions": "crud",
            },
        ],
        "entries": {
            "title": "Check in TMN",
            "locales": ["ru"],
            "defaultLocale": "ru",
            "userActivation": false,
            "resetPasswordDisabled": true,
            "signUpDisabled": true,
            "hideChangeLanguage": true,
            "hideChangeLogin": true,
            "meta": [
                { "name": "description", "content": "Application description" },
                { "name": "author", "content": "Application author" },
            ],
            "links": [
                { "rel": "canonical", "href": "http://checkintmn.ru" },
            ],
            "lessVars": {
                // "@baseColor": "#FF0044"
            },
        },
    },
};