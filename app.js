const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toLocaleString('fa-IR');
}

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('open');
    });
  });
}

const sections = document.querySelectorAll('[data-section]');
const navLinks = document.querySelectorAll('[data-nav]');

if ('IntersectionObserver' in window && sections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => observer.observe(section));
}

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    projectCards.forEach((card) => {
      const categories = card.dataset.category || '';
      const visible = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-hidden', !visible);
    });
  });
});

const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

const terminalCommands = {
  help: [
    { text: 'دستورهای موجود: about, skills, projects, focus, clear', className: 'warn' }
  ],
  about: [
    { text: 'مهدی علی‌اکبری — مهندس برق', className: 'command' },
    { text: 'تمرکز: FPGA، سیستم‌های نهفته، DSP، سامانه‌های الهام‌گرفته از فضا' }
  ],
  skills: [
    { text: 'FPGA / Verilog — Embedded C / C++ — Python / DSP', className: 'success' },
    { text: 'ابزارها: Altium, LTspice, MATLAB, Qt, Git' }
  ],
  projects: [
    { text: '[DONE] BLDC Controller', className: 'success' },
    { text: '[WIP] RF Spectrum Analyzer', className: 'warn' },
    { text: '[DONE] Satellite Telemetry' }
  ],
  focus: [
    { text: 'ترجیح می‌دهم حتی پیچیده‌ترین ایده‌ها در نهایت به یک سیستم واقعی ختم شوند.', className: 'command' }
  ]
};

function appendTerminalLine(text, className = '') {
  if (!terminalOutput) return;
  const line = document.createElement('p');
  if (className) line.classList.add(className);
  line.textContent = text;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

if (terminalInput) {
  terminalInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;

    const value = terminalInput.value.trim().toLowerCase();
    if (!value) return;

    appendTerminalLine(`> ${value}`, 'command');
    terminalInput.value = '';

    if (value === 'clear') {
      terminalOutput.innerHTML = '<p>خروجی پاک شد. دوباره بنویس: <code>help</code></p>';
      return;
    }

    const response = terminalCommands[value];
    if (!response) {
      appendTerminalLine(`command not found: ${value}`);
      appendTerminalLine('برای لیست دستورها بنویس: help', 'warn');
      return;
    }

    response.forEach((item) => appendTerminalLine(item.text, item.className));
  });
}

const secretTrigger = document.getElementById('secret-trigger');
const secretShell = document.getElementById('secret-shell');
const closeSecretShell = document.getElementById('close-secret-shell');

function setSecretShellState(open) {
  if (!secretTrigger || !secretShell) return;
  secretTrigger.setAttribute('aria-expanded', String(open));
  secretShell.hidden = !open;
  if (open) {
    secretShell.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

if (secretTrigger && secretShell) {
  secretTrigger.addEventListener('click', () => {
    const isOpen = secretTrigger.getAttribute('aria-expanded') === 'true';
    setSecretShellState(!isOpen);
  });
}

if (closeSecretShell) {
  closeSecretShell.addEventListener('click', () => setSecretShellState(false));
}
