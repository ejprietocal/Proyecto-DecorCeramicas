/* ========================= HELPERS ========================= */
const $=id=>document.getElementById(id);
const fmt=n=>(+n).toLocaleString('es-CO');
const money=n=>'$'+(+n).toLocaleString('es-CO');
const now=()=>{const d=new Date();return d.getDate()+'/'+(d.getMonth()+1)+' '+d.getHours()+':'+String(d.getMinutes()).padStart(2,'0')};
const prods=()=>DB.productos;
const getProd=sku=>DB.productos.find(p=>p.sku===sku);
const getProv=id=>DB.proveedores.find(p=>p.id===id)||{n:'—'};
const stockTotal=sku=>Object.values(DB.stock).reduce((s,b)=>s+(b[sku]||0),0);
const stockBodega=(bg,sku)=>(DB.stock[bg]&&DB.stock[bg][sku])||0;
const bestBodega=sku=>{let best=null,max=-1;DB.bodegas.forEach(b=>{const v=stockBodega(b.id,sku);if(v>max){max=v;best=b.id}});return best};
const bodegaColor=id=>{const b=DB.bodegas.find(x=>x.id===id);return b?b.estado:'verde'};
const ocValor=oc=>oc.items.reduce((s,i)=>s+i.cant*i.precio,0);
const pedEstLabel=e=>({pendiente:'Pendiente',asignado:'Asignado',resagado:'Rezago por Stock',parcial_asignado:'Parcial (Asignado)',parcial_resagado:'Parcial (Rezago)',parcial_despachado:'Despacho Parcial',despachado:'Despachado Total'})[e]||e;
const pedEstBadge=e=>({pendiente:'bs',asignado:'bb',resagado:'by',parcial_asignado:'bi',parcial_resagado:'by',parcial_despachado:'bi',despachado:'bg'})[e]||'bs';
const pedEstIcon=e=>({pendiente:'ri-time-line',asignado:'ri-check-line',resagado:'ri-alert-line',parcial_asignado:'ri-stack-line',parcial_resagado:'ri-error-warning-line',parcial_despachado:'ri-archive-stack-line',despachado:'ri-checkbox-circle-line'})[e]||'ri-circle-line';
const compEstLabel=e=>({borrador:'Borrador',transito:'En tránsito',recibida:'Recibida sin reclamar',reclamada:'Reclamada'})[e]||e;
const compEstBadge=e=>({borrador:'bs',transito:'bb',recibida:'by',reclamada:'bg'})[e]||'bs';
const trEstLabel=e=>({solicitada:'Solicitada',autorizada:'Autorizada',despachada:'Despachada',recibida:'Recibida'})[e]||e;
const getCliente=id=>DB.clientes.find(c=>c.id===id)||{n:'—'};
const fvEstLabel=e=>({emitida:'Emitida',anulada:'Anulada',pagada:'Pagada'})[e]||e;
const fvEstBadge=e=>({emitida:'bb',anulada:'br',pagada:'bg'})[e]||'bs';
const fcEstLabel=e=>({recibida:'Recibida',en_disputa:'En Disputa',pagada:'Pagada'})[e]||e;
const fcEstBadge=e=>({recibida:'bb',en_disputa:'by',pagada:'bg'})[e]||'bs';
const ndTipoLabel=e=>({credito:'Crédito',debito:'Débito'})[e]||e;
const ctEstLabel=e=>({borrador:'Borrador',enviada:'Enviada',aceptada:'Aceptada',rechazada:'Rechazada',vencida:'Vencida'})[e]||e;
const ctEstBadge=e=>({borrador:'bs',enviada:'bb',aceptada:'bg',rechazada:'br',vencida:'by'})[e]||'bs';
const occEstLabel=e=>({pendiente:'Pendiente',aprobada:'Aprobada',remisionada:'Remisionada',cancelada:'Cancelada'})[e]||e;
const occEstBadge=e=>({pendiente:'bs',aprobada:'bb',remisionada:'bg',cancelada:'br'})[e]||'bs';
const rmEstLabel=e=>({pendiente:'Pendiente',en_proceso:'En Proceso',despachada:'Despachada',entregada:'Entregada'})[e]||e;
const rmEstBadge=e=>({pendiente:'bs',en_proceso:'bb',despachada:'by',entregada:'bg'})[e]||'bs';
const getPrefijo=tipo=>DB.config.prefijos.find(p=>p.tipo===tipo&&p.activo);
const nextConsecutivo=tipo=>{const p=getPrefijo(tipo);if(!p)return null;const n=p.prefijo+String(p.consecutivo_actual).padStart(4,'0');p.consecutivo_actual++;saveDB();return n};
const getCat=id=>DB.config.categorias.find(c=>c.id===id);
const getSubcat=id=>DB.config.subcategorias.find(s=>s.id===id);
const getUnidad=id=>DB.config.unidades.find(u=>u.id===id);
const getPuntoVenta=id=>DB.config.puntos_venta.find(p=>p.id===id);
const getCategoriasActivas=()=>DB.config.categorias.filter(c=>c.activo);
const getSubcatsByCat=catId=>DB.config.subcategorias.filter(s=>s.categoria_id===catId&&s.activo);
const getGrupoConversion=id=>DB.config.grupos_conversion.find(g=>g.id===id);
const getProductoGrupo=prod=>prod.grupo_conversion_id?getGrupoConversion(prod.grupo_conversion_id):null;
const convertirAUnidadBase=(grupoId,unidadId,cantidad)=>{
  const g=getGrupoConversion(grupoId);
  if(!g)return cantidad;
  const u=g.unidades.find(x=>x.unidad_id===unidadId);
  return u?cantidad/u.factor:cantidad;
};

