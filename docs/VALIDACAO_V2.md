# Validação do EcoCatalão v2 — 28/09/2026

## Escopo revisado

Implementação da mensagem completa salva em `ESCOPO_V2.md`, no projeto mobile existente. O novo escopo prevalece sobre a versão anterior: Comunidade do Catalão, Registro de Resíduo, Pontos de Coleta e Reciclagem. Câmera e CATS pertencem ao registro.

A referência Figma foi consultada diretamente no arquivo `a2yk5PxmyWGOWBwbqCtP4A`, nó `5:2`, incluindo código de referência e captura. Foram adaptados o fundo creme, verde escuro, destaque amarelo, símbolo e, hierarquia da home, cards claros e barra inferior branca. O fluxo e as quatro abas seguem os requisitos novos. A fonte usa a tipografia do sistema; não se declara equivalência pixel a pixel.

## Verificações executadas

- TypeScript: aprovado.
- ESLint: aprovado.
- Cinco testes de domínio: aprovados. Cobrem registro com foto e peso decimal brasileiro, quantidade/peso opcionais individualmente, valores inválidos, CATS nulo e integridade das trilhas educativas e pontos.
- Compatibilidade Expo: dependências alinhadas ao SDK 57; `expo install --check` retornou `Dependencies are up to date`.
- Exportação Android, iOS e web: aprovada. São pacotes JavaScript/Hermes, não APK/IPA instalados ou publicados.
- Interface conferida no navegador, incluindo tamanho de celular 390 × 844.
- Navegação entre as quatro abas conferida.
- Salvamento de Garrafa PET com 5 unidades e 1,5 kg conferido no histórico, com data, status Aguardando entrega e CATS indisponível.
- Seleção de material em modal e validação de formulário sem material conferidas.
- Fluxo Reciclagem → Plástico → Garrafa PET → informações/impacto/separação/descarte → vaso PET → materiais e passos → retorno conferido.
- Seleção do ponto demonstrativo 2 pela lista atualiza o painel de detalhes. A lista continua utilizável enquanto o pedido de localização está pendente.
- Rotas anteriores foram transformadas em redirecionamentos. Serviço de classificação e tabela de CATS fictícios removidos.

## Testes que dependem do aparelho

Não houve acesso a um celular nesta execução. A integração de câmera, galeria, localização e mapa nativo foi implementada e compilada, mas não se declara teste físico concluído.

1. No Expo Go compatível com SDK 57, abrir Registro → Abrir câmera → autorizar → Tirar foto. Conferir a prévia, selecionar material, informar quantidade/peso e salvar. Confirmar a miniatura no histórico após trocar de aba e voltar.
2. Repetir com imagem da galeria. Cancelar o seletor e confirmar que o formulário continua acessível. Testar tirar outra foto e remover a foto.
3. Negar a câmera e verificar a mensagem e a possibilidade de registrar sem foto. Se bloqueada permanentemente, testar o acesso às configurações do aparelho.
4. Abrir Pontos de Coleta e autorizar localização. Conferir os marcadores distintos e os botões para ver a própria localização e a região do Catalão.
5. Negar localização, desativar GPS e testar novamente. A lista e os detalhes devem continuar disponíveis, sem mostrar uma localização antiga como atual.
6. Tocar nos marcadores e usar Ver no mapa na lista. Conferir a seleção e o deslocamento do mapa nativo.
7. Trocar de aba ou colocar o aplicativo em segundo plano com a câmera aberta. Ela deve fechar.
8. Recarregar o app: o histórico deve voltar vazio, conforme o aviso de armazenamento em memória.

## Dados a validar com o projeto

- Posição exata da comunidade e pontos reais, endereços, telefones, horários e materiais recebidos.
- Tabela CATS: indefinida e não calculada.
- Lista de materiais e revisão dos conteúdos com a comunidade.
- Fotografias reais autorizadas. Nesta versão, o banner e as ideias usam ilustrações locais.

A referência cartográfica está no Lago Catalão, aproximadamente em -3.16144, -59.91506, baseada no ponto de pesquisa CAT 1 citado no README. Não é uma localização oficial da comunidade nem de entrega. Os dois pontos de coleta são explicitamente demonstrativos.

## Limitações operacionais

Registros ficam na memória da sessão. Fotos permanecem no cache temporário nativo ou na memória do navegador; não são enviadas. Não há sincronização nem garantia de persistência após encerrar/recarregar. Conteúdos são locais, mas o mapa geográfico precisa de rede. A prévia web usa esquema ilustrativo, não substitui o mapa nativo.

O ambiente usou a versão alternativa do React Native DevTools por falha no download da versão mais recente. Isso não impediu o servidor, a navegação ou a exportação. A instalação reportou 15 avisos moderados de dependências transitivas; não foi aplicada correção forçada que alterasse a compatibilidade do SDK.
