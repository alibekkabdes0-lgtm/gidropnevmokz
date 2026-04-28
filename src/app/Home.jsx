"use client";
import { useState } from "react";

// ============ SHARED UI ============
const FONT = "'Segoe UI', 'SF Pro Text', sans-serif";
const MONO = "'JetBrains Mono', monospace";

function Card({ children, title, accent = "#2563eb", collapsed: initCollapsed }) {
  const [open, setOpen] = useState(!initCollapsed);
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16, padding: open ? "24px 28px" : "16px 28px", marginBottom: 16,
      position: "relative", overflow: "hidden", transition: "padding 0.3s",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      {title && (
        <h3 onClick={() => setOpen(!open)} style={{
          margin: 0, fontSize: 14, fontWeight: 600, color: accent,
          letterSpacing: "0.04em", textTransform: "uppercase", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: open ? 16 : 0,
        }}>
          {title}
          <span style={{ fontSize: 18, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
        </h3>
      )}
      {open && children}
    </div>
  );
}

function Input({ label, value, onChange, unit, hint }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 11, color: "#94a3b8", marginBottom: 4, fontWeight: 500 }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="number" value={value} onChange={e => onChange(e.target.value)} style={{
          flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 8, padding: "9px 12px", color: "#e2e8f0", fontSize: 14, outline: "none", fontFamily: MONO,
        }} />
        {unit && <span style={{ fontSize: 11, color: "#64748b", minWidth: 36, fontWeight: 600 }}>{unit}</span>}
      </div>
      {hint && <span style={{ fontSize: 10, color: "#475569", marginTop: 2, display: "block" }}>{hint}</span>}
    </div>
  );
}

function Result({ label, value, unit, big }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <span style={{ fontSize: 12, color: "#94a3b8", maxWidth: "55%" }}>{label}</span>
      <span style={{ fontFamily: MONO, fontSize: big ? 20 : 15, fontWeight: big ? 700 : 500, color: big ? "#38bdf8" : "#e2e8f0" }}>
        {typeof value === "number" ? (Number.isFinite(value) ? value.toFixed(value < 0.01 ? 4 : 2) : "—") : value}
        {unit && <span style={{ fontSize: 10, color: "#64748b", marginLeft: 5 }}>{unit}</span>}
      </span>
    </div>
  );
}

function InfoBox({ children, color = "#2563eb" }) {
  return (
    <div style={{
      background: `${color}11`, border: `1px solid ${color}33`, borderRadius: 12,
      padding: "14px 18px", marginBottom: 14, fontSize: 13, lineHeight: 1.7, color: "#cbd5e1",
    }}>{children}</div>
  );
}

function StepBox({ number, title, children }) {
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
      <div style={{
        minWidth: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #2563eb, #38bdf8)", color: "#fff", fontWeight: 700, fontSize: 15,
      }}>{number}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#e2e8f0", marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>{children}</div>
      </div>
    </div>
  );
}

function ComponentTag({ name, value, color = "#2563eb" }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px",
      background: `${color}18`, border: `1px solid ${color}40`, borderRadius: 8,
      fontSize: 11, fontWeight: 600, marginRight: 6, marginBottom: 6,
    }}>
      <span style={{ color }}>{name}</span>
      <span style={{ color: "#94a3b8" }}>{value}</span>
    </div>
  );
}

// ============ SVG SCHEMES ============

