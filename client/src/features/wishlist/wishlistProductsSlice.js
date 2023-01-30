import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isLoadingWishlist :false,
    wishlistItems : [],
    totalWishlistItem  :0,
    wishlistMessage :null
}

const cartSlice = createSlice ({
    name:"wishlist",
    initialState,
    reducers : {
        setLoadingWishlist :(state,action)=>{
            state.isLoadingWishlist=true;
        },
        clearLoadingWishlist : (state,action)=>{
            state.isLoadingWishlist = false;
        },
        setWishlistItem : (state,action)=>{
            const prevFav = JSON.parse(localStorage.getItem("wishlistItem"));
            localStorage.setItem("wishlistItem",JSON.stringify(prevFav?[...prevFav,action.payload]:[action.payload]));
            state.isLoadingWishlist = false;
            state.wishlistMessage = "Item added to your Wishlists";
        },
        getWishlistItem : (state,action) =>{
            const fav = JSON.parse(localStorage.getItem("wishlistItem"));
            state.wishlistItems = fav?fav:[];
            state.totalWishlistItem = state.wishlistItems.length;
            state.isLoadingWishlist = false;
        },
        deleteWishlistItem : (state,action) =>{
            const prevFav = JSON.parse(localStorage.getItem("wishlistItem"));
            localStorage.setItem("wishlistItem",JSON.stringify(prevFav.filter(item=>item!=action.payload)));
            state.wishlistMessage = "Item removed from your Wishlists"
            state.isLoadingWishlist = false;
        },
        clearWishlistSuccess : (state,action) => {
            state.wishlistMessage = null;
        }
    },
})


export const { setLoadingWishlist,clearLoadingWishlist,setWishlistItem,getWishlistItem,deleteWishlistItem,clearWishlistSuccess } = cartSlice.actions;
export default cartSlice.reducer;