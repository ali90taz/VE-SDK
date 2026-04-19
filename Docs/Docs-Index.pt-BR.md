<div style="font-family:nunito">

<h2 align="center">
Docs-Index (PT-BR)
<br>
<br>
</h2>

<h4 align="left">
Este arquivo funciona como um <b>índice mestre interno</b> para os documentos em
<b>PT-BR</b> do ecossistema atual do <b>VE-SDK / VitaEngine</b>.
<br>
<br>
Seu objetivo é:
<br>
<br>
<ul>
  <li>Organizar a ordem de leitura recomendada</li>
  <li>Reduzir atrito ao retornar ao projeto após pausas longas</li>
  <li>Preservar contexto arquitetural e filosófico</li>
  <li>Servir como ponto de entrada interno para futuras revisões e novas decisões</li>
  <li>Funcionar como uma âncora de contexto para trabalho assistido por IA</li>
</ul>
<br>
Este índice <b>não substitui</b> os documentos individuais.
Ele existe para ajudar a navegar entre eles com mais clareza.
<br>
<br>
</h4>

---

<h3>Como usar este índice</h3>

<h4 align="left">
Uma forma saudável de usar este arquivo é:
<br>
<br>
<ul>
  <li>Reler a seção <b>Leitura Essencial</b> antes de grandes mudanças estruturais</li>
  <li>Consultar a seção <b>Leitura Arquitetural</b> ao mexer em organização interna, workflow de projeto ou limites de componentes</li>
  <li>Consultar a seção <b>Leitura de Workflow</b> antes de alterar tooling, branches, setup ou fluxo de trabalho</li>
  <li>Consultar a seção <b>Leitura Filosófica</b> quando houver risco de o projeto perder identidade, coerência ou direção</li>
</ul>
<br>
Se houver dúvida sobre uma nova decisão:
<br>
<br>
<b>volte primeiro aos documentos fundacionais antes de criar novas abstrações ou expandir escopo.</b>
<br>
<br>
</h4>

---

<h3>Mapa rápido do bloco documental atual</h3>

<h4 align="left">
O bloco documental atual pode ser entendido em quatro camadas:
<br>
<br>
<ul>
  <li><b>Fundação estrutural</b> → como o projeto se organiza e preserva identidade técnica</li>
  <li><b>Workflow e operação</b> → como o projeto é construído, mantido e iterado</li>
  <li><b>Ecossistema e tooling</b> → como componentes externos ou auxiliares se encaixam</li>
  <li><b>Filosofia e direção</b> → por que o projeto existe e o que ele pretende proteger</li>
</ul>
<br>
</h4>

---

<h3>Leitura Essencial (ordem recomendada)</h3>

<h4 align="left">
Se você precisar reler apenas o núcleo do projeto antes de continuar
desenvolvendo, esta é a sequência mais importante:
<br>
<br>
<ol>
  <li><b>Project-Workspace-Model.pt-BR.md</b></li>
  <li><b>Identifier-Strategy.pt-BR.md</b></li>
  <li><b>Renderer-Theme-System.pt-BR.md</b></li>
  <li><b>Git-Workflow.pt-BR.md</b></li>
  <li><b>Why-VSCode.pt-BR.md</b></li>
  <li><b>README.pt-BR.md</b></li>
</ol>
<br>
Essa sequência tende a restaurar rapidamente:
<br>
<br>
<ul>
  <li>Estrutura mental do workspace</li>
  <li>Modelo de identidade do projeto e dos recursos</li>
  <li>Limites saudáveis entre UI e tema</li>
  <li>Papéis das branches</li>
  <li>Separação entre VE-SDK, VitaEngine e tooling externo</li>
  <li>Posicionamento atual da branch <b>dev</b></li>
</ul>
<br>
</h4>

---

<h3>Leitura Arquitetural</h3>

