# Validação EcoCatalão V2.1 — 2.1.0

Execução iniciada em 30/09/2026 e concluída em 01/10/2026 (America/Manaus).

## Cópia trabalhada

Projeto: C:\Users\Usuario\Documents\Eco Catalão\ecocatalao-mobile. Branch main, commit de base 22401c0f71eb94d84e1892b8e2044d30c7a3db0d. A consulta git ls-remote confirmou esse mesmo commit na main do GitHub durante esta execução. Foram preservadas as alterações locais preexistentes em app.json (permissões/EAS), eas.json, eslint.config.js, tsconfig.json e ecocatalao-admin. Nenhum push, PR, publicação, serviço externo ou atualização de SDK foi realizado.

AGENTS.md exige documentação exata do SDK; foram consultados SDK 57, SQLite 57 e FileSystem 57. Expo instalado: 57.0.25, mantido. Adicionados expo-sqlite ~57.0.3 e expo-crypto ~57.0.3 pelo instalador do Expo. fake-indexeddb é somente uma dependência de desenvolvimento para testes.

## Funcionalidades entregues

- Histórico vazio inicialmente, sem exemplos inseridos automaticamente.
- Registro com material do catálogo, quantidade inteira positiva e/ou peso positivo até 100.000, vírgula decimal e foto opcional. UUID independente da sessão.
- Confirmação e limpeza do formulário somente após gravar. Falhas conservam os valores para nova tentativa.
- Recuperação inicial com carregamento, erro separado de vazio e Tentar novamente.
- Edição no formulário compartilhado: material, quantidade, peso e foto. Cancelar conserva o registro e restaura o rascunho de cadastro anterior. Salvar preserva UUID/data/status e CATS nulo.
- Exclusão com modal Cancelar/Excluir e mensagem após conclusão.
- Filtro pelos identificadores/nomes do catálogo, Todos os materiais inicial, ordem decrescente de criação e estados vazios distintos. Edição de material atualiza o filtro ativo.
- Bloqueio de ações durante operações, incluindo câmera/galeria; nenhum detalhe técnico exposto ao morador.
- Foto que não carrega mostra Foto indisponível, mantendo o restante legível.
- Quatro áreas e identidade visual preservadas. Na comunidade, apenas o texto da contagem passou de sessão para histórico.

## Armazenamento e fotos

**Android/iOS:** banco ecocatalao.db, tabela registrations com chave primária e payload preservando o contrato. Inicialização única, transação de esquema inicial com PRAGMA user_version = 1; versões futuras incompatíveis geram erro, sem apagar dados. INSERT, UPDATE e DELETE parametrizados. Fotos novas são copiadas para ecocatalao-photos em Paths.document com nome UUID. Originais e arquivos fora dessa pasta nunca são excluídos. Cópia anterior permanece até o commit da edição; limpeza verifica todos os vínculos no armazenamento. Uma cópia nova pode ser removida após falha de gravação, sem apagar a fonte do formulário.

**Web:** IndexedDB ecocatalao-v2, versão 1, object store registrations. Transações só resolvem em oncomplete; registro e data URL da foto são gravados juntos. URLs blob da seleção são convertidas antes de persistir. Nenhuma foto é enviada ou baixada de serviço externo. Edição de registro já apagado em outra aba falha em vez de recriá-lo. Falhas de quota/leitura/escrita são apresentadas sem sucesso falso. Não há sincronização automática entre abas.

Armazenamento local não é backup. Desinstalar, limpar dados, usar outro perfil/origem ou navegar em modo privado pode remover ou separar o histórico. A origem web inclui protocolo, endereço e porta. Falha na limpeza de foto após commit conserva a operação concluída e pode deixar cópia nativa órfã; não se remove arquivo vinculado por tentativa de recuperação. Cache temporário do formulário fica sob gerenciamento do SO/navegador.

## Verificações

| Verificação | Resultado |
| --- | --- |
| npm run typecheck | Aprovado |
| npm run lint | Aprovado |
| npm test | 15/15 aprovados |
| npx expo export --platform all --output-dir dist | Android, iOS e web exportados |
| npx expo install --check | Aponta 4 patches disponíveis em dependências preexistentes |
| npx expo-doctor@latest | 20/21; única falha é a mesma divergência de patches |
| git diff --check | Sem erros de whitespace |

Patches apontados: expo 57.0.25 → esperado ~57.0.26; expo-camera 57.0.5 → ~57.0.6; expo-constants 57.0.19 → ~57.0.20; expo-router 57.0.23 → ~57.0.24. Mantidos para respeitar o pedido de não atualizar SDK nesta tarefa; nenhuma exclusão foi adicionada para ocultar a verificação.

