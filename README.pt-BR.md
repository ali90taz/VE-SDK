<link href="https://fonts.googleapis.com/css?family=Nunito:400,700" rel="stylesheet">
<div style="font-family:nunito">

<p align="center">
<br>
<img src="./Assets/Logos/veSdkLogo.svg" alt="Ícone do VitaEngine" height="96">
<br>
<br>
</p>

---

<h3>Status da branch</h3>

<h4 align="left">
<b>Esta é a branch ativa de desenvolvimento diário do VE-SDK.</b>
<br>
<br>
A branch <b>dev</b> é a <b>branch principal de trabalho</b> do repositório
técnico do <b>VE-SDK</b> (VitaEngine SDK).
<br>
<br>
É aqui que normalmente acontecem primeiro:
<br>
<br>
<ul>
  <li>Implementação</li>
  <li>Refactors</li>
  <li>Experimentos</li>
  <li>Mudanças estruturais</li>
  <li>Decisões técnicas em nível mais baixo</li>
</ul>
<br>
Como resultado, esta branch pode estar <b>instável</b>, <b>incompleta</b>,
<b>temporariamente quebrada</b> ou até <b>não executável</b>, dependendo da fase
atual de desenvolvimento.
<br>
<br>
Se você está aqui, assuma que está olhando para a
<b>camada técnica mais crua do projeto</b>.
<br>
<br>
</h4>

<h4 align="left">
<b>Maturidade do projeto:</b> <b>Pre-Alpha</b>
<br>
<br>
A organização em branches reflete <b>estrutura de workflow</b>, e não maturidade
final de produto.
<br>
<br>
Mesmo com branches separadas para apresentação, integração e desenvolvimento
ativo, o VitaEngine ainda deve ser considerado um <b>projeto pre-alpha</b>.
<br>
<br>
</h4>

<h4 align="left">
<b>Procurando outra branch?</b>
<br>
<br>
<ul>
  <li><a href="https://github.com/ali90taz/VE-SDK/tree/main"><b>main</b></a> → branch de milestone pública mais curada e apresentável</li>
  <li><a href="https://github.com/ali90taz/VE-SDK/tree/staging"><b>staging</b></a> → branch de integração mais recente razoavelmente estável e testável</li>
  <li><a href="https://github.com/ali90taz/VE-SDK/tree/dev"><b>dev</b></a> → branch ativa de desenvolvimento diário</li>
</ul>
<br>
</h4>

---

<h3>Para que serve esta branch?</h3>

<h4 align="left">
A branch <b>dev</b> existe para:
<br>
<br>
<ul>
  <li><b>Implementação contínua</b></li>
  <li><b>Trabalho arquitetural</b></li>
  <li><b>Refactors</b></li>
  <li><b>Experimentação interna</b></li>
  <li><b>Inspeção técnica em nível mais baixo</b></li>
</ul>
<br>
Esta <b>não</b> é a branch recomendada para testes gerais ou para julgar a
estabilidade de curto prazo do projeto.
<br>
<br>
Se você quer a branch mais recente que ainda tende a permanecer
razoavelmente inicializável, a <b>staging</b> normalmente é a melhor escolha.
<br>
<br>
</h4>

---

<h3>O que é o VitaEngine?</h3>

<h4 align="left">
<b>VitaEngine</b> é uma plataforma open source idealizada para tornar o
desenvolvimento de jogos e aplicações para <b>PS Vita</b> mais acessível,
integrado e amigável ao criador.
<br>
<br>
O objetivo de longo prazo é oferecer um workflow de criação mais direto em
<b>Lua</b>, sustentado por um engine nativo em <b>C++</b> rodando no próprio
console, junto de uma <b>IDE desktop dedicada</b> desenhada em torno do processo
de desenvolvimento.
<br>
<br>
</h4>

---

<h3>O que é o VE-SDK?</h3>

<h4 align="left">
<b>VE-SDK (VitaEngine SDK)</b> é o repositório técnico de desenvolvimento da
própria plataforma VitaEngine.
<br>
<br>
Ele contém a fundação estrutural usada para construir, testar e evoluir a
plataforma, incluindo:
<br>
<br>
<ul>
  <li>Código-fonte</li>
  <li>Scripts e automações</li>
  <li>Dependências e ferramentas de suporte</li>
  <li>Documentação técnica</li>
  <li>Componentes experimentais</li>
  <li>Assets internos e arquivos auxiliares</li>
</ul>
<br>
Este repositório <b>não representa a distribuição final voltada ao usuário final
do VitaEngine</b>.
<br>
<br>
</h4>

---

<h3>VE-SDK e VitaEngine não são a mesma coisa</h3>

<h4 align="left">
Uma distinção importante no estágio atual do projeto é:
<br>
<br>
<ul>
  <li><b>VE-SDK</b> → o ecossistema técnico e o repositório usado para construir o VitaEngine</li>
  <li><b>VitaEngine</b> → a plataforma de longo prazo que está sendo criada por meio desse ecossistema</li>
