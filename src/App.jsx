// import React, { useState, useEffect, useRef, createContext, useContext, useReducer } from 'react';

// // 1️⃣ Create Context
// const CartContext = createContext();

// // 2️⃣ Reducer function (Only Add & Remove Logic)
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD':
//       return [...state, { id: Date.now(), name: action.payload }];
//     case 'REMOVE':
//       return state.filter(item => item.id !== action.payload);
//     default:
//       return state;
//   }
// };


// // 3 Input Component (Add item)
// const AddItem = () => {
//   const inputRef = useRef();
//   const [item, setItem] = useState('');
//   const [message, setMessage] = useState('');
//   const { dispatch } = useContext(CartContext);

//   const handleAdd = () => {
//     if (item.trim() !== '') {
//       dispatch({ type: 'ADD', payload: item });
//       setItem('');
//       setMessage('Item added!');
//     }
//   };

//   // Auto focus input
//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);

//   // Message timeout
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => setMessage(''), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   return (
//     <div>
//       <input
//         ref={inputRef}
//         value={item}
//         onChange={e => setItem(e.target.value)}
//         placeholder="Enter item"
//       />
//       <button onClick={handleAdd}>Add</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// // 5️⃣ Cart List Component (Show items)
// const CartList = () => {
//   const { cart, dispatch } = useContext(CartContext);

//   return (
//     <div>
//       <h3>Cart ({cart.length})</h3>
//       <ul>
//         {cart.map(item => (
//           <li key={item.id}>
//             {item.name} <button onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // 6️⃣ App Component
// const App = () => {
//  const [cart, dispatch] = useReducer(reducer, []);
//   return (
//     <CartContext.Provider value={{ cart, dispatch }}>
//       <h1>Simple Shopping Cart (Full Hooks)</h1>
//       <AddItem />
//       <CartList />
//     </CartContext.Provider>
//   );
// };

// export default App;



//with api

import React, { useReducer, useEffect, useState, createContext, useContext } from 'react';
import './App.css';  // CSS import

const API_URL = 'https://fakestoreapi.com/products';

const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="products">
      <h2>🛒 Products</h2>
      <ul>
        {products.map(prod => (
          <li key={prod.id} className="product-item">
            <div>{prod.title}</div>
            <div>${prod.price}</div>
            <button onClick={() => addToCart(prod)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  return (
    <div className="cart">
      <h2>🛒 Shopping Cart</h2>
      {cart.length === 0 && <p>No items in cart.</p>}
      <ul>
        {cart.map(item => (
          <li key={item.id} className="cart-item">
            <div>{item.title}</div>
            <div>${item.price}</div>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <div className="container">
        <h1>🔥 Advanced Shopping Cart (API + Reducer)</h1>
        <div className="main">
          <Products />
          <Cart />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;

