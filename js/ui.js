/* ========================= TOAST / MODAL ========================= */
let tT;
function toast(msg,kind='ok'){const t=$('toast');t.className='toast t-'+kind;$('toastMsg').textContent=msg;t.classList.add('show');clearTimeout(tT);tT=setTimeout(()=>t.classList.remove('show'),3200)}
function openMod(tit,body,foot){$('mTit').innerHTML=tit;$('mBod').innerHTML=body;$('mFot').innerHTML=foot;$('modal').classList.add('show')}
function closeMod(){$('modal').classList.remove('show')}

/* ========================= AUTOCOMPLETE DE CLIENTE (M11) ========================= */
function clienteAutocompleteHtml(label){
  return '<label>'+(label||'Cliente')+'</label><div class="cli-auto"><input id="dCliente" autocomplete="off" placeholder="Escribe nombre del cliente o ID (CL-01...)" oninput="cliAutoSearch(this.value)" onfocus="cliAutoSearch(this.value)" onblur="setTimeout(cliAutoClose,180)"><input type="hidden" id="dClienteId"><div class="cli-auto-results" id="cliAutoResults"></div></div>';
}
function cliAutoClose(){const r=$('cliAutoResults');if(r)r.classList.remove('open')}
function cliAutoSearch(q){
  const r=$('cliAutoResults');if(!r)return;
  const t=(q||'').trim().toLowerCase();
  const hits=DB.clientes.filter(c=>!t||c.n.toLowerCase().includes(t)||c.id.toLowerCase().includes(t)||(c.contacto||'').toLowerCase().includes(t)).slice(0,8);
  let h='';
  hits.forEach(c=>{h+='<div class="cli-auto-row" onmousedown="cliAutoPick(\''+c.id+'\',\''+c.n.replace(/\x27/g,"\\'")+'\')"><i class="ri-user-3-line" style="color:var(--info-txt)"></i><div><div style="font-weight:600">'+c.n+'</div><div style="font-size:10px;color:var(--mut)">'+c.id+' · '+(c.ciudad||'—')+'</div></div><span class="meta">'+(c.tipo||'')+'</span></div>'});
  if(t){h+='<div class="cli-auto-row new" onmousedown="cliAutoNew()"><i class="ri-add-circle-line"></i> Crear cliente nuevo: "'+q+'"</div>'}
  r.innerHTML=h;
  if(h)r.classList.add('open');else r.classList.remove('open');
}
function cliAutoPick(id,n){const i=$('dCliente'),h=$('dClienteId');if(i)i.value=n;if(h)h.value=id;cliAutoClose()}
function cliAutoNew(){
  const v=($('dCliente').value||'').trim();if(!v)return;
  const id='CL-'+String(DB.clientes.length+1).padStart(2,'0');
  DB.clientes.push({id,n:v,ciudad:'',tel:'',contacto:'',email:'',tipo:'particular',creadoEn:now()});
  if(typeof logEvent==='function')logEvent('clientes','crear','cliente',id,'Cliente '+id+' ('+v+') creado inline');
  const h=$('dClienteId');if(h)h.value=id;
  cliAutoClose();
  toast('Cliente '+id+' creado: '+v,'ok');
  saveDB();
}