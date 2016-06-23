"use strict";

module.exports = [
    {
        "uri": "make-order",
        "method": "POST",
        "script": function ($request) {
            var safeOrigins = ["http:\/\/localhost:1313", "http:\/\/checkintmn.ru", "https:\/\/checkintmn.ru"], allowOrigin;
            var originIndex = safeOrigins.indexOf($request.header["Origin"]);
            if (originIndex < 0) {
                return { data: "Forbidden", code: 403, type: "JSON" };
            } else {
                allowOrigin = safeOrigins[originIndex];
            }
            var order = {};
            try {
                if (!Array.isArray($request.form["data"]) || $request.form["data"].length !== 1) {
                    throw new Error("no data");
                }
                if ($request.form["data"][0].length > 3000) {
                    throw new Error("max length");
                }
                var data = JSON.parse($request.form["data"][0]);
                if (typeof data !== "object") {
                    throw new Error("no object");
                }
                for (let prop of Object.keys(data)) {
                    if (typeof data[prop] === "boolean" || typeof data[prop] === "number") {
                        continue;
                    }
                    if (typeof data[prop] !== "string") {
                        throw new Error("validation error");
                    }
                    data[prop] = data[prop].trim();
                }
                if (!data.name || data.name.length < 2 || data.name.length > 300 ||
                    !data.phone || !(/^[()\s\-0-9]{10,}/.test(data.phone)) || data.phone.length > 20 ||
                    (data.email && !(/^\S+@\S+\.\S{1,3}$/).test(data.email)) ||
                    (data.comment && data.comment.length > 1000) ||
                    (data.paymentType !== "cash" && data.paymentType !== "online") ||
                    !data.offerAccepted) {
                    throw new Error("validation error");
                }
                order.clientName = data.name.trim();
                order.clientPhone = data.phone.replace(/[()\s\-]/g, "").slice(0,10);
                order.clientEmail = data.email;
                order.paymentType = data.paymentType;
                order.offerAccepted = data.offerAccepted;
                order.comment = data.comment;
                order.product = data.product;
            } catch (e) {
                console.log("400 make-order error:", e);
                return { data: "Bad Request", code: 400, type: "JSON" };
            }
            return new Promise(resolve => {
                $db.get("shopSettings", "shopSettings").then(settings => {
                    if (settings.disabled) {
                        throw new Error("Shop disabled!");
                    }
                    return $db.get({ "number": order.product }, "products");
                }).then(product => {
                    order.product = product._id;
                    return $db.insert(order, "orders");
                }).then(res => {
                    resolve({
                        header: { "Access-Control-Allow-Origin": allowOrigin },
                        rawData: res.name,
                        type: "JSON",
                    });
                }).catch((err) => {
                    console.log("500 make-order error:", err);
                    resolve({ data: "Internal Server Error", code: 500, type: "JSON" });
                });
            });
        },
    },
];