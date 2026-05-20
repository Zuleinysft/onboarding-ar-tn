import { useState } from "react";

const PROJECT = {
  brand: "Café Martinez",
  country: "AR",
  segment: "Gastronomía / Retail",
  type: "HighCustom",
  ko: "2026-04-01",
  golive: "2026-06-29",
  url: "https://cafemartinez2.mitiendanube.com",
  admin: "https://cafemartinez2.mitiendanube.com/admin",
  integrations: ["SAP"],
  erp_status: "Implementador SAP en definición",
  agency: "Innew",
  agency_pm: "María Victoria Bravo (victoria.bravo@innew.la)",
  agency_pm2: "Jennifer Sotomayor (jennifer.sotomayor@innew.la)",
  agency_tech: "Ximena Charras (TN), Julian Blasco (Innew)",
  contact_name: "Maria Laura Troisi",
  contact_email: "mltroisi@cafemartinez.com.ar",
  contact2: "Cecilia Cutuli (ccutuli@cafemartinez.com.ar)",
  slack_room: "cafemartinez-migracion",
  hubspot_url: "https://app.hubspot.com/contacts/8180620/record/0-3/58453872015",
  outputs: ["slack", "gsheet"],
  sprints: [
    { n: 1, label: "Onboarding & Config. Espacios de trabajo", dates: "Abr 20 – May 1", status: "done" },
    { n: 2, label: "Blueprints Backoffice + Bases Diseño", dates: "May 1 – May 8", status: "done" },
    { n: 3, label: "Diseño Home + Search Layout + Product", dates: "May 8 – May 17", status: "done" },
    { n: 4, label: "Implementación Home + Check BackOffice", dates: "May 17 – May 22", status: "in_progress" },
    { n: 5, label: "Implementación Search + Product + Pág. Ayuda", dates: "May 22 – Jun 1", status: "pending" },
    { n: 6, label: "Impl. Pág. Ayuda + Account & Login", dates: "Jun 1 – Jun 8", status: "pending" },
    { n: 7, label: "Diseño & Impl. Checkout + Mails Transaccionales", dates: "Jun 8 – Jun 22", status: "pending" },
    { n: 8, label: "Testing Integral + Go Live", dates: "Jun 22 – Jul 2", status: "pending" },
  ],
};

const ALERTS = [
  { color: "#ff6b6b", bg: "#fff5f5", icon: "🔴", text: "SAP: Implementador aún no definido — desbloquear con Maria Laura Troisi ASAP" },
  { color: "#ff6b6b", bg: "#fff5f5", icon: "🔴", text: "Relevamiento de catálogo VTEX→TNE pendiente de entrega por Café Martinez — bloquea implementaciones (Innew hace seguimiento activo desde May 15)" },
  { color: "#ff6b6b", bg: "#fff5f5", icon: "🔴", text: "Aprobación mockup Home, PLP y PDP pendiente de Café Martinez — bloquea avance de implementación (Innew hace seguimiento activo)" },
  { color: "#f59e0b", bg: "#fffbeb", icon: "🟡", text: "Innew: Primer proyecto conjunto — acompañar blueprints y criterios TN de cerca" },
  { color: "#f59e0b", bg: "#fffbeb", icon: "🟡", text: "Timeline ajustado: HighCustom ~90d sin margen de desvío" },
];