function HydroScheme() {
  return (
    <svg viewBox="0 0 900 420" style={{ width: "100%", borderRadius: 12, background: "#0a0f1e" }}>
      <defs>
        <marker id="ah" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#3b82f6" /></marker>
        <marker id="ahr" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto"><path d="M8,0 L0,3 L8,6" fill="#ef4444" /></marker>
      </defs>
      <text x="450" y="22" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="600">ПРИНЦИПИАЛЬНАЯ ГИДРАВЛИЧЕСКАЯ СХЕМА</text>
      {/* Tank */}
      <rect x="30" y="330" width="100" height="60" rx="4" fill="none" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="80" y="365" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="600">Б (V=25л)</text>
      <text x="80" y="380" textAnchor="middle" fill="#64748b" fontSize="9">Бак гидравлический</text>
      {/* Pump */}
      <circle cx="80" cy="230" r="28" fill="none" stroke="#3b82f6" strokeWidth="1.5"/>
      <path d="M60,230 L100,230 M80,210 L80,250" stroke="#3b82f6" strokeWidth="1"/>
      <text x="80" y="276" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="600">Н1 (НШ10Д)</text>
      <text x="80" y="290" textAnchor="middle" fill="#64748b" fontSize="9">Q=10 л/мин</text>
      <text x="80" y="302" textAnchor="middle" fill="#64748b" fontSize="9">P=6.3 МПа</text>
      <line x1="80" y1="330" x2="80" y2="258" stroke="#3b82f6" strokeWidth="1.5"/>
      {/* Motor */}
      <rect x="30" y="160" width="100" height="35" rx="3" fill="none" stroke="#64748b" strokeWidth="1"/>
      <text x="80" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">М ~380В | 1.5 кВт</text>
      <line x1="80" y1="195" x2="80" y2="202" stroke="#64748b" strokeWidth="1"/>
      {/* Filter intake */}
      <rect x="40" y="310" width="80" height="16" rx="2" fill="none" stroke="#475569" strokeWidth="1"/>
      <text x="80" y="322" textAnchor="middle" fill="#475569" fontSize="8">ФВС1 (25 мкм)</text>
      {/* Pressure line to right */}
      <line x1="108" y1="230" x2="180" y2="230" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#ah)"/>
      {/* Pressure relief valve */}
      <rect x="180" y="200" width="45" height="60" rx="4" fill="none" stroke="#ef4444" strokeWidth="1.5"/>
      <text x="202" y="225" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="600">КП1</text>
      <text x="202" y="240" textAnchor="middle" fill="#64748b" fontSize="8">6.3 МПа</text>
      <line x1="202" y1="260" x2="202" y2="340" stroke="#ef4444" strokeWidth="1.5"/>
      <line x1="130" y1="340" x2="202" y2="340" stroke="#ef4444" strokeWidth="1.5"/>
      {/* Manometer M1 */}
      <circle cx="250" cy="170" r="14" fill="none" stroke="#fbbf24" strokeWidth="1"/>
      <text x="250" y="174" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">М1</text>
      <text x="250" y="155" textAnchor="middle" fill="#64748b" fontSize="8">0-10 МПа</text>
      <line x1="250" y1="184" x2="250" y2="230" stroke="#fbbf24" strokeWidth="1"/>
      {/* Flow meter */}
      <rect x="280" y="215" width="55" height="30" rx="4" fill="none" stroke="#4ade80" strokeWidth="1"/>
      <text x="307" y="234" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="600">РМ1</text>
      <text x="307" y="256" textAnchor="middle" fill="#64748b" fontSize="8">0-25 л/мин</text>
      {/* Main pressure line continues */}
      <line x1="225" y1="230" x2="280" y2="230" stroke="#3b82f6" strokeWidth="2"/>
      <line x1="335" y1="230" x2="380" y2="230" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#ah)"/>
      {/* 4/3 Valve */}
      <rect x="380" y="195" width="140" height="70" rx="6" fill="none" stroke="#f59e0b" strokeWidth="2"/>
      <text x="450" y="215" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="600">Р1 — Распр. 4/3</text>
      <text x="450" y="230" textAnchor="middle" fill="#94a3b8" fontSize="9">BE10.44F24</text>
      <text x="450" y="245" textAnchor="middle" fill="#64748b" fontSize="8">Q=40 л/мин | 24В DC</text>
      {/* Solenoids Y1, Y2 */}
      <rect x="370" y="205" width="18" height="50" rx="2" fill="#ef444433" stroke="#ef4444" strokeWidth="1"/>
      <text x="379" y="188" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="700">Y1</text>
      <rect x="512" y="205" width="18" height="50" rx="2" fill="#ef444433" stroke="#ef4444" strokeWidth="1"/>
      <text x="521" y="188" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="700">Y2</text>
      {/* Lines A, B from valve */}
      <line x1="420" y1="265" x2="420" y2="310" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#ah)"/>
      <text x="412" y="285" fill="#3b82f6" fontSize="10" fontWeight="700">A</text>
      <line x1="480" y1="265" x2="480" y2="310" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#ah)"/>
      <text x="488" y="285" fill="#3b82f6" fontSize="10" fontWeight="700">B</text>
      {/* Throttle + Check valve */}
      <rect x="540" y="280" width="60" height="28" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1"/>
      <text x="570" y="298" textAnchor="middle" fill="#a78bfa" fontSize="8">Д1 Дроссель</text>
      <rect x="540" y="315" width="60" height="24" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1"/>
      <text x="570" y="331" textAnchor="middle" fill="#a78bfa" fontSize="8">КО1 Обр.кл.</text>
      {/* Manometer M2 */}
      <circle cx="560" cy="170" r="14" fill="none" stroke="#fbbf24" strokeWidth="1"/>
      <text x="560" y="174" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">М2</text>
      <line x1="560" y1="184" x2="560" y2="195" stroke="#fbbf24" strokeWidth="1"/>
      {/* Cylinder */}
      <rect x="640" y="240" width="200" height="100" rx="6" fill="#1e3a5f33" stroke="#38bdf8" strokeWidth="2"/>
      <text x="740" y="278" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="700">ЦГ1</text>
      <text x="740" y="295" textAnchor="middle" fill="#94a3b8" fontSize="9">Гидроцилиндр двуст. действия</text>
      <text x="740" y="310" textAnchor="middle" fill="#64748b" fontSize="9">D=80 мм | d=40 мм | Ход=200 мм</text>
      {/* Piston rod */}
      <line x1="840" y1="290" x2="880" y2="290" stroke="#38bdf8" strokeWidth="4"/>
      <circle cx="885" cy="290" r="6" fill="#38bdf8" />
      {/* A,B connections */}
      <line x1="420" y1="310" x2="420" y2="350" stroke="#3b82f6" strokeWidth="1.5"/>
      <line x1="420" y1="350" x2="640" y2="350" stroke="#3b82f6" strokeWidth="1.5"/>
      <line x1="640" y1="350" x2="640" y2="340" stroke="#3b82f6" strokeWidth="1.5"/>
      <line x1="480" y1="310" x2="480" y2="370" stroke="#3b82f6" strokeWidth="1.5"/>
      <line x1="480" y1="370" x2="840" y2="370" stroke="#3b82f6" strokeWidth="1.5"/>
      <line x1="840" y1="370" x2="840" y2="340" stroke="#3b82f6" strokeWidth="1.5"/>
      {/* Motor MГ1 */}
      <circle cx="870" cy="190" r="22" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
      <text x="870" y="194" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="600">МГ1</text>
      <text x="870" y="220" textAnchor="middle" fill="#64748b" fontSize="8">МГ12.19М</text>
      <text x="870" y="232" textAnchor="middle" fill="#64748b" fontSize="8">q=19 см³/об</text>
      {/* M3 */}
      <circle cx="810" cy="140" r="14" fill="none" stroke="#fbbf24" strokeWidth="1"/>
      <text x="810" y="144" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">М3</text>
      {/* Return line */}
      <line x1="520" y1="230" x2="560" y2="230" stroke="#ef4444" strokeWidth="1.5"/>
      <line x1="560" y1="230" x2="560" y2="400" stroke="#ef4444" strokeWidth="1.5"/>
      <line x1="130" y1="400" x2="780" y2="400" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#ahr)"/>
      {/* Filter return */}
      <rect x="760" y="390" width="50" height="20" rx="3" fill="none" stroke="#475569" strokeWidth="1"/>
      <text x="785" y="404" textAnchor="middle" fill="#475569" fontSize="8">ФС1 10мкм</text>
      {/* Legend */}
      <line x1="30" y1="410" x2="70" y2="410" stroke="#3b82f6" strokeWidth="2"/>
      <text x="75" y="413" fill="#64748b" fontSize="8">Напорная</text>
      <line x1="140" y1="410" x2="180" y2="410" stroke="#ef4444" strokeWidth="1.5"/>
      <text x="185" y="413" fill="#64748b" fontSize="8">Сливная</text>
    </svg>
  );
}

