/**
 * NAVYA PATHAK PORTFOLIO — INTERACTIVE CONTROLLER
 * Handles Typewriter, Theme Toggling, Case Study Modal,
 * Interactive Sandbox, Scroll Reveals & Toast Notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC COPYRIGHT YEAR
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. THEME TOGGLING (DARK / LIGHT)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  const savedTheme = localStorage.getItem('navya_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('navya_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    } else {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    }
  }

  // 3. TYPEWRITER EFFECT IN HERO
  const roles = [
    'UI/UX Designer',
    'Product Thinker',
    'Front-End Developer'
  ];
  const roleEl = document.getElementById('roleTypewriter');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRole() {
    if (!roleEl) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      roleEl.textContent = currentRole.substring(0, charIndex);
      typingSpeed = 50;
    } else {
      charIndex++;
      roleEl.textContent = currentRole.substring(0, charIndex);
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before starting new word
    }

    setTimeout(typeRole, typingSpeed);
  }
  typeRole();

  // 4. MOBILE DRAWER NAVIGATION
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // 5. RESUMEIQ CASE STUDY MODAL
  const csModal = document.getElementById('caseStudyModal');
  const closeCsBtn = document.getElementById('closeCaseStudyBtn');
  const modalCloseActionBtn = document.getElementById('modalCloseActionBtn');
  const csTriggers = document.querySelectorAll('.open-cs-modal-trigger');

  function openCaseStudy() {
    if (!csModal) return;
    csModal.classList.add('open');
    csModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Update hash cleanly without jump
    history.pushState(null, '', '#case-study-resumeiq');
  }

  function closeCaseStudy() {
    if (!csModal) return;
    csModal.classList.remove('open');
    csModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (window.location.hash === '#case-study-resumeiq') {
      history.pushState(null, '', window.location.pathname);
    }
  }

  csTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCaseStudy();
    });
  });

  if (closeCsBtn) closeCsBtn.addEventListener('click', closeCaseStudy);
  if (modalCloseActionBtn) modalCloseActionBtn.addEventListener('click', closeCaseStudy);

  // Close modal when clicking outside dialog
  if (csModal) {
    csModal.addEventListener('click', (e) => {
      if (e.target === csModal) {
        closeCaseStudy();
      }
    });
  }

  // Check URL hash on load
  if (window.location.hash === '#case-study-resumeiq') {
    openCaseStudy();
  }

  // Keyboard accessibility (ESC closes modal or drawer)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (csModal && csModal.classList.contains('open')) {
        closeCaseStudy();
      }
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    }
  });

  // 6. INTERACTIVE SANDBOX IN CASE STUDY
  const sandboxTabBtns = document.querySelectorAll('.sandbox-tab-btn');
  const sandboxTabContents = document.querySelectorAll('.sandbox-tab-content');

  sandboxTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      
      sandboxTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      sandboxTabContents.forEach(content => {
        if (content.id === targetId) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      });
    });
  });

  // Skill Resolve interactive points calculation
  let baseScore = 88;
  const scoreEl = document.getElementById('interactiveMatchScore');
  const skillBtns = document.querySelectorAll('.skill-resolve-btn');

  skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const added = btn.getAttribute('data-added') === 'true';
      const points = parseInt(btn.getAttribute('data-points') || '4', 10);

      if (!added) {
        baseScore = Math.min(100, baseScore + points);
        btn.setAttribute('data-added', 'true');
        btn.style.background = 'rgba(16,185,129,0.3)';
        btn.style.color = '#FFFFFF';
        btn.textContent = '✓ Resolved (+ Added to Score)';
        showToast(`Resolved! Score increased to ${baseScore}%`);
      } else {
        baseScore = Math.max(88, baseScore - points);
        btn.setAttribute('data-added', 'false');
        btn.style.background = '';
        btn.style.color = '';
        btn.textContent = `+ Re-add (+${points} pts)`;
      }

      if (scoreEl) {
        scoreEl.textContent = `${baseScore}%`;
      }
    });
  });

  // 7. COPY EMAIL TO CLIPBOARD WITH TOAST
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');
  const emailAddress = 'navya.pathak.23cse@bmu.edu.in';
  let toastTimeout;

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailAddress).then(() => {
        showToast('Email copied to clipboard: ' + emailAddress);
      }).catch(() => {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = emailAddress;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Email copied to clipboard!');
      });
    });
  }

  function showToast(message) {
    if (!toastNotice) return;
    if (toastMessage) toastMessage.textContent = message;
    toastNotice.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  // 8. SCROLL REVEAL OBSERVER (PROGRESSIVE ENHANCEMENT)
  document.documentElement.classList.add('js-ready');
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px 50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // Viewport fallback check
  function checkRevealFallbacks() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight + 120) {
        el.classList.add('visible');
      }
    });
  }
  checkRevealFallbacks();
  window.addEventListener('scroll', checkRevealFallbacks, { passive: true });

  // 9. ACTIVE NAV LINK SPY
  const sections = document.querySelectorAll('section[id], main[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
});
