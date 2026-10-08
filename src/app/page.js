"use client";
import React, { useState } from 'react';

export default function ControlAereo() {
  // =========================================================================
  // ENRUTADOR PRINCIPAL DE VISTAS
  // =========================================================================
  const [vistaActual, setVistaActual] = useState('FLOTA'); // 'FLOTA' | 'OPERACIONES' | 'ROSTER' | 'REGISTROS_GLOBAL' | 'AVION'
  const [subVistaAvion, setSubVistaAvion] = useState('DASHBOARD'); // 'DASHBOARD' | 'RECORDS' | 'MANTTO' | 'REEMPLAZOS' | 'BITACORA'
  const [subTabMantenimiento, setSubTabMantenimiento] = useState('CONSECUTIVOS'); // 'CONSECUTIVOS' | 'INDICADORES' | 'CALCULO_HH' | 'ESTADISTICAS'

  // Entidades Seleccionadas
  const [avionSeleccionado, setAvionSeleccionado] = useState(null);
  const [capitanSeleccionado, setCapitanSeleccionado] = useState(null);
  const [rosterSeleccionado, setRosterSeleccionado] = useState(null);
  const [personalPopUp, setPersonalPopUp] = useState(null);

  // Modales
  const [mostrarModalVuelo, setMostrarModalVuelo] = useState(false);
  const [mostrarModalEditarAvion, setMostrarModalEditarAvion] = useState(false);
  const [mostrarModalComponente, setMostrarModalComponente] = useState(false);
  const [mostrarModalAvion, setMostrarModalAvion] = useState(false);
  const [mostrarModalOT, setMostrarModalOT] = useState(false);
  const [mostrarModalReemplazo, setMostrarModalReemplazo] = useState(false);
  const [mostrarModalSecciones, setMostrarModalSecciones] = useState(false);
  const [mostrarModalPiloto, setMostrarModalPiloto] = useState(false);
  const [nuevaSeccionNombre, setNuevaSeccionNombre] = useState('');
  const [nuevoCargoInput, setNuevoCargoInput] = useState('');
  const [filtroSoloAlertas, setFiltroSoloAlertas] = useState(false);

  // Buscador Universal
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // Formularios de Vuelo
  const [duracionVuelo, setDuracionVuelo] = useState("00:00");
  const [fechaVuelo, setFechaVuelo] = useState(new Date().toISOString().split('T')[0]);
  const [capitanesVuelo, setCapitanesVuelo] = useState([]);

  // Confirmaciones
  const [confirmarEliminarAvion, setConfirmarEliminarAvion] = useState(null);
  const [confirmarEliminarPiloto, setConfirmarEliminarPiloto] = useState(null);

  // =========================================================================
  // SECCIONES ATA CONFIGURABLES
  // =========================================================================
  const [secciones, setSecciones] = useState([
    'ENGINE RECIPROCATING',
    'ENGINE LH RECIPROCATING',
    'ENGINE RH RECIPROCATING',
    'ENGINE FUEL & CONTROL',
    'IGNITION',
    'ENGINE CONTROLS',
    'STARTER',
    'VACUUM',
    'PROPELLER',
    'PROPELLER LH',
    'PROPELLER RH',
    'POWER PLANT',
    'ELECTRICAL POWER',
    'NAVIGATION AND PITOT STATIC / RAC',
    'GENERAL / OTROS'
  ]);

  // Cargos en Mantenimiento
  const [cargosDisponibles, setCargosDisponibles] = useState([
    'Técnico',
    'Inspector',
    'Certificado',
    'Almacenista',
    'Records',
    'Adquisiciones',
    'Pasante'
  ]);

  // =========================================================================
  // NAVEGACIÓN LIMPIA
  // =========================================================================
  const navegarA = (vista, extra = null) => {
    setVistaActual(vista);
    if (vista === 'FLOTA') {
      setAvionSeleccionado(null);
      setCapitanSeleccionado(null);
      setRosterSeleccionado(null);
    } else if (vista === 'OPERACIONES') {
      setCapitanSeleccionado(extra);
    } else if (vista === 'ROSTER') {
      setRosterSeleccionado(extra);
    } else if (vista === 'AVION') {
      if (extra) setAvionSeleccionado(extra);
      setSubVistaAvion('DASHBOARD');
    }
  };

  // =========================================================================
  // ROSTER DE MANTENIMIENTO
  // =========================================================================
  const [rosterPersonal, setRosterPersonal] = useState([
    {
      id: 1,
      nombre: 'Sebastian Suarez',
      cedula: '1098...',
      fotoUrl: '',
      licencias: [{ tipo: 'TMA', numero: 'TMA-9841' }],
      habilitaciones: ['Técnico', 'Records', 'Adquisiciones'],
      consecutivoInspector: '',
      cursos: [
        { id: 1, nombre: 'PESO Y BALANCE', fecha: '2025-06-10', intervaloMeses: 24 },
        { id: 2, nombre: 'FACTORES HUMANOS', fecha: '2025-04-15', intervaloMeses: 24 }
      ]
    },
    {
      id: 2,
      nombre: 'Sebastian Vasquez',
      cedula: '---',
      fotoUrl: '',
      licencias: [{ tipo: 'TMA', numero: '---' }, { tipo: 'IET', numero: '---' }],
      habilitaciones: ['Inspector', 'Certificado'],
      consecutivoInspector: 'INSP-012',
      cursos: []
    },
    {
      id: 3,
      nombre: 'Sergio Castillo',
      cedula: '---',
      fotoUrl: '',
      licencias: [{ tipo: 'TMA', numero: '---' }],
      habilitaciones: ['Certificado', 'Técnico'],
      consecutivoInspector: '',
      cursos: []
    },
    {
      id: 4,
      nombre: 'Gian Marco',
      cedula: '---',
      fotoUrl: '',
      licencias: [{ tipo: 'TMA', numero: '---' }],
      habilitaciones: ['Técnico'],
      consecutivoInspector: '',
      cursos: []
    },
    {
      id: 5,
      nombre: 'Alejandro Rojo',
      cedula: '---',
      fotoUrl: '',
      licencias: [],
      habilitaciones: ['Pasante'],
      consecutivoInspector: '',
      cursos: []
    },
    {
      id: 6,
      nombre: 'Oscar Mendoza',
      cedula: '---',
      fotoUrl: '',
      licencias: [],
      habilitaciones: ['Pasante'],
      consecutivoInspector: '',
      cursos: []
    }
  ]);

  // =========================================================================
  // TRIPULACIÓN (OPERACIONES - RESTAURADO AL 100%)
  // =========================================================================
  const [capitanes, setCapitanes] = useState([
    {
      id: 1,
      nombre: 'Sergio Castillo',
      cedula: '1098765432',
      fotoUrl: '',
      licencias: [{ tipo: 'PCA', numero: '12345' }, { tipo: 'IVA', numero: '54321' }],
      chequeoMedico: { fecha: '2025-10-12', intervaloMeses: 12 },
      chequeos: [
        { id: 1, equipo: 'CESSNA 172N', fecha: '2026-01-15', intervaloMeses: 12 },
        { id: 2, equipo: 'PIPER PA-28', fecha: '2025-11-20', intervaloMeses: 12 },
        { id: 3, equipo: 'PIPER PA-34', fecha: '', intervaloMeses: 12 },
        { id: 4, equipo: 'CESSNA A150M', fecha: '', intervaloMeses: 12 }
      ],
      cursos: [
        { id: 1, curso: 'C.M', fecha: '2026-02-10', intervaloMeses: 12 },
        { id: 2, curso: 'C.R.M', fecha: '2025-10-05', intervaloMeses: 12 },
        { id: 3, curso: 'Mercancías Peligrosas', fecha: '2025-08-14', intervaloMeses: 24 },
        { id: 4, curso: 'Simulador', fecha: '2026-01-20', intervaloMeses: 6 }
      ]
    },
    {
      id: 2,
      nombre: 'Juan Manuel Martinez',
      cedula: '---',
      fotoUrl: '',
      licencias: [{ tipo: 'PCA', numero: '---' }],
      chequeoMedico: { fecha: '', intervaloMeses: 12 },
      chequeos: [
        { id: 1, equipo: 'CESSNA 172N', fecha: '', intervaloMeses: 12 },
        { id: 2, equipo: 'PIPER PA-28', fecha: '', intervaloMeses: 12 },
        { id: 3, equipo: 'PIPER PA-34', fecha: '', intervaloMeses: 12 },
        { id: 4, equipo: 'CESSNA A150M', fecha: '', intervaloMeses: 12 }
      ],
      cursos: [
        { id: 1, curso: 'C.M', fecha: '', intervaloMeses: 12 },
        { id: 2, curso: 'C.R.M', fecha: '', intervaloMeses: 12 },
        { id: 3, curso: 'Mercancías Peligrosas', fecha: '', intervaloMeses: 24 },
        { id: 4, curso: 'Simulador', fecha: '', intervaloMeses: 6 }
      ]
    },
    {
      id: 3,
      nombre: 'Juan Jose Otero',
      cedula: '---',
      fotoUrl: '',
      licencias: [{ tipo: 'PCA', numero: '---' }],
      chequeoMedico: { fecha: '', intervaloMeses: 12 },
      chequeos: [
        { id: 1, equipo: 'CESSNA 172N', fecha: '', intervaloMeses: 12 },
        { id: 2, equipo: 'PIPER PA-28', fecha: '', intervaloMeses: 12 },
        { id: 3, equipo: 'PIPER PA-34', fecha: '', intervaloMeses: 12 },
        { id: 4, equipo: 'CESSNA A150M', fecha: '', intervaloMeses: 12 }
      ],
      cursos: [
        { id: 1, curso: 'C.M', fecha: '', intervaloMeses: 12 },
        { id: 2, curso: 'C.R.M', fecha: '', intervaloMeses: 12 },
        { id: 3, curso: 'Mercancías Peligrosas', fecha: '', intervaloMeses: 24 },
        { id: 4, curso: 'Simulador', fecha: '', intervaloMeses: 6 }
      ]
    },
    {
      id: 4,
      nombre: 'Ricardo Figueredo',
      cedula: '---',
      fotoUrl: '',
      licencias: [{ tipo: 'PCA', numero: '---' }, { tipo: 'IVA', numero: '---' }],
      chequeoMedico: { fecha: '', intervaloMeses: 12 },
      chequeos: [
        { id: 1, equipo: 'CESSNA 172N', fecha: '', intervaloMeses: 12 },
        { id: 2, equipo: 'PIPER PA-28', fecha: '', intervaloMeses: 12 },
        { id: 3, equipo: 'PIPER PA-34', fecha: '', intervaloMeses: 12 },
        { id: 4, equipo: 'CESSNA A150M', fecha: '', intervaloMeses: 12 }
      ],
      cursos: [
        { id: 1, curso: 'C.M', fecha: '', intervaloMeses: 12 },
        { id: 2, curso: 'C.R.M', fecha: '', intervaloMeses: 12 },
        { id: 3, curso: 'Mercancías Peligrosas', fecha: '', intervaloMeses: 24 },
        { id: 4, curso: 'Simulador', fecha: '', intervaloMeses: 6 }
      ]
    },
    {
      id: 5,
      nombre: 'Jonathan Zuñiga',
      cedula: '---',
      fotoUrl: '',
      licencias: [{ tipo: 'PCA', numero: '---' }],
      chequeoMedico: { fecha: '', intervaloMeses: 12 },
      chequeos: [
        { id: 1, equipo: 'CESSNA 172N', fecha: '', intervaloMeses: 12 },
        { id: 2, equipo: 'PIPER PA-28', fecha: '', intervaloMeses: 12 },
        { id: 3, equipo: 'PIPER PA-34', fecha: '', intervaloMeses: 12 },
        { id: 4, equipo: 'CESSNA A150M', fecha: '', intervaloMeses: 12 }
      ],
      cursos: [
        { id: 1, curso: 'C.M', fecha: '', intervaloMeses: 12 },
        { id: 2, curso: 'C.R.M', fecha: '', intervaloMeses: 12 },
        { id: 3, curso: 'Mercancías Peligrosas', fecha: '', intervaloMeses: 24 },
        { id: 4, curso: 'Simulador', fecha: '', intervaloMeses: 6 }
      ]
    },
    {
      id: 6,
      nombre: 'Omar Avendaño',
      cedula: '---',
      fotoUrl: '',
      licencias: [{ tipo: 'PCA', numero: '---' }, { tipo: 'IVA', numero: '---' }],
      chequeoMedico: { fecha: '', intervaloMeses: 12 },
      chequeos: [
        { id: 1, equipo: 'CESSNA 172N', fecha: '', intervaloMeses: 12 },
        { id: 2, equipo: 'PIPER PA-28', fecha: '', intervaloMeses: 12 },
        { id: 3, equipo: 'PIPER PA-34', fecha: '', intervaloMeses: 12 },
        { id: 4, equipo: 'CESSNA A150M', fecha: '', intervaloMeses: 12 }
      ],
      cursos: [
        { id: 1, curso: 'C.M', fecha: '', intervaloMeses: 12 },
        { id: 2, curso: 'C.R.M', fecha: '', intervaloMeses: 12 },
        { id: 3, curso: 'Mercancías Peligrosas', fecha: '', intervaloMeses: 24 },
        { id: 4, curso: 'Simulador', fecha: '', intervaloMeses: 6 }
      ]
    }
  ]);

  // Formulario Nuevo Piloto
  const initialPilotoForm = {
    nombre: '',
    cedula: '',
    tienePCA: true,
    numPCA: '',
    tieneIVA: false,
    numIVA: ''
  };
  const [pilotoForm, setPilotoForm] = useState(initialPilotoForm);

  // =========================================================================
  // SÁBANA COMPLETA DE COMPONENTES HK5111-G (19 ÍTEMS ÚNICOS Y CONSECUTIVOS)
  // =========================================================================
  const componentesHK5111 = [
    {
      id: 1,
      seccion: 'PROPELLER',
      descripcion: 'HELICE SENSENICH',
      modelo: '76EM8S5-0-60',
      sn: '35804K',
      servicios: [
        { id: '1a', service: 'O', tipoControl: 'HORAS', referenciaBase: 'AVION', intervalHoras: '2000:00', complianceHoras: '8598:37' }
      ]
    },
    {
      id: 2,
      seccion: 'ENGINE RECIPROCATING',
      descripcion: 'MOTOR LYCOMING',
      modelo: 'O-360-A4A',
      sn: 'L-19057-36A',
      servicios: [
        { id: '2a', service: 'I / O', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '2000:00', complianceHoras: '11158:24' }
      ]
    },
    {
      id: 3,
      seccion: 'IGNITION',
      descripcion: 'MAGNETO RH KELLY AEROSPACE',
      modelo: '10-51360-45R',
      sn: 'D09239',
      servicios: [
        { id: '3a', service: 'I', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '500:00', complianceHoras: '11945:52' },
        { id: '3b', service: 'O/R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '1000:00', complianceHoras: '11945:52' },
        { id: '3c', service: 'O/R', tipoControl: 'CALENDARIO', intervalMeses: 48, complianceFecha: '2023-05-17' }
      ]
    },
    {
      id: 4,
      seccion: 'IGNITION',
      descripcion: 'MAGNETO LH KELLY AEROSPACE',
      modelo: '10-163045-3',
      sn: 'E-08332',
      servicios: [
        { id: '4a', service: 'I', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '500:00', complianceHoras: '11945:52' },
        { id: '4b', service: 'O/R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '1000:00', complianceHoras: '11945:52' },
        { id: '4c', service: 'O/R', tipoControl: 'CALENDARIO', intervalMeses: 48, complianceFecha: '2023-05-17' }
      ]
    },
    {
      id: 5,
      seccion: 'ENGINE RECIPROCATING',
      descripcion: 'RADIADOR ACEITE',
      modelo: '---',
      sn: 'M15',
      servicios: [
        { id: '5a', service: 'S', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '500:00', complianceHoras: '11658:24' }
      ]
    },
    {
      id: 6,
      seccion: 'STARTER',
      descripcion: 'ARRANQUE',
      modelo: '149NL',
      sn: '---',
      servicios: [
        { id: '6a', service: 'I', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '500:00', complianceHoras: '11945:52' },
        { id: '6b', service: 'O/R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '1000:00', complianceHoras: '11945:52' },
        { id: '6c', service: 'O/R', tipoControl: 'CALENDARIO', intervalMeses: 48, complianceFecha: '2023-05-17' }
      ]
    },
    {
      id: 7,
      seccion: 'ENGINE FUEL & CONTROL',
      descripcion: 'CARBURADOR',
      modelo: '10-5193',
      sn: 'MSE83011',
      servicios: [
        { id: '7a', service: 'O', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '2000:00', complianceHoras: '11158:24' }
      ]
    },
    {
      id: 8,
      seccion: 'ELECTRICAL POWER',
      descripcion: 'ALTERNADOR',
      modelo: '10-1051',
      sn: 'H-W072578',
      servicios: [
        { id: '8a', service: 'O/R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '500:00', complianceHoras: '12095:17' }
      ]
    },
    {
      id: 9,
      seccion: 'VACUUM',
      descripcion: 'BOMBA DE VACIO',
      modelo: '215CC',
      sn: 'A78131',
      servicios: [
        { id: '9a', service: 'R', tipoControl: 'ON_CONDITION', complianceHoras: '11945:52' }
      ]
    },
    {
      id: 10,
      seccion: 'ENGINE RECIPROCATING',
      descripcion: 'MANGUERAS',
      modelo: 'PA-28-180',
      sn: '7505159',
      servicios: [
        { id: '10a', service: 'R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '1000:00', complianceHoras: '11158:24' },
        { id: '10b', service: 'R', tipoControl: 'CALENDARIO', intervalMeses: 96, complianceFecha: '2019-07-11' }
      ]
    },
    {
      id: 11,
      seccion: 'VACUUM',
      descripcion: 'FILTRO DE INSTRUMENTOS',
      modelo: 'RAD9-18-1',
      sn: '---',
      servicios: [
        { id: '11a', service: 'R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '500:00', complianceHoras: '9431:35' }
      ]
    },
    {
      id: 12,
      seccion: 'VACUUM',
      descripcion: 'FILTRO REGULADORA DE VACIO',
      modelo: 'RAB3-5-1',
      sn: '---',
      servicios: [
        { id: '12a', service: 'R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '500:00', complianceHoras: '9431:35' }
      ]
    },
    {
      id: 13,
      seccion: 'POWER PLANT',
      descripcion: 'FILTRO INDUCCION AIRE DE MOTOR',
      modelo: 'BA-3',
      sn: '---',
      servicios: [
        { id: '13a', service: 'R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '500:00', complianceHoras: '9431:35' }
      ]
    },
    {
      id: 14,
      seccion: 'NAVIGATION AND PITOT STATIC / RAC',
      descripcion: 'BRUJULA',
      modelo: '10-00592',
      sn: 'AAR14',
      servicios: [
        { id: '14a', service: 'I', tipoControl: 'CALENDARIO', intervalMeses: 12, complianceFecha: '2022-07-23' }
      ]
    },
    {
      id: 15,
      seccion: 'NAVIGATION AND PITOT STATIC / RAC',
      descripcion: 'ELT',
      modelo: 'ME406',
      sn: '197-07914',
      servicios: [
        { id: '15a', service: 'I', tipoControl: 'CALENDARIO', intervalMeses: 12, complianceFecha: '2023-02-22' }
      ]
    },
    {
      id: 16,
      seccion: 'NAVIGATION AND PITOT STATIC / RAC',
      descripcion: 'BATERIA ELT',
      modelo: '---',
      sn: '---',
      servicios: [
        { id: '16a', service: 'R', tipoControl: 'CALENDARIO', intervalMeses: 60, complianceFecha: '2021-08-30' }
      ]
    },
    {
      id: 17,
      seccion: 'NAVIGATION AND PITOT STATIC / RAC',
      descripcion: 'TRANSPONDER',
      modelo: 'KT 76 A',
      sn: '19963',
      servicios: [
        { id: '17a', service: 'I', tipoControl: 'CALENDARIO', intervalMeses: 24, complianceFecha: '2021-07-24' }
      ]
    },
    {
      id: 18,
      seccion: 'NAVIGATION AND PITOT STATIC / RAC',
      descripcion: 'PRUEBA PITOT STATICA',
      modelo: '---',
      sn: '---',
      servicios: [
        { id: '18a', service: 'I', tipoControl: 'CALENDARIO', intervalMeses: 24, complianceFecha: '2021-07-24' }
      ]
    },
    {
      id: 19,
      seccion: 'NAVIGATION AND PITOT STATIC / RAC',
      descripcion: 'ALTIMETRO',
      modelo: '5032P-P2',
      sn: '192',
      servicios: [
        { id: '19a', service: 'I', tipoControl: 'CALENDARIO', intervalMeses: 24, complianceFecha: '2021-07-24' }
      ]
    }
  ];

  // =========================================================================
  // SÁBANA COMPLETA DE COMPONENTES HK2265-G (27 ÍTEMS ÚNICOS Y CONSECUTIVOS)
  // =========================================================================
  const componentesHK2265 = [
    {
      id: 201,
      seccion: 'ENGINE RECIPROCATING',
      descripcion: 'MOTOR LYCOMING',
      modelo: 'O-540-L3C5D',
      sn: 'L-24016-40A',
      servicios: [
        { id: '201a', service: 'O', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '2000:00', complianceHoras: '4455:58' }
      ]
    },
    {
      id: 202,
      seccion: 'ENGINE RECIPROCATING',
      descripcion: 'TURBOCHARGER',
      modelo: '465292-9002',
      sn: 'RDR0106',
      servicios: [
        { id: '202a', service: 'O', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '2000:00', complianceHoras: '4455:58' }
      ]
    },
    {
      id: 203,
      seccion: 'ENGINE RECIPROCATING',
      descripcion: 'MANGUERAS DE CAUCHO DE MOTOR',
      modelo: 'STRATOFLEX',
      sn: 'N/A',
      servicios: [
        { id: '203a', service: 'R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '2000:00', complianceHoras: '4455:58' },
        { id: '203b', service: 'R', tipoControl: 'CALENDARIO', intervalMeses: 120, complianceFecha: '2019-02-12' }
      ]
    },
    {
      id: 204,
      seccion: 'ENGINE RECIPROCATING',
      descripcion: 'FILTRO DE ACEITE Y ACEITE',
      modelo: 'CESSNA',
      sn: 'CR18200327',
      servicios: [
        { id: '204a', service: 'R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '50:00', complianceHoras: '4667:49' },
        { id: '204b', service: 'R', tipoControl: 'CALENDARIO', intervalMeses: 4, complianceFecha: '2024-09-30' }
      ]
    },
    {
      id: 205,
      seccion: 'ENGINE FUEL & CONTROL',
      descripcion: 'CARBURADOR',
      modelo: '10-601',
      sn: 'MS893504',
      servicios: [
        { id: '205a', service: 'O', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '2000:00', complianceHoras: '4455:58' }
      ]
    },
    {
      id: 206,
      seccion: 'ENGINE FUEL & CONTROL',
      descripcion: 'BOMBA ELÉCTRICA DE COMBUSTIBLE',
      modelo: '18000-B',
      sn: '222909',
      servicios: [
        { id: '206a', service: 'O', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '2000:00', complianceHoras: '4517:59' }
      ]
    },
    {
      id: 207,
      seccion: 'IGNITION',
      descripcion: 'MAGNETO DUAL HARTZELL',
      modelo: '10-682560-11',
      sn: 'H-L051942',
      servicios: [
        { id: '207a', service: 'I', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '500:00', complianceHoras: '4455:58' },
        { id: '207b', service: 'R/O', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '2000:00', complianceHoras: '4455:58' }
      ]
    },
    {
      id: 208,
      seccion: 'ENGINE CONTROLS',
      descripcion: 'CONTROL ASSY THROTTLE MC FARLANE',
      modelo: 'MC9863056-7',
      sn: 'N/A',
      servicios: [
        { id: '208a', service: 'R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '2000:00', complianceHoras: '4455:58' }
      ]
    },
    {
      id: 209,
      seccion: 'ENGINE CONTROLS',
      descripcion: 'CONTROL ASSY PROPELLER MC FARLANE',
      modelo: 'MC345085-6',
      sn: 'N/A',
      servicios: [
        { id: '209a', service: 'R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '2000:00', complianceHoras: '4455:58' }
      ]
    },
    {
      id: 210,
      seccion: 'ENGINE CONTROLS',
      descripcion: 'CONTROL ASSY MIXTURE MC FARLANE',
      modelo: 'MC800-72',
      sn: 'N/A',
      servicios: [
        { id: '210a', service: 'R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '2000:00', complianceHoras: '4455:58' }
      ]
    },
    {
      id: 211,
      seccion: 'STARTER',
      descripcion: 'ARRANQUE',
      modelo: '149NL/EC',
      sn: 'H-S012120',
      servicios: [
        { id: '211a', service: 'O', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '2000:00', complianceHoras: '4455:58' }
      ]
    },
    {
      id: 212,
      seccion: 'VACUUM',
      descripcion: 'FILTRO CENTRAL DE SISTEMA DE VACÍO TEMPEST',
      modelo: 'RAD9-18-1',
      sn: 'N/A',
      servicios: [
        { id: '212a', service: 'R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '500:00', complianceHoras: '4455:58' }
      ]
    },
    {
      id: 213,
      seccion: 'VACUUM',
      descripcion: 'MANGUERAS DEL SISTEMA DE VACÍO CESSNA',
      modelo: '614009',
      sn: 'N/A',
      servicios: [
        { id: '213a', service: 'R', tipoControl: 'CALENDARIO', intervalMeses: 120, complianceFecha: '2022-09-01' }
      ]
    },
    {
      id: 214,
      seccion: 'VACUUM',
      descripcion: 'BOMBA DE VACÍO RAPCO',
      modelo: 'RAP215CC',
      sn: 'A50421',
      servicios: [
        { id: '214a', service: 'I', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '500:00', complianceHoras: '4455:58' }
      ]
    },
    {
      id: 215,
      seccion: 'VACUUM',
      descripcion: 'BOMBA DE VACÍO REEMPLAZO RAPCO',
      modelo: 'RAP215CC',
      sn: 'A50421',
      servicios: [
        { id: '215a', service: 'I', tipoControl: 'CALENDARIO', intervalMeses: 72, complianceFecha: '2019-12-02' }
      ]
    },
    {
      id: 216,
      seccion: 'PROPELLER',
      descripcion: 'HÉLICE MC CAULEY',
      modelo: 'B2D34C217B',
      sn: '130539',
      servicios: [
        { id: '216a', service: 'O', tipoControl: 'HORAS', referenciaBase: 'AVION', intervalHoras: '2000:00', complianceHoras: '4487:32' },
        { id: '216b', service: 'O', tipoControl: 'CALENDARIO', intervalMeses: 72, complianceFecha: '2019-10-31' }
      ]
    },
    {
      id: 217,
      seccion: 'PROPELLER',
      descripcion: 'PALA MC CAULEY No. 1',
      modelo: 'G90DHB-8',
      sn: 'AHG26056',
      servicios: [
        { id: '217a', service: 'O', tipoControl: 'HORAS', referenciaBase: 'AVION', intervalHoras: '2000:00', complianceHoras: '4487:32' },
        { id: '217b', service: 'O', tipoControl: 'CALENDARIO', intervalMeses: 72, complianceFecha: '2019-10-31' }
      ]
    },
    {
      id: 218,
      seccion: 'PROPELLER',
      descripcion: 'PALA MC CAULEY No. 2',
      modelo: 'G90DHB-9',
      sn: 'AHG26057',
      servicios: [
        { id: '218a', service: 'O', tipoControl: 'HORAS', referenciaBase: 'AVION', intervalHoras: '2000:00', complianceHoras: '4487:32' },
        { id: '218b', service: 'O', tipoControl: 'CALENDARIO', intervalMeses: 72, complianceFecha: '2019-10-31' }
      ]
    },
    {
      id: 219,
      seccion: 'PROPELLER',
      descripcion: 'GOBERNADOR MC CAULEY',
      modelo: 'O290D3-F',
      sn: '850126',
      servicios: [
        { id: '219a', service: 'O', tipoControl: 'HORAS', referenciaBase: 'AVION', intervalHoras: '1800:00', complianceHoras: '4455:58' },
        { id: '219b', service: 'O', tipoControl: 'CALENDARIO', intervalMeses: 72, complianceFecha: '2019-11-22' }
      ]
    },
    {
      id: 220,
      seccion: 'POWER PLANT',
      descripcion: 'FILTRO DE AIRE DE SISTEMA DE INDUCCIÓN',
      modelo: 'BA2505',
      sn: 'N/A',
      servicios: [
        { id: '220a', service: 'R', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '500:00', complianceHoras: '4580:23' }
      ]
    },
    {
      id: 221,
      seccion: 'ELECTRICAL POWER',
      descripcion: 'ALTERNADOR',
      modelo: 'C611503-0102',
      sn: '124650',
      servicios: [
        { id: '221a', service: 'O', tipoControl: 'HORAS', referenciaBase: 'MOTOR', intervalHoras: '2000:00', complianceHoras: '4455:58' }
      ]
    },
    {
      id: 222,
      seccion: 'NAVIGATION AND PITOT STATIC / RAC',
      descripcion: 'BRÚJULA',
      modelo: 'AIRPATH',
      sn: 'C2200-L4B',
      servicios: [
        { id: '222a', service: 'I', tipoControl: 'CALENDARIO', intervalMeses: 12, complianceFecha: '2023-01-01' }
      ]
    },
    {
      id: 223,
      seccion: 'NAVIGATION AND PITOT STATIC / RAC',
      descripcion: 'ALTIMETRO',
      modelo: 'UNITED INSTRUMENTS',
      sn: '5934P',
      servicios: [
        { id: '223a', service: 'I', tipoControl: 'CALENDARIO', intervalMeses: 24, complianceFecha: '2023-02-04' }
      ]
    },
    {
      id: 224,
      seccion: 'NAVIGATION AND PITOT STATIC / RAC',
      descripcion: 'PITOT STATICO',
      modelo: 'N/A',
      sn: '---',
      servicios: [
        { id: '224a', service: 'I', tipoControl: 'CALENDARIO', intervalMeses: 24, complianceFecha: '2023-02-04' }
      ]
    },
    {
      id: 225,
      seccion: 'NAVIGATION AND PITOT STATIC / RAC',
      descripcion: 'ELT',
      modelo: 'ARTEX',
      sn: '453-6603',
      servicios: [
        { id: '225a', service: 'I', tipoControl: 'CALENDARIO', intervalMeses: 12, complianceFecha: '2023-01-01' }
      ]
    },
    {
      id: 226,
      seccion: 'NAVIGATION AND PITOT STATIC / RAC',
      descripcion: 'BATERÍA ELT',
      modelo: 'ARTEX',
      sn: '452-6499',
      servicios: [
        { id: '226a', service: 'R', tipoControl: 'CALENDARIO', intervalMeses: 60, complianceFecha: '2021-01-01' }
      ]
    },
    {
      id: 227,
      seccion: 'NAVIGATION AND PITOT STATIC / RAC',
      descripcion: 'TRANSPONDER',
      modelo: 'GARMIN',
      sn: 'GTX345',
      servicios: [
        { id: '227a', service: 'I', tipoControl: 'CALENDARIO', intervalMeses: 24, complianceFecha: '2023-01-01' }
      ]
    }
  ];

  // =========================================================================
  // BASE DE DATOS DE LA FLOTA COMPLETA
  // =========================================================================
  const [flota, setFlota] = useState([
    {
      id: 1,
      matricula: 'HK5111-G',
      modelo: 'CESSNA 172N',
      serie: '17270480',
      esBimotor: false,
      totalAvion: '14075:11',
      proximoSv: '14090:23',
      remanente: '15:12',
      totalMotor: '12095:17',
      durgMotor: '1734:49',
      totalHelice: '12200:49',
      durgHelice: '785:13',
      historial: [],
      componentes: componentesHK5111,
      ordenesTrabajo: [
        { id: 1, fecha: '2025-03-05', otav: 'IP110183', omav: 'IP202503001', insp: true, descrip: '50', inspEsp: false, adsSb: false, sid: false, lru: false, reman: false, repil: false, tipo: 'PROG', tecnicos: ['Sebastian Suarez', 'Gian Marco'], pasantes: ['Oscar Mendoza'], inspectores: ['Sebastian Vasquez'], certificado: 'Sergio Castillo', archivoUrl: 'OT-50H-HK5111.pdf' },
        { id: 2, fecha: '2025-03-10', otav: '110184', omav: '202503003', insp: false, descrip: '', inspEsp: false, adsSb: false, sid: false, lru: false, reman: false, repil: true, tipo: 'NO PROG', tecnicos: ['Sebastian Suarez'], pasantes: [], inspectores: ['Sebastian Vasquez'], certificado: 'Sebastian Vasquez', archivoUrl: '' }
      ],
      reemplazos: [
        {
          id: 1,
          fecha: '2025-02-10',
          omav: 'IP202502012',
          otav: 'IP110179',
          accion: 'REEMPLAZADO',
          motivo: 'CUMPLIMIENTO DE HORAS',
          horasAvion: '14010:00',
          horasMotor: '12030:00',
          componenteRemovido: { descripcion: 'MAGNETO RH KELLY AEROSPACE', modelo: '10-51360-45R', sn: 'D08812', ttHoras: '2000:00' },
          componenteInstalado: { descripcion: 'MAGNETO RH KELLY AEROSPACE', modelo: '10-51360-45R', sn: 'D09239', ttHoras: '00:00', certUrl: '8130-D09239.pdf' },
          tallerRemision: 'TALLER AEROCENTRAL',
          observaciones: 'Removido para inspección 500h'
        }
      ]
    },
    {
      id: 2,
      matricula: 'HK1687-G',
      modelo: 'PIPER PA-28-140',
      serie: '28-7525181',
      esBimotor: false,
      totalAvion: '0000:00',
      proximoSv: '0000:00',
      remanente: '00:00',
      totalMotor: '0000:00',
      durgMotor: '0000:00',
      totalHelice: '0000:00',
      durgHelice: '00:00',
      historial: [],
      componentes: [],
      ordenesTrabajo: [],
      reemplazos: []
    },
    {
      id: 3,
      matricula: 'HK3945-G',
      modelo: 'PIPER PA-34-220T',
      serie: '34-8133106',
      esBimotor: true,
      totalAvion: '0000:00',
      proximoSv: '0000:00',
      remanente: '00:00',
      totalMotorLH: '0000:00',
      durgMotorLH: '0000:00',
      totalMotorRH: '0000:00',
      durgMotorRH: '0000:00',
      totalHeliceLH: '0000:00',
      durgHeliceLH: '00:00',
      totalHeliceRH: '0000:00',
      durgHeliceRH: '00:00',
      historial: [],
      componentes: [],
      ordenesTrabajo: [],
      reemplazos: []
    },
    {
      id: 4,
      matricula: 'HJ513',
      modelo: 'ELA',
      serie: '#######',
      esBimotor: false,
      totalAvion: '0000:00',
      proximoSv: '0000:00',
      remanente: '00:00',
      totalMotor: '0000:00',
      durgMotor: '0000:00',
      totalHelice: '0000:00',
      durgHelice: '00:00',
      historial: [],
      componentes: [],
      ordenesTrabajo: [],
      reemplazos: []
    },
    {
      id: 5,
      matricula: 'HK2265-G',
      modelo: 'CESSNA TR182',
      serie: 'CR18200327',
      esBimotor: false,
      totalAvion: '4667:49',
      proximoSv: '4717:49',
      remanente: '50:00',
      totalMotor: '4667:49',
      durgMotor: '211:51',
      totalHelice: '4487:32',
      durgHelice: '180:17',
      historial: [],
      componentes: componentesHK2265,
      ordenesTrabajo: [],
      reemplazos: []
    },
    { id: 6, matricula: 'HK4707-G', modelo: 'CESSNA A150M', serie: 'A1500727', esBimotor: false, totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00', historial: [], componentes: [], ordenesTrabajo: [], reemplazos: [] },
    { id: 7, matricula: 'HK1687-G', modelo: 'PIPER PA-28-180', serie: '28-7525159', esBimotor: false, totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00', historial: [], componentes: [], ordenesTrabajo: [], reemplazos: [] },
    { id: 8, matricula: 'HK4915-G', modelo: 'AEROCOMMANDER 680E', serie: '680E-833-93', esBimotor: true, totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotorLH: '0000:00', durgMotorLH: '0000:00', totalMotorRH: '0000:00', durgMotorRH: '0000:00', totalHeliceLH: '0000:00', durgHeliceLH: '00:00', totalHeliceRH: '0000:00', durgHeliceRH: '00:00', historial: [], componentes: [], ordenesTrabajo: [], reemplazos: [] }
  ]);

  // =========================================================================
  // MATEMÁTICAS DE TIEMPO Y CÁLCULOS TÉCNICOS
  // =========================================================================
  const parseMinutos = (tiempoStr) => {
    if (!tiempoStr) return 0;
    const esNegativo = String(tiempoStr).startsWith('-');
    const [h, m] = String(tiempoStr).replace('-', '').split(':').map(Number);
    const total = (h || 0) * 60 + (m || 0);
    return esNegativo ? -total : total;
  };

  const formatoHorasMin = (minutos) => {
    const esNeg = minutos < 0;
    const absMin = Math.abs(minutos);
    const h = Math.floor(absMin / 60);
    const m = (absMin % 60).toString().padStart(2, '0');
    return `${esNeg ? '-' : ''}${h}:${m}`;
  };

  const sumarTiempos = (t1, t2, resta = false) => {
    const min1 = parseMinutos(t1);
    const min2 = parseMinutos(t2);
    const res = resta ? min1 - min2 : min1 + min2;
    return formatoHorasMin(res);
  };

  const calcularVencimientoFecha = (fechaInicio, mesesIntervalo) => {
    if (!fechaInicio) return { fechaVenc: '---', dias: 9999, estado: 'NORMAL' };
    const fComp = new Date(fechaInicio);
    const fVenc = new Date(fComp);
    fVenc.setMonth(fVenc.getMonth() + Number(mesesIntervalo || 12));

    const hoy = new Date();
    const diffMs = fVenc.getTime() - hoy.getTime();
    const dias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    let estado = 'NORMAL';
    if (dias <= 30) estado = 'ROJO';
    else if (dias <= 60) estado = 'AMARILLO';

    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return {
      fechaVenc: fVenc.toLocaleDateString('es-CO', opciones),
      dias,
      estado
    };
  };

  const calcularEstadoServicio = (srv, avion) => {
    if (srv.tipoControl === 'ON_CONDITION') {
      return { tso: 'ON CONDITION', nextCompliance: 'ON CONDITION', remain: 'ON CONDITION', estado: 'NORMAL' };
    }

    if (srv.tipoControl === 'HORAS') {
      let horasActuales = avion.totalAvion;
      if (avion.esBimotor) {
        if (srv.referenciaBase === 'MOTOR_LH') horasActuales = avion.totalMotorLH;
        else if (srv.referenciaBase === 'MOTOR_RH') horasActuales = avion.totalMotorRH;
        else horasActuales = avion.totalAvion;
      } else {
        horasActuales = srv.referenciaBase === 'MOTOR' ? avion.totalMotor : avion.totalAvion;
      }

      const minActuales = parseMinutos(horasActuales);
      const minCompliance = parseMinutos(srv.complianceHoras);
      const minInterval = parseMinutos(srv.intervalHoras);

      const minTSO = minActuales - minCompliance;
      const minNext = minCompliance + minInterval;
      const minRemain = minNext - minActuales;

      let estado = 'NORMAL';
      if (minRemain <= 50 * 60) estado = 'ROJO';
      else if (minRemain <= 200 * 60) estado = 'AMARILLO';

      return {
        tso: formatoHorasMin(minTSO),
        nextCompliance: formatoHorasMin(minNext),
        remain: formatoHorasMin(minRemain),
        estado
      };
    }

    if (srv.tipoControl === 'CALENDARIO') {
      if (!srv.complianceFecha) {
        return { tso: '---', nextCompliance: '---', remain: '---', estado: 'NORMAL' };
      }
      const fechaComp = new Date(srv.complianceFecha);
      const fechaNext = new Date(fechaComp);
      fechaNext.setMonth(fechaNext.getMonth() + Number(srv.intervalMeses || 12));

      const hoy = new Date();
      const diffMs = fechaNext.getTime() - hoy.getTime();
      const diasRestantes = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      let estado = 'NORMAL';
      if (diasRestantes <= 30) estado = 'ROJO';
      else if (diasRestantes <= 60) estado = 'AMARILLO';

      const aniosTSO = Math.max(0, Math.floor((hoy - fechaComp) / (1000 * 60 * 60 * 24 * 365.25)));
      const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };

      return {
        tso: `${aniosTSO} AÑOS`,
        nextCompliance: fechaNext.toLocaleDateString('es-CO', opciones),
        remain: diasRestantes <= 0 ? 'VENCIDO' : `${diasRestantes} DÍAS`,
        estado
      };
    }

    return { tso: '---', nextCompliance: '---', remain: '---', estado: 'NORMAL' };
  };

  const obtenerAlertasAvion = (avion) => {
    let rojas = 0;
    let amarillas = 0;
    (avion.componentes || []).forEach(comp => {
      (comp.servicios || []).forEach(srv => {
        const calc = calcularEstadoServicio(srv, avion);
        if (calc.estado === 'ROJO') rojas++;
        if (calc.estado === 'AMARILLO') amarillas++;
      });
    });
    return { rojas, amarillas, total: rojas + amarillas };
  };

  // =========================================================================
  // ACCIONES Y HANDLERS
  // =========================================================================
  const registrarVuelo = (e) => {
    e.preventDefault();
    const nuevaFlota = flota.map(av => {
      if (av.id === avionSeleccionado.id) {
        if (av.esBimotor) {
          return {
            ...av,
            totalAvion: sumarTiempos(av.totalAvion, duracionVuelo),
            remanente: sumarTiempos(av.remanente, duracionVuelo, true),
            totalMotorLH: sumarTiempos(av.totalMotorLH, duracionVuelo),
            durgMotorLH: sumarTiempos(av.durgMotorLH, duracionVuelo),
            totalMotorRH: sumarTiempos(av.totalMotorRH, duracionVuelo),
            durgMotorRH: sumarTiempos(av.durgMotorRH, duracionVuelo),
            totalHeliceLH: sumarTiempos(av.totalHeliceLH, duracionVuelo),
            durgHeliceLH: sumarTiempos(av.durgHeliceLH, duracionVuelo),
            totalHeliceRH: sumarTiempos(av.totalHeliceRH, duracionVuelo),
            durgHeliceRH: sumarTiempos(av.durgHeliceRH, duracionVuelo),
            historial: [{
              id: Date.now(),
              fecha: fechaVuelo,
              tiempo: duracionVuelo,
              capitanes: capitanesVuelo.length > 0 ? capitanesVuelo : ['Sin asignar']
            }, ...av.historial]
          };
        } else {
          return {
            ...av,
            totalAvion: sumarTiempos(av.totalAvion, duracionVuelo),
            totalMotor: sumarTiempos(av.totalMotor, duracionVuelo),
            totalHelice: sumarTiempos(av.totalHelice, duracionVuelo),
            durgMotor: sumarTiempos(av.durgMotor, duracionVuelo),
            durgHelice: sumarTiempos(av.durgHelice, duracionVuelo),
            remanente: sumarTiempos(av.remanente, duracionVuelo, true),
            historial: [{
              id: Date.now(),
              fecha: fechaVuelo,
              tiempo: duracionVuelo,
              capitanes: capitanesVuelo.length > 0 ? capitanesVuelo : ['Sin asignar']
            }, ...av.historial]
          };
        }
      }
      return av;
    });
    setFlota(nuevaFlota);
    setAvionSeleccionado(nuevaFlota.find(a => a.id === avionSeleccionado.id));
    setCapitanesVuelo([]);
    setMostrarModalVuelo(false);
  };

  const guardarComponente = (e) => {
    e.preventDefault();
    const comps = avionSeleccionado.componentes || [];
    let nuevosComps;
    if (componenteForm.id) {
      nuevosComps = comps.map(c => c.id === componenteForm.id ? componenteForm : c);
    } else {
      nuevosComps = [...comps, { ...componenteForm, id: Date.now() }];
    }
    const nuevaFlota = flota.map(a => a.id === avionSeleccionado.id ? { ...a, componentes: nuevosComps } : a);
    setFlota(nuevaFlota);
    setAvionSeleccionado({ ...avionSeleccionado, componentes: nuevosComps });
    setMostrarModalComponente(false);
  };

  const eliminarComponente = (id) => {
    const act = (avionSeleccionado.componentes || []).filter(c => c.id !== id);
    const nFlota = flota.map(a => a.id === avionSeleccionado.id ? { ...a, componentes: act } : a);
    setFlota(nFlota);
    setAvionSeleccionado({ ...avionSeleccionado, componentes: act });
  };

  const guardarOrdenTrabajo = (e) => {
    e.preventDefault();
    const ots = avionSeleccionado.ordenesTrabajo || [];
    let nuevasOTs;
    if (otForm.id) {
      nuevasOTs = ots.map(o => o.id === otForm.id ? otForm : o);
    } else {
      nuevasOTs = [{ ...otForm, id: Date.now() }, ...ots];
    }
    const nuevaFlota = flota.map(a => a.id === avionSeleccionado.id ? { ...a, ordenesTrabajo: nuevasOTs } : a);
    setFlota(nuevaFlota);
    setAvionSeleccionado({ ...avionSeleccionado, ordenesTrabajo: nuevasOTs });
    setMostrarModalOT(false);
  };

  const guardarReemplazo = (e) => {
    e.preventDefault();
    const nuevoReg = { ...reemplazoForm, id: Date.now() };
    const nuevaFlota = flota.map(av => {
      if (av.id === avionSeleccionado.id) {
        return {
          ...av,
          reemplazos: [nuevoReg, ...(av.reemplazos || [])]
        };
      }
      return av;
    });
    setFlota(nuevaFlota);
    setAvionSeleccionado(nuevaFlota.find(a => a.id === avionSeleccionado.id));
    setReemplazoForm(initialReemplazoForm);
    setMostrarModalReemplazo(false);
  };

  // Guardar y Eliminar Piloto en Operaciones
  const guardarNuevoPiloto = (e) => {
    e.preventDefault();
    const licenciasIniciales = [];
    if (pilotoForm.tienePCA) licenciasIniciales.push({ tipo: 'PCA', numero: pilotoForm.numPCA || '---' });
    if (pilotoForm.tieneIVA) licenciasIniciales.push({ tipo: 'IVA', numero: pilotoForm.numIVA || '---' });

    const nuevoPiloto = {
      id: Date.now(),
      nombre: pilotoForm.nombre,
      cedula: pilotoForm.cedula || '---',
      fotoUrl: '',
      licencias: licenciasIniciales,
      chequeoMedico: { fecha: '', intervaloMeses: 12 },
      chequeos: [
        { id: 1, equipo: 'CESSNA 172N', fecha: '', intervaloMeses: 12 },
        { id: 2, equipo: 'PIPER PA-28', fecha: '', intervaloMeses: 12 },
        { id: 3, equipo: 'PIPER PA-34', fecha: '', intervaloMeses: 12 },
        { id: 4, equipo: 'CESSNA A150M', fecha: '', intervaloMeses: 12 }
      ],
      cursos: [
        { id: 1, curso: 'C.M', fecha: '', intervaloMeses: 12 },
        { id: 2, curso: 'C.R.M', fecha: '', intervaloMeses: 12 },
        { id: 3, curso: 'Mercancías Peligrosas', fecha: '', intervaloMeses: 24 },
        { id: 4, curso: 'Simulador', fecha: '', intervaloMeses: 6 }
      ]
    };
    setCapitanes([...capitanes, nuevoPiloto]);
    setPilotoForm(initialPilotoForm);
    setMostrarModalPiloto(false);
  };

  const eliminarPiloto = (id) => {
    setCapitanes(capitanes.filter(c => c.id !== id));
    if (capitanSeleccionado?.id === id) setCapitanSeleccionado(null);
    setConfirmarEliminarPiloto(null);
  };

  const manejarSubidaFoto = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Buscador Universal
  const ejecutarBusqueda = () => {
    if (!terminoBusqueda.trim()) return null;
    const term = terminoBusqueda.toLowerCase();
    const resultados = [];

    flota.forEach(av => {
      (av.componentes || []).forEach(r => {
        if (r.descripcion?.toLowerCase().includes(term) || r.modelo?.toLowerCase().includes(term) || r.sn?.toLowerCase().includes(term)) {
          resultados.push({
            tipo: 'COMPONENTE',
            aeronave: av.matricula,
            detalle: `${r.descripcion} (P/N: ${r.modelo} | S/N: ${r.sn})`,
            accion: () => {
              setAvionSeleccionado(av);
              setVistaActual('AVION');
              setSubVistaAvion('RECORDS');
            }
          });
        }
      });
      (av.ordenesTrabajo || []).forEach(ot => {
        if (ot.omav?.toLowerCase().includes(term) || ot.otav?.toLowerCase().includes(term)) {
          resultados.push({
            tipo: 'ORDEN TRABAJO',
            aeronave: av.matricula,
            detalle: `OMAV: ${ot.omav} | OTAV: ${ot.otav}`,
            accion: () => {
              setAvionSeleccionado(av);
              setVistaActual('AVION');
              setSubVistaAvion('MANTTO');
            }
          });
        }
      });
    });
    return resultados;
  };
  const resultadosBusqueda = ejecutarBusqueda();

  // =========================================================================
  // VISTA 1: ROSTER (PERSONAL DE MANTENIMIENTO)
  // =========================================================================
  if (vistaActual === 'ROSTER') {
    if (rosterSeleccionado) {
      return (
        <main className="p-4 md:p-8 bg-[#0b1120] min-h-screen text-slate-100">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setRosterSeleccionado(null)} className="text-amber-400 font-bold italic text-sm">
              ← VOLVER AL ROSTER
            </button>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 mb-6 shadow-2xl">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  {rosterSeleccionado.fotoUrl ? (
                    <img src={rosterSeleccionado.fotoUrl} alt="Foto" className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400" />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-xs text-slate-400">
                      📷 Sin Foto
                    </div>
                  )}
                  <label className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-[10px] font-bold text-amber-300">
                    Cambiar
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      manejarSubidaFoto(e.target.files[0], (url) => {
                        const act = { ...rosterSeleccionado, fotoUrl: url };
                        setRosterPersonal(rosterPersonal.map(p => p.id === act.id ? act : p));
                        setRosterSeleccionado(act);
                      });
                    }} />
                  </label>
                </div>

                <div>
                  <span className="text-amber-400 text-xs font-black uppercase tracking-widest block mb-1">Ficha Técnica Roster</span>
                  <input
                    className="bg-transparent font-black text-2xl text-white border-b border-transparent hover:border-slate-700"
                    value={rosterSeleccionado.nombre}
                    onChange={(e) => {
                      const act = { ...rosterSeleccionado, nombre: e.target.value };
                      setRosterPersonal(rosterPersonal.map(p => p.id === act.id ? act : p));
                      setRosterSeleccionado(act);
                    }}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {rosterSeleccionado.habilitaciones?.map((hab, i) => (
                      <span key={i} className="bg-sky-950 border border-sky-800 px-2.5 py-0.5 rounded text-[10px] font-bold text-sky-300 uppercase">
                        {hab}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Cédula de Ciudadanía</label>
                <input
                  className="bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs font-bold text-white mt-1 w-44"
                  value={rosterSeleccionado.cedula}
                  onChange={(e) => {
                    const act = { ...rosterSeleccionado, cedula: e.target.value };
                    setRosterPersonal(rosterPersonal.map(p => p.id === act.id ? act : p));
                    setRosterSeleccionado(act);
                  }}
                />
              </div>
            </div>

            {/* GESTIÓN DE CARGOS Y CONSECUTIVO */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-2">Habilitaciones y Cargos Activos</span>
                <div className="flex flex-wrap gap-2">
                  {cargosDisponibles.map((cargo) => {
                    const activo = rosterSeleccionado.habilitaciones?.includes(cargo);
                    return (
                      <button
                        key={cargo}
                        type="button"
                        onClick={() => {
                          let nuevas = [...(rosterSeleccionado.habilitaciones || [])];
                          if (activo) nuevas = nuevas.filter(c => c !== cargo);
                          else nuevas.push(cargo);
                          const act = { ...rosterSeleccionado, habilitaciones: nuevas };
                          setRosterPersonal(rosterPersonal.map(p => p.id === act.id ? act : p));
                          setRosterSeleccionado(act);
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${activo ? 'bg-amber-400 text-slate-950 shadow' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
                      >
                        {cargo}
                      </button>
                    );
                  })}
                </div>
              </div>

              {rosterSeleccionado.habilitaciones?.includes('Inspector') && (
                <div className="bg-sky-950/40 border border-sky-800/80 p-3 rounded-2xl max-w-sm">
                  <label className="text-[10px] font-bold text-sky-300 uppercase block">Consecutivo / Sello de Inspector</label>
                  <input
                    placeholder="Ej. INSP-012"
                    className="bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs font-mono font-bold text-white mt-1 w-full"
                    value={rosterSeleccionado.consecutivoInspector || ''}
                    onChange={(e) => {
                      const act = { ...rosterSeleccionado, consecutivoInspector: e.target.value };
                      setRosterPersonal(rosterPersonal.map(p => p.id === act.id ? act : p));
                      setRosterSeleccionado(act);
                    }}
                  />
                </div>
              )}

              <div className="flex gap-2 max-w-xs pt-1">
                <input
                  placeholder="Crear nuevo cargo..."
                  className="bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs text-white flex-1"
                  value={nuevoCargoInput}
                  onChange={(e) => setNuevoCargoInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (nuevoCargoInput.trim() && !cargosDisponibles.includes(nuevoCargoInput.trim())) {
                      setCargosDisponibles([...cargosDisponibles, nuevoCargoInput.trim()]);
                      setNuevoCargoInput('');
                    }
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold"
                >
                  + Añadir
                </button>
              </div>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main className="p-4 md:p-8 bg-[#0b1120] min-h-screen text-slate-100">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navegarA('FLOTA')} className="text-amber-400 font-bold italic text-sm">
            ← VOLVER AL MENÚ PRINCIPAL
          </button>
        </div>
        <h1 className="text-3xl font-black uppercase text-white mb-6">🛠️ Roster de Mantenimiento</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rosterPersonal.map((per) => (
            <div key={per.id} className="bg-[#111827] border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center gap-4">
              {per.fotoUrl ? (
                <img src={per.fotoUrl} alt="Foto" className="w-14 h-14 rounded-xl object-cover border border-amber-400" />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center font-black text-amber-400 text-xl">
                  {per.nombre.charAt(0)}
                </div>
              )}
              <div className="flex-1">
                <h3 onClick={() => setRosterSeleccionado(per)} className="text-lg font-black text-white hover:text-amber-400 cursor-pointer">
                  {per.nombre}
                </h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {per.habilitaciones?.map((h, i) => (
                    <span key={i} className="text-[9px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-amber-300 font-bold">
                      {h}
                    </span>
                  ))}
                </div>
                {per.consecutivoInspector && (
                  <span className="text-[10px] text-sky-400 font-mono block mt-1">Sello: {per.consecutivoInspector}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  // =========================================================================
  // VISTA 2: TRIPULACIÓN (OPERACIONES - RESTAURADO CON CHEQUEOS, CURSOS Y CÉDULA)
  // =========================================================================
  if (vistaActual === 'OPERACIONES') {
    if (capitanSeleccionado) {
      return (
        <main className="p-4 md:p-8 bg-[#0b1120] min-h-screen text-slate-100">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setCapitanSeleccionado(null)} className="text-amber-400 font-bold italic text-sm">
              ← VOLVER A OPERACIONES
            </button>
          </div>

          {/* CABECERA TRIPULACIÓN */}
          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 mb-6 shadow-2xl">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  {capitanSeleccionado.fotoUrl ? (
                    <img src={capitanSeleccionado.fotoUrl} alt="Foto" className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400" />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-xs text-slate-400">
                      📷 Sin Foto
                    </div>
                  )}
                  <label className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-[10px] font-bold text-amber-300">
                    Cambiar
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      manejarSubidaFoto(e.target.files[0], (url) => {
                        const act = { ...capitanSeleccionado, fotoUrl: url };
                        setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                        setCapitanSeleccionado(act);
                      });
                    }} />
                  </label>
                </div>

                <div>
                  <span className="text-amber-400 text-xs font-black uppercase tracking-widest block mb-1">Ficha de Tripulación</span>
                  <input
                    className="bg-transparent font-black text-2xl text-white border-b border-transparent hover:border-slate-700"
                    value={capitanSeleccionado.nombre}
                    onChange={(e) => {
                      const act = { ...capitanSeleccionado, nombre: e.target.value };
                      setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                      setCapitanSeleccionado(act);
                    }}
                  />
                  {/* LICENCIAS PCA E IVA */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['PCA', 'IVA'].map(tipo => {
                      const tiene = capitanSeleccionado.licencias?.find(l => l.tipo === tipo);
                      return (
                        <div key={tipo} className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-1 rounded-xl">
                          <input
                            type="checkbox"
                            checked={!!tiene}
                            onChange={(e) => {
                              let nuevas = [...(capitanSeleccionado.licencias || [])];
                              if (e.target.checked) nuevas.push({ tipo, numero: '' });
                              else nuevas = nuevas.filter(l => l.tipo !== tipo);
                              const act = { ...capitanSeleccionado, licencias: nuevas };
                              setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                              setCapitanSeleccionado(act);
                            }}
                          />
                          <span className="text-xs font-bold text-amber-400">{tipo}</span>
                          {tiene && (
                            <input
                              placeholder="# Licencia"
                              className="bg-[#1f2937] border border-slate-700 p-1 rounded text-xs text-white font-mono w-28"
                              value={tiene.numero}
                              onChange={(e) => {
                                const nuevas = capitanSeleccionado.licencias.map(l => l.tipo === tipo ? { ...l, numero: e.target.value } : l);
                                const act = { ...capitanSeleccionado, licencias: nuevas };
                                setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                                setCapitanSeleccionado(act);
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CÉDULA DE CIUDADANÍA RESTAURADA */}
              <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Cédula de Ciudadanía (C.C.)</label>
                <input
                  type="text"
                  className="bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-sm font-bold text-white mt-1 w-48"
                  value={capitanSeleccionado.cedula || ''}
                  onChange={(e) => {
                    const act = { ...capitanSeleccionado, cedula: e.target.value };
                    setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                    setCapitanSeleccionado(act);
                  }}
                />
              </div>

              {/* CHEQUEO MÉDICO */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">🩺 Chequeo Médico</span>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs font-bold text-white"
                    value={capitanSeleccionado.chequeoMedico?.fecha || ''}
                    onChange={(e) => {
                      const act = { ...capitanSeleccionado, chequeoMedico: { ...(capitanSeleccionado.chequeoMedico || {}), fecha: e.target.value } };
                      setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                      setCapitanSeleccionado(act);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Meses"
                    className="w-16 bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs font-bold text-white text-center"
                    value={capitanSeleccionado.chequeoMedico?.intervaloMeses || 12}
                    onChange={(e) => {
                      const act = { ...capitanSeleccionado, chequeoMedico: { ...(capitanSeleccionado.chequeoMedico || {}), intervaloMeses: e.target.value } };
                      setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                      setCapitanSeleccionado(act);
                    }}
                  />
                </div>
                {capitanSeleccionado.chequeoMedico?.fecha && (
                  <span className="text-[10px] font-mono text-emerald-400 mt-1 block">
                    Vence: {calcularVencimientoFecha(capitanSeleccionado.chequeoMedico.fecha, capitanSeleccionado.chequeoMedico.intervaloMeses).fechaVenc}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* GRID DE CHEQUEOS Y CURSOS TOTALMENTE RESTAURADOS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SECCIÓN CHEQUEOS */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-black text-amber-400 uppercase flex items-center gap-2">
                  ✈️ Chequeos de Aeronave
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    const nuevo = { id: Date.now(), equipo: 'NUEVO EQUIPO', fecha: '', intervaloMeses: 12 };
                    const act = { ...capitanSeleccionado, chequeos: [...(capitanSeleccionado.chequeos || []), nuevo] };
                    setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                    setCapitanSeleccionado(act);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-xl text-xs font-bold uppercase"
                >
                  + Chequeo
                </button>
              </div>

              <div className="space-y-4">
                {(capitanSeleccionado.chequeos || []).map((chk, idx) => {
                  const estado = calcularVencimientoFecha(chk.fecha, chk.intervaloMeses);
                  return (
                    <div key={chk.id || idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <input
                          className="bg-transparent font-black text-sm text-white border-b border-transparent hover:border-slate-700"
                          value={chk.equipo}
                          onChange={(e) => {
                            const nuevos = [...capitanSeleccionado.chequeos];
                            nuevos[idx].equipo = e.target.value;
                            const act = { ...capitanSeleccionado, chequeos: nuevos };
                            setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                            setCapitanSeleccionado(act);
                          }}
                        />
                        <div className="flex items-center gap-2">
                          {chk.fecha && (
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${estado.estado === 'ROJO' ? 'bg-rose-500/20 text-rose-400 border border-rose-500' : estado.estado === 'AMARILLO' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'}`}>
                              {estado.dias <= 0 ? 'VENCIDO' : `${estado.dias} DÍAS REM`}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const nuevos = capitanSeleccionado.chequeos.filter((_, i) => i !== idx);
                              const act = { ...capitanSeleccionado, chequeos: nuevos };
                              setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                              setCapitanSeleccionado(act);
                            }}
                            className="text-slate-500 hover:text-rose-400 p-1"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase block">Fecha Chequeo</label>
                          <input
                            type="date"
                            className="w-full bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs font-bold text-white mt-0.5"
                            value={chk.fecha || ''}
                            onChange={(e) => {
                              const nuevos = [...capitanSeleccionado.chequeos];
                              nuevos[idx].fecha = e.target.value;
                              const act = { ...capitanSeleccionado, chequeos: nuevos };
                              setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                              setCapitanSeleccionado(act);
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase block">Intervalo (Meses)</label>
                          <input
                            type="number"
                            className="w-full bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs font-bold text-white mt-0.5"
                            value={chk.intervaloMeses || 12}
                            onChange={(e) => {
                              const nuevos = [...capitanSeleccionado.chequeos];
                              nuevos[idx].intervaloMeses = e.target.value;
                              const act = { ...capitanSeleccionado, chequeos: nuevos };
                              setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                              setCapitanSeleccionado(act);
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase block">Vencimiento</label>
                          <div className="bg-slate-800/80 border border-slate-700 p-1.5 rounded-lg text-xs font-mono font-bold text-slate-300 mt-0.5 text-center">
                            {estado.fechaVenc}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECCIÓN CURSOS */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-black text-amber-400 uppercase flex items-center gap-2">
                  🎓 Cursos y Entrenamiento
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    const nuevo = { id: Date.now(), curso: 'NUEVO CURSO', fecha: '', intervaloMeses: 12 };
                    const act = { ...capitanSeleccionado, cursos: [...(capitanSeleccionado.cursos || []), nuevo] };
                    setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                    setCapitanSeleccionado(act);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-xl text-xs font-bold uppercase"
                >
                  + Curso
                </button>
              </div>

              <div className="space-y-4">
                {(capitanSeleccionado.cursos || []).map((crs, idx) => {
                  const estado = calcularVencimientoFecha(crs.fecha, crs.intervaloMeses);
                  return (
                    <div key={crs.id || idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <input
                          className="bg-transparent font-black text-sm text-white border-b border-transparent hover:border-slate-700"
                          value={crs.curso}
                          onChange={(e) => {
                            const nuevos = [...capitanSeleccionado.cursos];
                            nuevos[idx].curso = e.target.value;
                            const act = { ...capitanSeleccionado, cursos: nuevos };
                            setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                            setCapitanSeleccionado(act);
                          }}
                        />
                        <div className="flex items-center gap-2">
                          {crs.fecha && (
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${estado.estado === 'ROJO' ? 'bg-rose-500/20 text-rose-400 border border-rose-500' : estado.estado === 'AMARILLO' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'}`}>
                              {estado.dias <= 0 ? 'VENCIDO' : `${estado.dias} DÍAS REM`}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const nuevos = capitanSeleccionado.cursos.filter((_, i) => i !== idx);
                              const act = { ...capitanSeleccionado, cursos: nuevos };
                              setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                              setCapitanSeleccionado(act);
                            }}
                            className="text-slate-500 hover:text-rose-400 p-1"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase block">Fecha Curso</label>
                          <input
                            type="date"
                            className="w-full bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs font-bold text-white mt-0.5"
                            value={crs.fecha || ''}
                            onChange={(e) => {
                              const nuevos = [...capitanSeleccionado.cursos];
                              nuevos[idx].fecha = e.target.value;
                              const act = { ...capitanSeleccionado, cursos: nuevos };
                              setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                              setCapitanSeleccionado(act);
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase block">Intervalo (Meses)</label>
                          <input
                            type="number"
                            className="w-full bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs font-bold text-white mt-0.5"
                            value={crs.intervaloMeses || 12}
                            onChange={(e) => {
                              const nuevos = [...capitanSeleccionado.cursos];
                              nuevos[idx].intervaloMeses = e.target.value;
                              const act = { ...capitanSeleccionado, cursos: nuevos };
                              setCapitanes(capitanes.map(c => c.id === act.id ? act : c));
                              setCapitanSeleccionado(act);
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase block">Vencimiento</label>
                          <div className="bg-slate-800/80 border border-slate-700 p-1.5 rounded-lg text-xs font-mono font-bold text-slate-300 mt-0.5 text-center">
                            {estado.fechaVenc}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      );
    }

    // LISTADO DE CAPITANES (CON REGISTRO Y ELIMINACIÓN)
    return (
      <main className="p-4 md:p-8 bg-[#0b1120] min-h-screen text-slate-100">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navegarA('FLOTA')} className="text-amber-400 font-bold italic text-sm">
            ← VOLVER AL MENÚ PRINCIPAL
          </button>
          <button
            type="button"
            onClick={() => {
              setPilotoForm(initialPilotoForm);
              setMostrarModalPiloto(true);
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase transition-colors"
          >
            + Registrar Capitán
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-black uppercase text-white flex items-center gap-3">
            ✈️ Módulo de Operaciones — Tripulación de Vuelo
          </h1>
          <p className="text-slate-400 text-xs mt-1">Control de licencias, cédulas, chequeos de equipo y cursos recurrentes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capitanes.map((cap) => (
            <div key={cap.id} className="bg-[#111827] border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between group">
              <div>
                <div className="flex items-center gap-3">
                  {cap.fotoUrl ? (
                    <img src={cap.fotoUrl} alt="Foto" className="w-12 h-12 rounded-xl object-cover border border-amber-400" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center font-black text-amber-400 text-lg">
                      {cap.nombre.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 onClick={() => setCapitanSeleccionado(cap)} className="text-lg font-black text-white hover:text-amber-400 cursor-pointer">
                        {cap.nombre}
                      </h3>
                      {confirmarEliminarPiloto === cap.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => eliminarPiloto(cap.id)} className="bg-rose-600 text-white px-2 py-0.5 rounded text-[9px] font-bold">SI</button>
                          <button onClick={() => setConfirmarEliminarPiloto(null)} className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-[9px] font-bold">NO</button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmarEliminarPiloto(cap.id)} className="text-slate-600 hover:text-rose-400 p-1" title="Eliminar Capitán">
                          🗑️
                        </button>
                      )}
                    </div>
                    {/* CÉDULA VISIBLE EN LA TARJETA */}
                    <p className="text-slate-400 text-xs font-mono mt-0.5">C.C. {cap.cedula || 'Sin registrar'}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {cap.licencias?.map((l, i) => (
                    <span key={i} className="text-xs font-mono text-amber-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      <strong>{l.tipo}:</strong> {l.numero || '---'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase">{cap.chequeos?.length || 0} Chequeos | {cap.cursos?.length || 0} Cursos</span>
                <button onClick={() => setCapitanSeleccionado(cap)} className="text-xs font-black text-amber-400 hover:text-amber-300">
                  VER FICHA →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL REGISTRAR NUEVO CAPITÁN */}
        {mostrarModalPiloto && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111827] text-white border border-slate-700 w-full max-w-md rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-black mb-4 uppercase text-center text-amber-400">Registrar Nuevo Capitán</h3>
              <form onSubmit={guardarNuevoPiloto} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Nombre Completo</label>
                  <input
                    required
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full bg-[#1f2937] border border-slate-700 p-2.5 rounded-xl font-bold mt-1 text-sm text-white"
                    value={pilotoForm.nombre}
                    onChange={(e) => setPilotoForm({ ...pilotoForm, nombre: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Cédula de Ciudadanía</label>
                  <input
                    placeholder="Ej. 1098..."
                    className="w-full bg-[#1f2937] border border-slate-700 p-2.5 rounded-xl font-bold mt-1 text-sm text-white"
                    value={pilotoForm.cedula}
                    onChange={(e) => setPilotoForm({ ...pilotoForm, cedula: e.target.value })}
                  />
                </div>
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase block">Licencias Iniciales</span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="pca"
                        checked={pilotoForm.tienePCA}
                        onChange={(e) => setPilotoForm({ ...pilotoForm, tienePCA: e.target.checked })}
                      />
                      <label htmlFor="pca" className="text-xs font-bold w-12">PCA</label>
                      {pilotoForm.tienePCA && (
                        <input
                          placeholder="# Licencia PCA"
                          className="flex-1 bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs font-mono text-white"
                          value={pilotoForm.numPCA}
                          onChange={(e) => setPilotoForm({ ...pilotoForm, numPCA: e.target.value })}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="iva"
                        checked={pilotoForm.tieneIVA}
                        onChange={(e) => setPilotoForm({ ...pilotoForm, tieneIVA: e.target.checked })}
                      />
                      <label htmlFor="iva" className="text-xs font-bold w-12">IVA</label>
                      {pilotoForm.tieneIVA && (
                        <input
                          placeholder="# Licencia IVA"
                          className="flex-1 bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs font-mono text-white"
                          value={pilotoForm.numIVA}
                          onChange={(e) => setPilotoForm({ ...pilotoForm, numIVA: e.target.value })}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button type="submit" className="bg-amber-400 text-slate-950 py-3 rounded-xl font-black uppercase text-xs">
                    Guardar
                  </button>
                  <button type="button" onClick={() => setMostrarModalPiloto(false)} className="bg-slate-800 text-slate-300 py-3 rounded-xl font-bold uppercase text-xs">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    );
  }

  // =========================================================================
  // VISTA 3: REGISTROS DE MANTENIMIENTO GLOBAL (CONTROL HH.XLSX COMPLETO)
  // =========================================================================
  if (vistaActual === 'REGISTROS_GLOBAL') {
    const todasLasOTs = flota.flatMap(av => (av.ordenesTrabajo || []).map(ot => ({ ...ot, matricula: av.matricula })));

    const estadisticasFlota = flota.map(av => {
      const ots = av.ordenesTrabajo || [];
      return {
        matricula: av.matricula,
        insp: ots.filter(o => o.insp).length,
        inspEsp: ots.filter(o => o.inspEsp).length,
        adsSb: ots.filter(o => o.adsSb).length,
        lru: ots.filter(o => o.lru).length,
        reman: ots.filter(o => o.reman).length,
        repil: ots.filter(o => o.repil).length,
        prog: ots.filter(o => o.tipo === 'PROG').length,
        noProg: ots.filter(o => o.tipo === 'NO PROG').length
      };
    });

    return (
      <main className="p-4 md:p-8 bg-[#0b1120] min-h-screen text-slate-100 relative">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navegarA('FLOTA')} className="text-amber-400 font-bold italic text-sm">
            ← VOLVER AL MENÚ PRINCIPAL
          </button>
          <span className="text-xs bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-400">
            Vista General (Solo Lectura)
          </span>
        </div>

        <h1 className="text-3xl font-black uppercase text-white mb-2">
          📊 PLAN HORAS HOMBRE & CONTROL DE CONSECUTIVOS OMA
        </h1>
        <p className="text-slate-400 text-xs mb-6">Consolidado general de órdenes de trabajo, indicadores de carga y estadísticas.</p>

        {/* SUB-TABS */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-3">
          {[
            { id: 'CONSECUTIVOS', label: '1. CONSECUTIVOS OMA' },
            { id: 'INDICADORES', label: '2. INDICADORES DE CARGA' },
            { id: 'CALCULO_HH', label: '3. CÁLCULO HH & VA' },
            { id: 'ESTADISTICAS', label: '4. ESTADÍSTICAS SVC' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSubTabMantenimiento(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${subTabMantenimiento === tab.id ? 'bg-amber-400 text-slate-950 shadow' : 'bg-slate-900 border border-slate-800 text-slate-400'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: CONSECUTIVOS */}
        {subTabMantenimiento === 'CONSECUTIVOS' && (
          <div className="overflow-x-auto bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#0f172a] text-slate-300 font-bold uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3 text-center">Item</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3 text-amber-400">Aeronave</th>
                  <th className="p-3 font-mono">OTAV</th>
                  <th className="p-3 font-mono">OMAV</th>
                  <th className="p-3 text-center">Insp.</th>
                  <th className="p-3">Descrip.</th>
                  <th className="p-3 text-center">Insp. Esp.</th>
                  <th className="p-3 text-center">AD's, SB</th>
                  <th className="p-3 text-center">SID</th>
                  <th className="p-3 text-center">LRU</th>
                  <th className="p-3 text-center">REMAN</th>
                  <th className="p-3 text-center">REPIL</th>
                  <th className="p-3 text-center">Tipo</th>
                  <th className="p-3 text-center">Téc.</th>
                  <th className="p-3 text-center">Pas.</th>
                  <th className="p-3 text-center">Insp.</th>
                  <th className="p-3 text-center">Cert.</th>
                  <th className="p-3 text-center">Archivo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {todasLasOTs.map((ot, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="p-3 text-center font-bold text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-mono text-slate-300">{ot.fecha}</td>
                    <td className="p-3 font-black text-amber-400">{ot.matricula}</td>
                    <td className="p-3 font-mono text-white font-bold">{ot.otav}</td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">{ot.omav}</td>
                    <td className="p-3 text-center">{ot.insp ? '✅' : '—'}</td>
                    <td className="p-3 font-bold text-white">{ot.descrip || '—'}</td>
                    <td className="p-3 text-center">{ot.inspEsp ? '✅' : '—'}</td>
                    <td className="p-3 text-center">{ot.adsSb ? '✅' : '—'}</td>
                    <td className="p-3 text-center">{ot.sid ? '✅' : '—'}</td>
                    <td className="p-3 text-center">{ot.lru ? '✅' : '—'}</td>
                    <td className="p-3 text-center">{ot.reman ? '✅' : '—'}</td>
                    <td className="p-3 text-center">{ot.repil ? '✅' : '—'}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black ${ot.tipo === 'PROG' ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'}`}>
                        {ot.tipo}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button onClick={() => setPersonalPopUp({ titulo: 'Técnicos', lista: ot.tecnicos })} className="bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-xs text-white">
                        {ot.tecnicos?.length || 0}
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button onClick={() => setPersonalPopUp({ titulo: 'Pasantes', lista: ot.pasantes })} className="bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-xs text-slate-300">
                        {ot.pasantes?.length || 0}
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button onClick={() => setPersonalPopUp({ titulo: 'Inspectores', lista: ot.inspectores })} className="bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-xs text-sky-300">
                        {ot.inspectores?.length || 0}
                      </button>
                    </td>
                    <td className="p-3 text-center font-bold text-xs text-amber-300">{ot.certificado}</td>
                    <td className="p-3 text-center">
                      {ot.archivoUrl ? <span className="text-emerald-400 font-bold text-xs">📄 PDF</span> : <span className="text-slate-600 text-xs">Sin archivo</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: ESTADÍSTICAS */}
        {subTabMantenimiento === 'ESTADISTICAS' && (
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-black text-amber-400 uppercase mb-4">Resumen Estadístico de Servicios (SVC)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#0f172a] text-slate-300 font-bold uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Aeronave</th>
                    <th className="p-3 text-center">Cuenta INSP.</th>
                    <th className="p-3 text-center">INSP. ESP.</th>
                    <th className="p-3 text-center">AD's, SB</th>
                    <th className="p-3 text-center">LRU</th>
                    <th className="p-3 text-center">REMAN</th>
                    <th className="p-3 text-center">REPIL</th>
                    <th className="p-3 text-center">Prog.</th>
                    <th className="p-3 text-center">No Prog.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {estadisticasFlota.map((st, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="p-3 font-black text-white">{st.matricula}</td>
                      <td className="p-3 text-center font-mono">{st.insp}</td>
                      <td className="p-3 text-center font-mono">{st.inspEsp}</td>
                      <td className="p-3 text-center font-mono">{st.adsSb}</td>
                      <td className="p-3 text-center font-mono">{st.lru}</td>
                      <td className="p-3 text-center font-mono">{st.reman}</td>
                      <td className="p-3 text-center font-mono">{st.repil}</td>
                      <td className="p-3 text-center font-mono font-bold text-emerald-400">{st.prog}</td>
                      <td className="p-3 text-center font-mono font-bold text-rose-400">{st.noProg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2 & 3: INDICADORES Y HH */}
        {(subTabMantenimiento === 'INDICADORES' || subTabMantenimiento === 'CALCULO_HH') && (
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h2 className="text-xl font-black text-amber-400 uppercase">MOM 1.10.4 — Indicadores de Carga de Trabajo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-sm">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Horas-Hombre Disponibles</span>
                <span className="text-2xl font-black text-white">504 HH</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Horas-Hombre Estimadas</span>
                <span className="text-2xl font-black text-amber-400">455 HH</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Factor de Eficiencia Promedio</span>
                <span className="text-2xl font-black text-emerald-400">0.75 R</span>
              </div>
            </div>
          </div>
        )}

        {personalPopUp && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111827] border border-slate-700 rounded-3xl p-5 w-full max-w-xs shadow-2xl">
              <h4 className="text-sm font-black uppercase text-amber-400 mb-3">{personalPopUp.titulo}</h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {personalPopUp.lista && personalPopUp.lista.length > 0 ? (
                  personalPopUp.lista.map((nom, i) => (
                    <div key={i} className="bg-slate-900 p-2 rounded-xl text-xs font-bold text-slate-200">
                      👤 {nom}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic">No asignado</p>
                )}
              </div>
              <button onClick={() => setPersonalPopUp(null)} className="w-full bg-slate-800 text-white py-2 rounded-xl text-xs font-bold uppercase mt-4">
                Cerrar
              </button>
            </div>
          </div>
        )}
      </main>
    );
  }

  // =========================================================================
  // VISTA 4: DENTRO DE UNA AERONAVE SELECCIONADA
  // =========================================================================
  if (vistaActual === 'AVION' && avionSeleccionado) {
    const alertasActuales = obtenerAlertasAvion(avionSeleccionado);

    // SUBVISTA 4.1: REGISTROS MANTENIMIENTO INDIVIDUAL (CONSECUTIVOS DE ESTE AVIÓN)
    if (subVistaAvion === 'MANTTO') {
      return (
        <main className="p-4 md:p-8 bg-[#0b1120] min-h-screen text-slate-100 relative">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setSubVistaAvion('DASHBOARD')} className="text-amber-400 font-bold italic text-sm">
              ← VOLVER AL CONTROL DE HORAS
            </button>
            <button
              onClick={() => {
                setOtForm(initialOTForm);
                setMostrarModalOT(true);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase"
            >
              + Nueva Orden de Trabajo
            </button>
          </div>

          <h1 className="text-2xl font-black uppercase text-white mb-6">
            📑 Órdenes de Trabajo — {avionSeleccionado.matricula}
          </h1>

          <div className="overflow-x-auto bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#0f172a] text-slate-300 font-bold uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3 text-center">Item</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3 font-mono">OTAV</th>
                  <th className="p-3 font-mono">OMAV</th>
                  <th className="p-3 text-center">Insp.</th>
                  <th className="p-3">Descrip.</th>
                  <th className="p-3 text-center">Insp. Esp.</th>
                  <th className="p-3 text-center">AD's, SB</th>
                  <th className="p-3 text-center">SID</th>
                  <th className="p-3 text-center">LRU</th>
                  <th className="p-3 text-center">REMAN</th>
                  <th className="p-3 text-center">REPIL</th>
                  <th className="p-3 text-center">Tipo</th>
                  <th className="p-3 text-center">Téc.</th>
                  <th className="p-3 text-center">Pas.</th>
                  <th className="p-3 text-center">Insp.</th>
                  <th className="p-3 text-center">Cert.</th>
                  <th className="p-3 text-center">Archivo</th>
                  <th className="p-3 text-center">Editar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {(avionSeleccionado.ordenesTrabajo || []).map((ot, idx) => (
                  <tr key={ot.id || idx} className="hover:bg-slate-800/40">
                    <td className="p-3 text-center font-bold text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-mono text-slate-300">{ot.fecha}</td>
                    <td className="p-3 font-mono text-white font-bold">{ot.otav}</td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">{ot.omav}</td>
                    <td className="p-3 text-center">{ot.insp ? '✅' : '—'}</td>
                    <td className="p-3 font-bold text-white">{ot.descrip || '—'}</td>
                    <td className="p-3 text-center">{ot.inspEsp ? '✅' : '—'}</td>
                    <td className="p-3 text-center">{ot.adsSb ? '✅' : '—'}</td>
                    <td className="p-3 text-center">{ot.sid ? '✅' : '—'}</td>
                    <td className="p-3 text-center">{ot.lru ? '✅' : '—'}</td>
                    <td className="p-3 text-center">{ot.reman ? '✅' : '—'}</td>
                    <td className="p-3 text-center">{ot.repil ? '✅' : '—'}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black ${ot.tipo === 'PROG' ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'}`}>
                        {ot.tipo}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => setPersonalPopUp({ titulo: 'Técnicos Participantes', lista: ot.tecnicos })}
                        className="bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded font-mono font-bold text-xs text-white"
                      >
                        {ot.tecnicos?.length || 0}
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => setPersonalPopUp({ titulo: 'Pasantes Asignados', lista: ot.pasantes })}
                        className="bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded font-mono font-bold text-xs text-slate-300"
                      >
                        {ot.pasantes?.length || 0}
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => setPersonalPopUp({ titulo: 'Inspectores', lista: ot.inspectores })}
                        className="bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded font-mono font-bold text-xs text-sky-300"
                      >
                        {ot.inspectores?.length || 0}
                      </button>
                    </td>
                    <td className="p-3 text-center font-bold text-xs text-amber-300">{ot.certificado}</td>
                    <td className="p-3 text-center">
                      {ot.archivoUrl ? <span className="text-emerald-400 font-bold text-xs">📄 PDF</span> : <span className="text-slate-600 text-xs">Sin archivo</span>}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setOtForm(ot);
                          setMostrarModalOT(true);
                        }}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        ✏️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* POP-UP INDEPENDIENTE */}
          {personalPopUp && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-[#111827] border border-slate-700 rounded-3xl p-5 w-full max-w-xs shadow-2xl">
                <h4 className="text-sm font-black uppercase text-amber-400 mb-3">{personalPopUp.titulo}</h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {personalPopUp.lista && personalPopUp.lista.length > 0 ? (
                    personalPopUp.lista.map((nom, i) => (
                      <div key={i} className="bg-slate-900 p-2 rounded-xl text-xs font-bold text-slate-200">
                        👤 {nom}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 italic">No asignado</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setPersonalPopUp(null)}
                  className="w-full bg-slate-800 text-white py-2 rounded-xl text-xs font-bold uppercase mt-4"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {/* MODAL CREAR / EDITAR OT */}
          {mostrarModalOT && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-[#111827] text-white border border-slate-700 w-full max-w-xl rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-black mb-4 uppercase text-center text-amber-400">
                  {otForm.id ? 'Editar Orden de Trabajo' : 'Nueva Orden de Trabajo'}
                </h3>
                <form onSubmit={guardarOrdenTrabajo} className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block">Fecha</label>
                      <input
                        type="date"
                        className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white"
                        value={otForm.fecha}
                        onChange={(e) => setOtForm({ ...otForm, fecha: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block">OTAV</label>
                      <input
                        placeholder="IP110185"
                        className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white font-mono"
                        value={otForm.otav}
                        onChange={(e) => setOtForm({ ...otForm, otav: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block">OMAV</label>
                      <input
                        placeholder="IP202503004"
                        className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white font-mono"
                        value={otForm.omav}
                        onChange={(e) => setOtForm({ ...otForm, omav: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block">¿Es Inspección?</label>
                      <select
                        className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white"
                        value={otForm.insp ? 'SI' : 'NO'}
                        onChange={(e) => setOtForm({ ...otForm, insp: e.target.value === 'SI' })}
                      >
                        <option value="NO">NO</option>
                        <option value="SI">SÍ</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block">Descripción Inspección</label>
                      <input
                        placeholder="50, 100, 200, 500, 1000, 2000, OVH"
                        className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white"
                        value={otForm.descrip}
                        onChange={(e) => setOtForm({ ...otForm, descrip: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* ASIGNACIÓN DE PERSONAL CON CHECKBOXES */}
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-[10px] font-bold text-amber-400 uppercase block">Asignación de Personal</span>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Técnicos Participantes ({otForm.tecnicos.length})</label>
                      <div className="grid grid-cols-2 gap-1.5 bg-[#1f2937] p-2 rounded-xl max-h-24 overflow-y-auto">
                        {rosterPersonal.filter(p => p.habilitaciones?.includes('Técnico')).map(tec => (
                          <label key={tec.id} className="flex items-center gap-2 text-xs text-slate-300">
                            <input
                              type="checkbox"
                              checked={otForm.tecnicos.includes(tec.nombre)}
                              onChange={(e) => {
                                const n = e.target.checked ? [...otForm.tecnicos, tec.nombre] : otForm.tecnicos.filter(t => t !== tec.nombre);
                                setOtForm({ ...otForm, tecnicos: n });
                              }}
                            />
                            {tec.nombre}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Pasantes Asignados ({otForm.pasantes.length})</label>
                      <div className="grid grid-cols-2 gap-1.5 bg-[#1f2937] p-2 rounded-xl max-h-24 overflow-y-auto">
                        {rosterPersonal.filter(p => p.habilitaciones?.includes('Pasante')).map(pas => (
                          <label key={pas.id} className="flex items-center gap-2 text-xs text-slate-300">
                            <input
                              type="checkbox"
                              checked={otForm.pasantes.includes(pas.nombre)}
                              onChange={(e) => {
                                const n = e.target.checked ? [...otForm.pasantes, pas.nombre] : otForm.pasantes.filter(p => p !== pas.nombre);
                                setOtForm({ ...otForm, pasantes: n });
                              }}
                            />
                            {pas.nombre}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Inspectores ({otForm.inspectores.length})</label>
                      <div className="grid grid-cols-2 gap-1.5 bg-[#1f2937] p-2 rounded-xl">
                        {rosterPersonal.filter(p => p.habilitaciones?.includes('Inspector')).map(ins => (
                          <label key={ins.id} className="flex items-center gap-2 text-xs text-slate-300">
                            <input
                              type="checkbox"
                              checked={otForm.inspectores.includes(ins.nombre)}
                              onChange={(e) => {
                                const n = e.target.checked ? [...otForm.inspectores, ins.nombre] : otForm.inspectores.filter(i => i !== ins.nombre);
                                setOtForm({ ...otForm, inspectores: n });
                              }}
                            />
                            {ins.nombre}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Certificador (1 solo)</label>
                      <select
                        className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white"
                        value={otForm.certificado}
                        onChange={(e) => setOtForm({ ...otForm, certificado: e.target.value })}
                      >
                        {rosterPersonal.filter(p => p.habilitaciones?.includes('Certificado')).map(cer => (
                          <option key={cer.id} value={cer.nombre}>{cer.nombre}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">Adjuntar Expediente PDF</label>
                    <input
                      type="file"
                      accept=".pdf"
                      className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-slate-400 mt-1"
                      onChange={(e) => setOtForm({ ...otForm, archivoUrl: e.target.files[0]?.name || '' })}
                    />
                    {otForm.archivoUrl && <span className="text-[10px] text-emerald-400 block mt-1">Archivo cargado: {otForm.archivoUrl}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button type="submit" className="bg-amber-400 text-slate-950 py-3 rounded-xl font-black uppercase text-xs">
                      Guardar OT
                    </button>
                    <button type="button" onClick={() => setMostrarModalOT(false)} className="bg-slate-800 text-slate-300 py-3 rounded-xl font-bold uppercase text-xs">
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      );
    }

    // SUBVISTA 4.2: REEMPLAZOS Y TRAZABILIDAD
    if (subVistaAvion === 'REEMPLAZOS') {
      return (
        <main className="p-4 md:p-8 bg-[#0b1120] min-h-screen text-slate-100">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setSubVistaAvion('DASHBOARD')} className="text-amber-400 font-bold italic text-sm">
              ← VOLVER AL CONTROL DE HORAS
            </button>
            <button
              onClick={() => setMostrarModalReemplazo(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase"
            >
              + Nuevo Movimiento / Reemplazo
            </button>
          </div>

          <h1 className="text-2xl font-black uppercase text-white mb-6">
            🔄 Trazabilidad y Reemplazos — {avionSeleccionado.matricula}
          </h1>

          <div className="space-y-4">
            {(avionSeleccionado.reemplazos || []).length === 0 ? (
              <p className="text-slate-500 italic p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                No hay movimientos de reemplazo registrados para esta aeronave.
              </p>
            ) : (
              (avionSeleccionado.reemplazos || []).map((rep) => (
                <div key={rep.id} className="bg-[#111827] border border-slate-800 p-5 rounded-2xl shadow-xl space-y-3">
                  <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded text-xs font-black uppercase ${rep.accion === 'REEMPLAZADO' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-600 text-white'}`}>
                        {rep.accion}
                      </span>
                      <span className="text-slate-400 text-xs font-mono">{rep.fecha}</span>
                      <span className="text-slate-300 text-xs font-bold">OMAV: {rep.omav}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-bold uppercase">Motivo: {rep.motivo}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold text-rose-400 uppercase block mb-1">Componente Removido</span>
                      <p className="text-sm font-black text-white">{rep.componenteRemovido?.descripcion || '---'}</p>
                      <p className="text-xs font-mono text-slate-400">P/N: {rep.componenteRemovido?.modelo} | S/N: {rep.componenteRemovido?.sn}</p>
                      <p className="text-xs font-mono text-slate-300 mt-1">TT al desmontar: <strong className="text-amber-400">{rep.componenteRemovido?.ttHoras}h</strong></p>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">Componente Instalado</span>
                      <p className="text-sm font-black text-white">{rep.componenteInstalado?.descripcion || '---'}</p>
                      <p className="text-xs font-mono text-slate-400">P/N: {rep.componenteInstalado?.modelo} | S/N: {rep.componenteInstalado?.sn}</p>
                      <p className="text-xs font-mono text-slate-300 mt-1">TT Inicial: <strong className="text-emerald-400">{rep.componenteInstalado?.ttHoras}h</strong></p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {mostrarModalReemplazo && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-[#111827] text-white border border-slate-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-black mb-4 uppercase text-center text-amber-400">Registrar Reemplazo</h3>
                <form onSubmit={guardarReemplazo} className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block">Acción</label>
                      <select
                        className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white"
                        value={reemplazoForm.accion}
                        onChange={(e) => setReemplazoForm({ ...reemplazoForm, accion: e.target.value })}
                      >
                        <option value="REEMPLAZADO">REEMPLAZADO</option>
                        <option value="REMOVIDO">REMOVIDO</option>
                        <option value="REINSTALADO">REINSTALADO</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block">Motivo</label>
                      <select
                        className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white"
                        value={reemplazoForm.motivo}
                        onChange={(e) => setReemplazoForm({ ...reemplazoForm, motivo: e.target.value })}
                      >
                        <option value="CUMPLIMIENTO DE HORAS">CUMPLIMIENTO DE HORAS</option>
                        <option value="FALLA MECANICA">FALLA MECÁNICA</option>
                        <option value="SOLICITUD">SOLICITUD / INSPECCIÓN</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      placeholder="OMAV"
                      className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white font-mono"
                      value={reemplazoForm.omav}
                      onChange={(e) => setReemplazoForm({ ...reemplazoForm, omav: e.target.value })}
                    />
                    <input
                      type="date"
                      className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white"
                      value={reemplazoForm.fecha}
                      onChange={(e) => setReemplazoForm({ ...reemplazoForm, fecha: e.target.value })}
                    />
                  </div>

                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-rose-400 uppercase block">Componente Removido</span>
                    <input
                      placeholder="Descripción"
                      className="w-full bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs text-white"
                      value={reemplazoForm.componenteRemovido.descripcion}
                      onChange={(e) => setReemplazoForm({ ...reemplazoForm, componenteRemovido: { ...reemplazoForm.componenteRemovido, descripcion: e.target.value } })}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input placeholder="P/N" className="bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs text-white" value={reemplazoForm.componenteRemovido.modelo} onChange={(e) => setReemplazoForm({ ...reemplazoForm, componenteRemovido: { ...reemplazoForm.componenteRemovido, modelo: e.target.value } })} />
                      <input placeholder="S/N" className="bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs text-white" value={reemplazoForm.componenteRemovido.sn} onChange={(e) => setReemplazoForm({ ...reemplazoForm, componenteRemovido: { ...reemplazoForm.componenteRemovido, sn: e.target.value } })} />
                      <input placeholder="TT (Horas)" className="bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs text-white font-mono" value={reemplazoForm.componenteRemovido.ttHoras} onChange={(e) => setReemplazoForm({ ...reemplazoForm, componenteRemovido: { ...reemplazoForm.componenteRemovido, ttHoras: e.target.value } })} />
                    </div>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase block">Componente Instalado</span>
                    <input
                      placeholder="Descripción"
                      className="w-full bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs text-white"
                      value={reemplazoForm.componenteInstalado.descripcion}
                      onChange={(e) => setReemplazoForm({ ...reemplazoForm, componenteInstalado: { ...reemplazoForm.componenteInstalado, descripcion: e.target.value } })}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input placeholder="P/N" className="bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs text-white" value={reemplazoForm.componenteInstalado.modelo} onChange={(e) => setReemplazoForm({ ...reemplazoForm, componenteInstalado: { ...reemplazoForm.componenteInstalado, modelo: e.target.value } })} />
                      <input placeholder="S/N" className="bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs text-white" value={reemplazoForm.componenteInstalado.sn} onChange={(e) => setReemplazoForm({ ...reemplazoForm, componenteInstalado: { ...reemplazoForm.componenteInstalado, sn: e.target.value } })} />
                      <input placeholder="TT Inicial" className="bg-[#1f2937] border border-slate-700 p-1.5 rounded-lg text-xs text-white font-mono" value={reemplazoForm.componenteInstalado.ttHoras} onChange={(e) => setReemplazoForm({ ...reemplazoForm, componenteInstalado: { ...reemplazoForm.componenteInstalado, ttHoras: e.target.value } })} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button type="submit" className="bg-amber-400 text-slate-950 py-3 rounded-xl font-black uppercase text-xs">Guardar</button>
                    <button type="button" onClick={() => setMostrarModalReemplazo(false)} className="bg-slate-800 text-slate-300 py-3 rounded-xl font-bold uppercase text-xs">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      );
    }

    // SUBVISTA 4.3: SÁBANA DE CONTROL DE COMPONENTES Y VENCIMIENTOS RAC
    if (subVistaAvion === 'RECORDS') {
      const listaComps = avionSeleccionado.componentes || [];

      return (
        <main className="p-4 md:p-8 bg-[#0b1120] min-h-screen text-slate-100">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <button onClick={() => setSubVistaAvion('DASHBOARD')} className="text-amber-400 font-bold italic text-sm">
              ← VOLVER AL CONTROL DE HORAS
            </button>
            <div className="flex gap-2">
              <button onClick={() => setMostrarModalSecciones(true)} className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase">
                ⚙️ Secciones
              </button>
              <button
                onClick={() => setFiltroSoloAlertas(!filtroSoloAlertas)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase ${filtroSoloAlertas ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}
              >
                {filtroSoloAlertas ? 'Ver Todos' : `Alertas (${alertasActuales.total})`}
              </button>
              <button
                onClick={() => {
                  setComponenteForm(initialComponenteForm);
                  setMostrarModalComponente(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider"
              >
                + Añadir Componente
              </button>
            </div>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 mb-6 shadow-xl flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                <span className="text-amber-400">CONTROL DE COMPONENTES Y VENCIMIENTOS RAC</span> — {avionSeleccionado.matricula}
              </h1>
              <p className="text-slate-400 text-xs font-medium uppercase mt-1">
                {avionSeleccionado.modelo} — SERIAL {avionSeleccionado.serie} {avionSeleccionado.esBimotor && '(BIMOTOR)'}
              </p>
            </div>
            <div className="flex gap-4 bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-xl font-mono text-xs">
              <div>
                <span className="text-slate-500 block text-[9px] font-bold uppercase">TOTAL AVIÓN</span>
                <span className="text-emerald-400 font-bold text-sm">{avionSeleccionado.totalAvion}</span>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="text-slate-500 block text-[9px] font-bold uppercase">TOTAL MOTOR</span>
                <span className="text-emerald-400 font-bold text-sm">{avionSeleccionado.totalMotor || avionSeleccionado.totalMotorLH}</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#0f172a] text-slate-300 font-bold uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3 w-10 text-center">Item</th>
                  <th className="p-3 w-52">Description</th>
                  <th className="p-3 w-32 font-mono">Model</th>
                  <th className="p-3 w-28 font-mono">S/N</th>
                  <th className="p-3 text-center w-20">Service</th>
                  <th className="p-3 text-right font-mono">Interval</th>
                  <th className="p-3 text-right font-mono">Compliance</th>
                  <th className="p-3 text-right font-mono">TSO</th>
                  <th className="p-3 text-center font-mono">Remain</th>
                  <th className="p-3 text-right font-mono">Next Compliance</th>
                  <th className="p-3 text-center w-16">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaComps.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="p-8 text-center text-slate-500 italic">No hay componentes registrados para esta aeronave.</td>
                  </tr>
                ) : (
                  listaComps.map((comp, compIdx) => {
                    const seccionAnterior = compIdx > 0 ? listaComps[compIdx - 1].seccion : null;
                    const esNuevaSeccion = comp.seccion && comp.seccion !== seccionAnterior;

                    const serviciosFiltrados = comp.servicios.filter(srv => {
                      if (!filtroSoloAlertas) return true;
                      const c = calcularEstadoServicio(srv, avionSeleccionado);
                      return c.estado === 'ROJO' || c.estado === 'AMARILLO';
                    });

                    if (filtroSoloAlertas && serviciosFiltrados.length === 0) return null;

                    return (
                      <React.Fragment key={comp.id || compIdx}>
                        {esNuevaSeccion && (
                          <tr className="bg-sky-950/70 border-y border-sky-800/60">
                            <td colSpan="11" className="py-2 px-4 text-center font-black tracking-widest text-sky-300 uppercase text-[11px]">
                              {comp.seccion}
                            </td>
                          </tr>
                        )}

                        {serviciosFiltrados.map((srv, srvIdx) => {
                          const calc = calcularEstadoServicio(srv, avionSeleccionado);
                          const esRojo = calc.estado === 'ROJO';
                          const esAmarillo = calc.estado === 'AMARILLO';

                          const celdaRemainClass = esRojo
                            ? 'bg-rose-600/90 text-white font-black shadow-inner'
                            : esAmarillo
                            ? 'bg-amber-400 text-slate-950 font-black'
                            : 'bg-emerald-950/40 text-emerald-300 font-bold';

                          return (
                            <tr key={srv.id || srvIdx} className="hover:bg-slate-800/50 border-b border-slate-800/60">
                              {/* ITEM AUTOMÁTICO NUMÉRICO (index + 1) */}
                              {srvIdx === 0 && (
                                <td rowSpan={serviciosFiltrados.length} className="p-3 text-center font-bold text-slate-400 bg-slate-900/40 border-r border-slate-800 align-top">
                                  {compIdx + 1}
                                </td>
                              )}
                              {/* DESCRIPCIÓN ÚNICA NO DUPLICADA */}
                              {srvIdx === 0 && (
                                <td rowSpan={serviciosFiltrados.length} className="p-3 font-black text-white uppercase bg-slate-900/20 border-r border-slate-800 align-top">
                                  {comp.descripcion}
                                </td>
                              )}
                              {/* MODELO / P/N */}
                              {srvIdx === 0 && (
                                <td rowSpan={serviciosFiltrados.length} className="p-3 font-mono text-slate-300 bg-slate-900/20 border-r border-slate-800 align-top">
                                  {comp.modelo || '---'}
                                </td>
                              )}
                              {/* S/N */}
                              {srvIdx === 0 && (
                                <td rowSpan={serviciosFiltrados.length} className="p-3 font-mono text-slate-400 bg-slate-900/20 border-r border-slate-800 align-top">
                                  {comp.sn || '---'}
                                </td>
                              )}

                              {/* SERVICE */}
                              <td className="p-3 text-center font-bold">
                                <span className="bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-[10px] text-amber-400 font-black">
                                  {srv.service}
                                </span>
                              </td>

                              {/* INTERVAL */}
                              <td className="p-3 text-right font-mono text-slate-300">
                                {srv.tipoControl === 'HORAS' ? `${srv.intervalHoras}` : (srv.tipoControl === 'CALENDARIO' ? `${Math.round(srv.intervalMeses / 12)} AÑOS` : '---')}
                              </td>

                              {/* COMPLIANCE */}
                              <td className="p-3 text-right font-mono text-slate-400">
                                {srv.tipoControl === 'HORAS' ? srv.complianceHoras : (srv.tipoControl === 'CALENDARIO' ? srv.complianceFecha : '---')}
                              </td>

                              {/* TSO */}
                              <td className={`p-3 text-right font-mono font-bold ${esRojo ? 'text-rose-300' : 'text-slate-300'}`}>
                                {calc.tso}
                              </td>

                              {/* REMAIN */}
                              <td className="p-2 text-center">
                                <span className={`px-2.5 py-1 rounded text-xs font-mono inline-block min-w-[70px] ${celdaRemainClass}`}>
                                  {calc.remain}
                                </span>
                              </td>

                              {/* NEXT COMPLIANCE */}
                              <td className="p-3 text-right font-mono font-bold text-slate-200">
                                {calc.nextCompliance}
                              </td>

                              {/* ACCIONES */}
                              {srvIdx === 0 && (
                                <td rowSpan={serviciosFiltrados.length} className="p-3 text-center align-top">
                                  <div className="flex gap-1.5 justify-center">
                                    <button
                                      onClick={() => {
                                        setComponenteForm(comp);
                                        setMostrarModalComponente(true);
                                      }}
                                      className="text-slate-400 hover:text-white p-1"
                                      title="Editar Componente"
                                    >
                                      ✏️
                                    </button>
                                    <button
                                      onClick={() => eliminarComponente(comp.id)}
                                      className="text-slate-500 hover:text-rose-400 p-1"
                                      title="Eliminar Componente"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* MODAL GESTIONAR SECCIONES */}
          {mostrarModalSecciones && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-[#111827] text-white border border-slate-700 w-full max-w-md rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xl font-black mb-4 uppercase text-center text-amber-400">Gestionar Secciones</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                  {secciones.map((sec, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-900 p-2 rounded-xl border border-slate-800">
                      <input
                        className="bg-transparent text-xs font-bold text-white flex-1"
                        value={sec}
                        onChange={(e) => {
                          const n = [...secciones];
                          n[i] = e.target.value;
                          setSecciones(n);
                        }}
                      />
                      <button onClick={() => setSecciones(secciones.filter((_, idx) => idx !== i))} className="text-slate-500 hover:text-rose-400 p-1">
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mb-4">
                  <input
                    placeholder="Nueva Sección..."
                    className="flex-1 bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white uppercase"
                    value={nuevaSeccionNombre}
                    onChange={(e) => setNuevaSeccionNombre(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      if (nuevaSeccionNombre.trim()) {
                        setSecciones([...secciones, nuevaSeccionNombre.trim().toUpperCase()]);
                        setNuevaSeccionNombre('');
                      }
                    }}
                    className="bg-amber-400 text-slate-950 font-black px-3 py-2 rounded-xl text-xs uppercase"
                  >
                    + Crear
                  </button>
                </div>
                <button onClick={() => setMostrarModalSecciones(false)} className="w-full bg-slate-800 text-slate-300 py-2.5 rounded-xl font-bold uppercase text-xs">
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {/* MODAL COMPLETO AÑADIR / EDITAR COMPONENTE */}
          {mostrarModalComponente && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-[#111827] text-white border border-slate-700 w-full max-w-xl rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-black mb-4 uppercase text-center text-amber-400">
                  {componenteForm.id ? 'Editar Componente' : 'Añadir Componente'}
                </h3>
                <form onSubmit={guardarComponente} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-sky-400 uppercase block">Sección / Sistema</label>
                    <select
                      className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl font-bold mt-1 text-xs text-white"
                      value={componenteForm.seccion}
                      onChange={(e) => setComponenteForm({ ...componenteForm, seccion: e.target.value })}
                    >
                      {secciones.map((sec, i) => (
                        <option key={i} value={sec}>{sec}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">Descripción del Componente</label>
                    <input
                      required
                      placeholder="Ej. MAGNETO RH KELLY AEROSPACE"
                      className="w-full bg-[#1f2937] border border-slate-700 p-2.5 rounded-xl font-bold mt-1 text-xs text-white"
                      value={componenteForm.descripcion}
                      onChange={(e) => setComponenteForm({ ...componenteForm, descripcion: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block">Modelo / P/N</label>
                      <input
                        placeholder="Ej. 10-51360-45R"
                        className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white"
                        value={componenteForm.modelo}
                        onChange={(e) => setComponenteForm({ ...componenteForm, modelo: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block">Número de Serie (S/N)</label>
                      <input
                        placeholder="Ej. D09239"
                        className="w-full bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white"
                        value={componenteForm.sn}
                        onChange={(e) => setComponenteForm({ ...componenteForm, sn: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* SUB-SERVICIOS / INTERVALOS DEL COMPONENTE */}
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-amber-400 uppercase">Directivas / Servicios del Componente</span>
                      <button
                        type="button"
                        onClick={() => {
                          const nuevoSrv = {
                            id: `s_${Date.now()}`,
                            service: 'O/R',
                            tipoControl: 'HORAS',
                            referenciaBase: 'MOTOR',
                            complianceHoras: '00:00',
                            intervalHoras: '1000:00',
                            complianceFecha: '',
                            intervalMeses: 48
                          };
                          setComponenteForm({
                            ...componenteForm,
                            servicios: [...componenteForm.servicios, nuevoSrv]
                          });
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase"
                      >
                        + Añadir Otro Intervalo
                      </button>
                    </div>

                    {componenteForm.servicios.map((srv, idx) => (
                      <div key={srv.id || idx} className="bg-[#1f2937] p-3 rounded-xl space-y-2 border border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-slate-400 font-bold">Línea de Intervalo #{idx + 1}</span>
                          {componenteForm.servicios.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                setComponenteForm({
                                  ...componenteForm,
                                  servicios: componenteForm.servicios.filter((_, i) => i !== idx)
                                });
                              }}
                              className="text-rose-400 hover:text-rose-300 text-xs font-bold"
                            >
                              Eliminar Línea
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase block">Service</label>
                            <select
                              className="w-full bg-[#111827] border border-slate-700 p-1.5 rounded-lg text-xs text-white"
                              value={srv.service}
                              onChange={(e) => {
                                const n = [...componenteForm.servicios];
                                n[idx].service = e.target.value;
                                setComponenteForm({ ...componenteForm, servicios: n });
                              }}
                            >
                              <option value="I">I (Inspección)</option>
                              <option value="O">O (Overhaul)</option>
                              <option value="S">S (Servicio)</option>
                              <option value="R">R (Reemplazo)</option>
                              <option value="O/R">O/R</option>
                              <option value="R/O">R/O</option>
                              <option value="I / O">I / O</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase block">Tipo Control</label>
                            <select
                              className="w-full bg-[#111827] border border-slate-700 p-1.5 rounded-lg text-xs text-white"
                              value={srv.tipoControl}
                              onChange={(e) => {
                                const n = [...componenteForm.servicios];
                                n[idx].tipoControl = e.target.value;
                                setComponenteForm({ ...componenteForm, servicios: n });
                              }}
                            >
                              <option value="HORAS">Horas de Vuelo</option>
                              <option value="CALENDARIO">Tiempo Calendario</option>
                              <option value="ON_CONDITION">On Condition</option>
                            </select>
                          </div>
                        </div>

                        {srv.tipoControl === 'HORAS' && (
                          <div className="space-y-2 pt-1 border-t border-slate-700">
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 uppercase block">Base de Horas</label>
                              <div className="flex gap-2 mt-0.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const n = [...componenteForm.servicios];
                                    n[idx].referenciaBase = 'AVION';
                                    setComponenteForm({ ...componenteForm, servicios: n });
                                  }}
                                  className={`flex-1 py-1 rounded text-[10px] font-bold ${srv.referenciaBase === 'AVION' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                                >
                                  Total Avión
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const n = [...componenteForm.servicios];
                                    n[idx].referenciaBase = 'MOTOR';
                                    setComponenteForm({ ...componenteForm, servicios: n });
                                  }}
                                  className={`flex-1 py-1 rounded text-[10px] font-bold ${srv.referenciaBase === 'MOTOR' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                                >
                                  Total Motor
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[9px] font-bold text-slate-400 uppercase block">Compliance (HH:MM)</label>
                                <input
                                  placeholder="11945:52"
                                  className="w-full bg-[#111827] border border-slate-700 p-1.5 rounded-lg text-xs text-white font-mono"
                                  value={srv.complianceHoras}
                                  onChange={(e) => {
                                    const n = [...componenteForm.servicios];
                                    n[idx].complianceHoras = e.target.value;
                                    setComponenteForm({ ...componenteForm, servicios: n });
                                  }}
                                />
                              </div>
                              <div>
                                <label className="text-[9px] font-bold text-slate-400 uppercase block">Intervalo (HH:MM)</label>
                                <input
                                  placeholder="500:00"
                                  className="w-full bg-[#111827] border border-slate-700 p-1.5 rounded-lg text-xs text-white font-mono"
                                  value={srv.intervalHoras}
                                  onChange={(e) => {
                                    const n = [...componenteForm.servicios];
                                    n[idx].intervalHoras = e.target.value;
                                    setComponenteForm({ ...componenteForm, servicios: n });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {srv.tipoControl === 'CALENDARIO' && (
                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-700">
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 uppercase block">Fecha Compliance</label>
                              <input
                                type="date"
                                className="w-full bg-[#111827] border border-slate-700 p-1.5 rounded-lg text-xs text-white"
                                value={srv.complianceFecha}
                                onChange={(e) => {
                                  const n = [...componenteForm.servicios];
                                  n[idx].complianceFecha = e.target.value;
                                  setComponenteForm({ ...componenteForm, servicios: n });
                                }}
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 uppercase block">Intervalo (Meses)</label>
                              <input
                                type="number"
                                placeholder="12 = 1 año, 48 = 4 años"
                                className="w-full bg-[#111827] border border-slate-700 p-1.5 rounded-lg text-xs text-white"
                                value={srv.intervalMeses}
                                onChange={(e) => {
                                  const n = [...componenteForm.servicios];
                                  n[idx].intervalMeses = e.target.value;
                                  setComponenteForm({ ...componenteForm, servicios: n });
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button type="submit" className="bg-amber-400 text-slate-950 py-3 rounded-xl font-black uppercase text-xs">
                      Guardar Componente
                    </button>
                    <button type="button" onClick={() => setMostrarModalComponente(false)} className="bg-slate-800 text-slate-300 py-3 rounded-xl font-bold uppercase text-xs">
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      );
    }

    // SUBVISTA 4.4: BITÁCORA INTERNA
    if (subVistaAvion === 'BITACORA') {
      return (
        <main className="p-4 md:p-8 bg-[#0b1120] min-h-screen text-slate-100">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setSubVistaAvion('DASHBOARD')} className="text-amber-400 font-bold italic text-sm">
              ← VOLVER AL CONTROL DE HORAS
            </button>
          </div>
          <h1 className="text-2xl font-black uppercase text-white mb-6">
            📖 Bitácora de Vuelos — {avionSeleccionado.matricula}
          </h1>
          <div className="space-y-3">
            {(avionSeleccionado.historial || []).length === 0 ? (
              <p className="text-slate-500 italic p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                No hay registros en la bitácora aún.
              </p>
            ) : (
              (avionSeleccionado.historial || []).map((v) => (
                <div key={v.id} className="bg-[#111827] border border-slate-800 p-4 rounded-2xl flex justify-between items-center shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">{v.fecha}</span>
                    <span className="text-2xl font-black text-amber-400 font-mono">{v.tiempo}h</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {v.capitanes && v.capitanes.map((c, idx) => (
                        <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-700">
                          👨‍✈️ {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      );
    }

    // SUBVISTA 4.0: CONTROL DE TIEMPOS Y HORAS (DASHBOARD DEL AVIÓN)
    return (
      <main className="p-6 bg-[#0b1120] min-h-screen text-slate-100">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navegarA('FLOTA')} className="text-amber-400 font-bold flex items-center text-sm">
            {"<"} Flota
          </button>
          <div className="flex flex-wrap gap-2 items-center">
            {alertasActuales.total > 0 && (
              <button
                onClick={() => { setSubVistaAvion('RECORDS'); setFiltroSoloAlertas(true); }}
                className="text-[10px] font-black px-3 py-1.5 rounded-full uppercase flex items-center gap-1.5 bg-rose-600 text-white animate-pulse"
              >
                🚨 {alertasActuales.total} ALERTAS
              </button>
            )}
            <button onClick={() => setSubVistaAvion('MANTTO')} className="text-[10px] font-black bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              📑 REGISTROS MANTTO
            </button>
            <button onClick={() => setSubVistaAvion('REEMPLAZOS')} className="text-[10px] font-black bg-sky-950 border border-sky-700 text-sky-300 hover:bg-sky-900 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              🔄 REEMPLAZOS
            </button>
            <button onClick={() => setSubVistaAvion('RECORDS')} className="text-[10px] font-black bg-amber-400 text-slate-950 hover:bg-amber-300 px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow">
              📋 RECORDS ({avionSeleccionado.componentes?.length || 0})
            </button>
            <button onClick={() => setSubVistaAvion('BITACORA')} className="text-[10px] font-black bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full text-slate-300 hover:text-white">
              📖 BITÁCORA
            </button>
            <button onClick={() => setMostrarModalEditarAvion(true)} className="text-[10px] font-black bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full text-slate-300 hover:text-white">
              EDITAR
            </button>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-white">{avionSeleccionado.matricula}</h1>
          <p className="text-amber-400 font-bold uppercase text-sm mt-1">{avionSeleccionado.modelo}</p>
          <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">
            SERIAL {avionSeleccionado.serie} {avionSeleccionado.esBimotor && '— [BIMOTOR]'}
          </p>
        </div>

        {/* TARJETAS PRINCIPALES */}
        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-emerald-950/20 border-2 border-emerald-500/50 rounded-2xl p-4 text-center">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Total Avión</p>
            <p className="text-4xl font-black text-emerald-300 font-mono mt-1">{avionSeleccionado.totalAvion}</p>
          </div>
          <div className="bg-amber-950/20 border-2 border-amber-500/50 rounded-2xl p-4 text-center">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Próximo SV</p>
            <p className="text-4xl font-black text-amber-300 font-mono mt-1">{avionSeleccionado.proximoSv}</p>
          </div>
          <div className="bg-blue-950/20 border-2 border-blue-500/50 rounded-2xl p-4 text-center">
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Remanente</p>
            <p className="text-4xl font-black text-blue-300 font-mono mt-1">{avionSeleccionado.remanente}</p>
          </div>

          {/* MOTORES Y HÉLICES */}
          {avionSeleccionado.esBimotor ? (
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-emerald-400 uppercase">Total Motor LH</p>
                  <p className="text-xl font-black text-emerald-300 font-mono">{avionSeleccionado.totalMotorLH}</p>
                </div>
                <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-emerald-400 uppercase">Total Motor RH</p>
                  <p className="text-xl font-black text-emerald-300 font-mono">{avionSeleccionado.totalMotorRH}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-sky-950/20 border-2 border-sky-500/40 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-sky-400 uppercase">DURG Motor LH</p>
                  <p className="text-xl font-black text-sky-300 font-mono">{avionSeleccionado.durgMotorLH}</p>
                </div>
                <div className="bg-sky-950/20 border-2 border-sky-500/40 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-sky-400 uppercase">DURG Motor RH</p>
                  <p className="text-xl font-black text-sky-300 font-mono">{avionSeleccionado.durgMotorRH}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-emerald-400 uppercase">Total Hélice LH</p>
                  <p className="text-xl font-black text-emerald-300 font-mono">{avionSeleccionado.totalHeliceLH}</p>
                </div>
                <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-emerald-400 uppercase">Total Hélice RH</p>
                  <p className="text-xl font-black text-emerald-300 font-mono">{avionSeleccionado.totalHeliceRH}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-sky-950/20 border-2 border-sky-500/40 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-sky-400 uppercase">DURG Hélice LH</p>
                  <p className="text-xl font-black text-sky-300 font-mono">{avionSeleccionado.durgHeliceLH}</p>
                </div>
                <div className="bg-sky-950/20 border-2 border-sky-500/40 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-sky-400 uppercase">DURG Hélice RH</p>
                  <p className="text-xl font-black text-sky-300 font-mono">{avionSeleccionado.durgHeliceRH}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-emerald-400 uppercase">Total Motor</p>
                  <p className="text-xl font-black text-emerald-300 font-mono mt-0.5">{avionSeleccionado.totalMotor}</p>
                </div>
                <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-emerald-400 uppercase">Total Hélice</p>
                  <p className="text-xl font-black text-emerald-300 font-mono mt-0.5">{avionSeleccionado.totalHelice}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sky-950/20 border-2 border-sky-500/40 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-sky-400 uppercase">DURG Motor</p>
                  <p className="text-xl font-black text-sky-300 font-mono mt-0.5">{avionSeleccionado.durgMotor}</p>
                </div>
                <div className="bg-sky-950/20 border-2 border-sky-500/40 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-sky-400 uppercase">DURG Hélice</p>
                  <p className="text-xl font-black text-sky-300 font-mono mt-0.5">{avionSeleccionado.durgHelice}</p>
                </div>
              </div>
            </div>
          )}

          <button onClick={() => setMostrarModalVuelo(true)} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest mt-4 shadow-xl shadow-blue-600/20 transition-all">
            Registrar Vuelo
          </button>
        </div>

        {/* MODAL EDITAR AVIÓN */}
        {mostrarModalEditarAvion && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111827] text-white border border-slate-700 w-full max-w-sm rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
              <h3 className="text-xl font-black mb-6 uppercase text-center text-amber-400">Editar Aeronave</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setMostrarModalEditarAvion(false); }}>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">S/N</label>
                  <input className="w-full bg-[#1f2937] border border-slate-700 p-2.5 rounded-xl font-bold mt-1 text-white" value={avionSeleccionado.serie} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, serie: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Total Avión</label>
                    <input className="w-full bg-[#1f2937] border border-slate-700 p-2.5 rounded-xl font-bold mt-1 text-white font-mono" value={avionSeleccionado.totalAvion} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, totalAvion: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Próximo SV</label>
                    <input className="w-full bg-[#1f2937] border border-slate-700 p-2.5 rounded-xl font-bold mt-1 text-white font-mono" value={avionSeleccionado.proximoSv} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, totalAvion: e.target.value})} />
                  </div>
                </div>

                {avionSeleccionado.esBimotor ? (
                  <div className="space-y-2 pt-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input placeholder="Tot Motor LH" className="bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white font-mono" value={avionSeleccionado.totalMotorLH} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, totalMotorLH: e.target.value})} />
                      <input placeholder="Tot Motor RH" className="bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white font-mono" value={avionSeleccionado.totalMotorRH} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, totalMotorRH: e.target.value})} />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <input placeholder="Total Motor" className="bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white font-mono" value={avionSeleccionado.totalMotor} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, totalMotor: e.target.value})} />
                    <input placeholder="Total Hélice" className="bg-[#1f2937] border border-slate-700 p-2 rounded-xl text-xs text-white font-mono" value={avionSeleccionado.totalHelice} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, totalHelice: e.target.value})} />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button type="submit" className="bg-amber-400 text-slate-950 py-3 rounded-xl font-black uppercase text-xs">Guardar</button>
                  <button type="button" onClick={() => setMostrarModalEditarAvion(false)} className="bg-slate-800 text-slate-300 py-3 rounded-xl font-bold uppercase text-xs">Cerrar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL REGISTRAR VUELO */}
        {mostrarModalVuelo && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#111827] text-white border border-slate-700 w-full max-w-sm rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-black mb-4 text-center uppercase text-amber-400">Registrar Vuelo</h3>
              <form onSubmit={registrarVuelo} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Fecha</label>
                  <input type="date" className="w-full bg-[#1f2937] border border-slate-700 p-2.5 rounded-xl font-bold text-white text-xs" value={fechaVuelo} onChange={(e) => setFechaVuelo(e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Tiempo de Vuelo</label>
                  <input type="text" placeholder="00:00" className="w-full bg-[#1f2937] border border-slate-700 p-3 rounded-xl font-bold text-2xl text-center text-white font-mono" value={duracionVuelo} onChange={(e) => setDuracionVuelo(e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Capitán(es) al mando</label>
                  <div className="bg-[#1f2937] border border-slate-700 rounded-xl p-2.5 max-h-32 overflow-y-auto space-y-1.5">
                    {capitanes.map((c) => (
                      <label key={c.id} className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={capitanesVuelo.includes(c.nombre)}
                          onChange={() => {
                            if (capitanesVuelo.includes(c.nombre)) setCapitanesVuelo(capitanesVuelo.filter(item => item !== c.nombre));
                            else setCapitanesVuelo([...capitanesVuelo, c.nombre]);
                          }}
                        />
                        {c.nombre}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button type="button" onClick={() => setMostrarModalVuelo(false)} className="py-3 bg-slate-800 text-slate-300 rounded-xl font-bold uppercase text-xs">Cancelar</button>
                  <button type="submit" className="py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase text-xs shadow-lg">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    );
  }

  // =========================================================================
  // VISTA 0: LISTADO PRINCIPAL DE LA FLOTA
  // =========================================================================
  return (
    <main className="p-4 md:p-8 bg-[#0b1120] min-h-screen text-white">
      {/* BARRA SUPERIOR CON ACCESOS */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-amber-400 italic uppercase tracking-tighter">Control Aéreo</h1>
          <p className="text-slate-400 text-xs mt-0.5">Gestión de TBO de Flota & Mantenimiento Aeronáutico</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => navegarA('REGISTROS_GLOBAL')}
            className="bg-[#111827] border border-slate-700 hover:border-amber-400 px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all shadow-xl text-xs font-black uppercase tracking-wider"
          >
            <span>📊</span> REGISTROS MANTTO (GLOBAL)
          </button>
          <button
            onClick={() => navegarA('ROSTER')}
            className="bg-[#111827] border border-slate-700 hover:border-amber-400 px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all shadow-xl text-xs font-black uppercase tracking-wider"
          >
            <span>🛠️</span> ROSTER ({rosterPersonal.length})
          </button>
          <button
            onClick={() => navegarA('OPERACIONES')}
            className="bg-[#111827] border border-slate-700 hover:border-amber-400 px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all shadow-xl text-xs font-black uppercase tracking-wider"
          >
            <span>✈️</span> OPERACIONES ({capitanes.length})
          </button>
          <button
            onClick={() => setMostrarModalAvion(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg transition-all"
          >
            + Añadir Avión
          </button>
        </div>
      </div>

      {/* BUSCADOR UNIVERSAL */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Buscar componente, P/N, S/N, OMAV, OTAV en toda la flota..."
            className="w-full bg-[#111827] border border-slate-800 focus:border-amber-400 p-4 rounded-2xl text-sm font-bold text-white placeholder-slate-500 transition-all outline-none shadow-xl"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />
          {terminoBusqueda && (
            <button
              onClick={() => setTerminoBusqueda('')}
              className="absolute right-4 top-4 text-xs font-bold text-slate-400 hover:text-white"
            >
              LIMPIAR
            </button>
          )}
        </div>

        {resultadosBusqueda && resultadosBusqueda.length > 0 && (
          <div className="mt-3 bg-[#111827] border border-slate-800 rounded-2xl p-4 space-y-2 shadow-2xl">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Resultados de Búsqueda ({resultadosBusqueda.length})
            </span>
            {resultadosBusqueda.map((res, i) => (
              <div
                key={i}
                onClick={res.accion}
                className="p-3 bg-slate-900 hover:bg-slate-800/80 rounded-xl cursor-pointer flex justify-between items-center transition-all border border-slate-800/80"
              >
                <div>
                  <span className="text-[9px] font-black uppercase bg-slate-800 px-2 py-0.5 rounded text-amber-400 mr-2">
                    {res.tipo}
                  </span>
                  <span className="font-black text-white text-xs mr-2">{res.aeronave}</span>
                  <span className="text-slate-300 text-xs font-mono">{res.detalle}</span>
                </div>
                <span className="text-amber-400 text-xs font-black">IR →</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LISTADO DE LA FLOTA */}
      <div className="space-y-4">
        {flota.map((av) => {
          const alertas = obtenerAlertasAvion(av);
          return (
            <div
              key={av.id}
              className="bg-[#111827] p-6 rounded-2xl border border-slate-800 hover:border-amber-400 transition-all flex justify-between items-center group shadow-xl"
            >
              <div onClick={() => navegarA('AVION', av)} className="cursor-pointer flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-black group-hover:text-amber-400 transition-colors tracking-tight text-white">{av.matricula}</h2>
                  {av.esBimotor && (
                    <span className="text-[9px] font-black bg-sky-950 text-sky-300 border border-sky-700 px-2 py-0.5 rounded uppercase">
                      BIMOTOR
                    </span>
                  )}
                  {alertas.total > 0 && (
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex items-center gap-1 bg-rose-500/20 text-rose-400 border border-rose-500 animate-pulse">
                      ⚠️ {alertas.total} {alertas.total === 1 ? 'ALERTA' : 'ALERTAS'}
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm font-bold uppercase mt-0.5">
                  {av.modelo} — <span className="text-slate-500 font-normal italic text-xs">S/N {av.serie}</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                {confirmarEliminarAvion === av.id ? (
                  <div className="flex gap-1">
                    <button onClick={() => setFlota(flota.filter(a => a.id !== av.id))} className="bg-rose-600 text-white px-2 py-1 rounded text-[9px] font-bold">SI</button>
                    <button onClick={() => setConfirmarEliminarAvion(null)} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-[9px] font-bold">NO</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmarEliminarAvion(av.id)} className="text-slate-600 hover:text-rose-400 p-1.5">
                    🗑️
                  </button>
                )}
                <div onClick={() => navegarA('AVION', av)} className="text-amber-400 font-black text-xl group-hover:translate-x-1 transition-transform cursor-pointer">
                  →
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL CREAR NUEVA AERONAVE */}
      {mostrarModalAvion && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] text-white border border-slate-700 w-full max-w-md rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-black mb-4 uppercase text-center text-amber-400">Añadir Nueva Aeronave</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              setFlota([...flota, { ...nuevoAvionForm, id: Date.now(), historial: [], componentes: [], ordenesTrabajo: [], reemplazos: [] }]);
              setMostrarModalAvion(false);
            }} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Matrícula</label>
                <input
                  required
                  placeholder="Ej. HK5000-G"
                  className="w-full bg-[#1f2937] border border-slate-700 p-2.5 rounded-xl font-bold mt-1 text-sm text-white uppercase"
                  value={nuevoAvionForm.matricula}
                  onChange={(e) => setNuevoAvionForm({ ...nuevoAvionForm, matricula: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Modelo</label>
                  <input
                    required
                    placeholder="Ej. CESSNA 172N"
                    className="w-full bg-[#1f2937] border border-slate-700 p-2.5 rounded-xl font-bold mt-1 text-xs text-white uppercase"
                    value={nuevoAvionForm.modelo}
                    onChange={(e) => setNuevoAvionForm({ ...nuevoAvionForm, modelo: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Número de Serie</label>
                  <input
                    placeholder="Ej. 17270480"
                    className="w-full bg-[#1f2937] border border-slate-700 p-2.5 rounded-xl font-bold mt-1 text-xs text-white"
                    value={nuevoAvionForm.serie}
                    onChange={(e) => setNuevoAvionForm({ ...nuevoAvionForm, serie: e.target.value })}
                  />
                </div>
              </div>
              <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-amber-400 uppercase block mb-2">Configuración</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNuevoAvionForm({ ...nuevoAvionForm, esBimotor: false })}
                    className={`flex-1 py-2 rounded-xl text-xs font-black uppercase ${!nuevoAvionForm.esBimotor ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                  >
                    Monomotor
                  </button>
                  <button
                    type="button"
                    onClick={() => setNuevoAvionForm({ ...nuevoAvionForm, esBimotor: true })}
                    className={`flex-1 py-2 rounded-xl text-xs font-black uppercase ${nuevoAvionForm.esBimotor ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                  >
                    Bimotor
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button type="submit" className="bg-amber-400 text-slate-950 py-3 rounded-xl font-black uppercase text-xs">
                  Crear Aeronave
                </button>
                <button type="button" onClick={() => setMostrarModalAvion(false)} className="bg-slate-800 text-slate-300 py-3 rounded-xl font-bold uppercase text-xs">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}