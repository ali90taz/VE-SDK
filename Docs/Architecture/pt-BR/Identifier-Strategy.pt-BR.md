<div style="font-family:nunito">

<h2 align="center">
Estratégia de Identificadores no VitaEngine
<br>
<br>
</h2>

<h4 align="left">
No <b>VitaEngine</b>, os identificadores foram concebidos para seguir um
<b>modelo multicamadas</b>, com responsabilidades claramente separadas.
<br>
<br>
Em vez de depender de um único identificador para todos os propósitos, a direção
atual é distinguir entre:
<br>
<br>
<ul>
  <li><b>Contexto de registro do projeto</b>, usado pelo workspace para reconhecer projetos</li>
  <li><b>Identificadores de projeto</b>, usados pela IDE desktop e pela estrutura local do projeto</li>
  <li><b>Identificadores de recurso</b>, usados pelo registro de recursos em escopo de projeto</li>
  <li><b>Identificadores de título</b>, usados em fluxos de empacotamento, instalação e deploy voltados ao Vita</li>
</ul>
<br>
Essa distinção existe para preservar flexibilidade dentro do workflow do
VitaEngine, evitar acoplamento desnecessário entre a organização interna do
projeto e as restrições de pacotes do Vita, e permitir que um mesmo projeto gere
múltiplas variantes instaláveis quando necessário.
<br>
<br>
</h4>

---

<h3>Aviso sobre o estado de implementação</h3>

<h4 align="left">
Este documento descreve o <b>modelo pretendido de identificadores</b> do
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
a evolução à medida que a plataforma amadurece.
<br>
<br>
Seu propósito é documentar a <b>estrutura pretendida</b>, preservar consistência
em decisões futuras de implementação e tornar explícita a filosofia de design à
medida que o ecossistema cresce.
<br>
<br>
</h4>

---

<h3>Distinção central</h3>

<h4 align="left">
Os identificadores do VitaEngine foram concebidos para serem separados em três
camadas práticas:
<br>
<br>
<ul>
  <li><b>Project ID</b>, que identifica um projeto VitaEngine dentro da IDE e da estrutura local do workspace</li>
  <li><b>Resource ID</b>, que identifica um recurso registrado dentro do workspace do projeto</li>
  <li><b>Title ID</b>, que identifica uma aplicação empacotada voltada ao Vita para contextos de build, deploy e instalação</li>
</ul>
<br>
Esses identificadores <b>não servem ao mesmo propósito</b> e não devem seguir o
mesmo ciclo de vida nem as mesmas regras de formatação.
<br>
<br>
O <b>Project ID</b> pertence ao <b>modelo de identidade do projeto no lado da IDE</b>.
<br>
<br>
O <b>Resource ID</b> pertence ao <b>modelo de identidade de recursos em escopo de projeto</b>.
<br>
<br>
O <b>Title ID</b> pertence ao <b>modelo de identidade de saída voltado ao dispositivo</b>.
<br>
<br>
Mais importante ainda: o <b>Project ID não deve implicar nem definir
permanentemente a identidade final da aplicação</b>.
<br>
<br>
Um mesmo projeto pode produzir múltiplas saídas voltadas ao Vita ao longo do
tempo, e cada uma pode legitimamente exigir um Title ID diferente dependendo do
workflow pretendido.
<br>
<br>
</h4>

---

<h3>Contexto de registro no workspace</h3>

<h4 align="left">
A presença de um projeto no sistema de arquivos e o reconhecimento desse projeto
pelo workspace do VitaEngine são propositalmente tratados como coisas distintas.
<br>
<br>
Uma pasta de projeto pode existir fisicamente sob a raiz do workspace, mas ela
só é considerada parte do ambiente ativo do VitaEngine depois de ter sido
<b>registrada</b>.
<br>
<br>
Esse registro foi concebido para ser representado pelo índice do workspace:
<br>
<br>
<i>Documents/VitaEngine/.VE/ProjectsIndex.json</i>
<br>
<br>
Isso significa que o launcher deve listar <b>projetos registrados</b>, e não
simplesmente toda pasta que por acaso exista sob o diretório de projetos.
<br>
<br>
Essa distinção é uma parte importante da preservação de um modelo de workspace
mais curado e coerente.
<br>
<br>
</h4>

---

<h3>Project ID</h3>

<h4 align="left">
O <b>Project ID</b> foi concebido para ser a identidade interna principal de um
projeto dentro da IDE do VitaEngine.
<br>
<br>
Seu propósito é fornecer um identificador estável, único e orientado à IDE para:
<br>
<br>
<ul>
  <li>Nomeação da pasta do projeto</li>
  <li>Registros de presença no workspace</li>
  <li>Registros de projetos recentes</li>
  <li>Busca interna de projetos</li>
  <li>Referências persistentes do lado da IDE</li>
  <li>Organização geral do projeto no desktop</li>
