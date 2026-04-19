<div style="font-family:nunito">

<h2 align="center">
Modelo de Workspace de Projeto no VitaEngine
<br>
<br>
</h2>

<h4 align="left">
No <b>VitaEngine</b>, o modelo de projeto foi concebido para ser representado por
um pequeno conjunto de camadas claramente separadas, cada uma com uma
responsabilidade distinta.
<br>
<br>
Em vez de concentrar todos os dados relacionados ao projeto em um único arquivo,
ou misturar definição do projeto, conteúdo real do projeto, dados internos de
workspace por projeto e estado global do workspace em uma mesma camada, a
direção atual é distinguir entre:
<br>
<br>
<ul>
  <li><b>A raiz do workspace</b>, representada por <b>Documents/VitaEngine/</b></li>
  <li><b>A camada global do workspace</b>, representada pelo diretório oculto <b>.VE/</b></li>
  <li><b>O contrato do projeto</b>, representado por <b>App.vep</b></li>
  <li><b>O conteúdo real do projeto</b>, como <b>Scripts</b> e <b>Resources</b></li>
  <li><b>O workspace interno do projeto</b>, representado pelo diretório oculto <b>.VEP/</b></li>
</ul>
<br>
Essa separação tem como objetivo manter o modelo de projeto mais limpo, reduzir
ambiguidade estrutural, preservar uma fronteira mais clara entre dados
autoritativos e dados auxiliares, e tornar o ecossistema mais fácil de evoluir
ao longo do tempo.
<br>
<br>
</h4>

---

<h3>Aviso sobre o estado de implementação</h3>

<h4 align="left">
Este documento descreve o <b>modelo de workspace pretendido</b> para o
<b>VitaEngine</b>.
<br>
<br>
Ele deve ser entendido como uma <b>direção estrutural</b> e um
<b>modelo arquitetural orientado a workspace</b>, e não como uma garantia de que
cada parte desse modelo já esteja totalmente implementada no estado atual do
projeto.
<br>
<br>
Alguns aspectos descritos aqui ainda podem estar planejados, parciais ou sujeitos
a ajustes à medida que a plataforma amadurece.
<br>
<br>
O propósito deste documento é preservar uma <b>filosofia de design coerente</b>,
documentar a estrutura atualmente pretendida e ajudar a orientar decisões futuras
de implementação de forma mais consistente.
<br>
<br>
</h4>

---

<h3>Raiz do workspace</h3>

<h4 align="left">
A raiz pretendida do workspace desktop do VitaEngine é:
<br>
<br>
<i>Documents/VitaEngine/</i>
<br>
<br>
Esse diretório foi pensado para atuar como a raiz oficial do ambiente local de
trabalho do VitaEngine.
<br>
<br>
Uma estrutura típica pode incluir:
<br>
<br>
<ul>
  <li><b>.VE/</b> para o estado global do workspace</li>
  <li><b>Projects/</b> para as pastas de projeto</li>
  <li>Outros diretórios futuros em nível de workspace, como imports, exports ou templates</li>
</ul>
<br>
Essa raiz não é apenas uma pasta de conveniência. Ela é pensada para ser o
<b>limite canônico do workspace desktop</b> do VitaEngine.
<br>
<br>
</h4>

---

<h3>A camada global do workspace (.VE)</h3>

<h4 align="left">
O diretório oculto <b>.VE/</b> foi pensado para atuar como a <b>camada global do
workspace</b> do VitaEngine.
<br>
<br>
Seu papel é armazenar dados pertencentes ao engine e ao workspace como um todo,
e não a um projeto específico.
<br>
<br>
O primeiro exemplo importante dessa camada é:
<br>
<br>
<ul>
  <li><b>ProjectsIndex.json</b></li>
</ul>
<br>
Essa distinção é importante porque cria uma separação clara entre:
<br>
<br>
<ul>
  <li>Estado global do workspace</li>
  <li>Estado por projeto</li>
  <li>Definição do projeto</li>
</ul>
<br>
</h4>

---

<h3>ProjectsIndex.json</h3>

