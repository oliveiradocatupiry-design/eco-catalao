import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useCatalog } from "../app/catalogContext";
import { emptyDraft, moduleUrl, type ModuleSpec } from "../constants/modules";
import { RecordFields } from "../components/RecordFields";
import { ErrorMessage } from "../components/Feedback";
import { toDraft } from "../services/CatalogService";
import {
  ValidationError,
  type Draft,
  type Entity,
  type FieldErrors,
} from "../types/catalog";
export function RecordEditor({ spec }: { spec: ModuleSpec }) {
  const { id } = useParams();
  const { records, loading, error } = useCatalog();
  const entity = records.find((r) => r.kind === spec.kind && r.id === id);
  if (loading) return <p role="status">Carregando formulário…</p>;
  if (error) return null;
  if (id && !entity)
    return (
      <ErrorMessage>
        Registro não encontrado.{" "}
        <Link to={moduleUrl(spec)}>Voltar para a lista</Link>
      </ErrorMessage>
    );
  return (
    <EditorForm key={id ?? `new-${spec.kind}`} spec={spec} entity={entity} />
  );
}
function EditorForm({ spec, entity }: { spec: ModuleSpec; entity?: Entity }) {
  const { records, service, mutate } = useCatalog();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Draft>(() =>
    entity ? toDraft(entity) : emptyDraft(spec),
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setErrors({});
    try {
      await mutate(
        () => service.save(spec.kind, draft, entity?.id),
        "Alterações salvas neste navegador.",
      );
      navigate(moduleUrl(spec));
    } catch (e) {
      if (e instanceof ValidationError) {
        setErrors(e.fields);
        requestAnimationFrame(() =>
          document
            .querySelector<HTMLElement>('[aria-invalid="true"], .field-error')
            ?.focus(),
        );
      }
      setError(e instanceof Error ? e.message : "Não foi possível salvar.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <Link className="back-link" to={moduleUrl(spec)}>
        <ArrowLeft size={17} />
        {spec.title}
      </Link>
      <div className="page-heading">
        <div>
          <p className="eyebrow">
            {entity ? "EDITAR CADASTRO" : "NOVO CADASTRO"}
          </p>
          <h1>
            {entity ? `Editar ${spec.singular.toLowerCase()}` : spec.create}
          </h1>
          <p>
            Campos com * são obrigatórios. As alterações ficam neste navegador.
          </p>
        </div>
      </div>
      <form
        className="panel editor-panel"
        onSubmit={(e) => void save(e)}
        noValidate
      >
        <div className="editor-intro">
          <h2>{entity?.name ?? "Informações do cadastro"}</h2>
          {entity && <p className="muted">Identificador: {entity.id}</p>}
          {spec.kind === "points" && (
            <div className="message warning">
              Dado demonstrativo · A validar com a comunidade. Não cadastre
              informações pessoais ou contatos sem autorização.
            </div>
          )}
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <fieldset className="form-body" disabled={busy}>
          <RecordFields
            fields={spec.fields}
            records={records}
            draft={draft}
            errors={errors}
            onChange={(key, value) =>
              setDraft((current) => ({ ...current, [key]: value }))
            }
          />
        </fieldset>
        <div className="form-actions">
          <Link
            className="button secondary"
            to={moduleUrl(spec)}
            aria-disabled={busy}
            onClick={(e) => {
              if (busy) e.preventDefault();
            }}
          >
            Cancelar
          </Link>
          <button className="button primary" disabled={busy} type="submit">
            <Save size={18} />
            {busy ? "Salvando…" : "Salvar registro"}
          </button>
        </div>
      </form>
    </>
  );
}
