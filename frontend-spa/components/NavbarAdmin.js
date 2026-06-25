const NavbarAdmin = {
    template: `
    <nav class="bg-slate-900 text-white">
        <div class="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
            <div class="flex items-center gap-2">
                <span class="text-xl">🚗</span>
                <span class="font-bold">E-Inventory Mobil</span>
            </div>

            <div class="hidden md:flex items-center gap-1">
                <router-link to="/dashboard"
                    class="px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition"
                    active-class="bg-blue-600">Dashboard</router-link>
                <router-link to="/mobil"
                    class="px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition"
                    active-class="bg-blue-600">Data Mobil</router-link>
                <router-link to="/kategori"
                    class="px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition"
                    active-class="bg-blue-600">Kategori</router-link>
                <router-link to="/supplier"
                    class="px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition"
                    active-class="bg-blue-600">Supplier</router-link>
            </div>

            <div class="flex items-center gap-3">
                <span class="text-sm text-slate-300 hidden sm:inline">👤 {{ namaLengkap }}</span>
                <button @click="handleLogout"
                    class="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg text-sm font-semibold transition">
                    Logout
                </button>
            </div>
        </div>

        <!-- Menu mobile -->
        <div class="md:hidden flex justify-around border-t border-white/10 py-2">
            <router-link to="/dashboard" class="text-xs px-2 py-1 rounded" active-class="text-blue-400">Dashboard</router-link>
            <router-link to="/mobil" class="text-xs px-2 py-1 rounded" active-class="text-blue-400">Mobil</router-link>
            <router-link to="/kategori" class="text-xs px-2 py-1 rounded" active-class="text-blue-400">Kategori</router-link>
            <router-link to="/supplier" class="text-xs px-2 py-1 rounded" active-class="text-blue-400">Supplier</router-link>
        </div>
    </nav>
    `,
    data() {
        return {
            namaLengkap: localStorage.getItem('namaLengkap') || 'Admin',
        };
    },
    methods: {
        async handleLogout() {
            try {
                await apiClient.post('/logout');
            } catch (err) {
                console.warn('Logout di server gagal, tapi sesi lokal tetap dihapus.', err);
            } finally {
                // Tombol Logout dinamis: hapus seluruh sesi token di localStorage
                localStorage.removeItem('authToken');
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('namaLengkap');
                this.$router.push('/login');
            }
        },
    },
};
