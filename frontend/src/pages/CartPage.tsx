import React from "react";

const CartPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">Your cart is empty</p>
        <p className="mt-2 text-gray-500">Browse our cocktails and add items to your cart</p>
      </div>
    </div>
  );
};

export default CartPage;
