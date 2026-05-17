VIEWS.dashboard=()=>{
  const pend=DB.pedidos.filter(p=>p.estado==='pendiente').length;
  const asig=DB.pedidos.filter(p=>p.estado==='asignado').length;
  const res=DB.pedidos.filter(p=>p.estado==='resagado').length;
  const desp=DB.pedidos.filter(p=>p.estado==='despachado').length;
  const porRec=DB.compras.filter(c=>c.estado==='recibida').length;
  const bdgCards=DB.bodegas.map(b=>{
    const prods=Object.keys(DB.stock[b.id]||{}).length;
    const items=Object.values(DB.stock[b.id]||{}).reduce((s,v)=>s+v,0);
    return `<div class="bcard ${b.estado}">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div class="dot ${b.estado}"></div>
        <div class="bcard-id">${b.id}</div>
      </div>
      <div class="bcard-n">${b.n}</div>
      <div class="bcard-d">${b.dir} · ${b.area} m²</div>
      <div class="bcard-stats">
        <div class="bcard-stat"><div class="bcard-stat-n">${prods}</div><div class="bcard-stat-l">Productos</div></div>
        <div class="bcard-stat"><div class="bcard-stat-n">${fmt(items)}</div><div class="bcard-stat-l">Unidades</div></div>
        <div class="bcard-stat"><div class="bcard-stat-n badge ${b.estado==='verde'?'bg':b.estado==='amarillo'?'by':'br'}">${b.estado==='verde'?'OK':b.estado==='amarillo'?'⚠':'!'}</div></div>
      </div>
    </div>`;
  }).join('');
  const movs=DB.movimientos.slice(0,5).map(m=>`<tr>
    <td><b>${m.n}</b></td>
    <td><span class="badge ${m.tipo==='Entrada'?'bg':m.tipo==='Salida'?'bb':m.tipo==='Transferencia'?'bi':'bp'}">${m.tipo}</span></td>
    <td>${fmt(m.cant)} ${m.u}</td><td>${m.bodega}</td><td>${m.resp}</td><td style="color:var(--mut)">${m.f}</td>
  </tr>`).join('');
  return `<div class="page th-dash">
    <div class="hero">
      <div class="hero-ic"><i class="ri-dashboard-line"></i></div>
      <h1>Dashboard Operativo</h1>
      <p>Visibilidad total del inventario en todas las bodegas — Ciclo continuo de atención a pedidos</p>
    </div>
    <div class="body">
      <div style="margin-bottom:6px;font-size:12px;font-weight:700;color:var(--mut);text-transform:uppercase;letter-spacing:.7px">Estado de Bodegas en tiempo real</div>
      <div class="bodegas-band" style="margin-bottom:20px">${bdgCards}</div>
      <div class="grid">
        <div class="stat c2"><div class="stat-ring" style="background:#1D4ED8"></div><div class="stat-ic" style="background:#1D4ED8"><i class="ri-send-plane-line"></i></div><div class="stat-n">${asig+desp}</div><div class="stat-l">Pedidos asignados / despachados</div></div>
        <div class="stat c2"><div class="stat-ring" style="background:#B45309"></div><div class="stat-ic" style="background:#B45309"><i class="ri-alert-line"></i></div><div class="stat-n">${res}</div><div class="stat-l">Pedidos resagados</div></div>
        <div class="stat c2"><div class="stat-ring" style="background:#C2410C"></div><div class="stat-ic" style="background:#C2410C"><i class="ri-inbox-unarchive-line"></i></div><div class="stat-n">${porRec}</div><div class="stat-l">OC por reclamar</div></div>
        <div class="stat c2"><div class="stat-ring" style="background:#7C3AED"></div><div class="stat-ic" style="background:#7C3AED"><i class="ri-question-line"></i></div><div class="stat-n">${DB.sobrantes.filter(s=>s.estado!=='Reintegrado').length}</div><div class="stat-l">Sobrantes sin resolver</div></div>
        <div class="stat c2"><div class="stat-ring" style="background:#0369A1"></div><div class="stat-ic" style="background:#0369A1"><i class="ri-arrow-left-right-line"></i></div><div class="stat-n">${DB.transferencias.filter(t=>t.estado!=='recibida').length}</div><div class="stat-l">Transferencias en curso</div></div>
        <div class="stat c2"><div class="stat-ring" style="background:#15803D"></div><div class="stat-ic" style="background:#15803D"><i class="ri-loop-left-line"></i></div><div class="stat-n">10</div><div class="stat-l">Ciclo continuo activo</div></div>
        <div class="card c12"><div class="ch"><div class="ct"><i class="ri-swap-box-line"></i> Últimos movimientos</div><button class="btn btn-o btn-sm" onclick="nav('movimientos')">Ver todos</button></div>
          <table class="table"><thead><tr><th>Producto</th><th>Tipo</th><th>Cantidad</th><th>Bodega</th><th>Responsable</th><th>Fecha</th></tr></thead><tbody>${movs||'<tr><td colspan="6" style="text-align:center;color:var(--mut);padding:20px">Sin movimientos aún</td></tr>'}</tbody></table>
        </div>
      </div>
    </div></div>`;
};

/* ---- PEDIDOS DE VENTA ---- */