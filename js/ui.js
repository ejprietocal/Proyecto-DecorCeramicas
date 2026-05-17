/* ========================= TOAST / MODAL ========================= */
let tT;
function toast(msg,kind='ok'){const t=$('toast');t.className='toast t-'+kind;$('toastMsg').textContent=msg;t.classList.add('show');clearTimeout(tT);tT=setTimeout(()=>t.classList.remove('show'),3200)}
function openMod(tit,body,foot){$('mTit').innerHTML=tit;$('mBod').innerHTML=body;$('mFot').innerHTML=foot;$('modal').classList.add('show')}
function closeMod(){$('modal').classList.remove('show')}