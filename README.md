# EcoCatalão

Protótipo mobile em português para educação ambiental, identificação simulada de materiais, Mercado Verde e CATS na Comunidade Flutuante do Lago do Catalão. Componentes nativos React Native, sem WebView.

## Executar

Requisitos: Node.js 22.13+ (LTS recomendado), npm e Expo Go compatível com **SDK 57**. Ambiente validado: Node 24.16.0 e npm 11.13.0.

```powershell
cd "C:\Users\Usuario\Documents\Eco Catalão\ecocatalao-mobile"
npm install
npx expo start
```

As dependências já estão instaladas. Nas próximas vezes basta `npx expo start`. Para reproduzir as versões do lockfile, use `npm ci`.

1. Conecte computador e celular à mesma rede Wi-Fi; mantenha o terminal aberto.
2. Android: leia o QR Code pelo Expo Go compatível.
3. iPhone: com um Expo Go compatível instalado, leia o QR Code pela Câmera e abra o link. Se solicitado, entre na mesma conta Expo na CLI e no aplicativo.
4. Autorize a câmera ou toque em **Usar ilustração de demonstração**.
5. Encerre o servidor com `Ctrl+C`.

O aparelho precisa permitir rede local e o firewall precisa permitir o servidor. O projeto não altera essas configurações automaticamente.

### Atenção: Expo Go no iPhone

Na documentação consultada em 21/09/2026, o Expo Go da **App Store permanece no SDK 54**. Este projeto usa o **SDK 57 atual**, conforme o requisito de não escolher versões antigas deliberadamente. O Expo Go comum da App Store **não é suficiente** para abrir este projeto.

O caminho oficial para iPhone físico é o Expo Go correspondente via TestFlight interno, preparado com `eas go`, ou um build de desenvolvimento. O caminho `eas go` exige associação ao Apple Developer Program e credenciais próprias. Nenhuma conta, credencial, infraestrutura em nuvem ou instalação no sistema foi criada nesta tarefa.

Se já possuir essas contas, consulte a documentação antes de preparar seu Expo Go:

```powershell
npx eas-cli@latest go --sdk-version 57.0.0
```

