import {combineReducers} from 'redux';

const appReducer = combineReducers({
  cartData: cartReducer,
 
});







function cartReducer(state = [], action) {
  switch (action.type) {
    case 'addToCart':
      return [
        ...state,
        {
          product_id: action.payload.product_id,
          product_name: action.payload.product_name,
          product_price: action.payload.product_price,
          gst_amount: action.payload.gst_amount,
          quantity:action.payload.quantity
          
        },
      ];
    case 'removeFromCart':
      return state.filter(val => {
        if (
          val.product_id == action.payload.product_id
         
        ) {
          return false;
        } else {
          return true;
        }
      });
    case 'increaseCount':
      return state.map(val => {
        if (
          val.product_id == action.payload.product_id
          
         
        ) {
          return {
            ...val,
            quantity: val.quantity + 1,
          };
        } else {
          return val;
        }
      });
    case 'decreaseCount':
      return state.map(val => {
        if (
          val.product_id == action.payload.product_id
         
        ) {
          return {
            ...val,
            quantity: val.quantity - 1,
          };
        } else {
          return val;
        }
      });
    case 'clearCart':
      return [];
    default:
      return state;
  }
}




export default appReducer;
