document.getElementById('permitForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const form = event.target;
  const messageEl = document.getElementById('message');

  // Ambil data dari form
  const data = {
    requester: form.requester.value.trim(),
    studentName: form.studentName.value.trim(),
    reason: form.reason.value.trim(),
    date: form.date.value, // format YYYY-MM-DD sudah benar dari input[type=date]
    schoolEmail: form.schoolEmail.value.trim(),
    parentEmail: form.parentEmail.value.trim(),
    whatsappNumber: form.whatsappNumber.value.trim()
  };

  // Validasi sederhana
  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      messageEl.innerText = `Field ${key} wajib diisi.`;
      messageEl.style.color = 'red';
      return;
    }
  }

  try {
    const response = await fetch('http://localhost:3000/api/submit-permit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });

    if (response.ok) {
      messageEl.innerText = 'Permintaan izin berhasil dikirim! Cek email/WhatsApp untuk konfirmasi.';
      messageEl.style.color = 'green';
      form.reset();
    } else {
      const text = await response.text();
      messageEl.innerText = `Gagal mengirim: ${text}`;
      messageEl.style.color = 'red';
    }
  } catch (error) {
    messageEl.innerText = `Terjadi kesalahan: ${error.message}`;
    messageEl.style.color = 'red';
    console.error('Error:', error);
  }
});
