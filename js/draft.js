/* ========================= DRAFT LINE ITEMS ========================= */
let draft={items:[]};
function addLine(){draft.items.push({sku:'',cant:1});renderLines()}
function removeLine(i){draft.items.splice(i,1);renderLines()}
function updateLine(i,field,val){draft.items[i][field]=(field==='cant'?+val:val);if(field==='sku'){const p=getProd(val);if(p)draft.items[i].n=p.n}}

function renderLines(){
  $('draftLines').innerHTML=draft.items.map((it,i)=>{
    const p=getProd(it.sku);
    const sel=it.sku
      ? '<button type="button" onclick="openProdPicker('+i+')" style="display:flex;align-items:center;gap:6px;padding:4px 8px;background:var(--neutral-bg);border:1px solid var(--line);border-radius:7px;cursor:pointer;width:100%;min-width:0;text-align:left;height:32px"><span style="width:20px;height:20px;border-radius:5px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:10px;flex-shrink:0;background:'+(p?.grad||'var(--rojo)')+'"><i class="'+(p?.ic||'ri-grid-line')+'"></i></span><div style="flex:1;min-width:0;text-align:left;overflow:hidden"><div style="font-size:11.5px;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.1">'+(p?.n||it.sku)+'</div><div style="font-size:9px;color:var(--mut);font-family:monospace;line-height:1">'+it.sku+'</div></div><i class="ri-arrow-down-s-line" style="color:var(--mut);font-size:13px;flex-shrink:0"></i></button>'
      : '<button type="button" onclick="openProdPicker('+i+')" style="width:100%;text-align:left;padding:6px 10px;color:var(--mut);border:1px dashed var(--line-m);background:var(--surface);border-radius:7px;cursor:pointer;font-size:11.5px;height:32px"><i class="ri-add-circle-line"></i> Elegir producto del catálogo</button>';
    const unidad=p?.u||'unid';
    const calcular=p&&unidad==='m²'?'<button type="button" class="btn btn-ghost btn-sm" onclick="openCalcArea('+i+')" title="Calcular cajas por m²" style="padding:4px 6px"><i class="ri-ruler-line"></i></button>':'';
    return '<div class="linerow" style="grid-template-columns:1fr 70px auto auto;gap:5px;align-items:center;margin-bottom:5px">'+sel+'<input type="number" min="1" value="'+it.cant+'" onchange="updateLine('+i+',\'cant\',this.value)" placeholder="Cant." title="'+unidad+'" style="height:32px;padding:4px 8px">'+calcular+'<button class="rm" onclick="removeLine('+i+')" title="Quitar" style="padding:4px 6px"><i class="ri-delete-bin-line"></i></button></div>';
  }).join('');
}

/* ========================= PRODUCT PICKER (M11) ========================= */
let _pkLineIdx=null;
let _pkCat='todas';
let _pkSearch='';
let _modStack=null; // snapshot del modal previo (para volver tras elegir producto)

function _snapMod(){return {tit:$('mTit').innerHTML, body:$('mBod').innerHTML, fot:$('mFot').innerHTML}}
function _restoreMod(s){if(!s)return;$('mTit').innerHTML=s.tit;$('mBod').innerHTML=s.body;$('mFot').innerHTML=s.fot}

