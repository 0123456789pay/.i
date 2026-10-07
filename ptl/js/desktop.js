/* ============================================================
   PTL Desktop — Window Manager + Aplikasi File Manajer
   ============================================================ */
(() => {
  "use strict";

  const layer = document.getElementById("window-layer");
  const taskbarItems = document.getElementById("taskbar-items");
  let zTop = 10;
  let winSeq = 0;
  const windows = new Map(); // id -> {el, app, title}

  /* ---------- ikon & tampilan ---------- */
  function iconFor(entry) {
    if (entry.type === "dir") return "📁";
    const ext = entry.name.split(".").pop().toLowerCase();
    const map = {
      txt: "📄", md: "📝", html: "🌐", js: "📜", css: "🎨", json: "📋",
      png: "🖼️", jpg: "🖼️", jpeg: "🖼️", gif: "🖼️", webp: "🖼️", svg: "🖼️",
      mp3: "🎵", wav: "🎵", m3u: "🎵", flac: "🎵",
      mp4: "🎬", webm: "🎬", mkv: "🎬", avi: "🎬",
      zip: "🗜️", tar: "🗜️", gz: "🗜️",
      docx: "📃", xlsx: "📊", pptx: "📽️", pdf: "📕",
      deb: "📦", sh: "⚙️", log: "🧾",
    };
    return map[ext] || "📄";
  }

  function fmtSize(b) {
    if (b === null || b === undefined) return "—";
    if (b < 1024) return b + " B";
    if (b < 1024 * 1024) return (b / 1024).toFixed(1) + " KB";
    return (b / 1048576).toFixed(1) + " MB";
  }

  /* ============================================================
     WINDOW MANAGER
     ============================================================ */
  function createWindow({ title, icon, width = 760, height = 480, buildBody }) {
    const id = "win-" + ++winSeq;
    const el = document.createElement("div");
    el.className = "window";
    el.id = id;
    el.style.width = width + "px";
    el.style.height = height + "px";
    el.style.left = (60 + (winSeq * 28) % 220) + "px";
    el.style.top = (40 + (winSeq * 24) % 160) + "px";
    el.innerHTML = `
      <div class="titlebar">
        <span class="win-icon">${icon}</span>
        <span class="win-title">${title}</span>
        <span class="win-controls">
          <button class="wc wc-min" title="Minimalkan">–</button>
          <button class="wc wc-max" title="Maksimalkan">▢</button>
          <button class="wc wc-close" title="Tutup">✕</button>
        </span>
      </div>
      <div class="win-body"></div>`;
    layer.appendChild(el);

    const body = el.querySelector(".win-body");
    buildBody(body, api());

    focusWindow(id);
    makeDraggable(el);
    el.addEventListener("mousedown", () => focusWindow(id));

    el.querySelector(".wc-close").onclick = () => closeWindow(id);
    el.querySelector(".wc-min").onclick = () => minimizeWindow(id);
    el.querySelector(".wc-max").onclick = () => el.classList.toggle("maximized");

    // taskbar button
    const tb = document.createElement("button");
    tb.className = "taskbar-item";
    tb.innerHTML = `<span>${icon}</span><span class="tb-label">${title}</span>`;
    tb.onclick = () => {
      if (el.classList.contains("minimized")) restoreWindow(id);
      else if (parseInt(el.style.zIndex) === zTop) minimizeWindow(id);
      else focusWindow(id);
    };
    taskbarItems.appendChild(tb);

    windows.set(id, { el, tb, app: title });

    function api() {
      return {
        setTitle: (t) => {
          el.querySelector(".win-title").textContent = t;
          tb.querySelector(".tb-label").textContent = t;
        },
        close: () => closeWindow(id),
        id,
      };
    }
    return api();
  }

  function focusWindow(id) {
    const w = windows.get(id);
    if (!w) return;
    w.el.classList.remove("minimized");
    w.el.style.zIndex = ++zTop;
    w.tb.classList.add("active");
  }
  function minimizeWindow(id) {
    const w = windows.get(id);
    if (!w) return;
    w.el.classList.add("minimized");
    w.tb.classList.remove("active");
  }
  function restoreWindow(id) { focusWindow(id); }
  function closeWindow(id) {
    const w = windows.get(id);
    if (!w) return;
    w.el.remove();
    w.tb.remove();
    windows.delete(id);
  }

  function makeDraggable(el) {
    const bar = el.querySelector(".titlebar");
    let sx, sy, ox, oy, dragging = false;
    bar.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".wc")) return;
      if (el.classList.contains("maximized")) return;
      dragging = true;
      sx = e.clientX; sy = e.clientY;
      ox = el.offsetLeft; oy = el.offsetTop;
      bar.setPointerCapture(e.pointerId);
    });
    bar.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      el.style.left = Math.max(0, ox + e.clientX - sx) + "px";
      el.style.top = Math.max(0, oy + e.clientY - sy) + "px";
    });
    bar.addEventListener("pointerup", () => (dragging = false));
  }

  /* ============================================================
     APLIKASI: FILE MANAJER
     ============================================================ */
  const PLACES = [
    { name: "Rumah", path: "/home/pengguna", icon: "🏠" },
    { name: "Berkas Sistem (/)", path: "/", icon: "🗄️" },
    { name: "Dokumen", path: "/home/pengguna/Documents", icon: "📄" },
    { name: "Unduhan", path: "/home/pengguna/Downloads", icon: "⬇️" },
    { name: "Gambar", path: "/home/pengguna/Pictures", icon: "🖼️" },
    { name: "Musik", path: "/home/pengguna/Music", icon: "🎵" },
    { name: "Video", path: "/home/pengguna/Videos", icon: "🎬" },
    { name: "Perangkat USB", path: "/mnt/usb-drive", icon: "💽" },
  ];

  const trashBin = []; // item sampah

  function openFileManager(startPath = "/home/pengguna") {
    createWindow({
      title: "File Manajer",
      icon: "🗂️",
      width: 860,
      height: 540,
      buildBody(body, win) {
        let cwd = startPath;
        let viewMode = "grid";
        let history = [cwd];
        let hIdx = 0;

        body.innerHTML = `
          <div class="fm">
            <div class="fm-toolbar">
              <button class="tbtn" data-nav="back" title="Mundur">◀</button>
              <button class="tbtn" data-nav="fwd" title="Maju">▶</button>
              <button class="tbtn" data-nav="up" title="Naik satu tingkat">▲</button>
              <button class="tbtn" data-nav="refresh" title="Muat ulang">⟳</button>
              <div class="fm-path" contenteditable spellcheck="false"></div>
              <input class="fm-search" type="text" placeholder="🔍 Cari di folder ini…" />
              <button class="tbtn" data-act="toggle-view" title="Ganti tampilan">🔲</button>
              <button class="tbtn" data-act="new-folder" title="Folder baru">➕📁</button>
            </div>
            <div class="fm-main">
              <div class="fm-sidebar">
                <div class="side-head">Tempat</div>
                ${PLACES.map(p => `<button class="place" data-path="${p.path}"><span>${p.icon}</span>${p.name}</button>`).join("")}
                <div class="side-head">Sistem</div>
                <button class="place" data-path="/etc"><span>⚙️</span>/etc</button>
                <button class="place" data-path="/var/log"><span>🧾</span>/var/log</button>
                <button class="place" data-path="/proc"><span>🧠</span>/proc</button>
                <button class="place" data-trash><span>🗑️</span>Sampah <em class="trash-count"></em></button>
              </div>
              <div class="fm-content"></div>
            </div>
            <div class="fm-statusbar"></div>
          </div>`;

        const pathEl = body.querySelector(".fm-path");
        const content = body.querySelector(".fm-content");
        const status = body.querySelector(".fm-statusbar");
        const search = body.querySelector(".fm-search");

        function render() {
          win.setTitle("File Manajer — " + cwd);
          pathEl.textContent = cwd;
          search.value = "";
          const inTrash = cwd === "__trash__";
          const entries = inTrash
            ? trashBin.slice()
            : FS.listDir(cwd);

          content.className = "fm-content " + viewMode;
          content.innerHTML = "";

          if (entries.length === 0) {
            content.innerHTML = `<div class="empty-folder">📂 Folder kosong</div>`;
          }

          for (const e of entries) {
            const item = document.createElement(inTrash ? "div" : "button");
            item.className = "fm-item" + (e.selected ? " selected" : "");
            item.dataset.name = e.name;
            item.innerHTML = `<span class="item-icon">${inTrash ? e.icon : iconFor(e)}</span><span class="item-name">${e.name}</span>`;
            item.title = e.name;
            item.ondblclick = () => {
              if (inTrash) return;
              if (e.type === "dir") { cwd = FS.join(cwd, e.name); pushHistory(); render(); }
              else openFile(FS.join(cwd, e.name));
            };
            item.onclick = (ev) => {
              content.querySelectorAll(".fm-item").forEach(i => i.classList.remove("selected"));
              item.classList.add("selected");
              updateStatus(e);
              ev.stopPropagation();
            };
            item.oncontextmenu = (ev) => {
              ev.preventDefault();
              showCtx(ev, e, inTrash);
            };
            content.appendChild(item);
          }
          updateStatus(null);
          body.querySelector(".trash-count").textContent = trashBin.length ? `(${trashBin.length})` : "";
        }

        function updateStatus(sel) {
          const inTrash = cwd === "__trash__";
          if (sel) {
            if (sel.type === "dir") {
              const node = FS.getNode(FS.join(cwd, sel.name));
              status.textContent = `📁 ${sel.name} — ${node ? FS.dirEntryCount(node) : 0} item — ${fmtSize(node ? FS.totalSize(node) : 0)}`;
            } else {
              status.textContent = `${iconFor(sel)} ${sel.name} — ${fmtSize(sel.size)} — ${sel.mime || "file"}`;
            }
          } else {
            const n = inTrash ? trashBin.length : FS.listDir(cwd).length;
            status.textContent = `${n} item — ${cwd}`;
          }
        }

        function pushHistory() {
          history = history.slice(0, hIdx + 1);
          history.push(cwd);
          hIdx = history.length - 1;
        }

        function navigate(path) {
          cwd = path; pushHistory(); render();
        }

        function openFile(path) {
          const node = FS.getNode(path);
          if (!node) return;
          const isText = node.mime && (node.mime.startsWith("text/") ||
            ["application/x-sh", "application/json", "text/markdown"].includes(node.mime));
          if (isText) {
            openTextViewer(path, node);
          } else if (node.mime && node.mime.startsWith("image/")) {
            openMediaViewer(path, node, "🖼️");
          } else if (node.mime && node.mime.startsWith("video/")) {
            openMediaViewer(path, node, "🎬");
          } else if (node.mime && node.mime.startsWith("audio/")) {
            openMediaViewer(path, node, "🎵");
          } else {
            openProperties(path, node);
          }
        }

        function showCtx(ev, e, inTrash) {
          document.querySelectorAll(".ctx-menu").forEach(m => m.remove());
          const menu = document.createElement("div");
          menu.className = "ctx-menu";
          const items = inTrash
            ? [["↩️ Pulihkan", "restore"], ["❌ Hapus permanen", "purge"]]
            : e.type === "dir"
              ? [["📂 Buka", "open"], ["ℹ️ Properti", "props"], ["🗑️ Pindahkan ke Sampah", "trash"]]
              : [["👁️ Lihat", "open"], ["ℹ️ Properti", "props"], ["🗑️ Pindahkan ke Sampah", "trash"]];
          menu.innerHTML = items.map(([l, a]) => `<button data-a="${a}">${l}</button>`).join("");
          menu.style.left = ev.clientX + "px";
          menu.style.top = ev.clientY + "px";
          document.body.appendChild(menu);
          menu.onclick = (me) => {
            const a = me.target.dataset.a;
            menu.remove();
            const full = FS.join(cwd, e.name);
            if (a === "open") {
              if (e.type === "dir") navigate(full); else openFile(full);
            } else if (a === "props") {
              const node = FS.getNode(full);
              if (node) openProperties(full, node);
            } else if (a === "trash") {
              const removed = FS.deleteNode(full);
              if (removed) {
                trashBin.push({ name: e.name, type: e.type, icon: iconFor(e), size: removed.size, mime: removed.mime });
                render();
              }
            } else if (a === "restore") {
              const idx = trashBin.findIndex(t => t.name === e.name);
              if (idx >= 0) {
                const t = trashBin.splice(idx, 1)[0];
                FS.createNode("/home/pengguna/Desktop", t.name,
                  FS.file("dipulihkan dari sampah", "text/plain"));
                render();
              }
            } else if (a === "purge") {
              const idx = trashBin.findIndex(t => t.name === e.name);
              if (idx >= 0) { trashBin.splice(idx, 1); render(); }
            }
          };
          setTimeout(() => document.addEventListener("click", () => menu.remove(), { once: true }), 0);
        }

        /* toolbar events */
        body.querySelector(".fm-toolbar").addEventListener("click", (ev) => {
          const b = ev.target.closest("button");
          if (!b) return;
          const nav = b.dataset.nav, act = b.dataset.act;
          if (nav === "back" && hIdx > 0) { hIdx--; cwd = history[hIdx]; render(); }
          if (nav === "fwd" && hIdx < history.length - 1) { hIdx++; cwd = history[hIdx]; render(); }
          if (nav === "up") { if (cwd !== "__trash__" && cwd !== "/") { cwd = FS.parentPath(cwd); pushHistory(); render(); } }
          if (nav === "refresh") render();
          if (act === "toggle-view") { viewMode = viewMode === "grid" ? "list" : "grid"; render(); }
          if (act === "new-folder") {
            if (cwd === "__trash__") return;
            const name = prompt("Nama folder baru:", "Folder Baru");
            if (name && name.trim()) {
              if (!FS.createNode(cwd, name.trim(), FS.dir({}))) alert("Nama sudah dipakai / tidak valid.");
              render();
            }
          }
        });

        pathEl.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            const p = FS.normalize(pathEl.textContent.trim() || "/");
            const node = FS.getNode(p);
            if (node && node.type === "dir") navigate(p);
            else if (node && node.type === "file") openFile(p);
            else alert("Path tidak ditemukan: " + p);
          }
        });

        search.addEventListener("input", () => {
          const q = search.value.toLowerCase();
          content.querySelectorAll(".fm-item").forEach((it) => {
            it.style.display = it.dataset.name.toLowerCase().includes(q) ? "" : "none";
          });
        });

        body.querySelector(".fm-sidebar").addEventListener("click", (ev) => {
          const b = ev.target.closest("button");
          if (!b) return;
          if (b.dataset.trash !== undefined) navigate("__trash__");
          else if (b.dataset.path) navigate(b.dataset.path);
        });

        render();
      },
    });
  }

  /* ---------- aplikasi pendukung ---------- */
  function openTextViewer(path, node) {
    createWindow({
      title: path.split("/").pop() + " — Teks Editor",
      icon: "📝",
      width: 640, height: 420,
      buildBody(body, win) {
        body.innerHTML = `
          <div class="editor">
            <div class="ed-bar"><span>${path}</span><button class="tbtn ed-save">💾 Simpan</button></div>
            <textarea spellcheck="false"></textarea>
          </div>`;
        const ta = body.querySelector("textarea");
        ta.value = node.content;
        body.querySelector(".ed-save").onclick = () => {
          node.content = ta.value;
          node.size = ta.value.length;
          win.setTitle(path.split("/").pop() + " — Teks Editor (tersimpan ✓)");
        };
      },
    });
  }

  function openMediaViewer(path, node, icon) {
    createWindow({
      title: path.split("/").pop() + " — Penampil",
      icon,
      width: 520, height: 380,
      buildBody(body) {
        body.innerHTML = `
          <div class="media-view">
            <div class="media-icon">${icon}</div>
            <h3>${path.split("/").pop()}</h3>
            <p>${node.mime} · ${fmtSize(node.size ?? node.content.length)}</p>
            <div class="media-fake-bar"><div class="playhead"></div></div>
            <p class="media-note">(Pratinjau virtual — file disimpan dalam sistem berkas PTL.)</p>
          </div>`;
      },
    });
  }

  function openProperties(path, node) {
    createWindow({
      title: "Properti — " + path.split("/").pop(),
      icon: "ℹ️",
      width: 420, height: 320,
      buildBody(body) {
        const isDir = node.type === "dir";
        body.innerHTML = `
          <div class="props">
            <div class="props-icon">${isDir ? "📁" : iconFor({ type: "file", name: path.split("/").pop() })}</div>
            <table>
              <tr><td>Nama</td><td>${path.split("/").pop()}</td></tr>
              <tr><td>Lokasi</td><td>${FS.parentPath(path)}</td></tr>
              <tr><td>Jenis</td><td>${isDir ? "Folder" : (node.mime || "file")}</td></tr>
              <tr><td>Ukuran</td><td>${fmtSize(isDir ? FS.totalSize(node) : (node.size ?? node.content.length))}${isDir ? " (" + FS.dirEntryCount(node) + " item)" : ""}</td></tr>
            </table>
          </div>`;
      },
    });
  }

  function openTerminal() {
    createWindow({
      title: "Terminal",
      icon: "💻",
      width: 640, height: 400,
      buildBody(body) {
        body.innerHTML = `
          <div class="term">
            <pre class="term-out">PTL Shell v1.0 — ketik 'help' untuk bantuan.\n</pre>
            <div class="term-input-row"><span class="term-ps"></span><input class="term-input" autofocus spellcheck="false"/></div>
          </div>`;
        const out = body.querySelector(".term-out");
        const inp = body.querySelector(".term-input");
        const ps = body.querySelector(".term-ps");
        let cwd = "/home/pengguna";
        const prompt = () => (ps.textContent = "pengguna@ptl:" + cwd + "$ ");
        prompt();
        inp.onkeydown = (e) => {
          if (e.key !== "Enter") return;
          const raw = inp.value.trim();
          inp.value = "";
          out.textContent += prompt() + raw + "\n";
          run(raw);
          out.scrollTop = out.scrollHeight;
          prompt();
        };
        function run(raw) {
          if (!raw) return;
          const [cmd, ...args] = raw.split(/\s+/);
          const target = args[0] ? FS.join(cwd, args[0]) : null;
          switch (cmd) {
            case "help":
              out.textContent += "Perintah: ls, cd, pwd, cat, mkdir, touch, rm, tree, clear, whoami, df\n"; break;
            case "ls": {
              const p = args[0] ? target : cwd;
              const items = FS.listDir(p);
              out.textContent += items.length
                ? items.map(i => (i.type === "dir" ? "📁 " + i.name + "/" : iconFor(i) + " " + i.name)).join("\n") + "\n"
                : "(kosong)\n";
              break;
            }
            case "cd": {
              if (!args[0]) { cwd = "/home/pengguna"; break; }
              const p = FS.normalize(FS.join(cwd, args[0]));
              const n = FS.getNode(p);
              if (n && n.type === "dir") cwd = p;
              else out.textContent += "cd: " + args[0] + ": bukan direktori\n";
              break;
            }
            case "pwd": out.textContent += cwd + "\n"; break;
            case "cat": {
              const n = target && FS.getNode(target);
              out.textContent += n && n.type === "file" ? n.content + "\n" : "cat: " + (args[0] || "?") + ": tidak ada\n";
              break;
            }
            case "mkdir":
              if (args[0]) out.textContent += FS.createNode(cwd, args[0], FS.dir({})) ? "" : "mkdir: gagal\n";
              break;
            case "touch":
              if (args[0]) out.textContent += FS.createNode(cwd, args[0], FS.file("", "text/plain")) ? "" : "touch: gagal\n";
              break;
            case "rm":
              if (args[0]) out.textContent += FS.deleteNode(target) ? "" : "rm: tidak ada\n";
              break;
            case "tree": {
              const walk = (p, pre) => {
                const items = FS.listDir(p);
                items.forEach((i, idx) => {
                  const last = idx === items.length - 1;
                  out.textContent += pre + (last ? "└── " : "├── ") + i.name + (i.type === "dir" ? "/" : "") + "\n";
                  if (i.type === "dir") walk(FS.join(p, i.name), pre + (last ? "    " : "│   "));
                });
              };
              walk(cwd, "");
              break;
            }
            case "clear": out.textContent = ""; break;
            case "whoami": out.textContent += "pengguna\n"; break;
            case "df": out.textContent += "Filesystem   Size  Used Avail Use%\n/dev/sda1     128G  42.7G  85.3G  34%\n"; break;
            default: out.textContent += cmd + ": perintah tidak ditemukan\n";
          }
        }
        body.querySelector(".term").onclick = () => inp.focus();
      },
    });
  }

  function openAbout() {
    createWindow({
      title: "Tentang PTL Desktop",
      icon: "ℹ️",
      width: 420, height: 300,
      buildBody(body) {
        body.innerHTML = `
          <div class="about">
            <div class="about-logo">🖥️</div>
            <h2>PTL Desktop</h2>
            <p>Versi 1.0 “Aksara” — lingkungan desktop berbasis web dengan aplikasi File Manajer yang menampilkan folder dan file sistem.</p>
            <p class="dim">© 2026 PTL. Dibuat dengan HTML, CSS, dan JavaScript murni.</p>
          </div>`;
      },
    });
  }

  function openSettings() {
    createWindow({
      title: "Pengaturan",
      icon: "⚙️",
      width: 420, height: 300,
      buildBody(body) {
        body.innerHTML = `
          <div class="settings">
            <h3>Tampilan</h3>
            <label>Wallpaper:
              <select id="wall-sel">
                <option value="0">Biru Malam</option>
                <option value="1">Emerald</option>
                <option value="2">Senja Ungu</option>
                <option value="3">Grafit</option>
              </select>
            </label>
            <h3>Sistem Berkas</h3>
            <p>Total ukuran sistem: <b id="fs-total"></b></p>
          </div>`;
        body.querySelector("#fs-total").textContent = fmtSize(FS.totalSize(FS.root));
        body.querySelector("#wall-sel").onchange = (e) => {
          document.body.dataset.wall = e.target.value;
        };
      },
    });
  }

  function openTrash() {
    openFileManager("__trash__");
  }

  const APPS = {
    files: () => openFileManager("/home/pengguna"),
    terminal: openTerminal,
    about: openAbout,
    settings: openSettings,
    trash: openTrash,
  };

  /* ============================================================
     DESKTOP glue: icons, start menu, clock, shutdown
     ============================================================ */
  document.querySelectorAll("[data-open]").forEach((el) => {
    const handler = (e) => {
      e.preventDefault();
      const fn = APPS[el.dataset.open];
      if (fn) fn();
      closeStartMenu();
    };
    if (el.tagName === "DIV") {
      let last = 0;
      el.addEventListener("click", () => {
        const now = Date.now();
        if (now - last < 450) handler();
        last = now;
      });
      el.addEventListener("dblclick", handler);
    } else {
      el.addEventListener("click", handler);
    }
  });

  const startBtn = document.getElementById("start-btn");
  const startMenu = document.getElementById("start-menu");
  function closeStartMenu() { startMenu.classList.add("hidden"); }
  startBtn.onclick = (e) => {
    e.stopPropagation();
    startMenu.classList.toggle("hidden");
    if (!startMenu.classList.contains("hidden")) {
      document.getElementById("start-search").focus();
    }
  };
  document.addEventListener("click", (e) => {
    if (!startMenu.contains(e.target) && e.target !== startBtn) closeStartMenu();
  });

  // start search → buka folder jika cocok nama file/folder
  document.getElementById("start-search").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const q = e.target.value.trim().toLowerCase();
    if (!q) return;
    const found = findFirst("/", q);
    closeStartMenu();
    if (found) {
      if (found.type === "dir") openFileManager(found.path);
      else { openFileManager(FS.parentPath(found.path)); }
    } else alert("Tidak ditemukan: " + q);
  });
  function findFirst(base, q) {
    for (const e of FS.listDir(base)) {
      if (e.name.toLowerCase().includes(q)) {
        return { ...e, path: FS.join(base, e.name) };
      }
    }
    for (const e of FS.listDir(base)) {
      if (e.type === "dir") {
        const r = findFirst(FS.join(base, e.name), q);
        if (r) return r;
      }
    }
    return null;
  }

  // clock
  function tick() {
    const d = new Date();
    document.getElementById("clock").textContent =
      d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" }) +
      " " + d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  }
  tick(); setInterval(tick, 10000);

  // shutdown
  document.querySelectorAll('[data-action="shutdown"]').forEach(b =>
    b.addEventListener("click", () => {
      closeStartMenu();
      document.getElementById("shutdown-overlay").classList.remove("hidden");
    }));
  document.getElementById("power-on-btn").onclick = () => {
    document.getElementById("shutdown-overlay").classList.add("hidden");
  };
})();
