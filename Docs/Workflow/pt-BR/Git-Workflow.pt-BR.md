<div style="font-family:nunito">

<h2 align="center">
Filosofia de Workflow Git
<br>
<br>
</h2>

<h3>O que é este documento?</h3>

<h4 align="left">
Este documento define a <b>filosofia de workflow Git</b> atualmente usada pelo
<b>VE-SDK</b> (VitaEngine SDK).
<br>
<br>
Seu propósito é tornar os papéis das branches explícitos, reduzir ambiguidade
durante o desenvolvimento e preservar diferentes níveis de legibilidade,
estabilidade e apresentação do projeto.
<br>
<br>
Isso é especialmente importante porque o VitaEngine ainda está em estágio
<b>pre-alpha</b>, onde desenvolvimento ativo, integração executável e apresentação
pública do projeto nem sempre se alinham no mesmo commit.
<br>
<br>
</h4>

---

<h3>Por que usar múltiplas branches?</h3>

<h4 align="left">
O VitaEngine não é apenas um executável único ou uma codebase simples.
<br>
<br>
Mesmo em seus estágios iniciais, ele já envolve múltiplas camadas, como:
<br>
<br>
<ul>
  <li>A IDE desktop</li>
  <li>O workflow de projeto e a estrutura <b>.vep</b></li>
  <li>Scripts de setup e manutenção</li>
  <li>Documentação técnica</li>
  <li>A futura camada de runtime / host</li>
  <li>O aplicativo VitaEngine Companion</li>
</ul>
<br>
Por causa disso, uma única branch acabaria misturando:
<br>
<br>
<ul>
  <li>Código cru em progresso (work in progress)</li>
  <li>O estado executável mais recente</li>
  <li>O estado mais apresentável voltado ao público</li>
</ul>
<br>
Para evitar isso, o projeto atualmente usa três branches com papéis distintos.
<br>
<br>
</h4>

---

<h3>Filosofia das branches</h3>

<h4 align="left">
Em termos simples:
<br>
<br>
<ul>
  <li><b>dev</b> = verdade da construção</li>
  <li><b>staging</b> = verdade da execução</li>
  <li><b>main</b> = verdade da narrativa</li>
</ul>
<br>
Essas branches não foram pensadas para representar diferentes níveis de
maturidade do produto.
Elas representam diferentes <b>responsabilidades de workflow</b>.
<br>
<br>
Isso significa que o VitaEngine ainda pode ser descrito com honestidade como um
<b>projeto pre-alpha</b>, mesmo usando um modelo mais estruturado de múltiplas
branches.
<br>
<br>
</h4>

---

<h3>Papéis das branches</h3>

<h4 align="left">
<b>main</b>
<br>
<br>
<ul>
  <li>Branch oficial de marcos públicos (milestones)</li>
  <li>Branch mais curada e mais apresentável</li>
  <li>Documentação de alto nível e visão geral do projeto</li>
  <li>Melhor ponto de entrada para novos visitantes</li>
  <li>Pode intencionalmente ficar atrás de trabalhos técnicos mais recentes</li>
</ul>
<br>
<b>staging</b>
<br>
<br>
<ul>
  <li>Branch de integração mais recente razoavelmente estável e testável</li>
  <li>Deve representar o estado mais recente que ainda seja significativamente executável</li>
  <li>Melhor branch para inspecionar progresso prático</li>
  <li>Pode estar incompleta, mas idealmente deve continuar inicializável</li>
</ul>
<br>
<b>dev</b>
<br>
<br>
<ul>
  <li>Branch de desenvolvimento ativo do dia a dia</li>
  <li>Branch principal de trabalho para implementação e refactors</li>
  <li>Pode estar instável, incompleta, temporariamente quebrada ou não executável</li>
  <li>Melhor branch para trabalho técnico em baixo nível e mudanças voltadas a contribuidores</li>
</ul>
<br>
</h4>

---

<h3>Expectativas para as branches</h3>

<h4 align="left">
As branches devem ser entendidas da seguinte forma:
<br>
<br>
<ul>
  <li><b>main</b> deve explicar a plataforma</li>
  <li><b>staging</b> deve demonstrar o progresso executável mais recente</li>
  <li><b>dev</b> deve permitir construção ativa, mesmo quando houver quebras temporárias</li>
</ul>
<br>
Por causa disso:
<br>
<br>
<ul>
  <li><b>dev</b> pode quebrar</li>
  <li><b>staging</b> idealmente deve continuar respirando</li>
  <li><b>main</b> deve permanecer coerente e apresentável</li>
</ul>
<br>
</h4>

---

<h3>Maturidade atual do projeto</h3>

<h4 align="left">
<b>Maturidade do projeto:</b> <b>Pre-Alpha</b>
<br>
<br>
Isso importa porque a estrutura de branches não deve ser confundida com
maturidade do produto.
<br>
<br>
A existência de:
<br>
<br>
<ul>
  <li><b>main</b></li>
  <li><b>staging</b></li>
  <li><b>dev</b></li>
</ul>
<br>
<b>não</b> implica que o projeto já esteja em alpha, beta ou forma estável.
<br>
<br>
Significa apenas que o projeto já é grande o suficiente para se beneficiar da
separação entre:
<br>
<br>
<ul>
  <li>apresentação pública</li>
  <li>integração executável</li>
  <li>trabalho bruto de desenvolvimento</li>
</ul>
<br>
</h4>

---

<h3>Workflow recomendado</h3>

