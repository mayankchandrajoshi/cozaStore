import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import productSlice from './features/product/productSlice'
import cartSlice from './features/cart/cartSlice'
import blogSlice from './features/blog/blogSlice'
import productDetailSlice from './features/product/productDetailSlice'
import blogDetailsSlice from './features/blog/blogDetailsSlice'
import productReviewSlice from './features/product/productReviewSlice'
import wishlistProductsSlice from './features/wishlist/wishlistProductsSlice'
import orderSlice from './features/order/orderSlice'
import addressSlice from './features/address/addressSlice'


const store = configureStore({
  reducer: {
    user:userSlice,
    products : productSlice,
    productDetails : productDetailSlice,
    productReview : productReviewSlice,
    cart:cartSlice,
    address : addressSlice,
    order:orderSlice,
    blog:blogSlice,
    blogDetails : blogDetailsSlice,
    wishlist : wishlistProductsSlice
  }
})

export default store