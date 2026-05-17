VIEWS.compras=()=>{
  const list=DB.compras.map(oc=>{
    const pv=getProv(oc.provId);
    const val=ocValor(oc);
    const linesH=oc.items.map(it=>`<div class="oc-line"><span>${it.n}</span><span>${fmt(it.cant)} ${it.u} · ${money(it.cant*it.precio)}</span></div>`).join('');
    const acciones=oc.estado==='transito'
      ?`<button class="btn btn-blue btn-sm" onclick="recibirOC('${oc.id}')"><i class="ri-inbox-unarchive-line"></i> Recibir en bodega</button>`
      :oc.estado==='recibida'
      ?`<button class="btn btn-orange btn-sm" onclick="nav('reclamar')"><i class="ri-hand-coin-line"></i> Ir a reclamar</button>`
      :`<span class="badge bg"><i class="ri-checkbox-circle-line"></i> Reclamada por ${oc.reclPor}</span>`;
    return `<div class="oc">
      <div class="oc-h">
        <div><div class="oc-id">${oc.id}</div><div class="oc-prov"><i class="ri-truck-line"></i> ${pv.n} · ${oc.fecha}</div></div>
        <span class="badge ${compEstBadge(oc.estado)}">${compEstLabel(oc.estado)}</span>
      </div>
      <div class="oc-items">${linesH}</div>
      <div class="oc-f"><b style="font-size:14px">${money(val)}</b>${acciones}</div>
    </div>`;
  }).join('');
  return `<div class="page th-comp">
    <div class="hero">
      <div class="hero-ic"><i class="ri-shopping-cart-2-line"></i></div>
      <h1>Órdenes de Compra</h1>
      <p>Compras a proveedores. Flujo: Generar OC → Llega en tránsito → Recibir → Reclamar → Entra al inventario.</p>
      <div class="hero-act"><button class="btn btn-light" onclick="modalNuevaOC()"><i class="ri-add-line"></i> Nueva OC</button></div>
    </div>
    <div class="body">
      ${!DB.compras.length?`<div class="empty"><i class="ri-shopping-cart-2-line"></i><h3>Sin órdenes</h3><p>Crea tu primera orden de compra. Primero necesitas un proveedor registrado.</p></div>`
      :`<div class="oc-list">${list}</div>`}
    </div></div>`;
};

/* ---- RECLAMAR ---- */