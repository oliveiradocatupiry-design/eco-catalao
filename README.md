# EcoCatalão mobile V2.1 — 2.1.0

Aplicativo React Native + Expo Router para moradores da Comunidade Flutuante do Lago do Catalão. A V2.1 acrescenta histórico persistente, fotos locais, edição, exclusão confirmada e filtro por material. Mantém registro manual, CATS indefinidos e quatro abas.

## Executar

O projeto usa Expo SDK 57 e Node.js 22.13 ou superior. Preserve o Expo Go compatível que já funcionou no aparelho do projeto em 21/09/2026.

```powershell
cd "C:\Users\Usuario\Documents\Eco Catalão\ecocatalao-mobile"
npm ci
npx expo start
```

Leia o QR Code no Expo Go, na mesma rede do computador. Nas próximas execuções, basta `npx expo start`. Se a rede local não funcionar, `npx expo start --tunnel` é uma alternativa que requer internet. Para navegador, `npm run web`.

## As quatro abas

1. **Comunidade do Catalão:** apresentação local, cuidados cotidianos e atalhos. A barra usa o rótulo curto Comunidade.
2. **Registro de Resíduo:** câmera real com permissão, galeria, prévia, seleção manual de material, quantidade e/ou peso, CATS ainda indefinidos e histórico local persistente com edição, exclusão confirmada e filtro por material. A barra usa Registro.
3. **Pontos de Coleta:** mapa nativo, pedido de localização em primeiro acesso, referência aproximada do lago, marcadores distintos, detalhes e lista de exemplos. Permissão negada ou GPS indisponível não impede consultar os pontos.
4. **Reciclagem:** cinco tipos, oito subtipos e oito ideias de reutilização, com informações gerais, impactos, separação, descarte, materiais necessários e passo a passo. Ilustrações locais dispensam download de imagens.

## Limites explícitos

- Não há login, backend, classificação automática, confiança de IA, cálculo de CATS, confirmação administrativa ou edição de pontos.
- Registros começam vazios e são persistidos localmente. No celular, SQLite guarda os dados e a pasta de documentos do EcoCatalão guarda cópias das fotos. Na web, IndexedDB guarda registros e imagens como data URLs, sem depender de URLs temporárias. Não há upload.
- O formulário aceita um ou ambos os campos: quantidade inteira positiva e peso positivo, inclusive com vírgula decimal. Foto é opcional.
- Pontos e contatos são mockados e sinalizados como exemplos sem recebimento real. Não há telefones inventados. A referência geográfica é do lago; a posição exata da comunidade precisa de levantamento e validação local.
- O mapa nativo usa a base cartográfica do sistema e precisa de conexão para carregar. A lista e os conteúdos são locais. No navegador, o mapa é um esquema ilustrativo explicitamente identificado; a validação do mapa geográfico deve ser feita no Expo Go.
- Permissão de câmera negada permite continuar pela galeria ou sem foto. Trocar de aba ou colocar o aplicativo em segundo plano fecha a câmera.
- Sem fotos reais da comunidade fornecidas com autorização, o banner usa uma ilustração conceitual. O conteúdo educativo inicial também precisa de revisão comunitária.
- As rotas antigas redirecionam ao registro/home para não expor a classificação e os saldos anteriores.

## Organização

- `src/app/(tabs)`: quatro áreas principais.
- `src/app/tipo`, `subtipo`, `reutilizacao`: trilha educativa.
- `src/components`: componentes visuais, seletor e mapas por plataforma.
- `src/data`: comunidade, materiais, tipos, subtipos, ideias e pontos editáveis.
- `src/types/registration.ts`: contrato do registro, incluindo foto e CATS nulo.
- `src/services/registrationService.ts`: validação e construção de registros, independente da interface.
- `src/context/AppContext.tsx`: carregamento, operações e estado coerente com gravações concluídas.
- `src/storage`: interface comum e implementações SQLite/arquivos nativos e IndexedDB/fotos web.
- `src/services/registrationRepository.ts`: operações, bloqueio de concorrência, ordenação, filtro e limpeza segura de cópias de fotos.
- `src/hooks/useUserLocation.ts`: permissão, localização e recuperação de falhas.