<h4 align="left">
O <b>ProjectsIndex.json</b> foi concebido para ser o <b>registro autoritativo de
projetos</b> do launcher do VitaEngine.
<br>
<br>
Seu papel é representar quais projetos pertencem ao workspace ativo do
VitaEngine.
<br>
<br>
Um exemplo atual inclui informações como:
<br>
<br>
<ul>
  <li><b>projectId</b></li>
  <li><b>path</b> (relativo à raiz do workspace)</li>
  <li><b>registeredAtUtc</b></li>
  <li><b>lastOpenedUtc</b> (opcional)</li>
</ul>
<br>
Esse arquivo deve ser entendido como a <b>fonte da verdade</b> para a listagem de
projetos dentro do launcher.
<br>
<br>
</h4>

<h4>Exemplo ilustrativo</h4>

<pre><code style="font-family:nunito">{
  "formatVersion": 1,
  "projects": [
    {
      "projectId": "VEP-080426152620",
      "path": "./Projects/VEP-080426152620",
      "registeredAtUtc": "2026-04-17T12:00:00Z",
      "lastOpenedUtc": "2026-04-17T12:15:00Z"
    }
  ]
}</code></pre>

<br>

---

<h3>Registro vs presença física</h3>

<h4 align="left">
No VitaEngine, a presença de um projeto no sistema de arquivos e o
reconhecimento desse projeto pelo workspace são propositalmente tratados como
coisas diferentes.
<br>
<br>
Uma pasta de projeto pode existir fisicamente em:
<br>
<br>
<i>Documents/VitaEngine/Projects/</i>
<br>
<br>
mas ela só é considerada parte do ambiente ativo do VitaEngine depois de ser
<b>registrada</b> em:
<br>
<br>
<i>Documents/VitaEngine/.VE/ProjectsIndex.json</i>
<br>
<br>
Isso significa:
<br>
<br>
<ul>
  <li>Uma pasta pode existir fisicamente e ainda assim não aparecer no launcher</li>
  <li>O launcher deve listar <b>projetos registrados</b>, e não simplesmente todas as pastas presentes em disco</li>
  <li>A criação e a importação de projetos devem ser os meios oficiais pelos quais um projeto entra no workspace</li>
</ul>
<br>
Isso é considerado uma parte intencional da preservação de um modelo de workspace
mais curado e coerente.
<br>
<br>
</h4>

---

<h3>App.vep</h3>

<h4 align="left">
O <b>App.vep</b> foi concebido para ser o manifesto principal de um projeto do
VitaEngine.
<br>
<br>
Seu papel é descrever a <b>identidade</b> e a <b>definição técnica central</b> do
projeto.
<br>
<br>
Espera-se que ele contenha informações como:
<br>
<br>
<ul>
  <li>Versão do formato</li>
  <li>Project ID</li>
  <li>Metadados do projeto</li>
  <li>Informações de entrada do sistema</li>
  <li>Modo da aplicação</li>
  <li>Perfis de build ou exportação</li>
</ul>
<br>
Esse arquivo é pensado para ser <b>controlado pela IDE</b>, ou seja, ele foi
concebido principalmente para ser criado, editado e mantido pela IDE do
VitaEngine, e não para ser editado manualmente como parte do fluxo normal.
<br>
<br>
Por causa disso, sua estrutura pode priorizar consistência, validação e
estabilidade interna acima da conveniência para edição manual.
<br>
<br>
</h4>

<h4>Exemplo ilustrativo</h4>

<pre><code style="font-family:nunito">{
  "formatVersion": 1,
  "projectId": "VEP-080426152620",
  "meta": {
    "name": "Fruit Demence: Blastlicious",
    "version": "1.0.0",
    "genre": "Puzzle",
    "author": "VitaEngine Team"
  },
  "system": {
    "entry": "./Scripts/Main.lua",
    "appMode": 0,
    "profiles": {
      "debug": {
        "titleId": null
      },
      "release": {
        "titleId": null
      }
    }
  }
}</code></pre>

<h4 align="left">
Nesse modelo, o <b>App.vep</b> permanece focado na definição do projeto em si,
enquanto preocupações auxiliares de workspace ficam fora dele.
<br>
<br>
</h4>

---

<h3>Papel autoritativo do App.vep</h3>

