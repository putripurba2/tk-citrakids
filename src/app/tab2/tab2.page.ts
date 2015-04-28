import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  formData = {
    nama_lengkap: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    nama_ortu: '',
    alamat: '',
    no_hp: '',
    email: '',
    tanggal_daftar: ''
  };

  constructor(private http: HttpClient) {}

  submitForm() {
    // Validasi: semua field harus diisi
    for (const key in this.formData) {
      if (!this.formData[key as keyof typeof this.formData]) {
        alert(`Field '${key}' masih kosong`);
        return;
      }
    }

    // Validasi dan format tanggal_lahir
    const tglLahir = new Date(this.formData.tanggal_lahir);
    if (isNaN(tglLahir.getTime())) {
      alert('Tanggal lahir tidak valid!');
      return;
    }
    const formattedTglLahir = tglLahir.toISOString().slice(0, 10); // YYYY-MM-DD

    // Format tanggal daftar (sekarang)
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 19).replace('T', ' '); // YYYY-MM-DD HH:MM:SS

    const payload = {
      ...this.formData,
      tanggal_lahir: formattedTglLahir,
      tanggal_daftar: formattedNow
    };

    const url = 'https://yantypurba.ti-zone.io/insert.php';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>(url, payload, { headers }).subscribe(
      (response) => {
        console.log('Berhasil:', response);
        if (response && response.success) {
          alert(response.message);
          this.resetForm();
        } else {
          alert('Gagal: ' + (response?.message || 'Respon tidak valid dari server'));
        }
      },
      (error) => {
        console.error('Gagal:', error);
        alert('Terjadi kesalahan saat mengirim data ke server.');
      }
    );
  }

  resetForm() {
    this.formData = {
      nama_lengkap: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      nama_ortu: '',
      alamat: '',
      no_hp: '',
      email: '',
      tanggal_daftar: ''
    };
  }
}
