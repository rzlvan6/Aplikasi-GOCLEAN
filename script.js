// JavaScript GOCLEAN: interaksi menu, pemesanan, galeri, testimoni, dan animasi.

// Operator phone directory
        const OPERATOR_PHONES = {
            'Anggi': '6285780762560',
            'Arbie': '62895340806586',
            'Rizal': '6287887372585',
        };

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when link clicked
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Set default minimum date for booking picker (Today)
        document.addEventListener('DOMContentLoaded', () => {
            const dateInput = document.getElementById('workDate');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.min = today;
                dateInput.value = today;
            }
            // Trigger initial calculation
            calculateTotal();
            initCounters();
        });

        // Calculate dynamic pricing based on category selected
        function calculateTotal() {
            const service = document.getElementById('serviceType').value;
            const qtyInput = document.getElementById('quantityInput');
            const qtyLabel = document.getElementById('quantityLabel');
            const formulaText = document.getElementById('formulaText');
            const totalDisplay = document.getElementById('totalCostDisplay');

            let qty = parseInt(qtyInput.value) || 1;
            if (qty < 1) {
                qty = 1;
                qtyInput.value = 1;
            }

            let unitPrice = 0;
            let isHourly = true;

            if (service === 'Cuci Sepatu' || service === 'Cuci Tas') {
                isHourly = false;
                unitPrice = 35000;
                qtyLabel.innerHTML = 'Jumlah Item (Pcs) <span class="text-rose-500">*</span>';
            } else {
                isHourly = true;
                unitPrice = 50000;
                qtyLabel.innerHTML = 'Durasi Kerja (Jam) <span class="text-rose-500">*</span>';
            }

            const total = qty * unitPrice;
            const formattedTotal = 'Rp ' + total.toLocaleString('id-ID');

            if (isHourly) {
                formulaText.innerHTML = `Perhitungan: ${qty} Jam x Rp 50.000 = ${formattedTotal}`;
            } else {
                formulaText.innerHTML = `Perhitungan: ${qty} Item x Rp 35.000 = ${formattedTotal}`;
            }

            totalDisplay.innerText = formattedTotal;
        }

        // Quick select service from Service Cards
        function selectService(serviceName) {
            const serviceSelect = document.getElementById('serviceType');
            serviceSelect.value = serviceName;
            calculateTotal();
            
            // Scroll smoothly to form
            document.getElementById('pemesanan').scrollIntoView({ behavior: 'smooth' });
        }

        // Quick select operator from Operator Cards
        function selectOperator(operatorName) {
            const operatorSelect = document.getElementById('selectedOperator');
            operatorSelect.value = operatorName;

            // Scroll smoothly to form
            document.getElementById('pemesanan').scrollIntoView({ behavior: 'smooth' });
        }

        // Handle Booking Form Submission & WhatsApp dispatch
        function handleBookingSubmit(event) {
            event.preventDefault();

            const name = document.getElementById('custName').value.trim();
            const phone = document.getElementById('custPhone').value.trim();
            const address = document.getElementById('custAddress').value.trim();
            const service = document.getElementById('serviceType').value;
            const operator = document.getElementById('selectedOperator').value;
            const date = document.getElementById('workDate').value;
            const time = document.getElementById('workTime').value;
            const qty = document.getElementById('quantityInput').value;
            const notes = document.getElementById('additionalNotes').value.trim();
            const totalDisplay = document.getElementById('totalCostDisplay').innerText;

            const isHourly = (service !== 'Cuci Sepatu' && service !== 'Cuci Tas');
            const qtyUnit = isHourly ? 'Jam' : 'Item/Pcs';

            // Formatted WhatsApp message
            let message = `Halo GOCLEAN,\n\nSaya ingin memesan layanan kebersihan.\n\n` +
                          `📌 *Detail Pemesanan:*\n` +
                          `• Nama Lengkap: ${name}\n` +
                          `• Nomor WA: ${phone}\n` +
                          `• Alamat Pengerjaan: ${address}\n` +
                          `• Jenis Layanan: ${service}\n` +
                          `• Operator Pilihan: ${operator}\n` +
                          `• Tanggal: ${date}\n` +
                          `• Jam Pengerjaan: ${time}\n` +
                          `• ${isHourly ? 'Durasi Kerja' : 'Jumlah Item'}: ${qty} ${qtyUnit}\n` +
                          `• Total Estimasi: ${totalDisplay}\n\n`;

            if (notes) {
                message += `*Catatan Tambahan:*\n${notes}\n\n`;
            }

            message += `Mohon konfirmasi ketersediaan jadwal. Terima kasih!`;

            // Get operator WhatsApp target number
            const targetPhone = OPERATOR_PHONES[operator] || '62895340806586, 6287887372585, 6285780762560';
            const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;

            // Open WhatsApp in new tab
            window.open(waUrl, '_blank');
        }

        // Gallery Filter Logic
        function filterGallery(category) {
            const items = document.querySelectorAll('.gallery-item');
            const filterBtns = document.querySelectorAll('.gallery-filter-btn');

            filterBtns.forEach(btn => {
                btn.classList.remove('bg-sky-600', 'text-white', 'active');
                btn.classList.add('bg-slate-100', 'text-slate-600');
            });

            // Highlight active button
            event.target.classList.remove('bg-slate-100', 'text-slate-600');
            event.target.classList.add('bg-sky-600', 'text-white', 'active');

            items.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Lightbox Modal functions
        function openLightbox(imgSrc, title) {
            document.getElementById('lightboxImg').src = imgSrc;
            document.getElementById('lightboxTitle').innerText = title;
            const modal = document.getElementById('lightboxModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeLightbox() {
            const modal = document.getElementById('lightboxModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        // Testimonials Slider Logic
        let currentSlide = 0;
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testi-dot');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (dots[i]) {
                    dots[i].classList.remove('bg-sky-600');
                    dots[i].classList.add('bg-slate-300');
                }
            });

            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) {
                dots[currentSlide].classList.remove('bg-slate-300');
                dots[currentSlide].classList.add('bg-sky-600');
            }
        }

        function nextTestimonial() {
            showSlide(currentSlide + 1);
        }

        function prevTestimonial() {
            showSlide(currentSlide - 1);
        }

        function setTestimonial(index) {
            showSlide(index);
        }

        // Auto slider for testimonials
        setInterval(() => {
            nextTestimonial();
        }, 6000);

        // Counter Animation for Statistics
        function initCounters() {
            const counters = document.querySelectorAll('.counter');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = +entry.target.getAttribute('data-target');
                        let count = 0;
                        const speed = target / 50;

                        const updateCount = () => {
                            count += speed;
                            if (count < target) {
                                entry.target.innerText = Math.ceil(count) + '+';
                                setTimeout(updateCount, 30);
                            } else {
                                entry.target.innerText = target + '+';
                            }
                        };
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));
        }


