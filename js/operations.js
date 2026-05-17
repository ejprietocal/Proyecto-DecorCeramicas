/* ========================= OPERACIONES CONECTADAS ========================= */
function asignarStock(pdId){
  const pd=DB.pedidos.find(p=>p.id===pdId);
  let allOk=true;
  pd.items.forEach(it=>{
    const tot=stockTotal(it.sku);
    const best=bestBodega(it.sku);
    if(tot>=it.cant){it.bodega=best;it.asig=it.cant;it.falt=0}
    else{it.bodega=best;it.asig=tot;it.falt=it.cant-tot;allOk=false}
  });
  pd.estado=allOk?'asignado':'resagado';
}
function despacharPedido(pdId){
  const pd=DB.pedidos.find(p=>p.id===pdId);
  if(pd.estado==='despachado'){toast('Ya fue despachado','warn');return}
  if(pd.estado==='resagado'){toast('Pedido resagado: hay items sin stock suficiente','warn');return}
  pd.items.forEach(it=>{
    if(!it.bodega||!it.asig)return;
    DB.stock[it.bodega][it.sku]=(DB.stock[it.bodega][it.sku]||0)-it.asig;
    if(DB.stock[it.bodega][it.sku]<0)DB.stock[it.bodega][it.sku]=0;
    const pr=getProd(it.sku);
    DB.movimientos.unshift({f:now(),sku:it.sku,n:pr?.n||it.sku,tipo:'Salida',cant:it.asig,u:pr?.u||'unid',resp:currentUser.n,ref:pd.id,bodega:it.bodega,est:'Completado'});
  });
  pd.estado='despachado';pd.despPor=currentUser.n;
  refresh();toast('Pedido '+pd.id+' despachado. Inventario actualizado.','ok');
}
function recibirOC(ocId){
  const oc=DB.compras.find(c=>c.id===ocId);
  oc.estado='recibida';oc.recibPor=currentUser.n;
  refresh();toast('OC '+ocId+' recibida en bodega. Ahora debe ser reclamada.','ok');
}
function reclamarOC(ocId){
  const oc=DB.compras.find(c=>c.id===ocId);
  const bg='BGA'; // default to BGA
  oc.items.forEach(it=>{
    if(!DB.stock[bg])DB.stock[bg]={};
    DB.stock[bg][it.sku]=(DB.stock[bg][it.sku]||0)+it.cant;
    const pr=getProd(it.sku);
    DB.movimientos.unshift({f:now(),sku:it.sku,n:pr?.n||it.sku,tipo:'Entrada',cant:it.cant,u:it.u,resp:currentUser.n,ref:ocId,bodega:bg,est:'Completado'});
  });
  oc.estado='reclamada';oc.reclPor=currentUser.n;
  // re-assign pending pedidos that might now have stock
  DB.pedidos.filter(p=>p.estado==='resagado').forEach(p=>asignarStock(p.id));
  refresh();toast('Mercancía reclamada. Inventario Bodega A actualizado.','ok');
}
function autorizarTransferencia(id){
  const tr=DB.transferencias.find(t=>t.id===id);
  if(tr.estado!=='solicitada')return;
  tr.estado='autorizada';tr.autPor=currentUser.n;
  refresh();toast('Transferencia '+id+' autorizada.','ok');
}
function despacharTransferencia(id){
  const tr=DB.transferencias.find(t=>t.id===id);
  if(tr.estado!=='autorizada'){toast('Debe estar autorizada primero','warn');return}
  tr.items.forEach(it=>{
    DB.stock[tr.org][it.sku]=(DB.stock[tr.org][it.sku]||0)-it.cant;
    if(DB.stock[tr.org][it.sku]<0)DB.stock[tr.org][it.sku]=0;
  });
  tr.estado='despachada';tr.despPor=currentUser.n;
  refresh();toast('Transferencia '+id+' despachada desde '+tr.org,'ok');
}
function recibirTransferencia(id){
  const tr=DB.transferencias.find(t=>t.id===id);
  if(tr.estado!=='despachada'){toast('Debe estar despachada primero','warn');return}
  if(!DB.stock[tr.dst])DB.stock[tr.dst]={};
  tr.items.forEach(it=>{
    DB.stock[tr.dst][it.sku]=(DB.stock[tr.dst][it.sku]||0)+it.cant;
    const pr=getProd(it.sku);
    DB.movimientos.unshift({f:now(),sku:it.sku,n:pr?.n||it.sku,tipo:'Transferencia',cant:it.cant,u:pr?.u||'unid',resp:currentUser.n,ref:id,bodega:tr.org+'→'+tr.dst,est:'Completado'});
  });
  tr.estado='recibida';tr.recibPor=currentUser.n;
  DB.pedidos.filter(p=>p.estado==='resagado').forEach(p=>asignarStock(p.id));
  refresh();toast('Recibido en '+tr.dst+'. Inventario actualizado.','ok');
}
function modalAjusteInventario(bodega,sku){
  const pr=getProd(sku);const actual=stockBodega(bodega,sku);
  openMod(`<i class="ri-scales-line"></i> Ajuste de Inventario`,
    `<div class="note warn"><i class="ri-alert-line"></i> Ingresa el <b>conteo físico real</b>. Si hay diferencia, el sistema aplica automáticamente un castigo (faltante) o registra el excedente.</div>
     <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
       <div style="background:#F8FAFC;border:1.5px solid var(--line);border-radius:10px;padding:14px;text-align:center">
         <div style="font-size:10px;font-weight:700;color:var(--mut);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">En sistema</div>
         <div style="font-size:26px;font-weight:800;color:var(--ink)">${fmt(actual)}</div>
         <div style="font-size:11px;color:var(--mut)">${pr?.u||'unid'}</div>
       </div>
       <div style="background:#FDF4FF;border:1.5px solid #E9D5FF;border-radius:10px;padding:14px;text-align:center">
         <div style="font-size:10px;font-weight:700;color:#7C3AED;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Conteo Físico</div>
         <input type="number" id="ajCnt" min="0" value="${actual}" style="width:100%;font-size:20px;font-weight:800;text-align:center;border:none;background:transparent;color:var(--ink);outline:none" oninput="previewAjuste(${actual},'${pr?.u||'unid'}')">
         <div style="font-size:11px;color:var(--mut)">${pr?.u||'unid'}</div>
       </div>
     </div>
     <div id="ajPreview" style="padding:10px 14px;border-radius:10px;font-size:13px;font-weight:600;display:none;text-align:center;margin-bottom:8px"></div>
     <div class="ff"><label>Observación</label><input id="ajNota" placeholder="Ej: Conteo mensual — rotura en almacén"></div>`,
    `<button class="btn btn-o btn-sm" onclick="closeMod()">Cancelar</button>
     <button class="btn btn-sm" style="background:#7C3AED;color:#fff" onclick="confirmarAjuste('${bodega}','${sku}')"><i class="ri-check-line"></i> Aplicar ajuste</button>`
  );
}
function previewAjuste(actual,u){
  const v=parseInt($('ajCnt').value);const pv=$('ajPreview');
  if(isNaN(v)){pv.style.display='none';return}
  const d=v-actual;pv.style.display='block';
  if(d===0){pv.style.background='#ECFDF5';pv.style.color='#15803D';pv.innerHTML='<i class="ri-checkbox-circle-line"></i> Sin diferencia — inventario correcto'}
  else if(d>0){pv.style.background='#ECFDF5';pv.style.color='#15803D';pv.innerHTML=`<i class="ri-add-circle-line"></i> Excedente físico: +${fmt(d)} ${u}`}
  else{pv.style.background='#FEE2E2';pv.style.color='#B91C1C';pv.innerHTML=`<i class="ri-subtract-line"></i> Castigo / faltante: ${fmt(d)} ${u}`}
}
function confirmarAjuste(bodega,sku){
  const v=parseInt($('ajCnt').value);
  if(isNaN(v)||v<0){toast('Ingresa una cantidad válida','warn');return}
  const actual=stockBodega(bodega,sku);const diff=v-actual;
  if(!DB.stock[bodega])DB.stock[bodega]={};
  DB.stock[bodega][sku]=v;
  const pr=getProd(sku);const nota=$('ajNota').value||'Conteo físico';
  DB.movimientos.unshift({f:now(),sku,n:pr?.n||sku,tipo:'Ajuste',cant:Math.abs(diff)||0,u:pr?.u||'unid',resp:currentUser.n,ref:'CONT-'+bodega,bodega,est:'Completado',nota});
  DB.pedidos.filter(p=>p.estado==='resagado').forEach(p=>asignarStock(p.id));
  closeMod();refresh();
  if(diff===0)toast('Inventario confirmado. Sin diferencias.','ok');
  else if(diff>0)toast(`Excedente registrado: +${fmt(diff)} ${pr?.u||'unid'} en ${bodega}`,'ok');
  else toast(`Castigo aplicado: ${fmt(diff)} ${pr?.u||'unid'} en ${bodega}. Movimiento registrado.`,'ok');
}
function reintegrarSobrante(sbId){
  const sb=DB.sobrantes.find(s=>s.id===sbId);
  if(!sb.sku){toast('Producto no identificado, investiga primero','warn');return}
  if(!DB.stock[sb.bodega])DB.stock[sb.bodega]={};
  DB.stock[sb.bodega][sb.sku]=(DB.stock[sb.bodega][sb.sku]||0)+sb.add;
  const pr=getProd(sb.sku);
  DB.movimientos.unshift({f:now(),sku:sb.sku,n:pr?.n||sb.sku,tipo:'Ajuste',cant:sb.add,u:pr?.u||'unid',resp:currentUser.n,ref:sb.id,bodega:sb.bodega,est:'Completado'});
  sb.estado='Reintegrado';
  DB.pedidos.filter(p=>p.estado==='resagado').forEach(p=>asignarStock(p.id));
  refresh();toast('Sobrante reintegrado al inventario de '+sb.bodega,'ok');
}
function investigarSobrante(sbId){
  const sb=DB.sobrantes.find(s=>s.id===sbId);sb.estado='En investigación';
  refresh();toast('Caso de investigación abierto para '+sb.id,'ok');
}