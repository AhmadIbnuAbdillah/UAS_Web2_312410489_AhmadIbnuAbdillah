const Dashboard = {
    components: { NavbarAdmin },
    template: `
    <div class="min-h-screen bg-slate-50">
        <navbar-admin></navbar-admin>

        <div class="max-w-6xl mx-auto px-4 py-8">
            <!-- Selamat Datang & Judul -->
            <div class="mb-8">
                <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Admin</h1>
                <p class="text-slate-500 mt-1">Selamat datang kembali, <span class="font-bold text-slate-800">{{ namaLengkap }}</span> 👋</p>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-slate-400">
                <svg class="animate-spin h-10 w-10 text-blue-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="font-medium">Memuat ringkasan data...</span>
            </div>

            <!-- Statistik Grid -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Total Jenis Mobil -->
                <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Jenis Mobil</p>
                        <p class="text-3xl font-extrabold text-slate-800 mt-2">{{ summary.total_mobil }}</p>
                    </div>
                    <div class="bg-blue-50 text-blue-600 text-2xl w-12 h-12 rounded-2xl flex items-center justify-center font-bold">
                        🚗
                    </div>
                </div>

                <!-- Total Stok Unit -->
                <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Stok Unit</p>
                        <p class="text-3xl font-extrabold text-emerald-600 mt-2">{{ summary.total_stok }}</p>
                    </div>
                    <div class="bg-emerald-50 text-emerald-600 text-2xl w-12 h-12 rounded-2xl flex items-center justify-center font-bold">
                        📦
                    </div>
                </div>

                <!-- Status Tersedia -->
                <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Tersedia</p>
                        <p class="text-3xl font-extrabold text-sky-600 mt-2">{{ summary.total_tersedia }}</p>
                    </div>
                    <div class="bg-sky-50 text-sky-600 text-2xl w-12 h-12 rounded-2xl flex items-center justify-center font-bold">
                        ✅
                    </div>
                </div>

                <!-- Status Terjual -->
                <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Terjual</p>
                        <p class="text-3xl font-extrabold text-rose-600 mt-2">{{ summary.total_terjual }}</p>
                    </div>
                    <div class="bg-rose-50 text-rose-600 text-2xl w-12 h-12 rounded-2xl flex items-center justify-center font-bold">
                        🏷️
                    </div>
                </div>
            </div>

            <!-- Navigasi Cepat -->
            <div class="mt-10 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
                <h2 class="text-lg font-bold text-slate-800 mb-2">Navigasi Cepat</h2>
                <p class="text-slate-500 text-sm mb-6">Akses cepat ke modul manajemen data inventaris lainnya.</p>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <!-- Kelola Data Mobil -->
                    <router-link to="/mobil" 
                        class="group bg-blue-50/50 hover:bg-blue-50 border border-blue-100/60 rounded-2xl p-5 transition text-left flex items-start gap-4">
                        <span class="text-2xl bg-blue-100/60 rounded-xl w-10 h-10 flex items-center justify-center">🚗</span>
                        <div>
                            <h4 class="font-bold text-blue-900 text-sm group-hover:text-blue-700 transition">Kelola Data Mobil</h4>
                            <p class="text-blue-600 text-xs mt-1">Lihat katalog grid, edit unit, & status inventaris.</p>
                        </div>
                    </router-link>

                    <!-- Kelola Kategori -->
                    <router-link to="/kategori" 
                        class="group bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100/60 rounded-2xl p-5 transition text-left flex items-start gap-4">
                        <span class="text-2xl bg-emerald-100/60 rounded-xl w-10 h-10 flex items-center justify-center">📂</span>
                        <div>
                            <h4 class="font-bold text-emerald-900 text-sm group-hover:text-emerald-700 transition">Kelola Kategori</h4>
                            <p class="text-emerald-600 text-xs mt-1">Atur pengelompokan jenis (SUV, Sedan, dll).</p>
                        </div>
                    </router-link>

                    <!-- Kelola Supplier -->
                    <router-link to="/supplier" 
                        class="group bg-amber-50/50 hover:bg-amber-50 border border-amber-100/60 rounded-2xl p-5 transition text-left flex items-start gap-4">
                        <span class="text-2xl bg-amber-100/60 rounded-xl w-10 h-10 flex items-center justify-center">🏢</span>
                        <div>
                            <h4 class="font-bold text-amber-900 text-sm group-hover:text-amber-700 transition">Kelola Supplier</h4>
                            <p class="text-amber-600 text-xs mt-1">Manajemen data pemasok & kontak resmi.</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            loading: true,
            namaLengkap: localStorage.getItem('namaLengkap') || 'Admin',
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
                console.error('Gagal memuat ringkasan:', err);
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        this.fetchSummary();
    },
};
