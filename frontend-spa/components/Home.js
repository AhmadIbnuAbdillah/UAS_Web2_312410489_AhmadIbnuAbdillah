const Home = {
    template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <!-- Navbar Public -->
        <nav class="bg-white/5 backdrop-blur-sm border-b border-white/10">
            <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <span class="text-2xl">🚗</span>
                    <span class="text-white font-bold text-lg">E-Inventory Mobil</span>
                </div>
                <router-link to="/login"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition">
                    Login Admin
                </router-link>
            </div>
        </nav>

        <!-- Hero -->
        <div class="max-w-6xl mx-auto px-4 py-16 text-center">
            <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Sistem Manajemen Inventaris Mobil
            </h1>
            <p class="text-slate-300 max-w-2xl mx-auto mb-10">
                Kelola data stok mobil, kategori, dan supplier secara terpusat, cepat, dan rapi.
            </p>

            <!-- Loading -->
            <div v-if="loading" class="text-slate-400">Memuat data ringkasan...</div>

            <!-- Ringkasan -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-6">
                <div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <p class="text-3xl font-bold text-white">{{ summary.total_mobil }}</p>
                    <p class="text-slate-400 text-sm mt-1">Total Jenis Mobil</p>
                </div>
                <div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <p class="text-3xl font-bold text-emerald-400">{{ summary.total_stok }}</p>
                    <p class="text-slate-400 text-sm mt-1">Total Stok Unit</p>
                </div>
                <div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <p class="text-3xl font-bold text-sky-400">{{ summary.total_tersedia }}</p>
                    <p class="text-slate-400 text-sm mt-1">Status Tersedia</p>
                </div>
                <div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <p class="text-3xl font-bold text-rose-400">{{ summary.total_terjual }}</p>
                    <p class="text-slate-400 text-sm mt-1">Status Terjual</p>
                </div>
            </div>
        </div>

        <footer class="text-center text-slate-500 text-sm py-8">
            &copy; 2026 E-Inventory Mobil — Tugas UAS Pemrograman Web 2
        </footer>
    </div>
    `,
    data() {
        return {
            loading: true,
            summary: {
                total_mobil: 0,
                total_stok: 0,
                total_tersedia: 0,
                total_terjual: 0,
            },
        };
    },
    methods: {
        async fetchSummary() {
            try {
                const res = await apiClient.get('/mobil/summary');
                this.summary = res.data.data;
            } catch (err) {
                console.error('Gagal memuat ringkasan data:', err);
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        this.fetchSummary();
    },
};
