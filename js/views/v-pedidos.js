VIEWS.pedidos=()=>{
  const tickets=DB.pedidos.map(pd=>{
    const isRes=pd.estado==='resagado';
    const itemsH=pd.items.map(it=>{
      const pr=getProd(it.sku)||{n:it.sku,u:'unid'};
      const stk=stockTotal(it.sku);
      return `<div class="ticket-item">
        <div><div class="t-it-n">${pr.n}</div><div class="t-it-d">Pedido: ${fmt(it.cant)} ${pr.u} · Stock total: ${fmt(stk)} ${pr.u}${it.bodega?' · Bodega asignada: <b>'+it.bodega+'</b>':''}</div></div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
          ${it.asig>0?`<span class="badge bg">✓ ${fmt(it.asig)} ${pr.u}</span>`:''}
          ${it.falt>0?`<span class="badge br">Faltante: ${fmt(it.falt)} ${pr.u}</span>`:''}
        </div>
      </div>`;
    }).join('');
    const acciones=pd.estado==='despachado'?`<span class="badge bg"><i class="ri-checkbox-circle-line"></i> Entregado por ${pd.despPor}</span>`
      :pd.estado==='asignado'?`<button class="btn btn-green btn-sm" onclick="despacharPedido('${pd.id}')"><i class="ri-send-plane-line"></i> Despachar</button>`
      :pd.estado==='resagado'?`<button class="btn btn-sm" style="background:#B45309;color:#fff" onclick="nav('transferencias')" title="Solicitar transferencia para cubrir faltantes"><i class="ri-arrow-left-right-line"></i> Cubrir con transferencia</button>`
      :`<button class="btn btn-blue btn-sm" onclick="asignarStock('${pd.id}');refresh()"><i class="ri-refresh-line"></i> Revisar stock</button>`;
    return `<div class="ticket">
      <div class="ticket-h">
        <div><div class="ticket-id">${pd.id}</div><div class="ticket-cl">${pd.cliente} · ${pd.fecha}</div></div>
        <span class="badge ${pedEstBadge(pd.estado)}">${pedEstLabel(pd.estado)}</span>
      </div>
      <div class="ticket-b">${itemsH}</div>
      <div class="ticket-f"><div style="font-size:13px;color:var(--mut)">${pd.items.length} producto(s)</div>${acciones}</div>
    </div>`;
  }).join('');
  const noPed=DB.pedidos.length===0;
  return `<div class="page th-pedidos">
    <div class="hero">
      <div class="hero-ic"><i class="ri-send-plane-line"></i></div>
      <h1>Pedidos de Venta</h1>
      <p>Paso 1: el cliente pide → el sistema verifica stock en todas las bodegas → asigna la bodega óptima → despacha o resaga.</p>
      <div class="hero-act"><button class="btn btn-light" onclick="modalNuevoPedido()"><i class="ri-add-line"></i> Nuevo Pedido</button></div>
    </div>
    <div class="body">
      ${noPed?`<div class="empty"><i class="ri-send-plane-line"></i><h3>Sin pedidos</h3><p>Crea el primer pedido con el botón de arriba.</p></div>`:`<div class="tickets">${tickets}</div>`}
    </div></div>`;
};

/* ---- INVENTARIO (multi-bodega) ---- */