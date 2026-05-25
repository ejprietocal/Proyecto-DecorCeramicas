/* ========================= MODULES / USERS / PERMS ========================= */
const MODS={
  dashboard:    {n:'Dashboard',            ic:'ri-dashboard-line',          g:'Principal',       cr:'Inicio',                     desc:'Panel principal con indicadores y resumen operativo'},
  pedidos:      {n:'Pedidos de Venta',     ic:'ri-send-plane-line',         g:'Ventas',          cr:'Ventas · Pedidos',           desc:'Gestión de pedidos, asignación de stock y despachos'},
  inventario:   {n:'Inventario',           ic:'ri-archive-2-line',          g:'Bodega',          cr:'Bodega · Inventario',        desc:'Stock por bodega, ajustes y control de existencias'},
  sobrantes:    {n:'Sobrantes',            ic:'ri-question-line',           g:'Bodega',          cr:'Bodega · Sobrantes',         desc:'Productos sin origen claro, pendientes de identificar'},
  movimientos:  {n:'Movimientos',          ic:'ri-swap-box-line',           g:'Bodega',          cr:'Bodega · Movimientos',       desc:'Historial de entradas, salidas y transferencias'},
  transferencias:{n:'Transferencias',      ic:'ri-arrow-left-right-line',   g:'Bodega',          cr:'Bodega · Transferencias',    desc:'Flujo de stock entre bodegas: solicitar, autorizar, recibir'},
  proveedores:  {n:'Proveedores',          ic:'ri-truck-line',              g:'Abastecimiento',  cr:'Abastecimiento · Proveedores', desc:'Catálogo de proveedores activos y su información'},
  compras:      {n:'Órdenes de Compra',    ic:'ri-shopping-cart-2-line',    g:'Abastecimiento',  cr:'Abastecimiento · Compras',   desc:'Órdenes de compra a proveedores, recepción y reclamación'},
  reclamar:     {n:'Mercancía por Reclamar',ic:'ri-inbox-unarchive-line',  g:'Abastecimiento',  cr:'Abastecimiento · Por reclamar', desc:'OC recibidas pendientes de reclamar y pasar a inventario'},
  vencimientos: {n:'Vencimientos',         ic:'ri-time-line',               g:'Abastecimiento',  cr:'Abastecimiento · Vencimientos', desc:'Control de fechas de caducidad y bajas por vencimiento'},
  facturas:     {n:'Facturación',          ic:'ri-file-list-3-line',        g:'Facturación',     cr:'Facturación · Facturas',     desc:'Facturas de venta, compra y documentos de OC'},
  notas:        {n:'Notas Crédito/Débito', ic:'ri-swap-2-line',             g:'Facturación',     cr:'Facturación · Notas',        desc:'Notas crédito y débito vinculadas a facturas'},
  cotizaciones: {n:'Cotizaciones',         ic:'ri-file-text-line',          g:'Facturación',     cr:'Facturación · Cotizaciones', desc:'Cotizaciones / proformas convertibles en pedidos'},
  remisiones:   {n:'Remisiones / Albaranes',ic:'ri-truck-line',            g:'Facturación',     cr:'Facturación · Remisiones',   desc:'Documentos de traslado físico de mercancía'},
  cliente:      {n:'Vista 360° Cliente',  ic:'ri-user-star-line',          g:'Ventas',          cr:'Ventas · Cliente 360°',     desc:'Ficha consolidada por cliente: cotizaciones, pedidos, facturas y mercancía pendiente'},
  configuracion:{n:'Configuración',       ic:'ri-settings-3-line',         g:'Configuración',   cr:'Configuración',              desc:'Usuarios, prefijos, unidades, categorías, grupos de conversión y más'}
};
const GROUPS=['Principal','Ventas','Facturación','Bodega','Abastecimiento','Configuración'];
const USERS=[
  {id:'carlos',n:'Carlos Andrés Rojas',  r:'Administrador del Sistema', in:'CR',c:'#4F46E5'},
  {id:'maria',  n:'María Fernanda López', r:'Jefe de Bodega',             in:'ML',c:'#0284C7'},
  {id:'diego',  n:'Diego A. Muñoz',       r:'Auxiliar de Recepción',      in:'DM',c:'#16A34A'},
  {id:'sandra', n:'Sandra P. Gómez',      r:'Coordinadora de Compras',    in:'SG',c:'#D97706'},
  {id:'jhon',   n:'Jhon E. Castillo',     r:'Operario de Despacho',       in:'JC',c:'#7C3AED'},
  {id:'luisa',  n:'Luisa M. Torres',      r:'Auditora / Control Interno', in:'LT',c:'#DB2777'},
  {id:'andrea', n:'Andrea Z. Burbano',    r:'Asesora de Ventas (Sala)',   in:'AZ',c:'#0EA5E9'},
  {id:'miguel', n:'Miguel P. Suárez',     r:'Cajero Principal',           in:'MS',c:'#10B981'}
];
let PERMS={
  carlos: ['dashboard','pedidos','inventario','sobrantes','movimientos','transferencias','proveedores','compras','reclamar','vencimientos','facturas','notas','cotizaciones','remisiones','cliente','configuracion'],
  maria:  ['dashboard','pedidos','inventario','sobrantes','movimientos','transferencias','proveedores','compras','reclamar','vencimientos','facturas','notas','cotizaciones','remisiones','cliente','configuracion'],
  diego:  ['dashboard','inventario','reclamar','movimientos','remisiones','cliente'],
  sandra: ['dashboard','proveedores','compras','reclamar','pedidos','facturas','notas','cotizaciones','cliente'],
  jhon:   ['dashboard','pedidos','movimientos','remisiones','sobrantes','cliente'],
  luisa:  ['dashboard','sobrantes','vencimientos','movimientos','inventario','facturas','notas','cliente','configuracion'],
  andrea: ['dashboard','cotizaciones','pedidos','cliente','remisiones','inventario'],
  miguel: ['dashboard','facturas','notas','cotizaciones','pedidos','cliente','remisiones']
};