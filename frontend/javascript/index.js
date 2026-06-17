async function loadDashboard() {

    const response =
    await fetch(
        "http://localhost:5000/api/orders"
    );

    const orders =
    await response.json();

    document.getElementById(
        "totalOrders"
    ).innerText =
        orders.length;

    const pending =
    orders.filter(
        order =>
        order.status === "Pending"
    ).length;

    const shipped =
    orders.filter(
        order =>
        order.status === "Shipped"
    ).length;

    const delivered =
    orders.filter(
        order =>
        order.status === "Delivered"
    ).length;

    document.getElementById(
        "pendingOrders"
    ).innerText =
        pending;

    document.getElementById(
        "shippedOrders"
    ).innerText =
        shipped;

    document.getElementById(
        "deliveredOrders"
    ).innerText =
        delivered;
}

loadDashboard();