function PneuScheme() {
  return (
    <svg viewBox="0 0 900 420" style={{ width: "100%", borderRadius: 12, background: "#051008" }}>
      <defs>
        <marker id="ap" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#22c55e" /></marker>
      </defs>
      <text x="450" y="22" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="600">ПРИНЦИПИАЛЬНАЯ ПНЕВМАТИЧЕСКАЯ СХЕМА</text>
      {/* Air supply */}
      <line x1="30" y1="60" x2="30" y2="200" stroke="#22c55e" strokeWidth="3"/>
      <text x="50" y="55" fill="#22c55e" fontSize="10" fontWeight="600">≈ 0.6 МПа</text>
      <text x="50" y="70" fill="#64748b" fontSize="9">Питание</text>
      {/* FRL Block */}
      <rect x="60" y="90" width="220" height="130" rx="8" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="6 3"/>
      <text x="170" y="108" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="600">Блок подготовки воздуха (FRL)</text>
      {/* Filter */}
      <rect x="80" y="130" width="50" height="60" rx="4" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
      <text x="105" y="165" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="600">ФВ1</text>
      <text x="105" y="200" textAnchor="middle" fill="#64748b" fontSize="8">5 мкм</text>
      {/* Regulator */}
      <rect x="145" y="130" width="50" height="60" rx="4" fill="none" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="170" y="155" textAnchor="middle" fill="#f59e0b" fontSize="8">Регулятор</text>
      <text x="170" y="170" textAnchor="middle" fill="#64748b" fontSize="8">0.05-0.9</text>
      <text x="170" y="182" textAnchor="middle" fill="#64748b" fontSize="8">МПа</text>
      {/* Lubricator */}
      <rect x="210" y="130" width="50" height="60" rx="4" fill="none" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="235" y="155" textAnchor="middle" fill="#f59e0b" fontSize="8">Лубри-</text>
      <text x="235" y="168" textAnchor="middle" fill="#f59e0b" fontSize="8">катор</text>
      <text x="235" y="200" textAnchor="middle" fill="#64748b" fontSize="8">до 1000 л/мин</text>
      {/* Manometer MН1 */}
      <circle cx="170" cy="118" r="12" fill="none" stroke="#fbbf24" strokeWidth="1"/>
      <text x="170" y="122" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="600">МН1</text>
      {/* Lines through FRL */}
      <line x1="30" y1="160" x2="80" y2="160" stroke="#22c55e" strokeWidth="1.5"/>
      <line x1="130" y1="160" x2="145" y2="160" stroke="#22c55e" strokeWidth="1.5"/>
      <line x1="195" y1="160" x2="210" y2="160" stroke="#22c55e" strokeWidth="1.5"/>
      {/* Main line continues */}
      <line x1="260" y1="160" x2="400" y2="160" stroke="#22c55e" strokeWidth="2" markerEnd="url(#ap)"/>
      {/* Manometer MН2 */}
      <circle cx="340" cy="120" r="14" fill="none" stroke="#fbbf24" strokeWidth="1"/>
      <text x="340" y="124" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">МН2</text>
      <text x="340" y="104" textAnchor="middle" fill="#64748b" fontSize="8">0-1 МПа</text>
      <line x1="340" y1="134" x2="340" y2="160" stroke="#fbbf24" strokeWidth="1"/>
      {/* 5/2 Valve */}
      <rect x="400" y="125" width="140" height="70" rx="6" fill="none" stroke="#f59e0b" strokeWidth="2"/>
      <text x="470" y="148" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="600">ПР1 — Пневмор. 5/2</text>
      <text x="470" y="163" textAnchor="middle" fill="#94a3b8" fontSize="9">SMC VZ3120</text>
      <text x="470" y="178" textAnchor="middle" fill="#64748b" fontSize="8">0.15-0.7 МПа | 24В DC</text>
      {/* Solenoid Y3 */}
      <rect x="390" y="135" width="16" height="50" rx="2" fill="#ef444433" stroke="#ef4444" strokeWidth="1"/>
      <text x="398" y="128" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="700">У3</text>
      {/* P, A, B ports */}
      <text x="428" y="202" fill="#22c55e" fontSize="9" fontWeight="700">P</text>
      <text x="452" y="202" fill="#22c55e" fontSize="9" fontWeight="700">A</text>
      <text x="488" y="202" fill="#22c55e" fontSize="9" fontWeight="700">B</text>
      {/* Exhaust - Silencers */}
      <rect x="430" y="210" width="30" height="22" rx="3" fill="none" stroke="#475569" strokeWidth="1"/>
      <text x="445" y="224" textAnchor="middle" fill="#475569" fontSize="7">Г1</text>
      <rect x="470" y="210" width="30" height="22" rx="3" fill="none" stroke="#475569" strokeWidth="1"/>
      <text x="485" y="224" textAnchor="middle" fill="#475569" fontSize="7">Г2</text>
      <text x="457" y="245" textAnchor="middle" fill="#64748b" fontSize="8">Глушители</text>
      {/* Throttle check valves */}
      <rect x="560" y="200" width="70" height="26" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1"/>
      <text x="595" y="216" textAnchor="middle" fill="#a78bfa" fontSize="8">ДОК1</text>
      <rect x="560" y="235" width="70" height="26" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1"/>
      <text x="595" y="251" textAnchor="middle" fill="#a78bfa" fontSize="8">ДОК2</text>
      <text x="595" y="275" textAnchor="middle" fill="#64748b" fontSize="8">Дроссель+ОК</text>
      {/* Lines A, B to cylinder */}
      <line x1="452" y1="195" x2="452" y2="290" stroke="#22c55e" strokeWidth="1.5"/>
      <line x1="452" y1="290" x2="540" y2="290" stroke="#22c55e" strokeWidth="1.5"/>
      <line x1="488" y1="195" x2="488" y2="310" stroke="#22c55e" strokeWidth="1.5"/>
      <line x1="488" y1="310" x2="820" y2="310" stroke="#22c55e" strokeWidth="1.5"/>
      <line x1="540" y1="290" x2="540" y2="350" stroke="#22c55e" strokeWidth="1.5"/>
      <line x1="540" y1="350" x2="580" y2="350" stroke="#22c55e" strokeWidth="1.5"/>
      {/* Pneumo Cylinder */}
      <rect x="580" y="310" width="230" height="90" rx="6" fill="#0a2e1233" stroke="#4ade80" strokeWidth="2"/>
      <text x="695" y="345" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="700">Пневмоцилиндр двуст. действия</text>
      <text x="695" y="365" textAnchor="middle" fill="#94a3b8" fontSize="9">D=50 мм | d=20 мм | Ход=200 мм</text>
      <text x="695" y="380" textAnchor="middle" fill="#64748b" fontSize="9">Festo DSBC-50-200</text>
      {/* End switches */}
      <rect x="575" y="330" width="22" height="20" rx="2" fill="#ef444433" stroke="#ef4444" strokeWidth="1"/>
      <text x="586" y="344" textAnchor="middle" fill="#ef4444" fontSize="7">КВ1</text>
      <rect x="793" y="330" width="22" height="20" rx="2" fill="#ef444433" stroke="#ef4444" strokeWidth="1"/>
      <text x="804" y="344" textAnchor="middle" fill="#ef4444" fontSize="7">КВ2</text>
      {/* Pneumo motor */}
      <circle cx="830" cy="160" r="26" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
      <text x="830" y="156" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="600">ПМ1</text>
      <text x="830" y="170" textAnchor="middle" fill="#64748b" fontSize="7">Gast 2AM</text>
      <text x="830" y="198" textAnchor="middle" fill="#64748b" fontSize="8">3000 об/мин | 0.2 кВт</text>
      <line x1="540" y1="160" x2="804" y2="160" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#ap)"/>
      {/* MН3 */}
      <circle cx="780" cy="120" r="14" fill="none" stroke="#fbbf24" strokeWidth="1"/>
      <text x="780" y="124" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">МН3</text>
      <line x1="780" y1="134" x2="780" y2="160" stroke="#fbbf24" strokeWidth="1"/>
      {/* Heater Г3 */}
      <rect x="850" y="90" width="35" height="50" rx="3" fill="none" stroke="#ef4444" strokeWidth="1"/>
      <text x="867" y="120" textAnchor="middle" fill="#ef4444" fontSize="8">Г3</text>
      {/* Legend */}
      <line x1="30" y1="410" x2="70" y2="410" stroke="#22c55e" strokeWidth="2"/>
      <text x="75" y="413" fill="#64748b" fontSize="8">Напорная (воздух)</text>
      <line x1="200" y1="410" x2="240" y2="410" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 3"/>
      <text x="245" y="413" fill="#64748b" fontSize="8">Выхлопная</text>
    </svg>
  );
}

