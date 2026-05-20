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
const pedEstLabel=e=>({pendiente:'Pendiente',asignado:'Asignado',resagado:'Rezago por Stock',parcial_asignado:'Parcial (Asignado)',parcial_resagado:'Parcial (Rezago)',despachado:'Despachado Total'})[e]||e;
const pedEstBadge=e=>({pendiente:'bs',asignado:'bb',resagado:'by',parcial_asignado:'bi',parcial_resagado:'by',despachado:'bg'})[e]||'bs';
const compEstLabel=e=>({borrador:'Borrador',transito:'En tránsito',recibida:'Recibida sin reclamar',reclamada:'Reclamada'})[e]||e;
const compEstBadge=e=>({borrador:'bs',transito:'bb',recibida:'by',reclamada:'bg'})[e]||'bs';
const trEstLabel=e=>({solicitada:'Solicitada',autorizada:'Autorizada',despachada:'Despachada',recibida:'Recibida'})[e]||e;