<div style="font-family:nunito">

<h2 align="center">
Planos de Depuração no VitaEngine
<br>
<br>
</h2>

<h4 align="left">
A depuração no <b>VitaEngine</b> foi concebida para seguir uma filosofia
<b>em camadas</b> e <b>orientada por propósito</b>.
<br>
<br>
Em vez de tratar todas as necessidades de depuração como parte de um único
sistema, a direção de longo prazo é distinguir entre
<b>depuração em nível de aplicação</b> e <b>depuração em nível de engine</b>,
com cada uma pertencendo a um escopo diferente dentro do ecossistema do
VitaEngine.
<br>
<br>
Este documento existe como uma <b>referência de implementação de longo prazo</b>
e descreve a direção pretendida para como as responsabilidades de depuração
podem ser separadas ao longo do tempo.
<br>
<br>
</h4>

---

<h3>Nota importante</h3>

<h4 align="left">
As ideias descritas aqui representam <b>planos de longo prazo e intenções de
design</b>.
<br>
<br>
A presença delas neste documento <b>não implica disponibilidade imediata</b>,
marcos fixos, implementação garantida ou um roadmap rígido.
<br>
<br>
Este arquivo existe para preservar a <b>filosofia arquitetural</b> pretendida
para a depuração no VitaEngine e ajudar a manter consistência à medida que a
plataforma evolui.
<br>
<br>
</h4>

---

<h3>Visão central</h3>

<h4 align="left">
O modelo de depuração de longo prazo do VitaEngine foi pensado para se basear em
uma distinção clara entre:
<br>
<br>
<ul>
  <li><b>Depuração de aplicação</b>, focada em projetos criados com VitaEngine</li>
  <li><b>Depuração de engine</b>, focada na implementação interna do próprio VitaEngine</li>
</ul>
<br>
Essa distinção foi pensada para manter a experiência de desenvolvimento mais
coerente, reduzir complexidade desnecessária para criadores de aplicações e
preservar fronteiras arquiteturais mais claras dentro do ecossistema.
<br>
<br>
Em termos práticos, espera-se que o VitaEngine exponha principalmente
ferramentas de depuração voltadas ao <b>comportamento de alto nível da
aplicação</b>, enquanto a depuração do host engine em si deve permanecer como
parte do <b>workflow interno de desenvolvimento do SDK</b>.
<br>
<br>
</h4>

---

<h3>Filosofia de design</h3>

<h4 align="left">
A filosofia de depuração de longo prazo do VitaEngine foi concebida para seguir
uma <b>separação de responsabilidades</b>.
<br>
<br>
Ela deve:
<br>
<br>
<ul>
  <li>Priorizar a <b>depuração de aplicação</b> para os criadores de projetos VitaEngine</li>
  <li>Evitar expor <b>internals de engine em baixo nível</b> desnecessários como parte do fluxo normal</li>
  <li>Preservar uma fronteira clara entre <b>comportamento público do engine</b> e <b>implementação privada do engine</b></li>
  <li>Permitir que o engine evolua internamente sem forçar usuários a depender de sua estrutura interna</li>
</ul>
<br>
Por causa disso, a experiência normal do VitaEngine <b>não foi pensada</b> para
se tornar um debugger de propósito geral para o host engine interno rodando no
dispositivo.
<br>
<br>
</h4>

---

<h3>Depuração de aplicação</h3>

<h4 align="left">
Em termos de longo prazo, a principal experiência de depuração exposta pelo
VitaEngine deve se concentrar na <b>camada de aplicação</b>.
<br>
<br>
Isso inclui a lógica escrita pelo criador do projeto e o comportamento de alto
nível da aplicação dentro do ambiente de runtime do VitaEngine.
<br>
<br>
Possíveis capacidades de longo prazo podem incluir:
<br>
<br>
<ul>
  <li>Reportar erros de execução no lado dos scripts</li>
  <li>Fornecer informações de arquivo-fonte e linha quando disponíveis</li>
  <li>Exibir stack traces relacionados à lógica da aplicação</li>
  <li>Oferecer suporte a fluxo de execução controlado para scripts</li>
  <li>Fornecer visibilidade sobre o estado da aplicação em execução</li>
  <li>Melhorar a iteração durante testes em hardware real</li>
</ul>
<br>
O objetivo dessa camada é ajudar desenvolvedores a entender
<b>o que o projeto deles está fazendo</b>, por que falhou e como se comporta
durante a execução.
<br>
<br>
</h4>

