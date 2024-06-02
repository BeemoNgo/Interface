<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #00001A;">
   <div class="container-fluid">
     <a class="navbar-brand text-white" href="#">
       <img src="logo.png" alt="" width="30" height="30" class="d-inline-block align-text-top">
       Beemo
     </a>
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse" id="navbarNav">
       <ul class="navbar-nav me-auto">
         <li class="nav-item">
           <RouterLink class="nav-link active text-white" aria-current="page" to="/">HOME PAGE</RouterLink>
         </li>
         <li class="nav-item">
           <RouterLink class="nav-link text-white" to="/explore">EXPLORE</RouterLink>
         </li>
         <li class="nav-item">
           <RouterLink class="nav-link text-white" to="/about">ABOUT</RouterLink>
         </li>
         <li class="nav-item">
           <RouterLink class="nav-link text-white" to="/chat" @click="isLoginCheck()">HELP CENTER</RouterLink>
         </li>
       </ul>
       <ul class="navbar-nav ms-auto">
         <li class="nav-item px-2 pt-2">
           <span class="badge rounded-pill bg-warning">{{ store.state.basketCount }}</span>
           <font-awesome-icon icon="fa-solid fa-cart-shopping" @click="openModalCart()" style="color: #fff;" />
         </li>
         <li class="nav-item px-2 pt-2">
           <font-awesome-icon icon="fa-solid fa-heart" style="color: #fff;" @click="openModalFavorites" />
         </li>
         <li class="nav-item px-2 pt-2">
           <div v-if="isLogin" class="login px-2 pt-2">
             <RouterLink to="/user"><ProfileImage :src="user.photoURL" /></RouterLink>
           </div>
           <div v-else class="login px-2 pt-2">
             <font-awesome-icon icon="fa-solid fa-right-to-bracket" style="color: #fff;" @click="signIn" />
           </div>
         </li>
       </ul>
     </div>
   </div>
 </nav>
 <b-modal v-model="modalFav" title="Favorite Items" size="s" no-close-on-backdrop no-close-on-esc>
    <div v-if="favItems.length > 0" class="d-flex justify-content-center" style="background-color: #00001A;">
      <div class="d-flex flex-column align-items-center">
        <div class="col-12 px-0 px-md-2" v-for="(item, index) in favItems" :key="index">
          <div class="card">
            <img :src="item.images[0]" class="card-img-top mt-5" width="200" height="400" />
            <div class="card-body" style="background-color: #00001A;">
              <h5 class="card-title text-white">{{ item.title }}</h5>
              <p class="card-text text-white">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
   </div>
 <div v-else class="d-flex justify-content-center">
   <p>You have no favorite items.</p>
 </div>
</b-modal>

   <b-modal id="bayModal" v-model="modalShow" size="xl" hide-header hide-footer no-close-on-backdrop no-close-on-esc>
     <div class="alert text-white" style="background-color: #00001A;" role="alert">
       YOUR CART
       <div class="table-responsive ">
         <table class="table table-striped table-hover">
           <tr class="text-white">
             <th>ID</th>
             <th>Name</th>
             <th>Image</th>
             <th>Unit Price</th>
             <th>Quantity</th>
             <th>Total Price</th>
             <th>Remove</th>
           </tr>
           <tr v-for="item, i in basketItems" :key="i" class="text-white">
             <td>{{i + 1}}</td>
             <td>{{item.title}}</td>
             <td><img :src="item.images[0]" class="" width="80" height="90" /></td>
             <td>{{ item.price }}</td>
             <td>{{ item.qty }}</td>
             <td>ETH {{ parseFloat(item.price * item.qty).toFixed(2) }}</td>
             <td><a href="#" @click="removeCartItem(item.id)" class="text-danger px-3 py-1"><font-awesome-icon icon="fa-solid fa-remove" /></a></td>
           </tr>
           <tr class="text-white">
             <td></td>
             <td></td>
             <td></td>
             <td></td>
             <td><strong>{{ store.state.basketCount }}</strong></td>
             <td><strong>ETH {{ getTotal() }}</strong> </td>
             <td></td>
           </tr>
         </table>
         <div class="my-4">
           <button @click.prevent="closeModalCart()" class="btn btn-outline-danger float-start">Close</button>
           <button class="btn btn-outline-success float-end">Proceed To Payment</button>
         </div>
       </div>
     </div>
   </b-modal>
