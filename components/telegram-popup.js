// components/footer.js
class TelegramManager {
  static async init() {
    try {
      await this.loadTelegram();
      console.log('✅ Footer loaded successfully');
    } catch (error) {
      console.error('❌ Footer failed to load:', error);
      this.createFallbackTelegram(); // Optional fallback
    }
  }

  static async loadTelegram() {
    const response = await fetch('./components/telegram-popup.html');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    
    // Insert at the end of body, before any scripts
    document.body.insertAdjacentHTML('beforeend', html);
  }

  // Optional: Create a simple fallback if footer fails to load
  static createFallbackTelegram() {
    const fallback = `
      <footer class="bg-black pt-8 pb-4 border-t border-white/5">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <p class="text-gray-600 text-sm">Join Our Telegram</p>
        </div>
      </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', fallback);
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => TelegramManager.init());
} else {
  TelegramManager.init();
}