const CHECKLIST = [
  {
    cat: "⚙️ Configuración Inicial",
    items: [
      { t: "Activar Página en Construcción", req: true, link: `${PROJECT.admin}/themes/password-protected` },
      { t: "Configurar datos del negocio y SEO general", req: true, link: `${PROJECT.admin}/account/shop` },
      { t: "Configurar datos de contacto", req: true, link: `${PROJECT.admin}/preferences` },
      { t: "Configurar datos de facturación", req: true, link: `${PROJECT.admin}/account/invoices/info` },
      { t: "Agregar código de Data Fiscal (AFIP/ARCA)", req: true, link: `${PROJECT.admin}/account/shop` },
      { t: "Dar acceso al admin a Innew", req: true, link: `${PROJECT.admin}/account/users` },
    ],
  },
  {
    cat: "🎨 Diseño & Layout (Innew)",
    items: [
      { t: "Blueprints de configuración Backoffice aprobados ✅", req: true },
      { t: "Bases de diseño aprobadas (tipografías, paleta) ✅", req: true },
      { t: "Mockup Home presentado — aprobación pendiente ⚠️", req: true, note: "Sin aprobación formal de Café Martinez" },
      { t: "Mockup PLP (Search Layout) presentado — aprobación pendiente ⚠️", req: true, note: "Sin aprobación formal de Café Martinez" },
      { t: "Mockup PDP (Product Page) presentado — aprobación pendiente ⚠️", req: true, note: "Sin aprobación formal de Café Martinez" },
      { t: "Validaciones técnicas TNE realizadas ✅", req: true, note: "May 4 — Ximena Charras + Mauro Dri + Innew" },
      { t: "Páginas de ayuda e institucionales — implementar", req: true },
      { t: "Account & Login — implementar", req: true },
      { t: "Checkout — diseñar e implementar", req: true },
      { t: "Mails transaccionales — diseñar e implementar", req: true },
    ],
  },
  {
    cat: "📦 Migración de Catálogo (VTEX → TNE)",
    items: [
      { t: "Árbol de categorías enviado a Café Martinez para completar", req: true, note: "Google Sheet enviado por Innew — pendiente de respuesta" },
      { t: "Relevamiento catálogo VTEX→TNE completo por Café Martinez ⚠️", req: true, note: "BLOQUEANTE — sin esto no se puede avanzar en implementación" },
      { t: "Migración de catálogo ejecutada", req: true },
      { t: "Validación de catálogo cargado en TNE", req: true },
    ],
  },
  {
    cat: "🔌 Integración SAP",
    items: [
      { t: "Definir implementador SAP ⚠️", req: true, note: "BLOQUEANTE — en definición por equipo Café Martinez" },
      { t: "Kick off técnico con implementador SAP + TN", req: true },
      { t: "Mapeo de catálogo y campos entre SAP y TNE", req: true },
      { t: "Configuración de integración (stock, precios, pedidos)", req: true },
      { t: "Testing de integración SAP end-to-end", req: true },
      { t: "Validación con Maria Laura Troisi", req: true },
    ],
  },
  {
    cat: "💳 Medios de Pago",
    items: [
      { t: "Instalar y configurar Fiserv", req: true, link: "https://www.tiendanube.com/tienda-aplicaciones-nube/fiserv2" },
      { t: "Instalar y configurar Nave", req: true, link: "https://www.tiendanube.com/tienda-aplicaciones-nube/nave" },
      { t: "Activar Pago Nube (después de que los productos estén creados)", req: true, link: `${PROJECT.admin}/payment_providers`, note: "Requiere validación de identidad — habilitar post-carga de productos" },
    ],
  },
  {
    cat: "📦 Envío",
    items: [
      { t: "Instalar y configurar Bluemail", req: true, link: `${PROJECT.admin}/shipping`, note: "Integración de envío definida" },
      { t: "Definir si se habilitan puntos de retiro (sucursales)", req: false, note: "A definir con Café Martinez" },
    ],
  },
  {
    cat: "📧 Marketing Nube & Mails Transaccionales",
    items: [
      { t: "Integrar Marketing Nube", req: true, link: `${PROJECT.admin}/marketing` },
      { t: "Personalizar mails transaccionales desde Marketing Nube", req: true, note: "Diseño y personalización de mails desde la plataforma" },
      { t: "Validar envío de mails transaccionales con cliente", req: true },
    ],
  },
  {
    cat: "✅ Pre Go Live",
    items: [
      { t: "Check y validaciones BackOffice completos", req: true },
      { t: "Testing integral interno (TN + Innew)", req: true },
      { t: "Testing integral con cliente (Maria Laura Troisi)", req: true },
      { t: "Validar mails transaccionales", req: true },
      { t: "Configurar dominio + redirección 301", req: true },
      { t: "Desactivar Página en Construcción", req: true },
      { t: "Go Live 🚀", req: true, note: "Última semana jun / inicio jul 2026" },
    ],
  },
];

