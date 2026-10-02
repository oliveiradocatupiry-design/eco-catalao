import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  ArrowUpRight,
  Pencil,
  Trash2,
  SlidersHorizontal,
} from "lucide-react";
import { useCatalog } from "../app/catalogContext";
import { moduleUrl, relatedLabel, type ModuleSpec } from "../constants/modules";
import {
  ConfirmDialog,
  ErrorMessage,
  StatusBadge,
} from "../components/Feedback";
import { Icon } from "../components/Icon";
import type { Entity } from "../types/catalog";
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
export function RecordList({ spec }: { spec: ModuleSpec }) {
  const { records, loading, error, service, mutate } = useCatalog();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [relation, setRelation] = useState("");
  const [deleting, setDeleting] = useState<Entity | null>(null);
  const [actionError, setActionError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const items = records.filter((r) => r.kind === spec.kind);
  const results = useMemo(
    () =>
      records.filter(
        (r) =>
          r.kind === spec.kind &&
          normalize(`${r.name} ${r.description} ${r.id}`).includes(
            normalize(search),
          ) &&
          (!status || r.status === status) &&
          (!relation ||
            (spec.kind === "education" && r.kind === "education"
              ? r.category === relation
              : spec.relation &&
                Object.entries(r).some(
                  ([key, value]) =>
                    key === spec.relation?.key && value === relation,
                ))),
      ),
    [records, spec, search, status, relation],
  );
  const relationOptions = spec.relation
    ? records
        .filter((r) => r.kind === spec.relation?.kind)
        .map((r) => ({ id: r.id, name: r.name }))
    : spec.kind === "education"
      ? [
          ...new Set(
            items.flatMap((r) => (r.kind === "education" ? [r.category] : [])),
          ),
        ].map((name) => ({ id: name, name }))
      : [];
  async function toggle(record: Entity) {
    setBusy(record.id);
    setActionError("");
    try {
      await mutate(
        () =>
          service.setActive(
            record.kind,
            record.id,
            record.status === "active" ? "inactive" : "active",
          ),
        "Status atualizado neste navegador.",
      );
    } catch (e) {
      setActionError(
        e instanceof Error ? e.message : "Não foi possível alterar.",
      );
    } finally {
      setBusy(null);
    }
  }
  if (loading) return <p role="status">Carregando cadastros…</p>;
  if (error) return null;
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">CATÁLOGO DO PROJETO</p>
          <h1>{spec.title}</h1>
          <p>{spec.description}</p>
        </div>
        <Link
          className="button primary"
          to={`${moduleUrl(spec)}/${spec.newRoute}`}
        >
          <Plus size={18} />
          {spec.create}
        </Link>
      </div>
      {spec.kind === "points" && (
        <div className="message warning">
          <Icon name="points" />
          <span>
            <strong>Dado demonstrativo · A validar com a comunidade.</strong> Os
            locais abaixo não indicam recebimento real.
          </span>
        </div>
      )}
      {actionError && <ErrorMessage>{actionError}</ErrorMessage>}
      <section className="panel list-panel">
        <div className="list-summary">
          <h2>
            {items.length} {items.length === 1 ? "registro" : "registros"}
          </h2>
          <span>Organize, revise e mantenha os conteúdos atualizados.</span>
        </div>
        <div className="filters">
          <label className="search-field">
            <span className="sr-only">
              Pesquisar {spec.title.toLowerCase()}
            </span>
            <Search size={19} />
            <input
              type="search"
              placeholder={`Pesquisar ${spec.title.toLowerCase()}…`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          {relationOptions.length > 0 && (
            <label className="filter-label">
              {spec.relation?.label ?? "Categoria"}
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
              >
                <option value="">Todos</option>
                {relationOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="filter-label">
            <SlidersHorizontal size={15} /> Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Todos</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </label>
        </div>
        {results.length ? (
          <div className="table-scroll">
            <table>
              <caption className="sr-only">{spec.title}</caption>
              <thead>
                <tr>
                  <th>Nome / identificação</th>
                  <th>
                    {spec.kind === "types"
                      ? "Relacionamentos"
                      : spec.kind === "points"
                        ? "Materiais"
                        : spec.kind === "education"
                          ? "Categoria"
                          : "Material associado"}
                  </th>
                  <th>Status</th>
                  <th className="actions-heading">Ações</th>
                </tr>
              </thead>
              <tbody>
                {results.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <div className="record-name">
                        <span
                          className={`icon-tile tone-${record.kind}`}
                          style={
                            record.kind === "types"
                              ? { backgroundColor: record.color }
                              : undefined
                          }
                        >
                          <Icon
                            name={
                              record.kind === "types"
                                ? record.icon
                                : record.kind
                            }
                          />
                        </span>
                        <div>
                          <Link
                            className="name-link"
                            to={`${moduleUrl(spec)}/${record.id}`}
                          >
                            {record.name}
                          </Link>
                          <span className="record-description">
                            {record.description}
                          </span>
                          <small className="record-id">ID: {record.id}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="relation-chip">
                        {relatedLabel(record, records)}
                      </span>
                    </td>
                    <td>
                      <button
                        className="status-button"
                        aria-label={`${record.status === "active" ? "Desativar" : "Ativar"} ${record.name}`}
                        disabled={busy === record.id}
                        onClick={() => void toggle(record)}
                      >
                        <StatusBadge status={record.status} />
                      </button>
                    </td>
                    <td>
                      <div className="row-actions">
                        <Link
                          className="icon-button"
                          aria-label={`Visualizar ${record.name}`}
                          title="Visualizar"
                          to={`${moduleUrl(spec)}/${record.id}`}
                        >
                          <ArrowUpRight size={18} />
                        </Link>
                        <Link
                          className="icon-button"
                          aria-label={`Editar ${record.name}`}
                          title="Editar"
                          to={`${moduleUrl(spec)}/${record.id}/editar`}
                        >
                          <Pencil size={17} />
                        </Link>
                        <button
                          className="icon-button delete-button"
                          aria-label={`Excluir ${record.name}`}
                          title="Excluir"
                          onClick={() => setDeleting(record)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty">
            <span className="icon-tile">
              <Search />
            </span>
            <h2>
              {items.length
                ? "Nenhum resultado encontrado"
                : "Comece o seu catálogo"}
            </h2>
            <p>
              {items.length
                ? "Tente outro termo ou ajuste os filtros."
                : "Adicione o primeiro registro para organizar esta seção."}
            </p>
            {items.length ? (
              <button
                className="button secondary"
                onClick={() => {
                  setSearch("");
                  setStatus("");
                  setRelation("");
                }}
              >
                Limpar filtros
              </button>
            ) : (
              <Link
                className="button primary"
                to={`${moduleUrl(spec)}/${spec.newRoute}`}
              >
                {spec.create}
              </Link>
            )}
          </div>
        )}
        <div className="list-footer">
          <span>
            {results.length} de {items.length} registros
          </span>
          <span>Alterações locais · sem sincronização</span>
        </div>
      </section>
      {deleting && (
        <ConfirmDialog
          title={`Excluir “${deleting.name}”?`}
          onClose={() => setDeleting(null)}
          onConfirm={() =>
            mutate(
              () => service.delete(spec.kind, deleting.id),
              "Registro excluído do protótipo local.",
            )
          }
        >
          <p>
            Esta ação remove o registro deste navegador. Registros com vínculos
            precisam ser desvinculados antes da exclusão.
          </p>
        </ConfirmDialog>
      )}
    </>
  );
}
