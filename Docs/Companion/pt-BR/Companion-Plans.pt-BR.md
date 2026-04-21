<link href="https://fonts.googleapis.com/css?family=Nunito:400,700" rel="stylesheet">
<div style="font-family:nunito">

<h2 align="center">
Planos para o VitaEngine Companion
<br>
<br>
</h2>

<h4 align="left">
O <b>VitaEngine Companion</b> foi concebido para ser mais do que um simples
aplicativo receptor.
<br>
<br>
Seu papel de longo prazo é atuar como o <b>aplicativo companion no lado do
dispositivo</b> dentro do ecossistema do VitaEngine, ajudando a reduzir a
distância entre o desenvolvimento no desktop e a execução em hardware real do
<b>PlayStation Vita</b>.
<br>
<br>
Este documento existe como uma <b>referência de implementação de longo prazo</b>
e descreve a direção pretendida para o Companion à medida que a plataforma
evolui.
<br>
<br>
</h4>

---

<h3>Nota importante</h3>

<h4 align="left">
As funcionalidades descritas aqui representam <b>planos de longo prazo e metas
de design</b>.
<br>
<br>
A presença delas neste documento <b>não implica disponibilidade imediata</b>,
marcos fixos, implementação garantida ou um roadmap rígido.
<br>
<br>
Este arquivo existe para documentar a <b>visão pretendida</b> do Companion e
ajudar a preservar consistência arquitetural ao longo do tempo.
<br>
<br>
</h4>

---

<h3>Visão central</h3>

<h4 align="left">
O <b>VitaEngine Companion</b> foi planejado como um <b>aplicativo de PS Vita</b>
focado no workflow de desenvolvimento de projetos criados com <b>VitaEngine</b>.
<br>
<br>
Seu propósito não é substituir ferramentas da comunidade, mas oferecer um fluxo
mais <b>integrado</b>, <b>prático</b> e <b>orientado ao desenvolvimento</b>
entre a IDE desktop e o hardware real.
<br>
<br>
Em termos de longo prazo, espera-se que o Companion se torne:
<br>
<br>
<ul>
  <li>Um <b>alvo de preview</b> para projetos em desenvolvimento</li>
  <li>Um <b>receptor de deploy</b> para builds de desenvolvimento e builds empacotadas</li>
  <li>Um <b>gerenciador leve de ciclo de vida</b> para aplicações geradas pelo VitaEngine</li>
  <li>Um <b>utilitário de suporte</b> para iteração e futuros workflows de save handling</li>
</ul>
<br>
</h4>

---

<h3>Filosofia de design</h3>

<h4 align="left">
O Companion foi concebido para seguir um <b>escopo focado</b>.
<br>
<br>
Ele deve:
<br>
<br>
<ul>
  <li><b>Complementar</b>, e não substituir, ferramentas como <b>VitaShell</b></li>
  <li>Priorizar <b>conveniência para o desenvolvedor</b> em projetos VitaEngine</li>
  <li>Evitar se tornar um <b>gerenciador genérico de pacotes</b> ou uma utility ampla de sistema</li>
  <li>Permanecer fortemente alinhado ao <b>ecossistema VitaEngine</b></li>
</ul>
<br>
Por causa disso, operações gerenciadas pelo Companion devem permanecer, sempre
que possível, limitadas a <b>aplicações geradas pelo VitaEngine</b>.
<br>
<br>
</h4>

---

<h3>Responsabilidades de longo prazo</h3>

<h4 align="left">
Com o tempo, o VitaEngine Companion pode evoluir para suportar responsabilidades
como:
<br>
<br>
<ul>
  <li>Receber <b>bundles de desenvolvimento</b> enviados pela IDE do VitaEngine</li>
  <li>Executar <b>preview builds</b> ou <b>builds de desenvolvimento</b> diretamente no hardware</li>
  <li>Receber arquivos <b>.VPK</b> empacotados gerados pelo VitaEngine</li>
  <li>Validar se um pacote pertence ao <b>ecossistema VitaEngine</b></li>
  <li>Instalar pacotes <b>.VPK gerados pelo VitaEngine</b> quando suportados</li>
  <li>Iniciar <b>aplicações VitaEngine</b> instaladas</li>
  <li>Relançar builds recentemente enviadas para acelerar a iteração</li>
</ul>
<br>
Essas responsabilidades formam a base do papel pretendido do Companion como uma
extensão prática do workflow desktop em hardware real.
<br>
<br>
</h4>

---

<h3>Integração planejada de workflow</h3>

