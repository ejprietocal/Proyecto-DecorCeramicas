VIEWS.proveedores=()=>{
  const cards=DB.proveedores.map(p=>{
    const init=p.n.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    return `<div class="pr-card">
      <div class="pr-av">${init}</div>
      <div class="pr-n">${p.n}</div><div class="pr-cat">${p.cat}</div>
      <div class="pr-rate">★ ${p.calif}</div>
      <div class="pr-info">
        <div class="pr-row"><i class="ri-map-pin-line"></i> ${p.ciudad}</div>
        <div class="pr-row"><i class="ri-user-line"></i> ${p.contacto}</div>
        <div class="pr-row"><i class="ri-phone-line"></i> ${p.tel}</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:10px;border-top:1px solid #F1F5F9">
        <span class="badge ${p.estado==='Activo'?'bg':'by'}">${p.estado}</span>
        <button class="btn btn-sm" style="background:#4338CA;color:#fff" onclick="modalNuevaOC()"><i class="ri-shopping-cart-2-line"></i> Generar OC</button>
      </div>
    </div>`;
  }).join('');
  return `<div class="page th-prov">
    <div class="hero">
      <div class="hero-ic"><i class="ri-truck-line"></i></div>
      <h1>Proveedores</h1>
      <p>Directorio de proveedores. Debes registrar un proveedor antes de generarle una orden de compra.</p>
      <div class="hero-act"><button class="btn btn-light" onclick="modalNuevoProv()"><i class="ri-add-line"></i> Nuevo Proveedor</button></div>
    </div>
    <div class="body">
      ${!DB.proveedores.length?`<div class="empty"><i class="ri-truck-line"></i><h3>Sin proveedores</h3><p>Crea tu primer proveedor para poder generar órdenes de compra.</p></div>`
      :`<div class="prov-grid">${cards}</div>`}
    </div></div>`;
};

/* ---- COMPRAS ---- */