/* ---- helpers de cliente y trazabilidad ---- */
const getClienteById=id=>DB.clientes.find(c=>c.id===id);
const findClienteByNombre=n=>{if(!n)return null;const t=n.trim().toLowerCase();return DB.clientes.find(c=>c.n.trim().toLowerCase()===t)||null;};
const clienteNombre=doc=>{if(!doc)return '—';if(doc.clienteId){const c=getClienteById(doc.clienteId);if(c)return c.n;}return doc.cliente||doc.clienteNombre||'—';};
const sameCliente=(doc,clienteId)=>{if(!doc||!clienteId)return false;if(doc.clienteId===clienteId)return true;const c=getClienteById(clienteId);if(!c)return false;const nm=(doc.cliente||doc.clienteNombre||'').trim().toLowerCase();return nm===c.n.trim().toLowerCase();};
const cotsByCliente=id=>DB.cotizaciones.filter(d=>sameCliente(d,id));
const occByCliente=id=>DB.ordenes_compra_cliente.filter(d=>sameCliente(d,id));
const pedsByCliente=id=>DB.pedidos.filter(d=>sameCliente(d,id));
const remByCliente=id=>DB.remisiones.filter(d=>sameCliente(d,id));
const fvByCliente=id=>DB.facturas_venta.filter(d=>sameCliente(d,id));
const reservasByCliente=id=>(DB.reservas_cliente||[]).filter(r=>r.clienteId===id&&r.estado!=='completado');
const sobrantesByCliente=id=>DB.sobrantes.filter(s=>s.clienteId===id);
const totalCompradoCliente=id=>fvByCliente(id).reduce((s,f)=>s+(f.total||0),0);
const valorReservasCliente=id=>reservasByCliente(id).reduce((s,r)=>{const p=getProd(r.sku);return s+(r.cantidad-(r.entregadoAcumulado||0))*(p?.precio||0);},0);