<h4 align="left">
O <b>App.vep</b> foi concebido para ser o <b>contrato autoritativo do projeto</b>.
<br>
<br>
Isso significa que ele define a forma central do projeto de um modo que pode
afetar diretamente:
<br>
<br>
<ul>
  <li>Como o projeto é interpretado pela IDE</li>
  <li>Como configurações relacionadas ao runtime são resolvidas</li>
  <li>Como fluxos de build e empacotamento se comportam</li>
  <li>Como compatibilidade e validação devem ser tratadas</li>
</ul>
<br>
Por esse motivo, algumas partes do App.vep devem ser entendidas como
<b>estruturalmente sensíveis</b>.
<br>
<br>
Exemplos de campos com implicações potencialmente mais fortes incluem:
<br>
<br>
<ul>
  <li><b>formatVersion</b></li>
  <li><b>projectId</b></li>
  <li><b>system.entry</b></li>
  <li><b>system.appMode</b></li>
  <li><b>system.profiles</b></li>
</ul>
<br>
Alterações em campos desse tipo podem exigir revalidação, invalidação de cache
ou um refresh mais amplo do projeto dentro da IDE.
<br>
<br>
</h4>

---

<h3>Conteúdo do projeto</h3>

<h4 align="left">
O conteúdo real do usuário dentro do projeto deve viver nas pastas normais do
projeto, como:
<br>
<br>
<ul>
  <li><b>Scripts/</b></li>
  <li><b>Resources/</b></li>
  <li>Outros diretórios futuros do projeto, conforme necessário</li>
</ul>
<br>
Esses diretórios são pensados para ser o <b>conteúdo real do projeto</b>.
<br>
<br>
No entanto, o VitaEngine faz uma distinção intencional entre:
<br>
<br>
<ul>
  <li>Arquivos físicos que existem na árvore do projeto</li>
  <li>Recursos que foram oficialmente importados e registrados pela IDE</li>
</ul>
<br>
Essa distinção é especialmente relevante para o fluxo de recursos.
<br>
<br>
</h4>

---

<h3>Por que os recursos não devem ser definidos primariamente no App.vep</h3>

<h4 align="left">
Embora a IDE possa manter informações auxiliares sobre recursos, a direção atual
é que o <b>App.vep</b> <b>não deve se tornar o inventário canônico dos arquivos
do projeto</b>.
<br>
<br>
O principal motivo é que isso criaria duas fontes concorrentes de verdade:
<br>
<br>
<ul>
  <li>O sistema de arquivos real</li>
  <li>O manifesto do projeto</li>
</ul>
<br>
Esse tipo de duplicação tende a aumentar fragilidade, criar problemas de
sincronização e tornar o modelo de projeto mais difícil de manter.
<br>
<br>
Em vez disso, o conteúdo do projeto deve continuar sendo resolvido a partir da
estrutura real de pastas, enquanto registro e indexação de recursos devem ser
tratados separadamente em dados de workspace gerenciados pela IDE.
<br>
<br>
</h4>

---

<h3>O workspace de projeto .VEP</h3>

<h4 align="left">
O diretório oculto <b>.VEP/</b> foi concebido para atuar como a <b>camada de
workspace interno do projeto</b> de um projeto VitaEngine.
<br>
<br>
Seu propósito é armazenar dados gerenciados pela própria IDE, como:
<br>
<br>
<ul>
  <li>Checksums ou informações de integridade</li>
  <li>Índices de recursos</li>
  <li>Estado da IDE por projeto</li>
  <li>Outros arquivos futuros relacionados a cache ou workspace</li>
</ul>
<br>
Esse diretório foi pensado para ser:
<br>
<br>
<ul>
  <li><b>importante para a operação da IDE</b></li>
  <li><b>não autoritativo para a definição do projeto</b></li>
  <li><b>reconstruível</b></li>
  <li><b>não destinado à edição manual</b></li>
</ul>
<br>
Em outras palavras, o <b>.VEP/</b> deve ser útil e valioso, mas não um ponto
único de falha para a validade do projeto.
<br>
<br>
</h4>

<h4>Estrutura ilustrativa</h4>

<pre><code style="font-family:nunito">Documents/VitaEngine/
├── .VE/
│   └── ProjectsIndex.json
└── Projects/
    └── VEP-080426152620/
        ├── App.vep
        ├── Scripts/
        ├── Resources/
        └── .VEP/
            ├── Integrity.json
            ├── ResourceIndex.json
            └── ProjectState.json</code></pre>

<br>

---