// Dark mode toggle: pilihan tema disimpan agar tetap digunakan saat halaman dibuka kembali.
(function initThemeToggle() {
    const themeButtons = document.querySelectorAll('.theme-toggle');
    const savedTheme = localStorage.getItem('goclean-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    function applyTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        themeButtons.forEach((button) => {
            const icon = button.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon', !isDark);
                icon.classList.toggle('fa-sun', isDark);
            }
            const label = isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap';
            button.setAttribute('aria-label', label);
            button.setAttribute('title', label);
            button.setAttribute('aria-pressed', String(isDark));
        });
    }

    applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
    themeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const isDark = !document.body.classList.contains('dark-mode');
            localStorage.setItem('goclean-theme', isDark ? 'dark' : 'light');
            applyTheme(isDark);
        });
    });
})();

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(
        "section h2, .card, .service-card, .testimonial-card"
    );

    elements.forEach((element) => {
        element.classList.add("scroll-reveal");
    });

    const style = document.createElement("style");
    style.textContent = `
        .scroll-reveal {
            opacity: 0;
            transform: translateY(25px);
            transition:
                opacity 0.7s ease,
                transform 0.7s ease;
        }

        .scroll-reveal.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        elements.forEach((element) => observer.observe(element));
    } else {
        elements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }
});

/* ===== GOCLEAN CHATBOT LOGIC ===== */
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("gcChatToggle");
    const windowChat = document.getElementById("gcChatWindow");
    const close = document.getElementById("gcChatClose");
    const icon = document.getElementById("gcChatIcon");
    const form = document.getElementById("gcChatForm");
    const input = document.getElementById("gcChatInput");
    const messages = document.getElementById("gcChatMessages");

    if (!toggle || !windowChat || !form || !input || !messages) return;

    function openChat() {
        windowChat.classList.add("gc-open");
        windowChat.setAttribute("aria-hidden", "false");
        toggle.setAttribute("aria-expanded", "true");
        icon.className = "fa-solid fa-xmark";
        input.focus();
    }

    function closeChat() {
        windowChat.classList.remove("gc-open");
        windowChat.setAttribute("aria-hidden", "true");
        toggle.setAttribute("aria-expanded", "false");
        icon.className = "fa-solid fa-comments";
        toggle.focus();
    }

    toggle.addEventListener("click", function () {
        if (windowChat.classList.contains("gc-open")) {
            closeChat();
        } else {
            openChat();
        }
    });

    close.addEventListener("click", closeChat);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" &&
            windowChat.classList.contains("gc-open")) {
            closeChat();
        }
    });

    function addMessage(text, type) {
        const row = document.createElement("div");
        row.className = "gc-message " +
            (type === "user" ? "gc-user-message" : "gc-bot-message");

        if (type === "bot") {
            const avatar = document.createElement("div");
            avatar.className = "gc-message-avatar";
            avatar.innerHTML = '<i class="fa-solid fa-broom"></i>';
            row.appendChild(avatar);
        }

        const bubble = document.createElement("div");
        bubble.className = "gc-message-content";

        // Gunakan textContent agar pesan tidak dieksekusi sebagai HTML.
        bubble.textContent = text;
        row.appendChild(bubble);
        messages.appendChild(row);
        messages.scrollTop = messages.scrollHeight;

        return row;
    }

    function getReply(message) {
        const text = message.toLowerCase();

        if (/halo|hai|hello|hi\b|selamat pagi|selamat siang|selamat sore|selamat malam/.test(text)) {
            return "Halo juga! 👋 Selamat datang di GOCLEAN. Apa yang ingin kamu tanyakan?";
        }

        if (/layanan|jasa|service|bersih|cleaning/.test(text)) {
            return "GOCLEAN menyediakan layanan kebersihan rumah, kantor, kosan, serta layanan cuci sepatu dan cuci tas. Pilih layanan yang kamu butuhkan melalui bagian Layanan di website kami.";
        }

        if (/harga|biaya|tarif|berapa|ongkos/.test(text)) {
            return "Harga layanan bergantung pada jenis layanan dan kebutuhan kamu. Silakan buka bagian Layanan atau Pemesanan untuk melihat informasi yang tersedia. Kamu juga bisa menghubungi admin untuk konfirmasi harga.";
        }

        if (/pesan|booking|reservasi|order|jadwal/.test(text)) {
            return "Cara memesan: 1. Buka bagian Pemesanan. 2. Pilih layanan yang dibutuhkan. 3. Isi data dan jadwal yang diminta. 4. Kirim formulir pemesanan. Pastikan detail pesanan sudah benar, ya!";
        }

        if (/alamat|lokasi|daerah|wilayah|jangkauan/.test(text)) {
            return "Untuk memastikan apakah lokasi kamu terjangkau, silakan hubungi admin GOCLEAN melalui bagian Kontak di website.";
        }

        if (/jam|buka|operasional|operasi/.test(text)) {
            return "Informasi jam operasional dapat kamu periksa pada bagian Kontak di website GOCLEAN.";
        }

        if (/admin|manusia|whatsapp|wa\b|kontak|hubungi/.test(text)) {
            return "Untuk berbicara dengan admin, buka bagian Kontak di website dan gunakan nomor WhatsApp resmi yang tercantum di sana.";
        }

        if (/terima kasih|makasih|thanks/.test(text)) {
            return "Sama-sama! 💚 Terima kasih sudah menghubungi GOCLEAN.";
        }

        return "Terima kasih atas pertanyaanmu! 😊 Aku bisa membantu menjelaskan layanan, harga, dan cara pemesanan. Coba tulis pertanyaan yang lebih spesifik atau hubungi admin melalui bagian Kontak.";
    }

    function sendMessage(message) {
        const cleanMessage = message.trim();
        if (!cleanMessage) return;

        addMessage(cleanMessage, "user");

        const typingRow = document.createElement("div");
        typingRow.className = "gc-message gc-bot-message";
        typingRow.innerHTML =
            '<div class="gc-message-avatar"><i class="fa-solid fa-broom"></i></div>' +
            '<div class="gc-message-content gc-typing" aria-label="Sedang mengetik">' +
            '<span></span><span></span><span></span></div>';

        messages.appendChild(typingRow);
        messages.scrollTop = messages.scrollHeight;

        // Simulasi waktu mengetik, bukan panggilan ke AI.
        setTimeout(function () {
            typingRow.remove();
            addMessage(getReply(cleanMessage), "bot");
        }, 650);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const message = input.value;
        if (!message.trim()) return;

        input.value = "";
        sendMessage(message);
        input.focus();
    });

    messages.querySelectorAll("[data-question]").forEach(function (button) {
        button.addEventListener("click", function () {
            const questions = {
                layanan: "Apa saja layanan GOCLEAN?",
                harga: "Berapa harga layanan GOCLEAN?",
                pesan: "Bagaimana cara memesan layanan?",
                admin: "Bagaimana cara menghubungi admin?"
            };

            const question = questions[button.dataset.question];
            if (question) sendMessage(question);
        });
    });
});