</template>

<script>
import { useStore } from 'vuex';
import alert from 'sweetalert2';
import ProfileImage from '@/components/chatComponents/ProfileImage.vue';
import { useAuth } from '@/firestore';
import { RouterLink } from 'vue-router';

export default {
 name: 'NavigationBar',
 components: { ProfileImage, RouterLink },
 setup() {
   const store = useStore();
   const { user, isLogin, signOut, signIn } = useAuth();

   //trigger the sweet alert when user successfully login
   const AlertSignIn = () => {
     signIn().then(() => {
       if (isLogin.value) {
         alert.fire({
           icon: 'success',
           title: `Hello, ${user.value.displayName}!`,
         });

         const basketItems = sessionStorage.basketItems !== undefined ? JSON.parse(sessionStorage.basketItems) : [];
         const totalQty = basketItems.reduce((total, item) => total + item.qty, 0);
         store.commit('updateBasketCount', totalQty);
       }
     });
   };

   // check if user is logged in
   const isLoginCheck = () => {
     if (!isLogin.value) {
       alert.fire({
         icon: 'warning',
         title: 'Login required',
         text: 'You must be logged in to access.',
       });
     }
   };

   return { user, isLogin, signOut, signIn: AlertSignIn, store, isLoginCheck };
 },
 data() {
   return {
     favItems: [],
     modalFav: false,
     basketItems: [],
     modalShow: false,
   };
 },
 methods: {
   openModalCart() {
     if (!this.isLogin) {
       alert.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'You need to login to open the cart',
       });
       return;
     }
     this.basketItems = this.loadCartItem();
     this.modalShow = true;
   },
   closeModalCart() {
     this.modalShow = false;
   },
   loadCartItem() {
     return sessionStorage.basketItems !== undefined ? JSON.parse(sessionStorage.basketItems) : [];
   },
   removeCartItem(id) {
     const itemToRemove = this.basketItems.find((item) => item.id === id);
     const qtyToRemove = itemToRemove ? itemToRemove.qty : 0;
     this.basketItems = this.basketItems.filter((item) => item.id !== id);
     sessionStorage.setItem('basketItems', JSON.stringify(this.basketItems));
     this.store.commit('updateBasketCount', -qtyToRemove);
   },
   getTotal() {
     let total = 0;
     for (const item of this.basketItems) {
       total += item.price * item.qty;
     }
     return parseFloat(total).toFixed(2);
   },
   loadFavoriteItems() {
     return sessionStorage.favItems !== undefined ? JSON.parse(sessionStorage.favItems) : [];
   },
   removeFavoriteItem(id) {
     const items = this.loadFavoriteItems();
     const updatedItems = items.filter((d) => d.id !== id);
     sessionStorage.setItem('favItems', JSON.stringify(updatedItems));
   },
   openModalFavorites() {
     if (!this.isLogin) {
       alert.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'You need to login to open the favorite items',
       });
       return;
     }
     this.favItems = this.loadFavoriteItems();
     this.modalFav = true;
   },
   updateBasketOnLogin() {
     const basketItems = sessionStorage.basketItems !== undefined ? JSON.parse(sessionStorage.basketItems) : [];
     if (this.user && this.user.uid && basketItems.length > 0) {
       this.store.commit('setBasket', { userId: this.user.uid, basket: basketItems });
     }
   },
 },
 mounted() {
   this.loadCartItem();
 },
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between; /* Ensures items are spread out */
  align-items: center;
  background-color: #00001A;
}

.navbar-nav {
  display: flex;
  align-items: center;
}

.navbar-nav.me-auto {
  flex: 1;
  justify-content: flex-start; /* Aligns items to the left */
}

.navbar-nav.ms-auto {
  flex: 0; /* Do not allow this to grow */
  justify-content: flex-end; /* Aligns items to the right */
}

.nav-item {
  margin: 0 10px; /* Space between items */
}

.nav-item a {
  text-decoration: none;
  color: white; /* Ensures text is white */
  padding: 10px 20px;
  display: block; /* Better block handling for padding */
}

.nav-item a:hover {
  background-color: #212325; /* Darker background on hover */
  color: #ffffff;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px; /* Space between logo and text */
}

.img {
  max-width: 100%;
  height: auto;
}
</style>