<h3>Por que o .VEP deve permanecer reconstruível</h3>

<h4 align="left">
Uma das intenções centrais de design por trás do <b>.VEP/</b> é que ele permaneça
<b>reconstruível e autorrecuperável</b>.
<br>
<br>
Se esse diretório for apagado, parcialmente perdido ou invalidado, a IDE deve ser
capaz de recriá-lo automaticamente a partir da estrutura real do projeto e do
conteúdo autoritativo do App.vep.
<br>
<br>
Esse design busca oferecer várias vantagens:
<br>
<br>
<ul>
  <li>Evita que o workspace interno do projeto se torne uma dependência rígida para a validade do projeto</li>
  <li>Permite que arquivos de cache e estado evoluam com mais liberdade ao longo do tempo</li>
  <li>Mantém a definição do projeto mais limpa</li>
  <li>Torna fluxos de reparo e recuperação mais simples</li>
</ul>
<br>
A expectativa de longo prazo é que apagar o <b>.VEP/</b> nunca destrua o projeto
em si.
<br>
<br>
No máximo, isso deve apenas remover conveniências, cache e memória local da IDE
até que o workspace seja reconstruído.
<br>
<br>
</h4>

---

<h3>Integrity.json</h3>

<h4 align="left">
Dentro do <b>.VEP/</b>, o <b>Integrity.json</b> foi pensado para fornecer
informações leves de integridade relacionadas ao manifesto do projeto.
<br>
<br>
Um exemplo atual dessa ideia inclui valores como:
<br>
<br>
<ul>
  <li><b>appChecksum</b></li>
  <li><b>criticalConfigChecksum</b></li>
  <li><b>lastValidatedUtc</b></li>
</ul>
<br>
Esse arquivo foi concebido para ajudar a IDE a detectar situações como:
<br>
<br>
<ul>
  <li>Modificação externa do App.vep</li>
  <li>Possível corrupção ou edições inesperadas</li>
  <li>Alterações em áreas de configuração com implicações mais fortes na execução</li>
  <li>Quando caches internos devem ser invalidados ou atualizados</li>
</ul>
<br>
O propósito desse arquivo não é fornecer segurança criptográfica, mas sim apoiar
validação de consistência e um gerenciamento de workspace mais confiável.
<br>
<br>
</h4>

<h4>Exemplo ilustrativo</h4>

<pre><code style="font-family:nunito">{
  "appChecksum": "7A31C8F2",
  "criticalConfigChecksum": "A91F22BC",
  "lastValidatedUtc": "2026-04-13T18:22:00Z"
}</code></pre>

<br>

---

<h3>Por que integridade importa no VitaEngine</h3>

<h4 align="left">
No VitaEngine, o manifesto do projeto não foi pensado para ser tratado como
metadado superficial.
<br>
<br>
Alguns de seus campos podem ter implicações relevantes para a interpretação do
projeto, exposição de runtime, regras de validação ou comportamento de build.
<br>
<br>
Por causa disso, o rastreamento de integridade é considerado especialmente valioso
para campos que podem afetar:
<br>
<br>
<ul>
  <li>Suposições de execução</li>
  <li>Interpretação de compatibilidade do projeto</li>
  <li>Comportamento disponível da API</li>
  <li>Comportamento de exportação ou deploy relacionado a perfis</li>
</ul>
<br>
Esse é um dos motivos pelos quais informações de integridade são consideradas
dignas de existir como parte do modelo interno de workspace.
<br>
<br>
</h4>

---

<h3>ResourceIndex.json</h3>

<h4 align="left">
O <b>ResourceIndex.json</b> foi pensado para fornecer o <b>registro de recursos
gerenciado pela IDE</b> de um projeto.
<br>
<br>
Seu papel é representar os recursos que foram oficialmente reconhecidos pelo
fluxo do VitaEngine, bem como manter o estado interno de alocação para novos
<b>Resource IDs (RID)</b>.
<br>
<br>
Um exemplo atual inclui informações como:
<br>
<br>
<ul>
  <li><b>formatVersion</b></li>
  <li><b>nextResourceHexId</b></li>
  <li><b>resourceId</b></li>
  <li><b>path</b></li>
  <li><b>type</b></li>
  <li><b>size</b></li>
  <li><b>lastWriteTimeUtc</b></li>