const CANVAS_MD = `# 📋 Project Overview — Café Martinez

---

## 🏷️ Datos del Proyecto
| Campo | Detalle |
|---|---|
| **Marca** | Café Martinez |
| **Tipo** | HighCustom (90d+) |
| **Kick Off** | 01/04/2026 |
| **Go Live estimado** | Última semana de junio / inicio julio 2026 |
| **Pipeline HubSpot** | Onboarding AR — [Ver deal](https://app.hubspot.com/contacts/8180620/record/0-3/58453872015) |
| **Admin TN** | https://cafemartinez2.mitiendanube.com/admin |

---

## 👥 Equipo
| Rol | Nombre | Contacto |
|---|---|---|
| **Referente merchant** | Maria Laura Troisi | mltroisi@cafemartinez.com.ar |
| **Referente merchant** | Cecilia Cutuli | ccutuli@cafemartinez.com.ar |
| **PM Innew** | María Victoria Bravo | victoria.bravo@innew.la |
| **PM Innew** | Jennifer Sotomayor | jennifer.sotomayor@innew.la |
| **Tech TN** | Ximena Charras | ximena.charras@tiendanube.com |
| **Tech TN** | Mauro Dri | mauro.dri@tiendanube.com |

---

## 📅 Sprints — Gantt Innew
| Sprint | Alcance | Fechas | Estado |
|---|---|---|---|
| Sprint 1 | Onboarding & Config. Espacios | Abr 20 – May 1 | ✅ Entregado |
| Sprint 2 | Blueprints Backoffice + Bases Diseño | May 1 – May 8 | ✅ Entregado |
| Sprint 3 | Diseño Home + Search Layout + Product | May 8 – May 17 | ✅ Entregado |
| Sprint 4 | Implementación Home + Check BackOffice | May 17 – May 22 | 🔄 En curso |
| Sprint 5 | Implementación Search + Product + Pág. Ayuda | May 22 – Jun 1 | ⏳ Pendiente |
| Sprint 6 | Impl. Pág. Ayuda + Account & Login | Jun 1 – Jun 8 | ⏳ Pendiente |
| Sprint 7 | Diseño & Impl. Checkout + Mails | Jun 8 – Jun 22 | ⏳ Pendiente |
| Sprint 8 | Testing Integral + Go Live | Jun 22 – Jul 2 | ⏳ Pendiente |

---

## 🚨 Bloqueantes activos
- 🔴 **SAP**: Implementador aún no definido — desbloquear con Maria Laura Troisi ASAP
- 🔴 **Catálogo VTEX→TNE**: Relevamiento pendiente de entrega por Café Martinez — bloquea implementaciones (Innew hace seguimiento activo desde May 15)
- 🔴 **Aprobación mockups**: Home, PLP y PDP sin aprobación formal de Café Martinez — bloquea avance de implementación

---

## 🔌 Integraciones
- **SAP** — Implementador en definición por equipo Café Martinez
- **Migración catálogo VTEX → TNE** — En proceso, coordinado con Innew (Lautaro Ramos + Gabriela Castaño)

---

## 📁 Links útiles
- Admin TN: https://cafemartinez2.mitiendanube.com/admin
- HubSpot deal: https://app.hubspot.com/contacts/8180620/record/0-3/58453872015
- Slack room: #cafemartinez-migracion
- Google Sheet de seguimiento: *(completar)*

---

*Última actualización: Mayo 2026 — Onboarding AR Team · Zuleinys Tirado*`;

const STATUS_COLORS = { done: "#06d6a0", in_progress: "#4f8ef7", pending: "#ddd" };
const STATUS_LABELS = { done: "✅", in_progress: "🔄", pending: "⏳" };

const TABS = ["📊 Overview", "✅ Checklist", "📋 Canvas Slack"];

