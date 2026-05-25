/* ========================= AUTH / NAV / MPA SHELL ========================= */
const PAGE_MAP={
  dashboard:'dashboard.html',pedidos:'pedidos.html',inventario:'inventario.html',
  sobrantes:'sobrantes.html',movimientos:'movimientos.html',transferencias:'transferencias.html',
  proveedores:'proveedores.html',compras:'compras.html',reclamar:'reclamar.html',
  vencimientos:'vencimientos.html',facturas:'facturas.html',notas:'notas.html',
  cotizaciones:'cotizaciones.html',remisiones:'remisiones.html',
  cliente:'cliente.html',
  configuracion:'configuracion.html'
};

function clearErr(){const e=$('lerr');if(e)e.classList.remove('show')}
function doLogin(){
  const v=$('usr').value.trim(),n=parseInt(v,10);
  if(!v||isNaN(n)||n<1||n>USERS.length){$('maxU').textContent=USERS.length;$('lerr').classList.add('show');return}
  currentUser=USERS[n-1];
  try{sessionStorage.setItem(AUTH_KEY,JSON.stringify(currentUser))}catch(e){}
  saveDB();
  window.location.href='dashboard.html';
}
function logout(){
  try{sessionStorage.removeItem(AUTH_KEY)}catch(e){}
  saveDB();
  window.location.href='index.html';
}
function loadAuth(){
  try{
    const s=sessionStorage.getItem(AUTH_KEY);
    if(s){currentUser=JSON.parse(s);return true}
  }catch(e){}
  return false;
}
function togSb(){$('sb').classList.toggle('open');$('sbBd').classList.toggle('show')}
function closeSb(){$('sb').classList.remove('open');$('sbBd').classList.remove('show')}
function togSbCol(){
  const w=document.querySelector('.wrap');
  if(!w)return;
  w.classList.toggle('sb-collapsed');
  try{sessionStorage.setItem('decorceramica_sbcol',w.classList.contains('sb-collapsed')?'1':'0')}catch(e){}
}
function applySbCol(){
  const w=document.querySelector('.wrap');
  if(!w)return;
  try{
    if(sessionStorage.getItem('decorceramica_sbcol')==='1')w.classList.add('sb-collapsed');
  }catch(e){}
}
function notifCount(){
  // sólo contamos críticos + urgentes en el badge para no desensibilizar
  const all=generarNotificaciones();
  return all.filter(n=>n.sev==='critico'||n.sev==='urgente').length;
}
function generarNotificaciones(){
  const n=[];
  DB.pedidos.filter(p=>p.estado==='resagado'||p.estado==='parcial_resagado').forEach(p=>{
    n.push({id:'np-'+p.id,sev:'urgente',tipo:'Pedido',msg:'Pedido '+p.id+' — '+clienteNombre(p)+' tiene productos resagados',pag:'pedidos.html',ref:p.id,ic:'ri-send-plane-line',cl:'var(--warn-txt)'});
  });
  DB.pedidos.filter(p=>p.estado==='pendiente').forEach(p=>{
    n.push({id:'np2-'+p.id,sev:'info',tipo:'Pedido',msg:'Pedido '+p.id+' de '+clienteNombre(p)+' pendiente de asignar stock',pag:'pedidos.html',ref:p.id,ic:'ri-time-line',cl:'var(--mut)'});
  });
  DB.compras.filter(c=>c.estado==='recibida').forEach(c=>{
    n.push({id:'nc-'+c.id,sev:'urgente',tipo:'Compra',msg:'OC '+c.id+' recibida — pendiente de reclamar',pag:'reclamar.html',ref:c.id,ic:'ri-inbox-unarchive-line',cl:'var(--info-txt)'});
  });
  DB.transferencias.filter(t=>t.estado==='solicitada').forEach(t=>{
    n.push({id:'nt-'+t.id,sev:'info',tipo:'Transferencia',msg:'Transferencia '+t.id+' solicitada de '+t.org+' a '+t.dst,pag:'transferencias.html',ref:t.id,ic:'ri-arrow-left-right-line',cl:'var(--info-txt)'});
  });
  DB.transferencias.filter(t=>t.estado==='autorizada').forEach(t=>{
    n.push({id:'nt2-'+t.id,sev:'urgente',tipo:'Transferencia',msg:'Transferencia '+t.id+' autorizada — pendiente de despachar',pag:'transferencias.html',ref:t.id,ic:'ri-arrow-left-right-line',cl:'var(--warn-txt)'});
  });
  DB.transferencias.filter(t=>t.estado==='despachada').forEach(t=>{
    n.push({id:'nt3-'+t.id,sev:'urgente',tipo:'Transferencia',msg:'Transferencia '+t.id+' despachada — pendiente de recibir',pag:'transferencias.html',ref:t.id,ic:'ri-arrow-left-right-line',cl:'var(--link)'});
  });
  DB.vencimientos.filter(v=>v.dias<0).forEach(v=>{
    n.push({id:'nv-'+v.lote,sev:'critico',tipo:'Vencimiento',msg:v.prod+' ('+v.lote+') vencido hace '+(-v.dias)+' días — dar de baja',pag:'vencimientos.html',ref:v.lote,ic:'ri-close-circle-line',cl:'var(--danger-txt)'});
  });
  DB.vencimientos.filter(v=>v.dias>=0&&v.dias<=7).forEach(v=>{
    n.push({id:'nv2-'+v.lote,sev:'urgente',tipo:'Vencimiento',msg:v.prod+' ('+v.lote+') vence en '+v.dias+' días — urgente',pag:'vencimientos.html',ref:v.lote,ic:'ri-alert-line',cl:'var(--warn-txt)'});
  });
  DB.vencimientos.filter(v=>v.dias>7&&v.dias<=20).forEach(v=>{
    n.push({id:'nv3-'+v.lote,sev:'info',tipo:'Vencimiento',msg:v.prod+' ('+v.lote+') vence en '+v.dias+' días',pag:'vencimientos.html',ref:v.lote,ic:'ri-time-line',cl:'var(--info-txt)'});
  });
  DB.sobrantes.filter(s=>s.estado==='Sin identificar').forEach(s=>{
    const d=sobranteDiasEnEstado(s);
    const sev=d>30?'critico':d>15?'urgente':'info';
    n.push({id:'ns-'+s.id,sev,tipo:'Sobrante',msg:'Sobrante '+s.id+' sin identificar en '+s.bodega+' (hace '+d+'d)',pag:'sobrantes.html',ref:s.id,ic:'ri-question-line',cl:sevColor(sev)});
  });
  // Reservas de cliente esperando retiro
  (DB.reservas_cliente||[]).filter(r=>r.estado!=='completado').forEach(r=>{
    const m=(r.fechaReserva||'').match(/(\d+)\/(\d+)\/(\d+)/);
    let dias=0;if(m){const dt=new Date(+m[3],+m[2]-1,+m[1]);dias=Math.max(0,Math.floor((Date.now()-dt.getTime())/86400000))}
    const sev=dias>15?'critico':dias>7?'urgente':'info';
    n.push({id:'nr-'+r.id,sev,tipo:'Pendiente Retiro',msg:r.clienteNombre+' tiene '+fmt(r.cantidad-(r.entregadoAcumulado||0))+' '+r.sku+' esperando en '+r.bodega+' (hace '+dias+'d)',pag:'cliente.html?id='+r.clienteId,ref:r.id,ic:'ri-archive-stack-line',cl:sevColor(sev)});
  });
  // Cotizaciones aceptadas sin facturar hace >3 días
  DB.cotizaciones.filter(c=>c.estado==='aceptada').forEach(c=>{
    n.push({id:'ncot-'+c.id,sev:'urgente',tipo:'Cotización',msg:'Cotización '+c.id+' aceptada sin facturar — '+clienteNombre(c),pag:'cotizaciones.html',ref:c.id,ic:'ri-file-text-line',cl:'var(--warn-txt)'});
  });
  return n;
}
function openNotificaciones(){
  const notis=generarNotificaciones().sort((a,b)=>(sevOrder[a.sev]||9)-(sevOrder[b.sev]||9)).slice(0,60);
  const agrup={critico:[],urgente:[],info:[]};
  notis.forEach(x=>{(agrup[x.sev]||agrup.info).push(x)});
  const sevs=['critico','urgente','info'];
  const sevIc={critico:'ri-alarm-warning-line',urgente:'ri-error-warning-line',info:'ri-information-line'};
  let body='<div style="max-height:460px;overflow-y:auto">';
  if(!notis.length){
    body+='<div class="empty" style="padding:30px 10px"><i class="ri-checkbox-circle-line" style="color:var(--success-txt);font-size:36px"></i><h3>Sin notificaciones</h3><p>Todo está al día</p></div>';
  }else{
    sevs.forEach(sv=>{
      const its=agrup[sv];if(!its.length)return;
      body+='<div class="notif-sev-block"><div class="notif-sev-h sev-'+sv+'"><i class="'+sevIc[sv]+'"></i>'+sevLabel(sv)+' <span style="margin-left:auto">'+its.length+'</span></div>';
      its.forEach(x=>{
        body+='<div class="notif-row sev-'+sv+'" onclick="closeMod();window.location.href=\''+x.pag+'\'"><div style="width:28px;height:28px;border-radius:7px;background:'+x.cl+';display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;flex-shrink:0"><i class="'+x.ic+'"></i></div><div style="flex:1;min-width:0"><div style="font-size:12px;color:var(--ink);line-height:1.3">'+x.msg+'</div><div style="font-size:10px;color:var(--mut);margin-top:1px">'+x.tipo+'</div></div><i class="ri-arrow-right-s-line" style="color:var(--ph);font-size:15px;flex-shrink:0"></i></div>';
      });
      body+='</div>';
    });
  }
  body+='</div>';
  openMod('<i class="ri-notification-3-line" style="color:var(--rojo)"></i> Notificaciones <span class="badge bs" style="font-size:10px;padding:2px 8px">'+notis.length+'</span>',body,'<button class="btn btn-o btn-sm" onclick="closeMod()">Cerrar</button>');
}
function refresh(){saveDB();window.location.reload()}
const GROUP_ICONS={Principal:'ri-home-4-line',Ventas:'ri-shopping-bag-3-line',Facturación:'ri-bill-line',Bodega:'ri-archive-2-line',Abastecimiento:'ri-truck-line','Configuración':'ri-settings-3-line'};
function buildSb(activeMod){
  const al=PERMS[currentUser.id];let h='';
  const activeGroup=MODS[activeMod]?.g;
  GROUPS.forEach(g=>{
    const its=Object.keys(MODS).filter(k=>MODS[k].g===g&&al.includes(k));
    if(!its.length)return;
    const ico=GROUP_ICONS[g]||'ri-folder-line';
    const isActive=g===activeGroup?'is-active':'';
    h+=`<div class="sb-sec ${isActive}"><div class="sb-gt"><i class="${ico}"></i>${g}</div>`;
    its.forEach(k=>{
      const m=MODS[k];let bdg='';
      if(k==='reclamar'){const a=DB.compras.filter(c=>c.estado==='recibida').length;if(a)bdg=`<span class="mi-badge">${a}</span>`}
      if(k==='pedidos'){const a=DB.pedidos.filter(p=>p.estado==='resagado'||p.estado==='parcial_resagado').length;if(a)bdg=`<span class="mi-badge">${a}</span>`}
      if(k==='transferencias'){const a=DB.transferencias.filter(t=>t.estado!=='recibida').length;if(a)bdg=`<span class="mi-badge">${a}</span>`}
      if(k==='sobrantes'){const a=(DB.reservas_cliente||[]).filter(r=>r.estado!=='completado').length;if(a)bdg=`<span class="mi-badge">${a}</span>`}
      h+=`<a class="mi ${k===activeMod?'active':''}" href="${PAGE_MAP[k]}" title="${m.n}: ${m.desc||m.n}"><i class="${m.ic}"></i><span>${m.n}</span>${bdg}</a>`;
    });
    h+=`</div>`;
  });
  $('sbMenu').innerHTML=h;
  const n=notifCount();const e=$('tbNot');if(e)e.textContent=n;
}
function toggleTheme(){
  const html=document.documentElement;
  const cur=html.getAttribute('data-theme')||'light';
  const next=cur==='light'?'dark':'light';
  html.classList.add('transition');
  html.setAttribute('data-theme',next);
  try{localStorage.setItem('decorceramica_theme',next)}catch(e){}
  document.querySelectorAll('.tb-theme,.l-theme').forEach(b=>{
    b.innerHTML=next==='dark'?'<i class="ri-sun-line"></i>':'<i class="ri-moon-line"></i>';
  });
  setTimeout(()=>html.classList.remove('transition'),400);
}
function applyTheme(){
  const saved=localStorage.getItem('decorceramica_theme')||'light';
  document.documentElement.setAttribute('data-theme',saved);
  document.querySelectorAll('.tb-theme,.l-theme').forEach(b=>{
    b.innerHTML=saved==='dark'?'<i class="ri-sun-line"></i>':'<i class="ri-moon-line"></i>';
  });
}
function initTheme(){
  applyTheme();
  const tbR=document.querySelector('.tb-r');
  if(tbR&&!document.querySelector('.tb-theme')){
    const b=document.createElement('button');
    b.className='tb-theme';
    b.setAttribute('onclick','toggleTheme()');
    b.innerHTML='<i class="ri-moon-line"></i>';
    tbR.insertBefore(b,tbR.firstChild);
  }
}
function renderShell(moduleId){
  if(!loadAuth()){window.location.href='index.html';return}
  currentUser=loadAuth()?currentUser:null;
  if(!currentUser){window.location.href='index.html';return}
  const m=MODS[moduleId];if(!m)return;
  document.title='Decorcerámica ERP — '+m.n;
  const ic=$('tbIc');if(ic)ic.className=m.ic;
  const tt=$('tbTt');if(tt)tt.textContent=m.n;
  const cr=$('tbCr');if(cr)cr.textContent=m.cr;
  ['sbAv','tbAv'].forEach(id=>{const e=$(id);if(e){e.style.background=currentUser.c;e.textContent=currentUser.in}});
  const sn=$('sbNm');if(sn)sn.textContent=currentUser.n;
  const sr=$('sbRl');if(sr)sr.textContent=currentUser.r;
  const tn=$('tbNm');if(tn)tn.textContent=currentUser.n.split(' ')[0];
  buildSb(moduleId);
  initTheme();
  installGlobalSearch();
  const notiBtn=document.querySelector('#tbNot')?.closest('.tb-btn');
  if(notiBtn&&!notiBtn.hasAttribute('data-noti-wired')){notiBtn.setAttribute('data-noti-wired','1');notiBtn.onclick=function(){openNotificaciones()}}
  const tbL=document.querySelector('.tb-l');
  if(tbL){
    if(tbL.querySelector('.tb-col')){tbL.querySelector('.tb-col').remove()}
    const btn=document.createElement('button');
    btn.className='tb-col';
    btn.setAttribute('onclick','togSbCol()');
    btn.setAttribute('title','Colapsar menú lateral');
    btn.innerHTML='<i class="ri-menu-fold-line"></i>';
    tbL.insertBefore(btn, tbL.querySelector('#tbIc'));
  }
  applySbCol();
}

