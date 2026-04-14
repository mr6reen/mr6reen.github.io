/**
 * Bottom navigation component.
 * Injects a fixed bottom nav into [data-js="bottom-nav"].
 * Highlights the active tab based on current page filename.
 */
(function () {
  const el = document.querySelector('[data-js="bottom-nav"]');
  if (!el) return;

  const page = location.pathname.split('/').pop() || 'index.html';
  const active = (p) => page === p ? 'text-orange' : 'text-[#8C8C85]';

  el.innerHTML = `
    <nav class="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-[#EEEEED]"
         style="z-index:20; padding-bottom: env(safe-area-inset-bottom, 16px)">
      <div class="flex">

        <button onclick="window.location.href='index.html'"
          class="flex-1 flex flex-col items-center gap-1 pt-3 pb-2 transition-colors ${active('index.html')}">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          <span class="text-[10px] font-medium">Главная</span>
        </button>

        <button onclick="window.location.href='presets.html'"
          class="flex-1 flex flex-col items-center gap-1 pt-3 pb-2 transition-colors ${active('presets.html')}">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="9" y1="13" x2="15" y2="13"/>
            <line x1="9" y1="17" x2="12" y2="17"/>
          </svg>
          <span class="text-[10px] font-medium">Пресеты</span>
        </button>

        <button onclick="window.location.href='history.html'"
          class="flex-1 flex flex-col items-center gap-1 pt-3 pb-2 transition-colors ${active('history.html')}">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span class="text-[10px] font-medium">История</span>
        </button>

      </div>
    </nav>`;
})();
