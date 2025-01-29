"use strict";
let transacciones = [];
let contadorId = 1;
function agregarTransaccion(tipo) {
    const descripcionInput = document.getElementById('descripcion');
    const montoInput = document.getElementById('monto');
    const descripcion = descripcionInput.value.trim();
    const monto = parseFloat(montoInput.value);
    if (!descripcion || monto <= 0) {
        alert('Por favor, ingrese una descripción válida y un monto positivo.');
        return;
    }
    const transaccion = {
        id: contadorId++,
        descripcion,
        monto,
        tipo,
    };
    transacciones.push(transaccion);
    descripcionInput.value = '';
    montoInput.value = '';
    actualizarUI();
}
function calcularBalance() {
    return transacciones.reduce((total, transaccion) => {
        return transaccion.tipo === 'ingreso' ? total + transaccion.monto : total - transaccion.monto;
    }, 0);
}
function actualizarUI() {
    const balance = calcularBalance();
    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
        balanceElement.textContent = `Balance Total: ${balance} $`;
    }
    const tablaHistorial = document.getElementById('tabla-historial');
    if (tablaHistorial) {
        const tbody = tablaHistorial.querySelector('tbody');
        if (tbody) {
            tbody.innerHTML = '';
            transacciones.forEach((transaccion) => {
                const fila = document.createElement('tr');
                const celdaId = document.createElement('td');
                celdaId.textContent = transaccion.id.toString();
                const celdaDescripcion = document.createElement('td');
                celdaDescripcion.textContent = transaccion.descripcion;
                const celdaMonto = document.createElement('td');
                celdaMonto.textContent = `${transaccion.monto} $`;
                const celdaTipo = document.createElement('td');
                celdaTipo.textContent = transaccion.tipo;
                celdaTipo.className = transaccion.tipo;
                fila.appendChild(celdaId);
                fila.appendChild(celdaDescripcion);
                fila.appendChild(celdaMonto);
                fila.appendChild(celdaTipo);
                tbody.appendChild(fila);
            });
        }
    }
}
