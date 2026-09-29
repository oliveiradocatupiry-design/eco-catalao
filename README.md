# EcoCatalão — protótipo mobile v2

Aplicativo React Native + Expo Router para moradores da Comunidade Flutuante do Lago do Catalão. Esta versão substitui a classificação simulada e os saldos fictícios por registro manual, CATS indefinidos e quatro abas.

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
2. **Registro de Resíduo:** câmera real com permissão, galeria, prévia, seleção manual de material, quantidade e/ou peso, CATS ainda indefinidos e histórico da sessão. A barra usa Registro.
3. **Pontos de Coleta:** mapa nativo, pedido de localização em primeiro acesso, referência aproximada do lago, marcadores distintos, detalhes e lista de exemplos. Permissão negada ou GPS indisponível não impede consultar os pontos.
4. **Reciclagem:** cinco tipos, oito subtipos e oito ideias de reutilização, com informações gerais, impactos, separação, descarte, materiais necessários e passo a passo. Ilustrações locais dispensam download de imagens.

## Limites explícitos

- Não há login, backend, classificação automática, confiança de IA, cálculo de CATS, confirmação administrativa ou edição de pontos.
- Registros começam vazios e ficam em memória. Recarregar ou encerrar o processo reinicia o histórico. A foto permanece vinculada ao registro durante a sessão; arquivos nativos temporários ficam no cache administrado pelo sistema. Não há upload.
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
- `src/context/AppContext.tsx`: armazenamento em memória, substituível por persistência futura.
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
npx expo export --platform all --output-dir dist-v2
```

Evidências e roteiro de testes no aparelho em [docs/VALIDACAO_V2.md](docs/VALIDACAO_V2.md). O relatório `VALIDACAO.md` registra a versão anterior, não comprova esta atualização.

## Fontes técnicas e localização

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [Câmera](https://docs.expo.dev/versions/v57.0.0/sdk/camera/)
- [Localização](https://docs.expo.dev/versions/v57.0.0/sdk/location/)
- [Estudo do Lago Catalão: coordenada de referência CAT 1](https://www.researchgate.net/publication/282867471_FITOPLANCTON_DE_UM_LAGO_DE_INUNDACAO_AMAZONICO_LAGO_CATALAO_AMAZONAS_-_BRASIL_ESTRUTURA_DA_COMUNIDADE_FLUTUACOES_ESPACIAIS_E_TEMPORAIS). Não é a posição validada das casas nem um ponto de entrega.