<h4 align="left">
Esses documentos são os mais importantes quando a decisão envolve
<b>arquitetura interna</b>, <b>modelagem</b>, <b>organização de componentes</b>
ou <b>limites de responsabilidade</b>.
<br>
<br>
<ul>
  <li><b>Project-Workspace-Model.pt-BR.md</b><br><i>Documento fundacional do modelo de workspace, arquivos de estado, índices e registro de projeto.</i></li>
  <li><b>Identifier-Strategy.pt-BR.md</b><br><i>Define Project ID, RID, Title ID e a separação multicamadas de identidade.</i></li>
  <li><b>Renderer-Theme-System.pt-BR.md</b><br><i>Define o contrato de tema como camada que serve a UI real do renderer.</i></li>
  <li><b>Debugging-Philosophy.pt-BR.md</b><br><i>Separa depuração de aplicação e depuração de engine, preservando fronteiras saudáveis.</i></li>
</ul>
<br>
<b>Use esta seção antes de:</b>
<br>
<br>
<ul>
  <li>Criar novos arquivos de estado no workspace</li>
  <li>Alterar a estrutura de <b>.VEP</b></li>
  <li>Adicionar novos identificadores ou metadados persistentes</li>
  <li>Expandir o contrato de tema</li>
  <li>Misturar internals de engine com API pública ou tooling de usuário</li>
</ul>
<br>
</h4>

---

<h3>Leitura de Workflow</h3>

<h4 align="left">
Esses documentos são os mais relevantes quando a decisão envolve
<b>fluxo de trabalho</b>, <b>processo de desenvolvimento</b>,
<b>branching</b>, <b>documentação assistida</b> ou <b>ferramentas de apoio</b>.
<br>
<br>
<ul>
  <li><b>Git-Workflow.pt-BR.md</b><br><i>Define papéis de <b>dev</b>, <b>staging</b> e <b>main</b>.</i></li>
  <li><b>AI-Workflow.pt-BR.md</b><br><i>Define como a IA entra no projeto sem substituir visão, autoria ou responsabilidade.</i></li>
  <li><b>Why-VSCode.pt-BR.md</b><br><i>Define o VS Code como contexto de construção do VE-SDK, e não como identidade do VitaEngine.</i></li>
  <li><b>README.pt-BR.md</b><br><i>Resume o estado atual da branch <b>dev</b> e o posicionamento geral do repositório técnico.</i></li>
</ul>
<br>
<b>Use esta seção antes de:</b>
<br>
<br>
<ul>
  <li>Reorganizar branches</li>
  <li>Mudar o papel de <b>dev</b>, <b>staging</b> ou <b>main</b></li>
  <li>Alterar a estratégia de uso de IA</li>
  <li>Trocar ferramentas externas importantes</li>
  <li>Mudar o tom ou o posicionamento do repositório técnico</li>
</ul>
<br>
</h4>

---

<h3>Leitura de Ecossistema</h3>

<h4 align="left">
Esses documentos explicam como componentes e ferramentas do ecossistema se
encaixam no todo.
<br>
<br>
<ul>
  <li><b>Companion-Plans.pt-BR.md</b><br><i>Define o papel do VitaEngine Companion como ponte entre IDE e hardware real.</i></li>
  <li><b>Why-VSCode.pt-BR.md</b><br><i>Define tooling externo como suporte de viabilização, não como parte do produto final.</i></li>
  <li><b>README.pt-BR.md</b><br><i>Resume o ecossistema técnico atual do VE-SDK na branch <b>dev</b>.</i></li>
</ul>
<br>
<b>Use esta seção antes de:</b>
<br>
<br>
<ul>
  <li>Expandir o papel do Companion</li>
  <li>Adicionar novas integrações desktop ↔ Vita</li>
  <li>Reavaliar dependências externas importantes</li>
  <li>Mudar a forma como o VE-SDK se apresenta em relação ao VitaEngine</li>
</ul>
<br>
</h4>

---

<h3>Leitura Filosófica</h3>

<h4 align="left">
Esses documentos existem para proteger a <b>identidade do projeto</b>.
<br>
<br>
Eles devem ser relidos sempre que o projeto parecer estar:
<br>
<br>
<ul>
  <li>Perdendo coerência</li>
  <li>Escorregando para complexidade desnecessária</li>
  <li>Se afastando do criador final</li>
  <li>Confundindo ferramenta com produto</li>
  <li>Expandindo escopo sem fundamento real</li>