</ul>
<br>
Esse arquivo não deve ser entendido como um segundo manifesto do projeto, mas
também não é apenas um cache passivo do sistema de arquivos bruto.
<br>
<br>
Em vez disso, ele atua como o <b>registro em escopo de projeto dos recursos que
foram importados e reconhecidos pela IDE</b>, além de manter o próximo valor
hexadecimal a ser usado na geração de novos RIDs.
<br>
<br>
Isso significa:
<br>
<br>
<ul>
  <li>Um arquivo pode existir fisicamente em <b>Resources/</b> e ainda assim não ser considerado um recurso registrado</li>
  <li>Um recurso passa a fazer parte do modelo oficial quando é importado e indexado pela IDE</li>
  <li>O recurso mantém um <b>RID</b> estável mesmo que seu caminho físico mude depois</li>
  <li>Novos recursos podem receber um novo RID a partir de <b>nextResourceHexId</b></li>
</ul>
<br>
</h4>

<h4>Exemplo ilustrativo</h4>

<pre><code style="font-family:nunito">{
  "formatVersion": 1,
  "nextResourceHexId": "000002",
  "resources": [
    {
      "resourceId": "RID-000001",
      "path": "Resources/Images/Logo.png",
      "type": 0,
      "size": 48231,
      "lastWriteTimeUtc": "2026-04-13T18:45:12Z"
    }
  ]
}</code></pre>

<br>

---

<h3>Filosofia de alocação de RID</h3>

<h4 align="left">
A direção atual do VitaEngine é que cada recurso importado receba um
<b>Resource ID (RID)</b> estável e que esse identificador <b>não precise ser
reciclado</b> posteriormente.
<br>
<br>
Em termos práticos:
<br>
<br>
<ul>
  <li>Ao importar um novo recurso, a IDE consome o valor atual de <b>nextResourceHexId</b></li>
  <li>Esse valor é convertido no novo identificador no formato <b>RID-XXXXXX</b></li>
  <li>Depois disso, <b>nextResourceHexId</b> é incrementado para o próximo valor</li>
</ul>
<br>
Essa abordagem significa que o RID é <b>descartável do ponto de vista de
reaproveitamento</b>:
<br>
<br>
<ul>
  <li>Se um recurso for removido, seu RID antigo não precisa voltar para o pool</li>
  <li>Se um recurso for substituído por outro, o novo recurso pode receber um RID novo</li>
  <li>O sistema não precisa compactar, reorganizar ou tentar preencher “buracos” de IDs</li>
</ul>
<br>
Isso é considerado uma escolha saudável porque reduz complexidade e evita lógica
desnecessária de reciclagem.
<br>
<br>
Com o formato atual <b>RID-XXXXXX</b>, existe um espaço de:
<br>
<br>
<b>16.777.216 possíveis RIDs por projeto</b>
<br>
<br>
Esse volume é grande o suficiente para que a estratégia de alocação monotônica
simples seja considerada plenamente adequada para o escopo do VitaEngine.
<br>
<br>
</h4>

---

<h3>Por que a validação de recursos deve permanecer leve</h3>

<h4 align="left">
A direção atual é que a validação de recursos permaneça <b>leve e pragmática</b>.
<br>
<br>
Em vez de executar verificações profundas e custosas em todos os recursos o
tempo todo, a IDE pode depender principalmente de sinais baratos, como:
<br>
<br>
<ul>
  <li>Presença do arquivo</li>
  <li>Mudanças de caminho</li>
  <li>Tamanho do arquivo</li>
  <li>Última data de modificação</li>
</ul>
<br>
Essa abordagem busca oferecer um bom equilíbrio entre:
<br>
<br>
<ul>
  <li>Responsividade</li>
  <li>Refresh incremental</li>
  <li>Verificação razoável de consistência</li>
  <li>Menor overhead durante o uso normal do projeto</li>
</ul>
<br>
Verificações mais profundas ainda podem se tornar apropriadas em situações
específicas no futuro, mas o modelo normal de workspace não foi pensado para
depender de validação pesada de todos os recursos o tempo todo.
<br>
<br>
</h4>

---

<h3>ProjectState.json</h3>

