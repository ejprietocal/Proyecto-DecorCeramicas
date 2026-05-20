/* ========================= AUTH / NAV / MPA SHELL ========================= */
const PAGE_MAP={
  dashboard:'dashboard.html',pedidos:'pedidos.html',inventario:'inventario.html',
  sobrantes:'sobrantes.html',movimientos:'movimientos.html',transferencias:'transferencias.html',
  proveedores:'proveedores.html',compras:'compras.html',reclamar:'reclamar.html',
  vencimientos:'vencimientos.html',usuarios:'usuarios.html'
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
function notifCount(){return DB.compras.filter(c=>c.estado==='recibida').length+DB.pedidos.filter(p=>p.estado!=='despachado').length}
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
      h+=`<a class="mi ${k===activeMod?'active':''}" href="${PAGE_MAP[k]}"><i class="${m.ic}"></i><span>${m.n}</span>${bdg}</a>`;
    });
    h+=`</div>`;
  });
  $('sbMenu').innerHTML=h;
  const n=notifCount();const e=$('tbNot');if(e)e.textContent=n;
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
}