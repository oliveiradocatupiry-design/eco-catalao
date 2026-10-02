import { Link } from "react-router-dom";
import {
  ArrowRight,
  Plus,
  HardDrive,
  ShieldOff,
  Cable,
  MapPin,
} from "lucide-react";
import { useCatalog } from "../app/catalogContext";
import { modules, moduleUrl } from "../constants/modules";
import { Icon } from "../components/Icon";
import { StatusBadge } from "../components/Feedback";
import { RiverIllustration } from "../components/RiverIllustration";

export function Dashboard() {
  const { records, loading, error } = useCatalog();
  if (loading) return <p role="status">Carregando painel…</p>;
  if (error) return null;
  const recent = records
    .filter((r) => r.kind === "education")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 3);
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">GESTÃO DE CONTEÚDOS</p>
          <h1>Dashboard</h1>
          <p>Um lugar para organizar o cuidado com a comunidade.</p>
        </div>
        <span className="local-pill">
          <span /> Ambiente local
        </span>
      </div>
      <section className="welcome">
        <div>
          <p className="eyebrow">COMUNIDADE FLUTUANTE · LAGO DO CATALÃO</p>
          <h2>
            Informação que cuida.
            <br />
            Cuidado que transforma.
          </h2>
          <p>
            Organize materiais, orientações e pontos de coleta.
            <br className="desktop-break" /> Cada conteúdo aproxima o projeto de
            quem vive aqui.
          </p>
          <Link className="button yellow" to="/admin/residuos/subtipos">
            Gerenciar resíduos <ArrowRight size={18} />
          </Link>
        </div>
        <RiverIllustration />
      </section>
      <div className="section-heading">
        <h2>O projeto em conteúdos</h2>
        <span>Cadastros deste protótipo</span>
      </div>
      <section className="metrics" aria-label="Resumo dos cadastros">
        {modules.map((m) => (
          <Link
            className={`metric metric-${m.kind}`}
            to={moduleUrl(m)}
            key={m.kind}
          >
            <div className="metric-top">
              <span className="icon-tile">
                <Icon name={m.kind} />
              </span>
              <ArrowRight size={16} />
            </div>
            <strong>
              {records
                .filter((r) => r.kind === m.kind)
                .length.toString()
                .padStart(2, "0")}
            </strong>
            <span>
              {m.kind === "education" ? "Conteúdos educativos" : m.title}
            </span>
          </Link>
        ))}
      </section>
      <div className="dashboard-columns">
        <section className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PARA COMEÇAR</p>
              <h2>Acesso rápido</h2>
            </div>
            <Plus size={20} />
          </div>
          <div className="quick-actions">
            {modules
              .filter((m) => m.kind !== "types")
              .map((m) => (
                <Link to={`${moduleUrl(m)}/${m.newRoute}`} key={m.kind}>
                  <span className={`icon-tile tone-${m.kind}`}>
                    <Icon name={m.kind} />
                  </span>
                  <div>
                    <strong>{m.create}</strong>
                    <small>
                      {m.kind === "subtypes"
                        ? "Orientações de um material"
                        : m.kind === "ideas"
                          ? "Um novo uso, passo a passo"
                          : m.kind === "education"
                            ? "Conhecimento para compartilhar"
                            : "Informações para validar"}
                    </small>
                  </div>
                  <ArrowRight size={18} />
                </Link>
              ))}
          </div>
        </section>
        <section className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EDUCAÇÃO AMBIENTAL</p>
              <h2>Conteúdos do projeto</h2>
            </div>
            <Link className="text-link" to="/admin/educacao">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
          {recent.length ? (
            recent.map((r) => (
              <Link
                className="content-row"
                to={`/admin/educacao/${r.id}`}
                key={r.id}
              >
                <span className="icon-tile tone-education">
                  <Icon name="education" />
                </span>
                <div>
                  <small>{r.kind === "education" ? r.category : ""}</small>
                  <strong>{r.name}</strong>
                </div>
                <StatusBadge status={r.status} />
              </Link>
            ))
          ) : (
            <p className="empty">Nenhum conteúdo educativo cadastrado.</p>
          )}
          <div className="review-note">
            <MapPin size={19} />
            <p>
              Conteúdos e locais demonstrativos.
              <br />
              <strong>A revisão com a comunidade vem primeiro.</strong>
            </p>
          </div>
        </section>
      </div>
      <section className="prototype-panel">
        <div>
          <span className="prototype-badge">Modo de protótipo</span>
          <h2>Uma base para os próximos passos</h2>
          <p>A autenticação administrativa ainda não foi implementada.</p>
        </div>
        <ul>
          <li>
            <HardDrive size={19} />
            <span>
              <strong>Dados neste navegador</strong>
              <small>Alterações salvas localmente</small>
            </span>
          </li>
          <li>
            <ShieldOff size={19} />
            <span>
              <strong>Sem backend ou login</strong>
              <small>Acesso livre para demonstração</small>
            </span>
          </li>
          <li>
            <Cable size={19} />
            <span>
              <strong>Integração futura</strong>
              <small>Admin, API e aplicativo mobile</small>
            </span>
          </li>
        </ul>
      </section>
    </>
  );
}
