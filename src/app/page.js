"use client";
import React, { useState } from 'react';

export default function ControlAereo() {
  const [avionSeleccionado, setAvionSeleccionado] = useState(null);

  const flota = [
    { id: 1, matricula: 'HK5111-G', modelo: 'CESSNA 172N', serie: '17270480', totalAvion: '13989:41', proximoSv: '14039:00', remanente: '49:19', totalMotor: '9846:27', durgMotor: '1649:19', totalHelice: '12115:19', durgHelice: '699:43' },
    { id: 2, matricula: 'HK1687-G', modelo: 'PIPER PA-28-140', serie: '28-7525181', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00' },
    { id: 3, matricula: 'HK3945-G', modelo: 'PIPER PA-34-220T', serie: '34-8133106', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00' },
    { id: 4, matricula: 'HJ513',    modelo: 'ELA', serie: '#######', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00' },
    { id: 5, matricula: 'HK2265-G', modelo: 'CESSNA TR182', serie: 'CR18200327', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00' },
    { id: 6, matricula: 'HK4707-G', modelo: 'CESSNA A150M', serie: 'A1500727', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00' },
    { id: 7, matricula: 'HK1687-G', modelo: 'PIPER PA-28-180', serie: '28-7525159', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00' },
    { id: 8, matricula: 'HK4915-G', modelo: 'AEROCOMMANDER 680E', serie: '680E-833-93', totalAvion: '0000:00', proximoSv: '0000:00', remanente: '00:00', totalMotor: '0000:00', durgMotor: '0000:00', totalHelice: '0000:00', durgHelice: '00:00' },
  ];

  if (avionSeleccionado) {
    const avion = avionSeleccionado;
    return (
      <main className="p-6 bg-slate-50 min-h-screen text-slate-900 font-sans">
        <button onClick={() => setAvionSeleccionado(null)} className="text-blue-600 mb-6 flex items-center font-bold">
          <span className="mr-2">{"<"}</span> Flota
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black">{avion.matricula}</h1>
          <p className="text-blue-500 font-bold">{avion.modelo}</p>
          <p className="text-slate-400 text-xs">SERIAL {avion.serie}</p>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          {/* CONTROL DE HORAS - TITULO INTERNO */}
          <p className="text-center font-black text-slate-500 tracking-widest text-sm mb-4">CONTROL DE HORAS</p>
          
          {/* Caja Total Avión */}
          <div className="bg-[#e8f5e9] border-2 border-[#81c784] rounded-2xl p-4 text-center">
            <p className="text-[10px] font-bold text-slate-600 uppercase">Total Avión</p>
            <p className="text-4xl font-black">{avion.totalAvion}</p>
          </div>

          {/* Caja Próximo SV */}
          <div className="bg-[#fffde7] border-2 border-[#fff176] rounded-2xl p-4 text-center">
            <p className="text-[10px] font-bold text-slate-600 uppercase">Próximo SV</p>
            <p className="text-4xl font-black">{avion.proximoSv}</p>
          </div>

          {/* Caja Remanente */}
          <div className="bg-[#e8eaf6] border-2 border-[#7986cb] rounded-2xl p-4 text-center">
            <p className="text-[10px] font-bold text-slate-600 uppercase">Remanente</p>
            <p className="text-4xl font-black">{avion.remanente}</p>
          </div>

          {/* Fila Motor y Hélice */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#f1f8e9] border-2 border-[#aed581] rounded-xl p-3 text-center">
              <p className="text-[9px] font-bold text-slate-600">TOTAL MOTOR</p>
              <p className="text-xl font-black">{avion.totalMotor}</p>
            </div>
            <div className="bg-[#f1f8e9] border-2 border-[#aed581] rounded-xl p-3 text-center">
              <p className="text-[9px] font-bold text-slate-600">TOTAL HELICE</p>
              <p className="text-xl font-black">{avion.totalHelice}</p>
            </div>
          </div>

          {/* Fila DURG */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#e1f5fe] border-2 border-[#4fc3f7] rounded-xl p-3 text-center">
              <p className="text-[9px] font-bold text-slate-600">DURG MOTOR</p>
              <p className="text-xl font-black">{avion.durgMotor}</p>
            </div>
            <div className="bg-[#e1f5fe] border-2 border-[#4fc3f7] rounded-xl p-3 text-center">
              <p className="text-[9px] font-bold text-slate-600">DURG HELICE</p>
              <p className="text-xl font-black">{avion.durgHelice}</p>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest mt-6 flex items-center justify-center">
            <span className="bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center mr-2 text-xs">+</span>
            Registrar Vuelo
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8 bg-slate-900 min-h-screen text-white">
      <h1 className="text-4xl font-black text-yellow-400 mb-10 italic">CONTROL AÉREO</h1>
      <div className="space-y-4">
        {flota.map((avion) => (
          <div 
            key={avion.id} 
            onClick={() => setAvionSeleccionado(avion)}
            className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-yellow-500 cursor-pointer transition-all flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-black">{avion.matricula}</h2>
              <p className="text-slate-400 text-sm font-bold">{avion.modelo} - S/N {avion.serie}</p>
            </div>
            <div className="text-yellow-500 font-black tracking-widest">
              {">"}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}