## Referência visual e escopo

A identidade foi adaptada do [Figma informado, nó 5:2](https://www.figma.com/design/a2yk5PxmyWGOWBwbqCtP4A/EcoCatalao?node-id=5-2): fundo creme, verde escuro, amarelo no destaque, símbolo e, cards brancos e navegação inferior branca. Os componentes são nativos e responsivos. O novo escopo exige quatro abas e conteúdo comunitário adicional, por isso o layout não é uma cópia literal da tela anterior de três abas.

A mensagem completa está em [docs/ESCOPO_V2.md](docs/ESCOPO_V2.md). Ela prevalece sobre a arquitetura anterior.

## Verificação

```powershell
npm run typecheck
npm run lint
npm test
npx expo install --check
npx expo-doctor@latest
npx expo export --platform all --output-dir dist
```

Evidências, resultados e roteiro físico pendente em [docs/VALIDACAO_V2_1.md](docs/VALIDACAO_V2_1.md). Os relatórios V2 e anteriores são históricos.

## Fontes técnicas e localização

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [Câmera](https://docs.expo.dev/versions/v57.0.0/sdk/camera/)
- [Localização](https://docs.expo.dev/versions/v57.0.0/sdk/location/)
- [Estudo do Lago Catalão: coordenada de referência CAT 1](https://www.researchgate.net/publication/282867471_FITOPLANCTON_DE_UM_LAGO_DE_INUNDACAO_AMAZONICO_LAGO_CATALAO_AMAZONAS_-_BRASIL_ESTRUTURA_DA_COMUNIDADE_FLUTUACOES_ESPACIAIS_E_TEMPORAIS). Não é a posição validada das casas nem um ponto de entrega.

## Registro na V2.1

Selecione o material, informe quantidade e/ou peso e, se desejar, escolha uma foto. Aguarde a confirmação de salvamento antes de fechar. Em Meus registros, use o filtro do catálogo, Editar ou Excluir. A edição usa o mesmo formulário; Cancelar mantém o registro e recupera o rascunho anterior. O identificador e a data original permanecem. CATS continua nulo e o status continua Aguardando entrega.

A gravação só indica sucesso após concluir. Erros preservam os campos; falhas ao abrir o histórico mostram Tentar novamente. Não existem registros de exemplo inseridos automaticamente.

### Persistência e limites por plataforma

- **Android/iOS:** SQLite com esquema 1 e consultas parametrizadas; fotos copiadas para a pasta ecocatalao-photos em Paths.document. O original da galeria nunca é apagado. Ao substituir/remover uma foto, a cópia anterior só é limpa depois da gravação, se não houver outro vínculo. A implementação foi exportada; o banco e o sistema de arquivos nativos ainda exigem teste em aparelho.
- **Navegador:** IndexedDB com esquema 1, dados e imagem juntos na transação. Recuperação, edição, exclusão, filtros e fotos foram conferidos na exportação web. O histórico pertence à origem (protocolo, endereço e porta) e ao perfil do navegador. Usar outra porta ou localhost em lugar de 127.0.0.1 abre outro armazenamento. Limpar dados, navegação privada, quotas e remoção pelo navegador podem impedir ou apagar a persistência. Evite editar em várias abas: não há atualização automática entre abas; recarregue para buscar alterações feitas em outra aba.
- Armazenamento local não é backup nem sincronização. Desinstalar ou limpar os dados pode remover tudo. A V2 não tinha histórico persistente para migrar.
- Operações não precisam de internet depois de o app estar carregado. A web não é uma PWA: abrir/recarregar a página exige que o servidor esteja disponível; não se promete reabertura offline. O mapa geográfico continua dependente de rede.
- Em falha de limpeza após uma gravação bem-sucedida, uma cópia de foto nativa pode ficar órfã. Prioriza-se conservar fotos vinculadas; não há varredura destrutiva de pastas. Fotos temporárias do formulário ficam sob gerenciamento do sistema/navegador.

A escolha de SQLite e a API de arquivos seguem a documentação do [SQLite SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/sqlite/) e [FileSystem SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/filesystem/). O SDK instalado foi mantido em 57.0.25.
