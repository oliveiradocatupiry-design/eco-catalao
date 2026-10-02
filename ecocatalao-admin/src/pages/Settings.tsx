import { useState } from "react";
import { RotateCcw, Database, Cable, ShieldOff } from "lucide-react";
import { useCatalog } from "../app/catalogContext";
import { ConfirmDialog } from "../components/Feedback";
export function Settings() {
  const [reset, setReset] = useState(false);
  const { service, mutate } = useCatalog();
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">SOBRE ESTE AMBIENTE</p>
          <h1>Configurações</h1>
          <p>
            Transparência sobre o que este protótipo faz e o que vem depois.
          </p>
        </div>
        <span className="prototype-badge">Admin Web V1.0</span>
      </div>
      <section className="panel">
        <h2>Um painel em construção, com limites claros</h2>
        <p className="muted">
          Frontend funcional para demonstrar a gestão de conteúdos do
          EcoCatalão.
        </p>
        <div className="settings-grid">
          <div>
            <Database />
            <h3>Persistência local</h3>
            <p>
              Os cadastros ficam no localStorage deste navegador. Não é um banco
              de dados. Limpar os dados do site pode apagar suas alterações.
            </p>
          </div>
          <div>
            <ShieldOff />
            <h3>Sem autenticação</h3>
            <p>
              O acesso é direto neste protótipo. Ainda não há login, contas,
              autorização ou gestão de usuários.
            </p>
          </div>
          <div>
            <Cable />
            <h3>Integração futura</h3>
            <p>
              Não há API, sincronização com o mobile ou envio de dados. O painel
              e o aplicativo usam cópias independentes dos exemplos.
            </p>
          </div>
        </div>
      </section>
      <section className="panel reset-panel">
        <div>
          <h2>Restaurar dados demonstrativos</h2>
          <p>
            Substitui todos os cadastros locais do painel pelos exemplos
            originais. Esta ação não altera o aplicativo mobile nem outros dados
            do navegador.
          </p>
          <small>
            As edições, inclusões e exclusões feitas aqui serão perdidas.
          </small>
        </div>
        <button
          className="button secondary delete-button"
          onClick={() => setReset(true)}
        >
          <RotateCcw size={18} />
          Restaurar exemplos
        </button>
      </section>
      <section className="panel future-panel">
        <p className="eyebrow">PRÓXIMA ETAPA</p>
        <h2>Uma fonte de conteúdo para todo o projeto</h2>
        <p>
          Admin Web → Management API → banco de dados → sincronização do mobile.
        </p>
        <p className="muted">
          Depois, conteúdos educativos poderão ser armazenados no SQLite do
          aplicativo para consulta offline. CATS, IA, contas e confirmação de
          entregas são etapas futuras.
        </p>
      </section>
      {reset && (
        <ConfirmDialog
          title="Restaurar os dados demonstrativos?"
          confirmLabel="Restaurar dados"
          onClose={() => setReset(false)}
          onConfirm={() =>
            mutate(
              () => service.reset(),
              "Dados demonstrativos restaurados neste navegador.",
            )
          }
        >
          <p>
            Todas as alterações locais do Admin Web serão substituídas pelos 28
            exemplos originais. Esta ação não pode ser desfeita.
          </p>
        </ConfirmDialog>
      )}
    </>
  );
}
