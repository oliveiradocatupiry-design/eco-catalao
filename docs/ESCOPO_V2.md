Perfeito — abaixo está um **prompt completo, detalhado e expandido**, já consolidando tudo o que decidimos até agora. Ele está escrito para você usar como base na criação do **próximo protótipo do EcoCatalão**, com foco em **React Native + Expo + Expo Router**, mantendo o **visual do Figma** e respeitando a realidade atual do projeto.

---

# PROMPT COMPLETO DO PRÓXIMO PROTÓTIPO DO ECOCATALÃO

Crie a **segunda versão do protótipo mobile do aplicativo EcoCatalão** em **React Native com Expo**, utilizando **Expo Router**, com código organizado, componentes reutilizáveis, navegação funcional e visual fiel ao protótipo anteriormente criado no **Figma**.

O objetivo é construir um **protótipo funcional e visualmente consistente**, pronto para rodar localmente no **Expo Go**, mantendo o estilo visual acolhedor já definido no Figma e incorporando as decisões mais recentes do projeto.

---

## 1. CONTEXTO GERAL DO PROJETO

O **EcoCatalão** é um aplicativo voltado à **Comunidade Flutuante do Lago do Catalão**, no Amazonas. O aplicativo não deve ser tratado como um app turístico. Ele deve ser pensado principalmente para o **morador da comunidade**, com foco em **usabilidade simples, acessibilidade, linguagem clara, organização visual limpa e adaptação a contextos de conectividade limitada**.

O app tem como objetivo apoiar os moradores em atividades relacionadas a:

- educação ambiental;
- separação e descarte correto de resíduos;
- consulta de conteúdos educativos e de reciclagem;
- visualização de pontos de coleta;
- registro de resíduos que pretendem ser entregues;
- futura contabilização de moedas **CATS**;
- integração futura com visão computacional para classificação de resíduos por imagem.

### MUITO IMPORTANTE
Nesta versão do protótipo:

- **não implementar backend real**;
- **não implementar login**;
- **não integrar a rede neural / visão computacional ainda**;
- **não simular falsamente uma IA funcionando**;
- **não criar fluxos administrativos dentro do app do morador**;
- **não transformar a tela da comunidade em um conteúdo turístico**.

O foco é:

1. manter a identidade visual do Figma;
2. organizar bem a navegação;
3. estruturar o app para evolução futura;
4. deixar a câmera funcional;
5. deixar o registro de resíduos preparado;
6. deixar o mapa/pontos de coleta implementados de forma forte;
7. deixar a área educativa robusta;
8. deixar o protótipo pronto para futura integração com backend, IA e sistema administrativo.

---

## 2. DIREÇÃO VISUAL — MANTER FIDELIDADE AO FIGMA

Quero que o visual seja **fiel ao protótipo já criado no Figma**. Priorize ser fiel ao visual definido anteriormente, mesmo que isso signifique ser menos “inventivo” em algumas escolhas estéticas.

### Estilo visual obrigatório
- visual limpo;
- fundo claro;
- verde como cor principal;
- cards arredondados;
- botões com destaque claro;
- tipografia simples;
- interface acolhedora;
- aparência moderna, mas simples;
- leitura fácil;
- boa hierarquia visual;
- boa organização de espaçamento;
- sensação de aplicativo comunitário, educativo e acessível.

### A interface deve transmitir:
- proximidade com o morador;
- simplicidade;
- confiança;
- utilidade prática;
- identidade local;
- acolhimento;
- funcionalidade.

### Referências visuais
1. **Referência principal:** o protótipo do Figma já criado anteriormente.
2. **Referência secundária:** o conceito visual ligado à comunidade do Catalão e ao site Catalão Sustentável, principalmente em elementos como:
   - imagens da comunidade;
   - casas flutuantes;
   - rio;
   - navegação local;
   - modo de vida ribeirinho;
   - elementos do território.

### Mas atenção:
- **não transformar o app em app de turismo**;
- a comunidade deve ser apresentada como **lugar de vida**, não como “atração”;
- o foco visual continua sendo utilidade para o morador.

---

## 3. TECNOLOGIA E ESTRUTURA GERAL

Crie o projeto com:

- **React Native**
- **Expo**
- **Expo Router**
- componentes reutilizáveis
- dados mockados
- navegação funcional
- estrutura organizada em pastas
- código limpo e fácil de editar
- nomes claros
- boa separação entre telas, componentes e dados

