<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #00001A;">
    <div class="container-fluid">
      <a class="navbar-brand text-white" href="#" @click="toggleNavbar">
        <img src="logo.png" alt="Beemo Logo" width="30" height="30" class="d-inline-block align-text-top">
        Beemo
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div :class="{'collapse navbar-collapse': true, 'show': isNavbarCollapsed}" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
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
            <div v-else class="wallet-button login px-2 pt-2">
              <i class="fa-solid fa-wallet" style="color: #fff;" @click="signIn"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
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
    const isNavbarCollapsed = ref(false);

    // Trigger the sweet alert when user successfully logs in
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

    // Check if user is logged in
    const isLoginCheck = () => {
      if (!isLogin.value) {
        alert.fire({
          icon: 'warning',
          title: 'Login required',
          text: 'You must be logged in to access.',
        });
      }
    };

    // Toggle navbar function
    const toggleNavbar = () => {
      isNavbarCollapsed.value = !isNavbarCollapsed.value;
    };

    return { user, isLogin, signOut, signIn: AlertSignIn, store, isLoginCheck, toggleNavbar, isNavbarCollapsed };
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
  flex-wrap: wrap;
  justify-content: space-between; /* Ensures separation between left and right elements */
  align-items: center;
  background-color: #00001A;
}

.navbar-nav {
  display: flex;
  align-items: center;
}

.navbar-nav.me-auto {
  justify-content: flex-start; /* Aligns navigation links to the left */
}

.navbar-nav.ms-auto {
  justify-content: flex-end; /* Aligns icons to the right */
}

.nav-item {
  margin: 0 10px;
}

.nav-item a {
  text-decoration: none;
  color: white;
  padding: 10px 20px;
  display: block;
}

.nav-item a:hover {
  background-color: #212325;
  color: #ffffff;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.wallet-button {
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid #7a25f8;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s;
}

.wallet-button i {
  color: white;
}

.wallet-button:hover {
  background-color: #7a25f8;
  transform: scale(1.05);
  transition: 0.3s;
}
@media (max-width: 992px) {
  .navbar-nav {
    justify-content: flex-start !important; /* Ensure all nav items align to the left */
    width: 100%; /* Ensure the navbar takes full width */
  }
  .navbar-collapse {
    flex-grow: 1;
    justify-content: flex-start !important;
  }
}
</style>
