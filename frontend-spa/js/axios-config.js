// =====================================================
// KONFIGURASI GLOBAL AXIOS
// =====================================================

// Sesuaikan dengan base URL backend CodeIgniter 4 kamu
const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// =====================================================
// REQUEST INTERCEPTOR
// Menyuntikkan token dari localStorage secara otomatis
// ke setiap request yang dikirim
// =====================================================
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// =====================================================
// RESPONSE INTERCEPTOR
// Menangkap error 401 Unauthorized secara global,
// menghapus sesi, alert, dan redirect ke halaman login
// =====================================================
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Hapus seluruh sesi di localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('namaLengkap');

            alert('Sesi Anda telah habis. Silakan login kembali.');

            // Redirect manual ke halaman login (hard redirect aman dipakai di luar konteks komponen)
            window.location.hash = '#/login';
        }
        return Promise.reject(error);
    }
);
