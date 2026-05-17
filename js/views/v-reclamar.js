VIEWS.reclamar=()=>{
  const porRec=DB.compras.filter(c=>c.estado==='recibida');
  const lotes=porRec.map(oc=>{
    const pv=getProv(oc.provId);
    const tagsH=oc.items.map(it=>`<span class="badge bs">${it.n} · ${fmt(it.cant)} ${it.u}</span>`).join('');
    const dias=Math.floor(Math.random()*40)+10; // mock aging
    return `<div class="lote">
      <div class="lote-main">
        <div class="lote-t">${oc.id} — ${pv.n}</div>
        <div class="lote-s">Recibida por ${oc.recibPor||'—'} · ${oc.fecha}</div>
        <div class="lote-tags">${tagsH}</div>
      </div>
      <div class="aging">
        <div class="aging-n" style="color:${dias>30?'#B91C1C':'#B45309'}">${dias}</div>
        <div class="aging-l">días en bodega</div>
      </div>
      <button class="btn btn-orange" onclick="reclamarOC('${oc.id}')"><i class="ri-hand-coin-line"></i> Reclamar</button>
    </div>`;
  }).join('');
  return `<div class="page th-rec">
    <div class="hero">
      <div class="hero-ic"><i class="ri-inbox-unarchive-line"></i></div>
      <h1>Mercancía por Reclamar</h1>
      <p>OC recibidas físicamente pero sin responsable asignado. Reclamar suma al inventario y registra el movimiento de entrada.</p>
    </div>
    <div class="body">
      ${!porRec.length
        ?`<div class="empty"><i class="ri-checkbox-circle-line"></i><h3>Todo al día</h3><p>No hay mercancía pendiente por reclamar. Cuando recibas una OC, aparecerá aquí.</p></div>`
        :`<div class="bandeja">${lotes}</div>`}
    </div></div>`;
};

/* ---- VENCIMIENTOS ---- */