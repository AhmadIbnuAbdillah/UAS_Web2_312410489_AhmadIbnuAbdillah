const Supplier = {
    components: { NavbarAdmin },
    template: `
    <div class="min-h-screen bg-slate-50">
        <navbar-admin></navbar-admin>

        <div class="max-w-6xl mx-auto px-4 py-8">
            <!-- Header Halaman -->
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <div>
                    <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Data Supplier</h1>
                    <p class="text-slate-500 mt-1">Kelola data pemasok atau mitra penyedia unit mobil.</p>
                </div>
                <button @click="openModalTambah"
                    class="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white px-5 py-3 rounded-2xl text-sm font-bold transition duration-200 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 flex items-center justify-center gap-2 self-start sm:self-auto">
                    <span>➕</span> Tambah Supplier
                </button>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-slate-400">
                <svg class="animate-spin h-10 w-10 text-amber-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="font-medium">Memuat data supplier...</span>
            </div>

            <!-- Empty State -->
            <div v-else-if="daftarSupplier.length === 0" class="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
                <span class="text-6xl block mb-4">🏢</span>
                <p class="text-slate-500 text-base">Belum ada supplier yang terdaftar.</p>
                <button @click="openModalTambah" class="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition">
                    Tambah Supplier Pertama
                </button>
            </div>

            <!-- Tabel Data Supplier -->
            <div v-else class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead class="bg-slate-50 text-slate-500 font-bold text-left border-b border-slate-100">
                            <tr>
                                <th class="px-6 py-4 text-xs uppercase tracking-wider">Nama Supplier</th>
                                <th class="px-6 py-4 text-xs uppercase tracking-wider">Alamat Kantor</th>
                                <th class="px-6 py-4 text-xs uppercase tracking-wider">No. Telepon</th>
                                <th class="px-6 py-4 text-xs uppercase tracking-wider">Email</th>
                                <th class="px-6 py-4 text-xs uppercase tracking-wider text-center w-40">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr v-for="item in daftarSupplier" :key="item.id" class="hover:bg-slate-50/50 transition">
                                <td class="px-6 py-4 font-bold text-slate-800">
                                    <span class="bg-slate-100 text-slate-700 text-xs px-2.5 py-1.5 rounded-lg mr-2 font-mono">#{{ item.id }}</span>
                                    {{ item.nama_supplier }}
                                </td>
                                <td class="px-6 py-4 text-slate-500 leading-relaxed max-w-xs truncate md:max-w-none">
                                    📍 {{ item.alamat || '-' }}
                                </td>
                                <td class="px-6 py-4 text-slate-600 font-mono text-xs">
                                    📞 {{ item.no_telepon || '-' }}
                                </td>
                                <td class="px-6 py-4 text-slate-600">
                                    ✉️ {{ item.email || '-' }}
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <div class="inline-flex gap-2">
                                        <button @click="openModalEdit(item)" 
                                            class="bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold px-3.5 py-2 rounded-xl text-xs transition flex items-center gap-1.5">
                                            <span>✏️</span> Edit
                                        </button>
                                        <button @click="hapusSupplier(item.id)" 
                                            class="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-3.5 py-2 rounded-xl text-xs transition flex items-center gap-1.5">
                                            <span>🗑️</span> Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal Tambah/Edit Supplier -->
        <div v-if="showModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">
            <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden p-6 md:p-8 max-h-[90vh] flex flex-col justify-between">
                <!-- Modal Title -->
                <div class="flex justify-between items-center mb-6 shrink-0">
                    <h2 class="text-xl font-bold text-slate-800">{{ isEdit ? 'Edit Supplier' : 'Tambah Supplier' }}</h2>
                    <button @click="closeModal" class="text-slate-400 hover:text-slate-600 font-bold transition text-lg">✕</button>
                </div>

                <!-- Formulir -->
                <form @submit.prevent="simpanSupplier" class="space-y-4 flex-1 flex flex-col justify-between min-h-0">
                    <div class="space-y-4 pr-1 overflow-y-auto max-h-[55vh]">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Supplier</label>
                            <input v-model="form.nama_supplier" type="text" required placeholder="Contoh: PT Astra Daihatsu Motor"
                                class="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Kantor</label>
                            <textarea v-model="form.alamat" rows="2" placeholder="Masukkan alamat lengkap..."
                                class="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition"></textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">No. Telepon</label>
                                <input v-model="form.no_telepon" type="text" placeholder="Contoh: 021-12345"
                                    class="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                                <input v-model="form.email" type="email" placeholder="sales@mitra.co.id"
                                    class="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition">
                            </div>
                        </div>

                        <!-- Error Alert -->
                        <p v-if="errorMessage" class="text-rose-500 text-xs bg-rose-50 border border-rose-100 rounded-xl px-3 py-2 mt-2">
                            ⚠️ {{ errorMessage }}
                        </p>
                    </div>

                    <!-- Modal Actions -->
                    <div class="flex gap-2 pt-4 border-t border-slate-100 shrink-0">
                        <button type="button" @click="closeModal"
                            class="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition">Batal</button>
                        <button type="submit" :disabled="saving"
                            class="flex-1 px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 text-white transition shadow-md hover:shadow-lg">
                            {{ saving ? 'Menyimpan...' : 'Simpan Data' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            loading: true,
            saving: false,
            daftarSupplier: [],
            showModal: false,
            isEdit: false,
            editId: null,
            errorMessage: '',
            form: { nama_supplier: '', alamat: '', no_telepon: '', email: '' },
        };
    },
    methods: {
        async fetchSupplier() {
            this.loading = true;
            try {
                const res = await apiClient.get('/supplier');
                this.daftarSupplier = res.data.data;
            } catch (err) {
                console.error('Gagal memuat data supplier:', err);
            } finally {
                this.loading = false;
            }
        },
        openModalTambah() {
            this.isEdit = false;
            this.editId = null;
            this.errorMessage = '';
            this.form = { nama_supplier: '', alamat: '', no_telepon: '', email: '' };
            this.showModal = true;
        },
        openModalEdit(item) {
            this.isEdit = true;
            this.editId = item.id;
            this.errorMessage = '';
            this.form = {
                nama_supplier: item.nama_supplier,
                alamat: item.alamat,
                no_telepon: item.no_telepon,
                email: item.email,
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async simpanSupplier() {
            this.saving = true;
            this.errorMessage = '';
            try {
                if (this.isEdit) {
                    await apiClient.put(`/supplier/${this.editId}`, this.form);
                } else {
                    await apiClient.post('/supplier', this.form);
                }
                this.showModal = false;
                this.fetchSupplier();
            } catch (err) {
                this.errorMessage = err.response?.data?.message || 'Gagal menyimpan data.';
            } finally {
                this.saving = false;
            }
        },
        async hapusSupplier(id) {
            if (!confirm('Yakin ingin menghapus supplier ini?')) return;
            try {
                await apiClient.delete(`/supplier/${id}`);
                this.fetchSupplier();
            } catch (err) {
                alert(err.response?.data?.message || 'Gagal menghapus data. Pastikan tidak ada mobil yang masih menggunakan supplier ini.');
            }
        },
    },
    mounted() {
        this.fetchSupplier();
    },
};