- [Incompatibilidade de versões do Expo Go](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/)
- [Instalação por plataforma e SDK](https://expo.dev/go)
- [Expo Go via EAS](https://expo.fyi/eas-go)

Android permite baixar o Expo Go compatível no site oficial. Segundo a [matriz do SDK 57](https://docs.expo.dev/versions/v57.0.0/), os mínimos são iOS 16.4 e Android 7.

### Apresentação no navegador

```powershell
npm run web
```

O mesmo projeto pode ser demonstrado no navegador: câmera com ilustração e mapa esquemático offline. Todos os passos conceituais continuam disponíveis enquanto o ambiente do iPhone é preparado. Isso não substitui o teste em aparelho real.

## Tecnologias e dependências

- Expo 57, React Native 0.86, React 19.2, TypeScript 6 e Expo Router.
- `expo-camera`: permissão, câmera traseira, captura e preview.
- `react-native-maps`: mapa nativo disponível no Expo Go.
- `expo-file-system`: limpeza das capturas temporárias.
- `@expo/vector-icons`: ícones locais, sem imagens externas.
- React Context: estado em memória.
- ESLint, Prettier, tsx e executor de testes do Node.

Dependências nativas instaladas com `npx expo install`. Reanimated/Worklets foram alinhados ao SDK por serem dependências transitivas da navegação. Versões exatas em `package-lock.json`.

## Telas e funcionalidades

- **Início:** câmera em destaque, resumo do Mercado Verde, carteira, educação, mapa e comunidade.
- **Mercado Verde:** registro manual ou pela câmera, filtros, remoção de pendentes com confirmação e estado vazio.
- **Câmera:** permissão, captura de um objeto, preview, refazer, análise simulada e fallback ilustrado.
- **Resultado:** imagem, nome, categoria, confiança explicitamente simulada, descarte, reutilização e explicação educativa.
- **Correção:** busca e seleção entre oito materiais, atualizando o resultado.
- **Adicionar material:** unidade por material, validação, estimativa antes do registro e sucesso.
- **Carteira:** estimados separados de confirmados, histórico e explicações.
- **Aprender:** cinco conteúdos completos, busca, categorias e páginas de detalhes.
- **Mapa:** dois pontos fictícios selecionáveis, horários e materiais aceitos; esquema offline e opção nativa.
- **Comunidade:** apresentação ilustrada, sem fotografias atribuídas a moradores.

## Roteiro da apresentação

1. Início → Tirar uma foto.
2. Capture um objeto ou use a ilustração. Escolha o cenário que controla o resultado, sem aleatoriedade.
3. Analise (aproximadamente 850 ms), confirme ou corrija a identificação.
4. Adicione ao Mercado Verde: 50 latas = 20 CATS demonstrativos; 4,5 kg de papelão = 9 CATS demonstrativos.
5. Registre. O material fica aguardando entrega, aumentando apenas os estimados.
6. Abra a carteira e confira a separação dos saldos.

Estado inicial: 4 kg de papelão pendentes (8 estimados), 50 latas com entrega fictícia confirmada (20 confirmados). Registrar mais 4,5 kg de papelão resulta em **17 estimados e 20 confirmados**. Recarregar o app reinicia os exemplos. Não há botão para o usuário confirmar uma entrega administrativa.

## Estrutura

```text
src/
  app/               Rotas de abas e telas em stack
    (tabs)/          Início, Mercado Verde, câmera, Aprender e mapa
  components/        Botões, cards, estados, seletores, ilustrações e mapas
  constants/         Tema: cores, espaços, tipografia e raios
  context/           Estado da sessão e operações de registro
  data/              Materiais, educação, pontos e taxas mockadas
  services/          Classificação simulada e regras de quantidade/CATS
  types/             Interfaces de domínio
assets/images/       Ícone original
 tests/              Testes das regras de domínio
 docs/               Relatório de validação
```

A futura API pode substituir o contrato de classificação e as fontes de dados sem mover taxas ou unidades para as telas. A confirmação administrativa deve permanecer separada do registro do usuário.

## Mocks e limites

- **IA:** não existe inferência. O seletor determina o resultado. Os 94% de confiança são fictícios; após correção, aparece a indicação de escolha manual.
- **CATS:** taxas arbitrárias em `src/data/cats.ts`; não são oficiais, monetárias ou resgatáveis. Entregas confirmadas iniciais são fictícias.
- **Fotos:** não são enviadas, gravadas na galeria ou vinculadas ao histórico/dataset. O Expo usa cache temporário. O código tenta excluir a captura ao refazer, registrar ou abandonar o fluxo. Encerramento forçado pode impedir a limpeza imediata; o cache fica sob gestão do sistema operacional.
- **Mapa:** coordenadas sintéticas próximas a 0,0, sem atribuição ao Catalão. Não solicita geolocalização nem oferece rotas. O esquema ilustrativo funciona offline. Builds próprios com Google Maps podem exigir chave; no Expo Go não há configuração extra.
- **Estado:** fica somente em memória. Dados e ícones são locais; o carregamento pelo Metro depende da conexão com o computador.
- **Conteúdo:** textos iniciais sujeitos à revisão comunitária. Locais, horários, taxas e aceitação real aguardam validação.
- Não há backend, banco, login, painel administrativo, pagamentos, notificações, chatbot, API de IA ou treinamento.

## Verificações

```powershell
npm run typecheck
npm run lint
npm test
npx expo install --check
npx expo-doctor@latest
npx expo export --platform all
```

TypeScript/lint aprovados, quatro testes passando, Expo Doctor 21/21, bundles Android/iOS/web gerados. O fluxo foi percorrido no navegador em largura de celular. Detalhes em [docs/VALIDACAO.md](docs/VALIDACAO.md).

O npm reportou 14 alertas moderados transitivos (`uuid`/`xcode` e `decode-uri-component`/`query-string`), sem altos ou críticos na consulta. Não foi aplicado `npm audit fix --force`: as sugestões incluem regressões incompatíveis de Expo/Router. Reavaliar com futuras atualizações do SDK.