Os 15 testes abrangem as cinco verificações de domínio anteriores, o adaptador IndexedDB executado com fake-indexeddb, recuperação em outra instância de repositório, edição sem duplicação e preservação de identidade/data, exclusão, ordenação/filtro, falha de gravação com nova tentativa, falha de cópia/leitura/exclusão, fotos compartilhadas, limpeza após commit, operações concorrentes, restrição de caminhos e dados armazenados inválidos. Não equivalem a testes do SQLite/FileSystem/câmera nativos.

A instalação reportou 15 vulnerabilidades moderadas. Não foi feita correção forçada ou mudança de dependências fora do escopo. O servidor de desenvolvimento usou DevTools alternativo por falha no download do auxiliar; a exportação estática foi utilizada para a validação funcional.

## Verificação funcional web executada

Exportação servida somente na máquina local, em http://127.0.0.1:8082. Conferências pela interface, sem inserir dados diretamente no banco:

1. Histórico vazio e navegação com quatro áreas.
2. PET com 5 unidades e 1,5 kg; alumínio com 2 unidades.
3. Recarregar após a confirmação: ambos recuperados, ordem mais recente primeiro.
4. Editar PET para 3 unidades, recarregar e conferir a data original e único registro.
5. Filtrar PET e voltar a Todos os materiais.
6. Cancelar exclusão: registro permanece. Confirmar, aguardar mensagem, recarregar: registro removido.
7. Registrar PET com imagem local de teste; recarregar: imagem completa com data URL e largura original 1024, sem URL temporária.
8. Substituir por outra imagem local, salvar e recarregar: nova imagem completa com largura 100.
9. Remover foto e cancelar edição: miniatura original permanece. Remover e salvar: após recarregar, nenhuma foto vinculada.
10. Editar material de PET para alumínio com filtro PET ativo: sai da lista e mostra Você ainda não registrou esse material. Todos os materiais recupera os registros.
11. Cadastro vazio mostra Selecione um material da lista. Regras numéricas inválidas também verificadas nos testes automatizados.
12. Comunidade, Pontos de Coleta e Reciclagem continuam navegáveis. Avisos de pontos demonstrativos e CATS indefinidos mantidos.
13. Todos os registros temporários desse roteiro foram removidos pela interface. Nenhum exemplo foi adicionado como dado inicial do aplicativo.

As imagens de teste são arquivos gráficos do projeto, não fotos de moradores ou evidência de classificação. Não houve acesso a aparelho físico.

Layout final conferido em 390 × 844, sem registros de teste restantes. [Captura do histórico vazio e filtro](v2-1-registro-web.jpg). Essa captura mostra interface web, não execução nativa.

## Roteiro físico pendente (Android e iOS)

- [ ] Abrir com histórico vazio; confirmar carregamento sem vazio transitório.
- [ ] Registrar PET com 5 unidades/1,5 kg e alumínio apenas com quantidade.
- [ ] Encerrar e abrir novamente; conferir dados, UUID/data e ordem.
- [ ] Editar PET de 5 para 3 unidades; encerrar e reabrir.
- [ ] Filtrar PET e voltar a Todos os materiais; editar material sob filtro ativo.
- [ ] Cancelar exclusão; confirmar permanência. Confirmar exclusão e reabrir.
- [ ] Tirar foto com câmera real; salvar, encerrar e reabrir. Repetir com galeria.
- [ ] Substituir e remover foto; testar cancelamento e conferir que o original da galeria permanece.
- [ ] Testar foto ausente/inacessível e conferir Foto indisponível com dados legíveis.
- [ ] Repetir salvar, recuperar, editar, excluir e filtrar em modo avião com aplicativo já instalado/carregado; conferir fotos offline.
- [ ] Verificar negação de permissões, ida para segundo plano, teclado e campos inválidos.
- [ ] Conferir falhas reais de armazenamento/arquivos e recuperação por Tentar novamente, quando reproduzíveis.
- [ ] Navegar pelas outras três áreas, conferir mapa nativo/localização e acessibilidade.

## Limites

A exportação gera bundles e páginas, não APK/IPA instalado. SQLite e cópias nativas foram implementados, tipados e empacotados, mas não executados em aparelho nesta sessão. Modo avião físico não foi testado. Na web, dados e fotos são locais; a página não tem service worker/PWA e abrir ou recarregar exige servidor disponível. Depois de carregada, as operações de registro não utilizam serviços externos. Mapa geográfico depende de conexão.

Continuam fora do escopo backend, autenticação, backup/sincronização, IA, cálculo de CATS, entrega confirmada, saldo/resgate/transações e pontos oficiais.
