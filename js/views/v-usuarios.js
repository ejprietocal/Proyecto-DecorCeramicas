VIEWS.usuarios=()=>{
  const boxes=USERS.map((u,i)=>`<div class="role-box">
    <div class="role-bh">
      <div class="sb-av" style="background:${u.c};width:38px;height:38px;border-radius:10px;font-size:13px">${u.in}</div>
      <div style="flex:1"><div style="font-size:14px;font-weight:700;color:var(--ink)">${u.n}</div><div style="font-size:11.5px;color:var(--mut)">${u.r}</div></div>
      <span class="badge bb" title="Número de ingreso">Login: ${i+1}</span>
    </div>
    <div class="perm-list">
      ${Object.keys(MODS).map(k=>{
        const on=PERMS[u.id]?.includes(k);const lk=k==='dashboard';
        return `<div class="pr-row-p"><span><i class="${MODS[k].ic}" style="color:var(--mut);width:14px"></i> ${MODS[k].n}</span>
          <label class="sw ${lk?'locked':''}"><input type="checkbox" ${on?'checked':''} ${lk?'disabled':''} onchange="togglePerm('${u.id}','${k}')"><span class="swsl"></span></label>
        </div>`;
      }).join('')}
    </div>
  </div>`).join('');
  return `<div class="page th-usr">
    <div class="hero">
      <div class="hero-ic"><i class="ri-shield-user-line"></i></div>
      <h1>Usuarios y Roles</h1>
      <p>Cada persona accede solo a los módulos de su función. Ante la rotación de personal, el nuevo empleado hereda exactamente el mismo alcance.</p>
      <div class="hero-act"><button class="btn btn-light" onclick="modalNuevoUsuario()"><i class="ri-user-add-line"></i> Nuevo Usuario</button></div>
    </div>
    <div class="body">
      <div style="background:#FFFBEB;border:1px solid #FDE68A;color:#B45309;font-size:12.5px;padding:11px 14px;border-radius:10px;margin-bottom:18px;display:flex;gap:9px">
        <i class="ri-lightbulb-flash-line" style="margin-top:1px;flex-shrink:0"></i>
        <span>Los cambios de permisos son en vivo. Si modificas al usuario con el que iniciaste sesión, el menú lateral cambia inmediatamente. Dashboard es obligatorio para todos.</span>
      </div>
      <div class="role-grid">${boxes}</div>
    </div></div>`;
};