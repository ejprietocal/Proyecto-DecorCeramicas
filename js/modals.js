/* ========================= MODALES DE CREACIÓN ========================= */
function modalNuevoPedido(){
  draft={items:[{sku:'',cant:1}]};
  openMod('<i class="ri-send-plane-line"></i> Nuevo Pedido de Venta',
    `<div class="note"><i class="ri-information-line"></i> El sistema verificará stock en todas las bodegas y asignará la bodega óptima automáticamente.</div>
     <div class="ff"><label>Cliente</label><input id="dCliente" placeholder="Nombre del cliente o empresa"></div>
     <div class="ff"><label>Productos del pedido</label><div id="draftLines"></div><button class="add-line" onclick="addLine()"><i class="ri-add-line"></i> Agregar producto</button></div>`,
    `<button class="btn btn-o btn-sm" onclick="closeMod()">Cancelar</button>
     <button class="btn btn-blue btn-sm" onclick="crearPedido()"><i class="ri-check-line"></i> Crear pedido</button>`
  );renderLines();
}
function crearPedido(){
  const cl=$('dCliente').value.trim();
  if(!cl){toast('Ingresa el nombre del cliente','warn');return}
  if(!draft.items.length||!draft.items[0].sku){toast('Agrega al menos un producto','warn');return}
  const id='PD-'+PD_SEQ++;
  const items=draft.items.filter(i=>i.sku).map(i=>({sku:i.sku,cant:i.cant,bodega:null,asig:0,falt:0}));
  DB.pedidos.unshift({id,cliente:cl,fecha:now().split(' ')[0],estado:'pendiente',despPor:null,items});
  asignarStock(id);closeMod();refresh();
  const pd=DB.pedidos.find(p=>p.id===id);
  toast(id+' creado → '+pedEstLabel(pd.estado),'ok');
}
function modalNuevaOC(){
  if(!DB.proveedores.length){toast('Crea un proveedor primero','warn');nav('proveedores');return}
  draft={items:[{sku:'',cant:1}]};
  const pOpts=DB.proveedores.map(p=>`<option value="${p.id}">${p.n} (${p.ciudad})</option>`).join('');
  openMod('<i class="ri-shopping-cart-2-line"></i> Nueva Orden de Compra',
    `<div class="note"><i class="ri-information-line"></i> Solo puedes comprarle a proveedores ya registrados.</div>
     <div class="ff"><label>Proveedor</label><select id="dProv"><option value="">— Selecciona —</option>${pOpts}</select></div>
     <div class="ff"><label>Productos a comprar</label><div id="draftLines"></div><button class="add-line" onclick="addLine()"><i class="ri-add-line"></i> Agregar producto</button></div>`,
    `<button class="btn btn-o btn-sm" onclick="closeMod()">Cancelar</button>
     <button class="btn btn-sm" style="background:#4338CA;color:#fff" onclick="crearOC()"><i class="ri-check-line"></i> Generar OC</button>`
  );renderLines();
}
function crearOC(){
  const provId=$('dProv').value;
  if(!provId){toast('Selecciona un proveedor','warn');return}
  if(!draft.items[0]?.sku){toast('Agrega al menos un producto','warn');return}
  const id='OC-'+OC_SEQ++;
  const items=draft.items.filter(i=>i.sku).map(i=>{const p=getProd(i.sku);return{sku:i.sku,n:p?.n||i.sku,cant:i.cant,u:p?.u||'unid',precio:p?.precio||0}});
  DB.compras.unshift({id,provId,fecha:now(),estado:'transito',recibPor:null,reclPor:null,items});
  closeMod();refresh();toast('OC '+id+' generada. En tránsito hacia bodega.','ok');
}
function modalNuevoProv(){
  openMod('<i class="ri-truck-line"></i> Nuevo Proveedor',
    `<div class="ff"><label>Nombre del proveedor</label><input id="dpNombre" placeholder="Empresa o persona"></div>
     <div class="ff2">
       <div class="ff"><label>Categoría</label><input id="dpCat" placeholder="Ej: Pisos y azulejos"></div>
       <div class="ff"><label>Ciudad</label><input id="dpCiudad" placeholder="Ej: Ipiales"></div>
     </div>
     <div class="ff2">
       <div class="ff"><label>Contacto</label><input id="dpContact" placeholder="Nombre"></div>
       <div class="ff"><label>Teléfono</label><input id="dpTel" placeholder="300 000 0000"></div>
     </div>`,
    `<button class="btn btn-o btn-sm" onclick="closeMod()">Cancelar</button>
     <button class="btn btn-green btn-sm" onclick="crearProv()"><i class="ri-check-line"></i> Guardar proveedor</button>`
  );
}
function crearProv(){
  const n=$('dpNombre').value.trim();if(!n){toast('Ingresa el nombre','warn');return}
  const id='PR-'+String(DB.proveedores.length+1).padStart(2,'0');
  DB.proveedores.push({id,n,cat:$('dpCat').value||'General',ciudad:$('dpCiudad').value||'—',contacto:$('dpContact').value||'—',tel:$('dpTel').value||'—',calif:4.0,estado:'Activo'});
  closeMod();refresh();toast('Proveedor '+n+' creado. Ya puedes generarle una OC.','ok');
}
function modalNuevaTransferencia(){
  const bOpts=DB.bodegas.map(b=>`<option value="${b.id}">${b.n}</option>`).join('');
  draft={items:[{sku:'',cant:1}]};
  openMod('<i class="ri-arrow-left-right-line"></i> Solicitar Transferencia entre Bodegas',
    `<div class="note"><i class="ri-information-line"></i> Detecta exceso en una bodega y solicita el traslado a la que tiene déficit.</div>
     <div class="ff2">
       <div class="ff"><label>Bodega Origen</label><select id="dOrg">${bOpts}</select></div>
       <div class="ff"><label>Bodega Destino</label><select id="dDst">${bOpts}</select></div>
     </div>
     <div class="ff"><label>Productos a transferir</label><div id="draftLines"></div><button class="add-line" onclick="addLine()"><i class="ri-add-line"></i> Agregar producto</button></div>`,
    `<button class="btn btn-o btn-sm" onclick="closeMod()">Cancelar</button>
     <button class="btn btn-blue btn-sm" onclick="crearTransferencia()"><i class="ri-check-line"></i> Solicitar</button>`
  );renderLines();
}
function crearTransferencia(){
  const org=$('dOrg').value,dst=$('dDst').value;
  if(org===dst){toast('Origen y destino deben ser distintos','warn');return}
  if(!draft.items[0]?.sku){toast('Agrega al menos un producto','warn');return}
  const id='TR-'+String(TR_SEQ++).padStart(3,'0');
  const items=draft.items.filter(i=>i.sku).map(i=>{const p=getProd(i.sku);return{sku:i.sku,n:p?.n||i.sku,cant:i.cant,u:p?.u||'unid'}});
  DB.transferencias.unshift({id,org,dst,fecha:now(),estado:'solicitada',solPor:currentUser.n,autPor:null,despPor:null,recibPor:null,items});
  closeMod();refresh();toast('Transferencia '+id+' solicitada. Pendiente de autorización.','ok');
}
function modalNuevoUsuario(){
  const mOpts=Object.keys(MODS).filter(k=>k!=='dashboard').map(k=>`<label style="display:flex;align-items:center;gap:7px;font-size:12.5px;padding:5px 0"><input type="checkbox" class="nuMod" value="${k}"> ${MODS[k].n}</label>`).join('');
  openMod('<i class="ri-user-add-line"></i> Crear Usuario',
    `<div class="ff"><label>Nombre completo</label><input id="nuN" placeholder="Ej: Andrés Felipe Bravo"></div>
     <div class="ff"><label>Cargo / Rol</label><input id="nuR" placeholder="Ej: Auxiliar de Bodega"></div>
     <div class="ff"><label>Módulos con acceso (Dashboard incluido siempre)</label><div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:4px">${mOpts}</div></div>`,
    `<button class="btn btn-o btn-sm" onclick="closeMod()">Cancelar</button>
     <button class="btn btn-sm" style="background:#0F172A;color:#fff" onclick="crearUsuario()"><i class="ri-check-line"></i> Crear</button>`
  );
}
function crearUsuario(){
  const nm=$('nuN').value.trim(),rl=$('nuR').value.trim();
  if(!nm||!rl){toast('Completa nombre y cargo','warn');return}
  const pts=nm.split(' ');const init=((pts[0]||'')[0]+((pts[1]||pts[0]||'')[0])).toUpperCase();
  const cls=['#D9383A','#0369A1','#15803D','#7C3AED','#B45309','#0E7C66'];
  const id='u'+Date.now();
  const mods=['dashboard',...[...document.querySelectorAll('.nuMod:checked')].map(c=>c.value)];
  const colors=['#D9383A','#0369A1','#15803D','#B45309','#7C3AED','#2D3748','#0E7C66','#BE185D'];
  USERS.push({id,n:nm,r:rl,in:init,c:colors[USERS.length%colors.length]});
  PERMS[id]=mods;
  closeMod();refresh();toast('Usuario creado. Ingresa con el número '+USERS.length,'ok');
}