VIEWS.movimientos=()=>{
  const tipClass={Entrada:'tl-e',Salida:'tl-s',Transferencia:'tl-t',Ajuste:'tl-a'};
  const tipIc={Entrada:'ri-arrow-down-line',Salida:'ri-arrow-up-line',Transferencia:'ri-arrow-left-right-line',Ajuste:'ri-settings-3-line'};
  const tipBadge={Entrada:'bg',Salida:'bb',Transferencia:'bi',Ajuste:'bp'};
  const items=DB.movimientos.map(m=>`<div class="tl-item ${tipClass[m.tipo]||'tl-a'}">
    <div class="tl-dot"><i class="${tipIc[m.tipo]||'ri-circle-line'}"></i></div>
    <div class="tl-card">
      <div class="tl-top">
        <div style="font-size:14px;font-weight:700;color:var(--ink)">${m.n}</div>
        <span class="badge ${tipBadge[m.tipo]||'bs'}">${m.tipo}</span>
      </div>
      <div class="tl-meta">
        <span><i class="ri-stack-line"></i> ${fmt(m.cant)} ${m.u}</span>
        <span><i class="ri-store-2-line"></i> ${m.bodega}</span>
        <span><i class="ri-user-line"></i> ${m.resp}</span>
        <span><i class="ri-links-line"></i> ${m.ref}</span>
        <span><i class="ri-time-line"></i> ${m.f}</span>
      </div>
    </div>
  </div>`).join('');
  const noMov=!DB.movimientos.length;
  return `<div class="page th-mov">
    <div class="hero">
      <div class="hero-ic"><i class="ri-swap-box-line"></i></div>
      <h1>Movimientos de Bodega</h1>
      <p>Trazabilidad de entradas, salidas, transferencias y ajustes. Cada acción del sistema queda registrada aquí.</p>
    </div>
    <div class="body">
      <div class="grid">
        <div class="stat c3"><div class="stat-ic" style="background:#15803D"><i class="ri-arrow-down-line"></i></div><div class="stat-n">${DB.movimientos.filter(m=>m.tipo==='Entrada').length}</div><div class="stat-l">Entradas</div></div>
        <div class="stat c3"><div class="stat-ic" style="background:#1D4ED8"><i class="ri-arrow-up-line"></i></div><div class="stat-n">${DB.movimientos.filter(m=>m.tipo==='Salida').length}</div><div class="stat-l">Salidas</div></div>
        <div class="stat c3"><div class="stat-ic" style="background:#0369A1"><i class="ri-arrow-left-right-line"></i></div><div class="stat-n">${DB.movimientos.filter(m=>m.tipo==='Transferencia').length}</div><div class="stat-l">Transferencias</div></div>
        <div class="stat c3"><div class="stat-ic" style="background:#7C3AED"><i class="ri-settings-3-line"></i></div><div class="stat-n">${DB.movimientos.filter(m=>m.tipo==='Ajuste').length}</div><div class="stat-l">Ajustes</div></div>
        <div class="card c12">
          ${noMov?`<div class="empty"><i class="ri-swap-box-line"></i><h3>Sin movimientos</h3><p>Los movimientos aparecen aquí cuando recibes OC, despachas pedidos o haces transferencias.</p></div>`
          :`<div class="tl">${items}</div>`}
        </div>
      </div>
    </div></div>`;
};

/* ---- TRANSFERENCIAS ---- */