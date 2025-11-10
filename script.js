document.getElementById('permitForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Mencegah reload halaman

    // Ambil data dari form
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Validasi sederhana (opsional, bisa ditambah)
    if (!data.requester || !data.studentName || !data.reason || !data.date || !data.schoolEmail || !data.parentEmail || !data.whatsappNumber) {
        document.getElementById('message').innerText = 'Harap isi semua field!';
        document.getElementById('message').style.color = 'red';
        return;
    }

    try {
        // Kirim ke backend (ganti URL dengan endpoint Anda, e.g., http://localhost:3000/api/submit-permit)
        const response = await fetch('http://localhost:3000/api/submit-permit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            document.getElementById('message').innerText = 'Permintaan izin berhasil dikirim! Cek email/WA untuk konfirmasi.';
            document.getElementById('message').style.color = 'green';
            event.target.reset(); // Reset form
        } else {
            throw new Error('Gagal mengirim');
        }
    } catch (error) {
        document.getElementById('message').innerText = 'Terjadi kesalahan. Coba lagi.';
        document.getElementById('message').style.color = 'red';
        console.error(error);
    }
});