### Desejo uma estrutura preparada para crescer depois para:
- backend real;
- autenticação;
- integração com IA;
- persistência local/offline;
- sincronização;
- website administrativo.

---

## 4. NAVEGAÇÃO PRINCIPAL — CONFIRMADA EM 4 ABAS

O aplicativo deve trabalhar com **4 abas principais**, e essa estrutura deve ser respeitada:

1. **Comunidade do Catalão**
2. **Registro de Resíduo**
3. **Pontos de Coleta**
4. **Reciclagem**

Essas devem ser as **abas principais do app**.

### Importante
- A **câmera não será uma aba separada**.
- Ela ficará dentro da aba **Registro de Resíduo**.
- A área de **CATS não será uma aba separada**.
- Ela ficará integrada à aba **Registro de Resíduo**, como parte do fluxo de registros.

---

# 5. TELAS E FUNCIONALIDADES DETALHADAS

---

## ABA 1 — COMUNIDADE DO CATALÃO

Esta deve funcionar como **tela inicial/home** do app.

### Objetivo
Apresentar o EcoCatalão e a comunidade de forma acolhedora, clara e útil.

### Conteúdo esperado
- Logo EcoCatalão
- subtítulo pequeno com algo como:
  - “Comunidade Flutuante Lago do Catalão”
- título principal forte, por exemplo:
  - “Cuidar do rio começa em casa.”
- texto de apoio explicando a proposta do app
- imagem ou banner ligado à comunidade
- cards resumidos com temas da comunidade
- atalhos para as demais áreas do app
- linguagem simples e acolhedora

### Essa tela deve transmitir:
- pertencimento;
- realidade local;
- propósito ambiental;
- identidade comunitária.

### Inserir uma breve apresentação da comunidade
Exemplo de temas que podem aparecer:
- casas flutuantes;
- relação com o rio;
- cotidiano da comunidade;
- importância do descarte correto;
- fortalecimento de práticas sustentáveis locais.

### Cards temáticos sugeridos
- Casas flutuantes
- Navegação
- Modo de vida local
- Cuidado com o rio

### Atalhos ou CTAs na home
Pode ter botões/cards de acesso rápido como:
- Registrar resíduo
- Ver pontos de coleta
- Aprender sobre reciclagem

### Observações importantes
- Não fazer uma tela meramente decorativa.
- Ela precisa funcionar como início real do aplicativo.
- Pode ter um pequeno resumo explicando o propósito do EcoCatalão.
- O foco não é “visitar a comunidade”, e sim **servir a comunidade**.

---

## ABA 2 — REGISTRO DE RESÍDUO

Esta será uma das abas mais importantes do app.

Ela deve concentrar:
- acesso à câmera;
- captura de foto;
- pré-visualização da foto;
- seleção manual do material;
- quantidade/peso;
- registro salvo;
- histórico de registros;
- área de CATS.

### MUITO IMPORTANTE SOBRE A IA
Nesta fase:
- **não simular classificação automática de resíduo**;
- **não mostrar confiança da IA**;
- **não fingir que a rede neural está pronta**.

A câmera deve existir de forma real, mas o fluxo será manual após a captura.

---

### ESTRUTURA DA ABA REGISTRO DE RESÍDUO

#### 2.1 Cabeçalho
- título: “Registro de Resíduo”
- subtítulo curto explicando a função da tela

Exemplo:
“Fotografe e registre os materiais que você pretende entregar.”

---

### 2.2 Área da câmera
A câmera deve ser o grande destaque da aba.

#### Deve conter:
- área visual clara para câmera
- botão para abrir a câmera
- botão para tirar foto
- botão para escolher imagem da galeria
- pré-visualização da imagem capturada

### Comportamento esperado
1. usuário abre a câmera;
2. tira uma foto;
3. app exibe a foto capturada;
4. usuário avança para preenchimento manual do registro.

### Observações
- pode haver um aviso curto explicando que a classificação automática será integrada futuramente;
- o fluxo atual é manual, não automático.

Exemplo de texto curto:
“Nesta versão, o material será registrado manualmente após a foto.”

---

### 2.3 Seleção do material
Não usar campo livre aberto para o usuário digitar qualquer coisa.

Em vez disso:
- criar uma **lista mockada de materiais previamente cadastrados**
- a lista deve ser simples e fácil de editar depois