function openProdPicker(lineIdx){
  _pkLineIdx=lineIdx;
  _pkCat='todas';
  _pkSearch='';
  _modStack=_snapMod();
  const cats=['todas',...new Set(DB.productos.map(p=>p.cat))];
  const filters='<div class="prod-pick-filters"><div class="prod-pick-search"><i class="ri-search-line" style="color:var(--ph);font-size:13px;margin-right:5px"></i><input type="text" placeholder="Buscar por nombre o SKU..." oninput="_pkSearch=this.value;renderProdPicker()"></div>'+cats.map(c=>'<span class="c-pill" id="catpill-'+c.replace(/\s+/g,'_')+'" onclick="_pkCat=\''+c+'\';renderProdPicker()">'+(c==='todas'?'Todas las categorías':c)+'</span>').join('')+'</div>';
  openMod('<i class="ri-grid-line"></i> Catálogo de Productos', filters+'<div id="prodPickerGrid" class="prod-picker"></div>', '<button class="btn btn-o btn-sm" onclick="cancelProdPicker()"><i class="ri-arrow-left-line"></i> Volver</button>');
  renderProdPicker();
}
function cancelProdPicker(){
  const s=_modStack;_modStack=null;
  if(s){_restoreMod(s);renderLines();}
  else closeMod();
}
function renderProdPicker(){
  const q=_pkSearch.trim().toLowerCase();
  const lista=DB.productos.filter(p=>(_pkCat==='todas'||p.cat===_pkCat)&&(!q||p.n.toLowerCase().includes(q)||p.sku.toLowerCase().includes(q)));
  const grid=$('prodPickerGrid');if(!grid)return;
  document.querySelectorAll('.c-pill').forEach(p=>p.classList.remove('sel'));
  const act=document.getElementById('catpill-'+_pkCat.replace(/\s+/g,'_'));if(act)act.classList.add('sel');
  grid.innerHTML=lista.map(p=>{
    const st=stockTotal(p.sku);
    const stCls=st<=0?'no':st<=50?'low':'ok';
    const stTxt=st<=0?'Agotado':fmt(st)+' '+p.u;
    return '<div class="prod-pick-card" onclick="pickProd(\''+p.sku+'\')">'+
      '<div class="prod-pick-grad" style="background:'+p.grad+'"><i class="'+p.ic+'"></i></div>'+
      '<div class="prod-pick-bd">'+
        '<div class="prod-pick-n">'+p.n+'</div>'+
        '<div class="prod-pick-sku">'+p.sku+' · '+p.cat+'</div>'+
        '<div class="prod-pick-bot">'+
          '<span class="prod-pick-price">'+money(p.precio)+'</span>'+
          '<span class="prod-pick-stock '+stCls+'">'+stTxt+'</span>'+
        '</div>'+
      '</div>'+
    '</div>';
  }).join('')||'<div style="grid-column:1/-1;text-align:center;padding:30px;color:var(--mut);font-size:12px">Sin resultados — ajusta la búsqueda o el filtro</div>';
}
function pickProd(sku){
  if(_pkLineIdx===null)return;
  updateLine(_pkLineIdx,'sku',sku);
  const s=_modStack;_modStack=null;
  if(s){_restoreMod(s);renderLines();}
  else closeMod();
}

/* ========================= CALCULADORA m² (M11) ========================= */
function openCalcArea(lineIdx){
  const it=draft.items[lineIdx];
  const p=getProd(it.sku);
  if(!p||p.u!=='m²')return;
  _modStack=_snapMod();
  const cajaM2=p.caja||1.44;
  const html='<div class="calc-area"><i class="ri-information-line"></i> El piso/azulejo se vende por <b>caja</b>. Calcula cuántas cajas necesitas considerando el desperdicio típico por cortes (5-15%).</div>'+
    '<div class="calc-area-r">'+
      '<div><label>Área a cubrir (m²)</label><input type="number" id="ca_m2" min="0" step="0.1" placeholder="ej: 25" oninput="recalcArea('+lineIdx+')"></div>'+
      '<div><label>Desperdicio</label><select id="ca_desp" onchange="recalcArea('+lineIdx+')"><option value="0">0% — sin holgura</option><option value="5">5% — habitación regular</option><option value="10" selected>10% — recomendado</option><option value="15">15% — cortes diagonales</option></select></div>'+
      '<div><label>m² / caja</label><input type="text" disabled value="'+cajaM2+' m²/caja"></div>'+
    '</div>'+
    '<div id="ca_result" class="calc-area-result" style="display:none"></div>';
  openMod('<i class="ri-ruler-line"></i> Calculadora — '+p.n, html,
    '<button class="btn btn-o btn-sm" onclick="cancelCalcArea()"><i class="ri-arrow-left-line"></i> Volver</button>'+
    '<button class="btn btn-blue btn-sm" onclick="aplicarCalcArea('+lineIdx+')"><i class="ri-check-line"></i> Aplicar cantidad</button>'
  );
}
function cancelCalcArea(){
  const s=_modStack;_modStack=null;
  if(s){_restoreMod(s);renderLines();}
  else closeMod();
}
function recalcArea(lineIdx){
  const it=draft.items[lineIdx];
  const p=getProd(it.sku);
  const m2=parseFloat($('ca_m2').value)||0;
  const desp=parseFloat($('ca_desp').value)||0;
  const cajaM2=p.caja||1.44;
  const total=m2*(1+desp/100);
  const cajas=Math.ceil(total/cajaM2);
  const r=$('ca_result');
  if(m2<=0){r.style.display='none';return}
  r.style.display='block';
  r.innerHTML='Necesitas: <b>'+cajas+'</b> cajas ('+(cajas*cajaM2).toFixed(2)+' m² cubiertos · '+total.toFixed(2)+' m² con desperdicio) — Total: <b>'+money(cajas*cajaM2*p.precio)+'</b>';
  r.dataset.cajas=cajas;
  r.dataset.m2=(cajas*cajaM2).toFixed(2);
}
function aplicarCalcArea(lineIdx){
  const r=$('ca_result');
  if(!r||r.style.display==='none'){toast('Ingresa el área a cubrir','warn');return}
  const m2=parseFloat(r.dataset.m2)||0;
  updateLine(lineIdx,'cant',m2);
  const s=_modStack;_modStack=null;
  if(s){_restoreMod(s);renderLines();}
  else closeMod();
  toast('Cantidad calculada: '+m2+' m²','ok');
}
