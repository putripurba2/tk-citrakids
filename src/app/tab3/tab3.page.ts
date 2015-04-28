import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit, OnDestroy {
  daftarPendaftar: any[] = [];
  private refreshInterval: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();

    // Auto refresh setiap 5 detik
    this.refreshInterval = setInterval(() => {
      this.loadData();
    }, 5000); // 5000 milidetik = 5 detik
  }

  ngOnDestroy() {
    // Hentikan interval saat tab ditutup/ganti
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  loadData() {
    const url = 'https://yantypurba.ti-zone.io/get_riwayat.php';

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.success && response.data) {
          this.daftarPendaftar = response.data;
        } else {
          this.daftarPendaftar = [];
          console.warn('Tidak ada data:', response.message);
        }
      },
      (error) => {
        console.error('Gagal ambil data:', error);
      }
    );
  }
}