function PLCScheme() {
  return (
    <svg viewBox="0 0 900 500" style={{ width: "100%", borderRadius: 12, background: "#0c0a14" }}>
      <text x="450" y="22" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="600">БЛОК-СХЕМА СИСТЕМЫ УПРАВЛЕНИЯ (ПЛК)</text>
      {/* PLC Center */}
      <rect x="300" y="60" width="300" height="200" rx="10" fill="#1e1b3a" stroke="#8b5cf6" strokeWidth="2"/>
      <text x="450" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="700">ПЛК Siemens S7-1200</text>
      <text x="450" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">CPU 1212C | 8 DI / 6 DO / 2 AI + SM 1231</text>
      <text x="450" y="125" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="600">Ввод аналоговых сигналов (AI)</text>
      <text x="450" y="140" textAnchor="middle" fill="#64748b" fontSize="8">Нормировка 4-20 мА → инж. единицы</text>
      <text x="450" y="160" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="600">Ввод дискретных сигналов (DI)</text>
      <text x="450" y="175" textAnchor="middle" fill="#64748b" fontSize="8">Антидребезг: фильтр 20 мс</text>
      <text x="450" y="195" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="600">Алгоритм: LAD / FBD</text>
      <text x="450" y="210" textAnchor="middle" fill="#64748b" fontSize="8">РУЧНОЙ / АВТО / ЗАПИСЬ</text>
      <text x="450" y="230" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="600">Защиты и блокировки</text>
      <text x="450" y="245" textAnchor="middle" fill="#64748b" fontSize="8">P{">"} 6.3 → стоп | T{">"} 70°C → авария</text>
      {/* LEFT — Sensors */}
      <text x="120" y="55" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="600">ДАТЧИКИ И ВХОДЫ</text>
      {[
        { y: 80, name: "ДД1, ДД2", desc: "Давление (гидро)", val: "WIKA S-10 | 4-20 мА" },
        { y: 130, name: "ДД3", desc: "Давление (пневмо)", val: "Festo SDE1 | 4-20 мА" },
        { y: 180, name: "РМ1", desc: "Расходомер", val: "Kobold DON | 0-25 л/мин" },
        { y: 230, name: "ДТ1", desc: "Температура масла", val: "Wika TR10 | PT100" },
        { y: 280, name: "ДП1", desc: "Перемещение штока", val: "Wang CP-200 | 0-10В" },
        { y: 330, name: "КВ1, КВ2", desc: "Концевые выкл.", val: "SICK IME08 | 24В DC" },
        { y: 380, name: "SB1-SB4", desc: "Кнопки управления", val: "24В DC | НО / НЗ" },
      ].map(s => (
        <g key={s.y}>
          <rect x="20" y={s.y - 12} width="200" height="38" rx="6" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.3)" strokeWidth="1"/>
          <text x="30" y={s.y + 4} fill="#ef4444" fontSize="9" fontWeight="600">{s.name}</text>
          <text x="30" y={s.y + 16} fill="#64748b" fontSize="7">{s.val}</text>
          <line x1="220" y1={s.y + 7} x2="300" y2={s.y + 7 < 160 ? 100 : s.y + 7 < 260 ? 160 : 220} stroke="rgba(239,68,68,0.3)" strokeWidth="1"/>
        </g>
      ))}
      {/* RIGHT — Outputs */}
      <text x="780" y="55" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="600">ИСПОЛН. И ВЫХОДЫ</text>
      {[
        { y: 80, name: "Y1, Y2", desc: "Соленоиды гидрор. Р1", val: "BE10.44F24 | 24В DC" },
        { y: 130, name: "У3", desc: "Соленоид пневмор. ПР1", val: "SMC VZ3120 | 24В DC" },
        { y: 180, name: "КМ1", desc: "Пускатель насоса Н1", val: "АМР80А2У3 | 380В" },
        { y: 230, name: "HL1-HL4", desc: "Сигнальные лампы", val: "24В DC | LED" },
        { y: 280, name: "НА1", desc: "Звуковая сигнализация", val: "24В DC | 90 дБ" },
      ].map(s => (
        <g key={s.y}>
          <rect x="680" y={s.y - 12} width="200" height="38" rx="6" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.3)" strokeWidth="1"/>
          <text x="690" y={s.y + 4} fill="#22c55e" fontSize="9" fontWeight="600">{s.name}</text>
          <text x="690" y={s.y + 16} fill="#64748b" fontSize="7">{s.val}</text>
          <line x1="600" y1={s.y + 7 < 160 ? 100 : s.y + 7 < 250 ? 160 : 220} x2="680" y2={s.y + 7} stroke="rgba(34,197,94,0.3)" strokeWidth="1"/>
        </g>
      ))}
      {/* Bottom — HMI, SCADA, Power */}
      <rect x="200" y="310" width="180" height="70" rx="8" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="1.5"/>
      <text x="290" y="332" textAnchor="middle" fill="#06b6d4" fontSize="10" fontWeight="600">HMI — Siemens KTP700</text>
      <text x="290" y="348" textAnchor="middle" fill="#64748b" fontSize="8">7" TFT | 800×480 | тачскрин</text>
      <text x="290" y="362" textAnchor="middle" fill="#64748b" fontSize="8">PROFINET | WinCC Basic</text>
      <rect x="520" y="310" width="180" height="70" rx="8" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="1.5"/>
      <text x="610" y="332" textAnchor="middle" fill="#06b6d4" fontSize="10" fontWeight="600">ПК + Python / SCADA</text>
      <text x="610" y="348" textAnchor="middle" fill="#64748b" fontSize="8">PyComm3 → теги S7-1200</text>
      <text x="610" y="362" textAnchor="middle" fill="#64748b" fontSize="8">Matplotlib + Pandas → CSV</text>
      {/* PROFINET lines */}
      <line x1="290" y1="310" x2="290" y2="270" stroke="#06b6d4" strokeWidth="1.5"/>
      <line x1="290" y1="270" x2="450" y2="270" stroke="#06b6d4" strokeWidth="1.5"/>
      <line x1="610" y1="310" x2="610" y2="270" stroke="#06b6d4" strokeWidth="1.5"/>
      <line x1="450" y1="270" x2="610" y2="270" stroke="#06b6d4" strokeWidth="1.5"/>
      <text x="370" y="282" fill="#06b6d4" fontSize="8" fontWeight="600">PROFINET</text>
      <text x="530" y="282" fill="#06b6d4" fontSize="8" fontWeight="600">PROFINET</text>
      {/* Power supply */}
      <rect x="350" y="420" width="200" height="35" rx="6" fill="rgba(250,204,21,0.1)" stroke="#fbbf24" strokeWidth="1"/>
      <text x="450" y="442" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">Блок питания Siemens PM1207 | 24В DC / 2.5A</text>
      <line x1="450" y1="420" x2="450" y2="400" stroke="#fbbf2466" strokeWidth="1"/>
    </svg>
  );
}

