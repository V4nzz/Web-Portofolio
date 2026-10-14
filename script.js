/* ============================================
   Ivan Nandira — Portfolio Scripts
   Neobrutalism Edition + 3D WebGL Kinetic Hero
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar scroll ---------- */
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMobile.classList.toggle('open');
    document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
  });

  navMobile.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Active nav link ---------- */
  const sections = document.querySelectorAll('.section, .hero');
  const allNavLinks = document.querySelectorAll('.nav-link');

  const activateNavLink = () => {
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', activateNavLink, { passive: true });

  /* ---------- Scroll-reveal ---------- */
  const animatedEls = document.querySelectorAll('.animate-on-scroll');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  animatedEls.forEach(el => revealObserver.observe(el));

  /* ---------- Contact form (Formspree) ---------- */
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = '⏳ Sending...';
      btn.disabled = true;

      try {
        const response = await fetch('https://formspree.io/f/xnjowdaz', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });

        if (response.ok) {
          btn.textContent = '✓ Message Sent!';
          btn.style.background = 'var(--clr-green)';
          form.reset();
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        } else {
          throw new Error('Server error');
        }
      } catch {
        btn.textContent = '✗ Failed — Try Again';
        btn.style.background = 'var(--clr-pink)';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }
    });
  }

  /* ---------- Smooth anchor scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---------- Interactive Dev Terminal Logic ---------- */
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalBody = document.getElementById('terminalBody');
  const terminalChips = document.querySelectorAll('.t-chip');

  const commands = {
    'ivan --help': `
      <p class="t-text">💡 <strong>Commands yang tersedia:</strong></p>
      <p class="t-text">• <code>ivan --skills</code> : Tech stack & arsitektur</p>
      <p class="t-text">• <code>ivan --status</code> : Ketersediaan pengerjaan saat ini</p>
      <p class="t-text">• <code>ivan --projects</code> : Highlight sistem & platform live</p>
      <p class="t-text">• <code>ivan --contact</code> : Info kontak direct fast-response</p>
      <p class="t-text">• <code>clear</code> : Bersihkan layar terminal</p>
    `,
    'ivan --skills': `
      <p class="t-text">⚡ <strong>Core Stack:</strong> Next.js 14, React, TypeScript, Tailwind CSS.</p>
      <p class="t-text">⚙️ <strong>Backend & DB:</strong> Firebase Admin SDK, Supabase (PostgreSQL), REST API, Webhooks.</p>
      <p class="t-text">🤖 <strong>Advanced:</strong> Google Gemini AI SDK, Machine Learning, Offline-First Architecture.</p>
    `,
    'ivan --status': `
      <p class="t-text">🟢 <strong>STATUS: OPEN FOR NEW PROJECTS & TASKS</strong></p>
      <p class="t-text">• Tugas Kuliah / Praktikum: <span style="color:#22c55e;">Available (1-2 Hari)</span></p>
      <p class="t-text">• Katalog & Landing UMKM: <span style="color:#22c55e;">Available (3-5 Hari)</span></p>
      <p class="t-text">• Custom Institutional System: <span style="color:#22c55e;">Ready for Discovery & Consultation</span></p>
    `,
    'ivan --projects': `
      <p class="t-text">⭐ <strong>1. Solo Technopark CBT</strong> -> Next.js 14, Firebase Admin, Gemini AI Parser, Anti-Cheat.</p>
      <p class="t-text">⭐ <strong>2. SMA MuAD Ecosystem</strong> -> PPDB + Keuangan Sekolah via Webhook, Kode Unik & WA Direct.</p>
      <p class="t-text">⭐ <strong>3. Kedai Atap</strong> -> Café Web App, Interactive Menu & Event Space.</p>
    `,
    'ivan --contact': `
      <p class="t-text">💬 <strong>WhatsApp:</strong> <a href="https://wa.me/6285609681260" target="_blank" style="color:#67e8f9;text-decoration:underline;">0856-0968-1260</a> (Fast Response)</p>
      <p class="t-text">📧 <strong>Email:</strong> ivannandira@gmail.com</p>
      <p class="t-text">🐙 <strong>GitHub:</strong> github.com/V4nzz</p>
    `
  };

  const runCommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `<span class="t-prompt">$</span> <span class="t-cmd">${cleanCmd}</span>`;
    terminalOutput.appendChild(commandLine);

    const resultBox = document.createElement('div');
    resultBox.className = 'terminal-output-block';

    if (commands[cleanCmd]) {
      resultBox.innerHTML = commands[cleanCmd];
    } else {
      resultBox.innerHTML = `<p class="t-text" style="color:#f87171;">⚠️ Command not recognized: '${cleanCmd}'. Ketik <code>ivan --help</code> untuk bantuan.</p>`;
    }

    terminalOutput.appendChild(resultBox);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        runCommand(val);
        terminalInput.value = '';
      }
    });
  }

  terminalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      runCommand(cmd);
    });
  });

  /* ============================================================
     AWWWARDS LUXURY ANIMATIONS:
     1. Magnetic Button Physics
     2. 3D Card Tilt with Dynamic Glare
     3. Custom Smooth Brutalist Cursor
     4. Dynamic Text Scramble / Typewriter
     5. Interactive Neobrutalist 3D Kinetic Shapes (Three.js)
     ============================================================ */

  /* 1. Magnetic Buttons */
  const magneticEls = document.querySelectorAll('.btn, .nav-logo, .nav-link--cta, .t-chip, .brutalist-3d-pill');
  magneticEls.forEach(el => {
    el.classList.add('magnetic-btn');
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  /* 2. 3D Card Tilt with Dynamic Glare */
  const tiltCards = document.querySelectorAll('.profile-card, .project-card, .service-card, .hero-terminal');
  tiltCards.forEach(card => {
    card.classList.add('tilt-card');

    if (!card.querySelector('.tilt-glare')) {
      const glare = document.createElement('div');
      glare.className = 'tilt-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  /* 3. Custom Smooth Brutalist Cursor */
  if (window.matchMedia('(pointer: fine)').matches) {
    let cursorDot = document.getElementById('cursorDot');
    let cursorRing = document.getElementById('cursorRing');

    if (!cursorDot) {
      cursorDot = document.createElement('div');
      cursorDot.id = 'cursorDot';
      cursorDot.className = 'cursor-dot';
      document.body.appendChild(cursorDot);
    }

    if (!cursorRing) {
      cursorRing = document.createElement('div');
      cursorRing.id = 'cursorRing';
      cursorRing.className = 'cursor-ring';
      document.body.appendChild(cursorRing);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    };
    renderCursor();
  }

  /* 4. Dynamic Text Scramble / Typewriter Hero */
  const dynamicRoleEl = document.getElementById('dynamicRole');
  if (dynamicRoleEl) {
    const roles = [
      'Fullstack Web',
      'CBT & AI Systems',
      'Cloud Architecture',
      'Custom Solutions',
      'Offline-First Apps'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const eraseSpeed = 45;
    const delayBetween = 1800;

    const typeRole = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        dynamicRoleEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        dynamicRoleEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => {
          isDeleting = true;
          typeRole();
        }, delayBetween);
        return;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }

      setTimeout(typeRole, isDeleting ? eraseSpeed : typeSpeed);
    };

    setTimeout(typeRole, 600);
  }

  /* ============================================================
     5. NEOBRUTALIST 3D KINETIC SHAPES (Three.js WebGL)
     - Theme: Bright Neobrutalism (#ffe156, #a8d8ff, #ffb8d4, #b8f0c8)
     - Shading: Crisp 3-step Toon/Cel-Shading + Thick Black Outline (#1a1a1a)
     - Interactivity: Smooth Mouse Lerp + Raycaster Hover + Click Squash/Stretch & 3D Mini-Sticker Burst
     - Mobile Optimization: Disabled on <768px & Paused when off-screen
     ============================================================ */
  const initNeobrutalistHero3D = () => {
    const canvas = document.getElementById('hero3dCanvas');
    const heroSection = document.getElementById('hero');
    const popBtn = document.getElementById('trigger3dPop');
    const cursorRing = document.getElementById('cursorRing');
    const cursorText = document.getElementById('cursorText');

    // Guard: Pastikan Three.js tersedia & elemen ada
    if (!canvas || !heroSection || typeof THREE === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Deteksi ukuran layar untuk penyesuaian performa & posisi
    const isMobile = () => window.innerWidth < 768;
    const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;

    /* --- 1. Palet Warna --- */
    const PALETTE = {
      yellow: 0xffe156,
      blue:   0x38bdf8,
      pink:   0xf43f5e,
      green:  0x22c55e,
      purple: 0xa855f7,
      black:  0x1a1a1a,
      white:  0xffffff
    };

    const POP_COLORS = [PALETTE.yellow, PALETTE.blue, PALETTE.pink, PALETTE.green, PALETTE.purple];

    /* --- 2. Setup Scene, Camera & Transparent WebGL Renderer --- */
    const scene = new THREE.Scene();

    const getStageSize = () => ({
      width: heroSection.clientWidth || window.innerWidth,
      height: heroSection.clientHeight || window.innerHeight
    });

    let { width, height } = getStageSize();

    // Dynamic Camera Distance berdasarkan lebar layar
    const getDynamicCameraZ = () => {
      if (window.innerWidth < 480) return 9.5;
      if (window.innerWidth < 768) return 11.0;
      if (window.innerWidth < 1024) return 12.0;
      return 12.5;
    };

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(0, 0, getDynamicCameraZ());

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile(),
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);


    /* --- 3. Lighting Merata agar Warna Solid & Pop --- */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(6, 10, 8);
    scene.add(dirLight);

    /* --- 4. Material Neobrutalist Murni (Warna Sangat Pop & Outline Hitam Tegas) --- */
    const createBrutalistMaterial = (hexColor) => {
      return new THREE.MeshLambertMaterial({
        color: hexColor
      });
    };

    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: PALETTE.black,
      side: THREE.BackSide
    });

    const creaseLineMaterial = new THREE.LineBasicMaterial({
      color: PALETTE.black,
      linewidth: 3,
      transparent: false
    });

    /* --- 5. Helper Pembuat Bentuk Neobrutalist (Toon Mesh + Thick Outline + Hard Shadow) --- */
    const createRoundedCubeGeometry = (size = 1.05, radius = 0.22, depth = 0.72) => {
      const s = size / 2;
      const r = Math.min(radius, s * 0.45);
      const shape = new THREE.Shape();
      shape.moveTo(-s + r, -s);
      shape.lineTo(s - r, -s);
      shape.quadraticCurveTo(s, -s, s, -s + r);
      shape.lineTo(s, s - r);
      shape.quadraticCurveTo(s, s, s - r, s);
      shape.lineTo(-s + r, s);
      shape.quadraticCurveTo(-s, s, -s, s - r);
      shape.lineTo(-s, -s + r);
      shape.quadraticCurveTo(-s, -s, -s + r, -s);

      const extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.12,
        bevelThickness: 0.12
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.center();
      return geo;
    };

    const buildBrutalistObject = ({
      geometry,
      color,
      outlineThickness = 1.10,
      addFacetLines = false,
      addHardShadow = true,
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      baseScale = 1,
      depthFactor = 1
    }) => {
      const group = new THREE.Group();
      group.position.set(...position);
      group.rotation.set(...rotation);
      group.scale.setScalar(baseScale);
      // 1. Main Mesh dengan Warna Asli Cerah
      const mainMat = createBrutalistMaterial(color);
      const mainMesh = new THREE.Mesh(geometry, mainMat);
      group.add(mainMesh);

      // 2. Thick Black Cartoon Outline (Neobrutalist Border Tebal)
      const outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
      outlineMesh.scale.setScalar(outlineThickness);
      group.add(outlineMesh);

      // 3. Garis Lipatan (Crease lines) untuk bangun berbidang (Icosahedron/Octahedron)
      if (addFacetLines) {
        const edgesGeo = new THREE.EdgesGeometry(geometry, 20);
        const lineSegments = new THREE.LineSegments(edgesGeo, creaseLineMaterial);
        lineSegments.scale.setScalar(1.002);
        group.add(lineSegments);
      }

      // 4. Neobrutalist Hard Offset Shadow (ala box-shadow: 6px 6px 0 #1a1a1a)
      if (addHardShadow) {
        const shadowMesh = new THREE.Mesh(geometry, outlineMaterial);
        shadowMesh.scale.setScalar(outlineThickness * 0.98);
        shadowMesh.position.set(0.16, -0.16, -0.18);
        group.add(shadowMesh);
      }

      // Simpan referensi state fisika & animasi di userData
      mainMesh.userData.parentGroup = group;
      group.userData = {
        mainMesh,
        mainMat,
        basePos: new THREE.Vector3(...position),
        baseRot: new THREE.Euler(...rotation),
        baseScale,
        depthFactor,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 1.4 + Math.random() * 0.7,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.012,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.01
        },
        hoverScale: 1.0,
        springDisplace: 0,
        springVelocity: 0,
        spinImpulse: new THREE.Vector3(0, 0, 0),
        colorIndex: POP_COLORS.indexOf(color) !== -1 ? POP_COLORS.indexOf(color) : 0
      };

      return { group, mainMesh };
    };

    /* --- 6. Rakit Komposisi Objek 3D di Sekitar Hero & Profile Card --- */
    const mainStageGroup = new THREE.Group();
    scene.add(mainStageGroup);

    const interactiveGroups = [];
    const raycastTargets = [];

    const shapeConfigs = [
      // 1. Chunky Yellow Torus (Donut) — Kiri atas di atas badge "Available for work"
      {
        geometry: new THREE.TorusGeometry(0.68, 0.26, 18, 42),
        color: PALETTE.yellow,
        outlineThickness: 1.10,
        addFacetLines: false,
        addHardShadow: true,
        position: [-5.2, 2.6, 0.3],
        rotation: [0.5, -0.4, 0.2],
        baseScale: 1.15,
        depthFactor: 1.2
      },
      // 2. Faceted Sky Blue Icosahedron — Tepat di celah kosong samping nama "Ivan Nandira" & kiri foto
      {
        geometry: new THREE.IcosahedronGeometry(0.75, 0),
        color: PALETTE.blue,
        outlineThickness: 1.10,
        addFacetLines: true,
        addHardShadow: true,
        position: [0.35, 0.35, 0.3],
        rotation: [0.3, 0.6, -0.2],
        baseScale: 1.15,
        depthFactor: 1.0
      },
      // 3. Rounded Brutalist Hot Pink Cube — Kiri bawah di bawah paragraf & tombol
      {
        geometry: createRoundedCubeGeometry(1.05, 0.22, 0.68),
        color: PALETTE.pink,
        outlineThickness: 1.10,
        addFacetLines: false,
        addHardShadow: true,
        position: [-4.6, -2.6, 0.4],
        rotation: [-0.35, 0.45, 0.25],
        baseScale: 1.1,
        depthFactor: 1.3
      },
      // 4. Emerald Green Kinetic Octahedron — Kiri luar tengah
      {
        geometry: new THREE.OctahedronGeometry(0.70, 0),
        color: PALETTE.green,
        outlineThickness: 1.10,
        addFacetLines: true,
        addHardShadow: true,
        position: [-6.4, 0.0, 0.1],
        rotation: [0.2, -0.5, 0.4],
        baseScale: 1.1,
        depthFactor: 0.9
      },
      // 5. Hot Pink Mini Torus — Kiri atas di atas kata "Hi, I'm"
      {
        geometry: new THREE.TorusGeometry(0.48, 0.18, 16, 32),
        color: PALETTE.pink,
        outlineThickness: 1.12,
        addFacetLines: false,
        addHardShadow: true,
        position: [-2.4, 2.8, -0.1],
        rotation: [-0.4, 0.3, -0.5],
        baseScale: 0.95,
        depthFactor: 0.8
      },
      // 6. Violet Brutalist Gem — Celah bawah tengah di antara teks dan stats
      {
        geometry: new THREE.OctahedronGeometry(0.65, 0),
        color: PALETTE.purple,
        outlineThickness: 1.10,
        addFacetLines: true,
        addHardShadow: true,
        position: [-0.6, -2.4, 0.1],
        rotation: [0.4, 0.3, 0.2],
        baseScale: 1.05,
        depthFactor: 0.95
      }
    ];

    shapeConfigs.forEach(cfg => {
      const { group, mainMesh } = buildBrutalistObject(cfg);
      mainStageGroup.add(group);
      interactiveGroups.push(group);
      raycastTargets.push(mainMesh);
    });

    /* --- 7. Sistem Partikel "Floating Mini-Stickers 3D" saat Klik --- */
    const miniStickers = [];
    const miniGeometries = [
      new THREE.OctahedronGeometry(0.22, 0),
      new THREE.BoxGeometry(0.28, 0.28, 0.28),
      new THREE.TorusGeometry(0.16, 0.07, 10, 20),
      new THREE.IcosahedronGeometry(0.20, 0)
    ];

    const spawnMiniStickersBurst = (originVec3, count = 10) => {
      for (let i = 0; i < count; i++) {
        const geo = miniGeometries[i % miniGeometries.length];
        const color = POP_COLORS[(i + Math.floor(Math.random() * POP_COLORS.length)) % POP_COLORS.length];

        const stickerGroup = new THREE.Group();
        stickerGroup.position.copy(originVec3);

        const mesh = new THREE.Mesh(geo, createBrutalistMaterial(color));
        const edges = new THREE.EdgesGeometry(geo);
        const outline = new THREE.LineSegments(edges, creaseLineMaterial);
        stickerGroup.add(mesh);
        stickerGroup.add(outline);

        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 0.08 + Math.random() * 0.11;

        stickerGroup.userData = {
          velocity: new THREE.Vector3(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed + 0.06,
            (Math.random() - 0.3) * 0.12
          ),
          rotVel: new THREE.Vector3(
            (Math.random() - 0.5) * 0.22,
            (Math.random() - 0.5) * 0.22,
            (Math.random() - 0.5) * 0.22
          ),
          age: 0,
          maxAge: 42 + Math.floor(Math.random() * 20),
          meshMat: mesh.material
        };

        scene.add(stickerGroup);
        miniStickers.push(stickerGroup);
      }
    };

    /* --- 8. Efek Squash & Stretch Pegas pada Objek --- */
    const triggerObjectPop = (group, spawnParticles = true) => {
      const ud = group.userData;
      ud.springVelocity = 0.52;
      ud.spinImpulse.set(
        (Math.random() - 0.5) * 0.35,
        (Math.random() > 0.5 ? 1 : -1) * 0.38,
        (Math.random() - 0.5) * 0.28
      );

      ud.colorIndex = (ud.colorIndex + 1) % POP_COLORS.length;
      ud.mainMat.color.setHex(POP_COLORS[ud.colorIndex]);

      if (spawnParticles) {
        const worldPos = new THREE.Vector3();
        group.getWorldPosition(worldPos);
        spawnMiniStickersBurst(worldPos, 11);
      }
    };

    /* --- 9. Mouse Tracking (Lerp) & Raycaster Click/Hover --- */
    const pointerNDC = new THREE.Vector2(999, 999);
    const targetMouse = new THREE.Vector2(0, 0);
    const smoothMouse = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    let hoveredGroup = null;

    const updatePointerCoords = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      pointerNDC.x = targetMouse.x;
      pointerNDC.y = targetMouse.y;
    };

    window.addEventListener('mousemove', (e) => {
      updatePointerCoords(e.clientX, e.clientY);

      const rect = heroSection.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        raycaster.setFromCamera(pointerNDC, camera);
        const intersects = raycaster.intersectObjects(raycastTargets, false);

        if (intersects.length > 0) {
          const hitGroup = intersects[0].object.userData.parentGroup;
          if (hoveredGroup !== hitGroup) {
            if (hoveredGroup) hoveredGroup.userData.hoverScale = 1.0;
            hoveredGroup = hitGroup;
            hoveredGroup.userData.hoverScale = 1.15;
          }
          if (cursorRing) cursorRing.classList.add('cursor-ring--3d-active');
          if (cursorText) cursorText.textContent = 'POP!';
        } else {
          if (hoveredGroup) {
            hoveredGroup.userData.hoverScale = 1.0;
            hoveredGroup = null;
          }
          if (cursorRing) cursorRing.classList.remove('cursor-ring--3d-active');
          if (cursorText) cursorText.textContent = '';
        }
      }
    }, { passive: true });

    heroSection.addEventListener('pointerdown', (e) => {
      if (e.target.closest('a, button, input')) return;

      updatePointerCoords(e.clientX, e.clientY);
      raycaster.setFromCamera(pointerNDC, camera);
      const intersects = raycaster.intersectObjects(raycastTargets, false);

      if (intersects.length > 0) {
        const hitGroup = intersects[0].object.userData.parentGroup;
        triggerObjectPop(hitGroup, true);
      } else {
        let closestGroup = interactiveGroups[0];
        let minDist = Infinity;

        interactiveGroups.forEach(g => {
          const proj = g.position.clone().project(camera);
          const dist = Math.hypot(proj.x - pointerNDC.x, proj.y - pointerNDC.y);
          if (dist < minDist) {
            minDist = dist;
            closestGroup = g;
          }
        });

        if (closestGroup) triggerObjectPop(closestGroup, true);
      }
    });

    if (popBtn) {
      popBtn.addEventListener('click', () => {
        interactiveGroups.forEach((group, idx) => {
          setTimeout(() => {
            triggerObjectPop(group, idx % 2 === 0);
          }, idx * 55);
        });
      });
    }

    /* --- 10. Pause Otomatis Saat Hero Tidak Terlihat di Layar --- */
    let isHeroVisible = true;
    const heroVisibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          isHeroVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    heroVisibilityObserver.observe(heroSection);

    /* --- 11. Responsivitas Universal — Scale posisi berdasarkan lebar layar --- */
    const updateLayoutPositions = (viewportWidth) => {
      // Makin kecil layar, makin dipersempit agar elemen tidak keluar viewport
      let spreadX, spreadY;
      if (viewportWidth < 480) {
        spreadX = 0.45; spreadY = 0.55;
      } else if (viewportWidth < 768) {
        spreadX = 0.58; spreadY = 0.70;
      } else if (viewportWidth < 1024) {
        spreadX = 0.78; spreadY = 0.88;
      } else if (viewportWidth < 1200) {
        spreadX = 0.88; spreadY = 0.95;
      } else {
        spreadX = 1.0; spreadY = 1.0;
      }
      interactiveGroups.forEach((group, idx) => {
        const cfgPos = shapeConfigs[idx].position;
        group.userData.basePos.x = cfgPos[0] * spreadX;
        group.userData.basePos.y = cfgPos[1] * spreadY;
      });
      // Update camera Z juga saat resize
      camera.position.z = getDynamicCameraZ();
      camera.updateProjectionMatrix();
    };

    updateLayoutPositions(width);

    // Touch events untuk parallax di HP (menggantikan mouse)
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = heroSection.getBoundingClientRect();
      const nx = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
      targetMouse.x = nx * 0.5;
      targetMouse.y = ny * 0.5;
    }, { passive: true });

    window.addEventListener('resize', () => {
      const newSize = getStageSize();
      width = newSize.width;
      height = newSize.height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));
      updateLayoutPositions(width);
    });

    /* --- 12. Main Animation Loop (Lerp Damping + Hooke's Spring Physics) --- */
    const clock = new THREE.Clock();

    const animate3D = () => {
      requestAnimationFrame(animate3D);

      if (!isHeroVisible) return;

      const elapsed = clock.getElapsedTime();

      // Lerp mouse
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.065;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.065;

      // Group rotation
      mainStageGroup.rotation.y = smoothMouse.x * 0.14;
      mainStageGroup.rotation.x = -smoothMouse.y * 0.10;

      // Objek 3D update
      interactiveGroups.forEach((group) => {
        const ud = group.userData;

        const floatY = Math.sin(elapsed * ud.floatSpeed + ud.floatPhase) * 0.24;
        const floatX = Math.cos(elapsed * (ud.floatSpeed * 0.7) + ud.floatPhase) * 0.10;

        const targetX = ud.basePos.x + floatX + (smoothMouse.x * 0.45 * ud.depthFactor);
        const targetY = ud.basePos.y + floatY + (smoothMouse.y * 0.35 * ud.depthFactor);

        group.position.x += (targetX - group.position.x) * 0.08;
        group.position.y += (targetY - group.position.y) * 0.08;

        group.rotation.x += ud.rotSpeed.x + ud.spinImpulse.x + (-smoothMouse.y * 0.008);
        group.rotation.y += ud.rotSpeed.y + ud.spinImpulse.y + (smoothMouse.x * 0.008);
        group.rotation.z += ud.rotSpeed.z + ud.spinImpulse.z;
        ud.spinImpulse.multiplyScalar(0.90);

        // Hooke's Law Spring
        const stiffness = 0.24;
        const damping = 0.80;
        const springForce = -stiffness * ud.springDisplace;
        ud.springVelocity = (ud.springVelocity + springForce) * damping;
        ud.springDisplace += ud.springVelocity;

        const base = ud.baseScale * ud.hoverScale;
        const sx = base * (1 + ud.springDisplace * 0.65);
        const sy = base * (1 - ud.springDisplace * 0.75);
        const sz = base * (1 + ud.springDisplace * 0.65);

        group.scale.x += (sx - group.scale.x) * 0.25;
        group.scale.y += (sy - group.scale.y) * 0.25;
        group.scale.z += (sz - group.scale.z) * 0.25;
      });

      // Update partikel Mini-Stickers
      for (let i = miniStickers.length - 1; i >= 0; i--) {
        const sticker = miniStickers[i];
        const sud = sticker.userData;
        sud.age++;

        sud.velocity.y -= 0.0038;
        sticker.position.add(sud.velocity);
        sticker.rotation.x += sud.rotVel.x;
        sticker.rotation.y += sud.rotVel.y;
        sticker.rotation.z += sud.rotVel.z;

        const lifeRatio = 1 - sud.age / sud.maxAge;
        const scaleVal = Math.max(0.001, Math.sin(lifeRatio * Math.PI * 0.5) * 1.15);
        sticker.scale.setScalar(scaleVal);

        if (sud.age >= sud.maxAge) {
          scene.remove(sticker);
          sud.meshMat.dispose();
          miniStickers.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate3D();
  };

  /* ============================================================
     VANZ STUDIO — 3 MODUL THREE.JS NEOBRUTALISM (r128)
     1. initRetroStation3D() -> Hero Section (#hero)
     2. initProjectCarousel3D() -> Projects Section (#projects)
     3. initTechSphere3D() -> Tech Stack Section (#skills)
     ============================================================ */

  const NEOBRUTAL_PALETTE = {
    bg: 0xfffdf7,
    black: 0x1a1a1a,
    white: 0xffffff,
    yellow: 0xffe156,
    blue: 0xa8d8ff,
    pink: 0xffb8d4,
    green: 0xb8f0c8,
    purple: 0xd4b8ff
  };

  /* Helper Global: Buat Toon Gradient 3-Step Cerah (Anti Kusam/Gelap) */
  function createSharedToonGradient() {
    const data = new Uint8Array([
      200, 200, 200, 255, // Shadow step tetap cerah
      232, 232, 232, 255, // Midtone step
      255, 255, 255, 255  // Highlight step
    ]);
    const tex = new THREE.DataTexture(data, 3, 1, THREE.RGBAFormat);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.needsUpdate = true;
    return tex;
  }

  /* Helper Global: Tambahkan Outline Hitam Tebal (Inverted Hull + Edges) */
  function addBrutalistOutline(mesh, geometry, scale = 1.07, addCreaseLines = true) {
    const outlineMat = new THREE.MeshBasicMaterial({ color: NEOBRUTAL_PALETTE.black, side: THREE.BackSide });
    const outlineMesh = new THREE.Mesh(geometry, outlineMat);
    outlineMesh.scale.setScalar(scale);
    mesh.add(outlineMesh);

    if (addCreaseLines) {
      const edges = new THREE.EdgesGeometry(geometry, 20);
      const lineMat = new THREE.LineBasicMaterial({ color: NEOBRUTAL_PALETTE.black });
      const lines = new THREE.LineSegments(edges, lineMat);
      lines.scale.setScalar(1.003);
      mesh.add(lines);
    }
  }

  /* Helper Global: Geometri Kotak Bevel / Rounded Neobrutalist */
  function createRoundedBoxGeo(w, h, d, radius = 0.14) {
    const hw = w / 2;
    const hh = h / 2;
    const r = Math.min(radius, hw * 0.4, hh * 0.4);
    const shape = new THREE.Shape();
    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: r * 0.45,
      bevelThickness: r * 0.45
    });
    geo.center();
    return geo;
  }

  /* ============================================================
     MODUL 1 — KONSEP 2: Retro Workstation / 3D Developer Desktop
     ============================================================ */
  function initRetroStation3D() {
    const stage = document.getElementById('retroStationStage');
    const canvas = document.getElementById('retroStationCanvas');
    const statsPopup = document.getElementById('retroQuickStats');

    if (!stage || !canvas || typeof THREE === 'undefined') return;

    const isMobile = () => window.innerWidth < 768;

    const toonGrad = createSharedToonGradient();
    const makeToonMat = (hex) => new THREE.MeshToonMaterial({ color: hex, gradientMap: toonGrad });

    const scene = new THREE.Scene();
    let width = stage.clientWidth || 440;
    let height = stage.clientHeight || 340;

    // Kamera mundur lebih jauh di layar kecil agar PC terlihat penuh
    const getDynamicCamZ = () => {
      if (window.innerWidth < 480) return 9.5;
      if (window.innerWidth < 768) return 8.2;
      return 7.2;
    };

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.35, getDynamicCamZ());
    camera.lookAt(0, -0.15, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.88));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const rigGroup = new THREE.Group();
    rigGroup.position.set(0, -0.15, 0);
    scene.add(rigGroup);

    // Base Plate Biru Pastel di Bawah Workstation
    const basePlateGeo = createRoundedBoxGeo(3.9, 0.18, 2.5, 0.18);
    const basePlate = new THREE.Mesh(basePlateGeo, makeToonMat(NEOBRUTAL_PALETTE.blue));
    basePlate.position.set(0, -1.18, 0);
    addBrutalistOutline(basePlate, basePlateGeo, 1.04, true);
    rigGroup.add(basePlate);

    // 1. Monitor Casing (Bezel Rounded Tebal Kuning #ffe156)
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 0.32, -0.15);
    rigGroup.add(monitorGroup);

    const bezelGeo = createRoundedBoxGeo(2.65, 1.95, 1.15, 0.22);
    const bezelMesh = new THREE.Mesh(bezelGeo, makeToonMat(NEOBRUTAL_PALETTE.yellow));
    addBrutalistOutline(bezelMesh, bezelGeo, 1.055, false);
    monitorGroup.add(bezelMesh);

    // Tabung Belakang CRT (Pink #ffb8d4)
    const crtBackGeo = createRoundedBoxGeo(1.75, 1.25, 0.85, 0.16);
    const crtBackMesh = new THREE.Mesh(crtBackGeo, makeToonMat(NEOBRUTAL_PALETTE.pink));
    crtBackMesh.position.set(0, 0.05, -0.78);
    addBrutalistOutline(crtBackMesh, crtBackGeo, 1.06, false);
    monitorGroup.add(crtBackMesh);

    // Stand Leher Monitor
    const neckGeo = new THREE.CylinderGeometry(0.32, 0.45, 0.55, 16);
    const neckMesh = new THREE.Mesh(neckGeo, makeToonMat(NEOBRUTAL_PALETTE.white));
    neckMesh.position.set(0, -1.12, -0.15);
    addBrutalistOutline(neckMesh, neckGeo, 1.08, true);
    monitorGroup.add(neckMesh);

    // Tombol Power di Bezel Bawah
    const powerBtnGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12);
    powerBtnGeo.rotateX(Math.PI / 2);
    const powerBtn = new THREE.Mesh(powerBtnGeo, makeToonMat(NEOBRUTAL_PALETTE.pink));
    powerBtn.position.set(0.95, -0.74, 0.65);
    addBrutalistOutline(powerBtn, powerBtnGeo, 1.15, false);
    monitorGroup.add(powerBtn);

    // 2. Layar CRT Interaktif (CanvasTexture Dinamis)
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 360;
    const ctx = screenCanvas.getContext('2d');

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    const screenGeo = new THREE.PlaneGeometry(2.18, 1.44);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture, depthTest: true });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.08, 0.72);

    const screenFrameGeo = new THREE.PlaneGeometry(2.28, 1.54);
    const screenFrame = new THREE.Mesh(
      screenFrameGeo,
      new THREE.MeshBasicMaterial({ color: NEOBRUTAL_PALETTE.black })
    );
    screenFrame.position.set(0, 0.08, 0.70);
    monitorGroup.add(screenFrame);
    monitorGroup.add(screenMesh);

    // 3. Keyboard Mekanikal Mini + Keycaps Warna-warni
    const kbGroup = new THREE.Group();
    kbGroup.position.set(-0.22, -0.96, 0.72);
    kbGroup.rotation.x = 0.18;
    rigGroup.add(kbGroup);

    const kbCaseGeo = createRoundedBoxGeo(2.15, 0.20, 0.78, 0.08);
    const kbCase = new THREE.Mesh(kbCaseGeo, makeToonMat(NEOBRUTAL_PALETTE.white));
    addBrutalistOutline(kbCase, kbCaseGeo, 1.06, false);
    kbGroup.add(kbCase);

    const keycaps = [];
    const keyColors = [
      NEOBRUTAL_PALETTE.yellow,
      NEOBRUTAL_PALETTE.blue,
      NEOBRUTAL_PALETTE.pink,
      NEOBRUTAL_PALETTE.green,
      NEOBRUTAL_PALETTE.white
    ];
    const keyGeo = new THREE.BoxGeometry(0.18, 0.10, 0.16);

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        const color = keyColors[(row * 3 + col) % keyColors.length];
        const keyMesh = new THREE.Mesh(keyGeo, makeToonMat(color));
        const kx = -0.78 + col * 0.22;
        const kz = -0.20 + row * 0.21;
        keyMesh.position.set(kx, 0.13, kz);
        addBrutalistOutline(keyMesh, keyGeo, 1.12, false);
        keyMesh.userData = { baseY: 0.13, phase: row * 2.1 + col * 0.85 };
        kbGroup.add(keyMesh);
        keycaps.push(keyMesh);
      }
    }

    // Mouse Retro di Kanan Keyboard
    const mouseGeo = createRoundedBoxGeo(0.42, 0.18, 0.58, 0.10);
    const mouseMesh = new THREE.Mesh(mouseGeo, makeToonMat(NEOBRUTAL_PALETTE.pink));
    mouseMesh.position.set(1.28, -0.96, 0.72);
    addBrutalistOutline(mouseMesh, mouseGeo, 1.08, false);
    rigGroup.add(mouseMesh);

    // 4. Render Running Text di Layar CRT
    let marqueeOffset = 512;
    let showStatsOnScreen = false;

    const drawCRTScreen = (time) => {
      ctx.fillStyle = '#11181c';
      ctx.fillRect(0, 0, 512, 360);

      // Header Bar Kuning
      ctx.fillStyle = '#ffe156';
      ctx.fillRect(0, 0, 512, 42);
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 40, 512, 4);
      ctx.font = 'bold 18px "Space Mono", monospace';
      ctx.fillStyle = '#1a1a1a';
      ctx.fillText('⚡ VANZ-OS v2.6 [CRT-TERMINAL]', 16, 27);

      // Running Text Hijau/Cyan
      ctx.fillStyle = '#19252b';
      ctx.fillRect(14, 58, 484, 54);
      ctx.strokeStyle = '#b8f0c8';
      ctx.lineWidth = 3;
      ctx.strokeRect(14, 58, 484, 54);

      const bannerText = 'VANZ STUDIO // SYSTEM ONLINE: NEXT.JS & GEMINI AI ★ CLICK MONITOR FOR QUICK PROJECT STATS! ★ ';
      ctx.save();
      ctx.beginPath();
      ctx.rect(18, 60, 476, 50);
      ctx.clip();
      ctx.font = 'bold 22px "Space Mono", monospace';
      ctx.fillStyle = '#b8f0c8';
      ctx.fillText(bannerText, marqueeOffset, 93);
      ctx.restore();

      marqueeOffset -= 2.4;
      if (marqueeOffset < -1350) marqueeOffset = 490;

      if (!showStatsOnScreen) {
        ctx.font = 'bold 16px "Space Mono", monospace';
        ctx.fillStyle = '#67e8f9';
        ctx.fillText('> STATUS : READY FOR PROJECTS', 22, 148);
        ctx.fillStyle = '#ffe156';
        ctx.fillText('> STACK : NEXT.JS 14 / SUPABASE / AI', 22, 178);
        ctx.fillStyle = '#ffb8d4';
        ctx.fillText('> LATENCY : 12ms (CLOUD EDGE)', 22, 208);

        const barColors = ['#b8f0c8', '#a8d8ff', '#ffe156', '#ffb8d4'];
        for (let i = 0; i < 12; i++) {
          const barH = 24 + Math.abs(Math.sin(time * 3.5 + i * 0.6)) * 55;
          ctx.fillStyle = barColors[i % barColors.length];
          ctx.fillRect(22 + i * 39, 310 - barH, 28, barH);
          ctx.strokeStyle = '#1a1a1a';
          ctx.lineWidth = 2;
          ctx.strokeRect(22 + i * 39, 310 - barH, 28, barH);
        }
      } else {
        ctx.fillStyle = '#a8d8ff';
        ctx.fillRect(20, 128, 226, 90);
        ctx.fillStyle = '#ffb8d4';
        ctx.fillRect(266, 128, 226, 90);
        ctx.fillStyle = '#b8f0c8';
        ctx.fillRect(20, 232, 472, 78);

        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 26px "Space Grotesk", sans-serif';
        ctx.fillText('5+ LIVE APPS', 36, 168);
        ctx.fillText('99.9% UPTIME', 282, 168);
        ctx.font = 'bold 15px "Space Mono", monospace';
        ctx.fillText('CBT Solo & SMA MuAD', 36, 198);
        ctx.fillText('Next.js + Webhook', 282, 198);
        ctx.font = 'bold 20px "Space Grotesk", sans-serif';
        ctx.fillText('🚀 CLICK AGAIN TO TOGGLE MONITOR', 42, 278);
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      for (let y = 44; y < 360; y += 6) {
        ctx.fillRect(0, y, 512, 2);
      }

      screenTexture.needsUpdate = true;
    };

    // 5. Mouse Parallax Lerp & Click Squash/Stretch
    let targetRotX = 0;
    let targetRotY = -0.18;
    let springScale = 0;
    let springVel = 0;

    window.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const nx = ((e.clientX - (rect.left + rect.width / 2)) / window.innerWidth) * 2;
      const ny = ((e.clientY - (rect.top + rect.height / 2)) / window.innerHeight) * 2;
      targetRotY = -0.15 + nx * 0.45;
      targetRotX = ny * 0.28;
    }, { passive: true });

    const toggleStats = () => {
      springVel = 0.45;
      showStatsOnScreen = !showStatsOnScreen;
      if (statsPopup) {
        if (showStatsOnScreen) {
          statsPopup.classList.add('active');
        } else {
          statsPopup.classList.remove('active');
        }
      }
    };

    stage.addEventListener('touchstart', toggleStats, { passive: true });

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(stage);

    // Touch tilt untuk HP
    stage.addEventListener('touchmove', (e) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = stage.getBoundingClientRect();
      const nx = ((touch.clientX - (rect.left + rect.width / 2)) / rect.width) * 2;
      const ny = ((touch.clientY - (rect.top + rect.height / 2)) / rect.height) * 2;
      targetRotY = -0.15 + nx * 0.35;
      targetRotX = ny * 0.20;
    }, { passive: true });

    window.addEventListener('resize', () => {
      width = stage.clientWidth || 440;
      height = stage.clientHeight || 340;
      camera.aspect = width / height;
      camera.position.z = getDynamicCamZ();
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isVisible) return;
      const t = clock.getElapsedTime();

      drawCRTScreen(t);

      rigGroup.rotation.y += (targetRotY - rigGroup.rotation.y) * 0.07;
      rigGroup.rotation.x += (targetRotX - rigGroup.rotation.x) * 0.07;
      rigGroup.position.y = -0.15 + Math.sin(t * 1.8) * 0.07;

      keycaps.forEach(k => {
        const wave = Math.sin(t * 7.5 + k.userData.phase);
        k.position.y = k.userData.baseY + (wave > 0.65 ? -0.045 : 0);
      });

      const force = -0.22 * springScale;
      springVel = (springVel + force) * 0.80;
      springScale += springVel;

      const targetBaseScale = showStatsOnScreen ? 1.07 : 1.0;
      monitorGroup.scale.set(
        targetBaseScale * (1 + springScale * 0.55),
        targetBaseScale * (1 - springScale * 0.65),
        targetBaseScale * (1 + springScale * 0.55)
      );

      renderer.render(scene, camera);
    };
    animate();
  }

  /* ============================================================
     MODUL 2 — KONSEP 3: Spatial 3D Kinetic Project Carousel
     ============================================================ */
  function initProjectCarousel3D() {
    const stage = document.getElementById('projectCarouselStage');
    const canvas = document.getElementById('projectCarouselCanvas');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    const activeTitleEl = document.getElementById('carouselActiveTitle');
    const activeLinkEl = document.getElementById('carouselActiveLink');

    if (!stage || !canvas || typeof THREE === 'undefined') return;

    const isMobile = () => window.innerWidth < 768;

    const PROJECTS_DATA = [
      {
        title: 'Solo Technopark CBT',
        badge: 'FLAGSHIP SYSTEM',
        emoji: '🖥️',
        color: '#a8d8ff',
        hex: NEOBRUTAL_PALETTE.blue,
        desc: 'Platform CBT anti-cheat (fullscreen lock), timer sinkron server, & parser soal Gemini AI.',
        tags: ['Next.js 14', 'TypeScript', 'Firebase Admin', 'Gemini AI'],
        url: 'https://cbt.solotechnopark.id/'
      },
      {
        title: 'SMA MuAD Ecosystem',
        badge: 'ENTERPRISE WEBHOOK',
        emoji: '🏫',
        color: '#ffe156',
        hex: NEOBRUTAL_PALETTE.yellow,
        desc: 'Integrasi PPDB Online & Sistem Keuangan SPP real-time via secure webhook & WA Gateway.',
        tags: ['Supabase', 'Secure Webhook', 'Billing System', 'Multi-Role'],
        url: 'http://ppdb.smamuadmetro.sch.id/'
      },
      {
        title: 'Kedai Atap Web App',
        badge: 'COMMERCE & SPACE',
        emoji: '☕',
        color: '#ffb8d4',
        hex: NEOBRUTAL_PALETTE.pink,
        desc: 'Aplikasi pemesanan digital, katalog interaktif, event space, dan payment gateway Midtrans.',
        tags: ['Next.js 14', 'Tailwind CSS', 'Firebase', 'Midtrans'],
        url: 'https://kedaiatap.vercel.app/'
      },
      {
        title: 'EduKids Infinite',
        badge: 'GAMIFIED EDUCATION',
        emoji: '🎮',
        color: '#b8f0c8',
        hex: NEOBRUTAL_PALETTE.green,
        desc: 'Platform edukasi interaktif anak dengan gamifikasi belajar, custom avatar, dan daily activity tracking.',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Gamification'],
        url: 'https://edu-kids-infinite.vercel.app/'
      }
    ];

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(NEOBRUTAL_PALETTE.bg, 7.5, 15.5);

    let width = stage.clientWidth || 1000;
    let height = stage.clientHeight || 410;

    // Kamera lebih mundur di layar kecil agar semua kartu terlihat
    const getDynamicCamZ = () => {
      if (window.innerWidth < 480) return 11.5;
      if (window.innerWidth < 768) return 10.0;
      if (window.innerWidth < 1024) return 8.5;
      return 7.6;
    };

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.35, getDynamicCamZ());

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile() });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.95));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.65);
    dirLight.position.set(4, 7, 6);
    scene.add(dirLight);

    const createCardTexture = (proj, index) => {
      const c = document.createElement('canvas');
      c.width = 640;
      c.height = 420;
      const ctx = c.getContext('2d');

      ctx.fillStyle = proj.color;
      ctx.fillRect(0, 0, 640, 420);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(24, 24, 592, 68);
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#1a1a1a';
      ctx.strokeRect(24, 24, 592, 68);

      ctx.fillStyle = '#1a1a1a';
      ctx.font = 'bold 24px "Space Mono", monospace';
      ctx.fillText(`0${index + 1} // ${proj.badge}`, 44, 67);
      ctx.font = '38px sans-serif';
      ctx.fillText(proj.emoji, 550, 71);

      ctx.fillStyle = '#1a1a1a';
      ctx.font = 'bold 42px "Space Grotesk", sans-serif';
      ctx.fillText(proj.title, 28, 155);

      ctx.font = '500 22px "Space Grotesk", sans-serif';
      const words = proj.desc.split(' ');
      let line = '';
      let y = 205;
      words.forEach(w => {
        const testLine = line + w + ' ';
        if (ctx.measureText(testLine).width > 570) {
          ctx.fillText(line, 28, y);
          line = w + ' ';
          y += 32;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, 28, y);

      let pillX = 28;
      const pillY = 330;
      ctx.font = 'bold 18px "Space Mono", monospace';
      proj.tags.forEach(tag => {
        const tw = ctx.measureText(tag).width + 28;
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(pillX + 4, pillY + 4, tw, 40);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(pillX, pillY, tw, 40);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#1a1a1a';
        ctx.strokeRect(pillX, pillY, tw, 40);
        ctx.fillStyle = '#1a1a1a';
        ctx.fillText(tag, pillX + 14, pillY + 26);
        pillX += tw + 14;
      });

      ctx.lineWidth = 14;
      ctx.strokeStyle = '#1a1a1a';
      ctx.strokeRect(7, 7, 626, 406);

      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const carouselGroup = new THREE.Group();
    scene.add(carouselGroup);

    const cardGroups = [];
    const cardFrontMeshes = [];
    const radiusX = 3.35;
    const radiusZ = 2.45;
    const cardGeo = new THREE.BoxGeometry(3.25, 2.14, 0.14);

    PROJECTS_DATA.forEach((proj, i) => {
      const group = new THREE.Group();
      const frontTex = createCardTexture(proj, i);
      const sideMat = new THREE.MeshBasicMaterial({ color: NEOBRUTAL_PALETTE.black });
      const frontMat = new THREE.MeshBasicMaterial({ map: frontTex });
      const cardMesh = new THREE.Mesh(cardGeo, [
        sideMat, sideMat, sideMat, sideMat, frontMat, sideMat
      ]);
      group.add(cardMesh);

      const shadowMesh = new THREE.Mesh(
        cardGeo,
        new THREE.MeshBasicMaterial({ color: NEOBRUTAL_PALETTE.black })
      );
      shadowMesh.position.set(0.14, -0.14, -0.12);
      group.add(shadowMesh);

      cardMesh.userData = { index: i, parentGroup: group, project: proj };
      group.userData = { index: i, project: proj };

      carouselGroup.add(group);
      cardGroups.push(group);
      cardFrontMeshes.push(cardMesh);
    });

    let targetAngle = 0;
    let currentAngle = 0;
    let isDragging = false;
    let startX = 0;
    let activeIndex = 0;
    const stepAngle = (Math.PI * 2) / PROJECTS_DATA.length;

    const updateHUD = (idx) => {
      const p = PROJECTS_DATA[idx];
      if (activeTitleEl) activeTitleEl.textContent = `${p.emoji} ${p.title} — ${p.badge}`;
      if (activeLinkEl) activeLinkEl.setAttribute('href', p.url);
    };
    updateHUD(0);

    const snapToNearest = () => {
      const snappedIdx = Math.round(-targetAngle / stepAngle);
      targetAngle = -snappedIdx * stepAngle;
      activeIndex = ((snappedIdx % PROJECTS_DATA.length) + PROJECTS_DATA.length) % PROJECTS_DATA.length;
      updateHUD(activeIndex);
    };

    stage.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, a')) return;
      isDragging = true;
      startX = e.clientX;
      stage.classList.add('is-dragging');
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      startX = e.clientX;
      targetAngle += dx * 0.0065;
    }, { passive: true });

    window.addEventListener('pointerup', () => {
      if (!isDragging) return;
      isDragging = false;
      stage.classList.remove('is-dragging');
      snapToNearest();
    });

    stage.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        targetAngle -= e.deltaX * 0.003;
        snapToNearest();
      }
    }, { passive: false });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        targetAngle += stepAngle;
        snapToNearest();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        targetAngle -= stepAngle;
        snapToNearest();
      });
    }

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(999, 999);
    let hoveredCardGroup = null;

    stage.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(cardFrontMeshes, false);
      hoveredCardGroup = hits.length > 0 ? hits[0].object.userData.parentGroup : null;
    }, { passive: true });

    stage.addEventListener('click', (e) => {
      if (e.target.closest('button, a')) return;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(cardFrontMeshes, false);
      if (hits.length > 0) {
        const clickedIdx = hits[0].object.userData.index;
        const desiredAngle = -clickedIdx * stepAngle;
        const diff = Math.atan2(Math.sin(desiredAngle - currentAngle), Math.cos(desiredAngle - currentAngle));
        targetAngle = currentAngle + diff;
        activeIndex = clickedIdx;
        updateHUD(activeIndex);
      }
    });

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(stage);

    window.addEventListener('resize', () => {
      width = stage.clientWidth || 1000;
      height = stage.clientHeight || 410;
      camera.aspect = width / height;
      camera.position.z = getDynamicCamZ();
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isVisible) return;
      const t = clock.getElapsedTime();

      currentAngle += (targetAngle - currentAngle) * 0.085;

      cardGroups.forEach((group, i) => {
        const theta = currentAngle + i * stepAngle;
        const x = Math.sin(theta) * radiusX;
        const z = Math.cos(theta) * radiusZ;
        const depthNorm = (z + radiusZ) / (radiusZ * 2);
        const isFront = depthNorm > 0.85;
        const isHovered = hoveredCardGroup === group;

        const targetY = (isFront ? 0.28 : -0.15) + (isHovered ? 0.18 : 0) + Math.sin(t * 2 + i) * 0.05;
        group.position.x = x;
        group.position.z = z;
        group.position.y += (targetY - group.position.y) * 0.12;

        const targetScale = 0.72 + depthNorm * 0.36 + (isHovered ? 0.06 : 0);
        group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);

        const targetRotY = -Math.sin(theta) * 0.38 + (isHovered ? pointer.x * 0.18 : 0);
        const targetRotX = isHovered ? pointer.y * 0.14 : 0;
        group.rotation.y += (targetRotY - group.rotation.y) * 0.12;
        group.rotation.x += (targetRotX - group.rotation.x) * 0.12;
      });

      renderer.render(scene, camera);
    };
    animate();
  }

  /* ============================================================
     MODUL 3 — KONSEP 4: Interactive 3D Tech Constellation Sphere
     ============================================================ */
  function initTechSphere3D() {
    const stage = document.getElementById('techSphereStage');
    const canvas = document.getElementById('techSphereCanvas');
    const detailBadge = document.getElementById('techNodeBadge');
    const detailTitle = document.getElementById('techNodeTitle');
    const detailDesc = document.getElementById('techNodeDesc');

    if (!stage || !canvas || typeof THREE === 'undefined') return;

    const isMobile = () => window.innerWidth < 768;

    const TECH_NODES = [
      {
        name: 'Next.js 14',
        category: 'FRONTEND & SSR CORE',
        color: '#ffe156',
        hex: NEOBRUTAL_PALETTE.yellow,
        desc: 'Framework utama Vanz Studio untuk aplikasi fullstack berkecepatan tinggi, App Router, dan Server Actions.',
        pos: [2.3, 0.9, 0.8]
      },
      {
        name: 'TypeScript',
        category: 'TYPE-SAFE ARCHITECTURE',
        color: '#a8d8ff',
        hex: NEOBRUTAL_PALETTE.blue,
        desc: 'Menjamin reliabilitas kode skala enterprise, validasi skema API ketat, dan bebas bug runtime.',
        pos: [-2.2, 1.1, 0.9]
      },
      {
        name: 'Python',
        category: 'DATA & AI AUTOMATION',
        color: '#b8f0c8',
        hex: NEOBRUTAL_PALETTE.green,
        desc: 'Digunakan untuk pemrosesan data analitik, otomasi backend, machine learning, dan skrip integrasi.',
        pos: [-2.4, -1.0, -0.7]
      },
      {
        name: 'Supabase',
        category: 'POSTGRESQL & REALTIME',
        color: '#b8f0c8',
        hex: NEOBRUTAL_PALETTE.green,
        desc: 'Basis data relasional PostgreSQL dengan Row-Level Security dan sinkronisasi webhook keuangan real-time.',
        pos: [2.2, -1.1, -0.8]
      },
      {
        name: 'Firebase',
        category: 'CLOUD & AUTH ENGINE',
        color: '#ffe156',
        hex: NEOBRUTAL_PALETTE.yellow,
        desc: 'Mesin sinkronisasi timer ujian CBT Solo Technopark & autentikasi ribuan peserta secara simultan.',
        pos: [0.1, 2.35, -1.1]
      },
      {
        name: 'Gemini AI',
        category: 'GENERATIVE AI SDK',
        color: '#ffb8d4',
        hex: NEOBRUTAL_PALETTE.pink,
        desc: 'Otomasi cerdas untuk auto-parse dokumen bank soal ujian CBT dan asisten analitik pintar.',
        pos: [-0.1, -2.3, 1.2]
      }
    ];

    const toonGrad = createSharedToonGradient();
    const makeToonMat = (hex) => new THREE.MeshToonMaterial({ color: hex, gradientMap: toonGrad });

    const scene = new THREE.Scene();
    let width = stage.clientWidth || 620;
    let height = stage.clientHeight || 390;

    const getDynamicCamZ = () => {
      if (window.innerWidth < 480) return 12.0;
      if (window.innerWidth < 768) return 10.5;
      if (window.innerWidth < 1024) return 9.0;
      return 7.8;
    };

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, getDynamicCamZ());

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile() });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(5, 8, 7);
    scene.add(dirLight);

    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // 1. Inti Bola 3D Geometris (Core Icosahedron + Dual Orbital Gyro Rings)
    const coreGeo = new THREE.IcosahedronGeometry(0.95, 1);
    const coreMesh = new THREE.Mesh(coreGeo, makeToonMat(NEOBRUTAL_PALETTE.yellow));
    addBrutalistOutline(coreMesh, coreGeo, 1.07, true);
    constellationGroup.add(coreMesh);

    // Cincin Orbital Gyro 1 (Black Outline Ring)
    const ringGeo1 = new THREE.TorusGeometry(1.42, 0.05, 12, 48);
    const ringMesh1 = new THREE.Mesh(
      ringGeo1,
      new THREE.MeshBasicMaterial({ color: NEOBRUTAL_PALETTE.black })
    );
    ringMesh1.rotation.x = Math.PI / 2.6;
    constellationGroup.add(ringMesh1);

    // Cincin Orbital Gyro 2 (Pink Neobrutalist Accent Ring)
    const ringGeo2 = new THREE.TorusGeometry(1.65, 0.045, 12, 48);
    const ringMesh2 = new THREE.Mesh(
      ringGeo2,
      new THREE.MeshBasicMaterial({ color: NEOBRUTAL_PALETTE.pink })
    );
    ringMesh2.rotation.y = Math.PI / 3;
    constellationGroup.add(ringMesh2);

    const createLabelSprite = (text, bgHexStr) => {
      const c = document.createElement('canvas');
      c.width = 280;
      c.height = 84;
      const ctx = c.getContext('2d');

      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(10, 12, 260, 60);

      ctx.fillStyle = bgHexStr;
      ctx.fillRect(4, 6, 260, 60);

      ctx.lineWidth = 6;
      ctx.strokeStyle = '#1a1a1a';
      ctx.strokeRect(4, 6, 260, 60);

      ctx.fillStyle = '#1a1a1a';
      ctx.font = 'bold 26px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(text, 134, 45);

      const tex = new THREE.CanvasTexture(c);
      const mat = new THREE.SpriteMaterial({ map: tex, depthTest: false });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(1.55, 0.46, 1);
      sprite.position.set(0, 0.68, 0);
      return sprite;
    };

    // 2. Satelit Node Tech Stack + Garis Laser Hitam Dinamis
    const satelliteGroups = [];
    const satelliteMeshes = [];
    const laserLines = [];
    const dataPulses = [];
    const nodeGeometries = [
      new THREE.OctahedronGeometry(0.42, 0),
      new THREE.BoxGeometry(0.56, 0.56, 0.56),
      new THREE.IcosahedronGeometry(0.42, 0)
    ];

    TECH_NODES.forEach((tech, idx) => {
      const satGroup = new THREE.Group();
      satGroup.position.set(...tech.pos);

      const geo = nodeGeometries[idx % nodeGeometries.length];
      const satMesh = new THREE.Mesh(geo, makeToonMat(tech.hex));
      addBrutalistOutline(satMesh, geo, 1.11, true);
      satGroup.add(satMesh);

      const labelSprite = createLabelSprite(tech.name, tech.color);
      satGroup.add(labelSprite);

      satMesh.userData = { parentGroup: satGroup, tech };
      satGroup.userData = {
        tech,
        basePos: new THREE.Vector3(...tech.pos),
        springDisp: 0,
        springVel: 0,
        hoverScale: 1.0
      };

      constellationGroup.add(satGroup);
      satelliteGroups.push(satGroup);
      satelliteMeshes.push(satMesh);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(...tech.pos)
      ]);
      const lineMat = new THREE.LineBasicMaterial({ color: NEOBRUTAL_PALETTE.black, linewidth: 2 });
      const laserLine = new THREE.Line(lineGeo, lineMat);
      constellationGroup.add(laserLine);
      laserLines.push({ lineGeo, satGroup });

      const pulseGeo = new THREE.SphereGeometry(0.08, 10, 10);
      const pulseMesh = new THREE.Mesh(
        pulseGeo,
        new THREE.MeshBasicMaterial({ color: NEOBRUTAL_PALETTE.black })
      );
      constellationGroup.add(pulseMesh);
      dataPulses.push({ mesh: pulseMesh, satGroup, offset: idx * 0.17 });
    });

    const webPoints = [];
    for (let i = 0; i < TECH_NODES.length; i++) {
      const next = (i + 1) % TECH_NODES.length;
      webPoints.push(new THREE.Vector3(...TECH_NODES[i].pos));
      webPoints.push(new THREE.Vector3(...TECH_NODES[next].pos));
    }
    const webGeo = new THREE.BufferGeometry().setFromPoints(webPoints);
    const webLines = new THREE.LineSegments(
      webGeo,
      new THREE.LineBasicMaterial({ color: NEOBRUTAL_PALETTE.black, transparent: true, opacity: 0.35 })
    );
    constellationGroup.add(webLines);

    // 3. Drag Rotasi & Hover Bounce Node
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velRotX = 0.002;
    let velRotY = 0.006;

    stage.addEventListener('pointerdown', (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      stage.classList.add('is-dragging');
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      velRotY = dx * 0.006;
      velRotX = dy * 0.006;
      constellationGroup.rotation.y += velRotY;
      constellationGroup.rotation.x += velRotX;
    }, { passive: true });

    window.addEventListener('pointerup', () => {
      isDragging = false;
      stage.classList.remove('is-dragging');
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(999, 999);
    let activeSatGroup = null;

    const highlightTechDetail = (tech) => {
      if (detailBadge) {
        detailBadge.textContent = tech.category;
        detailBadge.style.background = tech.color;
      }
      if (detailTitle) detailTitle.textContent = tech.name;
      if (detailDesc) detailDesc.textContent = tech.desc;

      document.querySelectorAll('#skills .pill').forEach(pill => {
        const match = pill.textContent.toLowerCase().includes(tech.name.split(' ')[0].toLowerCase());
        pill.classList.toggle('pill--highlighted', match);
      });
    };

    stage.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(satelliteMeshes, false);

      if (hits.length > 0) {
        const hitGroup = hits[0].object.userData.parentGroup;
        if (activeSatGroup !== hitGroup) {
          if (activeSatGroup) activeSatGroup.userData.hoverScale = 1.0;
          activeSatGroup = hitGroup;
          activeSatGroup.userData.hoverScale = 1.28;
          activeSatGroup.userData.springVel = 0.45;
          highlightTechDetail(activeSatGroup.userData.tech);
        }
      } else if (activeSatGroup) {
        activeSatGroup.userData.hoverScale = 1.0;
        activeSatGroup = null;
      }
    }, { passive: true });

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(stage);

    window.addEventListener('resize', () => {
      width = stage.clientWidth || 620;
      height = stage.clientHeight || 390;
      camera.aspect = width / height;
      camera.position.z = getDynamicCamZ();
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isVisible) return;
      const t = clock.getElapsedTime();

      if (!isDragging) {
        velRotY += (0.0045 - velRotY) * 0.05;
        velRotX += (0.0012 - velRotX) * 0.05;
        constellationGroup.rotation.y += velRotY;
        constellationGroup.rotation.x += velRotX;
      }

      coreMesh.rotation.y = -t * 0.6;
      ringMesh1.rotation.z = t * 0.5;
      ringMesh2.rotation.x = -t * 0.4;

      satelliteGroups.forEach((satGroup, idx) => {
        const ud = satGroup.userData;
        satGroup.children[0].rotation.x += 0.015;
        satGroup.children[0].rotation.y += 0.02;
        satGroup.position.y = ud.basePos.y + Math.sin(t * 2.2 + idx) * 0.12;

        const force = -0.25 * ud.springDisp;
        ud.springVel = (ud.springVel + force) * 0.78;
        ud.springDisp += ud.springVel;

        const s = ud.hoverScale * (1 + ud.springDisp * 0.6);
        satGroup.scale.setScalar(s);
      });

      laserLines.forEach(({ lineGeo, satGroup }) => {
        const posAttr = lineGeo.attributes.position;
        posAttr.setXYZ(1, satGroup.position.x, satGroup.position.y, satGroup.position.z);
        posAttr.needsUpdate = true;
      });

      dataPulses.forEach(({ mesh, satGroup, offset }) => {
        const progress = (t * 0.55 + offset) % 1;
        mesh.position.copy(satGroup.position).multiplyScalar(progress);
      });

      renderer.render(scene, camera);
    };
    animate();
  }

  // Jalankan semua modul 3D Neobrutalist
  initNeobrutalistHero3D();
  initRetroStation3D();
  initProjectCarousel3D();
  initTechSphere3D();

});
