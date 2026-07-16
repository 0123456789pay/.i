<?php
// Footer include file
?>
<footer>
    <div class="container">
        <div class="footer-grid">
            <div class="footer-column">
                <h4>Tentang Perusahaan</h4>
                <ul>
                    <li><a href="about.html">Profil</a></li>
                    <li><a href="vision-mission.html">Visi Misi</a></li>
                    <li><a href="careers.html">Karir</a></li>
                    <li><a href="contact.html">Kontak Kantor Pusat</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>Legal & Kepatuhan</h4>
                <ul>
                    <li><a href="terms.html">Syarat & Ketentuan</a></li>
                    <li><a href="privacy.html">Kebijakan Privasi</a></li>
                    <li><a href="cookie.html">Kebijakan Cookie</a></li>
                    <li><a href="sla.html">SLA</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>Program Kemitraan</h4>
                <ul>
                    <li><a href="affiliate.html">Program Afiliasi</a></li>
                    <li><a href="reseller.html">Program Reseller</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>Metode Pembayaran</h4>
                <div class="payment-methods">
                    <span class="payment-badge">BCA</span>
                    <span class="payment-badge">Mandiri</span>
                    <span class="payment-badge">BRI</span>
                    <span class="payment-badge">GoPay</span>
                    <span class="payment-badge">OVO</span>
                    <span class="payment-badge">Dana</span>
                    <span class="payment-badge">QRIS</span>
                </div>
                <div class="social-links">
                    <a href="#">Instagram</a>
                    <a href="#">Facebook</a>
                    <a href="#">Twitter</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">YouTube</a>
                    <a href="#">TikTok</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 HostingDigital. All rights reserved.</p>
        </div>
    </div>
</footer>

<!-- Cookie Banner -->
<div id="cookieBanner" style="display:none; position:fixed; bottom:0; left:0; right:0; background:#1f2937; color:white; padding:1rem; text-align:center; z-index:9999;">
    <p>Kami menggunakan cookie untuk meningkatkan pengalaman Anda. <button onclick="acceptCookies()" class="btn btn-secondary" style="margin-left:1rem;">Terima</button></p>
</div>

<!-- Live Chat Button -->
<button id="liveChatBtn" style="position:fixed; bottom:20px; right:20px; background:#2563eb; color:white; border:none; border-radius:50%; width:60px; height:60px; cursor:pointer; font-size:24px; z-index:9998;">💬</button>

<!-- Chat Widget -->
<div id="chatWidget" class="hidden" style="position:fixed; bottom:90px; right:20px; background:white; box-shadow:0 4px 20px rgba(0,0,0,0.15); border-radius:12px; width:350px; z-index:9998;">
    <div style="background:#2563eb; color:white; padding:1rem; border-radius:12px 12px 0 0;">
        <h4 style="margin:0;">Live Chat</h4>
        <p style="margin:0.5rem 0 0; font-size:0.9rem; opacity:0.9;">Tim support kami siap membantu</p>
    </div>
    <div style="padding:1rem; height:300px; overflow-y:auto; border-bottom:1px solid #e5e7eb;">
        <p style="color:#6b7280; font-style:italic;">Silakan ketik pesan Anda...</p>
    </div>
    <div style="padding:1rem;">
        <input type="text" placeholder="Ketik pesan..." style="width:100%; padding:0.5rem; border:1px solid #e5e7eb; border-radius:4px;">
        <button class="btn btn-primary" style="margin-top:0.5rem; width:100%;">Kirim</button>
    </div>
</div>