### Importante
Esses materiais são provisórios e servem para estrutura do protótipo.
Deixe os dados organizados em um arquivo de mock para serem facilmente alterados depois.

### Exemplo de comportamento
Após tirar a foto, o usuário escolhe um material em uma lista como:
- Lata de alumínio
- Garrafa PET
- Papelão
- Vidro
- Plástico rígido

Esses são apenas exemplos estruturais.
A lista deve ser facilmente editável futuramente.

### Interface
- dropdown, select, modal de seleção ou cards de escolha
- escolha visualmente simples e intuitiva

---

### 2.4 Quantidade e peso
Permitir que o usuário registre manualmente:
- quantidade
- ou peso

A interface deve deixar isso claro.

### Exemplo de abordagem
Campos:
- Material
- Quantidade
- Peso

O usuário pode preencher um ou outro dependendo do tipo de material.

### Não precisa implementar regra complexa ainda
Não é necessário nesta fase:
- detectar automaticamente se um material deve ser por unidade ou por peso;
- bloquear fortemente o preenchimento.

Mas a estrutura já deve estar pronta para isso futuramente.

---

### 2.5 CATS
Dentro da aba Registro de Resíduo, criar uma área ou card chamado:

## CATS

Não criar aba própria para isso.

### O que mostrar nesta fase
- um card simples de CATS
- informação de que os valores ainda serão definidos futuramente
- manter a estrutura visual da funcionalidade

Exemplo:
**CATS**
“Os valores em CATS serão definidos conforme a tabela do projeto.”

ou

**CATS estimados**
“Valor ainda não disponível.”

### Não inventar números.
### Não criar tabela falsa.
### Não simular sistema de pontuação completo se ele ainda não está definido.

---

### 2.6 Botão de salvar registro
O usuário deve poder salvar o registro manualmente.

Botão:
- “Salvar registro”

Ao salvar:
- inserir no histórico mockado/local em memória ou dados locais do protótipo
- atualizar a lista exibida na própria aba

---

### 2.7 Histórico de registros
Ainda dentro da aba Registro de Resíduo, mostrar uma seção de histórico.

### Título sugerido
- “Meus registros”
ou
- “Histórico de registros”

### Cada item do histórico deve mostrar:
- foto (se houver)
- material
- quantidade e/ou peso
- data
- CATS (valor indefinido, se necessário)
- status

### Status
Como ainda não existe backend nem validação administrativa real, usar algo simples como:
- “Registrado”
- “Aguardando entrega”

Evitar fluxos excessivamente complexos nesta etapa.

### Objetivo
Mostrar que o app já está preparado para:
- registrar;
- listar;
- acompanhar resíduos.

---

### 2.8 Estrutura futura (sem implementar por completo)
O código deve ser organizado para no futuro permitir:
- classificação por IA;
- correção do resultado da IA;
- confirmação administrativa da entrega;
- cálculo real de CATS;
- persistência real;
- sincronização com backend.

---

## ABA 3 — PONTOS DE COLETA

Esta é uma funcionalidade **obrigatória e central** do projeto.

Deve ser implementada com bastante atenção.

### Objetivo
Permitir que o morador visualize:
- sua localização atual;
- a Comunidade do Catalão;
- os pontos de coleta.

---

### 3.1 Estrutura da tela
- título: “Pontos de Coleta”
- subtítulo curto
- mapa como destaque principal
- lista resumida de pontos abaixo do mapa

---

### 3.2 Permissão de localização
Ao entrar na tela:
- solicitar permissão de localização do usuário
- se o usuário permitir, mostrar sua localização atual no mapa
- se o usuário negar, ainda mostrar mapa com Catalão + pontos de coleta definidos

### Isso é importante
A UX precisa ser amigável.
Se a permissão for negada, o aplicativo não deve quebrar.

Mostrar algo como:
“Não foi possível acessar sua localização. Você ainda pode visualizar os pontos de coleta.”

---

### 3.3 Mapa
Implementar mapa com:
- localização atual do usuário
- localização fixa da Comunidade do Catalão
- pontos de coleta previamente definidos

### Atenção
Nesta fase:
- os pontos de coleta devem estar **pré-definidos em dados mockados**
- **não permitir adicionar ou editar pontos pelo usuário**
- **não permitir alteração dos pontos no app**

---

