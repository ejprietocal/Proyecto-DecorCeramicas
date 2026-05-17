/* ========================= MODULES / USERS / PERMS ========================= */
const MODS={
  dashboard:    {n:'Dashboard',            ic:'ri-dashboard-line',          g:'Principal',       cr:'Inicio'},
  pedidos:      {n:'Pedidos de Venta',     ic:'ri-send-plane-line',         g:'Ventas',          cr:'Ventas · Pedidos'},
  inventario:   {n:'Inventario',           ic:'ri-archive-2-line',          g:'Bodega',          cr:'Bodega · Inventario'},
  sobrantes:    {n:'Sobrantes',            ic:'ri-question-line',           g:'Bodega',          cr:'Bodega · Sobrantes'},
  movimientos:  {n:'Movimientos',          ic:'ri-swap-box-line',           g:'Bodega',          cr:'Bodega · Movimientos'},
  transferencias:{n:'Transferencias',      ic:'ri-arrow-left-right-line',   g:'Bodega',          cr:'Bodega · Transferencias'},
  proveedores:  {n:'Proveedores',          ic:'ri-truck-line',              g:'Abastecimiento',  cr:'Abastecimiento · Proveedores'},
  compras:      {n:'Órdenes de Compra',    ic:'ri-shopping-cart-2-line',    g:'Abastecimiento',  cr:'Abastecimiento · Compras'},
  reclamar:     {n:'Mercancía por Reclamar',ic:'ri-inbox-unarchive-line',  g:'Abastecimiento',  cr:'Abastecimiento · Por reclamar'},
  vencimientos: {n:'Vencimientos',         ic:'ri-time-line',               g:'Abastecimiento',  cr:'Abastecimiento · Vencimientos'},
  usuarios:     {n:'Usuarios y Roles',     ic:'ri-shield-user-line',        g:'Sistema',         cr:'Sistema · Usuarios'}
};
const GROUPS=['Principal','Ventas','Bodega','Abastecimiento','Sistema'];
const USERS=[
  {id:'carlos',n:'Carlos Andrés Rojas',  r:'Administrador del Sistema', in:'CR',c:'#D9383A'},
  {id:'maria',  n:'María Fernanda López', r:'Jefe de Bodega',             in:'ML',c:'#0369A1'},
  {id:'diego',  n:'Diego A. Muñoz',       r:'Auxiliar de Recepción',      in:'DM',c:'#15803D'},
  {id:'sandra', n:'Sandra P. Gómez',      r:'Coordinadora de Compras',    in:'SG',c:'#B45309'},
  {id:'jhon',   n:'Jhon E. Castillo',     r:'Operario de Despacho',       in:'JC',c:'#7C3AED'},
  {id:'luisa',  n:'Luisa M. Torres',      r:'Auditora / Control Interno', in:'LT',c:'#2D3748'}
];
let PERMS={
  carlos: ['dashboard','pedidos','inventario','sobrantes','movimientos','transferencias','proveedores','compras','reclamar','vencimientos','usuarios'],
  maria:  ['dashboard','pedidos','inventario','sobrantes','movimientos','transferencias','proveedores','compras','reclamar','vencimientos'],
  diego:  ['dashboard','inventario','reclamar','movimientos'],
  sandra: ['dashboard','proveedores','compras','reclamar','pedidos'],
  jhon:   ['dashboard','pedidos','movimientos'],
  luisa:  ['dashboard','sobrantes','vencimientos','movimientos','inventario']
};