// ============ LEARNING TABS ============

function WelcomePage() {
  return (
    <div>
      <Card title="О программе" accent="#38bdf8">
        <p style={{ fontSize: 13, lineHeight: 1.8, color: "#cbd5e1", margin: 0 }}>
          Данная программа разработана для дистанционного обучения и проведения расчётов по лабораторному стенду
          «Гидравлические и пневматические системы». Стенд включает гидравлический контур (насос НШ10Д, гидроцилиндр,
          гидромотор, распределитель 4/3), пневматический контур (FRL-блок, пневмоцилиндр Festo DSBC-50-200,
          пневмомотор Gast 2AM-NRV) и систему управления на базе ПЛК Siemens S7-1200 с HMI-панелью KTP700.
        </p>
      </Card>

      <Card title="Как пользоваться" accent="#4ade80">
        <StepBox number="1" title="Изучите схемы">
          Перейдите во вкладки «Гидросхема», «Пневмосхема» и «Схема ПЛК». Изучите состав системы, прочитайте описание каждого компонента и его функцию.
        </StepBox>
        <StepBox number="2" title="Перейдите к расчётам">
          Откройте вкладку «Расчёты». Выберите нужный раздел: гидроцилиндр, пневмоцилиндр, насос, распределитель, трубопровод или энергетика.
        </StepBox>
        <StepBox number="3" title="Введите параметры">
          По умолчанию все поля заполнены данными реального стенда. Вы можете менять значения для моделирования различных режимов работы.
        </StepBox>
        <StepBox number="4" title="Анализируйте результаты">
          Результаты пересчитываются мгновенно. Сравните полученные значения с паспортными данными оборудования.
        </StepBox>
      </Card>

      <Card title="Состав лабораторного стенда" accent="#f59e0b">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
          <ComponentTag name="Н1" value="Насос НШ10Д" color="#3b82f6" />
          <ComponentTag name="ЦГ1" value="Гидроцилиндр 80/40×200" color="#3b82f6" />
          <ComponentTag name="МГ1" value="Гидромотор МГ12.19М" color="#3b82f6" />
          <ComponentTag name="Р1" value="Распр. 4/3 BE10.44F24" color="#f59e0b" />
          <ComponentTag name="ПЦ" value="Festo DSBC-50-200" color="#22c55e" />
          <ComponentTag name="ПМ1" value="Gast 2AM-NRV" color="#22c55e" />
          <ComponentTag name="ПР1" value="SMC VZ3120 (5/2)" color="#f59e0b" />
          <ComponentTag name="ПЛК" value="Siemens S7-1200" color="#8b5cf6" />
          <ComponentTag name="HMI" value="Siemens KTP700" color="#06b6d4" />
        </div>
      </Card>
    </div>
  );
}

function HydroLearn() {
  return (
    <div>
      <HydroScheme />
      <div style={{ height: 16 }} />
      <Card title="Описание гидравлической схемы" accent="#3b82f6">
        <InfoBox color="#3b82f6">
          Гидравлическая система обеспечивает привод гидроцилиндра двустороннего действия и гидромотора.
          Рабочая жидкость — масло HLP-46, рабочее давление — до 6.3 МПа, расход — 10 л/мин.
        </InfoBox>
      </Card>
      <Card title="Компоненты и их функции" accent="#38bdf8">
        <StepBox number="Б" title="Бак гидравлический (V = 25 л)">
          Резервуар для хранения рабочей жидкости. Оснащён заливной горловиной с воздушным фильтром, указателем уровня масла и сливной пробкой. Объём бака ≈ 3×Q (минутный расход) — стандартное соотношение.
        </StepBox>
        <StepBox number="Н1" title="Насос шестерённый НШ10Д">
          Источник давления. Подача Q = 10 л/мин при P = 6.3 МПа. Приводится электродвигателем ~380В / 1.5 кВт. Шестерённый тип прост и надёжен, но не регулируется по подаче.
        </StepBox>
        <StepBox number="КП1" title="Предохранительный клапан (6.3 МПа)">
          Защита системы от перегрузки. Если давление превышает 6.3 МПа, клапан открывается и перепускает масло обратно в бак. Это предотвращает разрыв трубопроводов и повреждение оборудования.
        </StepBox>
        <StepBox number="Р1" title="Гидрораспределитель 4/3 (BE10.44F24)">
          Направляет поток жидкости в нужную полость цилиндра. 4 линии / 3 позиции. Управляется двумя соленоидами Y1 и Y2 (24В DC). Центральная позиция — запертая (цилиндр зафиксирован). Q max = 40 л/мин.
        </StepBox>
        <StepBox number="ЦГ1" title="Гидроцилиндр двустороннего действия">
          Исполнительный механизм. D = 80 мм (поршень), d = 40 мм (шток), ход = 200 мм. Развивает усилие выдвижения ≈ 31.7 кН при P = 6.3 МПа. Разница площадей поршневой и штоковой полостей создаёт разные скорости и усилия.
        </StepBox>
        <StepBox number="МГ1" title="Гидромотор МГ12.19М (q = 19 см³/об)">
          Преобразует давление жидкости в вращательное движение. Используется для демонстрации привода вращающегося оборудования.
        </StepBox>
        <StepBox number="Д1" title="Дроссель регулируемый">
          Регулирует скорость перемещения штока, ограничивая расход жидкости на выходе из цилиндра (дросселирование «на выходе»).
        </StepBox>
      </Card>
      <Card title="Основные формулы" accent="#a78bfa">
        <InfoBox color="#a78bfa">
          <strong>Площадь поршневой полости:</strong> A₁ = π·D²/4<br />
          <strong>Площадь штоковой полости:</strong> A₂ = π·(D² − d²)/4<br />
          <strong>Усилие выдвижения:</strong> F₁ = P · A₁<br />
          <strong>Усилие втягивания:</strong> F₂ = P · A₂<br />
          <strong>Скорость штока:</strong> v = Q / A<br />
          <strong>Мощность насоса:</strong> N = P · Q / η
        </InfoBox>
      </Card>
    </div>
  );
}

