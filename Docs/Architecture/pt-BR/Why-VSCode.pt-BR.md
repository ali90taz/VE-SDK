<div style="font-family:nunito">

<h2 align="center">
Por que VS Code?
<br>
<br>
</h2>

<h3>O que é este documento?</h3>

<h4 align="left">
Este documento explica por que o ecossistema atual do <b>VE-SDK</b> está sendo
desenvolvido usando <b>Visual Studio Code</b> durante os estágios iniciais do
VitaEngine.
<br>
<br>
Seu propósito é esclarecer uma decisão prática de desenvolvimento e evitar que
ela seja interpretada de forma equivocada como uma afirmação sobre a identidade
final da plataforma <b>VitaEngine</b>.
<br>
<br>
</h4>

---

<h3>Resposta curta</h3>

<h4 align="left">
<b>O VE-SDK está sendo desenvolvido atualmente usando VS Code porque ele oferece
um ambiente prático, maduro e eficiente para viabilizar a construção do
VitaEngine durante sua fase pre-alpha.</b>
<br>
<br>
Essa é uma decisão sobre <b>como o VE-SDK está sendo construído neste momento</b>.
Ela <b>não</b> é uma afirmação sobre o que o <b>VitaEngine em si</b> pretende se
tornar.
<br>
<br>
</h4>

---

<h3>O que isso significa — e o que não significa</h3>

<h4 align="left">
Usar <b>VS Code</b> no workflow atual do VE-SDK significa:
<br>
<br>
<ul>
  <li>O VE-SDK se beneficia de um ambiente de desenvolvimento maduro</li>
  <li>O atrito de desenvolvimento é reduzido durante os estágios iniciais do projeto</li>
  <li>O projeto pode avançar mais rápido sem reconstruir infraestrutura já resolvida cedo demais</li>
  <li>O VS Code funciona como uma <b>ferramenta de viabilização</b> para o ecossistema técnico que está construindo o VitaEngine</li>
</ul>
<br>
Isso <b>não</b> significa:
<br>
<br>
<ul>
  <li>Que o VitaEngine pretende se tornar um produto moldado pelo VS Code</li>
  <li>Que o VitaEngine pretende herdar o VS Code como parte de sua identidade final</li>
  <li>Que o VitaEngine pretende carregar conceitos do VS Code para sua experiência final voltada ao usuário</li>
  <li>Que o ambiente host atual do VE-SDK define a visão final da plataforma</li>
  <li>Que o VS Code faz parte do VitaEngine em si</li>
</ul>
<br>
Essa distinção é importante.
<br>
<br>
</h4>

---

<h3>VE-SDK e VitaEngine não são a mesma coisa</h3>

<h4 align="left">
No estágio atual do projeto, é importante separar:
<br>
<br>
<ul>
  <li><b>VE-SDK</b> → o repositório técnico de desenvolvimento e o ecossistema usado para construir o VitaEngine</li>
  <li><b>VitaEngine</b> → a plataforma de longo prazo que está sendo criada por meio desse ecossistema</li>
</ul>
<br>
Por causa disso:
<br>
<br>
<ul>
  <li>O <b>VE-SDK</b> pode usar ferramentas fortes e já existentes para acelerar desenvolvimento</li>
  <li>O <b>VitaEngine</b> não precisa herdar essas ferramentas como parte de sua identidade final de produto</li>
</ul>
<br>
Em termos simples:
<br>
<br>
<b>O VE-SDK pode ser construído com a ajuda do VS Code.</b>
<br>
<b>O VitaEngine em si não deve ser definido pelo VS Code.</b>
<br>
<br>
</h4>

---

<h3>Por que o VS Code faz sentido agora</h3>

<h4 align="left">
Neste estágio, o VS Code oferece várias vantagens que o tornam especialmente
útil para desenvolver o VE-SDK:
<br>
<br>
<ul>
  <li><b>Iteração rápida</b> para JavaScript, Electron, Lua, C/C++ e scripting</li>
  <li><b>Ecossistema maduro de extensões</b> em múltiplas linguagens e workflows</li>
  <li><b>Terminal integrado</b> para setup, scripts e comandos de build</li>
  <li><b>Integração forte com Git</b> para um workflow de projeto com múltiplas branches</li>
  <li><b>Baixo atrito</b> para notas técnicas, documentação e trabalho arquitetural</li>
  <li><b>Excelente encaixe</b> para um projeto que mistura código, scripts, assets e documentação</li>
</ul>
<br>
Em termos práticos, ele é um dos ambientes mais eficientes disponíveis para
construir um projeto que é simultaneamente:
<br>
<br>
<ul>
  <li>uma aplicação desktop</li>
  <li>um ecossistema de tooling</li>
  <li>um SDK intensivo em scripts</li>
  <li>uma futura plataforma de engine/runtime</li>
</ul>
<br>
</h4>

---

