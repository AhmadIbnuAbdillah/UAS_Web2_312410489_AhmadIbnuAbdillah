const Login = {
    template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <div class="text-center mb-8">
                <span class="text-4xl"></span>
                <h1 class="text-2xl font-bold text-slate-800 mt-2">E-Inventory Mobil</h1>
                <p class="text-slate-500 text-sm mt-1">Masuk ke panel administrator</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Username</label>
                    <input
                        v-model="username"
                        type="text"
                        required
                        placeholder="Masukkan username"
                        class="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                </div>

                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input
                        v-model="password"
                        type="password"
                        required
                        placeholder="Masukkan password"
                        class="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                </div>

                <p v-if="errorMessage" class="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {{ errorMessage }}
                </p>

                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2.5 rounded-lg transition"
                >
                    {{ loading ? 'Memproses...' : 'Login' }}
                </button>
            </form>

            <router-link to="/" class="block text-center text-sm text-slate-500 hover:text-blue-600 mt-6">
                &larr; Kembali ke Beranda
            </router-link>
        </div>
    </div>
    `,
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            loading: false,
        };
    },
    methods: {
        async handleLogin() {
            this.errorMessage = '';
            this.loading = true;
            try {
                const res = await apiClient.post('/login', {
                    username: this.username,
                    password: this.password,
                });

                const { token, nama_lengkap } = res.data.data;

                // Simpan sesi ke localStorage
                localStorage.setItem('authToken', token);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('namaLengkap', nama_lengkap);

                this.$router.push('/dashboard');
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    this.errorMessage = err.response.data.message;
                } else {
                    this.errorMessage = 'Terjadi kesalahan. Periksa koneksi ke server backend.';
                }
            } finally {
                this.loading = false;
            }
        },
    },
};
