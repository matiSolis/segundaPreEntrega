//panel de control admin
//no esta implementado

// function irPanelControl() {
//     window.location.href = "/admin/panel-control";
// }

// function irDBUser() {
//     window.location.href = "/admin/db-user";
//     fetch('/admin/db-user')
//     .then(response => response.json())
//     .then(data => {
//     console.log(data);
//     })
//     .catch(error => {
//     console.error(error);
//     });
// }

// function irRendimientos() {
//     window.location.href = "/admin/rendimientos";
// }

// function irAgregarProductos() {
//     window.location.href = "/admin/agregar-productos";
// }

// function volver() {
//     window.history.back();
// }

// function eliminarUsuario(userId) {
//     fetch(`/admin/db-user/${userId}`, { method: 'DELETE' })
//     .then(response => {
//         if (response.ok) {
//         window.location.reload();
//         } else {
//         console.error('Error al eliminar el usuario');
//         }
//     })
//     .catch(error => {
//         console.error('Error al eliminar el usuario', error);
//     });
// }