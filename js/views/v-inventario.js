VIEWS.inventario=()=>{
  const tabs=DB.bodegas.map(b=>`<div class="inv-tab ${b.id===selBodega?'sel':''}" onclick="selBodega='${b.id}';nav('inventario')">
    <div class="dot ${b.estado}"></div>
    <div><div class="inv-tab-n">${b.id}</div><div class="inv-tab-d">${b.n.split(' - ')[1]}</div></div>
  </div>`).join('');
  const bg=DB.bodegas.find(b=>b.id===selBodega);
  const cards=DB.productos.map(p=>{
    const stk=stockBodega(selBodega,p.sku);const tot=stockTotal(p.sku);
    const pct=tot>0?Math.round(stk/tot*100):0;
    const est=stk===0?['br','Agotado']:stk<100?['by','Bajo stock']:['bg','Disponible'];
    return `<div class="pc">
      <div class="pc-thumb" style="background:${p.grad}"><i class="${p.ic}"></i></div>
      <div class="pc-body">
        <div class="pc-n">${p.n}</div><div class="pc-sku">${p.sku}</div>
        <div class="pc-stock">${fmt(stk)}</div><div class="pc-sl">${p.u} en ${selBodega} · Total: ${fmt(tot)} ${p.u}</div>
        <div style="margin-top:8px"><div class="bar"><span style="width:${pct}%;background:${stk===0?'#EF4444':stk<100?'#B45309':'#15803D'}"></span></div></div>
        <div class="pc-f"><span class="badge ${est[0]}">${est[1]}</span><button class="btn btn-sm" style="background:#7C3AED;color:#fff;padding:4px 9px;font-size:11px" onclick="modalAjusteInventario('${selBodega}','${p.sku}')"><i class="ri-scales-line"></i> Ajustar</button></div>
      </div>
    </div>`;
  }).join('');
  return `<div class="page th-inv">
    <div class="hero">
      <div class="hero-ic"><i class="ri-archive-2-line"></i></div>
      <h1>Inventario</h1>
      <p>Stock en tiempo real por bodega. Detecta diferencias y aplica castigos o registra excedentes directamente desde cada producto.</p>
      <div class="hero-act"><button class="btn btn-light" onclick="nav('inventario')" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25)"><i class="ri-refresh-line"></i> Actualizar</button></div>
    </div>
    <div class="body">
      <div class="inv-wrap">
        <div class="inv-bodegas">${tabs}</div>
        <div style="flex:1">
          <div style="margin-bottom:14px;padding:12px 16px;background:#ECFDF5;border:1px solid #A7F3D0;border-radius:12px;display:flex;align-items:center;gap:10px">
            <div class="dot ${bg.estado}"></div>
            <div style="flex:1"><b style="font-size:14px">${bg.n}</b> <span style="font-size:12px;color:var(--mut)"> · ${bg.dir} · ${bg.area} m²</span></div>
          </div>
          <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:12.5px;color:#B45309;display:flex;gap:8px"><i class="ri-error-warning-line" style="margin-top:1px;flex-shrink:0"></i><span>Dolor principal: alta rotación de personal genera descontrol. Usa <b>Ajustar</b> en cada producto para registrar el conteo físico real y castigar diferencias. Cada ajuste queda en el historial de Movimientos.</span></div>
          <div class="inv-grid">${cards}</div>
        </div>
      </div>
    </div></div>`;
};

/* ---- SOBRANTES ---- */