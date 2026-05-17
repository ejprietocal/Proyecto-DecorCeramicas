VIEWS.sobrantes=()=>{
  const cols=['Sin identificar','En investigación','Reintegrado'];
  const colBadge={'Sin identificar':'bp','En investigación':'by','Reintegrado':'bg'};
  const kcols=cols.map(col=>{
    const items=DB.sobrantes.filter(s=>s.estado===col);
    const kcs=items.length?items.map(s=>`<div class="kcard">
      <div class="kcard-t">${s.cont}</div>
      <div class="kcard-m">${s.ubic}<br><span style="font-size:10.5px;color:#94A3B8">${s.orig} · ${s.det}</span></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <span class="badge bs">${s.cant}</span>
        ${s.bodega?`<span class="badge bs">${s.bodega}</span>`:''}
      </div>
      ${col==='Sin identificar'?`<div style="margin-top:10px;display:flex;gap:7px;flex-wrap:wrap">
        <button class="btn btn-sm" style="background:#7C3AED;color:#fff;padding:4px 10px;font-size:11px" onclick="investigarSobrante('${s.id}')"><i class="ri-search-eye-line"></i> Investigar</button>
      </div>`:''}
      ${col==='En investigación'&&s.sku?`<div style="margin-top:10px">
        <button class="btn btn-green btn-sm" style="font-size:11px" onclick="reintegrarSobrante('${s.id}')"><i class="ri-arrow-go-back-line"></i> Reintegrar al inventario</button>
      </div>`:''}
    </div>`).join('')
    :`<div style="text-align:center;padding:24px;color:#94A3B8;font-size:12.5px">Sin elementos</div>`;
    return `<div class="kcol"><div class="kcol-h"><span>${col}</span><span class="badge ${colBadge[col]}">${items.length}</span></div>${kcs}</div>`;
  }).join('');
  return `<div class="page th-sob">
    <div class="hero">
      <div class="hero-ic"><i class="ri-question-line"></i></div>
      <h1>Sobrantes / Sin Identificar</h1>
      <p>Productos no asignados que permanecen en bodega. Investiga, identifica y reintegra al inventario.</p>
    </div>
    <div class="body"><div class="kanban">${kcols}</div></div></div>`;
};

/* ---- MOVIMIENTOS (timeline) ---- */