<h4 align="left">
Um dos principais objetivos de longo prazo é permitir que a
<b>IDE do VitaEngine</b> e o <b>VitaEngine Companion</b> trabalhem juntos como
parte de um pipeline de deploy mais integrado.
<br>
<br>
Fluxos potencialmente suportados podem incluir:
<br>
<br>
</h4>

<h4>Fluxo de preview de desenvolvimento</h4>

<h4 align="left">
<ul>
  <li>Gerar bundle de desenvolvimento no desktop</li>
  <li>Enviar o bundle para o Companion</li>
  <li>Executar diretamente dentro do ambiente do Companion</li>
  <li>Possivelmente suportar, no futuro, fluxos de reload mais rápidos orientados à iteração</li>
</ul>
<br>
</h4>

<h4>Fluxo de deploy empacotado</h4>

<h4 align="left">
<ul>
  <li>Buildar o projeto</li>
  <li>Empacotar <b>.VPK</b></li>
  <li>Enviar o <b>.VPK</b> para o Companion</li>
  <li>Validar origem e compatibilidade do pacote</li>
  <li>Instalar no dispositivo</li>
  <li>Opcionalmente iniciar logo após a instalação</li>
</ul>
<br>
Essa abordagem foi pensada para reduzir atrito durante testes, ao mesmo tempo em
que preserva compatibilidade com workflows manuais tradicionais quando desejado.
<br>
<br>
</h4>

---

<h3>Instalação de pacotes gerenciada pelo Companion</h3>

<h4 align="left">
Um dos principais objetivos de conveniência no longo prazo é permitir que o
Companion suporte a instalação de pacotes <b>.VPK</b> gerados pelo VitaEngine.
<br>
<br>
Isso não foi pensado para substituir métodos manuais de instalação, mas para
oferecer um <b>workflow integrado opcional</b> para desenvolvedores que desejam
uma experiência de deploy mais fluida diretamente a partir da IDE.
<br>
<br>
</h4>

<h4>Limitação de escopo</h4>

<h4 align="left">
O Companion <b>não foi pensado</b> para se tornar um instalador universal de
pacotes arbitrários.
<br>
<br>
Em vez disso, o suporte à instalação deve permanecer focado em:
<br>
<br>
<ul>
  <li>Arquivos <b>.VPK</b> gerados pelo VitaEngine</li>
  <li>Pacotes que possam ser identificados como parte do <b>ecossistema VitaEngine</b></li>
  <li>Workflows de desenvolvimento e testes relacionados a projetos VitaEngine</li>
</ul>
<br>
Essa limitação ajuda a preservar o escopo pretendido e mantém o Companion
alinhado ao seu papel como ferramenta específica do ecossistema.
<br>
<br>
</h4>

---

<h3>Gerenciamento futuro do ciclo de vida de aplicações</h3>

<h4 align="left">
Além de instalação e execução, o Companion pode eventualmente suportar um
gerenciamento mais amplo do <b>ciclo de vida de aplicações geradas pelo
VitaEngine</b>.
<br>
<br>
Possíveis recursos futuros podem incluir:
<br>
<br>
<ul>
  <li>Listar aplicações VitaEngine instaladas</li>
  <li>Desinstalar aplicações VitaEngine</li>
  <li>Detectar builds previamente enviadas</li>
  <li>Exibir metadados básicos como <b>título</b>, <b>versão</b> ou <b>tipo de build</b></li>
  <li>Gerenciar re-deploy rápido durante iteração</li>
</ul>
<br>
Isso permitiria ao Companion atuar como um gerenciador leve de aplicações
VitaEngine em hardware real.
<br>
<br>
</h4>

---

<h3>Gerenciamento futuro de save data</h3>

<h4 align="left">
Outra possibilidade de longo prazo é oferecer suporte a <b>save data
handling</b> para aplicações geradas pelo VitaEngine.
<br>
<br>
Possíveis capacidades futuras podem incluir:
<br>
<br>
<ul>
  <li>Exportar save data</li>
  <li>Importar ou restaurar save data</li>
  <li>Preservar saves entre test builds</li>
  <li>Resetar save data durante o desenvolvimento</li>
  <li>Dar suporte a uma iteração mais segura em projetos que dependem de estado persistente</li>
</ul>
<br>
Isso pode ser especialmente útil para desenvolvedores testando:
<br>
<br>
<ul>
  <li>Progressão de gameplay</li>
  <li>Sistemas de configurações</li>
  <li>Lógica de estado persistente</li>
  <li>Compatibilidade entre múltiplas builds</li>
</ul>
<br>
Assim como outras funcionalidades do Companion, o gerenciamento de saves foi
concebido apenas para <b>aplicações criadas dentro do ecossistema VitaEngine</b>.
<br>
<br>
</h4>

---

<h3>Identidade de ecossistema e validação</h3>

