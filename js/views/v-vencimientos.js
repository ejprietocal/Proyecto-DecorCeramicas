VIEWS.vencimientos=()=>{
  const sorted=[...DB.vencimientos].sort((a,b)=>a.dias-b.dias);
  const vcards=sorted.map(v=>{
    const cls=v.dias<0?'vencido':v.dias<=20?'critico':'';
    const label=v.dias<0?'Vencido hace '+(-v.dias)+'d':v.dias+' días';
    const pct=Math.max(0,Math.min(100,100-v.dias/120*100));
    return `<div class="vcard">
      <div class="vc-days ${cls}">
        <div class="vc-days-n">${v.dias<0?'!':v.dias}</div>
        <div class="vc-days-l">${v.dias<0?'vencido':'días'}</div>
      </div>
      <div class="vc-info">
        <div style="font-size:14px;font-weight:700;color:var(--ink)">${v.prod}</div>
        <div style="font-size:12px;color:var(--mut);margin:3px 0">${v.lote} · ${v.cant} · Bodega: ${v.bodega}</div>
        <div style="font-size:11px;color:var(--mut);margin-bottom:6px">Vence: ${v.vence}</div>
        <div class="bar"><span style="width:${pct}%;background:${cls==='vencido'?'#94A3B8':cls==='critico'?'#EF4444':'#B45309'}"></span></div>
      </div>
      <span class="badge ${v.dias<0?'bs':v.dias<=20?'br':'by'}">${label}</span>
    </div>`;
  }).join('');
  const vencidos=DB.vencimientos.filter(v=>v.dias<0).length;
  const criticos=DB.vencimientos.filter(v=>v.dias>=0&&v.dias<=20).length;
  return `<div class="page th-venc">
    <div class="hero">
      <div class="hero-ic"><i class="ri-time-line"></i></div>
      <h1>Control de Vencimientos</h1>
      <p>Adhesivos, morteros, selladores y materiales con fecha de caducidad. Ordena el despacho por FIFO.</p>
    </div>
    <div class="body">
      <div class="grid" style="margin-bottom:20px">
        <div class="stat c4"><div class="stat-ic" style="background:#B91C1C"><i class="ri-close-circle-line"></i></div><div class="stat-n">${vencidos}</div><div class="stat-l">Ya vencidos — dar de baja</div></div>
        <div class="stat c4"><div class="stat-ic" style="background:#B45309"><i class="ri-alert-line"></i></div><div class="stat-n">${criticos}</div><div class="stat-l">Vencen en ≤20 días</div></div>
        <div class="stat c4"><div class="stat-ic" style="background:#15803D"><i class="ri-checkbox-circle-line"></i></div><div class="stat-n">${DB.vencimientos.filter(v=>v.dias>20).length}</div><div class="stat-l">Vigentes</div></div>
      </div>
      <div>${vcards}</div>
    </div></div>`;
};

/* ---- USUARIOS Y ROLES ---- */