</ul>
<br>
Documentos principais:
<br>
<br>
<ul>
  <li><b>Creative-First-Manifesto.pt-BR.md</b><br><i>Define a filosofia central do VitaEngine como plataforma creative-first.</i></li>
  <li><b>AI-Workflow.pt-BR.md</b><br><i>Define o uso de IA como ferramenta séria, transparente e subordinada à visão humana.</i></li>
  <li><b>Why-VSCode.pt-BR.md</b><br><i>Protege a separação entre contexto de construção e identidade de plataforma.</i></li>
  <li><b>README.pt-BR.md</b><br><i>Serve como âncora pública/técnica de posicionamento da branch <b>dev</b>.</i></li>
</ul>
<br>
</h4>

---

<h3>Documentos fundacionais (alto peso de decisão)</h3>

<h4 align="left">
Se algum desses documentos entrar em revisão, a mudança deve ser tratada com
mais cuidado, porque eles afetam múltiplas camadas do projeto:
<br>
<br>
<ul>
  <li><b>Project-Workspace-Model.pt-BR.md</b></li>
  <li><b>Identifier-Strategy.pt-BR.md</b></li>
  <li><b>Renderer-Theme-System.pt-BR.md</b></li>
  <li><b>Git-Workflow.pt-BR.md</b></li>
  <li><b>Why-VSCode.pt-BR.md</b></li>
</ul>
<br>
<b>Regra prática:</b>
<br>
<br>
<i>Se uma mudança tocar um documento fundacional, ela provavelmente afeta mais do
que parece à primeira vista.</i>
<br>
<br>
</h4>

---

<h3>Documentos de alta identidade (alto peso filosófico)</h3>

<h4 align="left">
Esses documentos não necessariamente definem estruturas técnicas internas, mas
definem <b>o espírito do projeto</b>.
<br>
<br>
<ul>
  <li><b>Creative-First-Manifesto.pt-BR.md</b></li>
  <li><b>AI-Workflow.pt-BR.md</b></li>
  <li><b>Why-VSCode.pt-BR.md</b></li>
  <li><b>README.pt-BR.md</b></li>
</ul>
<br>
<b>Regra prática:</b>
<br>
<br>
<i>Se uma mudança fizer esses documentos perderem coerência, o problema pode não
ser o texto — pode ser a direção do projeto.</i>
<br>
<br>
</h4>

---

<h3>Sequências de releitura por tipo de decisão</h3>

<h4 align="left">
<b>Se a mudança envolver workspace / arquivos / .VEP:</b>
<br>
<br>
<ol>
  <li><b>Project-Workspace-Model.pt-BR.md</b></li>
  <li><b>Identifier-Strategy.pt-BR.md</b></li>
  <li><b>README.pt-BR.md</b></li>
</ol>
<br>

<b>Se a mudança envolver tema / UI / renderer:</b>
<br>
<br>
<ol>
  <li><b>Renderer-Theme-System.pt-BR.md</b></li>
  <li><b>Creative-First-Manifesto.pt-BR.md</b></li>
  <li><b>README.pt-BR.md</b></li>
</ol>
<br>

<b>Se a mudança envolver Companion / deploy / hardware real:</b>
<br>
<br>
<ol>
  <li><b>Companion-Plans.pt-BR.md</b></li>
  <li><b>Debugging-Philosophy.pt-BR.md</b></li>
  <li><b>Creative-First-Manifesto.pt-BR.md</b></li>
</ol>
<br>

<b>Se a mudança envolver tooling externo / VS Code / workflow de IDE:</b>
<br>
<br>
<ol>
  <li><b>Why-VSCode.pt-BR.md</b></li>
  <li><b>Git-Workflow.pt-BR.md</b></li>
  <li><b>README.pt-BR.md</b></li>
</ol>
<br>

