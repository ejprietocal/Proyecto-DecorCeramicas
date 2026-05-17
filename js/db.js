/* ========================= BASE DE DATOS ========================= */
const DB_KEY='decorceramica_db';
const AUTH_KEY='decorceramica_user';

const DB={
  bodegas:[
    {id:'BGA',n:'Bodega A - Norte',  dir:'Calle 45 #12-34',area:1200,estado:'verde'},
    {id:'BGB',n:'Bodega B - Sur',    dir:'Cra 18 #56-78',  area:900, estado:'verde'},
    {id:'BGC',n:'Bodega C - Centro', dir:'Av. Panamericana',area:750, estado:'amarillo'},
    {id:'BGD',n:'Bodega D - Occidente',dir:'Zona Industrial',area:600,estado:'rojo'}
  ],
  productos:[
    {sku:'PC-6060-BE',n:'Piso Cerámico 60×60',    ic:'ri-grid-line',    cat:'Pisos',        precio:28500, costo:18000, descuento_max:15, u:'m²',  caja:1.44, cajaN:'caja', grad:'linear-gradient(135deg,#D9383A,#7F1D1D)'},
    {sku:'AZ-3060-BL',n:'Azulejo Baño 30×60',     ic:'ri-layout-grid-line',cat:'Azulejos',  precio:22300, costo:14000, descuento_max:10, u:'m²',  caja:1.44, cajaN:'caja', grad:'linear-gradient(135deg,#1D4ED8,#0F2D7A)'},
    {sku:'RV-2550-GR',n:'Revestimiento Pared',     ic:'ri-stack-line',   cat:'Revestimientos',precio:35800, costo:22000, descuento_max:10, u:'m²',  caja:1.25, cajaN:'caja', grad:'linear-gradient(135deg,#065F46,#022C22)'},
    {sku:'GR-LM-CROM',n:'Grifo Lavamanos',         ic:'ri-drop-line',    cat:'Grifería',     precio:45200, costo:30000, descuento_max:20, u:'unid',caja:10,   cajaN:'caja x10', grad:'linear-gradient(135deg,#B45309,#451A03)'},
    {sku:'GR-CM-CROM',n:'Grifo Cocina Monomando',  ic:'ri-drop-line',    cat:'Grifería',     precio:52000, costo:35000, descuento_max:20, u:'unid',caja:10,   cajaN:'caja x10', grad:'linear-gradient(135deg,#7C3AED,#3B0764)'},
    {sku:'AD-PORC-25', n:'Adhesivo Porcelana 25kg',ic:'ri-paint-fill',   cat:'Adhesivos',    precio:38000, costo:25000, descuento_max:10, u:'sacos',caja:40,  cajaN:'pale', grad:'linear-gradient(135deg,#0369A1,#082F49)'}
  ],
  stock:{
    BGA:{'PC-6060-BE':5000,'AZ-3060-BL':4000,'RV-2550-GR':2000,'GR-LM-CROM':40,'AD-PORC-25':60},
    BGB:{'PC-6060-BE':2000,'AZ-3060-BL':3000,'RV-2550-GR':1500,'GR-CM-CROM':30,'AD-PORC-25':40},
    BGC:{'PC-6060-BE':500, 'AZ-3060-BL':800, 'GR-LM-CROM':20, 'GR-CM-CROM':10},
    BGD:{'PC-6060-BE':80,  'GR-LM-CROM':5}
  },
  proveedores:[
    {id:'PR-01',n:'Cerámica Nariño',   cat:'Pisos y revestimientos',ciudad:'Ipiales',contacto:'Luis Erazo',  tel:'315 442 1180',calif:4.6,estado:'Activo'},
    {id:'PR-02',n:'Pegantes del Sur',  cat:'Adhesivos y morteros',  ciudad:'Pasto',  contacto:'Marta Ruiz',  tel:'320 778 0094',calif:4.2,estado:'Activo'},
    {id:'PR-03',n:'Hidro Import',      cat:'Grifería',              ciudad:'Cali',   contacto:'Andrés Polo', tel:'301 556 7723',calif:3.8,estado:'Observado'}
  ],
  compras:[
    {id:'OC-2451',provId:'PR-02',fecha:'12/04/2026',estado:'reclamada',recibPor:'Diego Muñoz',reclPor:'María López',
     items:[{sku:'AD-PORC-25',n:'Adhesivo Porcelana 25kg',cant:100,u:'sacos',precio:38000}]},
    {id:'OC-2462',provId:'PR-01',fecha:'28/04/2026',estado:'recibida',recibPor:'Diego Muñoz',reclPor:null,
     items:[{sku:'RV-2550-GR',n:'Revestimiento Pared',cant:500,u:'m²',precio:35800}]},
    {id:'OC-2470',provId:'PR-01',fecha:'09/05/2026',estado:'transito',recibPor:null,reclPor:null,
     items:[{sku:'PC-6060-BE',n:'Piso Cerámico 60×60',cant:1200,u:'m²',precio:28500}]}
  ],
  pedidos:[
    {id:'PD-3401',cliente:'Constructora Ipiales',fecha:'17/05/2026',estado:'resagado',despPor:null,
     items:[{sku:'PC-6060-BE',cant:8000,bodega:null,asig:0,falt:8000},{sku:'AD-PORC-25',cant:30,bodega:'BGA',asig:30,falt:0}]},
    {id:'PD-3398',cliente:'Remodelaciones Sur',  fecha:'16/05/2026',estado:'asignado',despPor:null,
     items:[{sku:'AZ-3060-BL',cant:400,bodega:'BGA',asig:400,falt:0}]},
    {id:'PD-3390',cliente:'Hogar & Diseño',      fecha:'14/05/2026',estado:'despachado',despPor:'Jhon Castillo',
     items:[{sku:'GR-LM-CROM',cant:20,bodega:'BGA',asig:20,falt:0}]}
  ],
  transferencias:[
    {id:'TR-001',org:'BGD',dst:'BGA',fecha:'15/05/2026',estado:'recibida',solPor:'María López',autPor:'Carlos Rojas',despPor:'Diego Muñoz',recibPor:'Diego Muñoz',
     items:[{sku:'PC-6060-BE',n:'Piso Cerámico 60×60',cant:200,u:'m²'}]}
  ],
  movimientos:[
    {f:'14/05 15:20',sku:'GR-LM-CROM',n:'Grifo Lavamanos',tipo:'Salida',cant:20,u:'unid',resp:'Jhon Castillo',ref:'PD-3390',bodega:'BGA',est:'Completado'},
    {f:'12/05 09:00',sku:'AD-PORC-25', n:'Adhesivo Porcelana',tipo:'Entrada',cant:100,u:'sacos',resp:'Diego Muñoz',ref:'OC-2451',bodega:'BGA',est:'Completado'},
    {f:'15/05 11:30',sku:'PC-6060-BE', n:'Piso Cerámico 60×60',tipo:'Transferencia',cant:200,u:'m²',resp:'Diego Muñoz',ref:'TR-001',bodega:'BGA→BGA',est:'Completado'}
  ],
  sobrantes:[
    {id:'SB-01',ubic:'Pasillo C - Est.14',   cont:'Cajas grifería sin marca',  cant:'22 cajas',    cant_sec:'2 cajas x10', costo_est:990000,  det:'Hace 12 días',orig:'Devolución cliente',  estado:'Sin identificar',sku:'GR-LM-CROM',add:22,bodega:'BGA'},
    {id:'SB-02',ubic:'Zona D - Piso',         cont:'Pallet cerámica beige',     cant:'180 m²',      cant_sec:'125 cajas',   costo_est:5130000, det:'Hace 28 días',orig:'Sobrante de obra',    estado:'Sin identificar',sku:'PC-6060-BE',add:180,bodega:'BGD'},
    {id:'SB-03',ubic:'Bodega 2 - Rack 7',     cont:'Sacos adhesivo abiertos',   cant:'15 sacos',    cant_sec:'—',           costo_est:570000,  det:'Hace 41 días',orig:'Compra duplicada',   estado:'En investigación',sku:'AD-PORC-25',add:15,bodega:'BGB'},
    {id:'SB-04',ubic:'Estante A-3',           cont:'Azulejo blanco 30×60',      cant:'320 m²',      cant_sec:'222 cajas',   costo_est:7136000, det:'Hace 6 días', orig:'Exceso compra',     estado:'Sin identificar',sku:'AZ-3060-BL',add:320,bodega:'BGA'},
    {id:'SB-05',ubic:'Muelle 2',              cont:'Grifos cocina monomando',    cant:'14 unid',     cant_sec:'1 caja x10',  costo_est:728000,  det:'Hace 9 días', orig:'Devolución cliente',  estado:'Sin identificar',sku:'GR-CM-CROM',add:14,bodega:'BGC'},
    {id:'SB-06',ubic:'Pasillo B - Est.8',     cont:'Revestimiento piedra 25×50',cant:'95 m²',       cant_sec:'76 cajas',    costo_est:3401000, det:'Hace 15 días',orig:'Sobrante de obra',    estado:'En investigación',sku:'RV-2550-GR',add:95,bodega:'BGA'},
    {id:'SB-07',ubic:'Zona E - Pallet 3',     cont:'Adhesivo porcelana sellado', cant:'40 sacos',    cant_sec:'1 pale',      costo_est:1520000, det:'Hace 5 días', orig:'Compra duplicada',   estado:'Sin identificar',sku:'AD-PORC-25',add:40,bodega:'BGB'},
    {id:'SB-08',ubic:'Almacén norte',         cont:'Piso cerámico madera 45×45', cant:'240 m²',      cant_sec:'167 cajas',   costo_est:6840000, det:'Hace 3 días', orig:'Exceso producción',   estado:'Sin identificar',sku:'PC-6060-BE',add:240,bodega:'BGA'},
    {id:'SB-09',ubic:'Rack 12 - Nivel 3',     cont:'Grifos lavamanos cromados',  cant:'8 unid',      cant_sec:'—',           costo_est:361600,  det:'Hace 20 días',orig:'Devolución cliente',  estado:'Reintegrado',   sku:'GR-LM-CROM',add:8,bodega:'BGA'},
    {id:'SB-10',ubic:'Pasillo D - Piso',      cont:'Cerámica beige 33×33',      cant:'500 m²',      cant_sec:'347 cajas',   costo_est:14250000,det:'Hace 2 días', orig:'Sobrante de obra',    estado:'Sin identificar',sku:'PC-6060-BE',add:500,bodega:'BGD'},
    {id:'SB-11',ubic:'Estante B-7',           cont:'Azulejo decorativo 20×30',  cant:'120 m²',      cant_sec:'100 cajas',   costo_est:2676000, det:'Hace 18 días',orig:'Exceso compra',     estado:'En investigación',sku:'AZ-3060-BL',add:120,bodega:'BGC'},
    {id:'SB-12',ubic:'Muelle 1',              cont:'Mortero impermeable 40kg',  cant:'25 sacos',    cant_sec:'—',           costo_est:875000,  det:'Hace 7 días', orig:'Compra duplicada',   estado:'Sin identificar',sku:'AD-PORC-25',add:25,bodega:'BGA'},
    {id:'SB-13',ubic:'Zona F - Pallet 7',     cont:'Piso porcelanato 60×60',    cant:'360 m²',      cant_sec:'250 cajas',   costo_est:10260000,det:'Hace 4 días', orig:'Sobrante de obra',    estado:'Sin identificar',sku:'PC-6060-BE',add:360,bodega:'BGA'},
    {id:'SB-14',ubic:'Rack 5 - Nivel 2',      cont:'Grifo cocina dorado',        cant:'5 unid',      cant_sec:'—',           costo_est:260000,  det:'Hace 35 días',orig:'Devolución cliente',  estado:'Reintegrado',   sku:'GR-CM-CROM',add:5,bodega:'BGD'},
    {id:'SB-15',ubic:'Pasillo A - Est.2',     cont:'Revestimiento texturado',    cant:'65 m²',       cant_sec:'52 cajas',    costo_est:2327000, det:'Hace 22 días',orig:'Sobrante de obra',    estado:'Reintegrado',   sku:'RV-2550-GR',add:65,bodega:'BGA'},
    {id:'SB-16',ubic:'Bodega 3 - Rack 9',     cont:'Adhesivo cerámico gris',     cant:'30 sacos',    cant_sec:'—',           costo_est:1140000, det:'Hace 11 días',orig:'Compra duplicada',   estado:'En investigación',sku:'AD-PORC-25',add:30,bodega:'BGB'},
    {id:'SB-17',ubic:'Zona C - Piso',         cont:'Pallet mixto cerámica',      cant:'150 m²',      cant_sec:'104 cajas',   costo_est:4275000, det:'Hace 16 días',orig:'Devolución cliente',  estado:'Sin identificar',sku:'PC-6060-BE',add:150,bodega:'BGD'},
    {id:'SB-18',ubic:'Estante D-5',           cont:'Azulejo cocina 20×30',       cant:'200 m²',      cant_sec:'139 cajas',   costo_est:4460000, det:'Hace 8 días', orig:'Exceso compra',     estado:'En investigación',sku:'AZ-3060-BL',add:200,bodega:'BGA'},
    {id:'SB-19',ubic:'Muelle 3',              cont:'Grifos varios surtidos',     cant:'18 unid',     cant_sec:'1 caja x10',  costo_est:813600,  det:'Hace 13 días',orig:'Devolución cliente',  estado:'Sin identificar',sku:'GR-LM-CROM',add:18,bodega:'BGC'},
    {id:'SB-20',ubic:'Pasillo E - Est.6',     cont:'Cerámica esmaltada 45×45',   cant:'280 m²',      cant_sec:'194 cajas',   costo_est:7980000, det:'Hace 10 días',orig:'Sobrante de obra',    estado:'Sin identificar',sku:'PC-6060-BE',add:280,bodega:'BGA'}
  ],
  vencimientos:[
    {lote:'L-AD-0091',prod:'Adhesivo Porcelana 25kg',sku:'AD-PORC-25',cant:'40 sacos',bodega:'BGA',vence:'30/05/2026',dias:13},
    {lote:'L-MO-0044',prod:'Mortero Impermeable',sku:'',cant:'25 sacos',bodega:'BGB',vence:'11/06/2026',dias:25},
    {lote:'L-SE-0012',prod:'Sellador Epóxico',sku:'',cant:'18 unid',bodega:'BGA',vence:'03/06/2026',dias:17},
    {lote:'L-PE-0007',prod:'Pintura Epóxica Piso',sku:'',cant:'12 galones',bodega:'BGC',vence:'08/05/2026',dias:-9},
    {lote:'L-AD-0102',prod:'Adhesivo Cerámico Gris',sku:'',cant:'60 sacos',bodega:'BGD',vence:'22/08/2026',dias:97}
  ]
};
let OC_SEQ=2471,PD_SEQ=3402,TR_SEQ=2;
let currentUser=null,selBodega='BGA';

/* ---- persistencia localStorage ---- */
(function(){
  try{
    const saved=localStorage.getItem(DB_KEY);
    if(saved){
      const data=JSON.parse(saved);
      const meta=data._meta||{};
      delete data._meta;
      Object.keys(data).forEach(k=>{DB[k]=data[k]});
      OC_SEQ=meta.OC_SEQ||OC_SEQ;
      PD_SEQ=meta.PD_SEQ||PD_SEQ;
      TR_SEQ=meta.TR_SEQ||TR_SEQ;
    }
  }catch(e){}
})();

function saveDB(){
  try{
    localStorage.setItem(DB_KEY,JSON.stringify({...DB,_meta:{OC_SEQ,PD_SEQ,TR_SEQ}}));
  }catch(e){}
}
window.addEventListener('beforeunload',saveDB);