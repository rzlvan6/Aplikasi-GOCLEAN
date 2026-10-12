GOCLEAN 

File:
- index.html: struktur halaman HTML.
- style.css: CSS kustom yang sebelumnya berada di tag <style>.
- tailwind.config.js: konfigurasi warna dan font Tailwind.
- script.js: JavaScript interaktif yang sebelumnya berada di bagian bawah HTML.

Catatan:
- Tailwind CSS tetap dimuat melalui CDN di index.html.
- Class utility Tailwind (contoh: flex, grid, px-4, text-slate-800) tetap berada di HTML karena memang cara kerja Tailwind.
- Dibutuhkan koneksi internet untuk memuat Tailwind CDN, Google Fonts, Font Awesome, dan gambar eksternal.
- Perbaikan kecil dilakukan pada tag header yang sebelumnya memiliki atribut id/class tidak valid.

Fitur tambahan: tombol dark mode / light mode tersedia di navbar desktop dan mobile. Tema mengikuti preferensi perangkat saat pertama dibuka, lalu pilihan pengguna disimpan di localStorage browser.
animasi bergulr lebih smooth dan tombol kebih kerasa halus
menambahakan chat bot supaya customer bisa di bantu dngan chat bot


UPDATE BACKGROUND VIDEO:
- Bagian hero halaman Home sekarang mendukung background video orang sedang cleaning yang bergerak.
- Letakkan video MP4 (landscape, disarankan 1920x1080) bernama "cleaning-background.mp4" di folder yang sama dengan index.html.
- Video akan autoplay, muted, loop, dan menyesuaikan ukuran layar.
- File video tidak disertakan dalam ZIP ini karena ZIP awal tidak memiliki video cleaning. Tanpa video tersebut, background gradasi tetap terlihat.
- menambahakan foto anggi dan rizal
- menambahkan maps & gmail
- menambahkan nomor operator
- 