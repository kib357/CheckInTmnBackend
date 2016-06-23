module.exports = {
    "willCreate": function ($item) {
        return $db.nextSequenceString("orders", 4).then(res => {
            var k = "АБВДЕИКЛПР".split("");
            $item.name = k[res[0] * 1] + res.slice(1);
        });
    },
    "didCreate": function ($item) {
        $db.get("shopSettings", "shopSettings").then(settings => {
            if (!settings.email) {
                return console.log("No E-mail address for notifications in shopSettings");
            }
            var emailSender = require("email");
            var template = `
            <p><b>Прогулка:</b> {{$item.productName}}</p>
            <p><b>Имя клиента:</b> {{$item.clientName}}</p>
            <p><b>Телефон:</b> {{$item.clientPhone}}</p>
            <p><b>Email:</b> {{$item.clientEmail}}</p>
            <p><b>Комментарий:</b> {{$item.comment}}</p>`;
            $db.get($item.product, "products").then((p) => {
                $item.productName = p.name;
                var body = require("handlebars").compile(template)({
                    $item: $item,
                });

                var emailMessage = {
                    to: settings.email,
                    subject: `Новый заказ – ${$item.name}`,
                    body: body,
                };

                emailSender.send(emailMessage, (e) => {
                    if (e != null) {
                        console.error("Email send error:", e);
                    }
                });
            });
        }, err => {
            console.log("Error while sending email:", err);
        });
    },
};