### 3.4 Marcadores do mapa
Usar marcadores visualmente diferentes para:
- usuário
- Comunidade do Catalão
- ponto de coleta

### Isso deve ficar muito claro
O usuário deve bater o olho e entender a diferença entre:
- “onde eu estou”
- “onde fica a comunidade”
- “onde estão os pontos”

---

### 3.5 Detalhes do ponto
Ao tocar em um ponto de coleta, mostrar informações básicas.

### Exibir:
- nome do ponto
- endereço
- telefone
- pequena descrição, se desejar
- imagem representativa, se houver

### O visual pode ser:
- card flutuante
- modal
- painel inferior
- pequeno overlay

A apresentação deve ser simples e funcional.

---

### 3.6 Lista abaixo do mapa
Além do mapa, mostrar também uma lista de pontos.

Isso é importante porque:
- ajuda se o mapa demorar a carregar;
- melhora a acessibilidade;
- deixa a informação mais prática.

### Cada item da lista
- nome
- endereço
- telefone
- botão “Ver no mapa” ou destaque do ponto

---

### 3.7 Dados mockados
Criar um arquivo de pontos de coleta mockados com:
- id
- nome
- endereço
- telefone
- latitude
- longitude
- imagem (opcional)

---

## ABA 4 — RECICLAGEM

Essa será a aba de **conteúdo educacional** do app.

Ela deve ser bem estruturada, fácil de navegar e coerente com o projeto.

### Objetivo
Disponibilizar conteúdo educativo sobre:
- resíduos;
- separação correta;
- descarte;
- impacto ambiental;
- reutilização;
- conscientização.

---

### 4.1 Estrutura geral da aba
- título: “Reciclagem”
- subtítulo simples
- cards/seções navegáveis
- linguagem clara em português do Brasil
- visual consistente com o Figma

---

### 4.2 Conteúdos que devem existir
A aba deve ser estruturada para incluir:

#### Seções principais
- Tipos de resíduos
- Subtipos de resíduos
- Informações gerais
- Impactos ambientais
- Como separar
- Como descartar
- Ideias de reutilização

---

### 4.3 Fluxo de navegação educativa
Organizar o conteúdo de forma encadeada, não isolada.

Exemplo de fluxo:
**Tipo de resíduo → Subtipo → Informações → Impacto ambiental → Como separar → Como descartar → Ideias de reutilização**

### Isso é importante
Quero que a aba pareça uma área de aprendizado coerente, e não apenas várias páginas soltas.

---

### 4.4 Tipos de resíduos
Criar cards iniciais para alguns tipos ou grupos de materiais.

O conteúdo pode ser mockado.
A lista deve ser simples e fácil de editar depois.

Cada card pode ter:
- nome
- ícone
- cor associada
- pequena descrição

---

### 4.5 Subtipos
Ao entrar em um tipo, mostrar subtipos relacionados.

Cada subtipo pode conter:
- nome
- imagem ilustrativa
- informações gerais
- impacto ambiental

---

### 4.6 Ideias de reutilização
Para cada subtipo, mostrar também ideias de reutilização.

### Cada ideia deve ter:
- título
- imagem
- lista de materiais necessários
- passo a passo
- descrição simples

### Exemplo
“Garrafa PET como vaso”
- imagem
- materiais
- passos

---

### 4.7 Organização do conteúdo
Os dados devem ficar em arquivos mockados separados, por exemplo:
- tipos de resíduos
- subtipos
- ideias de reutilização

---

## 6. COMPORTAMENTO OFFLINE / PREPARAÇÃO PARA O FUTURO

Mesmo sem backend real, deixe o projeto organizado para futura evolução em direção a:
- armazenamento local;
- funcionamento offline;
- sincronização futura.

### Nesta versão
Não precisa implementar sincronização real.

Mas pode haver estrutura visual mínima indicando que:
- o conteúdo é carregado localmente;
- futuramente poderá ser sincronizado.

Se fizer sentido, pode existir um pequeno texto em alguma área, por exemplo:
“Conteúdos disponíveis nesta versão do protótipo.”

Sem exagerar.
Sem inventar backend.

---

## 7. O QUE NÃO DEVE SER FEITO NESTE PROTÓTIPO

### Não fazer agora:
- login
- cadastro real
- backend
- consumo de API real
- painel administrativo
- autenticação
- rede neural integrada
- classificação automática falsa
- cálculo real de CATS sem tabela definida
- edição de pontos de coleta pelo usuário
- fluxo administrativo dentro do app do morador