function PneuLearn() {
  return (
    <div>
      <PneuScheme />
      <div style={{ height: 16 }} />
      <Card title="Описание пневматической схемы" accent="#22c55e">
        <InfoBox color="#22c55e">
          Пневматическая система работает от заводской магистрали сжатого воздуха ≈ 0.6 МПа.
          Обеспечивает привод пневмоцилиндра Festo DSBC-50-200 и пневмомотора Gast 2AM-NRV.
        </InfoBox>
      </Card>
      <Card title="Компоненты" accent="#4ade80">
        <StepBox number="FRL" title="Блок подготовки воздуха">
          Состоит из трёх элементов: <strong>ФВ1</strong> (фильтр-влагоотделитель, 5 мкм) — очищает воздух от частиц и влаги; <strong>Регулятор давления</strong> (0.05–0.9 МПа) — стабилизирует давление; <strong>Лубрикатор</strong> — вводит масляный туман для смазки подвижных частей.
        </StepBox>
        <StepBox number="ПР1" title="Пневмораспределитель 5/2 (SMC VZ3120)">
          5 линий / 2 позиции. Управляется соленоидом У3 (24В DC), возврат пружиной. Диапазон давлений: 0.15–0.7 МПа. Ресурс: 30 млн переключений. Направляет воздух в нужную полость пневмоцилиндра.
        </StepBox>
        <StepBox number="ПЦ" title="Пневмоцилиндр Festo DSBC-50-200">
          Двустороннего действия. D = 50 мм, d = 20 мм, ход = 200 мм. Усилие выдвижения ≈ 1178 Н при 0.6 МПа. Оснащён концевыми выключателями КВ1, КВ2 (индуктивные, SICK IME08) для определения крайних положений штока.
        </StepBox>
        <StepBox number="ДОК" title="Дроссели с обратным клапаном (ДОК1, ДОК2)">
          Регулируют скорость выдвижения и втягивания штока. Дроссель ограничивает расход на выходе, а обратный клапан обеспечивает свободный поток в обратном направлении.
        </StepBox>
        <StepBox number="ПМ1" title="Пневмомотор Gast 2AM-NRV">
          Лопастной мотор, 3000 об/мин, мощность 0.2 кВт. Преобразует энергию сжатого воздуха во вращательное движение. Демонстрирует принцип пневматического привода.
        </StepBox>
      </Card>
      <Card title="Отличия пневматики от гидравлики" accent="#facc15">
        <InfoBox color="#facc15">
          <strong>Рабочее тело:</strong> воздух (сжимаемый) vs масло (несжимаемое)<br />
          <strong>Давление:</strong> пневматика 0.4–0.8 МПа vs гидравлика 6–32 МПа<br />
          <strong>Усилия:</strong> пневматика — малые и средние; гидравлика — большие<br />
          <strong>Скорость:</strong> пневматика быстрее, но менее точная<br />
          <strong>Выхлоп:</strong> воздух выпускается в атмосферу (через глушители)<br />
          <strong>Расход:</strong> пневматический расход считают в нормальных условиях (Н)
        </InfoBox>
      </Card>
    </div>
  );
}

function PLCLearn() {
  return (
    <div>
      <PLCScheme />
      <div style={{ height: 16 }} />
      <Card title="Система управления" accent="#8b5cf6">
        <InfoBox color="#8b5cf6">
          Стенд управляется ПЛК Siemens SIMATIC S7-1200 (CPU 1212C) через программу на TIA Portal V18.
          Связь с HMI-панелью и ПК по протоколу PROFINET. Алгоритм написан на языках LAD/FBD.
        </InfoBox>
      </Card>
      <Card title="Датчики (входы ПЛК)" accent="#ef4444">
        <StepBox number="AI" title="Аналоговые входы (4-20 мА, 0-10В)">
          <strong>ДД1, ДД2</strong> — давление в гидросистеме (WIKA S-10, 0–10 МПа)<br />
          <strong>ДД3</strong> — давление в пневмосистеме (Festo SDE1, 0–1 МПа)<br />
          <strong>РМ1</strong> — расход жидкости (Kobold DON, 0–25 л/мин)<br />
          <strong>ДТ1</strong> — температура масла (Wika TR10, PT100, 0–120°C)<br />
          <strong>ДП1</strong> — перемещение штока (Wang CP-200, 0–200 мм)
        </StepBox>
        <StepBox number="DI" title="Дискретные входы (24В DC)">
          <strong>КВ1, КВ2</strong> — концевые выключатели (SICK IME08, IP67)<br />
          <strong>SB1–SB3</strong> — кнопки управления (НО)<br />
          <strong>SB4</strong> — аварийная остановка (НЗ, грибок)
        </StepBox>
      </Card>
      <Card title="Исполнительные механизмы (выходы ПЛК)" accent="#22c55e">
        <StepBox number="DO" title="Дискретные выходы (24В DC / 0.5A)">
          <strong>Y1, Y2</strong> — соленоиды гидрораспределителя Р1<br />
          <strong>У3</strong> — соленоид пневмораспределителя ПР1<br />
          <strong>КМ1</strong> — пускатель насоса Н1 (через реле)<br />
          <strong>HL1–HL4</strong> — сигнальные лампы (РАБОТА / АВАРИЯ)<br />
          <strong>НА1</strong> — звуковая сигнализация (90 дБ)
        </StepBox>
      </Card>
      <Card title="Режимы работы" accent="#06b6d4">
        <StepBox number="1" title="РУЧНОЙ — прямое управление с HMI">
          Оператор нажимает кнопки на HMI-панели для управления каждым исполнительным механизмом отдельно. Используется для пуско-наладочных работ и обучения.
        </StepBox>
        <StepBox number="2" title="АВТО — автоматический цикл">
          ПЛК выполняет запрограммированную последовательность: выдвижение гидроцилиндра → пауза → втягивание → запуск пневмоцилиндра → возврат. Контроль по датчикам положения и давления.
        </StepBox>
        <StepBox number="3" title="ЗАПИСЬ — сохранение данных">
          Кольцевой буфер на 10 000 точек (шаг 100 мс). Данные передаются по PROFINET на ПК, где Python-скрипт (PyComm3) строит графики через Matplotlib и сохраняет в CSV.
        </StepBox>
      </Card>
      <Card title="Защиты и блокировки" accent="#ef4444">
        <InfoBox color="#ef4444">
          <strong>P {">"} 6.3 МПа</strong> → немедленный стоп насоса Н1<br />
          <strong>T {">"} 70 °C</strong> → аварийная остановка всей системы<br />
          <strong>КВ timeout {">"} 10 с</strong> → диагностическая авария (шток не дошёл)<br />
          <strong>SB4 (грибок)</strong> → полное обесточивание выходов
        </InfoBox>
      </Card>
    </div>
  );
}

