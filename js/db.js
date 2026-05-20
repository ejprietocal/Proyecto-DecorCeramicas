/* ========================= BASE DE DATOS ========================= */
const DB_KEY='decorceramica_db';
const AUTH_KEY='decorceramica_user';
const DB_VER=5;

const DB={
  bodegas:[
    {id:'BGA',n:'Bodega A - Norte',  dir:'Calle 45 #12-34',area:1200,estado:'verde'},
    {id:'BGB',n:'Bodega B - Sur',    dir:'Cra 18 #56-78',  area:900, estado:'verde'},
    {id:'BGC',n:'Bodega C - Centro', dir:'Av. Panamericana',area:750, estado:'amarillo'},
    {id:'BGD',n:'Bodega D - Occidente',dir:'Zona Industrial',area:600,estado:'rojo'}
  ],
  productos:[
    {sku:'PC-6060-BE',n:'Piso Cerámico 60×60',      ic:'ri-grid-line',        cat:'Pisos',         precio:28500, costo:18000, descuento_max:15, u:'m²',  caja:1.44, cajaN:'caja',    grad:'linear-gradient(135deg,#D9383A,#7F1D1D)'},
    {sku:'AZ-3060-BL',n:'Azulejo Baño 30×60',       ic:'ri-layout-grid-line',  cat:'Azulejos',     precio:22300, costo:14000, descuento_max:10, u:'m²',  caja:1.44, cajaN:'caja',    grad:'linear-gradient(135deg,#1D4ED8,#0F2D7A)'},
    {sku:'RV-2550-GR',n:'Revestimiento Pared',       ic:'ri-stack-line',       cat:'Revestimientos',precio:35800, costo:22000, descuento_max:10, u:'m²',  caja:1.25, cajaN:'caja',    grad:'linear-gradient(135deg,#065F46,#022C22)'},
    {sku:'GR-LM-CROM',n:'Grifo Lavamanos',           ic:'ri-drop-line',        cat:'Grifería',     precio:45200, costo:30000, descuento_max:20, u:'unid',caja:10,   cajaN:'caja x10',grad:'linear-gradient(135deg,#B45309,#451A03)'},
    {sku:'GR-CM-CROM',n:'Grifo Cocina Monomando',    ic:'ri-drop-line',        cat:'Grifería',     precio:52000, costo:35000, descuento_max:20, u:'unid',caja:10,   cajaN:'caja x10',grad:'linear-gradient(135deg,#7C3AED,#3B0764)'},
    {sku:'AD-PORC-25',n:'Adhesivo Porcelana 25kg',   ic:'ri-paint-fill',       cat:'Adhesivos',    precio:38000, costo:25000, descuento_max:10, u:'sacos',caja:40,  cajaN:'pale',    grad:'linear-gradient(135deg,#0369A1,#082F49)'},
    {sku:'MO-IM-40',  n:'Mortero Impermeable 40kg',  ic:'ri-brick-line',       cat:'Morteros',     precio:35000, costo:22000, descuento_max:10, u:'sacos',caja:50,  cajaN:'pale',    grad:'linear-gradient(135deg,#0E7C66,#064E3B)'},
    {sku:'MO-PEG-25', n:'Mortero Pegacor 25kg',      ic:'ri-brick-line',       cat:'Morteros',     precio:28000, costo:17000, descuento_max:15, u:'sacos',caja:60,  cajaN:'pale',    grad:'linear-gradient(135deg,#047857,#022C22)'},
    {sku:'HR-PT-100', n:'Perfil T para enchape 2.4m',ic:'ri-subtract-line',    cat:'Herrería',     precio:8500,  costo:5000,  descuento_max:20, u:'unid',caja:25,  cajaN:'paquete', grad:'linear-gradient(135deg,#4338CA,#1E1B4B)'},
    {sku:'HR-ES-50',  n:'Escuadra metálica 5×5',     ic:'ri-subtract-line',    cat:'Herrería',     precio:3200,  costo:1800,  descuento_max:25, u:'unid',caja:100, cajaN:'caja',    grad:'linear-gradient(135deg,#6D28D9,#3B0764)'},
    {sku:'EL-CA-10',  n:'Cable eléctrico #10 100m',  ic:'ri-flashlight-line',  cat:'Eléctricos',   precio:125000,costo:85000, descuento_max:10, u:'unid',caja:10,  cajaN:'caja',    grad:'linear-gradient(135deg,#D97706,#78350F)'},
    {sku:'EL-TO-20',  n:'Toma corriente doble polar', ic:'ri-flashlight-line',  cat:'Eléctricos',   precio:4500,  costo:2500,  descuento_max:15, u:'unid',caja:50,  cajaN:'caja',    grad:'linear-gradient(135deg,#F59E0B,#92400E)'},
    {sku:'PT-BL-1',   n:'Pintura Blanca Galaxy 1gal', ic:'ri-palette-line',     cat:'Pinturas',     precio:42000, costo:28000, descuento_max:10, u:'unid',caja:12,  cajaN:'caja',    grad:'linear-gradient(135deg,#0F172A,#334155)'},
    {sku:'PT-ES-1',   n:'Esmalte Sintético 1/4gal',   ic:'ri-palette-line',     cat:'Pinturas',     precio:18500, costo:11000, descuento_max:15, u:'unid',caja:24,  cajaN:'caja',    grad:'linear-gradient(135deg,#1D4ED8,#0F2D7A)'},
    {sku:'SN-LV-40',  n:'Lavamanos Vitreo 40cm',      ic:'ri-drop-line',        cat:'Sanitarios',   precio:89000, costo:55000, descuento_max:10, u:'unid',caja:6,   cajaN:'caja',    grad:'linear-gradient(135deg,#0D9488,#115E59)'},
    {sku:'SN-IN-1',   n:'Inodoro Tanque Bajo',        ic:'ri-drop-line',        cat:'Sanitarios',   precio:210000,costo:140000,descuento_max:10, u:'unid',caja:4,   cajaN:'caja',    grad:'linear-gradient(135deg,#14B8A6,#0F766E)'},
    {sku:'HR-PA-1',   n:'Palustre dentado 8mm',       ic:'ri-tools-line',       cat:'Herramientas', precio:12500, costo:7000,  descuento_max:20, u:'unid',caja:20,  cajaN:'caja',    grad:'linear-gradient(135deg,#78716C,#292524)'},
    {sku:'HR-NV-1',   n:'Nivel láser 3 líneas',       ic:'ri-tools-line',       cat:'Herramientas', precio:165000,costo:98000, descuento_max:15, u:'unid',caja:6,   cajaN:'caja',    grad:'linear-gradient(135deg,#A8A29E,#44403C)'},
    {sku:'PC-4545-BE',n:'Piso Cerámico 45×45 Beige',  ic:'ri-grid-line',        cat:'Pisos',         precio:23500, costo:15000, descuento_max:15, u:'m²',  caja:1.62, cajaN:'caja',    grad:'linear-gradient(135deg,#A16207,#422006)'},
    {sku:'PC-3333-GR',n:'Piso Cerámico 33×33 Gris',   ic:'ri-grid-line',        cat:'Pisos',         precio:19800, costo:12500, descuento_max:15, u:'m²',  caja:1.08, cajaN:'caja',    grad:'linear-gradient(135deg,#525252,#171717)'},
    {sku:'AZ-2020-BL',n:'Azulejo Cocina 20×20 Blanco',ic:'ri-layout-grid-line',  cat:'Azulejos',     precio:18500, costo:11500, descuento_max:10, u:'m²',  caja:1.44, cajaN:'caja',    grad:'linear-gradient(135deg,#E2E8F0,#64748B)'},
    {sku:'AZ-1525-VD',n:'Azulejo Decorativo 15×25',   ic:'ri-layout-grid-line',  cat:'Azulejos',     precio:26500, costo:17000, descuento_max:10, u:'m²',  caja:1.2,  cajaN:'caja',    grad:'linear-gradient(135deg,#059669,#022C22)'},
    {sku:'RV-2040-BE',n:'Revestimiento Piedra 20×40', ic:'ri-stack-line',       cat:'Revestimientos',precio:32500, costo:20000, descuento_max:10, u:'m²',  caja:1.28, cajaN:'caja',    grad:'linear-gradient(135deg,#78716C,#292524)'},
    {sku:'RV-1530-ML',n:'Revestimiento Mármol 15×30', ic:'ri-stack-line',       cat:'Revestimientos',precio:38500, costo:24000, descuento_max:10, u:'m²',  caja:1.35, cajaN:'caja',    grad:'linear-gradient(135deg,#A78BFA,#4C1D95)'},
    {sku:'GR-DU-AL',  n:'Grifo Ducha Aleación',       ic:'ri-drop-line',        cat:'Grifería',     precio:38500, costo:25000, descuento_max:20, u:'unid',caja:10,  cajaN:'caja x10',grad:'linear-gradient(135deg,#0EA5E9,#0C4A6E)'},
    {sku:'GR-LV-DOR', n:'Grifo Lavamanos Dorado',    ic:'ri-drop-line',         cat:'Grifería',     precio:58000, costo:38000, descuento_max:20, u:'unid',caja:10,  cajaN:'caja x10',grad:'linear-gradient(135deg,#B45309,#78350F)'},
    {sku:'AD-FLEX-20',n:'Adhesivo Flexiblanco 20kg',  ic:'ri-paint-fill',       cat:'Adhesivos',    precio:34000, costo:22000, descuento_max:10, u:'sacos',caja:50, cajaN:'pale',    grad:'linear-gradient(135deg,#2563EB,#1E3A5F)'},
    {sku:'AD-CER-GR', n:'Adhesivo Cerámico Gris 25kg',ic:'ri-paint-fill',       cat:'Adhesivos',    precio:32000, costo:20000, descuento_max:10, u:'sacos',caja:40, cajaN:'pale',    grad:'linear-gradient(135deg,#475569,#0F172A)'},
    {sku:'MO-NIV-25', n:'Mortero Nivelador 25kg',     ic:'ri-brick-line',       cat:'Morteros',     precio:31000, costo:19000, descuento_max:15, u:'sacos',caja:60, cajaN:'pale',    grad:'linear-gradient(135deg,#D97706,#78350F)'},
    {sku:'MO-REV-30', n:'Mortero Revestimiento 30kg', ic:'ri-brick-line',       cat:'Morteros',     precio:29000, costo:18000, descuento_max:10, u:'sacos',caja:50, cajaN:'pale',    grad:'linear-gradient(135deg,#0891B2,#164E63)'},
    {sku:'HR-AN-10',  n:'Anclaje metálico 10mm',      ic:'ri-subtract-line',    cat:'Herrería',     precio:2800,  costo:1500,  descuento_max:25, u:'unid',caja:100,cajaN:'caja',    grad:'linear-gradient(135deg,#DC2626,#7F1D1D)'},
    {sku:'HR-PL-3M',  n:'Pletina acero 3m',           ic:'ri-subtract-line',    cat:'Herrería',     precio:12500, costo:7500,  descuento_max:20, u:'unid',caja:20, cajaN:'paquete', grad:'linear-gradient(135deg,#A3A3A3,#404040)'},
    {sku:'EL-IN-15',  n:'Interruptor sencillo 15A',   ic:'ri-flashlight-line',  cat:'Eléctricos',   precio:3800,  costo:2200,  descuento_max:15, u:'unid',caja:50, cajaN:'caja',    grad:'linear-gradient(135deg,#FCD34D,#78350F)'},
    {sku:'EL-CA-12',  n:'Cable trenzado #12 50m',     ic:'ri-flashlight-line',  cat:'Eléctricos',   precio:68000, costo:42000, descuento_max:10, u:'unid',caja:15, cajaN:'caja',    grad:'linear-gradient(135deg,#F97316,#7C2D12)'},
    {sku:'PT-ES-NEG', n:'Esmalte Negro 1/4gal',       ic:'ri-palette-line',     cat:'Pinturas',     precio:19500, costo:12000, descuento_max:15, u:'unid',caja:24, cajaN:'caja',    grad:'linear-gradient(135deg,#171717,#0A0A0A)'},
    {sku:'PT-BARN-1', n:'Barniz Marino 1gal',         ic:'ri-palette-line',     cat:'Pinturas',     precio:52000, costo:34000, descuento_max:10, u:'unid',caja:12, cajaN:'caja',    grad:'linear-gradient(135deg,#92400E,#451A03)'},
    {sku:'SN-LV-60',  n:'Lavamanos Ovalín 60cm',      ic:'ri-drop-line',        cat:'Sanitarios',   precio:125000,costo:78000, descuento_max:10, u:'unid',caja:4,  cajaN:'caja',    grad:'linear-gradient(135deg,#E2E8F0,#334155)'},
    {sku:'SN-SN-1',   n:'Sanitario Tanque Alto',      ic:'ri-drop-line',        cat:'Sanitarios',   precio:185000,costo:120000,descuento_max:10, u:'unid',caja:3,  cajaN:'caja',    grad:'linear-gradient(135deg,#94A3B8,#1E293B)'},
    {sku:'HR-CI-30',  n:'Cincel plano 30mm',          ic:'ri-tools-line',       cat:'Herramientas', precio:8500,  costo:5000,  descuento_max:20, u:'unid',caja:30, cajaN:'caja',    grad:'linear-gradient(135deg,#737373,#262626)'},
    {sku:'HR-MA-5',   n:'Martillo de goma 500g',      ic:'ri-tools-line',       cat:'Herramientas', precio:14500, costo:8500,  descuento_max:20, u:'unid',caja:15, cajaN:'caja',    grad:'linear-gradient(135deg,#DC2626,#450A0A)'},
    {sku:'PC-POR-60', n:'Piso Porcelanato 60×60',     ic:'ri-grid-line',        cat:'Pisos',         precio:42000, costo:28000, descuento_max:15, u:'m²',  caja:1.44, cajaN:'caja',    grad:'linear-gradient(135deg,#0F172A,#334155)'},
    {sku:'AZ-2540-VD',n:'Azulejo Verde 25×40',        ic:'ri-layout-grid-line',  cat:'Azulejos',     precio:20500, costo:13000, descuento_max:10, u:'m²',  caja:1.5,  cajaN:'caja',    grad:'linear-gradient(135deg,#166534,#052E16)'},
    {sku:'RV-3060-BL',n:'Revestimiento Blanco 30×60', ic:'ri-stack-line',       cat:'Revestimientos',precio:34800, costo:21500, descuento_max:10, u:'m²',  caja:1.44, cajaN:'caja',    grad:'linear-gradient(135deg,#F1F5F9,#475569)'},
    {sku:'GR-FO-DOR', n:'Grifo Fregadero Dorado',     ic:'ri-drop-line',        cat:'Grifería',     precio:62500, costo:40000, descuento_max:20, u:'unid',caja:8,  cajaN:'caja x8', grad:'linear-gradient(135deg,#D97706,#78350F)'},
    {sku:'AD-MULTI-1',n:'Adhesivo Multiusos 1kg',     ic:'ri-paint-fill',       cat:'Adhesivos',    precio:12500, costo:7500,  descuento_max:15, u:'unid',caja:30, cajaN:'caja',    grad:'linear-gradient(135deg,#DC2626,#7F1D1D)'},
    {sku:'MO-FR-40',  n:'Mortero Frisbee 40kg',       ic:'ri-brick-line',       cat:'Morteros',     precio:26500, costo:16500, descuento_max:10, u:'sacos',caja:50, cajaN:'pale',    grad:'linear-gradient(135deg,#0EA5E9,#0C4A6E)'},
    {sku:'HR-VA-1M',  n:'Válvula compuerta 1"',       ic:'ri-subtract-line',    cat:'Herrería',     precio:9500,  costo:5800,  descuento_max:20, u:'unid',caja:40, cajaN:'caja',    grad:'linear-gradient(135deg,#F59E0B,#92400E)'},
    {sku:'EL-BR-20',  n:'Breaker 20A bipolar',         ic:'ri-flashlight-line',  cat:'Eléctricos',   precio:8500,  costo:5200,  descuento_max:15, u:'unid',caja:30, cajaN:'caja',    grad:'linear-gradient(135deg,#3B82F6,#1E3A5F)'},
    {sku:'EL-TU-1/2', n:'Tubería PVC 1/2" 3m',        ic:'ri-flashlight-line',  cat:'Eléctricos',   precio:6200,  costo:3800,  descuento_max:15, u:'unid',caja:25, cajaN:'paquete', grad:'linear-gradient(135deg,#78716C,#292524)'},
    {sku:'SN-DU-ECO', n:'Ducha Eléctrica Eco',         ic:'ri-drop-line',        cat:'Sanitarios',   precio:45000, costo:28000, descuento_max:10, u:'unid',caja:8,  cajaN:'caja',    grad:'linear-gradient(135deg,#0284C7,#0C4A6E)'}
  ],
  stock:{
    BGA:{'PC-6060-BE':5000,'AZ-3060-BL':4000,'RV-2550-GR':2000,'GR-LM-CROM':40,'AD-PORC-25':60,'MO-IM-40':120,'MO-PEG-25':200,'HR-PT-100':300,'HR-ES-50':500,'EL-CA-10':25,'EL-TO-20':150,'PT-BL-1':80,'PT-ES-1':45,'SN-LV-40':30,'SN-IN-1':15,'HR-PA-1':60,'HR-NV-1':20,'PC-4545-BE':3500,'PC-3333-GR':2800,'AZ-2020-BL':2500,'AZ-1525-VD':1200,'RV-2040-BE':900,'RV-1530-ML':600,'GR-DU-AL':35,'GR-LV-DOR':25,'AD-FLEX-20':80,'AD-CER-GR':100,'MO-NIV-25':90,'MO-REV-30':70,'HR-AN-10':600,'HR-PL-3M':150,'EL-IN-15':200,'EL-CA-12':18,'PT-ES-NEG':35,'PT-BARN-1':40,'SN-LV-60':12,'SN-SN-1':8,'HR-CI-30':100,'HR-MA-5':45,'PC-POR-60':1200,'AZ-2540-VD':800,'RV-3060-BL':650,'GR-FO-DOR':15,'AD-MULTI-1':200,'MO-FR-40':55,'HR-VA-1M':120,'EL-BR-20':90,'EL-TU-1/2':180,'SN-DU-ECO':25},
    BGB:{'PC-6060-BE':2000,'AZ-3060-BL':3000,'RV-2550-GR':1500,'GR-CM-CROM':30,'AD-PORC-25':40,'MO-IM-40':80,'MO-PEG-25':150,'HR-PT-100':120,'HR-ES-50':200,'EL-CA-10':10,'PT-BL-1':35,'SN-LV-40':15,'HR-PA-1':25,'PC-4545-BE':1800,'PC-3333-GR':1500,'AZ-2020-BL':1200,'AZ-1525-VD':600,'RV-2040-BE':400,'AD-FLEX-20':50,'AD-CER-GR':60,'MO-NIV-25':40,'MO-REV-30':35,'HR-AN-10':300,'HR-PL-3M':80,'EL-IN-15':120,'PT-ES-NEG':20,'SN-LV-60':6,'HR-MA-5':30,'PC-POR-60':600,'AZ-2540-VD':400,'AD-MULTI-1':120,'MO-FR-40':30,'HR-VA-1M':80,'EL-BR-20':50,'SN-DU-ECO':10},
    BGC:{'PC-6060-BE':500,'AZ-3060-BL':800,'GR-LM-CROM':20,'GR-CM-CROM':10,'EL-CA-10':15,'EL-TO-20':200,'SN-IN-1':8,'HR-PA-1':45,'PC-4545-BE':600,'PC-3333-GR':400,'AZ-2020-BL':500,'RV-2040-BE':200,'GR-DU-AL':10,'GR-LV-DOR':8,'AD-CER-GR':30,'HR-AN-10':150,'EL-IN-15':80,'PT-BARN-1':20,'SN-SN-1':4,'HR-CI-30':50,'HR-MA-5':15,'RV-3060-BL':200,'GR-FO-DOR':6,'EL-BR-20':30,'EL-TU-1/2':60,'SN-DU-ECO':8},
    BGD:{'PC-6060-BE':80,'GR-LM-CROM':5,'MO-IM-40':30,'MO-PEG-25':45,'PT-ES-1':60,'HR-NV-1':12,'PC-4545-BE':200,'PC-3333-GR':150,'RV-2550-GR':100,'HR-PL-3M':40,'EL-CA-12':8,'PT-ES-NEG':15,'SN-LV-60':3,'SN-SN-1':3,'MO-NIV-25':25,'MO-REV-30':20,'AZ-2540-VD':200,'RV-3060-BL':120,'AD-MULTI-1':80,'MO-FR-40':15,'HR-VA-1M':40,'EL-TU-1/2':50,'SN-DU-ECO':5}
  },
  stock:{
    BGA:{'PC-6060-BE':5000,'AZ-3060-BL':4000,'RV-2550-GR':2000,'GR-LM-CROM':40,'AD-PORC-25':60,'MO-IM-40':120,'MO-PEG-25':200,'HR-PT-100':300,'HR-ES-50':500,'EL-CA-10':25,'EL-TO-20':150,'PT-BL-1':80,'PT-ES-1':45,'SN-LV-40':30,'SN-IN-1':15,'HR-PA-1':60,'HR-NV-1':20},
    BGB:{'PC-6060-BE':2000,'AZ-3060-BL':3000,'RV-2550-GR':1500,'GR-CM-CROM':30,'AD-PORC-25':40,'MO-IM-40':80,'MO-PEG-25':150,'HR-PT-100':120,'HR-ES-50':200,'EL-CA-10':10,'PT-BL-1':35,'SN-LV-40':15,'HR-PA-1':25},
    BGC:{'PC-6060-BE':500, 'AZ-3060-BL':800, 'GR-LM-CROM':20, 'GR-CM-CROM':10, 'EL-CA-10':15, 'EL-TO-20':200, 'SN-IN-1':8, 'HR-PA-1':45},
    BGD:{'PC-6060-BE':80,  'GR-LM-CROM':5, 'MO-IM-40':30, 'MO-PEG-25':45, 'PT-ES-1':60, 'HR-NV-1':12}
  },
  proveedores:[
    {id:'PR-01',n:'Cerámica Nariño',   cat:'Pisos y revestimientos',ciudad:'Ipiales',contacto:'Luis Erazo',  tel:'315 442 1180',calif:4.6,estado:'Activo'},
    {id:'PR-02',n:'Pegantes del Sur',  cat:'Adhesivos y morteros',  ciudad:'Pasto',  contacto:'Marta Ruiz',  tel:'320 778 0094',calif:4.2,estado:'Activo'},
    {id:'PR-03',n:'Hidro Import',      cat:'Grifería',              ciudad:'Cali',   contacto:'Andrés Polo', tel:'301 556 7723',calif:3.8,estado:'Observado'}
  ],
  compras:function(){
    const provs=['PR-01','PR-02','PR-03'];
    const names={1:'Cerámica Nariño',2:'Pegantes del Sur',3:'Hidro Import'};
    const skus=['AD-PORC-25','MO-IM-40','MO-PEG-25','PC-6060-BE','AZ-3060-BL','RV-2550-GR','GR-LM-CROM','GR-CM-CROM','HR-PT-100','EL-CA-10','PT-BL-1','SN-LV-40','HR-NV-1','PC-4545-BE','PC-3333-GR','AZ-2020-BL','RV-2040-BE','GR-DU-AL','AD-FLEX-20','PC-POR-60','MO-NIV-25','EL-TO-20','PT-ES-1','SN-IN-1','HR-PA-1'];
    const uMap={'AD-PORC-25':'sacos','MO-IM-40':'sacos','MO-PEG-25':'sacos','PC-6060-BE':'m²','AZ-3060-BL':'m²','RV-2550-GR':'m²','GR-LM-CROM':'unid','GR-CM-CROM':'unid','HR-PT-100':'unid','EL-CA-10':'unid','PT-BL-1':'unid','SN-LV-40':'unid','HR-NV-1':'unid','PC-4545-BE':'m²','PC-3333-GR':'m²','AZ-2020-BL':'m²','RV-2040-BE':'m²','GR-DU-AL':'unid','AD-FLEX-20':'sacos','PC-POR-60':'m²','MO-NIV-25':'sacos','EL-TO-20':'unid','PT-ES-1':'unid','SN-IN-1':'unid','HR-PA-1':'unid'};
    const pMap={'AD-PORC-25':38000,'MO-IM-40':35000,'MO-PEG-25':28000,'PC-6060-BE':28500,'AZ-3060-BL':22300,'RV-2550-GR':35800,'GR-LM-CROM':45200,'GR-CM-CROM':52000,'HR-PT-100':8500,'EL-CA-10':125000,'PT-BL-1':42000,'SN-LV-40':89000,'HR-NV-1':165000,'PC-4545-BE':23500,'PC-3333-GR':19800,'AZ-2020-BL':18500,'RV-2040-BE':32500,'GR-DU-AL':38500,'AD-FLEX-20':34000,'PC-POR-60':42000,'MO-NIV-25':31000,'EL-TO-20':4500,'PT-ES-1':18500,'SN-IN-1':210000,'HR-PA-1':12500};
    const nMap={'AD-PORC-25':'Adhesivo Porcelana','MO-IM-40':'Mortero Impermeable','MO-PEG-25':'Mortero Pegacor','PC-6060-BE':'Piso Cerámico 60×60','AZ-3060-BL':'Azulejo Baño 30×60','RV-2550-GR':'Revestimiento Pared','GR-LM-CROM':'Grifo Lavamanos','GR-CM-CROM':'Grifo Cocina','HR-PT-100':'Perfil T','EL-CA-10':'Cable #10','PT-BL-1':'Pintura Blanca','SN-LV-40':'Lavamanos','HR-NV-1':'Nivel Láser','PC-4545-BE':'Piso 45×45 Beige','PC-3333-GR':'Piso 33×33 Gris','AZ-2020-BL':'Azulejo 20×20','RV-2040-BE':'Revest. Piedra','GR-DU-AL':'Grifo Ducha','AD-FLEX-20':'Adhesivo Flex','PC-POR-60':'Porcelanato','MO-NIV-25':'Mortero Nivelador','EL-TO-20':'Toma Corriente','PT-ES-1':'Esmalte','SN-IN-1':'Inodoro','HR-PA-1':'Palustre'};
    const users=['Diego Muñoz','María López','Jhon Castillo'];
    const res=[];
    for(let i=0;i<100;i++){
      const id='OC-'+(2500+i);
      const provId=provs[i%3];
      const est=i<50?'reclamada':i<80?'recibida':'transito';
      const di=i%25+1;const me=4+Math.floor(i/25);const f=''+(di<10?'0'+di:di)+'/'+(me<10?'0'+me:me)+'/2026';
      const nItems=1+Math.floor(Math.random()*3);
      const its=[];
      for(let j=0;j<nItems;j++){
        const sku=skus[(i*3+j)%skus.length];
        const cant=50+Math.floor(Math.random()*500);
        its.push({sku,n:nMap[sku]||sku,cant,u:uMap[sku]||'unid',precio:pMap[sku]||10000});
      }
      const rP=est!=='transito'?users[i%3]:null;
      const rPor=est==='reclamada'?users[(i+1)%3]:null;
      res.push({id,provId,fecha:f,estado:est,recibPor:rP,reclPor:rPor,items:its});
    }
    return res;
  }(),
  pedidos:[
    {id:'PD-3405',cliente:'Ferretería Central', fecha:'19/05/2026',estado:'parcial_asignado',despPor:null,
     items:[{sku:'HR-NV-1',cant:3,bodega:'BGA',asig:3,falt:0,entregado:0},{sku:'MO-PEG-25',cant:25,bodega:'BGA',asig:0,falt:0,entregado:25}]},
    {id:'PD-3404',cliente:'Pisos Ipiales Ltda',  fecha:'19/05/2026',estado:'asignado',despPor:null,
     items:[{sku:'EL-CA-10',cant:5,bodega:'BGA',asig:5,falt:0,entregado:0},{sku:'SN-IN-1',cant:2,bodega:'BGA',asig:2,falt:0,entregado:0}]},
    {id:'PD-3403',cliente:'Consorcio Vial Nariño',fecha:'18/05/2026',estado:'parcial_asignado',despPor:null,
     items:[{sku:'AD-PORC-25',cant:50,bodega:'BGA',asig:30,falt:0,entregado:20},{sku:'PC-6060-BE',cant:100,bodega:'BGA',asig:0,falt:0,entregado:100}]},
    {id:'PD-3402',cliente:'Cerámicas del Norte', fecha:'18/05/2026',estado:'resagado',despPor:null,
     items:[{sku:'AZ-3060-BL',cant:1500,bodega:'BGA',asig:1500,falt:0,entregado:0},{sku:'GR-CM-CROM',cant:15,bodega:null,asig:0,falt:15,entregado:0}]},
    {id:'PD-3401',cliente:'Constructora Ipiales',fecha:'17/05/2026',estado:'resagado',despPor:null,
     items:[{sku:'PC-6060-BE',cant:8000,bodega:null,asig:0,falt:8000,entregado:0},{sku:'AD-PORC-25',cant:30,bodega:'BGA',asig:30,falt:0,entregado:0}]},
    {id:'PD-3398',cliente:'Remodelaciones Sur',  fecha:'16/05/2026',estado:'asignado',despPor:null,
     items:[{sku:'AZ-3060-BL',cant:400,bodega:'BGA',asig:400,falt:0,entregado:0}]},
    {id:'PD-3390',cliente:'Hogar & Diseño',      fecha:'14/05/2026',estado:'despachado',despPor:'Jhon Castillo',
     items:[{sku:'GR-LM-CROM',cant:20,bodega:'BGA',asig:20,falt:0,entregado:20}]}
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
    {id:'SB-12',ubic:'Muelle 1',              cont:'Mortero impermeable 40kg',  cant:'25 sacos',    cant_sec:'—',           costo_est:875000,  det:'Hace 7 días', orig:'Compra duplicada',   estado:'Sin identificar',sku:'MO-IM-40',add:25,bodega:'BGA'},
    {id:'SB-13',ubic:'Zona F - Pallet 7',     cont:'Piso porcelanato 60×60',    cant:'360 m²',      cant_sec:'250 cajas',   costo_est:10260000,det:'Hace 4 días', orig:'Sobrante de obra',    estado:'Sin identificar',sku:'PC-6060-BE',add:360,bodega:'BGA'},
    {id:'SB-14',ubic:'Rack 5 - Nivel 2',      cont:'Grifo cocina dorado',        cant:'5 unid',      cant_sec:'—',           costo_est:260000,  det:'Hace 35 días',orig:'Devolución cliente',  estado:'Reintegrado',   sku:'GR-CM-CROM',add:5,bodega:'BGD'},
    {id:'SB-15',ubic:'Pasillo A - Est.2',     cont:'Revestimiento texturado',    cant:'65 m²',       cant_sec:'52 cajas',    costo_est:2327000, det:'Hace 22 días',orig:'Sobrante de obra',    estado:'Reintegrado',   sku:'RV-2550-GR',add:65,bodega:'BGA'},
    {id:'SB-16',ubic:'Bodega 3 - Rack 9',     cont:'Adhesivo cerámico gris',     cant:'30 sacos',    cant_sec:'—',           costo_est:1140000, det:'Hace 11 días',orig:'Compra duplicada',   estado:'En investigación',sku:'AD-PORC-25',add:30,bodega:'BGB'},
    {id:'SB-17',ubic:'Zona C - Piso',         cont:'Pallet mixto cerámica',      cant:'150 m²',      cant_sec:'104 cajas',   costo_est:4275000, det:'Hace 16 días',orig:'Devolución cliente',  estado:'Sin identificar',sku:'PC-6060-BE',add:150,bodega:'BGD'},
    {id:'SB-18',ubic:'Estante D-5',           cont:'Azulejo cocina 20×30',       cant:'200 m²',      cant_sec:'139 cajas',   costo_est:4460000, det:'Hace 8 días', orig:'Exceso compra',     estado:'En investigación',sku:'AZ-3060-BL',add:200,bodega:'BGA'},
    {id:'SB-19',ubic:'Muelle 3',              cont:'Grifos varios surtidos',     cant:'18 unid',     cant_sec:'1 caja x10',  costo_est:813600,  det:'Hace 13 días',orig:'Devolución cliente',  estado:'Sin identificar',sku:'GR-LM-CROM',add:18,bodega:'BGC'},
    {id:'SB-20',ubic:'Pasillo E - Est.6',     cont:'Cerámica esmaltada 45×45',   cant:'280 m²',      cant_sec:'194 cajas',   costo_est:7980000, det:'Hace 10 días',orig:'Sobrante de obra',    estado:'Sin identificar',sku:'PC-6060-BE',add:280,bodega:'BGA'},
    {id:'SB-21',ubic:'Zona G - Pallet 5',     cont:'Mortero pega corcho sobrante',cant:'40 sacos',   cant_sec:'—',           costo_est:1120000, det:'Hace 14 días',orig:'Exceso compra',     estado:'En investigación',sku:'MO-PEG-25',add:40,bodega:'BGB'},
    {id:'SB-22',ubic:'Pasillo F - Est.11',    cont:'Perfiles T acero inoxidable', cant:'60 unid',     cant_sec:'2 paquetes',  costo_est:510000,  det:'Hace 19 días',orig:'Sobrante de obra',    estado:'Sin identificar',sku:'HR-PT-100',add:60,bodega:'BGA'},
    {id:'SB-23',ubic:'Almacén eléctrico',     cont:'Cable #10 rollo sobrante',    cant:'3 unid',      cant_sec:'—',           costo_est:375000,  det:'Hace 23 días',orig:'Devolución cliente',  estado:'En investigación',sku:'EL-CA-10',add:3,bodega:'BGC'},
    {id:'SB-24',ubic:'Estante C-4',           cont:'Pintura blanca sellada',      cant:'12 unid',     cant_sec:'1 caja',      costo_est:504000,  det:'Hace 17 días',orig:'Compra duplicada',   estado:'Sin identificar',sku:'PT-BL-1',add:12,bodega:'BGA'},
    {id:'SB-25',ubic:'Zona H - Piso',         cont:'Lavamanos vitreo empaquetado', cant:'6 unid',     cant_sec:'1 caja',      costo_est:534000,  det:'Hace 25 días',orig:'Exceso compra',     estado:'Sin identificar',sku:'SN-LV-40',add:6,bodega:'BGB'},
    {id:'SB-26',ubic:'Bodega 1 - Rack 2',     cont:'Nivel láser sin rotular',     cant:'4 unid',      cant_sec:'—',           costo_est:660000,  det:'Hace 30 días',orig:'Devolución cliente',  estado:'Reintegrado',   sku:'HR-NV-1',add:4,bodega:'BGA'}
  ],
  vencimientos:[
    {lote:'L-AD-0091',prod:'Adhesivo Porcelana 25kg',    sku:'AD-PORC-25',cant:'40 sacos', bodega:'BGA',vence:'30/05/2026',dias:13},
    {lote:'L-MO-0044',prod:'Mortero Impermeable',         sku:'',          cant:'25 sacos', bodega:'BGB',vence:'11/06/2026',dias:25},
    {lote:'L-SE-0012',prod:'Sellador Epóxico',            sku:'',          cant:'18 unid',  bodega:'BGA',vence:'03/06/2026',dias:17},
    {lote:'L-PE-0007',prod:'Pintura Epóxica Piso',        sku:'',          cant:'12 galones',bodega:'BGC',vence:'08/05/2026',dias:-9},
    {lote:'L-AD-0102',prod:'Adhesivo Cerámico Gris',      sku:'',          cant:'60 sacos', bodega:'BGD',vence:'22/08/2026',dias:97},
    {lote:'L-MO-0051',prod:'Mortero Pegacor 25kg',        sku:'MO-PEG-25', cant:'50 sacos', bodega:'BGA',vence:'01/05/2026',dias:-19},
    {lote:'L-SE-0018',prod:'Sellador Silicona Transp.',   sku:'',          cant:'24 unid',  bodega:'BGB',vence:'25/04/2026',dias:-25},
    {lote:'L-AD-0105',prod:'Adhesivo Flexiblanco 20kg',   sku:'',          cant:'35 sacos', bodega:'BGC',vence:'15/05/2026',dias:-5},
    {lote:'L-PE-0011',prod:'Pintura Acrílica Blanco',     sku:'PT-BL-1',   cant:'8 galones',bodega:'BGA',vence:'10/05/2026',dias:-10},
    {lote:'L-MO-0055',prod:'Mortero Nivelador Piso',      sku:'',          cant:'20 sacos', bodega:'BGD',vence:'22/05/2026',dias:2},
    {lote:'L-AD-0108',prod:'Adhesivo Porcelana 25kg',    sku:'AD-PORC-25', cant:'30 sacos', bodega:'BGB',vence:'25/05/2026',dias:5},
    {lote:'L-SE-0022',prod:'Sellador Poliuretano',        sku:'',          cant:'12 unid',  bodega:'BGA',vence:'28/05/2026',dias:8},
    {lote:'L-MO-0058',prod:'Mortero Revestimiento',       sku:'',          cant:'40 sacos', bodega:'BGC',vence:'01/06/2026',dias:12},
    {lote:'L-PE-0015',prod:'Esmalte Sintético',           sku:'PT-ES-1',   cant:'15 unid',  bodega:'BGA',vence:'05/06/2026',dias:16},
    {lote:'L-AD-0112',prod:'Adhesivo Cerámico Gris',      sku:'',          cant:'45 sacos', bodega:'BGA',vence:'10/06/2026',dias:21},
    {lote:'L-MO-0062',prod:'Mortero Impermeable',         sku:'',          cant:'30 sacos', bodega:'BGB',vence:'20/06/2026',dias:31},
    {lote:'L-SE-0027',prod:'Sellador Epóxico',            sku:'',          cant:'10 unid',  bodega:'BGD',vence:'15/07/2026',dias:56},
    {lote:'L-PE-0019',prod:'Pintura Epóxica Piso',        sku:'',          cant:'6 galones',bodega:'BGC',vence:'01/08/2026',dias:73},
    {lote:'L-AD-0118',prod:'Adhesivo Flexiblanco 20kg',   sku:'',          cant:'25 sacos', bodega:'BGA',vence:'10/09/2026',dias:113},
    {lote:'L-MO-0067',prod:'Mortero Pegacor 25kg',        sku:'MO-PEG-25', cant:'55 sacos', bodega:'BGB',vence:'05/10/2026',dias:138}
  ]
};
let OC_SEQ=2471,PD_SEQ=3406,TR_SEQ=2;
let currentUser=null,selBodega='BGA';

/* ---- persistencia localStorage ---- */
(function(){
  try{
    const saved=localStorage.getItem(DB_KEY);
    if(saved){
      const data=JSON.parse(saved);
      const meta=data._meta||{};
      if(meta.ver===DB_VER){
        delete data._meta;
        Object.keys(data).forEach(k=>{DB[k]=data[k]});
        OC_SEQ=meta.OC_SEQ||OC_SEQ;
        PD_SEQ=meta.PD_SEQ||PD_SEQ;
        TR_SEQ=meta.TR_SEQ||TR_SEQ;
      }else{
        localStorage.removeItem(DB_KEY);
      }
    }
  }catch(e){localStorage.removeItem(DB_KEY)}
})();

function saveDB(){
  try{
    localStorage.setItem(DB_KEY,JSON.stringify({...DB,_meta:{ver:DB_VER,OC_SEQ,PD_SEQ,TR_SEQ}}));
  }catch(e){}
}
window.addEventListener('beforeunload',saveDB);