</ul>
<br>
Isso significa que o <b>VE-SDK</b> pode usar ferramentas fortes e já maduras
para viabilizar o desenvolvimento, enquanto o <b>VitaEngine em si</b> não precisa
herdar essas ferramentas como parte de sua identidade final.
<br>
<br>
Em outras palavras:
<br>
<br>
<b>O VE-SDK é o ambiente de construção.</b>
<br>
<b>O VitaEngine é a plataforma que está sendo construída.</b>
<br>
<br>
</h4>

---

<h3>Sobre o uso atual de VS Code</h3>

<h4 align="left">
No estágio atual, o <b>Visual Studio Code</b> está sendo usado como uma
<b>ferramenta externa de viabilização</b> dentro do workflow do <b>VE-SDK</b>.
<br>
<br>
Ele ajuda a tornar possível a construção do ecossistema técnico que está dando
forma ao VitaEngine, mas <b>não é parte do VitaEngine em si</b>.
<br>
<br>
Isso significa:
<br>
<br>
<ul>
  <li>O VE-SDK pode depender pragmaticamente do VS Code no presente</li>
  <li>O VitaEngine não precisa carregar essa dependência como parte de sua identidade futura</li>
  <li>O uso do VS Code pertence ao contexto de desenvolvimento, e não à definição da plataforma final</li>
</ul>
<br>
O VS Code aqui deve ser entendido como parte do <b>contexto de construção</b>, e
não como parte da <b>identidade final da plataforma</b>.
<br>
<br>
</h4>

---

<h3>Para quem esta branch é voltada?</h3>

<h4 align="left">
A branch <b>dev</b> é voltada principalmente para:
<br>
<br>
<ul>
  <li><b>Contribuidores</b></li>
  <li><b>Usuários tecnicamente curiosos</b></li>
  <li><b>Leitores orientados à arquitetura</b></li>
  <li>Pessoas que querem inspecionar mudanças em nível mais baixo conforme elas acontecem</li>
  <li>Pessoas que entendem que desenvolvimento ativo pode quebrar coisas temporariamente</li>
</ul>
<br>
Se você procura um ponto de entrada mais acessível ou mais orientado a testes, a
<b>staging</b> normalmente é um lugar melhor para começar.
<br>
<br>
</h4>

---

<h3>Expectativas de trabalho</h3>

<h4 align="left">
Nesta branch, é normal que:
<br>
<br>
<ul>
  <li>A estrutura de pastas mude</li>
  <li>Nomenclaturas internas sejam revisadas</li>
  <li>Scripts mudem de lugar ou sejam renomeados</li>
  <li>O fluxo de inicialização fique temporariamente incompleto</li>
  <li>Recursos existam em forma parcial ou transitória</li>
  <li>A aplicação falhe ao iniciar em algumas fases</li>
</ul>
<br>
Isso é esperado e não necessariamente indica regressão na direção mais ampla do
projeto.
<br>
<br>
</h4>

---

<h3>Escopo técnico atual</h3>

<h4 align="left">
Em alto nível, espera-se que a plataforma VitaEngine envolva:
<br>
<br>
<ul>
  <li>Uma <b>IDE desktop dedicada</b></li>
  <li>Um <b>engine/runtime nativo em C++</b> no PS Vita</li>
  <li>Uma <b>API em Lua</b> para lógica de jogos e aplicações</li>
  <li>Um aplicativo <b>VitaEngine Companion</b> para integração de hardware real orientada ao desenvolvimento</li>
  <li>Um workflow de projeto centrado em arquivos <b>.vep</b></li>
  <li>Empacotamento em <b>.VPK</b> para distribuição no PS Vita</li>
</ul>
<br>
Na branch <b>dev</b>, a estrutura exata e os detalhes de implementação podem
mudar com frequência enquanto essas camadas ainda estão sendo moldadas.
<br>
<br>
</h4>

---

<h3>Instalando o VE-SDK</h3>

<h4 align="left">
Esta branch pode incluir scripts de instalação, setup e manutenção usados
durante o desenvolvimento ativo, mas <b>o comportamento do instalador na branch
dev não deve ser assumido como um workflow estável ou validado</b>.
<br>
<br>
Como a <b>dev</b> é o lugar onde mudanças arquiteturais, refactors e
experimentos internos chegam primeiro, rotinas de instalação, estrutura de
pastas, nomes de scripts, dependências e fluxo de inicialização podem mudar
temporariamente sem aviso.
<br>
<br>
Se seu objetivo é testar a branch mais recente que ainda tende a permanecer
razoavelmente inicializável, a <b>staging</b> normalmente é a escolha
recomendada.
<br>
<br>
</h4>

> **🛠️ O VE-SDK é voltado principalmente ao desenvolvimento do próprio VitaEngine, contribuição técnica e inspeção arquitetural — não ao uso final de produção por usuários finais.**

