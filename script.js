// Tabs
function switchTab(evt, tabName) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  
  evt.currentTarget.classList.add('active');
  document.getElementById(`tab-${tabName}`).classList.add('active');
}

// Dark Mode Toggle
const toggle = document.getElementById('dm');
if (toggle) {
  // Check for saved preference
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    toggle.checked = true;
    document.body.classList.add('dark');
  }
  
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark', toggle.checked);
    localStorage.setItem('darkMode', toggle.checked);
  });
}

// Post Creation
const mainPostBtn = document.getElementById('mainPostBtn');
const composePostBtn = document.getElementById('composePostBtn');
const composeInput = document.getElementById('composeInput');

function createPost() {
  const text = composeInput ? composeInput.value.trim() : '';
  
  if (!text) {
    showNotification('Please write something first!');
    if (composeInput) composeInput.focus();
    return;
  }
  
  // Create new post HTML
  const newPost = document.createElement('article');
  newPost.className = 'post';
  newPost.style.animation = 'fadeIn 0.3s ease';
  newPost.innerHTML = `
    <div class="avatar moila">M</div>
    <div class="post-content">
      <div class="post-header">
        <span class="post-author">Moila Matlhodi</span>
        <span class="post-handle">@matlhodi_moila</span>
        <span class="post-dot">·</span>
        <span class="post-time">Just now</span>
        <span class="post-more">···</span>
      </div>
      <p class="post-text">${escapeHtml(text)}</p>
      <div class="post-actions">
        <span class="action reply" onclick="handleReply(this)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/></svg>
          <span class="count">0</span>
        </span>
        <span class="action repost" onclick="handleRepost(this)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/></svg>
          <span class="count">0</span>
        </span>
        <span class="action like" onclick="handleLike(this)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 5.99 8.526 5.54 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/></svg>
          <span class="count">0</span>
        </span>
        <span class="action views">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/></svg>
          <span>1</span>
        </span>
        <span class="action share" onclick="handleShare(this)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.12 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/></svg>
        </span>
      </div>
    </div>
  `;
  
  // Insert after compose box
  const compose = document.querySelector('.compose');
  if (compose && compose.nextSibling) {
    compose.parentNode.insertBefore(newPost, compose.nextSibling);
  }
  
  // Clear input
  if (composeInput) composeInput.value = '';
  
  showNotification('Post created successfully!');
}

if (mainPostBtn) {
  mainPostBtn.addEventListener('click', () => {
    if (composeInput) composeInput.focus();
  });
}

if (composePostBtn) {
  composePostBtn.addEventListener('click', createPost);
}

// Enable/disable post button based on input
if (composeInput && composePostBtn) {
  composeInput.addEventListener('input', () => {
    composePostBtn.disabled = composeInput.value.trim() === '';
  });
  composePostBtn.disabled = true;
}

// Post Interactions
function handleLike(element) {
  element.classList.toggle('liked');
  const countSpan = element.querySelector('.count');
  if (countSpan) {
    let count = parseCount(countSpan.textContent);
    if (element.classList.contains('liked')) {
      count++;
      showNotification('Liked!');
    } else {
      count--;
    }
    countSpan.textContent = formatCount(count);
  }
}

function handleRepost(element) {
  element.classList.toggle('reposted');
  const countSpan = element.querySelector('.count');
  if (countSpan) {
    let count = parseCount(countSpan.textContent);
    if (element.classList.contains('reposted')) {
      count++;
      showNotification('Reposted!');
    } else {
      count--;
    }
    countSpan.textContent = formatCount(count);
  }
}

function handleReply(element) {
  const countSpan = element.querySelector('.count');
  if (countSpan) {
    let count = parseCount(countSpan.textContent);
    count++;
    countSpan.textContent = formatCount(count);
    showNotification('Reply added!');
  }
}

function handleShare(element) {
  showNotification('Shared to clipboard!');
}

// Helper Functions
function parseCount(text) {
  if (!text) return 0;
  text = text.toString();
  if (text.includes('K')) return parseFloat(text) * 1000;
  if (text.includes('M')) return parseFloat(text) * 1000000;
  return parseInt(text) || 0;
}

function formatCount(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showNotification(message) {
  // Remove existing toast
  const existing = document.querySelector('.notification-toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'notification-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Remove after delay
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

console.log('Twitter clone loaded successfully!');