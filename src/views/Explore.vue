/* eslint-disable */
<template>
  <div class="container-fluid shadow-sm" style="background-color: #00001A;">
    <div class="row mb-3">
      <div class="col-12 col-md-6 col-lg-8">
        <div class="d-flex justify-content-start">
          <input type="text" v-model="searchString" class="form-control mt-2" placeholder="Search">
          <button class="btn mt-2" type="submit"><font-awesome-icon icon="fa fa-search text-secondary" /></button>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-4 mt-2">
        <div class="dropdown">
          <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            Sort By: {{ aCategory === '' ? 'All' : aCategory }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" href="#" @click="updateCategory($event)">All</a></li>
            <li v-for="category in categories" :key="category">
              <a class="dropdown-item" href="#" @click="updateCategory($event)">{{ category }}</a>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  <div class="row justify-content-center" style="background-color: #00001A;">
    <div class="card_items col-12 col-sm-6 col-md-4 col-lg-3 mb-4 px-2" v-for="(item, index) in slicedItems" :key="index">
      <div class="card" style="background-color: transparent;">
        <div class="badge bg-info position-absolute fav" style="">
          <font-awesome-icon :icon="item.isFavorite ? 'fa-solid fa-heart' : 'fa-solid fa-heart-circle-plus'" :class="['badge', 'bg-info', {'text-danger': item.isFavorite}]" @click="toggleFavorite(item)"   />
        </div>
        <div v-if="item.stock > 0" class="badge bg-success text-white position-absolute available">Available</div>
        <div v-if="item.stock <= 0" class="badge bg-danger text-white position-absolute out">Sold</div>
        <img :src="item.images[0]" @click="openModalDesc(item.id)" data-bs-toggle="collapse" class="card-img-top mt-5 rounded" width="200" height="300" />
        <div class="card-body">
          <h6 class="h5 card-title text-center bold text-white">{{ item.title }}</h6>
          <div class="d-flex row align-content-center">
            <p class="price h5 text-center rounded bold">{{ item.price }} ETH</p>
          </div>
          <div class="row justify-content-around">
            <div class="col-auto">
              <button type="button" class="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                Place a bid
              </button>
              <button v-if="item.stock > 0" type="button" class="btn" @click="addItem(item.id)">
                Add<font-awesome-icon icon="fa-solid fa-cart-plus" />
              </button>
              <button v-if="item.stock <= 0" type="button" disabled class="btn">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="modalDesc" title="Item Details" size="s" no-close-on-backdrop no-close-on-esc>
      <div class="d-flex justify-content-center" style="background-color: #00001A;">
        <div class="d-flex flex-column align-items-center">
          <div class="col-12 px-0 px-md-2">
            <div v-if="selectedItem">
              <Carousel :items-to-show="1" v-model="currentSlide">
                <Slide v-for="(image, index) in selectedItem.images" :key="index">
                  <img :src="image" class="card-img-top mt-5">
                </Slide>
              </Carousel>
            </div>
          </div>
          <ul v-if="selectedItem">
            <li class="text-white"><strong class="text-white">Description:</strong> {{ selectedItem.description }}</li>
            <li class="text-white"><strong class="text-white">Element:</strong> {{ selectedItem.brand }}</li>
            <li class="text-white">
              <font-awesome-icon icon="thumbs-up" /><strong class="text-white"> Ratings: {{ selectedItem.rating }}/5</strong>
              <vSR v-model="selectedItem.rating" starSize="20" inactiveColor="#fff" :showControl="false" :disableClick="true" />
            </li>
          </ul>
        </div>
      </div>
    </b-modal>
    <div class="row justify-content-center"></div>
    <div class="d-flex justify-content-center">
      <pagination-3 v-model="page" :records="filteredData.length" :per-page="perPage"></pagination-3>
    </div>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { auth } from '@/firebaseConfig'
import alert from 'sweetalert2'
import vSR from "vue3-star-ratings"
import pagination3 from 'v-pagination-3'

export default {
  name: "ExplorePage",
  data() {
    return {
      modalFav: false,
      favItems: [],
      selectedItem: null,
      modalDesc: false,
      basketItems: [],
      basketCount: 0,
      searchString: '',
      datas: [],
      categories: [],
      aCategory: '',
      page: 1,
      perPage: 8,
      currentSlide: 0
    }
  },
  mounted() {
    const data = 'products.json';
    const fetchData = async () => {
      try {
        const res = await fetch(data);
        const d = await res.json();
        this.datas = d;
        this.categories = [...new Set(d.map(x => x.category))];
        this.datas.forEach(item => {
          const favorites = this.getFavoriteItems();
          if (favorites.some(favItem => favItem.id === item.id)) {
            item.isFavorite = true;
          } else {
            item.isFavorite = false;
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.resetItems();
      }
    });
  },
  methods: {
    resetItems() {
      for (let item of this.datas) {
        item.isFavorite = false;
      }
      sessionStorage.removeItem('favItems');
      sessionStorage.removeItem('basketItems');
    },
    slideTo(val) {
      this.currentSlide = val;
      if (this.currentSlide === this.selectedItem.images.length) {
        this.currentSlide = 0;
      }
    },
    openModalDesc(id) {
      this.modalDesc = true;
      for (var item of this.datas) {
        if (item.id == id) {
          this.selectedItem = item;
        }
      }
    },
    pageChangeHandler(selectedPage) {
      this.currentPage = selectedPage;
    },
    successOrder() {
      this.$store.commit('updateBasketCount', 1);
      alert.fire({
        position: 'center',
        icon: 'success',
        title: 'Added To Basket',
        text: "Successfully",
        showConfirmButton: false,
        timer: 3000
      });
    },
    updateCategory(e){
        this.aCategory = e.target.text == 'All' ? '' : e.target.text
    },
    addItem(id) {
      this.addItemToBasket(id);
    },
    async addItemToBasket(id) {
      const user = auth.currentUser;
      if (user) {
        let items = this.getBasketItems();
        for (var item of this.datas) {
          if (item.id == id) {
            let found = false;
            for (let i = 0; i < items.length; i++) {
              if (items[i].id === id) {
                items[i].stock--;
                items[i].available = (items[i].stock > 0);
                items[i].qty++;
                found = true;
                break;
              }
            }
            if (!found) {
              let newItem = { ...item, qty: 1, available: (item.stock > 0) };
              items.push(newItem);
            }
            sessionStorage.setItem('basketItems', JSON.stringify(items));
            this.successOrder();
          }
        }
      } else {
        alert.fire({
          icon: 'warning',
          title: 'Login required',
          text: 'You must be logged in to perform this action',
        });
      }
    },
    getBasketItems() {
      return sessionStorage.basketItems != undefined ? JSON.parse(sessionStorage.basketItems) : [];
    },
    removeBasketItem(id) {
      this.basketItems = this.basketItems.filter(d => d.id != id);
      sessionStorage.setItem('basketItems', JSON.stringify(this.basketItems));
    },
    async addFavoriteItem(id) {
      const user = await auth.currentUser;
      if (user) {
        let items = this.getFavoriteItems();
        for (var item of this.datas) {
          if (item.id == id) {
            let found = false;
            for (let i = 0; i < items.length; i++) {
              if (items[i].id === id) {
                found = true;
                break;
              }
            }
            if (!found) {
              items.push(item);
            }
            sessionStorage.setItem('favItems', JSON.stringify(items));
          }
        }
      } else {
        alert.fire({
          icon: 'warning',
          title: 'Login required',
          text: 'You must be logged in to perform this action',
        });
      }
    },
    getFavoriteItems() {
      return sessionStorage.favItems != undefined ? JSON.parse(sessionStorage.favItems) : [];
    },
    removeFavoriteItem(id) {
      this.favItems = this.getFavoriteItems();
      const updatedItems = this.favItems.filter(d => d.id != id);
      sessionStorage.setItem('favItems', JSON.stringify(updatedItems));
    },
    toggleFavorite(item) {
      const user = auth.currentUser;
      if (user) {
        item.isFavorite = !item.isFavorite;
        if (item.isFavorite) {
          this.addFavoriteItem(item.id);
        } else {
          this.removeFavoriteItem(item.id);
        }
      } else {
        alert.fire({
          icon: 'warning',
          title: 'Login required',
          text: 'You must be logged in to perform this action',
        });
      }
    },
  },
  computed: {
    filteredData() {
        return this.datas.filter(item => item.title.toLowerCase().match(this.searchString.toLowerCase()) && item.category.toLowerCase().match(this.aCategory)
        )
    },
    slicedItems() {
      const startIndex = (this.page - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.filteredData.slice(startIndex, endIndex);
    },
  },
  components: {
    vSR,
    pagination3,
    Carousel,
    Slide
  },
}
</script>

<style scoped>
.card_items {
  user-select: none;
  margin: 5rem auto;
  border: 1px solid #ffffff22;
  background-color: #282c34;
  background: linear-gradient(0deg, rgba(40,44,52,1) 0%, rgba(17,0,32,.5) 100%);
  box-shadow: 0 7px 20px 5px #00000088;
  border-radius: .7rem;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  overflow: hidden;
  transition: .5s all;
  padding: 1rem;
}
.card-img-top {
  border-radius: .5rem;
  max-width: 100%;
  height: 250px;
  object-fit: cover;
}
.price {
  align-items: center;
  color: #ee83e5;
  font-weight: 700;
}
.card_items::before {
  position: fixed;
  content: "";
  box-shadow: 0 0 100px 40px #ffffff08;
  top: -10%;
  left: -100%;
  transform: rotate(-45deg);
  height: 60rem;
  transition: .7s all;
}
.card_items:hover {
  border: 1px solid #ffffff44;
  box-shadow: 0 7px 50px 10px #000000aa;
  transform: scale(1.015);
  filter: brightness(1.3);
}
.card_items:hover::before {
  filter: brightness(.5);
  top: -100%;
  left: 200%;
}
.row {
  padding: 25px 25px;
  --bs-gutter-x: 0;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
}
.available, .out {
  top: 5px;
  right: 5px;
}
.fav {
  top: 5px;
  left: 5px;
}
.btn {

  background-color: transparent;
  border: 2px solid #7a25f8;
  color: white;
  font-size: 1rem; /* Adjusted font size */
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: #7a25f8;
}
</style>