</ul>
<br>
Espera-se que um Project ID permaneça <b>estável</b> durante toda a vida do
projeto e seja independente do nome de usuário atual do Windows ou de caminhos
absolutos específicos de uma máquina.
<br>
<br>
</h4>

---

<h3>Formato recomendado para Project ID</h3>

<h4 align="left">
A direção preferida atualmente é usar um formato baseado em um <b>prefixo</b>
mais uma <b>sequência numérica derivada de timestamp</b>.
<br>
<br>
Exemplo:
<br>
<br>
<b>VEP-080426152620</b>
<br>
<br>
Esse formato foi pensado para oferecer:
<br>
<br>
<ul>
  <li>Probabilidade extremamente baixa de colisão em uso normal</li>
  <li>Geração simples sem exigir um contador global</li>
  <li>Identidade visual clara e consistente com a nomenclatura do VitaEngine</li>
  <li>Maior robustez do que valores sequenciais curtos como <b>0001</b></li>
</ul>
<br>
Usar um identificador derivado de timestamp evita várias das fragilidades
normalmente associadas a IDs incrementais curtos, especialmente em ambientes
onde o estado do projeto pode ser resetado, movido ou reconstruído mais tarde.
<br>
<br>
O prefixo <b>VEP</b> foi pensado para alinhar o identificador ao
<b>modelo de projeto do VitaEngine</b>, e não à aplicação final empacotada.
<br>
<br>
Isso reforça que o Project ID pertence à estrutura do projeto no lado da IDE,
enquanto o Title ID pertence à camada de saída voltada ao Vita.
<br>
<br>
</h4>

---

<h3>Por que Project IDs sequenciais curtos não são preferidos</h3>

<h4 align="left">
Um identificador sequencial curto como:
<br>
<br>
<b>VEP-0001</b>
<br>
<br>
pode parecer simples, mas introduz várias fragilidades estruturais:
<br>
<br>
<ul>
  <li>Depende de um contador global confiável</li>
  <li>É mais vulnerável a colisões acidentais</li>
  <li>Torna-se frágil se o estado de configuração for resetado ou perdido</li>
  <li>Cria dependência desnecessária do histórico anterior de criação</li>
</ul>
<br>
Para uma plataforma como o VitaEngine, onde os projetos tendem a ser
persistentes e arquiteturalmente distintos, um Project ID derivado de timestamp é
considerado muito mais adequado.
<br>
<br>
</h4>

---

<h3>Project ID e estrutura local do projeto</h3>

<h4 align="left">
O <b>Project ID</b> foi concebido para fazer parte da estrutura local do projeto
gerenciada pela IDE.
<br>
<br>
Uma estrutura típica pode se parecer com:
<br>
<br>
<i>Documents/VitaEngine/Projects/VEP-080426152620/</i>
<br>
<br>
com o arquivo do projeto armazenado dentro desse diretório, por exemplo:
<br>
<br>
<i>Documents/VitaEngine/Projects/VEP-080426152620/App.vep</i>
<br>
<br>
Por causa disso, a IDE não precisa persistir caminhos absolutos contendo o nome
de usuário atual do sistema como parte do modelo de identidade de longo prazo do
projeto.
<br>
<br>
Em vez disso, o projeto pode ser resolvido combinando:
<br>
<br>
<ul>
  <li>A raiz conhecida do workspace do VitaEngine</li>
  <li>O Project ID armazenado</li>
  <li>O caminho registrado em <b>ProjectsIndex.json</b></li>
  <li>A estrutura interna esperada do projeto</li>
</ul>
<br>
Isso mantém o modelo de projeto mais limpo, mais portátil e menos dependente de
detalhes específicos da máquina.
<br>
<br>
</h4>

---

<h3>Registros de projetos recentes</h3>

<h4 align="left">
Como o <b>Project ID</b> foi concebido para ser estável e único, os registros de
projetos recentes não precisam atuar como o registro autoritativo de presença no
workspace.
<br>
<br>
Uma abordagem mais limpa no longo prazo é manter:
<br>
<br>
<ul>
  <li><b>ProjectsIndex.json</b> como o registro autoritativo do workspace</li>
  <li><b>RecentProjects.json</b> como uma camada leve de conveniência</li>
