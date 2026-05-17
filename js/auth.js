/* ========================= AUTH / NAV ========================= */
function clearErr(){$('lerr').classList.remove('show')}
function doLogin(){
  const v=$('usr').value.trim(),n=parseInt(v,10);
  if(!v||isNaN(n)||n<1||n>USERS.length){$('maxU').textContent=USERS.length;$('lerr').classList.add('show');return}
  currentUser=USERS[n-1];
  const al=PERMS[currentUser.id];activeModule=al.includes('dashboard')?'dashboard':al[0];
  clearErr();$('usr').value='';$('pwd').value='';
  $('screen-login').classList.remove('active');$('screen-app').classList.add('active');
  ['sbAv','tbAv'].forEach(id=>{$(id).style.background=currentUser.c;$(id).textContent=currentUser.in});
  $('sbNm').textContent=currentUser.n;$('sbRl').textContent=currentUser.r;$('tbNm').textContent=currentUser.n.split(' ')[0];
  buildSb();nav(activeModule);toast('Bienvenido, '+currentUser.n.split(' ')[0],'ok');
}
function logout(){closeSb();$('screen-app').classList.remove('active');$('screen-login').classList.add('active')}
function togSb(){$('sb').classList.toggle('open');$('sbBd').classList.toggle('show')}
function closeSb(){$('sb').classList.remove('open');$('sbBd').classList.remove('show')}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&$('screen-login').classList.contains('active'))doLogin()});
function notifCount(){return DB.compras.filter(c=>c.estado==='recibida').length+DB.pedidos.filter(p=>p.estado!=='despachado').length}
function buildSb(){
  const al=PERMS[currentUser.id];let h='';
  GROUPS.forEach(g=>{
    const its=Object.keys(MODS).filter(k=>MODS[k].g===g&&al.includes(k));
    if(!its.length)return;
    h+=`<div class="sb-sec"><div class="sb-gt">${g}</div>`;
    its.forEach(k=>{
      const m=MODS[k];let bdg='';
      if(k==='reclamar'){const a=DB.compras.filter(c=>c.estado==='recibida').length;if(a)bdg=`<span class="mi-badge">${a}</span>`}
      if(k==='pedidos'){const a=DB.pedidos.filter(p=>p.estado==='resagado').length;if(a)bdg=`<span class="mi-badge">${a}</span>`}
      if(k==='transferencias'){const a=DB.transferencias.filter(t=>t.estado!=='recibida').length;if(a)bdg=`<span class="mi-badge">${a}</span>`}
      h+=`<a class="mi ${k===activeModule?'active':''}" data-m="${k}" onclick="nav('${k}')"><i class="${m.ic}"></i><span>${m.n}</span>${bdg}</a>`;
    });
    h+=`</div>`;
  });
  $('sbMenu').innerHTML=h;$('tbNot').textContent=notifCount();
}
function nav(mod){
  closeSb();activeModule=mod;
  const m=MODS[mod];$('tbIc').className=m.ic;$('tbTt').textContent=m.n;$('tbCr').textContent=m.cr;
  document.querySelectorAll('.mi').forEach(e=>e.classList.toggle('active',e.dataset.m===mod));
  const al=PERMS[currentUser.id];
  if(!al.includes(mod)){$('pg').innerHTML=`<div class="page"><div style="padding:20px"><div class="denied"><div class="ic"><i class="ri-lock-2-line"></i></div><h2>Acceso restringido</h2><p>Tu rol <b>${currentUser.r}</b> no tiene permiso para <b>${m.n}</b>.</p></div></div></div>`;return}
  $('pg').innerHTML=(VIEWS[mod]||VIEWS._default)(mod);window.scrollTo(0,0);
}
function refresh(){buildSb();nav(activeModule)}