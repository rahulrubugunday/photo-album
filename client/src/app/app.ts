import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class App {
  private http = inject(HttpClient);

  photos = signal<any[]>([]);
  current = signal<any>(null);
  error = signal('');

  constructor() {
    this.http.get<any[]>('/api/photos').subscribe(photos => this.photos.set(photos));
  }

  upload(input: HTMLInputElement) {
    const form = new FormData();
    form.append('photo', input.files![0]);
    this.http.post<any>('/api/photos', form).subscribe({
      next: photo => { this.photos.update(p => [...p, photo]); this.error.set(''); input.value = ''; },
      error: e => this.error.set(e.error.error)
    });
  }
}
