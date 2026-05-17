VIEWS.transferencias=()=>{
  const steps=['Solicitud','Autorización','Despacho','Recepción'];
  const stateIdx={solicitada:0,autorizada:1,despachada:2,recibida:3};
  const trCards=DB.transferencias.map(tr=>{
    const idx=stateIdx[tr.estado]??0;
    const stepsH=steps.map((s,i)=>{
      const cls=i<idx?'done':i===idx?'active':'pend';
      const ln=i<steps.length-1?`<div class="step-line ${i<idx?'sl-done':'sl-pend'}"></div>`:'';
      return `<div class="step ${cls}"><div class="step-wrap"><div class="step-dot">${i<idx?'✓':(i+1)}</div><div class="step-l">${s}</div></div></div>${ln}`;
    }).join('');
    const boton=tr.estado==='solicitada'&&PERMS[currentUser.id].includes('usuarios')
      ?`<button class="btn btn-sm" style="background:#15803D;color:#fff" onclick="autorizarTransferencia('${tr.id}')"><i class="ri-checkbox-circle-line"></i> Autorizar</button>`
      :tr.estado==='autorizada'?`<button class="btn btn-blue btn-sm" onclick="despacharTransferencia('${tr.id}')"><i class="ri-send-plane-line"></i> Despachar</button>`
      :tr.estado==='despachada'?`<button class="btn btn-green btn-sm" onclick="recibirTransferencia('${tr.id}')"><i class="ri-inbox-unarchive-line"></i> Recibir</button>`
      :`<span class="badge bg"><i class="ri-checkbox-circle-line"></i> Completada</span>`;
    const itemsH=tr.items.map(it=>`<div style="display:flex;justify-content:space-between;font-size:12.5px;padding:5px 8px;background:#F8FAFC;border-radius:7px;margin-bottom:5px"><span>${it.n}</span><b>${fmt(it.cant)} ${it.u}</b></div>`).join('');
    return `<div class="tr-card">
      <div class="tr-head">
        <div><div class="tr-id">${tr.id}</div><div class="tr-route"><i class="ri-store-2-line"></i>${DB.bodegas.find(b=>b.id===tr.org)?.n||tr.org}<i class="ri-arrow-right-line"></i>${DB.bodegas.find(b=>b.id===tr.dst)?.n||tr.dst}</div></div>
        <span class="badge ${tr.estado==='recibida'?'bg':tr.estado==='despachada'?'bb':tr.estado==='autorizada'?'bi':'bs'}">${trEstLabel(tr.estado)}</span>
      </div>
      <div class="stepper">${stepsH}</div>
      <div class="tr-body">
        ${itemsH}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;flex-wrap:wrap;gap:8px">
          <div style="font-size:11.5px;color:var(--mut)">Solicitado por ${tr.solPor} · ${tr.fecha}</div>
          ${boton}
        </div>
      </div>
    </div>`;
  }).join('');
  return `<div class="page th-trans">
    <div class="hero">
      <div class="hero-ic"><i class="ri-arrow-left-right-line"></i></div>
      <h1>Transferencias entre Bodegas</h1>
      <p>Detecta exceso en una bodega y déficit en otra → Solicita → Autoriza → Despacha → Recibe. Inventario actualizado automáticamente.</p>
      <div class="hero-act"><button class="btn btn-light" onclick="modalNuevaTransferencia()"><i class="ri-add-line"></i> Solicitar transferencia</button></div>
    </div>
    <div class="body">
      ${!DB.transferencias.length?`<div class="empty"><i class="ri-arrow-left-right-line"></i><h3>Sin transferencias</h3><p>Cuando detectes exceso en una bodega y déficit en otra, solicita una transferencia.</p></div>`:`<div>${trCards}</div>`}
    </div></div>`;
};

/* ---- PROVEEDORES ---- */