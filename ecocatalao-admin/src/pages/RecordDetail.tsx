import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useCatalog } from "../app/catalogContext";
import {
  formatDate,
  moduleUrl,
  relatedLabel,
  type ModuleSpec,
} from "../constants/modules";
import {
  ConfirmDialog,
  ErrorMessage,
  StatusBadge,
} from "../components/Feedback";
import { Icon } from "../components/Icon";
export function RecordDetail({ spec }: { spec: ModuleSpec }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { records, loading, error, service, mutate } = useCatalog();
  const [confirm, setConfirm] = useState(false);
  const entity = records.find((r) => r.kind === spec.kind && r.id === id);
  if (loading) return <p role="status">Carregando registro…</p>;
  if (error) return null;
  if (!entity)
    return (
      <ErrorMessage>
        Registro não encontrado.{" "}
        <Link to={moduleUrl(spec)}>Voltar para a lista</Link>
      </ErrorMessage>
    );
  const values = Object.fromEntries(Object.entries(entity));
  return (
    <>
      <Link className="back-link" to={moduleUrl(spec)}>
        <ArrowLeft size={17} />
        {spec.title}
      </Link>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{spec.singular.toUpperCase()}</p>
          <h1>{entity.name}</h1>
          <p>{relatedLabel(entity, records)}</p>
        </div>
        <div className="heading-actions">
          <button
            className="button secondary delete-button"
            onClick={() => setConfirm(true)}
          >
            <Trash2 size={17} />
            Excluir
          </button>
          <Link
            className="button primary"
            to={`${moduleUrl(spec)}/${entity.id}/editar`}
          >
            <Pencil size={17} />
            Editar cadastro
          </Link>
        </div>
      </div>
      <article className="panel detail-panel">
        <div className="detail-meta">
          <StatusBadge status={entity.status} />
          <span>Atualizado localmente em {formatDate(entity.updatedAt)}</span>
        </div>
        {entity.kind === "points" && (
          <div className="message warning">
            <Icon name="points" />
            <span>
              Dado demonstrativo · A validar com a comunidade. Não é um ponto
              confirmado de recebimento.
            </span>
          </div>
        )}
        <dl className="detail-fields">
          {spec.fields
            .filter((f) => f.key !== "status" && f.key !== "name")
            .map((f) => {
              const value = values[f.key];
              const options = f.source
                ? records
                    .filter((r) => r.kind === f.source)
                    .map((r) => ({ value: r.id, label: r.name }))
                : (f.options ?? []);
              return (
                <div className={f.wide ? "wide" : ""} key={f.key}>
                  <dt>{f.label.replace(" (opcional)", "")}</dt>
                  <dd>
                    {Array.isArray(value) ? (
                      <ol
                        className={
                          f.key === "steps" ? "numbered-list" : "plain-list"
                        }
                      >
                        {value.map((item, index) => (
                          <li key={index}>
                            {options.find((o) => o.value === item)?.label ??
                              item}
                          </li>
                        ))}
                      </ol>
                    ) : f.key === "color" ? (
                      <span className="color-value">
                        <span style={{ backgroundColor: String(value) }} />
                        {value}
                      </span>
                    ) : (
                      (options.find((o) => o.value === value)?.label ??
                      String(value || "Não informado"))
                    )}
                  </dd>
                </div>
              );
            })}
        </dl>
        <p className="detail-id">Identificador: {entity.id}</p>
      </article>
      {confirm && (
        <ConfirmDialog
          title={`Excluir “${entity.name}”?`}
          onClose={() => setConfirm(false)}
          onConfirm={async () => {
            await mutate(
              () => service.delete(spec.kind, entity.id),
              "Registro excluído do protótipo local.",
            );
            navigate(moduleUrl(spec));
          }}
        >
          <p>
            Esta ação remove o registro deste navegador. Vínculos existentes
            precisam ser alterados primeiro.
          </p>
        </ConfirmDialog>
      )}
    </>
  );
}
