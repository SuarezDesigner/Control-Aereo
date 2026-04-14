"use client";
import React, { useState } from 'react';

export default function ControlAereo() {
  const [avionSeleccionado, setAvionSeleccionado] = useState(null);
  const [mostrarModalVuelo, setMostrarModalVuelo] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [verHistorialInterno, setVerHistorialInterno] = useState(false);
  
  const [duracionVuelo, setDuracionVuelo] = useState("00:00");
  const [fechaVuelo, setFechaVuelo] = useState(new Date().toISOString().split('T')[0]);
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);

  const [flota, setFlota] = useState([
    { id: 1, matricula: 'HK5111-G', modelo: 'CESSNA 172N', serie: '17270480', totalAvion: '14075:11', proximoSv: '14090:23', remanente: '15:12', totalMotor: '9931:57', durgMotor: '1734:49', totalHelice: '12200:49', durgHelice: '785:13', historial: [] },
    { id: 2, matricula: 'HK1687-G', modelo: 'PIPER PA-28-140', serie: '28-7525181', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00', historial: [] },
    { id: 3, matricula: 'HK3945-G', modelo: 'PIPER PA-34-220T', serie: '34-8133106', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00', historial: [] },
    { id: 4, matricula: 'HJ513',    modelo: 'ELA', serie: '#######', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00', historial: [] },
    { id: 5, matricula: 'HK2265-G', modelo: 'CESSNA TR182', serie: 'CR18200327', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00', historial: [] },
    { id: 6, matricula: 'HK4707-G', modelo: 'CESSNA A150M', serie: 'A1500727', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00', historial: [] },
    { id: 7, matricula: 'HK1687-G', modelo: 'PIPER PA-28-180', serie: '28-7525159', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00', historial: [] },
    { id: 8, matricula: 'HK4915-G', modelo: 'AEROCOMMANDER 680E', serie: '680E-833-93', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00', historial: [] },
  ]);

  const sumarTiempos = (t1, t2, resta = false) => {
    const [h1, m1] = (t1 || "00:00").replace('-', '').split(':').map(Number);
    const [h2, m2] = (t2 || "00:00").split(':').map(Number);
    let min1 = h1 * 60 + m1, min2 = h2 * 60 + m2;
    let res = resta ? min1 - min2 : min1 + min2;
    return `${res < 0 ? '-' : ''}${Math.floor(Math.abs(res)/60)}:${(Math.abs(res)%60).toString().padStart(2, '0')}`;
  };

  const registrarVuelo = (e) => {
    e.preventDefault();
    const nuevaFlota = flota.map(av => {
      if (av.id === avionSeleccionado.id) {
        return {
          ...av,
          totalAvion: sumarTiempos(av.totalAvion, duracionVuelo),
          totalMotor: sumarTiempos(av.totalMotor, duracionVuelo),
          totalHelice: sumarTiempos(av.totalHelice, duracionVuelo),
          durgMotor: sumarTiempos(av.durgMotor, duracionVuelo),
          durgHelice: sumarTiempos(av.durgHelice, duracionVuelo),
          remanente: sumarTiempos(av.remanente, duracionVuelo, true),
          historial: [{ id: Date.now(), fecha: fechaVuelo, tiempo: duracionVuelo }, ...av.historial]
        };
      }
      return av;
    });
    setFlota(nuevaFlota);
    setAvionSeleccionado(nuevaFlota.find(a => a.id === avionSeleccionado.id));
    setMostrarModalVuelo(false);
  };

  const eliminarVuelo = (vuelo) => {
    const nuevaFlota = flota.map(av => {
      if (av.id === avionSeleccionado.id) {
        return {
          ...av,
          totalAvion: sumarTiempos(av.totalAvion, vuelo.tiempo, true),
          totalMotor: sumarTiempos(av.totalMotor, vuelo.tiempo, true),
          totalHelice: sumarTiempos(av.totalHelice, vuelo.tiempo, true),
          durgMotor: sumarTiempos(av.durgMotor, vuelo.tiempo, true),
          durgHelice: sumarTiempos(av.durgHelice, vuelo.tiempo, true),
          remanente: sumarTiempos(av.remanente, vuelo.tiempo, false),
          historial: av.historial.filter(h => h.id !== vuelo.id)
        };
      }
      return av;
    });
    setFlota(nuevaFlota);
    setAvionSeleccionado(nuevaFlota.find(a => a.id === avionSeleccionado.id));
    setConfirmarEliminar(null);
  };

  if (avionSeleccionado) {
    if (verHistorialInterno) {
      return (
        <main className="p-6 bg-slate-900 min-h-screen text-white">
          <button onClick={() => setVerHistorialInterno(false)} className="text-yellow-400 font-bold mb-6 italic">← VOLVER</button>
          <h1 className="text-2xl font-black mb-6 uppercase tracking-tighter">Historial {avionSeleccionado.matricula}</h1>
          <div className="space-y-3">
            {avionSeleccionado.historial.map(v => (
              <div key={v.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                <div><p className="text-[10px] text-slate-400 font-bold uppercase">{v.fecha}</p><p className="font-black text-xl text-yellow-500">{v.tiempo}h</p></div>
                {confirmarEliminar === v.id ? (
                  <div className="flex gap-2 bg-slate-700 p-2 rounded-lg">
                    <button onClick={() => eliminarVuelo(v)} className="bg-red-600 px-3 py-1 rounded text-[10px] font-bold uppercase">Si</button>
                    <button onClick={() => setConfirmarEliminar(null)} className="bg-slate-500 px-3 py-1 rounded text-[10px] font-bold uppercase">No</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmarEliminar(v.id)} className="text-slate-500 border border-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase">Eliminar</button>
                )}
              </div>
            ))}
          </div>
        </main>
      );
    }

    return (
      <main className="p-6 bg-slate-50 min-h-screen text-slate-900">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setAvionSeleccionado(null)} className="text-blue-600 font-bold flex items-center text-sm">{"<"} Flota</button>
          <div className="flex gap-2">
            <button onClick={() => setVerHistorialInterno(true)} className="text-[10px] font-black bg-blue-100 px-3 py-1 rounded-full text-blue-600">HISTORIAL</button>
            <button onClick={() => setMostrarModalEditar(true)} className="text-[10px] font-black bg-slate-200 px-3 py-1 rounded-full text-slate-500">EDITAR</button>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-4xl font-black">{avionSeleccionado.matricula}</h1>
          <p className="text-blue-500 font-bold uppercase text-sm">{avionSeleccionado.modelo}</p>
          <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">SERIAL {avionSeleccionado.serie}</p>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-[#e8f5e9] border-2 border-[#81c784] rounded-2xl p-4 text-center">
            <p className="text-[10px] font-bold text-slate-600 uppercase">Total Avión</p>
            <p className="text-4xl font-black">{avionSeleccionado.totalAvion}</p>
          </div>
          <div className="bg-[#fffde7] border-2 border-[#fff176] rounded-2xl p-4 text-center">
            <p className="text-[10px] font-bold text-slate-600 uppercase">Próximo SV</p>
            <p className="text-4xl font-black">{avionSeleccionado.proximoSv}</p>
          </div>
          <div className="bg-[#e8eaf6] border-2 border-[#7986cb] rounded-2xl p-4 text-center">
            <p className="text-[10px] font-bold text-slate-600 uppercase">Remanente</p>
            <p className="text-4xl font-black">{avionSeleccionado.remanente}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#e8f5e9] border-2 border-[#81c784] rounded-xl p-3 text-center">
              <p className="text-[9px] font-bold text-slate-500 uppercase">Total Motor</p>
              <p className="text-xl font-black">{avionSeleccionado.totalMotor}</p>
            </div>
            <div className="bg-[#e8f5e9] border-2 border-[#81c784] rounded-xl p-3 text-center">
              <p className="text-[9px] font-bold text-slate-500 uppercase">Total Helice</p>
              <p className="text-xl font-black">{avionSeleccionado.totalHelice}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#e1f5fe] border-2 border-[#4fc3f7] rounded-xl p-3 text-center">
              <p className="text-[9px] font-bold text-slate-500 uppercase">DURG Motor</p>
              <p className="text-xl font-black">{avionSeleccionado.durgMotor}</p>
            </div>
            <div className="bg-[#e1f5fe] border-2 border-[#4fc3f7] rounded-xl p-3 text-center">
              <p className="text-[9px] font-bold text-slate-500 uppercase">DURG Helice</p>
              <p className="text-xl font-black">{avionSeleccionado.durgHelice}</p>
            </div>
          </div>

          <button onClick={() => setMostrarModalVuelo(true)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest mt-4 shadow-lg shadow-blue-200">Registrar Vuelo</button>
        </div>

        {/* MODAL EDITAR ACTUALIZADO CON HELICE */}
        {mostrarModalEditar && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
              <h3 className="text-xl font-black mb-6 uppercase text-center">Editar Aeronave</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setMostrarModalEditar(false); }}>
                <div>
                  <label className="text-[10px] font-bold text-blue-600 uppercase ml-1">Número de Serie (S/N)</label>
                  <input className="w-full bg-slate-100 p-3 rounded-xl font-bold mt-1 text-slate-700" value={avionSeleccionado.serie} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, serie: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-blue-600 uppercase ml-1">Total Avión</label>
                    <input className="w-full bg-slate-100 p-3 rounded-xl font-bold mt-1 text-slate-700" value={avionSeleccionado.totalAvion} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, totalAvion: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-blue-600 uppercase ml-1">Próximo SV</label>
                    <input className="w-full bg-slate-100 p-3 rounded-xl font-bold mt-1 text-slate-700" value={avionSeleccionado.proximoSv} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, proximoSv: e.target.value})} />
                  </div>
                </div>
                <hr className="border-slate-100" />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-blue-600 uppercase ml-1">Total Motor</label>
                    <input className="w-full bg-slate-100 p-3 rounded-xl font-bold mt-1 text-slate-700" value={avionSeleccionado.totalMotor} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, totalMotor: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-blue-600 uppercase ml-1">DURG Motor</label>
                    <input className="w-full bg-slate-100 p-3 rounded-xl font-bold mt-1 text-slate-700" value={avionSeleccionado.durgMotor} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, durgMotor: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-blue-600 uppercase ml-1">Total Helice</label>
                    <input className="w-full bg-slate-100 p-3 rounded-xl font-bold mt-1 text-slate-700" value={avionSeleccionado.totalHelice} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, totalHelice: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-blue-600 uppercase ml-1">DURG Helice</label>
                    <input className="w-full bg-slate-100 p-3 rounded-xl font-bold mt-1 text-slate-700" value={avionSeleccionado.durgHelice} onChange={(e) => setAvionSeleccionado({...avionSeleccionado, durgHelice: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button type="submit" className="bg-blue-600 text-white py-3 rounded-xl font-bold uppercase text-xs shadow-md shadow-blue-200">Guardar</button>
                  <button type="button" onClick={() => setMostrarModalEditar(false)} className="bg-slate-200 py-3 rounded-xl font-bold uppercase text-xs">Cerrar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL REGISTRAR VUELO */}
        {mostrarModalVuelo && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-black mb-4 text-center uppercase">Registrar Vuelo</h3>
              <form onSubmit={registrarVuelo} className="space-y-4">
                <input type="date" className="w-full bg-slate-100 p-3 rounded-xl font-bold" value={fechaVuelo} onChange={(e) => setFechaVuelo(e.target.value)} />
                <input type="text" placeholder="00:00" className="w-full bg-slate-100 p-3 rounded-xl font-bold text-2xl text-center" value={duracionVuelo} onChange={(e) => setDuracionVuelo(e.target.value)} />
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button type="button" onClick={() => setMostrarModalVuelo(false)} className="py-3 bg-slate-200 rounded-xl font-bold uppercase text-xs">Cancelar</button>
                  <button type="submit" className="py-3 bg-blue-600 text-white rounded-xl font-bold uppercase text-xs shadow-lg shadow-blue-200">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="p-8 bg-slate-900 min-h-screen text-white">
      <h1 className="text-4xl font-black text-yellow-400 mb-10 italic uppercase tracking-tighter">Control Aéreo</h1>
      <div className="space-y-4">
        {flota.map((av) => (
          <div key={av.id} onClick={() => setAvionSeleccionado(av)} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-yellow-500 cursor-pointer transition-all flex justify-between items-center group active:scale-[0.98]">
            <div>
              <h2 className="text-2xl font-black group-hover:text-yellow-400 transition-colors tracking-tight">{av.matricula}</h2>
              <p className="text-slate-400 text-sm font-bold uppercase">{av.modelo} — <span className="text-slate-500 font-normal italic text-xs">S/N {av.serie}</span></p>
            </div>
            <div className="text-yellow-500 font-black text-xl">→</div>
          </div>
        ))}
      </div>
    </main>
  );
}