</ul>
<br>
Um registro de projeto recente pode persistir apenas metadados orientados ao
projeto, como:
<br>
<br>
<ul>
  <li><b>projectId</b></li>
  <li><b>name</b></li>
  <li><b>lastOpened</b> (opcional)</li>
</ul>
<br>
Isso mantém os dados de projetos recentes mais leves, mais limpos e menos
acoplados a um ambiente específico, preservando uma distinção clara entre:
<br>
<br>
<ul>
  <li><b>pertencimento do projeto ao workspace</b></li>
  <li><b>conveniência e recência no launcher</b></li>
</ul>
<br>
</h4>

---

<h3>Resource ID (RID)</h3>

<h4 align="left">
Um <b>Resource ID</b> foi concebido para ser a identidade estável de um recurso
registrado dentro de um projeto VitaEngine.
<br>
<br>
Seu papel é permitir que a IDE e ferramentas futuras referenciem recursos por
<b>identidade</b>, e não apenas por caminho de sistema de arquivos.
<br>
<br>
Essa distinção é especialmente útil para workflows como:
<br>
<br>
<ul>
  <li>Importação e registro de recursos</li>
  <li>Navegação e manipulação de recursos dentro da IDE</li>
  <li>Futuros fluxos de hot reload ou live sync</li>
  <li>Referências internas mais seguras quando caminhos mudam</li>
</ul>
<br>
Um recurso pode ser movido ou renomeado fisicamente e ainda assim preservar sua
identidade lógica dentro do projeto.
<br>
<br>
</h4>

---

<h3>Formato recomendado para Resource ID</h3>

<h4 align="left">
A direção preferida atualmente é:
<br>
<br>
<b>RID-XXXXXX</b>
<br>
<br>
onde:
<br>
<br>
<ul>
  <li><b>RID</b> significa <b>Resource ID</b></li>
  <li><b>XXXXXX</b> é uma sequência hexadecimal maiúscula de seis dígitos</li>
</ul>
<br>
Exemplos:
<br>
<br>
<ul>
  <li><b>RID-000001</b></li>
  <li><b>RID-00000A</b></li>
  <li><b>RID-00A3F2</b></li>
</ul>
<br>
Esse formato foi pensado para oferecer:
<br>
<br>
<ul>
  <li>Identificadores internos simples e compactos</li>
  <li>Capacidade extremamente alta por projeto</li>
  <li>Boa legibilidade em JSON, logs e ferramentas internas</li>
  <li>Um modelo de identidade estável sem embutir o tipo do recurso no prefixo</li>
</ul>
<br>
O <b>tipo</b> do recurso deve ser representado por metadados, e não pelo prefixo
do identificador.
<br>
<br>
</h4>

---

<h3>Capacidade prática do espaço de RIDs</h3>

<h4 align="left">
Com o formato atual <b>RID-XXXXXX</b>, o VitaEngine dispõe de:
<br>
<br>
<b>16.777.216 possíveis RIDs por projeto</b>
<br>
<br>
Esse volume é grande o suficiente para que o sistema não precise tratar
reaproveitamento de IDs como uma preocupação prática no escopo normal do
VitaEngine.
<br>
<br>
Por causa disso, a direção atual favorece simplicidade, previsibilidade e
robustez, em vez de lógica adicional para reciclagem de identificadores.
<br>
<br>
</h4>

---

<h3>Lifecycle do Resource ID</h3>

<h4 align="left">
Um <b>Resource ID</b> deve ser atribuído quando um arquivo é <b>importado</b>
para o projeto através do workflow oficial do VitaEngine.
<br>
<br>
Em outras palavras:
<br>
<br>
<ul>
  <li>Um arquivo que existe fisicamente não é automaticamente tratado como um recurso registrado</li>
  <li>Um arquivo se torna um recurso VitaEngine quando é importado e registrado pela IDE</li>
  <li>Nesse momento, ele recebe um <b>RID</b> estável</li>
</ul>
<br>
Isso espelha o princípio mais amplo do VitaEngine de que <b>presença física e
registro lógico são conceitos intencionalmente distintos</b>.
<br>
<br>
</h4>

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
Isso significa que o RID é <b>descartável do ponto de vista de reaproveitamento</b>:
<br>
<br>
<ul>
  <li>Se um recurso for removido, seu RID antigo não precisa voltar para o pool</li>
  <li>Se um recurso for substituído por outro, o novo recurso pode receber um RID novo</li>
  <li>O sistema não precisa compactar, reorganizar ou tentar preencher “buracos” de IDs</li>
