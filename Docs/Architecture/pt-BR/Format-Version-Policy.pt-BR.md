<div style="font-family:nunito">

<h2 align="center">
Política de Format Version no VitaEngine
</br>
<br>
</h2>

<h4 align="left">
No <b>VitaEngine</b>, todo arquivo estrutural que participa do fluxo da engine, 
da IDE ou do workspace deve declarar explicitamente seu próprio 
<b>formatVersion</b>.
<br>
<br>
Esta política existe para preservar <b>clareza</b>, <b>consciência de compatibilidade</b> 
e uma evolução mais controlada dos contratos de arquivo à medida que a 
plataforma cresce.
<br>
<br>
Em vez de assumir que todos os arquivos sempre correspondem à implementação 
atual, o VitaEngine trata formatos de arquivo como <b>contratos versionados</b>, 
capazes de evoluir ao longo do tempo.
<br>
<br>
</h4>

---

<h3>Disclaimer de status de implementação</h3>

<h4 align="left">
Este documento descreve a <b>política pretendida de versionamento de formatos</b> 
do <b>VitaEngine</b>.
<br>
<br>
Ele deve ser entendido como uma <b>direção estrutural</b> e uma 
<b>política de design orientada a contratos</b>, e não como garantia de que 
todas as partes desta política já estejam totalmente aplicadas no estado atual 
do projeto.
<br>
<br>
Algumas partes deste modelo já podem existir, enquanto outras ainda podem estar 
parciais, incrementais, ou sujeitas a refinamentos à medida que a plataforma 
amadurece.
<br>
<br>
Seu propósito é estabelecer uma <b>regra clara de longo prazo</b> para como os 
formatos de arquivo devem ser tratados, de modo que a implementação futura possa 
permanecer mais coerente e mais fácil de evoluir.
<br>
<br>
</h4>

---

<h3>Decisão central</h3>

<h4 align="left">
A direção pretendida no momento é:
<br>
<br>
<ul>
  <li>Todo arquivo estrutural que <b>conversa com a engine</b> deve declarar um <b>formatVersion</b></li>
  <li><b>formatVersion</b> deve ser a <b>primeira propriedade serializada</b> no arquivo JSON</li>
  <li>A engine deve identificar a versão pela <b>chave</b>, e não pela posição física da propriedade</li>
</ul>
<br>
Isso significa que a ordem das propriedades é tratada como uma 
<b>convenção de clareza</b>, e não como uma dependência do parsing.
<br>
<br>
</h4>

---

<h3>Por que essa política existe</h3>

<h4 align="left">
O VitaEngine ainda está evoluindo rapidamente, e alguns formatos de arquivo 
devem mudar à medida que a arquitetura se torna mais estável.
<br>
<br>
Por causa disso, depender de suposições implícitas sobre a estrutura dos arquivos 
tornaria o ecossistema mais frágil com o tempo.
<br>
<br>
Ao exigir um <b>formatVersion</b> explícito, a plataforma ganha:
<br>
<br>
<ul>
  <li>Identidade mais clara para cada arquivo</li>
  <li>Compatibilidade de longo prazo mais segura</li>
  <li>Uma base melhor para fluxos de migração ou reparo</li>
  <li>Menos ambiguidade quando os formatos evoluírem</li>
</ul>
<br>
</h4>

---

<h3>Escopo da política</h3>

<h4 align="left">
Esta política é voltada para <b>arquivos estruturais</b> que participam do modelo 
da engine, da IDE ou do workspace.
<br>
<br>
Exemplos incluem arquivos como:
<br>
<br>
<ul>
  <li><b>App.vep</b></li>
  <li><b>ProjectsIndex.json</b></li>
  <li><b>RecentProjects.json</b></li>
  <li><b>ResourceIndex.json</b></li>
  <li><b>ProjectState.json</b></li>
  <li><b>Integrity.json</b></li>
  <li><b>Settings.json</b></li>
  <li><b>Lang.json</b></li>
  <li><b>Links.json</b></li>
</ul>
<br>
Em termos práticos:
<br>
<br>
<i>Se o arquivo possui um contrato estrutural do qual o VitaEngine depende, ele 
deve ter um formatVersion.</i>
<br>
<br>
</h4>

---

<h3>FormatSupport.json</h3>

<h4 align="left">
Além de cada arquivo declarar seu próprio <b>formatVersion</b>, o VitaEngine pode 
manter um manifesto central de compatibilidade chamado <b>FormatSupport.json</b>.
<br>
<br>
Este arquivo existe para descrever quais versões de formato a build atual 
<b>prefere</b> e quais versões ela atualmente <b>suporta</b>.
<br>
<br>
Seu papel não é substituir a versão local do arquivo.
<br>
<br>
Em vez disso, o modelo pretendido é:
<br>
<br>
<ul>
  <li>O arquivo declara <b>qual versão ele é</b></li>
  <li>A engine declara <b>quais versões ela aceita</b></li>
</ul>
<br>
Essa separação mantém a compatibilidade explícita e oferece uma base mais limpa 
para futuras lógicas de migração, reparo e fallback.
<br>
<br>
</h4>

