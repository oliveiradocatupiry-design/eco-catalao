import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ChevronRight, Menu, X } from "lucide-react";
import { modules, moduleUrl } from "../constants/modules";
import { useCatalog } from "../app/catalogContext";
import { Icon } from "./Icon";
import { ErrorMessage, SuccessMessage } from "./Feedback";
export function Layout() {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const main = useRef<HTMLElement>(null);
  const { error, notice, dismiss } = useCatalog();
  const spec = modules.find((m) => location.pathname.startsWith(moduleUrl(m)));
  const title =
    spec?.title ??
    (location.pathname === "/admin/configuracoes"
      ? "Configurações"
      : "Dashboard");
  useEffect(() => {
    document.title = `${title} · EcoCatalão Admin`;
    main.current?.focus();
  }, [location.pathname, title]);
  const nav = (
    <>
      <NavLink to="/admin" end>
        <Icon name="dashboard" />
        Dashboard
      </NavLink>
      <div className="nav-label">CONTEÚDOS DO PROJETO</div>
      <div className="nav-group">
        <Icon name="types" />
        Resíduos
      </div>
      {modules.map((m) => (
        <NavLink
          key={m.kind}
          className={
            m.kind === "types" || m.kind === "subtypes" ? "nav-child" : ""
          }
          to={moduleUrl(m)}
        >
          <Icon name={m.kind} />
          {m.kind === "types"
            ? "Tipos"
            : m.kind === "subtypes"
              ? "Subtipos"
              : m.kind === "ideas"
                ? "Reutilização"
                : m.title}
        </NavLink>
      ))}
      <div className="nav-divider" />
      <NavLink to="/admin/configuracoes">
        <Icon name="settings" />
        Configurações
      </NavLink>
    </>
  );
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Ir para o conteúdo
      </a>
      <aside className="sidebar">
        <Link className="brand" to="/admin">
          <span className="brand-mark">e</span>
          <span>
            EcoCatalão<small>PAINEL ADMINISTRATIVO</small>
          </span>
        </Link>
        <nav aria-label="Navegação principal">{nav}</nav>
        <div className="sidebar-bottom">
          <Icon name="leaf" />
          <strong>Cuidado que começa aqui.</strong>
          <p>Conteúdos para a Comunidade Flutuante do Lago do Catalão.</p>
          <span>ADMIN WEB · V1.0</span>
        </div>
      </aside>
      <div className="app-body">
        <header className="topbar">
          <button
            className="icon-button menu-toggle"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-controls="mobile-nav"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
          >
            {menu ? <X /> : <Menu />}
          </button>
          <div className="breadcrumb">
            <Link to="/admin">Administração</Link>
            <ChevronRight size={14} />
            <span>{title}</span>
          </div>
          <div className="header-meta">
            <span className="prototype-badge">Protótipo</span>
            <span className="administrator">Administrador</span>
          </div>
        </header>
        {menu && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Navegação móvel"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setMenu(false);
            }}
          >
            {nav}
          </nav>
        )}
        <main id="main" tabIndex={-1} ref={main}>
          {notice && <SuccessMessage message={notice} onClose={dismiss} />}
          {error && (
            <ErrorMessage>
              {error} <Link to="/admin/configuracoes">Abrir configurações</Link>
            </ErrorMessage>
          )}
          <Outlet />
        </main>
        <footer className="page-footer">
          <span>EcoCatalão · Comunidade e cuidado ambiental</span>
          <span>Dados salvos somente neste navegador</span>
        </footer>
      </div>
    </div>
  );
}
