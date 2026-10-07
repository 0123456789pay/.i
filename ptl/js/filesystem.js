/* ============================================================
   PTL Desktop — Virtual File System
   Struktur folder & file sistem ala Linux (/, /home, /etc, …)
   ============================================================ */

const FS = (() => {
  // node: { type:'dir'|'file', children?, content?, mime?, size? }
  const dir = (children = {}) => ({ type: "dir", children });
  const file = (content = "", mime = "text/plain") =>
    ({ type: "file", content, mime, size: content.length });

  const root = dir({
    bin: dir({
      ls: file("#!/bin/sh\necho 'listing…'", "application/x-sh"),
      cat: file("#!/bin/sh\ncat \"$@\"", "application/x-sh"),
      bash: file("#!/bin/bash", "application/x-sh"),
    }),
    boot: dir({
      "vmlinuz-ptl": file("[kernel image]", "application/octet-stream"),
      grub: dir({ "grub.cfg": file("set default=0\ntimeout=5", "text/plain") }),
    }),
    dev: dir({
      sda: file("[block device]", "application/octet-stream"),
      null: file("", "application/octet-stream"),
    }),
    etc: dir({
      hostname: file("ptl-desktop", "text/plain"),
      hosts: file("127.0.0.1\tlocalhost\n::1\tlocalhost", "text/plain"),
      passwd: file(
        "root:x:0:0:root:/root:/bin/bash\npengguna:x:1000:1000:Pengguna PTL:/home/pengguna:/bin/bash",
        "text/plain"),
      fstab: file("/dev/sda1  /  ext4  defaults  0 1", "text/plain"),
      apt: dir({ "sources.list": file("deb http://repo.ptl/id stable main", "text/plain") }),
    }),
    home: dir({
      pengguna: dir({
        Desktop: dir({
          "catatan.txt": file("PTL Desktop — selamat datang!\nKlik dua ikon untuk membuka aplikasi.", "text/plain"),
        }),
        Documents: dir({
          "laporan-keuangan.xlsx": file("[data spreadsheet]", "application/octet-stream"),
          "skripsi-final.docx": file("[dokumen kata]", "application/msword"),
          Proyek: dir({
            "README.md": file("# Proyek PTL\nAplikasi desktop berbasis web.", "text/markdown"),
            src: dir({
              "main.js": file("console.log('Halo PTL');", "text/javascript"),
              "style.css": file("body { margin: 0; }", "text/css"),
            }),
          }),
        }),
        Downloads: dir({
          "installer-app.deb": file("[paket debian]", "application/octet-stream"),
          "foto-liburan.jpg": file("[image/jpeg data]", "image/jpeg"),
          "video-demo.mp4": file("[video/mp4 data]", "video/mp4"),
          "musik-favorit.mp3": file("[audio/mpeg data]", "audio/mpeg"),
          "arsip-cadangan.zip": file("[zip archive]", "application/zip"),
        }),
        Music: dir({
          "playlist.m3u": file("#EXTM3U\nmusik-favorit.mp3", "audio/x-mpegurl"),
        }),
        Pictures: dir({
          Screenshots: dir({
            "tangkapan-2026-10-07.png": file("[image/png data]", "image/png"),
          }),
          "wallpaper.jpg": file("[image/jpeg data]", "image/jpeg"),
        }),
        Videos: dir({
          "rekaman-layar.webm": file("[video/webm data]", "video/webm"),
        }),
        ".bashrc": file("export PS1='\\u@ptl:\\w$ '", "text/plain"),
      }),
    }),
    media: dir({}),
    mnt: dir({ "usb-drive": dir({ "data-darurat.txt": file("cadangan penting!", "text/plain") }) }),
    opt: dir({ "aplikasi-tambahan": dir({ "app.bin": file("[binary]", "application/octet-stream") }) }),
    proc: dir({
      cpuinfo: file("model name : PTL Virtual CPU @ 3.20GHz", "text/plain"),
      meminfo: file("MemTotal: 16384 MB", "text/plain"),
    }),
    root: dir({ ".profile": file("# root profile", "text/plain") }),
    run: dir({ "ptl.pid": file("4242", "text/plain") }),
    srv: dir({ "web-root": dir({ "index.html": file("<h1>PTL Server</h1>", "text/html") }) }),
    sys: dir({ "device-tree": file("[system tree]", "application/octet-stream") }),
    tmp: dir({ "session-cache.tmp": file("", "application/octet-stream") }),
    usr: dir({
      bin: dir({
        python3: file("[ELF binary]", "application/octet-stream"),
        git: file("[ELF binary]", "application/octet-stream"),
      }),
      lib: dir({ "libptl.so": file("[shared object]", "application/octet-stream") }),
      share: dir({
        applications: dir({ "ptl-files.desktop": file("[Desktop Entry]", "text/plain") }),
        doc: dir({ "manual.txt": file("PTL Desktop manual v1.0", "text/plain") }),
      }),
    }),
    var: dir({
      log: dir({
        "syslog": file("ok: sistem berjalan normal", "text/plain"),
        "apt.log": file("install selesai", "text/plain"),
      }),
      www: dir({ html: dir({ "index.html": file("<h1>It works!</h1>", "text/html") }) }),
      cache: dir({}),
    }),
  });

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
      if (!cur.children || !cur.children[seg]) return null;
      cur = cur.children[seg];
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

  function listDir(path) {
    const n = getNode(path);
    if (!n || n.type !== "dir") return [];
    return Object.entries(n.children)
      .map(([name, node]) => ({
        name,
        type: node.type,
        size: node.type === "file" ? (node.size ?? node.content.length) : null,
        mime: node.mime || null,
      }))
      .sort((a, b) =>
        a.type === b.type ? a.name.localeCompare(b.name) : a.type === "dir" ? -1 : 1);
  }

  function totalSize(node) {
    if (node.type === "file") return node.size ?? node.content.length;
    return Object.values(node.children).reduce((s, c) => s + totalSize(c), 0);
  }

  function dirEntryCount(node) {
    return Object.keys(node.children).length;
  }

  function createNode(parentDirPath, name, node) {
    const p = getNode(parentDirPath);
    if (!p || p.type !== "dir") return false;
    if (p.children[name]) return false;
    p.children[name] = node;
    return true;
  }

  function deleteNode(path) {
    const pp = parentPath(path);
    const parent = getNode(pp);
    const name = normalize(path).split("/").pop();
    if (!parent || !parent.children || !parent.children[name]) return false;
    const removed = parent.children[name];
    delete parent.children[name];
    return removed;
  }

  function exists(path) { return getNode(path) !== null; }

  return {
    root, normalize, resolve, getNode, parentPath, join,
    listDir, totalSize, dirEntryCount, createNode, deleteNode, exists,
    dir, file,
  };
})();
