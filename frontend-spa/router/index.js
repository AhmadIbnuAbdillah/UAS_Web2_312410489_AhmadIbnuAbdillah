const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: false },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresAuth: false },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: '/mobil',
        name: 'mobil',
        component: Mobil,
        meta: { requiresAuth: true },
    },
    {
        path: '/kategori',
        name: 'kategori',
        component: Kategori,
        meta: { requiresAuth: true },
    },
    {
        path: '/supplier',
        name: 'supplier',
        component: Supplier,
        meta: { requiresAuth: true },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
        meta: { requiresAuth: false },
    },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

// =====================================================
// NAVIGATION GUARD (Client-Side Security)
// Mencegat pengguna yang belum login agar tidak bisa
// mengakses halaman yang memerlukan otentikasi
// =====================================================
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' && !!localStorage.getItem('authToken');

    if (requiresAuth && !isLoggedIn) {
        // Pengguna ilegal -> lempar otomatis ke halaman login
        next({ name: 'login' });
    } else if (to.name === 'login' && isLoggedIn) {
        // Sudah login tapi mencoba akses halaman login -> arahkan ke dashboard
        next({ name: 'dashboard' });
    } else {
        next();
    }
});

// Expose router on window for legacy code / global redirects
// (e.g. scripts that call `window.router.push(...)`)
try {
    window.router = router;
} catch (e) {
    // ignore if running in restricted environments
}
