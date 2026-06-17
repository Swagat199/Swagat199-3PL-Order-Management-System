const BASE_URL =
    "http://localhost:5000/api/orders";

const params =
    new URLSearchParams(window.location.search);

const orderId =
    params.get("id");

// Load existing order details
async function loadOrder() {

    const response =
        await fetch(
            `${BASE_URL}/${orderId}`
        );

    const data =
        await response.json();
    
    const order = data[0];

    console.log(order);
    console.log(order.order_date);
    console.log(order.delivery_date);

    document.getElementById(
        "product_name"
    ).value =
        order.product_name;

    document.getElementById(
        "quantity"
    ).value =
        order.quantity;

    document.getElementById(
        "delivery_address"
    ).value =
        order.delivery_address;

    document.getElementById(
        "order_date"
    ).value =
        order.order_date.split("T")[0];

    document.getElementById(
        "delivery_date"
    ).value =
        order.delivery_date.split("T")[0];

    document.getElementById(
        "status"
    ).value =
        order.status;
}

loadOrder();

// Update order
document
.getElementById("updateForm")
.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

        const updatedOrder = {

            product_name:
                document
                .getElementById(
                    "product_name"
                ).value,

            quantity:
                document
                .getElementById(
                    "quantity"
                ).value,

            delivery_address:
                document
                .getElementById(
                    "delivery_address"
                ).value,

            order_date:
                document
                .getElementById(
                    "order_date"
                ).value,

            delivery_date:
                document
                .getElementById(
                    "delivery_date"
                ).value,

            status:
                document
                .getElementById(
                    "status"
                ).value
        };

        const response =
            await fetch(
                `${BASE_URL}/${orderId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body:
                        JSON.stringify(
                            updatedOrder
                        )
                }
            );

        const data = await response.json();

        alert(data.message);

        window.location.href =
            "view-orders.html";
    }
);