// ============ CALCULATORS (same as before, compact) ============

function HydroCylCalc() {
  const [D, setD] = useState("80"); const [d, setd] = useState("40");
  const [S, setS] = useState("200"); const [P, setP] = useState("6.3");
  const [Q, setQ] = useState("10");
  const Dp=parseFloat(D)/1000, dp=parseFloat(d)/1000, Sp=parseFloat(S)/1000, Pp=parseFloat(P)*1e6;
  const Qm3=parseFloat(Q)/60000;
  const A1=Math.PI*Dp*Dp/4, A2=A1-Math.PI*dp*dp/4;
  const F1=A1*Pp, F2=A2*Pp, v1=Qm3/A1, v2=Qm3/A2;
  return (<>
    <Card title="Параметры гидроцилиндра" accent="#2563eb">
      <Input label="Диаметр поршня D" value={D} onChange={setD} unit="мм" hint="Стенд: 80 мм" />
      <Input label="Диаметр штока d" value={d} onChange={setd} unit="мм" hint="Стенд: 40 мм" />
      <Input label="Ход S" value={S} onChange={setS} unit="мм" hint="Стенд: 200 мм" />
      <Input label="Давление P" value={P} onChange={setP} unit="МПа" hint="Стенд: 6.3 МПа" />
      <Input label="Расход Q" value={Q} onChange={setQ} unit="л/мин" hint="Стенд: 10 л/мин" />
    </Card>
    <Card title="Результаты" accent="#38bdf8">
      <Result label="A₁ (поршневая)" value={A1*1e4} unit="см²" />
      <Result label="A₂ (штоковая)" value={A2*1e4} unit="см²" />
      <Result label="Усилие выдвижения F₁" value={F1/1000} unit="кН" big />
      <Result label="Усилие втягивания F₂" value={F2/1000} unit="кН" big />
      <Result label="Скорость выдвижения v₁" value={v1*1000} unit="мм/с" big />
      <Result label="Скорость втягивания v₂" value={v2*1000} unit="мм/с" big />
      <Result label="Время выдвижения" value={Sp/(v1)} unit="с" />
      <Result label="Время втягивания" value={Sp/(v2)} unit="с" />
      <Result label="Объём V₁" value={A1*Sp*1e6} unit="см³" />
      <Result label="Объём V₂" value={A2*Sp*1e6} unit="см³" />
    </Card>
  </>);
}

function PneuCylCalc() {
  const [D,setD]=useState("50"); const [d,setd]=useState("20");
  const [S,setS]=useState("200"); const [P,setP]=useState("0.6"); const [n,setN]=useState("10");
  const Dp=parseFloat(D)/1000,dp=parseFloat(d)/1000,Sp=parseFloat(S)/1000,Pg=parseFloat(P)*1e6;
  const Pa=101300, Pabs=Pg+Pa;
  const A1=Math.PI*Dp*Dp/4, A2=A1-Math.PI*dp*dp/4;
  const F1=A1*Pg, F2=A2*Pg;
  const Vcyc=(A1+A2)*Sp*Pabs/Pa*1e6;
  const Qn=Vcyc*parseFloat(n)/1000;
  return (<>
    <Card title="Параметры пневмоцилиндра" accent="#16a34a">
      <Input label="Диаметр поршня D" value={D} onChange={setD} unit="мм" hint="Festo DSBC-50-200" />
      <Input label="Диаметр штока d" value={d} onChange={setd} unit="мм" />
      <Input label="Ход S" value={S} onChange={setS} unit="мм" />
      <Input label="Давление (изб.) P" value={P} onChange={setP} unit="МПа" />
      <Input label="Циклов в минуту n" value={n} onChange={setN} unit="ц/мин" />
    </Card>
    <Card title="Результаты" accent="#4ade80">
      <Result label="Усилие выдвижения F₁" value={F1} unit="Н" big />
      <Result label="Усилие втягивания F₂" value={F2} unit="Н" big />
      <Result label="Расход воздуха за 1 цикл" value={Vcyc} unit="см³(Н)" />
      <Result label="Расход воздуха Q" value={Qn} unit="л(Н)/мин" big />
      <Result label="Расход за час" value={Qn*60/1000} unit="м³(Н)/ч" />
    </Card>
  </>);
}

function PumpCalc() {
  const [q,setq]=useState("19"); const [n,setn]=useState("1450");
  const [P,setP]=useState("6.3"); const [ev,setEv]=useState("0.95"); const [em,setEm]=useState("0.90");
  const qm3=parseFloat(q)*1e-6, np=parseFloat(n), Pp=parseFloat(P)*1e6;
  const evp=parseFloat(ev), emp=parseFloat(em);
  const Qt=qm3*np, Qr=Qt*evp, Nh=Pp*Qr, Nm=Nh/(evp*emp);
  return (<>
    <Card title="Параметры насоса" accent="#2563eb">
      <Input label="Рабочий объём q" value={q} onChange={setq} unit="см³/об" hint="НШ10Д" />
      <Input label="Частота вращения n" value={n} onChange={setn} unit="об/мин" />
      <Input label="Давление P" value={P} onChange={setP} unit="МПа" />
      <Input label="КПД объёмный η_v" value={ev} onChange={setEv} />
      <Input label="КПД механический η_m" value={em} onChange={setEm} />
    </Card>
    <Card title="Результаты" accent="#38bdf8">
      <Result label="Подача теоретическая" value={Qt*60000} unit="л/мин" />
      <Result label="Подача действительная" value={Qr*60000} unit="л/мин" big />
      <Result label="Мощность гидравлическая" value={Nh} unit="Вт" />
      <Result label="Мощность на валу" value={Nm} unit="Вт" big />
      <Result label="Мощность на валу" value={Nm/1000} unit="кВт" big />
      <Result label="Общий КПД" value={evp*emp} />
      <Result label="Крутящий момент" value={Pp*qm3/(2*Math.PI*emp)} unit="Н·м" />
    </Card>
  </>);
}

