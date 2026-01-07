(function() {
  'use strict';
  
  // Get the script tag that loaded this file
  const script = document.currentScript || document.querySelector('script[src*="widget.js"]');
  if (!script) return;
  
  // Parse query parameters from script src
  const scriptSrc = script.getAttribute('src') || '';
  const urlParams = new URLSearchParams(scriptSrc.split('?')[1] || '');
  
  // Get projectId from query param (pid) or data attribute
  const projectId = urlParams.get('pid') || script.getAttribute('data-project-id') || '';
  if (!projectId) {
    console.error('Feedkit: projectId is required. Add ?pid=YOUR_PROJECT_ID to the script src or data-project-id attribute.');
    return;
  }
  
  // Get position from query param, data attribute, or default
  const position = urlParams.get('pos') || script.getAttribute('data-position') || 'bottom-right';
  const validPositions = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];
  const finalPosition = validPositions.includes(position) ? position : 'bottom-right';
  
  // Get base URL - try to detect from script src, or use current origin
  let baseUrl = '';
  try {
    const scriptUrl = new URL(scriptSrc, window.location.href);
    baseUrl = scriptUrl.origin;
  } catch (e) {
    baseUrl = window.location.origin;
  }
  
  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.src = `${baseUrl}/widget?projectId=${projectId}&pos=${finalPosition}`;
  iframe.style.border = '0';
  iframe.style.width = '400px';
  iframe.style.height = '520px';
  iframe.setAttribute('allow', 'clipboard-read; clipboard-write');
  iframe.setAttribute('title', 'Feedback Widget');
  iframe.setAttribute('id', 'feedkit-widget-iframe');
  
  // Set positioning styles
  iframe.style.position = 'fixed';
  iframe.style.zIndex = '9999';
  
  if (finalPosition.includes('bottom')) {
    iframe.style.bottom = '20px';
  } else {
    iframe.style.top = '20px';
  }
  
  if (finalPosition.includes('right')) {
    iframe.style.right = '20px';
  } else {
    iframe.style.left = '20px';
  }
  
  // Inject iframe into body
  if (document.body) {
    document.body.appendChild(iframe);
  } else {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
      document.body.appendChild(iframe);
    });
  }
  
  // Expose widget API for programmatic control
  window.Feedkit = window.Feedkit || {};
  window.Feedkit.widget = {
    show: function() {
      iframe.style.display = 'block';
    },
    hide: function() {
      iframe.style.display = 'none';
    },
    toggle: function() {
      iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
    },
    remove: function() {
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    }
  };
})();
