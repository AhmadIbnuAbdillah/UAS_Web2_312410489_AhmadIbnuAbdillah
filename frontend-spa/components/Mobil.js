const Mobil = {
    components: { NavbarAdmin },
    template: `
    <div class="min-h-screen bg-slate-50">
        <navbar-admin></navbar-admin>

        <div class="max-w-6xl mx-auto px-4 py-8">
            <!-- Header Halaman -->
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <div>
                    <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Katalog Data Mobil</h1>
                    <p class="text-slate-500 mt-1">Kelola data inventaris unit mobil beserta informasi spesifikasinya.</p>
                </div>
                <button @click="openModalTambah"
                    class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-3 rounded-2xl text-sm font-bold transition duration-200 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 flex items-center justify-center gap-2 self-start sm:self-auto">
                    <span>➕</span> Tambah Unit Mobil
                </button>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-slate-400">
                <svg class="animate-spin h-10 w-10 text-blue-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="font-medium">Memuat data inventaris...</span>
            </div>

            <!-- Empty State -->
            <div v-else-if="daftarMobil.length === 0" class="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
                <span class="text-6xl block mb-4">🚗</span>
                <p class="text-slate-500 text-base">Belum ada unit mobil yang terdaftar di sistem.</p>
                <button @click="openModalTambah" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition">
                    Daftarkan Mobil Pertama
                </button>
            </div>

            <!-- Grid Card Tampilan Mobil -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="item in daftarMobil" :key="item.id" 
                     class="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition duration-300 flex flex-col cursor-pointer"
                     @click="openModalDetail(item)">
                    
                    <!-- Area Foto / Gambar Mobil -->
                    <div class="relative h-48 overflow-hidden bg-slate-100">
                        <img :src="item.gambar || getFallbackImage(item.nama_kategori)" 
                             :alt="item.nama_mobil"
                             class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        
                        <!-- Badges Kategori & Status -->
                        <div class="absolute top-4 left-4">
                            <span class="bg-slate-900/85 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider">
                                {{ item.nama_kategori }}
                            </span>
                        </div>
                        <div class="absolute top-4 right-4">
                            <span :class="statusBadge(item.status)" class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                {{ item.status }}
                            </span>
                        </div>
                    </div>

                    <!-- Informasi Card -->
                    <div class="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <span class="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{{ item.merek }}</span>
                            <h3 class="text-xl font-bold text-slate-800 mt-1 leading-snug group-hover:text-blue-600 transition">{{ item.nama_mobil }}</h3>
                            
                            <!-- Spesifikasi Singkat -->
                            <div class="mt-4 grid grid-cols-2 gap-y-2.5 text-xs text-slate-500 border-t border-slate-50 pt-4">
                                <div class="flex items-center gap-1.5">
                                    <span class="text-sm">📅</span>
                                    <span>Tahun {{ item.tahun_produksi }}</span>
                                </div>
                                <div class="flex items-center gap-1.5">
                                    <span class="text-sm">📦</span>
                                    <span>Stok: <strong>{{ item.stok }} unit</strong></span>
                                </div>
                                <div class="flex items-center gap-1.5 col-span-2">
                                    <span class="text-sm">🏢</span>
                                    <span class="truncate">Supplier: {{ item.nama_supplier }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Harga & Action Trigger -->
                        <div class="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                            <div>
                                <p class="text-slate-400 text-[9px] uppercase font-bold tracking-wider">Harga Unit</p>
                                <p class="text-lg font-extrabold text-blue-600">Rp {{ formatRupiah(item.harga) }}</p>
                            </div>
                            <span class="text-blue-600 group-hover:translate-x-1.5 transition duration-300 text-xs font-bold flex items-center gap-1">
                                Detail <span>&rarr;</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Unified Pop-up Modal (Detail, Edit & Tambah) -->
        <div v-if="showModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-4 overflow-y-auto">
            <div class="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden transition-all transform duration-300 flex flex-col md:flex-row max-h-[95vh] md:max-h-[85vh]">
                
                <!-- SISI KIRI: Image Preview & Banner -->
                <div class="md:w-1/2 bg-slate-900 relative h-52 md:h-auto flex flex-col justify-between overflow-hidden shrink-0">
                    <img :src="form.gambar || (selectedCar ? (selectedCar.gambar || getFallbackImage(selectedCar.nama_kategori)) : 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80')" 
                         class="absolute inset-0 w-full h-full object-cover opacity-75 animate-fade-in"
                         alt="Preview Mobil">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>
                    
                    <!-- Close button untuk tampilan mobile -->
                    <button @click="closeModal" class="absolute top-4 right-4 md:hidden bg-black/40 hover:bg-black/60 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center text-lg font-bold z-10">✕</button>

                    <!-- Informasi Utama di Atas Gambar (Floating) -->
                    <div class="relative p-6 mt-auto">
                        <span class="bg-blue-600 text-white text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                            {{ isAdding ? 'Unit Baru' : (selectedCar ? selectedCar.nama_kategori : 'Mobil') }}
                        </span>
                        <h2 class="text-2xl md:text-3xl font-extrabold text-white mt-2 drop-shadow-md">
                            {{ isAdding ? (form.nama_mobil || 'Nama Mobil') : (isEditing ? form.nama_mobil : (selectedCar ? selectedCar.nama_mobil : '')) }}
                        </h2>
                        <p class="text-slate-300 text-sm font-semibold tracking-wider uppercase mt-0.5">
                            {{ isAdding ? (form.merek || 'Merek') : (isEditing ? form.merek : (selectedCar ? selectedCar.merek : '')) }}
                        </p>
                    </div>
                </div>

                <!-- SISI KANAN: Detail View ATAU Input Form -->
                <div class="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between bg-white min-h-0">
                    <!-- Close button untuk tampilan desktop -->
                    <div class="hidden md:flex justify-end mb-2">
                        <button @click="closeModal" class="text-slate-400 hover:text-slate-600 font-bold transition text-lg">✕</button>
                    </div>

                    <!-- 1. KONTEN DETAIL (Tampilan Hanya Baca) -->
                    <div v-if="!isEditing && !isAdding && selectedCar" class="space-y-5 flex-1">
                        <div class="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h3 class="text-lg font-bold text-slate-800">Spesifikasi Detail</h3>
                            <span :class="statusBadge(selectedCar.status)" class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                                {{ selectedCar.status }}
                            </span>
                        </div>

                        <div class="grid grid-cols-2 gap-x-4 gap-y-3.5 text-sm">
                            <div>
                                <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Tahun Produksi</p>
                                <p class="text-slate-800 font-semibold mt-1">📅 {{ selectedCar.tahun_produksi }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Warna Unit</p>
                                <p class="text-slate-800 font-semibold mt-1">🎨 {{ selectedCar.warna || '-' }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Nomor Plat</p>
                                <p class="text-slate-800 font-semibold mt-1">🆔 {{ selectedCar.no_plat || '-' }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Jumlah Stok</p>
                                <p class="text-slate-800 font-semibold mt-1">📦 {{ selectedCar.stok }} Unit</p>
                            </div>
                            <div class="col-span-2">
                                <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Kategori Mobil</p>
                                <p class="text-slate-800 font-semibold mt-1">📂 {{ selectedCar.nama_kategori }}</p>
                            </div>
                            <div class="col-span-2">
                                <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Pemasok / Supplier</p>
                                <p class="text-slate-800 font-semibold mt-1">🏢 {{ selectedCar.nama_supplier }}</p>
                            </div>
                            <div class="col-span-2 bg-blue-50 border border-blue-100 rounded-2xl p-4">
                                <p class="text-xs text-blue-600 font-bold uppercase tracking-wider font-semibold">Harga Inventaris</p>
                                <p class="text-2xl font-extrabold text-blue-700 mt-1">Rp {{ formatRupiah(selectedCar.harga) }}</p>
                            </div>
                        </div>

                        <!-- Tombol Aksi di Tampilan Detail -->
                        <div class="flex gap-3 pt-6 border-t border-slate-100">
                            <button @click="startEdit" 
                                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                <span>✏️</span> Edit Data
                            </button>
                            <button @click="hapusMobil(selectedCar.id)" 
                                    class="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-3 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2">
                                <span>🗑️</span> Hapus
                            </button>
                        </div>
                    </div>

                    <!-- 2. KONTEN FORMULIR (Edit atau Tambah) -->
                    <form v-else @submit.prevent="simpanMobil" class="space-y-4 flex-1 flex flex-col justify-between min-h-0">
                        <div class="space-y-3 overflow-y-auto pr-1 max-h-[50vh] md:max-h-[52vh]">
                            <h3 class="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">
                                {{ isEditing ? 'Edit Data Mobil' : 'Tambah Mobil Baru' }}
                            </h3>

                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Mobil</label>
                                <input v-model="form.nama_mobil" type="text" required placeholder="Contoh: Civic, Avanza"
                                    class="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition">
                            </div>

                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Merek</label>
                                    <input v-model="form.merek" type="text" required placeholder="Contoh: Honda"
                                        class="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Tahun Produksi</label>
                                    <input v-model="form.tahun_produksi" type="number" required placeholder="2024"
                                        class="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition">
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Kategori</label>
                                    <select v-model="form.kategori_id" required
                                        class="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition bg-white">
                                        <option value="" disabled>Pilih kategori</option>
                                        <option v-for="k in daftarKategori" :key="k.id" :value="k.id">{{ k.nama_kategori }}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Supplier</label>
                                    <select v-model="form.supplier_id" required
                                        class="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition bg-white">
                                        <option value="" disabled>Pilih supplier</option>
                                        <option v-for="s in daftarSupplier" :key="s.id" :value="s.id">{{ s.nama_supplier }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Warna</label>
                                    <input v-model="form.warna" type="text" placeholder="Hitam, Putih"
                                        class="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">No. Plat</label>
                                    <input v-model="form.no_plat" type="text" placeholder="B 1234 XYZ"
                                        class="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition">
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Stok Unit</label>
                                    <input v-model="form.stok" type="number" required placeholder="5"
                                        class="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Status</label>
                                    <select v-model="form.status"
                                        class="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition bg-white">
                                        <option value="tersedia">Tersedia</option>
                                        <option value="terjual">Terjual</option>
                                        <option value="maintenance">Maintenance</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Harga Unit (Rp)</label>
                                <input v-model="form.harga" type="number" required placeholder="Harga dalam Rupiah"
                                    class="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition">
                            </div>

                            <!-- INPUT GAMBAR (Upload atau URL) -->
                            <div class="border-t border-slate-100 pt-3 mt-3 space-y-3">
                                <label class="block text-xs font-extrabold text-slate-600 uppercase tracking-wider">Gambar Unit Mobil</label>
                                
                                <!-- Opsi 1: Upload File -->
                                <div>
                                    <span class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Opsi A: Upload dari Galeri</span>
                                    <div class="flex items-center gap-3">
                                        <label class="cursor-pointer bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition border border-slate-200 flex items-center gap-1.5 select-none">
                                            <span>📷</span> Pilih File Gambar
                                            <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="hidden">
                                        </label>
                                        
                                        <span v-if="uploading" class="text-xs text-blue-600 font-semibold animate-pulse flex items-center gap-1">
                                            <svg class="animate-spin h-3.5 w-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Mengupload...
                                        </span>
                                        <span v-else-if="isFileUploaded" class="text-xs text-emerald-600 font-bold flex items-center gap-1">
                                            ✅ Berhasil Terupload
                                        </span>
                                        <span v-else class="text-xs text-slate-400">Belum ada file terpilih</span>
                                    </div>
                                </div>

                                <!-- Opsi 2: Tautan Web -->
                                <div>
                                    <span class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Opsi B: Tautan / URL Gambar Web</span>
                                    <input v-model="form.gambar" type="text" placeholder="https://unsplash.com/... (atau hasil upload otomatis)"
                                        @input="isFileUploaded = false"
                                        class="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition">
                                </div>
                            </div>

                            <p v-if="errorMessage" class="text-rose-500 text-xs bg-rose-50 border border-rose-100 rounded-xl px-3 py-2 mt-2">
                                ⚠️ {{ errorMessage }}
                            </p>
                        </div>

                        <!-- Tombol Batal / Simpan -->
                        <div class="flex gap-2 pt-4 border-t border-slate-100 shrink-0">
                            <button type="button" @click="cancelEdit"
                                    class="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition">
                                Batal
                             </button>
                            <button type="submit" :disabled="saving || uploading"
                                    class="flex-1 px-5 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white transition shadow-md hover:shadow-lg">
                                {{ saving ? 'Menyimpan...' : 'Simpan Data' }}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
    `,
    data() {
        return {
            loading: true,
            saving: false,
            uploading: false,
            isFileUploaded: false,
            daftarMobil: [],
            daftarKategori: [],
            daftarSupplier: [],
            showModal: false,
            isEditing: false,
            isAdding: false,
            selectedCar: null,
            errorMessage: '',
            form: this.formKosong(),
        };
    },
    methods: {
        formKosong() {
            return {
                nama_mobil: '', merek: '', kategori_id: '', supplier_id: '',
                tahun_produksi: '', warna: '', no_plat: '', harga: '',
                stok: '', status: 'tersedia', gambar: '',
            };
        },
        formatRupiah(angka) {
            return new Intl.NumberFormat('id-ID').format(angka);
        },
        statusBadge(status) {
            if (status === 'tersedia') return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
            if (status === 'terjual') return 'bg-rose-100 text-rose-800 border border-rose-200';
            return 'bg-amber-100 text-amber-800 border border-amber-200';
        },
        getFallbackImage(kategori) {
            const defaultCarImages = {
                'SUV': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
                'MPV': 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=600&q=80',
                'Sedan': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80',
                'Hatchback': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80',
                'default': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'
            };
            return defaultCarImages[kategori] || defaultCarImages['default'];
        },
        async fetchMobil() {
            this.loading = true;
            try {
                const res = await apiClient.get('/mobil');
                this.daftarMobil = res.data.data;
            } catch (err) {
                console.error('Gagal memuat data mobil:', err);
            } finally {
                this.loading = false;
            }
        },
        async fetchKategoriSupplier() {
            try {
                const [resKategori, resSupplier] = await Promise.all([
                    apiClient.get('/kategori'),
                    apiClient.get('/supplier'),
                ]);
                this.daftarKategori = resKategori.data.data;
                this.daftarSupplier = resSupplier.data.data;
            } catch (err) {
                console.error('Gagal memuat kategori/supplier:', err);
            }
        },
        openModalDetail(item) {
            this.selectedCar = item;
            this.isEditing = false;
            this.isAdding = false;
            this.errorMessage = '';
            this.isFileUploaded = false;
            this.form = this.formKosong(); // reset form bindings
            this.showModal = true;
        },
        openModalTambah() {
            this.selectedCar = null;
            this.isEditing = false;
            this.isAdding = true;
            this.errorMessage = '';
            this.isFileUploaded = false;
            this.form = this.formKosong();
            this.showModal = true;
        },
        startEdit() {
            if (!this.selectedCar) return;
            this.isEditing = true;
            this.isAdding = false;
            this.errorMessage = '';
            this.isFileUploaded = false;
            this.form = {
                nama_mobil: this.selectedCar.nama_mobil,
                merek: this.selectedCar.merek,
                kategori_id: this.selectedCar.kategori_id,
                supplier_id: this.selectedCar.supplier_id,
                tahun_produksi: this.selectedCar.tahun_produksi,
                warna: this.selectedCar.warna,
                no_plat: this.selectedCar.no_plat,
                harga: this.selectedCar.harga,
                stok: this.selectedCar.stok,
                status: this.selectedCar.status,
                gambar: this.selectedCar.gambar || '',
            };
        },
        cancelEdit() {
            if (this.isAdding) {
                this.closeModal();
            } else {
                this.isEditing = false;
                this.isAdding = false;
                this.errorMessage = '';
            }
        },
        closeModal() {
            this.showModal = false;
            this.selectedCar = null;
            this.isEditing = false;
            this.isAdding = false;
            this.isFileUploaded = false;
        },
        async handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            this.uploading = true;
            this.errorMessage = '';
            this.isFileUploaded = false;

            const formData = new FormData();
            formData.append('gambar_file', file);

            try {
                const res = await apiClient.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.form.gambar = res.data.url;
                this.isFileUploaded = true;
            } catch (err) {
                this.errorMessage = err.response?.data?.message || 'Gagal mengupload gambar. Pastikan ukuran di bawah 5MB dan tipe file gambar.';
                if (this.$refs.fileInput) {
                    this.$refs.fileInput.value = '';
                }
            } finally {
                this.uploading = false;
            }
        },
        async simpanMobil() {
            this.saving = true;
            this.errorMessage = '';
            try {
                let res;
                if (this.isEditing && this.selectedCar) {
                    res = await apiClient.put(`/mobil/${this.selectedCar.id}`, this.form);
                    this.selectedCar = res.data.data;
                    this.isEditing = false;
                } else {
                    res = await apiClient.post('/mobil', this.form);
                    this.showModal = false;
                }
                this.fetchMobil();
            } catch (err) {
                this.errorMessage = err.response?.data?.message || 'Gagal menyimpan data.';
            } finally {
                this.saving = false;
            }
        },
        async hapusMobil(id) {
            if (!confirm('Yakin ingin menghapus data mobil ini?')) return;
            try {
                await apiClient.delete(`/mobil/${id}`);
                this.closeModal();
                this.fetchMobil();
            } catch (err) {
                alert(err.response?.data?.message || 'Gagal menghapus data.');
            }
        },
    },
    mounted() {
        this.fetchMobil();
        this.fetchKategoriSupplier();
    },
};
