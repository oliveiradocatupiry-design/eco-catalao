import { Plus, X } from "lucide-react";
import type { FieldSpec } from "../constants/modules";
import type { Draft, Entity, FieldErrors } from "../types/catalog";

export function RecordFields({
  fields,
  draft,
  records,
  errors,
  onChange,
}: {
  fields: FieldSpec[];
  draft: Draft;
  records: Entity[];
  errors: FieldErrors;
  onChange: (key: string, value: string | string[]) => void;
}) {
  return (
    <div className="fields-grid">
      {fields.map((field) => {
        const id = `field-${field.key}`;
        const value = draft[field.key] ?? "";
        const list = Array.isArray(value) ? value : [];
        const options = field.source
          ? records
              .filter((r) => r.kind === field.source)
              .map((r) => ({
                value: r.id,
                label: `${r.name}${r.status === "inactive" ? " (inativo)" : ""}`,
              }))
          : (field.options ?? []);
        const props = {
          id,
          "aria-invalid": !!errors[field.key],
          "aria-describedby": `${id}-help ${errors[field.key] ? `${id}-error` : ""}`,
          required: field.required,
        };
        const label = (
          <>
            {field.label}
            {field.required && (
              <span className="required" aria-label="obrigatório">
                {" "}
                *
              </span>
            )}
          </>
        );
        if (field.type === "list" || field.type === "checks")
          return (
            <fieldset
              className="field wide"
              key={id}
              aria-describedby={`${id}-error`}
            >
              <legend>{label}</legend>
              {field.type === "list" ? (
                <>
                  <div className="array-fields">
                    {list.map((entry, index) => (
                      <div className="array-row" key={index}>
                        <span className="step-number">{index + 1}</span>
                        <input
                          aria-label={`${field.label} ${index + 1}`}
                          value={entry}
                          onChange={(e) =>
                            onChange(
                              field.key,
                              list.map((item, i) =>
                                i === index ? e.target.value : item,
                              ),
                            )
                          }
                        />
                        <button
                          type="button"
                          className="icon-button"
                          aria-label={`Remover ${field.label.toLowerCase()} ${index + 1}`}
                          onClick={() =>
                            onChange(
                              field.key,
                              list.filter((_, i) => i !== index),
                            )
                          }
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="button subtle"
                    onClick={() => onChange(field.key, [...list, ""])}
                  >
                    <Plus size={16} />
                    {field.key === "steps"
                      ? "Adicionar passo"
                      : "Adicionar material"}
                  </button>
                </>
              ) : (
                <div className="checkbox-grid">
                  {options.map((option) => (
                    <label key={option.value}>
                      <input
                        type="checkbox"
                        checked={list.includes(option.value)}
                        onChange={(e) =>
                          onChange(
                            field.key,
                            e.target.checked
                              ? [...list, option.value]
                              : list.filter((v) => v !== option.value),
                          )
                        }
                      />
                      {option.label}
                    </label>
                  ))}
                  {!options.length && (
                    <p>Cadastre um subtipo antes de selecionar materiais.</p>
                  )}
                </div>
              )}
              {errors[field.key] && (
                <span className="field-error" id={`${id}-error`}>
                  {errors[field.key]}
                </span>
              )}
            </fieldset>
          );
        return (
          <div className={`field ${field.wide ? "wide" : ""}`} key={id}>
            <label htmlFor={id}>{label}</label>
            {field.type === "textarea" ? (
              <textarea
                {...props}
                rows={field.key === "content" ? 12 : 3}
                value={String(value)}
                onChange={(e) => onChange(field.key, e.target.value)}
              />
            ) : field.type === "select" ? (
              <select
                {...props}
                value={String(value)}
                onChange={(e) => onChange(field.key, e.target.value)}
              >
                <option value="">
                  {field.required ? "Selecione…" : "Sem vínculo"}
                </option>
                {options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...props}
                type={field.type === "color" ? "color" : "text"}
                inputMode={
                  field.key === "latitude" || field.key === "longitude"
                    ? "decimal"
                    : undefined
                }
                value={String(value)}
                onChange={(e) => onChange(field.key, e.target.value)}
              />
            )}
            {field.hint && <small id={`${id}-help`}>{field.hint}</small>}
            {errors[field.key] && (
              <span className="field-error" id={`${id}-error`}>
                {errors[field.key]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
