/* ============================================================
   PTL Desktop — Hasil Deteksi Sistem dari GitHub
   Struktur direktori repository terdeteksi, dipetakan ke folder
   sistem Linux (/, /root, /home/pengguna). SEMUA izin root:root.
   Dimuat oleh filesystem.js sebelum FS dibangun.
   ============================================================ */

window.GITHUB_DETECTED = {
  repo: "ptl",
  branch: "main",
  source: "https://github.com (GitHub Pages — .github/workflows/static.yml)",
  detectedAt: "2026-10-07",
  owner: "root",
  group: "root",

  /* Berkas di akar repository (/root/github) */
  files: [
    { name: "README.md", size: 1 },
    { name: ".gitignore", size: 7 },
    { name: "advanced-git-commands.md", size: 13181 },
    { name: "webdev-config.md", size: 1750 },
  ],

  /* Folder tingkat atas repository */
  dirs: [
    { name: ".github", size: 4096, children: [{ name: "workflows", size: 4096, children: [
        { name: "static.yml", size: 1200 },
        { name: "index.io", size: 512 },
    ]}]},
    { name: "elite", size: 4096, children: [
        { name: "app.tsx", size: 8420 },
        { name: "service.ts", size: 5210 },
        { name: "EliteNavbar.tsx", size: 6100 },
        { name: "EliteCodeEditor.tsx", size: 9840 },
        { name: "EliteCodeReview.tsx", size: 7320 },
        { name: "EliteContentCreator.tsx", size: 6900 },
        { name: "EliteLogin.tsx", size: 4510 },
        { name: "EliteMenu.tsx", size: 3800 },
        { name: "AuthMiddleware.ts", size: 2960 },
        { name: "Validator.ts", size: 1840 },
        { name: "index.ts", size: 640 },
        { name: "types.ts", size: 1220 },
        { name: "package.json", size: 890 },
        { name: "tsconfig.json", size: 540 },
        { name: "index.html", size: 1310 },
        { name: "styles.css", size: 4200 },
        { name: "README.md", size: 2100 },
        { name: "INTEGRATION_GUIDE.md", size: 5600 },
    ]},
    { name: "ptl", size: 4096, children: [
        { name: "index.html", size: 2918 },
        { name: "css", size: 4096, children: [{ name: "desktop.css", size: 14800 }] },
        { name: "js", size: 4096, children: [
            { name: "filesystem.js", size: 9200 },
            { name: "github-detect.js", size: 7400 },
            { name: "desktop.js", size: 24600 },
        ]},
    ]},
    { name: "mediadigital", size: 4096, children: [
        { name: "index.html", size: 18400 },
        { name: "login.html", size: 9200 },
        { name: "register.html", size: 9800 },
        { name: "dashboard", size: 4096 },
        { name: "api", size: 4096, children: [{ name: "digital-folders.json", size: 3400 }] },
        { name: "server", size: 4096, children: [{ name: "ai-proxy", size: 4096 }] },
        { name: "assets", size: 4096 },
        { name: "css", size: 4096 },
        { name: "js", size: 4096, children: [
            { name: "main.js", size: 12400 },
            { name: "config.js", size: 2100 },
            { name: "utils.js", size: 5600 },
            { name: "repo-manager.js", size: 8900 },
            { name: "tests.js", size: 4300 },
        ]},
        { name: "blockchaincrypto", size: 4096 },
        { name: "dataihbsf", size: 4096 },
        { name: "dns_domain", size: 4096, children: [{ name: "README.md", size: 1500 }] },
        { name: "icon-maker-project", size: 4096 },
        { name: "iconer.digital", size: 4096 },
        { name: "sistem-protokol-pipa", size: 4096 },
        { name: "file.online", size: 4096 },
    ]},
  ],
};
