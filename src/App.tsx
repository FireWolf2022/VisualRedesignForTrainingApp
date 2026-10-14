import { useState, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

const exercises = [
  ["Press en banca", "3 × 12 reps · Descanso 1 min"],
  ["Barras", "3 × 12 reps · Descanso 1 min"],
];

function Button({
  children,
  variant = "primary",
  disabled = false,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
}) {
  return (
    <button className={`button ${variant}`} disabled={disabled}>
      {children}
    </button>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`card ${className}`}>{children}</section>;
}

function Header({
  title,
  back = false,
}: {
  title: string;
  back?: boolean;
}) {
  return (
    <header className="app-header">
      {back && <button className="icon-button" aria-label="Volver">←</button>}
      <strong>{title}</strong>
    </header>
  );
}

function Tabs({ active }: { active: "Hoy" | "Rutinas" | "Calendario" }) {
  return (
    <nav className="tabs">
      {[
        ["♜", "Hoy"],
        ["▤", "Rutinas"],
        ["▦", "Calendario"],
      ].map(([icon, label]) => (
        <button className={active === label ? "active" : ""} key={label}>
          <span>{icon}</span>
          {label}
        </button>
      ))}
    </nav>
  );
}

function Screen({
  title,
  label,
  children,
  tab,
  back,
  dark = false,
}: {
  title: string;
  label: string;
  children: ReactNode;
  tab?: "Hoy" | "Rutinas" | "Calendario";
  back?: boolean;
  dark?: boolean;
}) {
  return (
    <article className="frame-wrap">
      <div className="frame-label">
        <span>{label}</span>
        <small>360 × 800</small>
      </div>
      <div className={`phone ${dark ? "focus-screen" : ""}`}>
        <div className="statusbar"><span>9:41</span><span>● ◒ ▰</span></div>
        <Header title={title} back={back} />
        <main className="screen-content">{children}</main>
        {tab && <Tabs active={tab} />}
      </div>
    </article>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

function WeekSummary() {
  const days = [
    ["L", "12", "done"],
    ["M", "13", "missed"],
    ["X", "14", "today"],
    ["J", "15", "rest"],
    ["V", "16", "rest"],
    ["S", "17", "rest"],
    ["D", "18", "rest"],
  ];
  return (
    <Card>
      <div className="card-heading">
        <Eyebrow>Esta semana</Eyebrow>
        <strong>1 de 3</strong>
      </div>
      <div className="week-grid">
        {days.map(([day, date, state]) => (
          <div className="day" key={day}>
            <small>{day}</small>
            <button className={state}>{date}</button>
          </div>
        ))}
      </div>
      <div className="legend">
        <span><i className="dot green" />Completado</span>
        <span><i className="dot red" />Perdido</span>
        <span><i className="dot gray" />Descanso</span>
      </div>
      <p className="hint">Toca un día para marcarlo o desmarcarlo.</p>
    </Card>
  );
}

function RoutineCard() {
  return (
    <Card className="routine-card">
      <div className="routine-head">
        <div><Eyebrow>Tu entrenamiento</Eyebrow><h2>Pecho</h2><p>2 ejercicios · 18 min</p></div>
        <button className="play" aria-label="Empezar entrenamiento">▶</button>
      </div>
      <div className="mini-list">
        <span><b>01</b> Press en banca <small>3 × 12</small></span>
        <span><b>02</b> Barras <small>3 × 12</small></span>
      </div>
      <Button variant="secondary">Editar rutina</Button>
    </Card>
  );
}

function TodayScreen() {
  return (
    <Screen title="Hoy" label="01 · Hoy" tab="Hoy">
      <div className="date-block">
        <Eyebrow>Miércoles</Eyebrow>
        <h1>14 de octubre</h1>
        <p>Día 2 de 4 del ciclo</p>
      </div>
      <WeekSummary />
      <RoutineCard />
      <Card>
        <Eyebrow>Ajustar el ciclo</Eyebrow>
        <p>Si no entrenaste, atrasa el ciclo. Si quieres saltarte un día, adelántalo.</p>
        <div className="button-row"><Button variant="secondary">Atrasar</Button><Button variant="secondary">Adelantar</Button></div>
      </Card>
    </Screen>
  );
}

function RoutinesScreen({ empty = false }: { empty?: boolean }) {
  return (
    <Screen title="Rutinas" label={empty ? "03 · Rutinas / vacío" : "02 · Rutinas"} tab="Rutinas">
      <div className="section-intro">
        <div><Eyebrow>Tu biblioteca</Eyebrow><h1>Rutinas</h1></div>
        <button className="square-add" aria-label="Nueva rutina">＋</button>
      </div>
      {empty ? (
        <div className="empty-state">
          <div className="empty-mark">＋</div>
          <h2>Sin rutinas todavía</h2>
          <p>Crea tu primera rutina y añade los ejercicios en el orden que prefieras.</p>
          <Button>Nueva rutina</Button>
        </div>
      ) : (
        <div className="routine-list">
          {[["Pecho", "2 ejercicios"], ["Espalda", "4 ejercicios"], ["Pierna", "5 ejercicios"], ["Core", "3 ejercicios"]].map(([name, count], index) => (
            <button className="list-card" key={name}>
              <span className="list-number">0{index + 1}</span>
              <span><strong>{name}</strong><small>{count}</small></span>
              <b>›</b>
            </button>
          ))}
        </div>
      )}
    </Screen>
  );
}

function Segmented({ cycle = false, measure = false }: { cycle?: boolean; measure?: boolean }) {
  const labels = measure ? ["Repeticiones", "Tiempo"] : ["Por semana", "Por ciclo"];
  return (
    <div className="segmented">
      {labels.map((label, i) => <button className={(cycle ? i === 1 : i === 0) ? "active" : ""} key={label}>{label}</button>)}
    </div>
  );
}

function Chips({ active = "pecho" }: { active?: string }) {
  return (
    <div className="chips">
      {["Descanso", "pecho", "espalda", "pierna", "core"].map((chip) => (
        <button className={chip === active ? "active" : ""} key={chip}>{chip}</button>
      ))}
    </div>
  );
}

function CalendarScreen({ cycle = false, disabled = false }: { cycle?: boolean; disabled?: boolean }) {
  const rows = cycle ? ["Día 1", "Día 2", "Día 3"] : ["Lunes", "Martes", "Miércoles", "Jueves"];
  return (
    <Screen title="Calendario" label={`04 · Calendario / ${cycle ? "ciclo" : "semana"}${disabled ? " / deshabilitado" : ""}`} tab="Calendario">
      <div className="date-block compact">
        <Eyebrow>Plan actual</Eyebrow>
        <h1>Calendario</h1>
        <p>{cycle ? "Ciclo · 4 días" : "Por días de la semana · 6 días con rutina"}</p>
      </div>
      <Eyebrow>Cómo repartir las rutinas</Eyebrow>
      <Segmented cycle={cycle} />
      <Card className="editor-card">
        <div className="card-title"><h2>{cycle ? "Días del ciclo" : "Rutina de cada día"}</h2><p>{cycle ? "Se repite en bucle: después del último día vuelve al primero." : "Elige la rutina de cada día."}</p></div>
        {rows.map((row, i) => (
          <div className="schedule-row" key={row}>
            <div><strong>{row}</strong>{cycle && <button>Quitar</button>}</div>
            <Chips active={i === 0 ? "pecho" : i === 1 ? "espalda" : i === 2 ? "pierna" : "core"} />
          </div>
        ))}
      </Card>
      <Button disabled={disabled}>Guardar calendario</Button>
      <p className="center-note">Los cambios se guardan en este dispositivo.</p>
    </Screen>
  );
}

function RoutineDetail({ empty = false }: { empty?: boolean }) {
  return (
    <Screen title="Pecho" label={`06 · Detalle / ${empty ? "vacío" : "con ejercicios"}`} back>
      <div className="date-block compact"><Eyebrow>Rutina</Eyebrow><h1>Pecho</h1><p>{empty ? "0 ejercicios" : "2 ejercicios"}</p></div>
      {empty ? (
        <div className="empty-state detail-empty">
          <div className="empty-mark">01</div><h2>Sin ejercicios</h2>
          <p>Añade el primer ejercicio a esta rutina.</p>
          <Button>Añadir ejercicio</Button>
        </div>
      ) : (
        <>
          <Card className="exercise-list">
            {exercises.map(([name, desc], i) => (
              <div className="exercise-row" key={name}>
                <span className="list-number">0{i + 1}</span>
                <span><strong>{name}</strong><small>{desc}</small></span>
                <div className="sort"><button disabled={i === 0}>▲</button><button disabled={i === exercises.length - 1}>▼</button></div>
              </div>
            ))}
          </Card>
          <p className="center-note">Usa ▲▼ para cambiar el orden de los ejercicios.</p>
          <Button>＋ Añadir ejercicio</Button>
        </>
      )}
      <Button variant="secondary">Editar rutina</Button>
    </Screen>
  );
}

function Field({ label, value, placeholder, area = false }: { label: string; value?: string; placeholder?: string; area?: boolean }) {
  return (
    <label className="field">
      <span>{label}</span>
      {area ? <textarea defaultValue={value} placeholder={placeholder} /> : <input defaultValue={value} placeholder={placeholder} />}
    </label>
  );
}

function RoutineForm() {
  return (
    <Screen title="Editar rutina" label="08 · Formulario de rutina" back>
      <Card><Field label="Nombre de la rutina" value="Pecho" /></Card>
      <Button>Guardar cambios</Button>
      <p className="center-note">Los cambios se guardan en este dispositivo.</p>
      <Button variant="danger">Borrar rutina</Button>
    </Screen>
  );
}

function Stepper({ label, value, minusDisabled = false }: { label: string; value: string; minusDisabled?: boolean }) {
  return (
    <div className="stepper">
      <span>{label}</span>
      <div><button disabled={minusDisabled}>−</button><strong>{value}</strong><button>＋</button></div>
    </div>
  );
}

function ExerciseForm() {
  return (
    <Screen title="Nuevo ejercicio" label="09 · Formulario de ejercicio" back>
      <Card className="context-card"><Eyebrow>Rutina</Eyebrow><strong>Pecho</strong></Card>
      <Card><Field label="Nombre del ejercicio" placeholder="Por ejemplo: Press de banca" /></Card>
      <Card>
        <Eyebrow>Cómo se mide</Eyebrow>
        <Segmented measure />
        <div className="stepper-stack">
          <Stepper label="Series" value="3" />
          <Stepper label="Repeticiones por serie" value="12" />
          <Stepper label="Descanso entre series" value="1 min" />
        </div>
      </Card>
      <Card><Field area label="Notas (opcional)" placeholder="Peso, máquina, técnica…" /></Card>
      <Button disabled>Añadir ejercicio</Button>
      <Button variant="danger">Borrar ejercicio</Button>
    </Screen>
  );
}

function WorkoutCountdown() {
  return (
    <Screen title="Pecho" label="10 · Entrenamiento / cuenta atrás" back dark>
      <div className="workout-center">
        <Eyebrow>Tu entrenamiento empieza en</Eyebrow>
        <div className="countdown-ring"><strong>3</strong></div>
        <h2>Press en banca</h2>
        <p>Prepárate para la primera serie</p>
      </div>
      <Button variant="ghost">Cancelar cuenta atrás</Button>
    </Screen>
  );
}

function WorkoutSet() {
  return (
    <Screen title="Pecho" label="11 · Entrenamiento / serie" back dark>
      <div className="progress-track"><i /></div>
      <div className="progress-meta"><span>Ejercicio 1 de 2</span><span>Serie 2 de 3</span></div>
      <div className="workout-main">
        <Eyebrow>Press en banca</Eyebrow>
        <div className="target"><strong>12</strong><span>repeticiones</span></div>
      </div>
      <Button>Completar serie</Button>
      <Card className="next-card"><Eyebrow>Después</Eyebrow><p>Descanso · 1 min</p></Card>
    </Screen>
  );
}

function WorkoutRest() {
  return (
    <Screen title="Descanso" label="12 · Entrenamiento / descanso" dark>
      <div className="progress-track"><i className="wide" /></div>
      <div className="workout-center rest">
        <Eyebrow>Respira. Ya casi estás.</Eyebrow>
        <div className="timer">00:42</div>
        <p>Siguiente: Press en banca · Serie 3 de 3</p>
      </div>
      <Button>Saltar descanso</Button>
    </Screen>
  );
}

function WorkoutDone() {
  return (
    <Screen title="" label="13 · Entrenamiento / completado" dark>
      <div className="done-state">
        <div className="success-mark">✓</div>
        <Eyebrow>Entrenamiento completado</Eyebrow>
        <h1>¡Rutina completada!</h1>
        <p>Pecho · 18 minutos · 6 series</p>
        <Card className="done-stats"><span><b>2</b><small>Ejercicios</small></span><span><b>6</b><small>Series</small></span><span><b>18</b><small>Minutos</small></span></Card>
      </div>
      <Button>Volver</Button><Button variant="secondary">↻ Repetir</Button>
    </Screen>
  );
}

function LoadingScreen() {
  return (
    <Screen title="" label="14 · Cargando" dark>
      <div className="loading-state"><div className="loader" /><strong>Preparando tu entrenamiento</strong><p>Cargando datos del dispositivo…</p></div>
    </Screen>
  );
}

function Tokens() {
  const colors = [
    ["Ink", "#090B0E"], ["Surface", "#12161B"], ["Raised", "#1A2027"], ["Border", "#2B333D"],
    ["Text", "#F5F7F8"], ["Muted", "#ABB4BE"], ["Volt", "#C8FF3D"], ["Success", "#4DDB97"], ["Danger", "#FF6B6B"],
  ];
  return (
    <section className="spec-panel">
      <div className="spec-heading"><Eyebrow>01 · Fundamentos</Eyebrow><h2>Tokens de diseño</h2><p>Un tema oscuro de alto rendimiento, construido para React Native con StyleSheet puro.</p></div>
      <div className="swatches">{colors.map(([name, hex]) => <div key={name}><i style={{ background: hex }} /><strong>{name}</strong><code>{hex}</code></div>)}</div>
      <div className="token-columns">
        <div><Eyebrow>Tipografía · System</Eyebrow><h3 className="display-sample">72 / 800</h3><p><b>Display</b> 72/76 · 800<br/><b>Title 1</b> 30/36 · 800<br/><b>Title 2</b> 22/28 · 700<br/><b>Body</b> 15/22 · 500<br/><b>Label</b> 12/16 · 700</p></div>
        <div><Eyebrow>Geometría</Eyebrow><p><b>Espaciado</b> 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40<br/><b>Radios</b> 10 controles · 16 tarjetas · 24 hero · 999 píldora<br/><b>Bordes</b> 1 dp #2B333D · foco 2 dp Volt<br/><b>Elevación</b> sin sombra; capas por color y borde</p></div>
      </div>
    </section>
  );
}

function Components() {
  return (
    <section className="spec-panel">
      <div className="spec-heading"><Eyebrow>02 · Componentes</Eyebrow><h2>Kit de interfaz</h2><p>Todos los controles tienen un área táctil mínima de 44 × 44 dp.</p></div>
      <div className="component-grid">
        <div className="component-demo"><Eyebrow>Button · 52 h · radio 12</Eyebrow><Button>Primario</Button><Button variant="secondary">Secundario</Button><Button variant="danger">Peligro</Button><Button variant="ghost">Fantasma</Button><Button disabled>Deshabilitado</Button><p>Padding 0/18 · label 15/20 750 · pressed: −8% luminosidad y escala 0,98.</p></div>
        <div className="component-demo"><Eyebrow>Selección</Eyebrow><Segmented /><Chips active="pecho" /><p>Segmented 48 h · chip 44 h mínimo · seleccionado usa Volt con texto Ink.</p></div>
        <div className="component-demo"><Eyebrow>Stepper</Eyebrow><Stepper label="Series" value="3" minusDisabled /><p>Botones 44 × 44 · valor centrado de ancho estable · deshabilitado a 38%.</p></div>
        <div className="component-demo"><Eyebrow>Campo de texto</Eyebrow><Field label="Nombre del ejercicio" value="Press en banca" /><p>Input 56 h · padding 16 · foco con borde Volt 2 dp · placeholder Muted.</p></div>
        <div className="component-demo"><Eyebrow>Card · superficie</Eyebrow><Card><h3>Título de sección</h3><p>Padding 16 · radio 16 · borde 1 · sin sombra. Separador de 1 dp con 16 dp de margen.</p></Card></div>
        <div className="component-demo"><Eyebrow>Play · 60 × 60</Eyebrow><div className="play-demo"><button className="play">▶</button><span>Acción principal inequívoca, contraste 9.2:1 y feedback pressed.</span></div></div>
      </div>
    </section>
  );
}

const groups = [
  { id: "system", label: "Sistema", node: <><Tokens /><Components /></> },
  { id: "core", label: "Núcleo", node: <div className="frame-grid"><TodayScreen /><RoutinesScreen /><RoutinesScreen empty /><CalendarScreen /><CalendarScreen cycle /><CalendarScreen disabled /></div> },
  { id: "editor", label: "Edición", node: <div className="frame-grid"><RoutineDetail /><RoutineDetail empty /><RoutineForm /><ExerciseForm /></div> },
  { id: "training", label: "Entrenamiento", node: <div className="frame-grid"><WorkoutCountdown /><WorkoutSet /><WorkoutRest /><WorkoutDone /><LoadingScreen /></div> },
];

export default function App() {
  const [active, setActive] = useState("system");
  const current = groups.find((group) => group.id === active)!;
  return (
    <div className="showcase">
      <aside className="sidebar">
        <div className="brand"><span>AM</span><div><strong>APP MÓVIL</strong><small>Visual refresh · v2.0</small></div></div>
        <div className="side-copy"><Eyebrow>Sistema</Eyebrow><h1>Entrena.<br/>Avanza.<br/><i>Repite.</i></h1><p>Rediseño visual para una experiencia enfocada, legible y con energía.</p></div>
        <nav>{groups.map((group, index) => <button className={active === group.id ? "active" : ""} onClick={() => setActive(group.id)} key={group.id}><span>0{index + 1}</span>{group.label}</button>)}</nav>
        <small className="sidebar-foot">Android · 360 × 800 dp<br/>React Native · StyleSheet</small>
      </aside>
      <main className="canvas">
        <header className="canvas-header"><div><Eyebrow>App personal de entrenamiento</Eyebrow><h1>{current.label}</h1></div><div className="status-pill"><i /> Especificación lista</div></header>
        {current.node}
        <section className="accessibility">
          <Eyebrow>Nota de implementación</Eyebrow>
          <p><b>Contraste:</b> texto principal 17.1:1, texto secundario 8.3:1 y texto sobre Volt 15.4:1. <b>Interacción:</b> todos los controles mantienen al menos 44 × 44 dp. <b>Iconografía:</b> sustituiría emoji por símbolos SVG propios de trazo 2 dp (hoy: pesa, rutinas: lista, calendario: cuadrícula); hasta entonces, los glifos actuales conservan su significado y flujo. Sin blur, gradientes ni dependencias extra.</p>
        </section>
      </main>
    </div>
  );
}