<b>Se a mudança envolver documentação assistida por IA ou continuidade:</b>
<br>
<br>
<ol>
  <li><b>AI-Workflow.pt-BR.md</b></li>
  <li><b>Docs-Index.pt-BR.md</b></li>
  <li><b>README.pt-BR.md</b></li>
</ol>
<br>
</h4>

---

<h3>Ordem recomendada para novos documentos futuros</h3>

<h4 align="left">
Se novos documentos forem criados, uma convenção saudável é classificá-los em
uma dessas categorias:
<br>
<br>
<ul>
  <li><b>Fundacional</b> → afeta arquitetura base, identidade estrutural ou contratos centrais</li>
  <li><b>Workflow</b> → afeta processo de desenvolvimento, tooling, branches ou manutenção</li>
  <li><b>Ecossistema</b> → afeta integração entre componentes, apps auxiliares ou fronteiras de plataforma</li>
  <li><b>Filosófico</b> → afeta direção, tom, visão e limites do projeto</li>
</ul>
<br>
Sempre que possível, novos documentos devem:
<br>
<br>
<ul>
  <li>Declarar claramente sua categoria</li>
  <li>Indicar se são <b>fundacionais</b> ou não</li>
  <li>Referenciar quais documentos anteriores são relevantes para sua leitura</li>
  <li>Evitar contradizer silenciosamente documentos mais antigos</li>
</ul>
<br>
</h4>

---

<h3>Recomendação para futuras sessões com IA</h3>

<h4 align="left">
Antes de iniciar uma sessão importante de planejamento, refactor estrutural ou
mudança de direção, é recomendável:
<br>
<br>
<ul>
  <li>Revisar este índice primeiro</li>
  <li>Selecionar os documentos mais relevantes para a mudança pretendida</li>
  <li>Relembrar explicitamente quais decisões já foram cristalizadas</li>
  <li>Evitar começar do zero quando a documentação já contém a base necessária</li>
</ul>
<br>
Regra prática:
<br>
<br>
<b>não use a IA para redescobrir o que já foi cristalizado; use a IA para evoluir
o que já está bem definido.</b>
<br>
<br>
</h4>

---

<h3>Lista atual de documentos (bloco PT-BR)</h3>

<h4 align="left">
<ul>
  <li><b>Project-Workspace-Model.pt-BR.md</b></li>
  <li><b>Identifier-Strategy.pt-BR.md</b></li>
  <li><b>Renderer-Theme-System.pt-BR.md</b></li>
  <li><b>Debugging-Philosophy.pt-BR.md</b></li>
  <li><b>Companion-Plans.pt-BR.md</b></li>
  <li><b>Creative-First-Manifesto.pt-BR.md</b></li>
  <li><b>AI-Workflow.pt-BR.md</b></li>
  <li><b>Git-Workflow.pt-BR.md</b></li>
  <li><b>Why-VSCode.pt-BR.md</b></li>
  <li><b>README.pt-BR.md</b></li>
  <li><b>Docs-Index.pt-BR.md</b></li>
</ul>
<br>
</h4>

---

<h3>Nota final</h3>

<h4 align="left">
Este índice existe porque o VitaEngine já deixou de ser apenas um conjunto de
ideias soltas.
<br>
<br>
Ele agora possui um <b>núcleo documental estruturado</b>, e isso muda a forma
como o projeto pode evoluir.
<br>
<br>
Uma boa documentação não serve apenas para registrar o passado.
Ela também:
<br>
<br>
<ul>
  <li>Preserva decisões boas</li>
  <li>Reduz retrabalho mental</li>
  <li>Diminui o risco de abstração prematura</li>
  <li>Protege a identidade do projeto</li>
  <li>Melhora continuidade entre sessões humanas e assistidas por IA</li>
</ul>
<br>
Se mantido com consistência, este bloco documental pode funcionar como uma das
infraestruturas invisíveis mais valiosas do VitaEngine:
<br>
<br>
<b>não apenas documentação, mas memória arquitetural ativa.</b>
<br>
<br>
</h4>

---

</div>