</ul>
<br>
Essa abordagem é considerada saudável porque reduz complexidade e evita lógica
desnecessária de reciclagem.
<br>
<br>
Com o espaço atual de 24 bits hexadecimais, a estratégia de alocação monotônica
simples é considerada plenamente adequada para o escopo do VitaEngine.
<br>
<br>
</h4>

---

<h3>nextResourceHexId</h3>

<h4 align="left">
No modelo atual, o estado de alocação do próximo RID é mantido dentro de:
<br>
<br>
<i>Documents/VitaEngine/Projects/&lt;ProjectID&gt;/.VEP/ResourceIndex.json</i>
<br>
<br>
por meio do campo:
<br>
<br>
<b>nextResourceHexId</b>
<br>
<br>
Esse valor representa o próximo número hexadecimal de seis dígitos que poderá
ser consumido na geração de um novo <b>RID-XXXXXX</b>.
<br>
<br>
Exemplo ilustrativo:
<br>
<br>
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
Nesse exemplo:
<br>
<br>
<ul>
  <li>O recurso já registrado usa <b>RID-000001</b></li>
  <li>O próximo recurso elegível receberia <b>RID-000002</b></li>
</ul>
<br>
Isso torna a alocação de novos RIDs simples, explícita e barata de manter.
<br>
<br>
</h4>

---

<h3>Title ID</h3>

<h4 align="left">
O <b>Title ID</b> serve a um papel diferente.
<br>
<br>
Ele foi concebido para identificar a aplicação empacotada em workflows voltados
ao Vita, como:
<br>
<br>
<ul>
  <li>Identidade da saída de build</li>
  <li>Identidade do pacote</li>
  <li>Identidade da aplicação instalável no sistema de destino</li>
  <li>Comportamento de deploy e substituição</li>
</ul>
<br>
Ao contrário do Project ID, o Title ID deve seguir as restrições do modelo de
empacotamento e instalação do destino.
<br>
<br>
Por causa disso, ele não deve ser tratado como a identidade interna principal do
projeto dentro da IDE.
<br>
<br>
Um Title ID é melhor entendido como uma <b>identidade de saída</b>, e não como a
identidade canônica do projeto em si.
<br>
<br>
</h4>

---

<h3>Por que Project ID e Title ID devem permanecer separados</h3>

<h4 align="left">
Manter Project ID e Title ID separados oferece várias vantagens importantes:
<br>
<br>
<ul>
  <li>Evita que restrições de identificadores voltados ao Vita moldem todo o modelo desktop do projeto</li>
  <li>Permite que o Project ID permaneça estável enquanto variantes de pacote evoluem de forma independente</li>
  <li>Permite que o mesmo projeto gere múltiplas variantes instaláveis ao longo do tempo</li>
  <li>Mantém identidade de projeto e identidade de pacote conceitualmente limpas</li>
</ul>
<br>
Essa separação é um dos benefícios estruturais mais importantes do modelo atual
de identificadores.
<br>
<br>
</h4>

---

<h3>Múltiplas variantes a partir do mesmo projeto</h3>

<h4 align="left">
Uma das vantagens práticas desse modelo é que um mesmo Project ID pode ser usado
para gerar <b>múltiplas variantes de Title ID</b> ao longo do tempo.
<br>
<br>
Isso abre espaço para workflows como:
<br>
<br>
<ul>
  <li>Variantes de debug e release</li>
  <li>Variantes experimentais de pacote</li>
  <li>Identidades instaláveis alternativas para testes</li>
  <li>Escolhas de substituição de pacote controladas em exportação ou deploy</li>
</ul>
<br>
Em outras palavras, o mesmo projeto VitaEngine pode permanecer estruturalmente o
mesmo dentro da IDE enquanto produz saídas diferentes voltadas ao Vita quando
necessário.
<br>
<br>
Isso é considerado uma forte vantagem de separar identidade desktop do projeto e
identidade de pacote.
<br>
<br>
</h4>

---

<h3>Filosofia de tratamento de colisões</h3>

<h4 align="left">
A estratégia atual de <b>Project ID</b> deve tornar colisões extremamente
improváveis durante o uso normal.
<br>
<br>
A estratégia atual de <b>Resource ID</b> também torna colisões irrelevantes na
prática durante o uso normal, já que <b>RID-XXXXXX</b> fornece um espaço muito
grande por projeto.
<br>
<br>
No entanto, colisões no lado do <b>Title ID</b> ainda podem se tornar relevantes
ao longo do tempo, especialmente quando múltiplas variantes de pacote são
possíveis.
<br>
<br>
Nesses casos, um workflow razoável de longo prazo pode incluir:
<br>
<br>
<ul>
  <li>Avisar que o Title ID de destino já existe</li>
  <li>Oferecer a opção de sobrescrever o pacote ou instalação existente</li>
  <li>Solicitar remoção manual antes de continuar</li>
  <li>Permitir que o usuário gere ou atribua um Title ID diferente</li>
