interface Transaccion {
    id: number;
    descripcion: string;
    monto: number;
    tipo: 'ingreso' | 'gasto';
  }
  
  let transacciones: Transaccion[] = [];
  let contadorId: number = 1; 
  
  function agregarTransaccion(tipo: 'ingreso' | 'gasto'): void {
    const descripcionInput = document.getElementById('descripcion') as HTMLInputElement;
    const montoInput = document.getElementById('monto') as HTMLInputElement;
  
    const descripcion: string = descripcionInput.value.trim();
    const monto: number = parseFloat(montoInput.value);
  
    if (!descripcion || monto <= 0) {
      alert('Por favor, ingrese una descripción válida y un monto positivo.');
      return;
    }
  
    const transaccion: Transaccion = {
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
  
  function calcularBalance(): number {
    return transacciones.reduce((total, transaccion) => {
      return transaccion.tipo === 'ingreso' ? total + transaccion.monto : total - transaccion.monto;
    }, 0);
  }
  
  function actualizarUI(): void {
    const balance: number = calcularBalance();
    const balanceElement = document.getElementById('balance');
  
    if (balanceElement) {
      balanceElement.textContent = `Balance Total: ${balance} $`;
    }
  
    const tablaHistorial = document.getElementById('tabla-historial') as HTMLTableElement;
  
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
  