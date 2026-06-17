const form =
document.getElementById("orderForm");

form.addEventListener(
"submit",
async function(e){

e.preventDefault();

const order = {

customer_id:
document.getElementById(
"customer_id"
).value,

product_name:
document.getElementById(
"product_name"
).value,

quantity:
document.getElementById(
"quantity"
).value,

delivery_address:
document.getElementById(
"delivery_address"
).value,

order_date:
document.getElementById(
"orderDate"
).value,

delivery_date:
document.getElementById(
"deliveryDate"
).value,

status:
document.getElementById(
"status"
).value

};

console.log(order);

const response =
await fetch(
"http://localhost:5000/api/orders",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:
JSON.stringify(order)
}
);

const data = await response.json();

alert(data.message);

form.reset();

});