<h4 align="left">
O <b>ProjectState.json</b> foi pensado para armazenar a <b>memória de trabalho</b>
da IDE para um projeto específico.
<br>
<br>
Um exemplo atual inclui seções como:
<br>
<br>
<ul>
  <li><b>session</b></li>
  <li><b>layout</b></li>
  <li><b>explorer</b></li>
</ul>
<br>
Esse arquivo pode conter informações como:
<br>
<br>
<ul>
  <li>Último script aberto</li>
  <li>Último perfil selecionado</li>
  <li>Último alvo de execução</li>
  <li>Estado de expansão do explorer</li>
  <li>Caminho selecionado</li>
  <li>Tamanhos de painéis ou informações de layout</li>
</ul>
<br>
Seu papel é preservar <b>continuidade da IDE por projeto</b>, e não definir o
projeto em si.
<br>
<br>
</h4>

<h4>Exemplo ilustrativo</h4>

<pre><code style="font-family:nunito">{
  "formatVersion": 1,
  "session": {
    "lastOpenedScript": "./Scripts/Main.lua",
    "lastProfile": "Debug",
    "lastRunTarget": "Companion"
  },
  "layout": {
    "leftPanelWidth": 280,
    "rightPanelWidth": 320,
    "bottomPanelHeight": 220
  },
  "explorer": {
    "expandedFolders": [
      "./Scripts",
      "./Resources/Images"
    ],
    "selectedPath": "./Scripts/Main.lua"
  }
}</code></pre>

<br>

---

<h3>Por que o estado por projeto importa</h3>

<h4 align="left">
Uma das vantagens de armazenar estado por projeto é que cada projeto pode
naturalmente desenvolver seu próprio contexto de trabalho dentro da IDE.
<br>
<br>
Projetos diferentes podem envolver:
<br>
<br>
<ul>
  <li>Fluxos diferentes</li>
  <li>Alvos de execução diferentes</li>
  <li>Perfis preferidos diferentes</li>
  <li>Scripts abertos com mais frequência diferentes</li>
  <li>Estruturas de explorer e áreas de foco diferentes</li>
</ul>
<br>
Por causa disso, preservar estado da IDE por projeto é considerado uma parte
importante de fazer o VitaEngine parecer mais um workspace real do que um editor
genérico sem memória de contexto.
<br>
<br>
</h4>

---

<h3>O que o ProjectState.json não deve conter</h3>

<h4 align="left">
Para preservar uma fronteira clara, o <b>ProjectState.json</b> não deve se tornar
um segundo arquivo de definição de projeto.
<br>
<br>
Ele não foi pensado para armazenar:
<br>
<br>
<ul>
  <li>Identidade central do projeto</li>
  <li>Configuração crítica de runtime</li>
  <li>Definição crítica de build</li>
  <li>Qualquer coisa necessária para o projeto continuar válido</li>
</ul>
<br>
Seu papel pretendido é mais estreito:
<br>
<br>
<b>preservar conveniência, continuidade e contexto da IDE por projeto.</b>
<br>
<br>
</h4>

---

<h3>RecentProjects.json</h3>

<h4 align="left">
Um <b>RecentProjects.json</b> leve ainda pode existir como uma camada de
conveniência para ordenação de acesso rápido e UX do launcher.
<br>
<br>
No entanto, ele deve ser entendido como um <b>artefato secundário de
conveniência</b>, e não como a fonte autoritativa da presença de projetos no
workspace.
<br>
<br>
Na prática:
<br>
<br>
<ul>
  <li><b>ProjectsIndex.json</b> define quais projetos pertencem ao workspace ativo</li>
  <li><b>RecentProjects.json</b> pode definir recência, ordenação visual ou metadados de conveniência</li>
</ul>
<br>
Essa distinção ajuda a manter separadas as preocupações entre pertencimento ao
workspace e conveniência do launcher.
<br>
<br>
</h4>

---

<h3>Comportamento de recuperação</h3>

<h4 align="left">
Se o <b>.VEP/</b> estiver ausente, incompleto ou inválido, o comportamento
pretendido de longo prazo é que o VitaEngine o reconstrua automaticamente.
<br>
<br>
Um fluxo razoável de recuperação pode incluir:
<br>
<br>
<ul>
  <li>Recriar o diretório .VEP</li>
  <li>Reconstruir o Integrity.json</li>
  <li>Reconstruir o ResourceIndex.json</li>
  <li>Criar um ProjectState.json padrão</li>
  <li>Atualizar o workspace interno do projeto conforme necessário</li>