/* ========================= BÚSQUEDA GLOBAL (M4) ========================= */
function installGlobalSearch(){
  const tbR=document.querySelector('.tb-r');
  if(!tbR||tbR.querySelector('.tb-search'))return;
  const wrap=document.createElement('div');
  wrap.className='tb-search';
  wrap.innerHTML='<i class="ri-search-line"></i><input id="globalSearchInput" type="text" placeholder="Buscar cliente, pedido, factura, cotización...  (Ctrl+K)" oninput="runGlobalSearch(this.value)" onfocus="runGlobalSearch(this.value)" onblur="setTimeout(closeGlobalSearch,200)"><kbd>/</kbd><div class="tb-search-results" id="globalSearchResults"></div>';
  tbR.insertBefore(wrap, tbR.firstChild);
  document.addEventListener('keydown',function(e){
    if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();const i=$('globalSearchInput');if(i){i.focus();i.select()}}
    if(e.key==='/'&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){e.preventDefault();const i=$('globalSearchInput');if(i){i.focus()}}
  });
}
function closeGlobalSearch(){const r=$('globalSearchResults');if(r)r.classList.remove('open')}
function runGlobalSearch(q){
  const r=$('globalSearchResults');if(!r)return;
  const t=(q||'').trim().toLowerCase();
  if(t.length<2){r.classList.remove('open');r.innerHTML='';return}
  const out={clientes:[],pedidos:[],cotizaciones:[],occ:[],facturas:[],remisiones:[]};
  DB.clientes.forEach(c=>{if(c.n.toLowerCase().includes(t)||c.id.toLowerCase().includes(t)||(c.contacto||'').toLowerCase().includes(t))out.clientes.push(c)});
  DB.pedidos.forEach(p=>{const cn=clienteNombre(p).toLowerCase();if(p.id.toLowerCase().includes(t)||cn.includes(t))out.pedidos.push(p)});
  DB.cotizaciones.forEach(c=>{const cn=clienteNombre(c).toLowerCase();if(c.id.toLowerCase().includes(t)||cn.includes(t))out.cotizaciones.push(c)});
  DB.ordenes_compra_cliente.forEach(o=>{const cn=clienteNombre(o).toLowerCase();if(o.id.toLowerCase().includes(t)||cn.includes(t))out.occ.push(o)});
  DB.facturas_venta.forEach(f=>{const cn=clienteNombre(f).toLowerCase();if((f.numero||'').toLowerCase().includes(t)||cn.includes(t))out.facturas.push(f)});
  DB.remisiones.forEach(rm=>{const cn=clienteNombre(rm).toLowerCase();if((rm.numero||'').toLowerCase().includes(t)||cn.includes(t))out.remisiones.push(rm)});
  const total=out.clientes.length+out.pedidos.length+out.cotizaciones.length+out.occ.length+out.facturas.length+out.remisiones.length;
  if(!total){r.innerHTML='<div class="gs-empty"><i class="ri-search-eye-line"></i> Sin resultados para "<b>'+q+'</b>"</div>';r.classList.add('open');return}
  let html='';
  const grupos=[
    {k:'clientes',l:'Clientes',ic:'ri-user-line',cl:'#0EA5E9',row:c=>'<div class="gs-row" onmousedown="window.location.href=\'cliente.html?id='+c.id+'\'"><i class="ri-user-3-line"></i><div class="gs-row-bd"><div class="gs-row-t">'+c.n+'</div><div class="gs-row-s">'+(c.ciudad||'—')+' · '+(c.contacto||'—')+'</div></div><span class="gs-tag">'+c.id+'</span></div>'},
    {k:'pedidos',l:'Pedidos',ic:'ri-send-plane-line',cl:'#D9383A',row:p=>'<div class="gs-row" onmousedown="window.location.href=\'pedidos.html\'"><i class="'+pedEstIcon(p.estado)+'"></i><div class="gs-row-bd"><div class="gs-row-t">'+p.id+' — '+clienteNombre(p)+'</div><div class="gs-row-s">'+pedEstLabel(p.estado)+' · '+p.fecha+'</div></div><span class="gs-tag">PED</span></div>'},
    {k:'cotizaciones',l:'Cotizaciones',ic:'ri-file-text-line',cl:'#0284C7',row:c=>'<div class="gs-row" onmousedown="window.location.href=\'cotizaciones.html\'"><i class="ri-file-text-line"></i><div class="gs-row-bd"><div class="gs-row-t">'+c.id+' — '+clienteNombre(c)+'</div><div class="gs-row-s">'+ctEstLabel(c.estado)+' · '+money(c.total)+'</div></div><span class="gs-tag">COT</span></div>'},
    {k:'occ',l:'OC Cliente',ic:'ri-file-list-3-line',cl:'#7C3AED',row:o=>'<div class="gs-row" onmousedown="window.location.href=\'facturas.html\'"><i class="ri-file-list-3-line"></i><div class="gs-row-bd"><div class="gs-row-t">'+o.id+' — '+clienteNombre(o)+'</div><div class="gs-row-s">'+occEstLabel(o.estado)+' · '+money(o.total)+'</div></div><span class="gs-tag">OCC</span></div>'},
    {k:'facturas',l:'Facturas',ic:'ri-bill-line',cl:'#16A34A',row:f=>'<div class="gs-row" onmousedown="window.location.href=\'facturas.html\'"><i class="ri-bill-line"></i><div class="gs-row-bd"><div class="gs-row-t">'+(f.numero||'—')+' — '+clienteNombre(f)+'</div><div class="gs-row-s">'+fvEstLabel(f.estado)+' · '+money(f.total)+'</div></div><span class="gs-tag">FV</span></div>'},
    {k:'remisiones',l:'Remisiones',ic:'ri-truck-line',cl:'#D97706',row:rm=>'<div class="gs-row" onmousedown="window.location.href=\'remisiones.html\'"><i class="ri-truck-line"></i><div class="gs-row-bd"><div class="gs-row-t">'+(rm.numero||'—')+' — '+clienteNombre(rm)+'</div><div class="gs-row-s">'+rmEstLabel(rm.estado)+'</div></div><span class="gs-tag">RM</span></div>'}
  ];
  grupos.forEach(g=>{
    const items=out[g.k];if(!items.length)return;
    html+='<div class="gs-group"><div class="gs-group-h"><i class="'+g.ic+'" style="color:'+g.cl+'"></i> '+g.l+' <span class="gs-count">'+items.length+'</span></div>'+items.slice(0,5).map(g.row).join('')+(items.length>5?'<div class="gs-more">+ '+(items.length-5)+' más</div>':'')+'</div>';
  });
  r.innerHTML=html;r.classList.add('open');
}