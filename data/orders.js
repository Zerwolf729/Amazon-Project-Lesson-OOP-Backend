
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  localStorage.setItem('orders', JSON.stringify([order]));
  orders.length = 0;
  orders.push(order);
  
  //orders.unshift(order);
  saveToStorage();
};

function saveToStorage () {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}