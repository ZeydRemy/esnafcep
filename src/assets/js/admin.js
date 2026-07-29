// ======================================================
//  SiirtEsnafCep — Super Admin Page JavaScript
// ======================================================

/* ===== WEBHOOK SIMULATOR TEMPLATES ===== */
const webhookTemplates = {
  "success-ahmet": {
    "call_id": "987654324",
    "source_number": "05321234567",
    "destination_internal": "102",
    "duration_seconds": 185,
    "status": "COMPLETED",
    "timestamp": new Date().toISOString()
  },
  "missed-taksi": {
    "call_id": "987654325",
    "source_number": "05459876543",
    "destination_internal": "103",
    "duration_seconds": 0,
    "status": "MISSED",
    "timestamp": new Date().toISOString()
  },
  "long-cilingir": {
    "call_id": "987654326",
    "source_number": "05075556677",
    "destination_internal": "105",
    "duration_seconds": 412,
    "status": "COMPLETED",
    "timestamp": new Date().toISOString()
  }
};

function loadWebhookTemplate() {
  const select = document.getElementById('webhookTemplateSelect');
  const textarea = document.getElementById('webhookPayload');
  if (select && textarea && webhookTemplates[select.value]) {
    textarea.value = JSON.stringify(webhookTemplates[select.value], null, 2);
  }
}

function sendWebhookSimulate() {
  const textarea = document.getElementById('webhookPayload');
  const responseBox = document.getElementById('webhookResponse');
  
  if (!textarea || !responseBox) return;

  try {
    const payload = JSON.parse(textarea.value);
    
    // Simulate API Network response delay
    responseBox.className = 'webhook-response-box';
    responseBox.innerHTML = '<span>Tetikleniyor...</span>';
    
    setTimeout(() => {
      responseBox.className = 'webhook-response-box success';
      responseBox.innerHTML = `<div>
        <strong>✅ NetGSM Webhook Başarılı! (Status 200 OK)</strong><br/>
        <span>CRM tetiklendi. Kayıt başarıyla eklendi.</span>
      </div>`;

      // Dynamically add to call logs table
      addCallLogToTable(payload);
    }, 800);

  } catch (e) {
    responseBox.className = 'webhook-response-box';
    responseBox.style.borderColor = '#ef4444';
    responseBox.innerHTML = `<span style="color: #fca5a5;">❌ JSON Ayrıştırma Hatası! Geçerli bir JSON girin.</span>`;
  }
}

function addCallLogToTable(payload) {
  const tbody = document.getElementById('adminCallLogs');
  if (!tbody) return;

  const esnafMatches = {
    "102": "Ahmet Çekici",
    "103": "Mehmet Taksi",
    "104": "Siirt Mobilya",
    "105": "Hızır Çilingir"
  };

  const esnafName = esnafMatches[payload.destination_internal] || "Bilinmeyen Esnaf";
  const dateFormatted = payload.timestamp.replace('T', ' ').substring(0, 19);

  const tr = document.createElement('tr');
  tr.style.background = 'rgba(34, 197, 94, 0.05)';
  tr.innerHTML = `
    <td>${payload.call_id}</td>
    <td>${payload.source_number}</td>
    <td>${payload.destination_internal}</td>
    <td>${esnafName}</td>
    <td>${payload.duration_seconds}</td>
    <td><span class="status-badge ${payload.status.toLowerCase() === 'completed' ? 'completed' : 'missed'}">${payload.status}</span></td>
    <td>${dateFormatted}</td>
  `;

  // Insert at top of the table logs
  tbody.insertBefore(tr, tbody.firstChild);

  // Auto-remove highlight after 3 seconds
  setTimeout(() => {
    tr.style.background = '';
  }, 3000);
}

function clearLogs() {
  const tbody = document.getElementById('adminCallLogs');
  if (tbody) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--clr-text-3);">Tüm loglar temizlendi. Yeni webhook tetikleyerek ekleyebilirsiniz.</td></tr>';
  }
}

/* ===== APPROVE MERCHANT ===== */
function approveMerchant(btn, name) {
  const pendingItem = btn.closest('.pending-item');
  if (!pendingItem) return;

  btn.disabled = true;
  btn.textContent = 'Onaylanıyor...';

  setTimeout(() => {
    pendingItem.style.opacity = '0';
    pendingItem.style.transform = 'translateX(50px)';
    
    // Add to table of merchants dynamically (simulation)
    const tbody = document.querySelector('#panel-admin-merchants tbody');
    if (tbody) {
      const tr = document.createElement('tr');
      tr.style.background = 'rgba(34, 197, 94, 0.05)';
      
      const isUrgent = name.includes('Oto');
      const internalCode = Math.floor(Math.random() * 900) + 100;
      
      tr.innerHTML = `
        <td><b>${name}</b></td>
        <td><span class="status-badge ${isUrgent ? 'completed' : ''}" style="${!isUrgent ? 'background: var(--clr-catalog-bg); color: #93c5fd;' : ''}">${isUrgent ? 'URGENT' : 'CATALOG'}</span></td>
        <td>${internalCode}</td>
        <td>0539 999 00 00</td>
        <td><span class="badge-status verified">✅ Onaylı</span></td>
        <td>₺3.000 / Sabit</td>
        <td>
          <button class="btn-outline btn-xs">Düzenle</button>
          <button class="btn-outline btn-xs btn-delete">Sil</button>
        </td>
      `;
      tbody.appendChild(tr);
      
      setTimeout(() => {
        tr.style.background = '';
      }, 3000);
    }

    setTimeout(() => {
      pendingItem.remove();
      // If list is empty
      const container = document.querySelector('.pending-list');
      if (container && container.children.length === 0) {
        container.innerHTML = '<span style="color:var(--clr-text-3); font-size:0.9rem;">Onay bekleyen başvuru bulunmamaktadır.</span>';
      }
    }, 300);

    alert(`"${name}" başarıyla onaylandı ve sisteme dahil edildi!`);
  }, 800);
}
