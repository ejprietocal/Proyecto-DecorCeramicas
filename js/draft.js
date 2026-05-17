/* ========================= DRAFT LINE ITEMS ========================= */
let draft={items:[]};
function addLine(){draft.items.push({sku:'',cant:1});renderLines()}
function removeLine(i){draft.items.splice(i,1);renderLines()}
function updateLine(i,field,val){draft.items[i][field]=(field==='cant'?+val:val);if(field==='sku'){const p=getProd(val);if(p)draft.items[i].n=p.n}}
function renderLines(){
  const pOpts=DB.productos.map(p=>`<option value="${p.sku}">${p.n} (${fmt(stockTotal(p.sku))} ${p.u})</option>`).join('');
  $('draftLines').innerHTML=draft.items.map((it,i)=>`
    <div class="linerow">
      <select onchange="updateLine(${i},'sku',this.value)">
        <option value="">— Producto —</option>${pOpts.replace(`value="${it.sku}"`,`value="${it.sku}" selected`)}
      </select>
      <input type="number" min="1" value="${it.cant}" onchange="updateLine(${i},'cant',this.value)" placeholder="Cant.">
      <button class="rm" onclick="removeLine(${i})"><i class="ri-delete-bin-line"></i></button>
    </div>`).join('');
}