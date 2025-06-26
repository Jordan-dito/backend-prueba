// script.js

const apiUrl = 'http://localhost:8000/api/usuarios';
const apiDepartamentos = 'http://localhost:8000/api/departamentos';
const apiCargos = 'http://localhost:8000/api/cargos';

let tabla;

function cargarUsuarios() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const formateados = data.map(usuario => ({
        id: usuario.id,
        usuario: usuario.usuario,
        email: usuario.email,
        departamento: usuario.departamento?.nombre || 'N/A',
        cargo: usuario.cargo?.nombre || 'N/A',
        raw: usuario // Guardar datos originales para editar
      }));
      tabla.clear().rows.add(formateados).draw();
    })
    .catch(err => {
      console.error('❌ Error al obtener usuarios:', err);
      document.body.innerHTML += `<div class="alert alert-danger">Error al cargar usuarios</div>`;
    });
}

function cargarSelects(url, select) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      select.innerHTML = '';
      data.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.id;
        opt.textContent = item.nombre;
        select.appendChild(opt);
      });
    });
}

function abrirModalEditar(usuario) {
  document.getElementById('edit-id').value = usuario.id;
  document.getElementById('edit-usuario').value = usuario.usuario;
  document.getElementById('edit-email').value = usuario.email;
  document.getElementById('edit-primerNombre').value = usuario.primerNombre;
  document.getElementById('edit-segundoNombre').value = usuario.segundoNombre ?? '';
  document.getElementById('edit-primerApellido').value = usuario.primerApellido;
  document.getElementById('edit-segundoApellido').value = usuario.segundoApellido ?? '';
  document.getElementById('edit-idDepartamento').value = usuario.idDepartamento;
  document.getElementById('edit-idCargo').value = usuario.idCargo;

  new bootstrap.Modal(document.getElementById('modalEditar')).show();
}

document.addEventListener('DOMContentLoaded', function () {
  const depSelectCrear = document.querySelector('select[name="idDepartamento"]');
  const cargoSelectCrear = document.querySelector('select[name="idCargo"]');
  const depSelectEditar = document.getElementById('edit-idDepartamento');
  const cargoSelectEditar = document.getElementById('edit-idCargo');

  cargarSelects(apiDepartamentos, depSelectCrear);
  cargarSelects(apiCargos, cargoSelectCrear);
  cargarSelects(apiDepartamentos, depSelectEditar);
  cargarSelects(apiCargos, cargoSelectEditar);

  tabla = $('#tablaUsuarios').DataTable({
    language: { url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
    columns: [
      { data: 'id' },
      { data: 'usuario' },
      { data: 'email' },
      { data: 'departamento' },
      { data: 'cargo' },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-sm btn-warning me-1" onclick='abrirModalEditar(${JSON.stringify(data.raw).replace(/'/g, "&#39;")})'>
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${data.id}">
              <i class="bi bi-trash-fill"></i>
            </button>
          `;
        }
      }
    ]
  });

  cargarUsuarios();

document.getElementById('formCrear')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const nuevo = Object.fromEntries(formData.entries());

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevo)
  })
    .then(async res => {
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      return res.json();
    })
    .then(() => {
      alert('✅ Usuario creado');
      cargarUsuarios();
      bootstrap.Modal.getInstance(this.closest('.modal')).hide();
      this.reset();
    })
    .catch(err => {
      console.error('❌ Error creando usuario:', err);
      alert('❌ Error al crear usuario\n' + err.message);
    });
});


  // Actualizar usuario
  document.getElementById('formEditar')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const actualizado = Object.fromEntries(formData.entries());

    fetch(`${apiUrl}/${actualizado.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actualizado)
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(() => {
        alert('✅ Usuario actualizado');
        cargarUsuarios();
        bootstrap.Modal.getInstance(this.closest('.modal')).hide();
      })
      .catch(() => alert('❌ Error actualizando usuario'));
  });

  // Eliminar
  $('#tablaUsuarios tbody').on('click', '.btn-eliminar', function () {
    const id = $(this).data('id');
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(res => res.ok && cargarUsuarios())
        .catch(() => alert('❌ Error eliminando usuario'));
    }
  });

  // Exportar PDF
  document.getElementById('btnExportarPDF')?.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Listado de Usuarios', 14, 15);

    const tablaHTML = document.querySelector('#tablaUsuarios');
    const filas = Array.from(tablaHTML.querySelectorAll('tbody tr')).map(tr =>
      Array.from(tr.querySelectorAll('td')).slice(0, 5).map(td => td.innerText.trim())
    );

    doc.autoTable({
      startY: 20,
      head: [['ID', 'Usuario', 'Email', 'Departamento', 'Cargo']],
      body: filas
    });

    doc.save('usuarios.pdf');
  });
});

const cargarDepartamentosYCargosTabla = async () => {
  const [departamentosRes, cargosRes] = await Promise.all([
    fetch('http://localhost:8000/api/departamentos'),
    fetch('http://localhost:8000/api/cargos')
  ]);
  const departamentos = await departamentosRes.json();
  const cargos = await cargosRes.json();

  // Tabla Departamentos
  $('#tablaDepartamentos').DataTable({
    data: departamentos,
    columns: [
      { data: 'id' },
      { data: 'codigo' },
      { data: 'nombre' },
      {
        data: 'activo',
        render: d => d ? 'Sí' : 'No'
      },
      { data: 'idUsuarioCreacion' }
    ],
    language: { url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' }
  });

  // Tabla Cargos
  $('#tablaCargos').DataTable({
    data: cargos,
    columns: [
      { data: 'id' },
      { data: 'codigo' },
      { data: 'nombre' },
      {
        data: 'activo',
        render: d => d ? 'Sí' : 'No'
      },
      { data: 'idUsuarioCreacion' }
    ],
    language: { url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' }
  });

  // Exportar departamentos
  document.getElementById('btnExportarDepartamentos').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Listado de Departamentos', 14, 15);
    const filas = departamentos.map(d => [
      d.id, d.codigo, d.nombre, d.activo ? 'Sí' : 'No', d.idUsuarioCreacion
    ]);
    doc.autoTable({
      head: [['ID', 'Código', 'Nombre', 'Activo', 'Usuario Creación']],
      body: filas,
      startY: 20
    });
    doc.save('departamentos.pdf');
  });

  // Exportar cargos
  document.getElementById('btnExportarCargos').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Listado de Cargos', 14, 15);
    const filas = cargos.map(c => [
      c.id, c.codigo, c.nombre, c.activo ? 'Sí' : 'No', c.idUsuarioCreacion
    ]);
    doc.autoTable({
      head: [['ID', 'Código', 'Nombre', 'Activo', 'Usuario Creación']],
      body: filas,
      startY: 20
    });
    doc.save('cargos.pdf');
  });
};

cargarDepartamentosYCargosTabla();
