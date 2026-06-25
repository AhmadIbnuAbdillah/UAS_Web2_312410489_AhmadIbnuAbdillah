const NotFound = {
    template: `
    <div class="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <h1 class="text-6xl font-extrabold">404</h1>
        <p class="text-slate-400 mt-2 mb-6">Halaman yang Anda cari tidak ditemukan.</p>
        <router-link to="/" class="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg text-sm font-semibold">
            Kembali ke Beranda
        </router-link>
    </div>
    `,
};
