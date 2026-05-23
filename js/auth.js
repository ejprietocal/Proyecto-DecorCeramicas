/* ========================= AUTH / NAV / MPA SHELL ========================= */
const PAGE_MAP={
  dashboard:'dashboard.html',pedidos:'pedidos.html',inventario:'inventario.html',
  sobrantes:'sobrantes.html',movimientos:'movimientos.html',transferencias:'transferencias.html',
  proveedores:'proveedores.html',compras:'compras.html',reclamar:'reclamar.html',
  vencimientos:'vencimientos.html',facturas:'facturas.html',notas:'notas.html',
  cotizaciones:'cotizaciones.html',remisiones:'remisiones.html',
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
  let c=0;
  c+=DB.compras.filter(x=>x.estado==='recibida').length;
  c+=DB.pedidos.filter(p=>p.estado==='resagado'||p.estado==='parcial_resagado').length;
  c+=DB.transferencias.filter(t=>t.estado!=='recibida').length;
  c+=DB.vencimientos.filter(v=>v.dias<0).length;
  c+=DB.vencimientos.filter(v=>v.dias>=0&&v.dias<=20).length;
  c+=DB.sobrantes.filter(s=>s.estado!=='Reintegrado').length;
  return c;
}
function generarNotificaciones(){
  const n=[];
  DB.pedidos.filter(p=>p.estado==='resagado'||p.estado==='parcial_resagado').forEach(p=>{
    n.push({id:'np-'+p.id,tipo:'Pedido',msg:'Pedido '+p.id+' — '+p.cliente+' tiene productos resagados',pag:'pedidos.html',ref:p.id,ic:'ri-send-plane-line',cl:'var(--warn-txt)'});
  });
  DB.pedidos.filter(p=>p.estado==='pendiente').forEach(p=>{
    n.push({id:'np2-'+p.id,tipo:'Pedido',msg:'Pedido '+p.id+' de '+p.cliente+' pendiente de asignar stock',pag:'pedidos.html',ref:p.id,ic:'ri-time-line',cl:'var(--mut)'});
  });
  DB.compras.filter(c=>c.estado==='recibida').forEach(c=>{
    n.push({id:'nc-'+c.id,tipo:'Compra',msg:'OC '+c.id+' recibida — pendiente de reclamar',pag:'reclamar.html',ref:c.id,ic:'ri-inbox-unarchive-line',cl:'var(--info-txt)'});
  });
  DB.transferencias.filter(t=>t.estado==='solicitada').forEach(t=>{
    n.push({id:'nt-'+t.id,tipo:'Transferencia',msg:'Transferencia '+t.id+' solicitada de '+t.org+' a '+t.dst,pag:'transferencias.html',ref:t.id,ic:'ri-arrow-left-right-line',cl:'var(--info-txt)'});
  });
  DB.transferencias.filter(t=>t.estado==='autorizada').forEach(t=>{
    n.push({id:'nt2-'+t.id,tipo:'Transferencia',msg:'Transferencia '+t.id+' autorizada — pendiente de despachar',pag:'transferencias.html',ref:t.id,ic:'ri-arrow-left-right-line',cl:'var(--warn-txt)'});
  });
  DB.transferencias.filter(t=>t.estado==='despachada').forEach(t=>{
    n.push({id:'nt3-'+t.id,tipo:'Transferencia',msg:'Transferencia '+t.id+' despachada — pendiente de recibir',pag:'transferencias.html',ref:t.id,ic:'ri-arrow-left-right-line',cl:'var(--link)'});
  });
  DB.vencimientos.filter(v=>v.dias<0).forEach(v=>{
    n.push({id:'nv-'+v.lote,tipo:'Vencimiento',msg:v.prod+' ('+v.lote+') vencido hace '+(-v.dias)+' días — dar de baja',pag:'vencimientos.html',ref:v.lote,ic:'ri-close-circle-line',cl:'var(--danger-txt)'});
  });
  DB.vencimientos.filter(v=>v.dias>=0&&v.dias<=20).forEach(v=>{
    n.push({id:'nv2-'+v.lote,tipo:'Vencimiento',msg:v.prod+' ('+v.lote+') vence en '+v.dias+' días — urgente',pag:'vencimientos.html',ref:v.lote,ic:'ri-alert-line',cl:'var(--warn-txt)'});
  });
  DB.sobrantes.filter(s=>s.estado==='Sin identificar').forEach(s=>{
    n.push({id:'ns-'+s.id,tipo:'Sobrante',msg:'Sobrante '+s.id+' sin identificar en '+s.bodega+' — revisar',pag:'sobrantes.html',ref:s.id,ic:'ri-question-line',cl:'var(--warn-txt)'});
  });
  return n;
}
function openNotificaciones(){
  const notis=generarNotificaciones().slice(0,30);
  const agrup={};
  notis.forEach(x=>{if(!agrup[x.tipo])agrup[x.tipo]=[];agrup[x.tipo].push(x)});
  const tipos=['Pedido','Compra','Transferencia','Vencimiento','Sobrante'];
  let body='<div style="max-height:460px;overflow-y:auto">';
  if(!notis.length){
    body+='<div class="empty" style="padding:30px 10px"><i class="ri-checkbox-circle-line" style="color:var(--success-txt);font-size:36px"></i><h3>Sin notificaciones</h3><p>Todo está al día</p></div>';
  }else{
    tipos.forEach(t=>{
      const its=agrup[t];
      if(!its)return;
      body+='<div style="margin-bottom:10px"><div style="font-size:10px;font-weight:800;color:var(--mut);text-transform:uppercase;letter-spacing:.6px;padding:4px 2px 6px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--line);margin-bottom:4px"><i class="'+its[0].ic+'" style="color:'+its[0].cl+'"></i>'+t+' <span class="badge bs" style="font-size:9px;padding:1px 6px">'+its.length+'</span></div>';
      its.forEach(x=>{
        body+='<div style="display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:8px;cursor:pointer;transition:.1s;margin:1px 0" onmouseover="this.style.background=\'var(--neutral-bg)\'" onmouseout="this.style.background=\'\'" onclick="closeMod();window.location.href=\''+x.pag+'\'"><div style="width:28px;height:28px;border-radius:7px;background:'+x.cl+';display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;flex-shrink:0"><i class="'+x.ic+'"></i></div><div style="flex:1;min-width:0"><div style="font-size:12px;color:var(--ink);line-height:1.3">'+x.msg+'</div></div><i class="ri-arrow-right-s-line" style="color:var(--ph);font-size:15px;flex-shrink:0"></i></div>';
      });
      body+='</div>';
    });
  }
  body+='</div>';
  openMod('<i class="ri-notification-3-line" style="color:var(--rojo)"></i> Notificaciones <span class="badge bs" style="font-size:10px;padding:2px 8px">'+notis.length+'</span>',body,'<button class="btn btn-o btn-sm" onclick="closeMod()">Cerrar</button>');
}
function refresh(){saveDB();window.location.reload()}
function buildSb(activeMod){
  const al=PERMS[currentUser.id];let h='';
  GROUPS.forEach(g=>{
    const its=Object.keys(MODS).filter(k=>MODS[k].g===g&&al.includes(k));
    if(!its.length)return;
    h+=`<div class="sb-sec"><div class="sb-gt">${g}</div>`;
    its.forEach(k=>{
      const m=MODS[k];let bdg='';
      if(k==='reclamar'){const a=DB.compras.filter(c=>c.estado==='recibida').length;if(a)bdg=`<span class="mi-badge">${a}</span>`}
      if(k==='pedidos'){const a=DB.pedidos.filter(p=>p.estado==='resagado'||p.estado==='parcial_resagado').length;if(a)bdg=`<span class="mi-badge">${a}</span>`}
      if(k==='transferencias'){const a=DB.transferencias.filter(t=>t.estado!=='recibida').length;if(a)bdg=`<span class="mi-badge">${a}</span>`}
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