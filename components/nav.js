// components/nav.js
class NavigationManager {
  static async init() {
    try {
      await this.loadNav();
      // Wait a tiny bit for DOM to update
      setTimeout(() => {
        this.initMobileMenu();
        this.setActiveState();
      }, 50);
    } catch (error) {
      console.error('Navigation failed to load:', error);
    }
  }

  static async loadNav() {
    // Use relative path, not absolute
    const response = await fetch('./components/nav.html');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    
    // Insert at the very beginning of body
    document.body.insertAdjacentHTML('afterbegin', html);
    
    // Log success for debugging
    console.log('✅ Navigation loaded successfully');
  }

  static initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOpen = document.getElementById('menuOpen');
    const menuClose = document.getElementById('menuClose');
    
    if (!menuBtn || !mobileMenu) {
      console.warn('Mobile menu elements not found');
      return;
    }

    menuBtn.addEventListener('click', () => {
      const isOpening = !mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      
      if (menuOpen && menuClose) {
        menuOpen.classList.toggle('hidden', isOpening);
        menuClose.classList.toggle('hidden', !isOpening);
      }
    });
  }

  static setActiveState() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageMap = {
      'index.html': 'index',
      'About.html': 'about',
      'Events.html': 'events',
      'Library.html': 'library'
    };
    const currentPageId = pageMap[currentPage];

    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.dataset.page === currentPageId) {
        link.classList.add('text-brand');
        link.classList.remove('text-gray-300');
      }
    });
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => NavigationManager.init());
} else {
  // DOM already loaded
  NavigationManager.init();
}
