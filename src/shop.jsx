
// //with api advanced 
// import React, { useReducer, useEffect, useState, createContext, useContext } from 'react';
// import './App.css';

// const API_URL = 'https://fakestoreapi.com/products';
// const CartContext = createContext();

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       const exist = state.find(item => item.id === action.payload.id);
//       if (exist) {
//         return state.map(item =>
//           item.id === action.payload.id
//             ? { ...item, qty: item.qty + 1 }
//             : item
//         );
//       } else {
//         return [...state, { ...action.payload, qty: 1 }];
//       }
//     case 'REMOVE_FROM_CART':
//       return state.filter(item => item.id !== action.payload);
//     case 'INCREMENT_QTY':
//       return state.map(item =>
//         item.id === action.payload
//           ? { ...item, qty: item.qty + 1 }
//           : item
//       );
//     case 'DECREMENT_QTY':
//       return state.map(item =>
//         item.id === action.payload && item.qty > 1
//           ? { ...item, qty: item.qty - 1 }
//           : item
//       );
//     default:
//       return state;
//   }
// };

// const CartProvider = ({ children }) => {
//   const [cart, dispatch] = useReducer(reducer, []);
//   return (
//     <CartContext.Provider value={{ cart, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const { dispatch } = useContext(CartContext);

//   useEffect(() => {
//     fetch(API_URL)
//       .then(res => res.json())
//       .then(data => setProducts(data));
//   }, []);

//   const addToCart = (product) => {
//     dispatch({ type: 'ADD_TO_CART', payload: product });
//   };

//   return (
//     <div className="products">
//       <h2>Products</h2>
//       <div className="product-grid">
//         {products.map(prod => (
//           <div key={prod.id} className="product-card">
//             <img src={prod.image} alt={prod.title} />
//             <h3>{prod.title.substring(0, 20)}...</h3>
//             <p>${prod.price}</p>
//             <button onClick={() => addToCart(prod)}>Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const Cart = () => {
//   const { cart, dispatch } = useContext(CartContext);

//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

//   return (
//     <div className="cart">
//       <h2>Shopping Cart</h2>
//       {cart.length === 0 ? (
//         <p>No items in cart.</p>
//       ) : (
//         <>
//           {cart.map(item => (
//             <div key={item.id} className="cart-item">
//               <img src={item.image} alt={item.title} />
//               <div>
//                 <h3>{item.title.substring(0, 20)}...</h3>
//                 <p>${item.price}</p>
//                 <div className="qty-control">
//                   <button onClick={() => dispatch({ type: 'DECREMENT_QTY', payload: item.id })}>-</button>
//                   <span>{item.qty}</span>
//                   <button onClick={() => dispatch({ type: 'INCREMENT_QTY', payload: item.id })}>+</button>
//                 </div>
//               </div>
//               <button className="remove-btn" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}>Remove</button>
//             </div>
//           ))}
//           <h3>Total: ${total}</h3>
//         </>
//       )}
//     </div>
//   );
// };

// function App() {
//   return (
//     <CartProvider>
//       <div className="container">
//         <h1>🔥 Pro eCommerce Shopping Cart</h1>
//         <div className="main">
//           <Products />
//           <Cart />
//         </div>
//       </div>
//     </CartProvider>
//   );
// }

// export default App;