</ul>
<br>
Da mesma forma, se o registro global do workspace for perdido ou precisar de
reparo, um fluxo futuro de recuperação pode permitir que o workspace:
<br>
<br>
<ul>
  <li>Escaneie locais conhecidos de projeto</li>
  <li>Valide a estrutura do projeto</li>
  <li>Reconstrua ou repare o ProjectsIndex.json</li>
</ul>
<br>
Isso preserva o princípio mais amplo do VitaEngine de que <b>registro é o fluxo
normal, enquanto escaneamento é um caminho de recuperação, e não a estratégia
primária de listagem</b>.
<br>
<br>
</h4>

---

<h3>Filosofia de design</h3>

<h4 align="left">
A filosofia do workspace de projeto no VitaEngine é baseada em um princípio
simples:
<br>
<br>
<b>estado global do workspace, definição do projeto, conteúdo do projeto e estado
interno da IDE por projeto não devem ser colapsados na mesma camada.</b>
<br>
<br>
<ul>
  <li><b>.VE/</b> deve permanecer como a camada global do workspace</li>
  <li><b>App.vep</b> deve permanecer como o contrato do projeto</li>
  <li><b>Scripts/</b> e <b>Resources/</b> devem permanecer como o conteúdo real do projeto</li>
  <li><b>.VEP/</b> deve permanecer como a camada interna de workspace do projeto</li>
</ul>
<br>
Ao manter essas responsabilidades separadas, a plataforma pode permanecer mais
limpa, mais manutenível e mais fácil de evoluir.
<br>
<br>
</h4>

---

<h3>Direção atual pretendida</h3>

<h4 align="left">
A direção atual pretendida pode ser resumida assim:
<br>
<br>
<ul>
  <li><b>Documents/VitaEngine/</b> é a raiz canônica do workspace desktop</li>
  <li><b>.VE/</b> é a camada global do workspace</li>
  <li><b>ProjectsIndex.json</b> é o registro autoritativo de projetos para o launcher</li>
  <li><b>App.vep</b> é o manifesto autoritativo do projeto</li>
  <li><b>Scripts/</b> e <b>Resources/</b> são o conteúdo real do projeto</li>
  <li><b>.VEP/</b> é a camada interna de workspace do projeto, gerenciada pela IDE</li>
  <li><b>Integrity.json</b> é usado para rastreamento de consistência do manifesto</li>
  <li><b>ResourceIndex.json</b> é usado como o registro de recursos em escopo de projeto e também mantém <b>nextResourceHexId</b> para a geração monotônica de novos RIDs</li>
  <li><b>ProjectState.json</b> é usado para continuidade da IDE por projeto</li>
  <li><b>RecentProjects.json</b> pode existir como camada secundária de conveniência</li>
  <li><b>.VEP/</b> é importante, mas deve permanecer reconstruível e seguro para regenerar</li>
</ul>
<br>
Esse modelo busca oferecer um equilíbrio melhor entre:
<br>
<br>
<ul>
  <li>Correção</li>
  <li>Performance</li>
  <li>Clareza</li>
  <li>Evolução futura</li>
</ul>
<br>
</h4>

---

<h3>Nota final</h3>

<h4 align="left">
O modelo de workspace de projeto do VitaEngine não foi pensado como uma simples
questão de organização de pastas.
<br>
<br>
Ele é uma decisão estrutural feita para preservar:
<br>
<br>
<ul>
  <li>Limites de projeto mais claros</li>
  <li>Um manifesto autoritativo mais limpo</li>
  <li>Uma separação mais saudável entre estado global do workspace e estado por projeto</li>
  <li>Uma distinção mais forte entre presença física e registro lógico</li>
  <li>Maior manutenibilidade no longo prazo</li>
  <li>Maior resiliência por meio de dados de workspace reconstruíveis</li>
  <li>Uma estratégia simples e robusta de identidade de recursos baseada em RIDs estáveis e descartáveis</li>
</ul>
<br>
Se mantido com consistência, esse modelo deve ajudar o VitaEngine a oferecer uma
estrutura de projeto mais coerente, uma experiência de editor mais polida e uma
base mais forte para expansão futura do workflow.
<br>
<br>
</h4>

---

</div>