---

<h3>Por que a depuração de aplicação é a prioridade</h3>

<h4 align="left">
Para criadores que usam VitaEngine, a informação de depuração mais valiosa tende
a estar relacionada a:
<br>
<br>
<ul>
  <li>A própria lógica de script deles</li>
  <li>O estado do próprio projeto</li>
  <li>Os assets e o fluxo da aplicação</li>
  <li>A forma como a aplicação interage com a API do VitaEngine</li>
</ul>
<br>
Em outras palavras, o propósito principal da depuração no VitaEngine não é expor
a anatomia interna do engine, mas ajudar o desenvolvedor a entender e melhorar o
comportamento da <b>aplicação que está sendo construída</b>.
<br>
<br>
Isso torna a depuração de aplicação a camada mais prática e mais relevante para
o usuário dentro do modelo geral de depuração.
<br>
<br>
</h4>

---

<h3>Depuração de engine</h3>

<h4 align="left">
A depuração do <b>host engine do VitaEngine em si</b> deve permanecer fora do
escopo do workflow normal de aplicações do VitaEngine.
<br>
<br>
Isso inclui áreas como:
<br>
<br>
<ul>
  <li>Problemas de execução nativa em C ou C++</li>
  <li>Crashes internos do engine</li>
  <li>Problemas relacionados à memória dentro da implementação do engine</li>
  <li>Diagnóstico de rendering, threading ou subsistemas</li>
  <li>Comportamentos de baixo nível associados a internals específicos do Vita</li>
</ul>
<br>
Essas responsabilidades devem pertencer ao <b>ambiente interno de
desenvolvimento do SDK e do engine</b>, onde diagnósticos de baixo nível são
mais apropriados e tecnicamente mais justificáveis.
<br>
<br>
</h4>

---

<h3>Por que a depuração de engine deve permanecer interna</h3>

<h4 align="left">
Existem várias razões de longo prazo para manter a depuração de engine separada
do workflow normal do usuário do VitaEngine.
<br>
<br>
<ul>
  <li>Evita que o fluxo público se torne desnecessariamente complexo</li>
  <li>Evita acoplar criadores de aplicações a detalhes de implementação do engine</li>
  <li>Permite que os internals do engine evoluam com mais liberdade ao longo do tempo</li>
  <li>Mantém a plataforma focada nas necessidades de criadores de projetos, e não de mantenedores do engine</li>
</ul>
<br>
Ao manter essa separação, o VitaEngine pode oferecer uma experiência mais limpa
e mais estável em nível de aplicação, ao mesmo tempo em que preserva a liberdade
de refinar, substituir ou reorganizar sistemas internos do engine quando
necessário.
<br>
<br>
</h4>

---

<h3>Comportamento público versus implementação privada</h3>

<h4 align="left">
Um dos princípios centrais de longo prazo por trás dessa abordagem é que
desenvolvedores usando VitaEngine devem depurar o <b>comportamento exposto pela
plataforma</b>, e não a <b>estrutura interna privada</b> do engine.
<br>
<br>
Isso significa que a experiência de depuração deve permanecer centrada em:
<br>
<br>
<ul>
  <li>Código do projeto</li>
  <li>Comportamento de runtime visível em nível de aplicação</li>
  <li>Erros relacionados à API pública e ao fluxo de execução</li>
  <li>Estado e lógica que pertencem ao próprio projeto</li>
</ul>
<br>
Ao mesmo tempo, detalhes de implementação como agendamento interno do host,
orquestração nativa de subsistemas, internals do renderer ou bindings privados
do engine devem permanecer fora do escopo da depuração de usuário final.
<br>
<br>
</h4>

---

<h3>Relação com o Companion</h3>

<h4 align="left">
À medida que o ecossistema do VitaEngine evoluir, o <b>VitaEngine Companion</b>
pode se tornar uma parte importante do workflow de depuração de aplicações em
hardware real.
<br>
<br>
Em termos de longo prazo, seu papel pode incluir apoio a tarefas de depuração
orientadas à aplicação, como:
<br>
<br>
<ul>
  <li>Ajudar a iniciar sessões de desenvolvimento no dispositivo</li>
  <li>Dar suporte à inspeção do estado de execução da aplicação</li>
  <li>Auxiliar em workflows de teste controlado e iteração</li>
  <li>Participar de futuros fluxos de depuração de alto nível entre desktop e dispositivo</li>
