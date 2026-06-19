const BASE_URL = "http://localhost:5000/api/orders";
const searchInput =
  document.getElementById("searchInput");

const clearSearch =
  document.getElementById("clearSearch");

async function loadOrders() {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    displayOrders(data);
}

function displayOrders(data) {
    let rows = "";

    data.forEach(order => {
        rows += `
        <tr>
            <td>${order.order_id}</td>
            <td>${order.company_name}</td>
            <td>${order.product_name}</td>
            <td>${order.quantity}</td>
            <td>${order.status}</td>
            <td class='actions'>
                <button onclick="editOrder(${order.order_id})" id="editBtn">
                    Edit
                </button>

                <button onclick="deleteOrder(${order.order_id})" id="deleteBtn">
                    Delete
                </button>
            </td>
        </tr>`; 
    });

    document.getElementById("tableBody").innerHTML = rows;
}

async function searchOrders() {
    const searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const response = await fetch(BASE_URL);
    const data = await response.json();

    const filtered = data.filter(order =>
        order.product_name.toLowerCase().includes(searchText) ||
        order.company_name.toLowerCase().includes(searchText) ||
        order.status.toLowerCase().includes(searchText)
    );

    displayOrders(filtered);
}

async function deleteOrder(id) {

     if (!confirm("Are you sure?")) {
        return;
    }

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();

    alert(data.message);
    loadOrders();
}

function editOrder(id) {
    window.location.href =
        `update-order.html?id=${id}`;
}

searchInput.addEventListener("input", ()=>{
     if (searchInput.value.trim() !== "") {
    clearSearch.style.display = "block";
  } else {
    clearSearch.style.display = "none";
  }
},
);

function clearSearchInput() {
  searchInput.value = "";
  clearSearch.style.display = "none";

  loadOrders();
}

loadOrders();