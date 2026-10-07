/* ============================================================
   PTL Desktop — Virtual File System
   Struktur folder & file sistem ala Linux persis hasil `ls -la /`
   (lost+found, media, mnt, opt, proc, root, run, sbin -> usr/sbin,
   srv, sys, tmp, usr, var, bin, boot, dev, etc, home).
   Pemilik/grup SELURUH sistem: root:root.
   Folder hasil DETEKSI SISTEM dari GitHub (github-detect.js)
   dipetakan ke /, /root/github, dan /home/pengguna/Github.
   ============================================================ */

const FS = (() => {
  /* ---------- mode izin (untuk tampilan ls -la) ---------- */
  const MODES = {
    "drwx------":  { dir: true,  owner: "rwx", group: "---", other: "---" },
    "drwxr-xr-x":  { dir: true,  owner: "rwx", group: "r-x", other: "r-x" },
    "drwxrwxrwt":  { dir: true,  owner: "rwx", group: "rwx", other: "rwt" },
    "dr-xr-xr-x":  { dir: true,  owner: "r-x", group: "r-x", other: "r-x" },
    "-rwxr-xr-x":  { dir: false, owner: "rwx", group: "r-x", other: "r-x" },
    "-rw-r--r--":  { dir: false, owner: "rw-", group: "r--", other: "r--" },
    "-rwx------":  { dir: false, owner: "rwx", group: "---", other: "---" },
  };
  function modeToOctal(m) {
    const val = (s) => ((s.includes("r") ? 4 : 0) | (s.includes("w") ? 2 : 0) | (s.includes("x") || s.includes("t") ? 1 : 0));
    return "" + val(m.owner) + val(m.group) + val(m.other);
  }

  // node: { type:'dir'|'file'|'link', children?, content?, mime?, size?,
  //         perm?, links?, date?, target? }
  const def = (o) => Object.assign({ perm: "drwxr-xr-x", links: 2, date: "Apr  7  2025" }, o);
  const dir = (children = {}, o = {}) =>
    def(Object.assign({ type: "dir", children }, o));
  const file = (content = "", mime = "text/plain", o = {}) =>
    def(Object.assign({ type: "file", content, mime, size: content.length, perm: "-rw-r--r--", links: 1 }, o));
  const bin = (name) => file("#!/" + name + " [ELF binary]", "application/octet-stream",
    { perm: "-rwxr-xr-x", size: 142192 });
  const link = (target, o = {}) =>
    def(Object.assign({ type: "link", target, perm: "lrwxrwxrwx", links: 1, size: target.length }, o));

  /* ---------- hasil deteksi GitHub (window.GITHUB_DETECTED) ---------- */
  const GH = (typeof window !== "undefined" && window.GITHUB_DETECTED) || null;
  const ghChildren = (list) => {
    const out = {};
    for (const it of list || []) {
      if (it.children) {
        out[it.name] = dir(ghChildren(it.children), {
          perm: "drwxr-xr-x", links: 2, date: "Oct  7 11:18", size: it.size,
        });
      } else {
        out[it.name] = file("[hasil deteksi GitHub — repo \"" + (GH ? GH.repo : "") + "\"]",
          mimeFor(it.name), { perm: "-rw-r--r--", links: 1, size: it.size, date: "Oct  7 11:18" });
      }
    }
    return out;
  };
  function mimeFor(name) {
    const ext = name.split(".").pop().toLowerCase();
    return ({
      md: "text/markdown", html: "text/html", css: "text/css", js: "text/javascript",
      ts: "text/typescript", tsx: "text/tsx", json: "application/json", yml: "text/yaml",
      txt: "text/plain", io: "text/plain",
    })[ext] || "text/plain";
  }
  const githubRootChildren = GH ? ghChildren(GH.dirs.concat(GH.files)) : {};
  const githubSummary = GH
    ? "# Hasil Deteksi Sistem dari GitHub\n\n" +
      "Repo     : " + GH.repo + " (branch " + GH.branch + ")\n" +
      "Sumber   : " + GH.source + "\n" +
      "Deteksi  : " + GH.detectedAt + "\n" +
      "Pemilik  : " + GH.owner + ":" + GH.group + " (semua izin root)\n\n" +
      "## Direktori terdeteksi\n" +
      GH.dirs.map(d => "- " + d.name + "/").join("\n") + "\n\n" +
      "## Berkas terdeteksi\n" +
      GH.files.map(f => "- " + f.name).join("\n") + "\n"
    : "# Deteksi GitHub belum tersedia.\n";

  const root = dir({
    bin: dir({
      ls: bin("ls"), cat: bin("cat"), bash: bin("bash"), sh: link("bin/bash"),
      cp: bin("cp"), mv: bin("mv"), rm: bin("rm"), mkdir: bin("mkdir"),
      grep: bin("grep"), tar: bin("tar"), ping: bin("ping"), curl: bin("curl"),
    }, { perm: "drwxr-xr-x", links: 1, date: "Apr  7  2025" }),
    boot: dir({
      "vmlinuz-ptl": file("[kernel image]", "application/octet-stream", { size: 8421000, perm: "-rw-r--r--", links: 1 }),
      "initrd.img": file("[initial ramdisk]", "application/octet-stream", { size: 4210000, perm: "-rw-r--r--", links: 1 }),
      grub: dir({ "grub.cfg": file("set default=0\ntimeout=5", "text/plain", { perm: "-rw-------", links: 1 }) }),
    }, { date: "Oct  7 11:18" }),
    dev: dir({
      sda: file("[block device]", "application/octet-stream", { perm: "brw-rw----", links: 1, size: 0 }),
      "sda1": file("[block device]", "application/octet-stream", { perm: "brw-rw----", links: 1, size: 0 }),
      null: file("", "application/octet-stream", { perm: "crw-rw-rw-", links: 1, size: 0 }),
      zero: file("", "application/octet-stream", { perm: "crw-rw-rw-", links: 1, size: 0 }),
      tty: file("[terminal]", "application/octet-stream", { perm: "crw-rw-rw-", links: 1, size: 0 }),
    }, { date: "Oct  7 11:18" }),
    etc: dir({
      hostname: file("ptl-desktop", "text/plain", { links: 1 }),
      hosts: file("127.0.0.1\tlocalhost\n::1\tlocalhost", "text/plain", { links: 1 }),
      passwd: file(
        "root:x:0:0:root:/root:/bin/bash\npengguna:x:1000:1000:Pengguna PTL:/home/pengguna:/bin/bash",
        "text/plain", { links: 1 }),
      shadow: file("root:!:19000:0:99999:7:::\npengguna:!:19000:0:99999:7:::", "text/plain",
        { perm: "-rw-r-----", links: 1 }),
      fstab: file("/dev/sda1  /  ext4  defaults  0 1", "text/plain", { links: 1 }),
      "os-release": file('PRETTY_NAME="PTL Desktop 1.0 (Aksara)"\nID=ptl\nHOME_URL="https://github.com"', "text/plain", { links: 1 }),
      apt: dir({ "sources.list": file("deb http://repo.ptl/id stable main", "text/plain", { links: 1 }) }),
      ssh: dir({ "sshd_config": file("PermitRootLogin no", "text/plain", { perm: "-rw-------", links: 1 }) }),
      systemd: dir({ "journald.conf": file("[Journal]\n#Storage=auto", "text/plain", { links: 1 }) }),
    }),
    home: dir({
      pengguna: dir({
        Desktop: dir({
          "catatan.txt": file("PTL Desktop — selamat datang!\nKlik dua ikon untuk membuka aplikasi.", "text/plain", { links: 1 }),
        }),
        Documents: dir({
          "laporan-keuangan.xlsx": file("[data spreadsheet]", "application/octet-stream", { perm: "-rw-r--r--", links: 1, size: 24100 }),
          "skripsi-final.docx": file("[dokumen kata]", "application/msword", { perm: "-rw-r--r--", links: 1, size: 512000 }),
          Proyek: dir({
            "README.md": file("# Proyek PTL\nAplikasi desktop berbasis web.", "text/markdown", { links: 1 }),
            src: dir({
              "main.js": file("console.log('Halo PTL');", "text/javascript", { links: 1 }),
              "style.css": file("body { margin: 0; }", "text/css", { links: 1 }),
            }),
          }),
        }),
        Downloads: dir({
          "installer-app.deb": file("[paket debian]", "application/octet-stream", { perm: "-rw-r--r--", links: 1, size: 48200000 }),
          "foto-liburan.jpg": file("[image/jpeg data]", "image/jpeg", { perm: "-rw-r--r--", links: 1, size: 2400000 }),
          "video-demo.mp4": file("[video/mp4 data]", "video/mp4", { perm: "-rw-r--r--", links: 1, size: 18400000 }),
          "musik-favorit.mp3": file("[audio/mpeg data]", "audio/mpeg", { perm: "-rw-r--r--", links: 1, size: 5200000 }),
          "arsip-cadangan.zip": file("[zip archive]", "application/zip", { perm: "-rw-r--r--", links: 1, size: 98000000 }),
        }),
        /* Folder hasil deteksi sistem dari GitHub — izin root:root */
        Github: dir(Object.assign({
          "HASIL-DETEKSI-GITHUB.md": file(githubSummary, "text/markdown", { perm: "-rw-r--r--", links: 1, date: "Oct  7 11:18" }),
        }, githubRootChildren), { perm: "drwxr-xr-x", links: 2, date: "Oct  7 11:18" }),
        Music: dir({
          "playlist.m3u": file("#EXTM3U\nmusik-favorit.mp3", "audio/x-mpegurl", { links: 1 }),
        }),
        Pictures: dir({
          Screenshots: dir({
            "tangkapan-2026-10-07.png": file("[image/png data]", "image/png", { perm: "-rw-r--r--", links: 1, size: 890000 }),
          }),
          "wallpaper.jpg": file("[image/jpeg data]", "image/jpeg", { perm: "-rw-r--r--", links: 1, size: 3200000 }),
        }),
        Videos: dir({
          "rekaman-layar.webm": file("[video/webm data]", "video/webm", { perm: "-rw-r--r--", links: 1, size: 42000000 }),
        }),
        ".bashrc": file("export PS1='\\u@ptl:\\w$ '", "text/plain", { links: 1 }),
      }),
    }, { links: 3 }),
    lostFound: dir({}, { perm: "drwx------", links: 2, date: "Jan  1  1970" }),
    media: dir({}, { date: "Apr  7  2025" }),
    mnt: dir({ "usb-drive": dir({ "data-darurat.txt": file("cadangan penting!", "text/plain", { links: 1 }) }) }, { date: "Oct  7 11:18" }),
    opt: dir({ "aplikasi-tambahan": dir({ "app.bin": file("[binary]", "application/octet-stream", { perm: "-rwxr-xr-x", links: 1, size: 20480 }) }) }),
    proc: dir({
      cpuinfo: file("model name : PTL Virtual CPU @ 3.20GHz", "text/plain", { perm: "-r--r--r--", links: 1, size: 0 }),
      meminfo: file("MemTotal: 16384 MB", "text/plain", { perm: "-r--r--r--", links: 1, size: 0 }),
      uptime: file("604800.00 590000.00", "text/plain", { perm: "-r--r--r--", links: 1, size: 0 }),
      version: file("Linux version 6.8.0-ptl (root@ptl) #1 SMP", "text/plain", { perm: "-r--r--r--", links: 1, size: 0 }),
      "1": dir({
        cmdline: file("/sbin/init splash", "text/plain", { perm: "-r--r--r--", links: 1, size: 0 }),
        status: file("Name: systemd\nState: R (running)\nUid:\t0\t0\t0\t0", "text/plain", { perm: "-r--r--r--", links: 1, size: 0 }),
      }, { links: 11, date: "Oct  7 11:18" }),
    }, { perm: "dr-xr-xr-x", links: 72, date: "Oct  7 11:18" }),
    rootHome: dir({
      ".profile": file("# root profile", "text/plain", { perm: "-rw-r--r--", links: 1 }),
      ".ssh": dir({ "authorized_keys": file("ssh-ed25519 AAAA... root@ptl", "text/plain", { perm: "-rw-------", links: 1 }) }, { perm: "drwx------" }),
      /* salinan hasil deteksi GitHub di direktori root — izin root penuh */
      github: dir(Object.assign({
        "HASIL-DETEKSI-GITHUB.md": file(githubSummary, "text/markdown", { perm: "-rw-r--r--", links: 1, date: "Oct  7 11:18" }),
      }, githubRootChildren), { perm: "drwxr-xr-x", links: 2, date: "Oct  7 11:18" }),
    }, { perm: "drwx------", links: 2, date: "Oct  7 11:18" }),
    run: dir({
      "ptl.pid": file("4242", "text/plain", { perm: "-rw-r--r--", links: 1 }),
      lock: dir({}, { perm: "drwxrwxrwt", links: 3 }),
      systemd: dir({ private: dir({}) }, { links: 3 }),
    }, { links: 3 }),
    sbin: link("usr/sbin"),
    srv: dir({ "web-root": dir({ "index.html": file("<h1>PTL Server</h1>", "text/html", { links: 1 }) }) }),
    sys: dir({
      "device-tree": file("[system tree]", "application/octet-stream", { perm: "dr-xr-xr-x", links: 12, size: 0 }),
      kernel: dir({ "hostname": file("ptl-desktop", "text/plain", { perm: "-rw-r--r--", links: 1 }) }, { perm: "dr-xr-xr-x", links: 12 }),
      fs: dir({ ext4: dir({ "sda1": dir({}) }, { perm: "dr-xr-xr-x", links: 12 }) }, { perm: "dr-xr-xr-x", links: 12 }),
    }, { perm: "dr-xr-xr-x", links: 12, date: "Sep 14 06:57" }),
    tmp: dir({
      "session-cache.tmp": file("", "application/octet-stream", { perm: "-rw-rw-rw-", links: 1 }),
      "ptl-scan": dir({
        "github-report.txt": file("scan GitHub selesai: " + (GH ? (GH.dirs.length + GH.files.length) : 0) + " entri terdeteksi, semua izin root:root", "text/plain", { perm: "-rw-rw-rw-", links: 1, date: "Oct  7 11:18" }),
      }, { perm: "drwxrwxrwt", links: 2, date: "Oct  7 11:18" }),
    }, { perm: "drwxrwxrwt", links: 2, date: "Oct  7 11:18" }),
    usr: dir({
      bin: dir({
        python3: bin("python3"), git: bin("git"), vim: bin("vim"), nano: bin("nano"),
        gcc: bin("gcc"), node: bin("node"), npm: link("../bin/npm"),
      }, { links: 2 }),
      sbin: dir({ "fsck": bin("fsck"), "init": bin("init") }, { links: 2 }),
      lib: dir({ "libptl.so": file("[shared object]", "application/octet-stream", { perm: "-rw-r--r--", links: 1, size: 132400 }) }),
      share: dir({
        applications: dir({ "ptl-files.desktop": file("[Desktop Entry]", "text/plain", { links: 1 }) }),
        doc: dir({ "manual.txt": file("PTL Desktop manual v1.0", "text/plain", { links: 1 }) }),
        /* tautan hasil pemindaian GitHub — sumber folder sistem terdeteksi */
        github: dir(Object.assign({
          "HASIL-DETEKSI-GITHUB.md": file(githubSummary, "text/markdown", { perm: "-rw-r--r--", links: 1, date: "Oct  7 11:18" }),
        }, githubRootChildren), { perm: "drwxr-xr-x", links: 2, date: "Oct  7 11:18" }),
      }),
      src: dir({ "linux-ptl": dir({ "Makefile": file("all:\n\t@echo build", "text/plain", { links: 1 }) }) }),
    }, { links: 10 }),
    var: dir({
      log: dir({
        "syslog": file("ok: sistem berjalan normal\nscanned: github -> root:root (semua izin)", "text/plain", { perm: "-rw-r-----", links: 1 }),
        "apt.log": file("install selesai", "text/plain", { perm: "-rw-r--r--", links: 1 }),
        "github-detect.log": file("[Oct  7 11:18] deteksi GitHub selesai — " +
          (GH ? GH.dirs.length : 0) + " folder + " + (GH ? GH.files.length : 0) +
          " berkas dipetakan ke /, /root/github, /home/pengguna/Github — pemilik root:root", "text/plain",
          { perm: "-rw-r--r--", links: 1, date: "Oct  7 11:18" }),
      }, { links: 11 }),
      www: dir({ html: dir({ "index.html": file("<h1>It works!</h1>", "text/html", { links: 1 }) }) }),
      cache: dir({}),
      lib: dir({ "ptl-desktop": dir({ "state.ini": file("[desktop]\nmode=desktop", "text/plain", { links: 1 }) }) }, { links: 11 }),
    }, { links: 11 }),
  }, { perm: "drwxr-xr-x", links: 11, date: "Apr  7  2025" });

  // nama display untuk folder privat (agar tidak bentrok dengan folder /root sistem)
  const DISPLAY_NAMES = { rootHome: "root", lostFound: "lost+found" };
  function displayName(key) { return DISPLAY_NAMES[key] || key; }
  function realKey(name) {
    for (const k in DISPLAY_NAMES) if (DISPLAY_NAMES[k] === name) return k;
    return name;
  }

  /* ---------- utilitas path ---------- */
  function normalize(path) {
    const parts = [];
    for (const seg of path.split("/")) {
      if (!seg || seg === ".") continue;
      if (seg === "..") parts.pop();
      else parts.push(seg);
    }
    return "/" + parts.join("/");
  }

  function resolve(path) {
    const nodes = [];
    let cur = root;
    nodes.push(cur);
    for (const seg of normalize(path).split("/").filter(Boolean)) {
      const key = realKey(seg);
      if (!cur.children || !cur.children[key]) return null;
      cur = cur.children[key];
      // ikuti symlink absolut (mis. /sbin -> usr/sbin)
      if (cur.type === "link") {
        const r2 = resolve("/" + cur.target.replace(/^\.\.\//, ""));
        if (!r2) return null;
        cur = r2.node;
      }
      nodes.push(cur);
    }
    return { node: cur, chain: nodes };
  }

  function getNode(path) {
    const r = resolve(path);
    return r ? r.node : null;
  }

  function parentPath(path) {
    const n = normalize(path);
    const i = n.lastIndexOf("/");
    return i <= 0 ? "/" : n.slice(0, i);
  }

  function join(a, b) {
    return normalize((a === "/" ? "" : a) + "/" + b);
  }

  /* ---------- atribut sistem untuk satu entri ---------- */
  function attrs(node) {
    const perm = node.perm || (node.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--");
    const m = MODES[perm] || MODES["-rw-r--r--"];
    return {
      perm,
      octal: modeToOctal(m),
      links: node.links ?? (node.type === "dir" ? 2 : 1),
      owner: "root",           // SELURUH sistem: izin root
      group: "root",
      size: node.size ?? (node.type === "file" ? (node.content ? node.content.length : 0) : (node.type === "dir" ? 4096 : (node.target || "").length)),
      date: node.date || "Apr  7  2025",
      target: node.target || null,
    };
  }

  /* ---------- listDir: normal (+ detail ls -la) ---------- */
  function listDir(path, opts = {}) {
    const n = getNode(path);
    if (!n || n.type !== "dir") return [];
    const entries = Object.entries(n.children)
      .filter(([name]) => !name.startsWith("."))
      .map(([key, node]) => {
        const e = {
          name: displayName(key),
          type: node.type,
          size: node.type === "file" ? (node.size ?? node.content.length) : null,
          mime: node.mime || null,
        };
        if (opts.detail) Object.assign(e, attrs(node));
        return e;
      });
    if (opts.all) {
      for (const [key, node] of Object.entries(n.children)) {
        if (!key.startsWith(".")) continue;
        const e = { name: displayName(key), type: node.type,
          size: node.type === "file" ? (node.size ?? node.content.length) : null,
          mime: node.mime || null };
        if (opts.detail) Object.assign(e, attrs(node));
        entries.push(e);
      }
    }
    if (opts.detail) {
      entries.unshift(Object.assign({ name: ".", type: "dir", mime: null }, attrs(n)));
      const pn = opts.parentAttrs || null;
      entries.splice(1, 0, Object.assign({ name: "..", type: "dir", mime: null },
        pn || attrs({ type: "dir", perm: "drwxr-xr-x", links: 11, size: 4096, date: "Apr  7  2025" })));
    }
    return entries.sort((a, b) => {
      if (a.name === "." ) return -1;
      if (b.name === ".") return 1;
      if (a.name === "..") return b.name === "." ? 1 : -1;
      if (b.name === "..") return a.name === "." ? 1 : -1;
      const ta = a.type === "dir" ? 0 : a.type === "link" ? 1 : 2;
      const tb = b.type === "dir" ? 0 : b.type === "link" ? 1 : 2;
      return ta === tb ? a.name.localeCompare(b.name) : ta - tb;
    });
  }

  function totalSize(node) {
    if (node.type === "file" || node.type === "link") return node.size ?? 0;
    return Object.values(node.children).reduce((s, c) => s + totalSize(c), 0);
  }

  function dirEntryCount(node) {
    return Object.keys(node.children).length;
  }

  function createNode(parentDirPath, name, node) {
    const p = getNode(parentDirPath);
    if (!p || p.type !== "dir") return false;
    const key = realKey(name);
    if (p.children[key]) return false;
    p.children[key] = node;
    return true;
  }

  function deleteNode(path) {
    const pp = parentPath(path);
    const parent = getNode(pp);
    const name = realKey(normalize(path).split("/").pop());
    if (!parent || !parent.children || !parent.children[name]) return false;
    const removed = parent.children[name];
    delete parent.children[name];
    return removed;
  }

  function exists(path) { return getNode(path) !== null; }

  return {
    root, normalize, resolve, getNode, parentPath, join,
    listDir, totalSize, dirEntryCount, createNode, deleteNode, exists,
    attrs, displayName, realKey, modeToOctal,
    dir, file, link,
  };
})();