<h4 align="left">
O fluxo pretendido é:
<br>
<br>
<ul>
  <li>Trabalhar primariamente em <b>dev</b></li>
  <li>Promover um snapshot executável para <b>staging</b> quando existir um estado adequado</li>
  <li>Promover um snapshot de milestone mais curado para <b>main</b> quando apropriado</li>
</ul>
<br>
Em termos práticos:
<br>
<br>
<ul>
  <li><b>dev</b> é atualizada com frequência</li>
  <li><b>staging</b> é atualizada quando um commit recente ainda é significativamente inicializável</li>
  <li><b>main</b> é atualizada de forma mais seletiva, quando o projeto tem um marco mais limpo que valha a pena apresentar</li>
</ul>
<br>
</h4>

---

<h3>Promovendo um estado executável para staging</h3>

<h4 align="left">
Quando o HEAD atual de <b>dev</b> não for mais adequado para testes ou inspeção,
a abordagem recomendada é:
<br>
<br>
<ul>
  <li>Identificar o commit mais recente em <b>dev</b> que ainda inicializa ou permanece significativamente inspecionável</li>
  <li>Mover <b>staging</b> para esse commit</li>
  <li>Enviar a branch <b>staging</b> atualizada</li>
</ul>
<br>
Isso faz de <b>staging</b> a branch que preserva o estado prático mais recente,
mesmo quando <b>dev</b> está em uma fase transitória ou parcialmente quebrada.
<br>
<br>
</h4>

---

<h3>Promovendo um estado de milestone para main</h3>

<h4 align="left">
A branch <b>main</b> deve ser atualizada com mais cuidado do que <b>staging</b>.
<br>
<br>
Um bom candidato para promoção para <b>main</b> normalmente é um estado que:
<br>
<br>
<ul>
  <li>Pareça coerente como snapshot do projeto</li>
  <li>Tenha documentação que ainda corresponda à estrutura visível</li>
  <li>Represente um marco que valha a pena apresentar publicamente</li>
  <li>Consiga sustentar screenshots, documentação de alto nível ou referências arquiteturais sem parecer enganoso</li>
</ul>
<br>
Isso significa que <b>main</b> pode intencionalmente ficar atrás do estado de
integração mais recente.
Isso é aceitável e esperado.
<br>
<br>
</h4>

---

<h3>Política de force push</h3>

<h4 align="left">
Como <b>staging</b> e, em alguns casos, <b>main</b> podem ser tratadas como
<b>branches de snapshot</b>, pode ser aceitável usar <b>force push</b> quando:
<br>
<br>
<ul>
  <li>A branch estiver sendo movida intencionalmente para um commit específico conhecido como bom</li>
  <li>O objetivo for preservar um snapshot mais claro em vez de um histórico linear estrito</li>
  <li>O papel da branch estiver sendo respeitado como ponto de referência, e não como branch principal de trabalho</li>
</ul>
<br>
No entanto:
<br>
<br>
<ul>
  <li><b>dev</b> normalmente deve permanecer como o histórico contínuo principal de trabalho</li>
  <li>Force push deve ser intencional, e não casual</li>
  <li>Se o projeto algum dia ganhar contribuidores externos regulares, políticas de proteção de branch talvez precisem ser revisitadas</li>
</ul>
<br>
</h4>

---

<h3>Regras de manutenção do README</h3>

<h4 align="left">
Cada branch pode ter seu próprio tom e foco no README.
<br>
<br>
Diretriz recomendada:
<br>
<br>
<ul>
  <li><b>main</b> → mais visual, mais alto nível, mais acessível, mais orientada à apresentação</li>
  <li><b>staging</b> → mais prática, mais atual, orientada a testes, mais clara sobre expectativas de executabilidade</li>
  <li><b>dev</b> → mais direta, mais técnica, mais voltada a contribuidores, mais honesta sobre instabilidade</li>
</ul>
<br>
Mesmo quando o tom mudar, alguns conceitos centrais devem permanecer alinhados
em todas as branches:
<br>
<br>
<ul>
  <li>VE-SDK é o repositório técnico de desenvolvimento do VitaEngine</li>
  <li>O projeto ainda está em <b>pre-alpha</b></li>
  <li>A distribuição final para usuário final é um objetivo separado de longo prazo</li>
  <li>As três branches servem a propósitos diferentes</li>
</ul>
<br>
</h4>

---

<h3>Regra prática de bolso</h3>

<h4 align="left">
Em caso de dúvida:
<br>
<br>
<ul>
  <li>Use <b>dev</b> para construir</li>
  <li>Use <b>staging</b> para validar</li>
  <li>Use <b>main</b> para apresentar</li>
</ul>
<br>
Essa regra simples normalmente já é suficiente para manter o modelo de branches
coerente.
<br>
<br>
</h4>

---

<h3>Nota final</h3>

<h4 align="left">
Este workflow é intencionalmente leve.
<br>
<br>
Ele não foi pensado para simular uma política Git corporativa de grande porte.
Seu propósito é simplesmente dar ao VitaEngine estrutura suficiente para
sustentar:
<br>
<br>
<ul>
  <li>experimentação ativa</li>
  <li>um ponto de referência executável preservado</li>
  <li>um snapshot público coerente do projeto</li>
</ul>
<br>
À medida que o projeto crescer, este documento pode evoluir.
Por enquanto, a prioridade é clareza, e não burocracia.
<br>
<br>
</h4>

---

</div>