<h4 align="left">
Para dar suporte a workflows gerenciados pelo Companion de forma segura e
previsível, aplicações geradas pelo VitaEngine podem eventualmente incluir
metadados identificáveis que permitam ao Companion reconhecê-las como pacotes
válidos do ecossistema.
<br>
<br>
Isso pode ser implementado por meio de:
<br>
<br>
<ul>
  <li>Metadados embutidos no pacote</li>
  <li>Um <b>manifesto dedicado do VitaEngine</b></li>
  <li>Identificadores de build</li>
  <li>Informações de versão e compatibilidade</li>
</ul>
<br>
Esses metadados ajudariam o Companion a determinar se um pacote é elegível para:
<br>
<br>
<ul>
  <li>Instalação</li>
  <li>Gerenciamento de ciclo de vida</li>
  <li>Gerenciamento de saves</li>
  <li>Futuras funcionalidades específicas do ecossistema</li>
</ul>
<br>
Espera-se que isso seja uma parte importante de manter o Companion focado,
previsível e alinhado à plataforma.
<br>
<br>
</h4>

---

<h3>O que o Companion <i>não</i> foi pensado para ser</h3>

<h4 align="left">
Para manter seu propósito claro, o Companion atualmente <b>não foi pensado</b>
para se tornar:
<br>
<br>
<ul>
  <li>Um substituto para o <b>VitaShell</b></li>
  <li>Um instalador genérico de <b>.VPK</b> para todo homebrew</li>
  <li>Uma ferramenta completa de gerenciamento do sistema</li>
  <li>Um navegador amplo de arquivos</li>
  <li>Um gerenciador de pacotes de propósito geral fora do ecossistema VitaEngine</li>
</ul>
<br>
Seu papel é intencionalmente mais estreito:
<br>
<br>
<i>Um aplicativo companion focado em melhorar o workflow de desenvolvimento,
deploy e testes de projetos VitaEngine em hardware real.</i>
<br>
<br>
</h4>

---

<h3>Filosofia de implementação</h3>

<h4 align="left">
O VitaEngine Companion foi planejado como um <b>componente de longo prazo</b> e
deve ser desenvolvido de forma incremental.
<br>
<br>
Funcionalidades podem ser introduzidas em estágios, priorizando
<b>praticidade</b> e <b>confiabilidade</b> acima de quantidade de recursos.
<br>
<br>
Um caminho razoável de evolução pode se parecer com:
<br>
<br>
</h4>

<h4>Estágio inicial</h4>

<h4 align="left">
<ul>
  <li>Receber bundles de desenvolvimento</li>
  <li>Executar preview builds</li>
  <li>Receber builds empacotadas</li>
  <li>Iniciar sessões de teste</li>
</ul>
<br>
</h4>

<h4>Estágio intermediário</h4>

<h4 align="left">
<ul>
  <li>Instalar pacotes <b>.VPK</b> gerados pelo VitaEngine</li>
  <li>Relançar builds com mais conveniência</li>
  <li>Melhorar a comunicação com a IDE desktop</li>
</ul>
<br>
</h4>

<h4>Estágio posterior</h4>

<h4 align="left">
<ul>
  <li>Gerenciar aplicações VitaEngine instaladas</li>
  <li>Desinstalar aplicações suportadas</li>
  <li>Dar suporte a workflows de exportação/importação de save data</li>
  <li>Expandir validação e comportamento orientado por metadados</li>
</ul>
<br>
Essa abordagem em estágios ajuda a manter o projeto realista enquanto preserva a
visão de longo prazo.
<br>
<br>
</h4>

---

<h3>Nota final</h3>

<h4 align="left">
O VitaEngine Companion foi concebido como uma parte importante da experiência
mais ampla do <b>VitaEngine</b>.
<br>
<br>
Seu propósito de longo prazo não é apenas <i>receber arquivos</i>, mas se tornar
uma extensão significativa do ambiente desktop em hardware real do
<b>PlayStation Vita</b>:
<br>
<br>
<ul>
  <li>Um <b>alvo de preview</b></li>
  <li>Um <b>receptor de deploy</b></li>
  <li>Um instalador de <b>pacotes gerados pelo VitaEngine</b></li>
  <li>Um <b>gerenciador leve de ciclo de vida</b></li>
  <li>E, futuramente, um utilitário para iteração mais segura e save handling</li>
</ul>
<br>
Se implementado com cuidado, o Companion pode se tornar uma das funcionalidades
que ajudam o VitaEngine a parecer menos uma coleção de ferramentas e mais uma
<b>plataforma de desenvolvimento coesa</b>.
<br>
<br>
</h4>

---

</div>