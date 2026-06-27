// ═══════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════

let MENU = [];
let CATEGORIES = ['All'];

const DEFAULT_MENU = [
  { id:1, name:'Cappuccino', desc:'Double shot with velvety foam', price:180, emoji:'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=400&q=80', cat:'Coffee', veg:true },
  { id:2, name:'Cold Brew', desc:'18-hour steeped, served over ice', price:220, emoji:'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80', cat:'Coffee', veg:true },
  { id:3, name:'Flat White', desc:'Silky micro-foam, strong espresso', price:200, emoji:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80', cat:'Coffee', veg:true },
  { id:4, name:'Matcha Latte', desc:'Japanese grade, oat milk', price:250, emoji:'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80', cat:'Coffee', veg:true },
  { id:5, name:'Mango Shake', desc:'Fresh mango, ice cream blend', price:190, emoji:'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&w=400&q=80', cat:'Drinks', veg:true },
  { id:6, name:'Oreo Frappe', desc:'Cookies & cream blended', price:230, emoji:'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80', cat:'Drinks', veg:true },
  { id:7, name:'Lemon Iced Tea', desc:'Freshly brewed, honey lemon', price:150, emoji:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80', cat:'Drinks', veg:true },
  { id:8, name:'Watermelon Juice', desc:'Fresh pressed, no sugar', price:160, emoji:'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=400&q=80', cat:'Drinks', veg:true },
  { id:9, name:'Avocado Toast', desc:'Multigrain bread, cherry tomatoes', price:280, emoji:'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=400&q=80', cat:'Food', veg:true },
  { id:10, name:'Chicken Sandwich', desc:'Grilled chicken, chipotle mayo', price:320, emoji:'https://images.unsplash.com/photo-1567206563066-0f65d8db0cf0?auto=format&fit=crop&w=400&q=80', cat:'Food', veg:false },
  { id:11, name:'Veg Croissant', desc:'Butter croissant, pesto & mozzarella', price:260, emoji:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80', cat:'Food', veg:true },
  { id:12, name:'Eggs Benedict', desc:'Poached eggs, hollandaise', price:340, emoji:'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=400&q=80', cat:'Food', veg:true },
  { id:13, name:'Truffle Pasta', desc:'Fettuccine, cream, black truffle', price:380, emoji:'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400&q=80', cat:'Mains', veg:true },
  { id:14, name:'Butter Chicken', desc:'Slow-cooked, with naan', price:360, emoji:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=80', cat:'Mains', veg:false },
  { id:15, name:'Paneer Tikka', desc:'Tandoor-grilled, mint chutney', price:310, emoji:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80', cat:'Mains', veg:true },
  { id:16, name:'Cheesecake', desc:'New York style, berry compote', price:210, emoji:'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&w=400&q=80', cat:'Desserts', veg:true },
  { id:17, name:'Brownie Sundae', desc:'Warm brownie, vanilla ice cream', price:240, emoji:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80', cat:'Desserts', veg:true },
  { id:18, name:'Tiramisu', desc:'Espresso-soaked, mascarpone', price:260, emoji:'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80', cat:'Desserts', veg:true }
];

function getItemMedia(val, sizeClass = 'menu-card-img') {
  if (val && (val.startsWith('http://') || val.startsWith('https://'))) {
    return `<div class="${sizeClass}" style="overflow:hidden; padding:0; display:inline-block; vertical-align:middle;"><img src="${val}" class="item-media-img" alt="item" style="width:100%; height:100%; object-fit:cover; display:block;"></div>`;
  }
  return `<div class="${sizeClass}" style="display:inline-flex; align-items:center; justify-content:center; vertical-align:middle;">${val || '🍽️'}</div>`;
}

function getItemEmojiFallback(val) {
  if (val && (val.startsWith('http://') || val.startsWith('https://'))) {
    return '🍽️';
  }
  return val || '🍽️';
}

function updateCategories() {
  CATEGORIES = ['All', ...new Set(MENU.map(i => i.cat))];
}

function saveMenuToStorage() {
  localStorage.setItem('cafe_menu', JSON.stringify(MENU));
  updateCategories();
}
const TABLES = ['T-01','T-02','T-03','T-04','T-05','T-06','T-07','T-08','T-09'];

let cart = {};
let currentFilter = 'All';
let orders = [];
let selectedOrderId = null;
let currentBillOrderId = null;
let orderCounter = 1000;

// AUTH & SESSION STATE
let users = JSON.parse(localStorage.getItem('cafe_users')) || [];
let currentUser = JSON.parse(localStorage.getItem('cafe_current_user')) || null;
let currentAdmin = JSON.parse(localStorage.getItem('cafe_current_admin')) || null;
let activeAuthTab = 'login';
const ADMIN_DOMAIN = '@brewandbites.com';
const ADMIN_EMAILS = ['owner@gmail.com', 'admin@cafe.com'];

function saveOrdersToStorage() {
  localStorage.setItem('cafe_orders', JSON.stringify(orders));
}

function saveUsersToStorage() {
  localStorage.setItem('cafe_users', JSON.stringify(users));
}

function saveSessionsToStorage() {
  localStorage.setItem('cafe_current_user', JSON.stringify(currentUser));
  localStorage.setItem('cafe_current_admin', JSON.stringify(currentAdmin));
}

// Seed demo orders - Starting with a fresh day, no mock orders
function seedOrders() {
  orders = [];
}

function calcOrderTotal(items) {
  const sub = items.reduce((s,i) => s + i.price * i.qty, 0);
  return sub + Math.round(sub * 0.05);
}

// ═══════════════════════════════════════════
// AUTHENTICATION LOGIC
// ═══════════════════════════════════════════

function renderSwitcher() {
  const switcher = document.getElementById('modeSwitcher');
  if (!switcher) return;
  
  const container = document.getElementById('adminQuickAddContainer');
  
  if (currentAdmin) {
    switcher.innerHTML = `
      <span class="switcher-user-text">👑 Admin</span>
      <button class="mode-btn customer" onclick="showView('customer')">☕ Menu</button>
      <button class="mode-btn admin" onclick="showView('admin')">⚙ Dashboard</button>
      <button class="mode-btn customer" onclick="logoutBoth()" style="background:#FFF1F0; color:var(--danger); border: 1.5px solid #FFCDD0; margin-left: 4px;">Logout</button>
    `;
    if (container) container.style.display = 'block';
  } else if (currentUser) {
    switcher.innerHTML = `
      <span class="switcher-user-text">👤 ${currentUser.name}</span>
      <button class="mode-btn customer" onclick="logoutBoth()" style="background:#FFF1F0; color:var(--danger); border: 1.5px solid #FFCDD0;">Logout</button>
    `;
    if (container) container.style.display = 'none';
  } else {
    switcher.innerHTML = `
      <button class="mode-btn admin" onclick="openCustomerAuth()">🔑 Login</button>
    `;
    if (container) container.style.display = 'none';
  }
}

function openCustomerAuth() {
  document.getElementById('customerAuthOverlay').classList.add('open');
  setAuthTab('login');
}

function closeCustomerAuth() {
  document.getElementById('customerAuthOverlay').classList.remove('open');
}

function closeAuthOnOverlay(e) {
  if (e.target === document.getElementById('customerAuthOverlay')) {
    closeCustomerAuth();
  }
}

function setAuthTab(tab) {
  activeAuthTab = tab;
  document.getElementById('tabCustomerLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabCustomerRegister').classList.toggle('active', tab === 'register');
  
  document.getElementById('customerNameGroup').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('customerPhoneGroup').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('authSheetTitle').textContent = tab === 'login' ? '🔑 LOGIN ❤️' : '🔑 REGISTER ❤️';
  document.getElementById('customerAuthSubmit').textContent = tab === 'login' ? 'Sign in' : 'Sign up';
  
  const toggleText = document.getElementById('toggleRegText');
  if (toggleText) {
    toggleText.textContent = tab === 'login' ? 'Sign Up' : 'Log In';
  }
  
  clearAuthErrors();
}

function clearAuthErrors() {
  const errDiv = document.getElementById('customerAuthError');
  if (errDiv) {
    errDiv.textContent = '';
    errDiv.style.display = 'none';
  }
  const adminErrDiv = document.getElementById('adminAuthError');
  if (adminErrDiv) {
    adminErrDiv.textContent = '';
    adminErrDiv.style.display = 'none';
  }
}

function showAuthError(msg, isAdmin = false) {
  const errDiv = document.getElementById(isAdmin ? 'adminAuthError' : 'customerAuthError');
  if (errDiv) {
    errDiv.textContent = msg;
    errDiv.style.display = 'block';
  }
}

function submitCustomerAuth() {
  const email = document.getElementById('custEmail').value.trim();
  const password = document.getElementById('custPassword').value;
  
  if (!email || !password) {
    showAuthError('Please fill in all required fields.');
    return;
  }
  
  // Check if logging in as Admin
  const isAllowedDomain = email.toLowerCase().endsWith(ADMIN_DOMAIN);
  const isAllowedEmail = ADMIN_EMAILS.includes(email.toLowerCase()) || email.toLowerCase() === 'owner@brewandbites.com';
  
  if (isAllowedDomain || isAllowedEmail) {
    if (activeAuthTab === 'register') {
      showAuthError('Admin accounts cannot be registered here. Please Log In.');
      return;
    }
    
    if (password !== 'admin123') {
      showAuthError('Incorrect admin password.');
      return;
    }
    
    currentAdmin = { email };
    currentUser = null;
    saveSessionsToStorage();
    renderSwitcher();
    closeCustomerAuth();
    showView('admin');
    return;
  }
  
  if (activeAuthTab === 'login') {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      showAuthError('Invalid email or password.');
      return;
    }
    currentUser = user;
    currentAdmin = null;
    saveSessionsToStorage();
    renderSwitcher();
    closeCustomerAuth();
    
    if (Object.values(cart).length > 0) {
      placeOrder();
    }
  } else {
    const name = document.getElementById('custRegName').value.trim();
    const phone = document.getElementById('custRegPhone').value.trim();
    
    if (!name) {
      showAuthError('Please enter your name.');
      return;
    }
    
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      showAuthError('An account with this email already exists.');
      return;
    }
    
    const newUser = { name, email, phone: phone || 'N/A', password };
    users.push(newUser);
    saveUsersToStorage();
    
    currentUser = newUser;
    currentAdmin = null;
    saveSessionsToStorage();
    renderSwitcher();
    closeCustomerAuth();
    
    if (Object.values(cart).length > 0) {
      placeOrder();
    }
  }
}

function logoutBoth() {
  currentUser = null;
  currentAdmin = null;
  saveSessionsToStorage();
  renderSwitcher();
  resetCustomer();
  showView('customer');
}

function checkAdminAuth() {
  const authSection = document.getElementById('adminAuthSection');
  const dashboard = document.getElementById('adminDashboard');
  
  if (currentAdmin) {
    if (authSection) authSection.style.display = 'none';
    if (dashboard) dashboard.style.display = 'flex';
    renderAdmin();
  } else {
    if (authSection) authSection.style.display = 'block';
    if (dashboard) dashboard.style.display = 'none';
  }
}

function submitAdminAuth() {
  const email = document.getElementById('adminEmail').value.trim();
  const password = document.getElementById('adminPassword').value;
  
  if (!email || !password) {
    showAuthError('Please fill in all required fields.', true);
    return;
  }
  
  const isAllowedDomain = email.toLowerCase().endsWith(ADMIN_DOMAIN);
  const isAllowedEmail = ADMIN_EMAILS.includes(email.toLowerCase()) || email.toLowerCase() === 'owner@brewandbites.com';
  
  if ((isAllowedDomain || isAllowedEmail) && password === 'admin123') {
    currentAdmin = { email };
    currentUser = null;
    saveSessionsToStorage();
    renderSwitcher();
    checkAdminAuth();
  } else {
    showAuthError('Invalid admin email or password.', true);
  }
}

function logoutAdmin() {
  logoutBoth();
}

// ═══════════════════════════════════════════
// VIEW SWITCHING
// ═══════════════════════════════════════════
function showView(v) {
  document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
  document.getElementById(v === 'customer' ? 'customerView' : 'adminView').classList.add('active');
  if (v === 'admin') {
    checkAdminAuth();
  }
}

// ═══════════════════════════════════════════
// CUSTOMER FUNCTIONS
// ═══════════════════════════════════════════
function buildMenu() {
  const bar = document.getElementById('categoryBar');
  bar.innerHTML = CATEGORIES.map(c =>
    `<button class="cat-tab${c==='All'?' active':''}" onclick="filterMenu(this,'${c}')">${c}</button>`
  ).join('');
  renderMenuItems('All');
}

// category tab click
function filterMenu(el, cat) {
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  currentFilter = cat;
  renderMenuItems(cat);
}

function renderMenuItems(cat) {
  const items = cat === 'All' ? MENU : MENU.filter(i => i.cat === cat);
  const byCategory = {};
  items.forEach(i => {
    if (!byCategory[i.cat]) byCategory[i.cat] = [];
    byCategory[i.cat].push(i);
  });

  const sec = document.getElementById('menuSection');
  sec.innerHTML = Object.entries(byCategory).map(([catName, catItems]) => `
    <div>
      <div class="section-label">${catName}</div>
      <div class="menu-grid">
        ${catItems.map(item => menuCardHTML(item)).join('')}
      </div>
    </div>
  `).join('');
}

function menuCardHTML(item) {
  const qty = cart[item.id]?.qty || 0;
  return `
    <div class="menu-card" id="card-${item.id}">
      <div class="veg-dot ${item.veg?'veg':'non-veg'}"></div>
      ${getItemMedia(item.emoji, 'menu-card-img')}
      <div class="menu-card-body">
        <div class="menu-card-name">${item.name}</div>
        <div class="menu-card-desc">${item.desc}</div>
        <div class="menu-card-footer">
          <div class="menu-price">₹${item.price}</div>
          <div class="qty-control">
            ${qty > 0 ? `
              <button class="qty-btn minus" onclick="changeQty('${item.id}',-1)">−</button>
              <span class="qty-num" id="qty-${item.id}">${qty}</span>
            ` : ''}
            <button class="qty-btn plus" onclick="changeQty('${item.id}',1)">+</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function changeQty(id, delta) {
  const numericId = isNaN(id) ? id : Number(id);
  const item = MENU.find(i => i.id === numericId);
  if (!cart[id]) cart[id] = { ...item, qty: 0 };
  cart[id].qty = Math.max(0, cart[id].qty + delta);
  if (cart[id].qty === 0) delete cart[id];
  updateCardQty(id);
  updateCartBar();
}

function updateCardQty(id) {
  const card = document.getElementById(`card-${id}`);
  if (!card) return;
  const numericId = isNaN(id) ? id : Number(id);
  const item = MENU.find(i => i.id === numericId);
  if (!item) return;
  const qty = cart[id]?.qty || 0;
  const footer = card.querySelector('.menu-card-footer');
  footer.innerHTML = `
    <div class="menu-price">₹${item.price}</div>
    <div class="qty-control">
      ${qty > 0 ? `
        <button class="qty-btn minus" onclick="changeQty('${id}',-1)">−</button>
        <span class="qty-num" id="qty-${id}">${qty}</span>
      ` : ''}
      <button class="qty-btn plus" onclick="changeQty('${id}',1)">+</button>
    </div>
  `;
}

function updateCartBar() {
  const items = Object.values(cart);
  const count = items.reduce((s,i) => s + i.qty, 0);
  const sub = items.reduce((s,i) => s + i.price * i.qty, 0);
  const total = sub + Math.round(sub * 0.05);
  document.getElementById('cartCountLabel').textContent = `${count} item${count!==1?'s':''}`;
  document.getElementById('cartTotalLabel').textContent = `₹${total}`;
  const bar = document.getElementById('cartBar');
  if (count > 0) bar.classList.add('visible'); else bar.classList.remove('visible');

  // Update top navigation cart count
  const navCartBadge = document.getElementById('navCartCount');
  if (navCartBadge) {
    if (count > 0) {
      navCartBadge.textContent = count;
      navCartBadge.style.display = 'inline-flex';
    } else {
      navCartBadge.style.display = 'none';
    }
  }
}

function openCart() {
  const overlay = document.getElementById('cartOverlay');
  overlay.classList.add('open');
  renderCartSheet();
}

function closeCartOnOverlay(e) {
  if (e.target === document.getElementById('cartOverlay'))
    document.getElementById('cartOverlay').classList.remove('open');
}

function renderCartSheet() {
  const items = Object.values(cart);
  const container = document.getElementById('cartItemsContainer');
  if (items.length === 0) {
    container.innerHTML = '<p style="color:var(--mid-gray);text-align:center;padding:20px 0">Your cart is empty</p>';
  } else {
    container.innerHTML = items.map(item => `
      <div class="cart-item">
        ${getItemMedia(item.emoji, 'cart-item-emoji')}
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price} each</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn minus" onclick="changeQty('${item.id}',-1);renderCartSheet();updateCartBar()">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn plus" onclick="changeQty('${item.id}',1);renderCartSheet();updateCartBar()">+</button>
        </div>
      </div>
    `).join('');
  }
  const sub = items.reduce((s,i) => s + i.price * i.qty, 0);
  const tax = Math.round(sub * 0.05);
  document.getElementById('subtotalVal').textContent = `₹${sub}`;
  document.getElementById('taxVal').textContent = `₹${tax}`;
  document.getElementById('grandTotalVal').textContent = `₹${sub + tax}`;
}

function placeOrder() {
  let tableId = document.getElementById('tableLabel').textContent;
  if (tableId === 'None' || tableId === 'INVALID') {
    if (currentAdmin) {
      const inputTable = prompt("Enter Table Number (e.g., T-01, T-02, T-03, T-04):", "T-01");
      if (!inputTable) return;
      const cleanTable = inputTable.trim().toUpperCase();
      if (!TABLES.includes(cleanTable)) {
        alert("Invalid table number! Please enter T-01, T-02, T-03, or T-04.");
        return;
      }
      tableId = cleanTable;
    } else {
      alert('⚠️ Ordering is disabled. Please scan the QR code physically located on your table to place an order.');
      return;
    }
  }
  
  const items = Object.values(cart);
  if (items.length === 0) return;
  
  if (!currentUser && !currentAdmin) {
    document.getElementById('cartOverlay').classList.remove('open');
    openCustomerAuth();
    return;
  }
  
  let orderCustomer = null;
  if (currentAdmin) {
    orderCustomer = {
      name: "Admin (Owner)",
      email: currentAdmin.email,
      phone: "N/A"
    };
  } else {
    orderCustomer = {
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || 'N/A'
    };
  }
  
  const note = document.getElementById('orderNote').value;
  const sub = items.reduce((s,i) => s + i.price * i.qty, 0);
  const id = ++orderCounter;
  orders.unshift({
    id,
    tableId: tableId,
    items: items.map(i => ({...i})),
    note,
    status: currentAdmin ? 'served' : 'pending',
    time: new Date(),
    total: sub + Math.round(sub * 0.05),
    customer: orderCustomer
  });
  saveOrdersToStorage();
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('orderNumDisplay').textContent = `#${id}`;
  document.getElementById('orderConfirmed').classList.add('show');
}

function resetCustomer() {
  cart = {};
  document.getElementById('orderConfirmed').classList.remove('show');
  document.getElementById('cartBar').classList.remove('visible');
  document.getElementById('orderNote').value = '';
  buildMenu();
}

// ═══════════════════════════════════════════
// ADMIN FUNCTIONS
// ═══════════════════════════════════════════
let activeAdminTab = 'orders';

function adminTab(el, tab) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
  ['orders','tables','billing','summary','menu-manage','qr-manage'].forEach(t => {
    const container = document.getElementById(`tab-${t}`);
    if (container) container.style.display = t===tab ? 'block' : 'none';
  });
  const titles = {
    orders: 'Live Orders', 
    tables: 'Table Occupancy', 
    billing: 'Billing', 
    summary: "Today's Summary", 
    'menu-manage': 'Manage Menu',
    'qr-manage': 'QR Code Generator'
  };
  document.getElementById('adminTabTitle').textContent = titles[tab];
  activeAdminTab = tab;
  renderAdminTab();
}

function refreshAdmin() { renderAdmin(); }

function renderAdmin() {
  renderStats();
  renderAdminTab();
  updateClock();
}

function renderStats() {
  const pending = orders.filter(o => o.status === 'pending').length;
  const preparing = orders.filter(o => o.status === 'preparing').length;
  const occupied = new Set(orders.filter(o => o.status !== 'billed').map(o => o.tableId)).size;
  const revenue = orders.filter(o => o.status === 'billed').reduce((s,o) => s + o.total, 0);
  document.getElementById('statsGrid').innerHTML = `
    <div class="stat-card">
      <div class="stat-label">New Orders</div>
      <div class="stat-value">${pending}</div>
      <div class="stat-sub warn">${pending > 0 ? 'Needs attention' : 'All clear'}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Preparing</div>
      <div class="stat-value">${preparing}</div>
      <div class="stat-sub">In kitchen</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Tables Occupied</div>
      <div class="stat-value">${occupied}/${TABLES.length}</div>
      <div class="stat-sub up">${TABLES.length - occupied} available</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Today's Revenue</div>
      <div class="stat-value">₹${revenue.toLocaleString('en-IN')}</div>
      <div class="stat-sub up">${orders.filter(o=>o.status==='billed').length} bills settled</div>
    </div>
  `;
}

function renderAdminTab() {
  if (activeAdminTab === 'orders') renderOrderList('all');
  if (activeAdminTab === 'tables') renderTables();
  if (activeAdminTab === 'billing') renderBilling();
  if (activeAdminTab === 'summary') renderSummary();
  if (activeAdminTab === 'menu-manage') {
    renderAdminMenuList();
    openAddMenuPanel();
  }
  if (activeAdminTab === 'qr-manage') {
    renderQRDashboard();
  }
}

function renderAdminMenuList() {
  const list = document.getElementById('adminMenuList');
  if (!list) return;
  if (MENU.length === 0) {
    list.innerHTML = '<div style="padding:40px;text-align:center;color:var(--mid-gray)">Menu is empty. Add a new item to get started!</div>';
    return;
  }
  const sortedMenu = [...MENU].sort((a,b) => a.cat.localeCompare(b.cat) || a.name.localeCompare(b.name));
  list.innerHTML = sortedMenu.map(item => `
    <div class="order-row" onclick="selectMenuEditItem(${item.id})">
      <div class="order-num-badge" style="background:var(--caramel-light);color:var(--espresso);font-size:18px;overflow:hidden;padding:0;">${getItemMedia(item.emoji, 'admin-menu-badge-img')}</div>
      <div class="order-meta">
        <div class="order-table-name">${item.name} <span class="status-pill ${item.veg?'ready':'billed'}" style="font-size:10px;padding:2px 8px;">${item.veg?'Veg':'Non-Veg'}</span></div>
        <div class="order-items-preview">${item.desc} · <strong>Category: ${item.cat}</strong></div>
      </div>
      <div class="order-right">
        <div class="order-amount">₹${item.price}</div>
      </div>
    </div>
  `).join('');
}

function selectMenuEditItem(id) {
  const item = MENU.find(i => i.id === id);
  if (!item) return;
  
  const panel = document.getElementById('menuEditPanel');
  if (!panel) return;
  
  panel.innerHTML = `
    <div class="order-detail">
      <div class="detail-header">
        <div class="detail-title">Edit: ${item.name}</div>
      </div>
      <div class="detail-body">
        <div class="form-group">
          <label class="form-label" style="color:var(--espresso);">Item Name</label>
          <input type="text" class="form-input" id="editMenuName" value="${item.name}">
        </div>
        
        <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div>
            <label class="form-label" style="color:var(--espresso);">Price (₹)</label>
            <input type="number" class="form-input" id="editMenuPrice" value="${item.price}">
          </div>
          <div>
            <label class="form-label" style="color:var(--espresso);">Photo / Emoji</label>
            <input type="text" class="form-input" id="editMenuEmoji" value="${item.emoji}">
          </div>
        </div>

        <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div>
            <label class="form-label" style="color:var(--espresso);">Category</label>
            <select class="form-input" id="editMenuCat" style="padding:10px 14px;">
              <option value="Coffee" ${item.cat==='Coffee'?'selected':''}>Coffee</option>
              <option value="Drinks" ${item.cat==='Drinks'?'selected':''}>Drinks</option>
              <option value="Food" ${item.cat==='Food'?'selected':''}>Food</option>
              <option value="Mains" ${item.cat==='Mains'?'selected':''}>Mains</option>
              <option value="Desserts" ${item.cat==='Desserts'?'selected':''}>Desserts</option>
            </select>
          </div>
          <div style="display:flex; flex-direction:column; justify-content:center; padding-left:8px;">
            <label class="form-label" style="color:var(--espresso); margin-bottom:10px;">Item Type</label>
            <label style="display:inline-flex; align-items:center; gap:8px; font-size:14px; font-weight:500; cursor:pointer; color: var(--espresso);">
              <input type="checkbox" id="editMenuVeg" ${item.veg?'checked':''} style="width:16px; height:16px; accent-color:var(--caramel);"> Vegetarian Item
            </label>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" style="color:var(--espresso);">Description</label>
          <input type="text" class="form-input" id="editMenuDesc" value="${item.desc}">
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px;">
          <button class="btn btn-success" style="justify-content:center;" onclick="saveMenuItem(${item.id})">Save Changes</button>
          <button class="btn btn-danger" style="justify-content:center;" onclick="deleteMenuItem(${item.id})">Delete Item</button>
        </div>
      </div>
    </div>
  `;
}

function openAddMenuPanel() {
  const panel = document.getElementById('menuEditPanel');
  if (!panel) return;
  
  panel.innerHTML = `
    <div class="order-detail">
      <div class="detail-header">
        <div class="detail-title">Create New Menu Item</div>
      </div>
      <div class="detail-body">
        <div class="form-group">
          <label class="form-label" style="color:var(--espresso);">Item Name</label>
          <input type="text" class="form-input" id="addMenuName" placeholder="e.g. Espresso Macchiato">
        </div>
        
        <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div>
            <label class="form-label" style="color:var(--espresso);">Price (₹)</label>
            <input type="number" class="form-input" id="addMenuPrice" placeholder="150">
          </div>
          <div>
            <label class="form-label" style="color:var(--espresso);">Photo / Emoji</label>
            <input type="text" class="form-input" id="addMenuEmoji" placeholder="☕">
          </div>
        </div>

        <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div>
            <label class="form-label" style="color:var(--espresso);">Category</label>
            <select class="form-input" id="addMenuCat" style="padding:10px 14px;">
              <option value="Coffee">Coffee</option>
              <option value="Drinks">Drinks</option>
              <option value="Food">Food</option>
              <option value="Mains">Mains</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>
          <div style="display:flex; flex-direction:column; justify-content:center; padding-left:8px;">
            <label class="form-label" style="color:var(--espresso); margin-bottom:10px;">Item Type</label>
            <label style="display:inline-flex; align-items:center; gap:8px; font-size:14px; font-weight:500; cursor:pointer; color: var(--espresso);">
              <input type="checkbox" id="addMenuVeg" checked style="width:16px; height:16px; accent-color:var(--caramel);"> Vegetarian Item
            </label>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" style="color:var(--espresso);">Description</label>
          <input type="text" class="form-input" id="addMenuDesc" placeholder="Brief description of flavors...">
        </div>

        <button class="btn btn-primary" style="width:100%; justify-content:center; margin-top:16px;" onclick="createMenuItem()">Create Item</button>
      </div>
    </div>
  `;
}

function saveMenuItem(id) {
  const item = MENU.find(i => i.id === id);
  if (!item) return;
  
  const name = document.getElementById('editMenuName').value.trim();
  const price = parseInt(document.getElementById('editMenuPrice').value);
  const emoji = document.getElementById('editMenuEmoji').value.trim();
  const cat = document.getElementById('editMenuCat').value;
  const veg = document.getElementById('editMenuVeg').checked;
  const desc = document.getElementById('editMenuDesc').value.trim();
  
  if (!name || isNaN(price) || !emoji || !desc) {
    alert('Please fill in all item fields correctly.');
    return;
  }
  
  item.name = name;
  item.price = price;
  item.emoji = emoji;
  item.cat = cat;
  item.veg = veg;
  item.desc = desc;
  
  saveMenuToStorage();
  renderAdminMenuList();
  selectMenuEditItem(id);
  buildMenu();
}

function createMenuItem() {
  const name = document.getElementById('addMenuName').value.trim();
  const price = parseInt(document.getElementById('addMenuPrice').value);
  const emoji = document.getElementById('addMenuEmoji').value.trim();
  const cat = document.getElementById('addMenuCat').value;
  const veg = document.getElementById('addMenuVeg').checked;
  const desc = document.getElementById('addMenuDesc').value.trim();
  
  if (!name || isNaN(price) || !emoji || !desc) {
    alert('Please fill in all fields correctly.');
    return;
  }
  
  const maxId = MENU.reduce((max, i) => Math.max(max, i.id), 0);
  const newItem = { id: maxId + 1, name, price, emoji, cat, veg, desc };
  MENU.push(newItem);
  
  saveMenuToStorage();
  renderAdminMenuList();
  buildMenu();
  
  document.getElementById('menuEditPanel').innerHTML = `
    <div class="order-detail">
      <div class="detail-header">
        <div class="detail-title">Item Created!</div>
      </div>
      <div class="detail-body" style="color:var(--success);font-weight:600;font-size:14px;padding:40px 20px;text-align:center;">
        "${name}" has been added to the menu dashboard.
      </div>
    </div>
  `;
}

function deleteMenuItem(id) {
  const idx = MENU.findIndex(i => i.id === id);
  if (idx === -1) return;
  
  const name = MENU[idx].name;
  if (!confirm(`Are you sure you want to remove "${name}" from the menu?`)) return;
  
  MENU.splice(idx, 1);
  saveMenuToStorage();
  renderAdminMenuList();
  buildMenu();
  
  document.getElementById('menuEditPanel').innerHTML = `
    <div class="order-detail">
      <div class="detail-header">
        <div class="detail-title">Item Deleted</div>
      </div>
      <div class="detail-body" style="color:var(--danger);font-weight:600;font-size:14px;padding:40px 20px;text-align:center;">
        "${name}" has been removed from the menu catalog.
      </div>
    </div>
  `;
}

let currentOrderFilter = 'all';
function filterOrders(el, f) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  currentOrderFilter = f;
  renderOrderList(f);
}

function renderOrderList(filter) {
  const visible = filter === 'all'
    ? orders.filter(o => o.status !== 'billed')
    : orders.filter(o => o.status === filter);
  const list = document.getElementById('orderList');
  if (!list) return;
  if (visible.length === 0) {
    list.innerHTML = '<div style="padding:40px;text-align:center;color:var(--mid-gray)">No orders in this category.</div>';
    return;
  }
  list.innerHTML = visible.map(o => {
    const custName = o.customer ? ` · ${o.customer.name}` : '';
    return `
      <div class="order-row" onclick="selectOrder(${o.id})">
        <div class="order-num-badge">#${o.id}</div>
        <div class="order-meta">
          <div class="order-table-name">${o.tableId}${custName} · ${statusPill(o.status)}</div>
          <div class="order-items-preview">${o.items.map(i=>`${getItemEmojiFallback(i.emoji)} ${i.name} ×${i.qty}`).join(', ')}</div>
          ${o.note ? `<div class="order-note">📝 ${o.note}</div>` : ''}
        </div>
        <div class="order-right">
          <div class="order-amount">₹${o.total}</div>
          <div class="order-time">${timeSince(o.time)}</div>
        </div>
      </div>
    `;
  }).join('');
}

function statusPill(s) {
  const labels = {pending:'Pending',preparing:'Preparing',ready:'Ready',served:'Served',billed:'Billed'};
  return `<span class="status-pill ${s}">${labels[s]||s}</span>`;
}

function timeSince(date) {
  const mins = Math.floor((new Date() - date) / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins/60)}h ${mins%60}m ago`;
}

function selectOrder(id) {
  selectedOrderId = id;
  const o = orders.find(o => o.id === id);
  if (!o) return;
  const sub = o.items.reduce((s,i) => s + i.price * i.qty, 0);
  const tax = o.total - sub;
  const nextActions = {
    pending: [{label:'Mark Preparing', next:'preparing', cls:'btn-primary'}],
    preparing: [{label:'Mark Ready', next:'ready', cls:'btn-primary'}],
    ready: [{label:'Mark Served', next:'served', cls:'btn-success'}],
    served: [{label:'Generate Bill', next:'bill', cls:'btn-primary'}],
    billed: [],
  };
  const actions = nextActions[o.status] || [];

  let customerDetailsHtml = '';
  if (o.customer) {
    customerDetailsHtml = `
      <div style="margin-bottom:12px;padding:10px 12px;background:var(--caramel-light);border-radius:10px;font-size:13px;color:var(--caramel-deep);line-height:1.5;">
        <strong>Customer:</strong> ${o.customer.name}<br>
        <strong>Email:</strong> ${o.customer.email}<br>
        <strong>Phone:</strong> ${o.customer.phone}
      </div>
    `;
  }

  document.getElementById('orderDetailPanel').innerHTML = `
    <div class="order-detail">
      <div class="detail-header">
        <div class="detail-title">Order #${o.id} · ${o.tableId}</div>
        ${statusPill(o.status)}
      </div>
      <div class="detail-body">
        ${customerDetailsHtml}
        ${o.items.map(i => `
          <div class="detail-item-row">
            <span class="detail-item-name" style="display:flex;align-items:center;gap:8px;">${getItemMedia(i.emoji, 'detail-item-img')} ${i.name}</span>
            <span class="detail-item-qty">×${i.qty}</span>
            <span class="detail-item-price">₹${i.price * i.qty}</span>
          </div>
        `).join('')}
        <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--mid-gray);padding:8px 0">
          <span>Tax (5%)</span><span>₹${tax}</span>
        </div>
        <div class="detail-total">
          <span>Total</span><span>₹${o.total}</span>
        </div>
        ${o.note ? `<div style="margin-top:12px;padding:10px 12px;background:var(--cream);border-radius:10px;font-size:13px;color:var(--mid-gray)">📝 ${o.note}</div>` : ''}
        <div class="action-buttons">
          ${actions.map(a => `
            <button class="btn ${a.cls}" style="width:100%;justify-content:center" onclick="${a.next==='bill'?`openBill(${id})`:`advanceOrder(${id},'${a.next}')`}">${a.label}</button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function advanceOrder(id, status) {
  const o = orders.find(o => o.id === id);
  if (o) o.status = status;
  saveOrdersToStorage();
  renderStats();
  renderOrderList(currentOrderFilter);
  selectOrder(id);
}

function renderTables() {
  const occupied = {};
  orders.filter(o => o.status !== 'billed').forEach(o => {
    if (!occupied[o.tableId]) occupied[o.tableId] = { orders: [], total: 0 };
    occupied[o.tableId].orders.push(o);
    occupied[o.tableId].total += o.total;
  });

  const activeScans = JSON.parse(localStorage.getItem('cafe_active_scans')) || {};

  document.getElementById('tablesGrid').innerHTML = TABLES.map(t => {
    const info = occupied[t];
    const scanTime = activeScans[t];
    const isScannedRecently = scanTime && (Date.now() - scanTime < 15 * 60 * 1000);
    
    let cls = 'free', statusText = 'Available', amountText = 'Open';
    if (info) {
      cls = 'occupied';
      statusText = `${info.orders.length} order${info.orders.length>1?'s':''}`;
      amountText = `₹${info.total}`;
    } else if (isScannedRecently) {
      cls = 'scanned';
      statusText = 'Seated (Scanned)';
      const minsAgo = Math.max(1, Math.round((Date.now() - scanTime) / 60000));
      amountText = `${minsAgo}m ago`;
    }
    return `
      <div class="table-card ${cls}" onclick="tableClick('${t}')">
        <div class="table-card-num">${t}</div>
        <div class="table-card-status">${statusText}</div>
        <div class="table-card-amount">${amountText}</div>
      </div>
    `;
  }).join('');
}

function tableClick(tableId) {
  const tableOrders = orders.filter(o => o.tableId === tableId && o.status !== 'billed');
  if (tableOrders.length === 0) {
    const activeScans = JSON.parse(localStorage.getItem('cafe_active_scans')) || {};
    if (activeScans[tableId]) {
      if (confirm(`Table ${tableId} is scanned/seated. Do you want to mark it as Available?`)) {
        delete activeScans[tableId];
        localStorage.setItem('cafe_active_scans', JSON.stringify(activeScans));
        renderTables();
      }
    } else {
      alert(`${tableId} is currently free.`);
    }
    return;
  }
  const firstOrder = tableOrders[0];
  adminTab(document.querySelector('.nav-item:first-child'), 'orders');
  setTimeout(() => selectOrder(firstOrder.id), 50);
}

function renderBilling() {
  const servedOrders = orders.filter(o => o.status === 'served');
  const list = document.getElementById('billingList');
  if (!list) return;
  if (servedOrders.length === 0) {
    list.innerHTML = '<div style="padding:40px;text-align:center;color:var(--mid-gray)">No pending bills.</div>';
    return;
  }
  list.innerHTML = servedOrders.map(o => `
    <div class="order-row">
      <div class="order-num-badge">#${o.id}</div>
      <div class="order-meta">
        <div class="order-table-name">${o.tableId} · <span class="status-pill served">Served</span></div>
        <div class="order-items-preview">${o.items.map(i=>`${i.name} ×${i.qty}`).join(', ')}</div>
      </div>
      <div class="order-right">
        <div class="order-amount">₹${o.total}</div>
        <button class="btn btn-primary" style="margin-top:6px;padding:6px 14px;font-size:12px" onclick="openBill(${o.id})">Bill</button>
      </div>
    </div>
  `).join('');
}

function renderSummary() {
  const billed = orders.filter(o => o.status === 'billed');
  const total = billed.reduce((s,o) => s + o.total, 0);
  const itemMap = {};
  billed.forEach(o => o.items.forEach(i => {
    if (!itemMap[i.name]) itemMap[i.name] = { qty: 0, revenue: 0, emoji: i.emoji };
    itemMap[i.name].qty += i.qty;
    itemMap[i.name].revenue += i.price * i.qty;
  }));
  const topItems = Object.entries(itemMap).sort((a,b) => b[1].revenue - a[1].revenue).slice(0,5);

  const el = document.getElementById('summaryContent');
  if (!el) return;
  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
      <div class="stat-card">
        <div class="stat-label">Total Bills Settled</div>
        <div class="stat-value">${billed.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Revenue</div>
        <div class="stat-value">₹${total.toLocaleString('en-IN')}</div>
      </div>
    </div>
    <div style="font-size:14px;font-weight:600;color:var(--espresso);margin-bottom:12px">Top Selling Items</div>
    ${topItems.length === 0 ? '<p style="color:var(--mid-gray)">No settled bills yet.</p>' :
    topItems.map(([name, info]) => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--light-gray)">
        <span style="display:inline-flex;align-items:center;">${getItemMedia(info.emoji, 'detail-item-img')}</span>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:500">${name}</div>
          <div style="font-size:12px;color:var(--mid-gray)">${info.qty} sold</div>
        </div>
        <div style="font-weight:600;color:var(--caramel)">₹${info.revenue}</div>
      </div>
    `).join('')}
  `;
}

function openBill(id) {
  currentBillOrderId = id;
  const o = orders.find(o => o.id === id);
  if (!o) return;
  const now = new Date();
  document.getElementById('billDateTime').textContent =
    now.toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'}) + ' · ' +
    now.toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'});
  document.getElementById('billTableLabel').textContent = `Table ${o.tableId} · Order #${o.id}`;
  const sub = o.items.reduce((s,i) => s + i.price * i.qty, 0);
  const tax = o.total - sub;
  document.getElementById('billItemsRows').innerHTML = `
    <div class="bill-section-title" style="margin-top:0">Items</div>
    ${o.items.map(i => `
      <div class="bill-row">
        <span style="display:inline-flex;align-items:center;gap:6px;">${getItemMedia(i.emoji, 'detail-item-img')} ${i.name} ×${i.qty}</span>
        <span>₹${i.price * i.qty}</span>
      </div>
    `).join('')}
    <div class="bill-row" style="margin-top:8px">
      <span style="color:var(--mid-gray)">Subtotal</span><span>₹${sub}</span>
    </div>
    <div class="bill-row">
      <span style="color:var(--mid-gray)">GST (5%)</span><span>₹${tax}</span>
    </div>
  `;
  document.getElementById('billGrandTotal').textContent = `₹${o.total}`;
  const ebillContainer = document.getElementById('ebillInputContainer');
  if (ebillContainer) ebillContainer.style.display = 'none';
  const ebillPhoneInput = document.getElementById('ebillPhone');
  if (ebillPhoneInput) ebillPhoneInput.value = '';
  document.getElementById('billModal').classList.add('open');
}