<h3>Por que não substituir o VS Code imediatamente?</h3>

<h4 align="left">
Tentar substituir um ambiente de edição maduro cedo demais criaria custo e
atrito desnecessários durante o estágio pre-alpha.
<br>
<br>
Fazer isso agora provavelmente significaria:
<br>
<br>
<ul>
  <li>Maior carga de manutenção</li>
  <li>Iteração mais lenta</li>
  <li>Mais tempo gasto recriando infraestrutura já resolvida</li>
  <li>Menos foco nas partes do VitaEngine que realmente são únicas</li>
  <li>Maior risco de travamento arquitetural prematuro</li>
</ul>
<br>
Neste estágio, o objetivo não é provar independência rejeitando boas
ferramentas.
O objetivo é <b>tornar o VitaEngine real</b>.
<br>
<br>
</h4>

---

<h3>No que o VitaEngine deve focar em vez disso</h3>

<h4 align="left">
O valor único do VitaEngine não vem de substituir a edição de texto em si.
<br>
<br>
Espera-se que seu valor real venha de construir um
<b>ecossistema de criação focado em PS Vita</b>, incluindo áreas como:
<br>
<br>
<ul>
  <li>Estrutura de projeto e workflow <b>.vep</b></li>
  <li>Gerenciamento de projetos orientado ao PS Vita</li>
  <li>Preview e iteração em hardware real</li>
  <li>Integração com o Companion</li>
  <li>Fluxo de empacotamento e deploy</li>
  <li>Uma API de nível mais alto desenhada em torno da criação para Vita</li>
  <li>Um caminho mais direto da ideia até software executável no console</li>
</ul>
<br>
Essas são as partes que mais importam.
<br>
<br>
O VS Code é apenas um ambiente host forte enquanto essas partes ainda estão
sendo construídas.
<br>
<br>
</h4>

---

<h3>Por que “usar VS Code” não é o mesmo que “ser baseado em VS Code”</h3>

<h4 align="left">
O workflow atual do VE-SDK não deve ser interpretado como:
<br>
<br>
<ul>
  <li>“O VitaEngine é uma extensão do VS Code”</li>
  <li>“O VitaEngine deve permanecer acoplado ao VS Code”</li>
  <li>“O VitaEngine vai carregar o VS Code como parte de seu modelo de longo prazo voltado ao usuário”</li>
</ul>
<br>
Uma interpretação mais precisa é:
<br>
<br>
<ul>
  <li>O VS Code é o <b>ambiente host atual</b> usado para construir o VE-SDK</li>
  <li>O VE-SDK é o <b>ecossistema técnico em evolução</b> usado para criar o VitaEngine</li>
  <li>O VitaEngine é a <b>plataforma de longo prazo</b> sendo construída por meio desse processo</li>
</ul>
<br>
Isso significa que o VS Code faz parte do <b>contexto de construção</b>, e não
da <b>identidade final da plataforma</b>.
<br>
<br>
</h4>

---

<h3>Isso não define a identidade final do VitaEngine</h3>

<h4 align="left">
O uso atual de <b>VS Code</b> deve ser entendido estritamente como uma
<b>decisão de estágio de desenvolvimento para o VE-SDK</b>.
<br>
<br>
Ele existe porque o VE-SDK precisa de um ambiente prático, maduro e eficiente
para construir o ecossistema do VitaEngine durante suas fases iniciais.
<br>
<br>
Isso <b>não</b> deve ser interpretado como uma afirmação de que a plataforma
final <b>VitaEngine</b> pretende herdar, depender de ou carregar
conceitualmente partes do ambiente do VS Code.
<br>
<br>
Pelo menos na visão atual, <b>o VitaEngine em si não pretende ser um produto com
forma de VS Code</b>.
<br>
<br>
O papel do VS Code aqui é puramente instrumental:
<br>
<br>
<ul>
  <li>Acelerar o desenvolvimento do VE-SDK</li>
  <li>Reduzir atrito desnecessário durante o estágio pre-alpha</li>
  <li>Evitar reconstruir cedo demais infraestrutura que já existe e funciona bem</li>
</ul>
<br>
Em resumo:
<br>
<br>
<b>O VS Code faz parte de como o VE-SDK está sendo construído hoje.</b>
<br>
<b>Ele não pretende definir o que o VitaEngine em si deve se tornar.</b>
<br>
<br>
</h4>

---

<h3>Nota final</h3>

<h4 align="left">
O VitaEngine não deve tentar provar seu valor rejeitando ferramentas fortes cedo
demais.
<br>
<br>
Ele deve provar seu valor construindo as partes que realmente valem a pena ser
construídas.
<br>
<br>
Neste momento, <b>o VS Code faz parte do andaime que ajuda o VE-SDK a construir
o VitaEngine</b>.
<br>
<br>
Esse andaime não deve ser confundido com a forma final da plataforma.
<br>
<br>
</h4>

---

</div>