/* ---- helpers de entrega parcial ---- */
const pedidoEntregado=p=>(p.items||[]).reduce((s,i)=>s+(i.entregado||0),0);
const pedidoTotal=p=>(p.items||[]).reduce((s,i)=>s+(i.cant||0),0);
const pedidoPorcentaje=p=>{const t=pedidoTotal(p);return t?Math.round((pedidoEntregado(p)/t)*100):0;};
const pedidoTienePendienteRetiro=p=>(p.items||[]).some(i=>(i.entregado||0)>0&&(i.entregado||0)<(i.cant||0))||p.estado==='parcial_despachado';

/* ---- helpers de sobrantes (M7) ---- */
const sobranteDiasEnEstado=s=>{if(typeof s.diasEnEstado==='number')return s.diasEnEstado;const m=(s.det||'').match(/\d+/);return m?parseInt(m[0]):0;};
const sobranteTipoLabel=t=>({reserva_cliente:'Pendiente retiro cliente',devolucion:'Devolución cliente',excedente:'Excedente / Error compra',desconocido:'Sin identificar'})[t]||t||'Sin identificar';
const sobranteTipoBadge=t=>({reserva_cliente:'by',devolucion:'bi',excedente:'bs',desconocido:'br'})[t]||'bs';
const sobranteEdadColor=d=>d<=7?'var(--success-txt)':d<=15?'var(--warn-txt)':d<=30?'#EA580C':'var(--danger-txt)';
const sobranteDeriveTipo=s=>{if(s.tipo)return s.tipo;const o=(s.orig||'').toLowerCase();if(o.includes('devoluc'))return 'devolucion';if(o.includes('obra'))return 'reserva_cliente';if(o.includes('compra')||o.includes('exceso')||o.includes('producci'))return 'excedente';return 'desconocido';};

/* ---- audit log ---- */
const AUDIT_SEQ_KEY='_alSeq';
const logEvent=(modulo,accion,entidad,refId,descripcion,cambios)=>{
  if(!DB.auditlog)DB.auditlog=[];
  const n=(DB.auditlog.length?DB.auditlog.length:0)+1;
  const id='AL-'+String(n).padStart(4,'0');
  const u=currentUser||{id:'sistema',n:'Sistema'};
  DB.auditlog.unshift({id,timestamp:now(),usuarioId:u.id,usuarioNombre:u.n,modulo,accion,entidad,refId,descripcion:descripcion||'',cambios:cambios||null});
  saveDB();
};

/* ---- reservas de cliente ---- */
const RC_SEQ_KEY='_rcSeq';
const crearReservaCliente=(clienteId,clienteNombre,sku,cantidad,bodega,pedidoRef)=>{
  if(!DB.reservas_cliente)DB.reservas_cliente=[];
  const n=DB.reservas_cliente.length+1;
  const id='RC-'+String(n).padStart(3,'0');
  const r={id,clienteId,clienteNombre,sku,cantidad,bodega,pedidoRef,fechaReserva:now(),entregadoAcumulado:0,estado:'pendiente_retiro',ultimaEntregaEn:null};
  DB.reservas_cliente.unshift(r);
  return r;
};
const completarReserva=(rcId,cantidadEntregada)=>{
  const r=(DB.reservas_cliente||[]).find(x=>x.id===rcId);
  if(!r)return;
  r.entregadoAcumulado=(r.entregadoAcumulado||0)+cantidadEntregada;
  r.ultimaEntregaEn=now();
  r.estado=r.entregadoAcumulado>=r.cantidad?'completado':'parcial_retirado';
};
const reservasPendientesBodega=bodega=>(DB.reservas_cliente||[]).filter(r=>r.bodega===bodega&&r.estado!=='completado');

/* ---- severidad notificaciones (M10) ---- */
const SEV={CRITICO:'critico',URGENTE:'urgente',INFO:'info'};
const sevOrder={critico:0,urgente:1,info:2};
const sevColor=s=>({critico:'var(--danger-txt)',urgente:'var(--warn-txt)',info:'var(--info-txt)'})[s]||'var(--mut)';
const sevLabel=s=>({critico:'CRÍTICO',urgente:'URGENTE',info:'INFO'})[s]||s;