function closeBill() {
  document.getElementById('billModal').classList.remove('open');
}

function markPaid() {
  const o = orders.find(o => o.id === currentBillOrderId);
  if (o) o.status = 'billed';
  saveOrdersToStorage();
  closeBill();
  renderAdmin();
}

function updateClock() {
  const now = new Date();
  const clock = document.getElementById('adminClock');
  if (clock) clock.textContent = now.toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'});
  checkISTMidnightReset();
}

function getISTDateString(d = new Date()) {
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  const ist = new Date(utc + (3600000 * 5.5));
  const yyyy = ist.getFullYear();
  const mm = String(ist.getMonth() + 1).padStart(2, '0');
  const dd = String(ist.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function checkISTMidnightReset() {
  const todayStr = getISTDateString();
  const recordedDay = localStorage.getItem('cafe_current_day');
  
  if (!recordedDay) {
    localStorage.setItem('cafe_current_day', todayStr);
    return;
  }
  
  if (recordedDay !== todayStr) {
    archiveDaySales(recordedDay);
    localStorage.setItem('cafe_current_day', todayStr);
  }
}

function archiveDaySales(dayKey) {
  const dayOrders = [...orders];
  const settledOrders = dayOrders.filter(o => o.status === 'billed');
  const totalRevenue = settledOrders.reduce((sum, o) => sum + o.total, 0);
  
  let history = JSON.parse(localStorage.getItem('cafe_sales_history')) || [];
  history.push({
    date: dayKey,
    revenue: totalRevenue,
    billsSettled: settledOrders.length,
    totalOrders: dayOrders.length,
    orders: dayOrders
  });
  
  localStorage.setItem('cafe_sales_history', JSON.stringify(history));
  
  // Wipe database for fresh day
  orders = [];
  saveOrdersToStorage();
  
  if (typeof renderAdmin === 'function') {
    renderAdmin();
  }
}

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
// Load data from localStorage
if (localStorage.getItem('cafe_users')) {
  users = JSON.parse(localStorage.getItem('cafe_users'));
} else {
  users = [
    { name: 'Admin Owner', email: 'owner@brewandbites.com', phone: '9999999999', password: 'admin123' },
    { name: 'John Doe', email: 'john@example.com', phone: '9876543210', password: 'password123' }
  ];
  saveUsersToStorage();
}

// Load Menu Catalog
const MENU_VERSION = 'v3';
if (localStorage.getItem('cafe_menu_version') !== MENU_VERSION || !localStorage.getItem('cafe_menu')) {
  MENU = DEFAULT_MENU;
  saveMenuToStorage();
  localStorage.setItem('cafe_menu_version', MENU_VERSION);
  updateCategories();
} else {
  MENU = JSON.parse(localStorage.getItem('cafe_menu'));
  updateCategories();
}

if (localStorage.getItem('cafe_orders')) {
  orders = JSON.parse(localStorage.getItem('cafe_orders'));
  orders.forEach(o => o.time = new Date(o.time));
  orderCounter = orders.reduce((max, o) => Math.max(max, o.id), 1000);
} else {
  seedOrders();
  saveOrdersToStorage();
}

buildMenu();
renderSwitcher();
checkISTMidnightReset();
setInterval(updateClock, 60000);
updateClock();

// Verification of table cryptographic URL signature on start-up
verifyTableAccess();

function toggleSocialMenu() {
  document.getElementById('socialShareMenu').classList.toggle('active');
}

function toggleRegLink() {
  if (activeAuthTab === 'login') {
    setAuthTab('register');
  } else {
    setAuthTab('login');
  }
}

// ═══════════════════════════════════════════
// EBILL & PDF GENERATION
// ═══════════════════════════════════════════

function toggleEBillInput() {
  const container = document.getElementById('ebillInputContainer');
  if (container) {
    container.style.display = container.style.display === 'none' ? 'block' : 'none';
  }
}

function generateBillPDF(orderId) {
  const element = document.querySelector('.bill-modal');
  const footer = document.querySelector('.bill-footer');
  if (footer) footer.style.display = 'none';
  
  const opt = {
    margin:       10,
    filename:     `bill_order_${orderId}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#FAF7F2' },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  return html2pdf().set(opt).from(element).save().then(() => {
    if (footer) footer.style.display = 'flex';
  }).catch(err => {
    console.error('PDF Generation error:', err);
    if (footer) footer.style.display = 'flex';
  });
}

function triggerEBillSend() {
  const phone = document.getElementById('ebillPhone').value.trim();
  if (!phone) {
    alert('Please enter a valid mobile number with country code (e.g. 919876543210)');
    return;
  }
  
  const o = orders.find(o => o.id === currentBillOrderId);
  if (!o) return;
  
  // 1. Generate and download local PDF receipt copy
  generateBillPDF(o.id);
  
  // 2. Open WhatsApp Web/API link with beautiful text bill
  const itemsText = o.items.map(i => `• ${getItemEmojiFallback(i.emoji)} ${i.name} x${i.qty} - ₹${i.price * i.qty}`).join('\n');
  const sub = o.items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = o.total - sub;
  
  const message = `🧾 *BREW & BITES CAFE* 🧾\n-----------------------------\n*Table ${o.tableId} · Order #${o.id}*\nDate: ${new Date().toLocaleDateString('en-IN')}\n-----------------------------\n${itemsText}\n-----------------------------\nSubtotal: ₹${sub}\nCGST & SGST (5%): ₹${tax}\n*Grand Total: ₹${o.total}*\n-----------------------------\nThank you for dining with us! ❤️\n\n*(Note: Please attach the downloaded PDF receipt file here)*`;
  
  const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
  
  // Hide inputs
  document.getElementById('ebillInputContainer').style.display = 'none';
}

// ═══════════════════════════════════════════
// HIDE-OUT CAFE UI ACTION HELPERS
// ═══════════════════════════════════════════

function scrollToMenu() {
  const menuSec = document.getElementById('menuSection');
  if (menuSec) {
    menuSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function filterAndScrollToCategory(cat) {
  const tabs = document.querySelectorAll('.cat-tab');
  let targetTab = null;
  tabs.forEach(t => {
    if (t.textContent.trim().toLowerCase() === cat.toLowerCase()) {
      targetTab = t;
    }
  });
  
  if (targetTab) {
    filterMenu(targetTab, cat);
  } else {
    renderMenuItems(cat);
    currentFilter = cat;
  }
  scrollToMenu();
}

function triggerQuickAdd() {
  const name = document.getElementById('quickAddName').value.trim();
  const priceInput = document.getElementById('quickAddPrice').value.trim();
  const price = parseInt(priceInput);
  
  if (!name || isNaN(price) || price < 0) {
    alert('Please enter a valid item name and price.');
    return;
  }
  
  const customId = 'custom-' + Date.now();
  const customItem = {
    id: customId,
    name: name,
    price: price,
    emoji: '🍽️',
    desc: 'Custom item added by Admin',
    cat: 'Custom',
    veg: true,
    qty: 1
  };
  
  cart[customId] = customItem;
  updateCartBar();
  
  document.getElementById('quickAddName').value = '';
  document.getElementById('quickAddPrice').value = '';
  
  alert(`Added custom item "${name}" (₹${price}) to cart.`);
}

// ═══════════════════════════════════════════
// CRYPTOGRAPHIC TABLE QR CODE SECURITY & VERIFICATION
// ═══════════════════════════════════════════

function generateTableToken(tableId) {
  const salt = "brewbites_secret_2026";
  const str = tableId.toUpperCase() + salt;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

function verifyTableAccess() {
  const hash = window.location.hash;
  const overlay = document.getElementById('tableErrorOverlay');
  const tableLabel = document.getElementById('tableLabel');
  
  if (hash && hash.includes('table=')) {
    const hashData = hash.substring(1);
    const parts = hashData.split('&');
    let table = '';
    let token = '';
    
    parts.forEach(p => {
      const pair = p.split('=');
      if (pair[0] === 'table') table = pair[1].toUpperCase();
      if (pair[0] === 'token') token = pair[1];
    });
    
    if (table) {
      const expectedToken = generateTableToken(table);
      if (token === expectedToken) {
        tableLabel.textContent = table;
        localStorage.setItem('cafe_verified_table', table);
        
        let activeScans = JSON.parse(localStorage.getItem('cafe_active_scans')) || {};
        activeScans[table] = Date.now();
        localStorage.setItem('cafe_active_scans', JSON.stringify(activeScans));
        
        if (overlay) overlay.classList.remove('show');
        showView('customer');
      } else {
        tableLabel.textContent = 'INVALID';
        if (overlay) {
          document.getElementById('tableErrorMsg').innerHTML = `
            You attempted to access **Table ${table}** with an invalid or missing signature token.<br>
            Please scan the official QR code printed physically on your table to verify your access.
          `;
          overlay.classList.add('show');
        }
      }
    }
  } else {
    const storedTable = localStorage.getItem('cafe_verified_table');
    if (storedTable) {
      tableLabel.textContent = storedTable;
      if (overlay) overlay.classList.remove('show');
    } else {
      tableLabel.textContent = 'None';
    }
  }
}

function renderQRDashboard() {
  const domainInput = document.getElementById('qrSiteDomain');
  if (domainInput && !domainInput.value) {
    domainInput.value = window.location.origin + window.location.pathname;
  }
  generateQRDashboard();
}

function generateQRDashboard() {
  const container = document.getElementById('qrDashboardGrid');
  if (!container) return;
  
  let domain = document.getElementById('qrSiteDomain').value.trim();
  if (!domain) {
    domain = window.location.origin + window.location.pathname;
  }
  
  if (domain.endsWith('/')) {
    domain = domain.slice(0, -1);
  }
  
  const tables = ['T-01', 'T-02', 'T-03', 'T-04'];
  container.innerHTML = tables.map(table => {
    const token = generateTableToken(table);
    const signedUrl = `${domain}/#table=${table}&token=${token}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(signedUrl)}`;
    
    return `
      <div class="qr-card">
        <div class="qr-card-title">Table ${table}</div>
        <div class="qr-code-img-wrap">
          <img src="${qrApiUrl}" class="qr-code-img" alt="QR Code Table ${table}">
        </div>
        <div class="qr-url-text">${signedUrl}</div>
        <button class="btn btn-primary" onclick="window.open('${qrApiUrl}', '_blank')" style="font-size:11px; padding:6px 12px; border-radius:6px; font-weight:700; width:100%; justify-content:center;">Open QR Image</button>
      </div>
    `;
  }).join('');
}