---

## 8. ESTRUTURA DE DADOS MOCKADOS

Organize dados mockados e deixe fácil de editar.

### Sugestão de dados principais
- community content
- waste types
- waste subtypes
- reuse ideas
- collection points
- registered wastes

### Exemplo conceitual de entidades
- TipoDeResiduo
- SubtipoDeResiduo
- IdeiaDeReutilizacao
- PontoDeColeta
- RegistroDeResiduo

### RegistroDeResiduo pode conter
- id
- material
- quantidade
- peso
- data
- imagem
- status
- cats

---

## 9. ESTRUTURA DE PASTAS

Organize o projeto com boa separação, por exemplo:

- `app/`
- `components/`
- `data/`
- `types/`
- `constants/`
- `assets/`
- `hooks/`

### Em `app/`
Separar as telas por rota com Expo Router.

### Em `components/`
Criar componentes reutilizáveis como:
- cards
- botões
- headers
- listas
- inputs
- cards de ponto de coleta
- cards de resíduos
- cards de reutilização
- cards da comunidade

---

## 10. PADRÕES DE UI/UX

### Quero:
- interface clara;
- poucos excessos visuais;
- legibilidade;
- boa responsividade;
- toque amigável;
- ícones compreensíveis;
- organização simples.

### Linguagem
- sempre em português do Brasil
- textos claros
- mensagens curtas
- interface acessível

### Acessibilidade visual
- contraste adequado
- botões reconhecíveis
- ícones claros
- boa hierarquia

---

## 11. FLUXOS IMPORTANTES A GARANTIR

### Fluxo 1 — Navegação principal
Usuário abre o app → entra na aba Comunidade → consegue navegar entre as 4 abas sem falhas.

### Fluxo 2 — Registro
Usuário vai em Registro de Resíduo → abre câmera → tira foto → vê prévia → seleciona material → informa quantidade/peso → salva registro → vê o item no histórico.

### Fluxo 3 — Mapa
Usuário vai em Pontos de Coleta → autoriza localização → vê usuário + Catalão + pontos → toca em ponto → visualiza detalhes.

### Fluxo 4 — Conteúdo educativo
Usuário vai em Reciclagem → escolhe um tipo de resíduo → acessa subtipo → vê informações e impacto ambiental → acessa ideia de reutilização.

---

## 12. CUIDADOS COM O VISUAL JÁ EXISTENTE

### Muito importante:
- manter o estilo do Figma;
- não reinventar completamente a interface;
- não deixar o visual genérico;
- não fazer uma interface com aparência de template qualquer;
- preservar o clima acolhedor, limpo e comunitário;
- manter a coerência entre as telas.

Se for preciso escolher entre:
- “mais criativo”
e
- “mais fiel ao Figma”,

**priorize ser fiel ao Figma**.

---

## 13. ENTREGA ESPERADA

Quero o projeto organizado e pronto para rodar no Expo, com:

- navegação funcional entre as 4 abas;
- layout visual consistente;
- componentes reutilizáveis;
- câmera funcionando;
- mapa funcionando;
- dados mockados;
- histórico de registros;
- estrutura de CATS visual;
- conteúdo educativo navegável;
- organização limpa do código.

### O resultado final deve ser:
um **protótipo funcional, visualmente coerente, fiel ao Figma e preparado para evolução futura**.

---

## 14. RESUMO FINAL DO QUE É O APP NESTA VERSÃO

O aplicativo EcoCatalão, nesta versão, deve ser entendido como:

- um app mobile para moradores da comunidade do Catalão;
- com forte identidade local;
- educativo;
- com mapa e pontos de coleta;
- com registro manual de resíduos;
- com câmera real;
- com preparação para CATS;
- com base pronta para futura integração com visão computacional, backend e área administrativa.

---

Se você quiser, no próximo passo eu posso fazer uma **segunda versão ainda mais técnica desse prompt**, já em formato otimizado para colar direto no Codex/gerador de app, com:
1. **objetivo**
2. **escopo**
3. **requisitos**
4. **estrutura de telas**
5. **estrutura de dados**
6. **regras de implementação**
7. **restrições**
8. **resultado esperado**

Ou posso também fazer uma versão **“Prompt Final v2 pronto para copiar e colar”** ainda mais rígida e profissional.