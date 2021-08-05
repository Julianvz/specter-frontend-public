import Vue from "vue"
import VueRouter from 'vue-router'
import Home from '../views/Public/AppViews/Home.vue'
import Cube from '../views/Public/AppViews/CubeSingle.vue'
import User from "../views/Public/AppViews/User";
import Login from "../views/Public/Auth/Login";
import Register from "../views/Public/Auth/Register";
import Account from "../views/Private/Account";
import Upload from "../views/Private/Upload";
import MyCubes from "../views/Private/MyCubes";
import Subscriptions from "../views/Private/Subscriptions";
import moment from "moment";
import Edit from "@/views/Private/Edit";
import UserService from "../services/UserService";
import Search from "@/views/Public/AppViews/Search";
import Player from "@/views/Public/AppViews/Player";

Vue.use(VueRouter)


// kleines ISO Zeit formating  script
Vue.filter('isoLocalDateTime', function (value) {
    var d = moment.utc(value);
    return d.format('DD.MM.YYYY - HH:mm');
    // return d.local().format('DD.MM.YYYY - HH:mm');
//
});

var filter = function (text, length, clamp) {
    clamp = clamp || '...';
    var node = document.createElement('div');
    node.innerHTML = text;
    var content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);

const routes = [

    // Public Routes
    // --------------------------------

    // Home
    {
        path: '/',
        name: 'Home',
        component: Home
    },


    // Single Cube
    {
        path: '/cubes/:id',
        name: 'Cube',
        component: Cube
    },
    // Single Cube
    {
        path: '/embed/:id',
        name: 'Player',
        component: Player
    },

    // Tag èbersicht
    // {
    //     path: '/tags/:id',
    //     name: 'Tags',
    //     component: Tag
    // },

    // Public Profule
    {
        path: '/tags/:id',
        name: 'Tag',
        component: User
    },

    // Auth Routes
    // --------------------------------


    // Login
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    // Register
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter: (to, from, next) => {
            if (UserService.check())
                return router.push("/account")
            return next()
        },
    },

    // Member Routes
    // --------------------------------

    // Account Home
    {
        path: '/account',
        name: 'account',
        component: Account,

        beforeEnter: (to, from, next) => {
            // console.log(UserService.guest()())
            if (UserService.guest())
                return router.push("/login")
            return next()
        },
    },

    // Account Upload
    {
        path: '/upload/:id?',
        name: 'Upload',
        component: Upload,
        beforeEnter: (to, from, next) => {
            // console.log(UserService.guest()())
            if (UserService.guest())
                return router.push("/login")
            return next()
        },
    },
    // Account Edit
    {
        path: '/edit/:id?',
        name: 'Edit',
        component: Edit,
        beforeEnter: (to, from, next) => {
            // console.log(UserService.guest()())
            if (UserService.guest())
                return router.push("/login")
            return next()
        },
    },
    // Account myCubes
    {
        path: '/myCubes',
        name: 'myCubes',
        component: MyCubes,
        beforeEnter: (to, from, next) => {
            // console.log(UserService.guest()())
            if (UserService.guest())
                return router.push("/login")
            return next()
        },
    },
    // Account subscriptions
    {
        path: '/subscriptions',
        name: 'subscriptions',
        component: Subscriptions,
        beforeEnter: (to, from, next) => {
            // console.log(UserService.guest()())
            if (UserService.guest())
                return router.push("/login")
            return next()
        },
    },

    {
        path: '/search/:therm?',
        name: 'Search',
        component: Search,
        // beforeEnter: (to, from, next) => {
        //     // console.log(UserService.guest()())
        //     if (UserService.guest())
        //         return router.push("/login")
        //     return next()
        // },
    },


    // Marketing Routes
    // --------------------------------


    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Public/Marketing/About.vue')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