</ul>
<br>
Essa abordagem mantém o sistema explícito e evita esconder comportamento de
deploy potencialmente destrutivo atrás de substituições silenciosas.
<br>
<br>
</h4>

---

<h3>Independência de caminho e neutralidade de máquina</h3>

<h4 align="left">
Outro princípio importante por trás desse design é que registros de projeto não
devem ficar rigidamente amarrados a um nome de usuário específico da máquina,
como:
<br>
<br>
<i>C:\Users\SomeUser\...</i>
<br>
<br>
Sempre que possível, a identidade do projeto deve ser resolvida através de:
<br>
<br>
<ul>
  <li>Uma raiz conhecida do workspace do VitaEngine determinada pela IDE</li>
  <li>Um Project ID estável</li>
  <li>Uma convenção previsível de nome de pasta e arquivo</li>
  <li>Um registro do projeto em <b>ProjectsIndex.json</b></li>
</ul>
<br>
Isso reduz dependência desnecessária de detalhes específicos do ambiente e
mantém o modelo de projeto mais limpo.
<br>
<br>
</h4>

---

<h3>Filosofia de design</h3>

<h4 align="left">
A filosofia de identificadores do VitaEngine é baseada em um princípio simples:
<br>
<br>
<b>registro no workspace, identidade do projeto, identidade de recurso e
identidade de pacote não devem ser colapsados na mesma camada.</b>
<br>
<br>
A IDE desktop precisa de um identificador estável, robusto e orientado ao
projeto.
<br>
<br>
O modelo de recursos precisa de identificadores estáveis, mesmo quando caminhos
físicos mudam.
<br>
<br>
O workflow de empacotamento voltado ao Vita precisa de um identificador
compatível com restrições de instalação e deploy.
<br>
<br>
Tentar forçar todas essas preocupações dentro de um único modelo de
identificadores tornaria o sistema mais frágil, mais restritivo e menos flexível
ao longo do tempo.
<br>
<br>
Ao separá-las, o VitaEngine preserva um modelo arquitetural mais saudável e mais
escalável.
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
  <li><b>ProjectsIndex.json</b> define quais projetos pertencem ao workspace ativo</li>
  <li><b>Project ID</b> é a identidade estável de um projeto VitaEngine dentro da IDE</li>
  <li><b>Project ID</b> deve seguir o formato <b>VEP-*</b></li>
  <li><b>Resource ID</b> é a identidade estável de um recurso registrado do projeto</li>
  <li><b>Resource ID</b> deve seguir o formato <b>RID-XXXXXX</b></li>
  <li><b>ResourceIndex.json</b> mantém o registro de recursos e também <b>nextResourceHexId</b> para a geração monotônica de novos RIDs</li>
  <li>RIDs são estáveis e <b>não precisam ser reciclados</b></li>
  <li><b>Title ID</b> é a identidade instalável e voltada ao pacote usada nos workflows de saída para Vita</li>
  <li><b>Title ID</b> deve permanecer independente da identidade canônica do projeto</li>
  <li><b>RecentProjects.json</b> pode existir como camada secundária de conveniência, mas não deve substituir o registro do workspace</li>
</ul>
<br>
Esse modelo foi pensado para manter o ecossistema do VitaEngine mais flexível,
mais coerente e mais fácil de evoluir ao longo do tempo.
<br>
<br>
</h4>

---

<h3>Nota final</h3>

<h4 align="left">
O modelo de identificadores do VitaEngine não foi pensado como uma escolha
puramente cosmética de nomenclatura.
<br>
<br>
Ele é uma decisão estrutural feita para sustentar:
<br>
<br>
<ul>
  <li>Organização de projeto mais clara</li>
  <li>Persistência mais segura de referências de projeto no longo prazo</li>
  <li>Identidade estável de recursos dentro da IDE</li>
  <li>Maior flexibilidade em workflows de empacotamento e deploy</li>
  <li>Uma separação mais saudável entre registro no workspace, identidade no lado da IDE e identidade voltada ao Vita</li>
  <li>Uma estratégia simples e robusta de identidade de recursos baseada em RIDs estáveis e descartáveis</li>
</ul>
<br>
Se mantido com consistência, esse modelo deve ajudar o VitaEngine a permanecer
mais previsível, mais manutenível e mais adaptável à medida que a plataforma
cresce.
<br>
<br>
</h4>

---

</div>