<h4>Exemplo ilustrativo</h4>

<pre><code style="font-family:nunito">{
  "settingsFile": {
    "preferred": 1,
    "supported": [1]
  },
  "vepFile": {
    "preferred": 1,
    "supported": [1]
  },
  "resourceIndexFile": {
    "preferred": 1,
    "supported": [1]
  }
}</code></pre>

<br>

<h4 align="left">
Neste modelo:
<br>
<br>
<ul>
  <li><b>preferred</b> representa a versão de formato que a build atual idealmente deve escrever ou normalizar</li>
  <li><b>supported</b> representa as versões de formato que a build atual ainda é capaz de ler ou aceitar</li>
</ul>
<br>
Isso permite que a compatibilidade evolua de forma mais segura ao longo do tempo, 
sem obrigar toda mudança de formato a se tornar imediatamente uma quebra rígida.
<br>
<br>
</h4>

---

<h3>Direção de implementação</h3>

<h4 align="left">
A direção prática atual é intencionalmente incremental.
<br>
<br>
Todos os arquivos estruturais devem começar a carregar um <b>formatVersion</b> 
desde já, mesmo que nem todos sejam imediatamente validados com o mesmo nível 
de rigor.
<br>
<br>
Para o estágio atual do VitaEngine:
<br>
<br>
<ul>
  <li><b>Arquivos críticos</b> devem receber validação real de formato mais cedo</li>
  <li><b>Arquivos rebuildáveis ou de conveniência</b> podem adotar o campo de versão agora e receber tratamento mais rígido depois</li>
</ul>
<br>
Essa abordagem permite estabelecer o contrato de formato desde cedo sem frear o 
progresso com uma aplicação rígida prematura.
<br>
<br>
</h4>

---

<h3>Prioridade de enforcement</h3>

<h4 align="left">
Os primeiros arquivos que devem receber tratamento mais rigoroso são aqueles com 
maior impacto estrutural no modelo de workspace e projeto.
<br>
<br>
Candidatos naturais para isso incluem:
<br>
<br>
<ul>
  <li><b>App.vep</b></li>
  <li><b>ProjectsIndex.json</b></li>
  <li><b>ResourceIndex.json</b></li>
  <li><b>ProjectState.json</b></li>
</ul>
<br>
Outros arquivos ainda podem carregar <b>formatVersion</b> desde o início, mesmo 
que seu tratamento permaneça mais permissivo nos estágios iniciais de 
desenvolvimento.
<br>
<br>
</h4>

---

<h3>Convenção de serialização</h3>

<h4 align="left">
Para manter a identidade do arquivo imediatamente visível durante inspeção 
manual, o <b>formatVersion</b> deve ser escrito como a <b>primeira propriedade</b> 
na estrutura JSON serializada.
<br>
<br>
Exemplo:
<br>
<br>
</h4>

<pre><code style="font-family:nunito">{
  "formatVersion": 1,
  "projectId": "VEP-080426152620",
  "meta": {
    "name": "Meu Projeto"
  }
}</code></pre>

<br>

<h4 align="left">
Isso melhora a legibilidade em editores, diffs, debugging e revisão manual.
<br>
<br>
No entanto, a engine deve sempre resolver esse campo pelo <b>nome da 
propriedade</b>, e nunca assumir sua posição física.
<br>
<br>
</h4>

---

<h3>Filosofia de design</h3>

<h4 align="left">
A intenção de longo prazo por trás desta política é simples:
<br>
<br>
<b>formatos de arquivo devem ser tratados como contratos explícitos, e não como 
suposições silenciosas.</b>
<br>
<br>
Isso ajuda o VitaEngine a permanecer:
<br>
<br>
<ul>
  <li>Mais previsível à medida que os formatos evoluem</li>
  <li>Menos frágil quando estruturas internas mudam</li>
  <li>Melhor preparado para fluxos de migração e reparo</li>
  <li>Mais coerente como um ecossistema orientado a workspace</li>
</ul>
<br>
</h4>

---

<h3>Nota final</h3>

<h4 align="left">
A política atual de versionamento de formatos é intencionalmente simples:
<br>
<br>
<ul>
  <li>Todo arquivo estrutural deve declarar <b>formatVersion</b></li>
  <li><b>formatVersion</b> deve aparecer primeiro no JSON como convenção de clareza</li>
  <li>A engine deve validar pela <b>chave</b>, e não pela ordem</li>
  <li><b>FormatSupport.json</b> pode atuar como manifesto de compatibilidade da build</li>
  <li>O enforcement mais rígido deve começar pelos arquivos estruturalmente mais importantes</li>
</ul>
<br>
Esta política não existe para congelar todos os formatos imediatamente.
<br>
<br>
Seu propósito é estabelecer uma <b>base clara</b> para que o VitaEngine possa 
evoluir seus contratos de arquivo de forma mais controlada e sustentável ao 
longo do tempo.
<br>
<br>
</h4>

---

</div>