export default function App() {
  const [tab, setTab] = useState(0);
  const [checks, setChecks] = useState({});
  const [copied, setCopied] = useState(false);

  const toggle = (k) => setChecks(p => ({ ...p, [k]: !p[k] }));
  const totalItems = CHECKLIST.reduce((a, s) => a + s.items.length, 0);
  const doneItems = Object.values(checks).filter(Boolean).length;
  const pct = Math.round((doneItems / totalItems) * 100);
  const daysToGL = Math.ceil((new Date("2026-06-29") - new Date()) / 86400000);

  const copyCanvas = () => {
    navigator.clipboard.writeText(CANVAS_MD).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#f5f5f7", minHeight: "100vh", padding: "16px" }}>
      {/* Header */}
      <div style={{ background: "#1a1a2e", borderRadius: 12, padding: "20px 24px", marginBottom: 16, color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Onboarding AR · HighCustom · Pipeline: Onboarding AR</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>☕ Café Martinez</div>
            <div style={{ fontSize: 13, color: "#aaa", marginTop: 2 }}>Maria Laura Troisi · Cecilia Cutuli</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>Agencia: Innew (PM: Victoria Bravo · Jennifer Sotomayor)</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>Go Live</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: daysToGL < 20 ? "#ff6b6b" : daysToGL < 40 ? "#ffd166" : "#06d6a0" }}>
              {daysToGL > 0 ? `${daysToGL}d restantes` : "¡Hoy!"}
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>Última sem. jun / inicio jul 2026</div>
            <a href={PROJECT.hubspot_url} target="_blank" rel="noreferrer"
              style={{ fontSize: 11, color: "#f59e0b", textDecoration: "none", marginTop: 4, display: "block" }}>
              🔶 Ver en HubSpot ↗
            </a>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#aaa", marginBottom: 6 }}>
            <span>Progreso checklist</span><span>{doneItems}/{totalItems} — {pct}%</span>
          </div>
          <div style={{ background: "#333", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, background: pct === 100 ? "#06d6a0" : "#4f8ef7", height: "100%", borderRadius: 99, transition: "width .3s" }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
              background: tab === i ? "#4f8ef7" : "#fff", color: tab === i ? "#fff" : "#555",
              boxShadow: tab === i ? "0 2px 8px #4f8ef740" : "0 1px 3px #0001" }}>
            {t}
          </button>
        ))}
      </div>

      {/* TAB 0 — Overview */}
      {tab === 0 && (
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10 }}>
            {[
              { label: "Kick Off", val: "01/04/2026", icon: "🚀" },
              { label: "Sprint actual", val: "Sprint 4", icon: "⚡" },
              { label: "Agencia", val: "Innew", icon: "🎨" },
              { label: "Integraciones", val: "SAP + VTEX", icon: "🔌" },
            ].map((c, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "14px 16px", boxShadow: "0 1px 4px #0001" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{c.icon}</div>
                <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: .5 }}>{c.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{c.val}</div>
              </div>
            ))}
          </div>

          {/* Sprints */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px #0001" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#1a1a2e" }}>📅 Sprints — Gantt Innew</div>
            {PROJECT.sprints.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0",
                borderBottom: i < PROJECT.sprints.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 99, background: s.status === "done" ? "#d1fae5" : s.status === "in_progress" ? "#eef2ff" : "#f5f5f5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: s.status === "done" ? "#059669" : s.status === "in_progress" ? "#4f8ef7" : "#aaa", flexShrink: 0 }}>
                  {s.n}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: "#888" }}>{s.dates}</div>
                </div>
                <div style={{ fontSize: 16 }}>{STATUS_LABELS[s.status]}</div>
              </div>
            ))}
          </div>

          {/* Equipo */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px #0001" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#1a1a2e" }}>👥 Equipo del proyecto</div>
            {[
              { rol: "Referente merchant", nom: "Maria Laura Troisi", email: "mltroisi@cafemartinez.com.ar", color: "#eef2ff" },
              { rol: "Referente merchant", nom: "Cecilia Cutuli", email: "ccutuli@cafemartinez.com.ar", color: "#eef2ff" },
              { rol: "PM Innew", nom: "María Victoria Bravo", email: "victoria.bravo@innew.la", color: "#f0fdf4" },
              { rol: "PM Innew", nom: "Jennifer Sotomayor", email: "jennifer.sotomayor@innew.la", color: "#f0fdf4" },
              { rol: "Tech TN", nom: "Ximena Charras", email: "ximena.charras@tiendanube.com", color: "#fff7ed" },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0",
                borderBottom: i < 4 ? "1px solid #f5f5f5" : "none" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: p.color, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "#555", flexShrink: 0 }}>
                  {p.nom.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>{p.nom}</div>
                  <div style={{ fontSize: 11, color: "#888" }}>{p.rol} · {p.email}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Alertas */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px #0001" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#1a1a2e" }}>🚨 Bloqueantes & Riesgos</div>
            {ALERTS.map((a, i) => (
              <div key={i} style={{ background: a.bg, borderLeft: `3px solid ${a.color}`, borderRadius: 8, padding: "10px 14px", marginBottom: 8, fontSize: 13, color: "#333" }}>
                {a.icon} {a.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 1 — Checklist */}
      {tab === 1 && (
        <div style={{ display: "grid", gap: 12 }}>
          {CHECKLIST.map((sec, si) => (
            <div key={si} style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px #0001" }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#1a1a2e" }}>{sec.cat}</div>
              {sec.items.map((item, ii) => {
                const k = `${si}-${ii}`;
                const done = !!checks[k];
                return (
                  <div key={ii} onClick={() => toggle(k)}
                    style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0",
                      borderBottom: ii < sec.items.length - 1 ? "1px solid #f5f5f5" : "none", cursor: "pointer" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, border: done ? "none" : "2px solid #ccc",
                      background: done ? "#06d6a0" : "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: 1, transition: "all .2s" }}>
                      {done && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: done ? "#aaa" : "#222", textDecoration: done ? "line-through" : "none", fontWeight: 500 }}>
                        {item.t}
                        {item.req && <span style={{ marginLeft: 6, fontSize: 10, background: "#eef2ff", color: "#4f8ef7", padding: "1px 6px", borderRadius: 4, fontWeight: 600 }}>REQ</span>}
                      </div>
                      {item.note && <div style={{ fontSize: 11, color: "#f59e0b", marginTop: 2 }}>⚠ {item.note}</div>}
                      {item.link && !done && (
                        <a href={item.link} target="_blank" rel="noreferrer"
                          style={{ fontSize: 11, color: "#4f8ef7", textDecoration: "none" }}
                          onClick={e => e.stopPropagation()}>→ Ir al admin ↗</a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* TAB 2 — Canvas Slack */}
      {tab === 2 && (
        <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px #0001" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>📋 Canvas para Slack</div>
              <div style={{ fontSize: 12, color: "#888" }}>Room: #cafemartinez-migracion</div>
            </div>
            <button onClick={copyCanvas}
              style={{ padding: "8px 18px", background: copied ? "#06d6a0" : "#4f8ef7", color: "#fff", border: "none",
                borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "background .2s" }}>
              {copied ? "✓ Copiado!" : "📋 Copiar Markdown"}
            </button>
          </div>
          <pre style={{ background: "#f8f9fa", borderRadius: 10, padding: 16, fontSize: 12, lineHeight: 1.7,
            overflowX: "auto", whiteSpace: "pre-wrap", color: "#333", border: "1px solid #eee" }}>
            {CANVAS_MD}
          </pre>
          <div style={{ marginTop: 12, background: "#fffbeb", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#92400e" }}>
            💡 <strong>Cómo usarlo:</strong> Copiá el markdown → abrí el room <strong>#cafemartinez-migracion</strong> en Slack → creá un nuevo Canvas → pegá el contenido. Slack renderiza las tablas automáticamente.
          </div>
        </div>
      )}
    </div>
  );
}