function PipeCalc() {
  const [d,setd]=useState("12"); const [L,setL]=useState("2");
  const [Q,setQ]=useState("10"); const [nu,setNu]=useState("30"); const [rho,setRho]=useState("870");
  const dp=parseFloat(d)/1000, Qm3=parseFloat(Q)/60000, nup=parseFloat(nu)*1e-6, rhop=parseFloat(rho);
  const A=Math.PI*dp*dp/4, v=Qm3/A, Re=v*dp/nup;
  const f=Re<2300?64/Re:0.3164/Math.pow(Re,0.25);
  const dP=f*(parseFloat(L)/dp)*rhop*v*v/2;
  return (<>
    <Card title="Трубопровод" accent="#8b5cf6">
      <Input label="Диаметр d" value={d} onChange={setd} unit="мм" />
      <Input label="Длина L" value={L} onChange={setL} unit="м" />
      <Input label="Расход Q" value={Q} onChange={setQ} unit="л/мин" />
      <Input label="Вязкость ν" value={nu} onChange={setNu} unit="сСт" />
      <Input label="Плотность ρ" value={rho} onChange={setRho} unit="кг/м³" />
    </Card>
    <Card title="Результаты" accent="#a78bfa">
      <Result label="Скорость v" value={v} unit="м/с" big />
      <Result label="Число Рейнольдса Re" value={Re} big />
      <Result label="Режим" value={Re<2300?"Ламинарный":"Турбулентный"} />
      <Result label="Потери давления ΔP" value={dP/1e6} unit="МПа" big />
      <Result label="Потери мощности" value={dP*Qm3} unit="Вт" />
    </Card>
  </>);
}

function EnergyCalc() {
  const [Pp,setPp]=useState("6.3"); const [Qp,setQp]=useState("10"); const [ep,setEp]=useState("0.85");
  const Nh=parseFloat(Pp)*1e6*parseFloat(Qp)/60000;
  const Nm=Nh/parseFloat(ep);
  return (<>
    <Card title="Энергетика стенда" accent="#f59e0b">
      <Input label="Давление гидро P" value={Pp} onChange={setPp} unit="МПа" />
      <Input label="Расход Q" value={Qp} onChange={setQp} unit="л/мин" />
      <Input label="КПД системы η" value={ep} onChange={setEp} />
    </Card>
    <Card title="Результаты" accent="#fbbf24">
      <Result label="Мощность гидравлическая" value={Nh} unit="Вт" />
      <Result label="Мощность электродвигателя" value={Nm/1000} unit="кВт" big />
      <Result label="Двигатель стенда" value="~380В, 1.5 кВт" />
      <Result label="Пневмомотор" value="Gast 2AM, 0.2 кВт" />
      <Result label="ПЛК + датчики + HMI" value="≈ 60 Вт" />
    </Card>
  </>);
}

// ============ CALC TAB SWITCHER ============
const CALC_TABS = [
  { id: "hc", label: "Гидроцилиндр", C: HydroCylCalc },
  { id: "pc", label: "Пневмоцилиндр", C: PneuCylCalc },
  { id: "pump", label: "Насос", C: PumpCalc },
  { id: "pipe", label: "Трубопровод", C: PipeCalc },
  { id: "energy", label: "Энергетика", C: EnergyCalc },
];

function CalcPage() {
  const [ct, setCt] = useState("hc");
  const Comp = CALC_TABS.find(t => t.id === ct).C;
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
        {CALC_TABS.map(t => (
          <button key={t.id} onClick={() => setCt(t.id)} style={{
            background: ct===t.id ? "rgba(56,189,248,0.2)" : "rgba(255,255,255,0.04)",
            border: ct===t.id ? "1px solid rgba(56,189,248,0.4)" : "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8, padding: "7px 12px", color: ct===t.id ? "#38bdf8" : "#94a3b8",
            fontSize: 11, fontWeight: 600, cursor: "pointer",
          }}>{t.label}</button>
        ))}
      </div>
      <Comp />
    </div>
  );
}

// ============ MAIN APP ============
const MAIN_TABS = [
  { id: "welcome", icon: "🏠", label: "Главная" },
  { id: "hydro", icon: "💧", label: "Гидросхема" },
  { id: "pneu", icon: "💨", label: "Пневмосхема" },
  { id: "plc", icon: "🖥", label: "Схема ПЛК" },
  { id: "calc", icon: "🔢", label: "Расчёты" },
];

const PAGES = {
  welcome: WelcomePage,
  hydro: HydroLearn,
  pneu: PneuLearn,
  plc: PLCLearn,
  calc: CalcPage,
};

export default function App() {
  const [tab, setTab] = useState("welcome");
  const Page = PAGES[tab];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0c1222, #111827, #0f172a)",
      color: "#e2e8f0", fontFamily: FONT,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(22,163,106,0.08))",
        borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "18px 16px", textAlign: "center",
      }}>
        <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#64748b", textTransform: "uppercase" }}>
          Лабораторный стенд • Гидравлические и пневматические системы
        </div>
        <h1 style={{
          margin: "6px 0 4px", fontSize: 20, fontWeight: 700,
          background: "linear-gradient(135deg, #38bdf8, #4ade80)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Инженерный калькулятор</h1>
        <div style={{ fontSize: 10, color: "#475569" }}>
          ГОСТ 2.701-2008 / ISO 1219 • Siemens S7-1200 • TIA Portal V18
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        display: "flex", gap: 4, padding: "10px 12px", justifyContent: "center",
        borderBottom: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap",
      }}>
        {MAIN_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: tab === t.id
              ? "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(56,189,248,0.15))"
              : "rgba(255,255,255,0.03)",
            border: tab === t.id ? "1px solid rgba(56,189,248,0.3)" : "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10, padding: "8px 14px", color: tab === t.id ? "#38bdf8" : "#94a3b8",
            fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
          }}>
            <span style={{ marginRight: 4 }}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "16px 14px", maxWidth: 640, margin: "0 auto" }}>
        <Page />
      </div>
    </div>
  );
}