> **⚠️ Aviso: executar scripts remotos pode ser altamente inseguro. Execute arquivos apenas de fontes confiáveis e, sempre que possível, verifique a assinatura/hash antes da execução.**

> **⚠️ Observação adicional para esta branch: rotinas de setup, layout de arquivos e atalhos auxiliares podem mudar com mais frequência na <b>dev</b> do que em outras branches.**

> **✅ Assinatura atual do arquivo Install.zip (SHA-256, pode mudar com mais frequência na dev):  
> 42478EB9BF4360AC56E81D4E5345BE152B54101AA49D90675AA0D600F7DE9A3D**

<h4 align="left">
<em>Arquivo de instalação:
<a href="https://raw.githubusercontent.com/ali90taz/VE-SDK/refs/heads/dev/Install.zip">
Install.zip</a></em>
<br>
</h4>

<h4>Como instalar:</h4>

<h4 align="left">
1. Baixe o <b>Install.zip</b>
<br>
2. Extraia o conteúdo
<br>
3. Execute o <b>Install.lnk</b>
<br>
4. Confirme os prompts
<br>
5. Aguarde o setup automático concluir
<br>
<br>
Se você preferir uma instalação manual ou quiser inspecionar a lógica atual de
setup, consulte:
<br>
<br>
<i>Scripts/Setup/<a href="https://github.com/ali90taz/VE-SDK/blob/dev/Scripts/Setup/Install-VE-SDK.ps1">Install-VE-SDK.ps1</a></i>
<br>
</h4>

---

<h3>FAQ</h3>

<h4 align="left">

<b>P:</b> Esta é a melhor branch para testar o estado atual do projeto?
<br>
<b>R:</b> Normalmente não. A branch <b>dev</b> é a branch de trabalho ativo e pode
estar instável ou temporariamente não executável. Para uma branch mais recente
que ainda tende a permanecer razoavelmente inicializável, a <b>staging</b>
normalmente é a melhor escolha.
<br>
<br>

<b>P:</b> Este repositório já é a forma final recomendada de usar o VitaEngine?
<br>
<b>R:</b> Não. Este repositório representa o <b>VE-SDK</b>, ou seja, a fundação
técnica e o ambiente de desenvolvimento da própria plataforma. O objetivo de
longo prazo é oferecer separadamente uma distribuição do VitaEngine mais
amigável ao usuário final.
<br>
<br>

<b>P:</b> Por que as coisas podem parecer incompletas ou temporariamente quebradas aqui?
<br>
<b>R:</b> Porque esta branch é usada intencionalmente para desenvolvimento ativo,
mudanças estruturais e trabalho transitório. Instabilidade temporária é
esperada.
<br>
<br>

<b>P:</b> O uso atual de VS Code significa que o VitaEngine faz parte do ecossistema do VS Code?
<br>
<b>R:</b> Não. O VS Code está sendo usado como ferramenta de viabilização dentro
do workflow atual do <b>VE-SDK</b>. Ele ajuda a construir o ecossistema técnico
que está dando forma ao VitaEngine, mas <b>não faz parte do VitaEngine em si</b>
nem define sua identidade final.
<br>
<br>

</h4>

---

<h3>Glossário</h3>

<h4 align="left">

<b>VitaEngine Companion</b> : <i>Um aplicativo de PS Vita focado no workflow de
desenvolvimento do VitaEngine, usado como ponte entre a IDE e o hardware real
para preview, testes e funcionalidades auxiliares de desenvolvimento.</i>
<br>

<b>VE</b> : <i>Um alias semântico para VitaEngine, usado como forma abreviada em
contextos técnicos e organizacionais.</i>
<br>

<b>VE-SDK</b> : <i>VitaEngine SDK. A fundação técnica e o ambiente de
desenvolvimento da própria plataforma VitaEngine, voltado a contribuidores,
testes e evolução do engine.</i>
<br>

<b>VEA</b> : <i>VitaEngine Application. Prefixo interno usado por aplicações
criadas com VitaEngine.</i>
<br>

<b>VEP</b> : <i>VitaEngine Project. Extensão de arquivo de projeto usada durante
o desenvolvimento.</i>
<br>
<br>
</h4>

---

<h3>Créditos</h3>

<h4 align="left">
Este projeto usa diversos recursos de terceiros.  
Para mais informações, consulte o arquivo
<a href="https://github.com/ali90taz/VE-SDK/blob/dev/CREDITS.md">
<i>CREDITS.md</i></a>
neste repositório.
<br>
<br>
</h4>

---

<h3>Disclaimer</h3>

<h4 align="left">
<ul>
<li>O VitaEngine <b>não é afiliado, endossado ou licenciado pela Sony Interactive Entertainment</b>.</li>
<li><b>PS Vita</b> é uma marca registrada da Sony Interactive Entertainment.</li>
<li>Nomes, assets e tecnologias de terceiros pertencem aos seus respectivos proprietários.</li>
</ul>
<br>
</h4>

---

</div>