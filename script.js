/* ============================================
   Ivan Nandira — Portfolio Scripts
   Neobrutalism Edition
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
     ============================================================ */

  /* 1. Magnetic Buttons */
  const magneticEls = document.querySelectorAll('.btn, .nav-logo, .nav-link--cta, .t-chip');
  magneticEls.forEach(el => {
    el.classList.add('magnetic-btn');

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Soft magnetic pull
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

    // Inject Glare overlay if not present
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

      // Calculate subtle rotation angles
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

    // Auto-create cursor elements if not present in the HTML (works across all pages)
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

    // Smooth lerp loop for the outer ring
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
        // Pause at full word
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

});
