import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Explore from '../views/Explore.vue'
import UserPage from '../views/UserPage.vue'
// import LoginPage from '../views/LoginPage.vue'
import AboutPage from '../views/AboutPage.vue'
import ChatPage from '../views/ChatPage.vue'
// import HelpCenter from '../views/HelpCenter.vue'
const routes = [{
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/explore',
        name: 'explore',
        component: Explore
    },
    {
        path: '/user',
        name: 'user',
        component: UserPage
    },
    {
        path: '/about',
        name: '/about',
        component: AboutPage
    },
    {
        path: '/chat',
        name: '/chat',
        component: ChatPage
    },
    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router