</ul>
<br>
No entanto, mesmo nesse papel, o Companion <b>não foi pensado</b> para se tornar
um debugger geral de baixo nível para o host engine do VitaEngine em si.
<br>
<br>
Seu papel de longo prazo deve permanecer alinhado ao
<b>comportamento da aplicação</b>, e não ao workflow interno de manutenção do
engine.
<br>
<br>
</h4>

---

<h3>O que a depuração no VitaEngine <i>não</i> foi pensada para ser</h3>

<h4 align="left">
Para preservar um escopo claro, a depuração no VitaEngine atualmente
<b>não foi pensada</b> para se tornar:
<br>
<br>
<ul>
  <li>Um debugger nativo completo para o host engine interno no dispositivo</li>
  <li>Uma interface pública para diagnósticos de engine em baixo nível</li>
  <li>Uma ferramenta centrada em detalhes privados de implementação do runtime</li>
  <li>Um substituto para workflows internos de depuração orientados ao SDK</li>
  <li>Um ambiente generalizado de inspeção em baixo nível para desenvolvimento do engine</li>
</ul>
<br>
Seu papel pretendido é mais estreito e mais focado:
<br>
<br>
<i>Uma experiência prática de depuração centrada no comportamento de aplicações
criadas com VitaEngine, enquanto diagnósticos em nível de engine permanecem
dentro do escopo interno de desenvolvimento da plataforma.</i>
<br>
<br>
</h4>

---

<h3>Filosofia de implementação</h3>

<h4 align="left">
O modelo de depuração do VitaEngine foi planejado como uma
<b>direção arquitetural de longo prazo</b> e deve evoluir de forma incremental.
<br>
<br>
Uma progressão razoável de longo prazo pode se parecer com:
<br>
<br>
</h4>

<h4>Estágio inicial</h4>

<h4 align="left">
<ul>
  <li>Relato básico de erros de runtime para aplicações</li>
  <li>Feedback mais claro durante falhas de execução</li>
  <li>Maior visibilidade sobre problemas no lado dos scripts</li>
</ul>
<br>
</h4>

<h4>Estágio intermediário</h4>

<h4 align="left">
<ul>
  <li>Melhor inspeção do estado da aplicação</li>
  <li>Relato mais estruturado do contexto de execução</li>
  <li>Melhor suporte a testes em hardware real por meio do Companion</li>
</ul>
<br>
</h4>

<h4>Estágio posterior</h4>

<h4 align="left">
<ul>
  <li>Workflows mais refinados de depuração orientada à aplicação</li>
  <li>Integração mais forte entre desktop e dispositivo para testes</li>
  <li>Ferramentas expandidas para entender comportamento de runtime em alto nível</li>
</ul>
<br>
Em todos os estágios, a direção pretendida permanece a mesma:
<br>
<br>
<b>a depuração de aplicação pertence à experiência normal do VitaEngine, enquanto
a depuração de engine pertence ao workflow interno de desenvolvimento do SDK e
do engine.</b>
<br>
<br>
</h4>

---

<h3>Nota final</h3>

<h4 align="left">
O objetivo de longo prazo da depuração no VitaEngine não é expor cada detalhe
interno da plataforma, mas fornecer uma compreensão mais clara e mais útil de
como <b>aplicações VitaEngine</b> se comportam durante desenvolvimento e testes.
<br>
<br>
Ao separar <b>depuração de aplicação</b> de <b>depuração de engine</b>, o
VitaEngine pode permanecer mais focado, mais manutenível e mais coerente como
plataforma.
<br>
<br>
Espera-se que essa distinção ajude a preservar um ecossistema mais saudável ao
longo do tempo:
<br>
<br>
<ul>
  <li>Criadores se concentram em construir e depurar suas aplicações</li>
  <li>A plataforma permanece centrada em workflows de desenvolvimento de alto nível</li>
  <li>Diagnósticos internos do engine permanecem onde pertencem: dentro do desenvolvimento do engine</li>
</ul>
<br>
Se mantida com cuidado, essa abordagem pode ajudar o VitaEngine a oferecer uma
experiência de desenvolvimento mais prática e melhor definida, sem borrar a
linha entre <b>usar o engine</b> e <b>manter o engine</b>.
<br>
<br>
</h4>

---

</div>