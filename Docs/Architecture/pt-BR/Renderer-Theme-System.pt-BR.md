<div style="font-family:nunito">

<h2 align="center">
Sistema de Temas do Renderer no VitaEngine
<br>
<br>
</h2>

<h4 align="left">
No <b>VitaEngine</b>, o sistema de temas do renderer foi concebido para fornecer
um <b>contrato visual prático</b> para janelas de UI baseadas em renderer, como
o launcher, o editor e outras futuras superfícies da interface desktop.
<br>
<br>
Em vez de tratar tematização como uma API genérica de estilo ou como um sistema
universal de assets para todo o SDK, a direção atual é definir uma
<b>camada de tema com escopo no renderer</b> que existe para servir a estrutura
real da UI implementada pela aplicação.
<br>
<br>
Isso significa que o sistema de temas foi pensado para:
<br>
<br>
<ul>
  <li>Fornecer valores visuais para superfícies de UI do renderer</li>
  <li>Expor assets com escopo de tema usados pelas janelas do renderer</li>
  <li>Permitir comportamento embutido de dark e light sem forçar abstração prematura</li>
  <li>Permanecer compatível com futuros temas customizados</li>
  <li>Respeitar o CSS como sistema primário de layout e regras estruturais</li>
</ul>
<br>
O princípio central é simples:
<br>
<br>
<b>o sistema de temas existe para servir a UI, e não para ditá-la.</b>
<br>
<br>
</h4>

---

<h3>Aviso sobre o estado de implementação</h3>

<h4 align="left">
Este documento descreve o <b>sistema de temas pretendido para o renderer</b> do
<b>VitaEngine</b>.
<br>
<br>
Ele deve ser entendido como uma <b>direção estrutural</b> e um
<b>modelo de arquitetura visual orientado ao renderer</b>, e não como uma
garantia de que cada parte desse modelo já esteja totalmente implementada no
estado atual do projeto.
<br>
<br>
Alguns aspectos descritos aqui ainda podem estar parciais, planejados ou sujeitos
a evolução à medida que o ecossistema do renderer cresce.
<br>
<br>
Seu propósito é preservar uma <b>filosofia coerente de tematização</b>,
documentar a estrutura atualmente pretendida e orientar decisões futuras de
implementação de forma mais consistente.
<br>
<br>
</h4>

---

<h3>Limite de escopo</h3>

<h4 align="left">
O sistema de temas do renderer foi intencionalmente delimitado às
<b>janelas de UI baseadas em renderer</b> do VitaEngine.
<br>
<br>
Isso inclui preocupações de apresentação visual como:
<br>
<br>
<ul>
  <li>Superfícies da janela do launcher</li>
  <li>Superfícies da janela do editor</li>
  <li>Controles compartilhados da UI do renderer</li>
  <li>Assets visuais voltados ao renderer, como ícones, elementos de branding, wallpapers e visuais decorativos</li>
</ul>
<br>
Este sistema <b>não foi concebido</b> para definir o modelo mais amplo de assets
do SDK.
<br>
<br>
Ele não deve ser entendido como o dono universal de:
<br>
<br>
<ul>
  <li>Assets globais do SDK não relacionados à tematização do renderer</li>
  <li>Assets de aplicações não baseadas em renderer</li>
  <li>Artefatos-fonte de design, como arquivos <b>.ai</b></li>
  <li>Arte final mestre ou arquivos de autoria usados para gerar assets exportados de UI</li>
</ul>
<br>
Em outras palavras:
<br>
<br>
<b>o sistema de temas do renderer governa assets de apresentação do renderer, e
não o domínio completo de assets do ecossistema VitaEngine.</b>
<br>
<br>
</h4>

---

<h3>Filosofia de design</h3>

<h4 align="left">
O sistema de temas do VitaEngine foi intencionalmente concebido como um
<b>contrato prático de UI</b>, e não como uma API abstrata ou especulativa de
tematização.
<br>
<br>
Isso significa que o modelo de tema deve seguir:
<br>
<br>
<ul>
  <li>As superfícies reais de UI implementadas pelo renderer</li>
  <li>Os componentes reais usados por essas janelas</li>
  <li>Os estados visuais reais que precisam variar</li>
  <li>Os assets reais exigidos pela interface do renderer</li>
</ul>
<br>
Ele <b>não</b> deve tentar prever todo caso hipotético de UI futura antes que
esses casos existam.
<br>
<br>
Em vez disso, a filosofia pretendida é:
<br>
<br>
<ul>
  <li><b>Modelar a partir da demanda real da UI</b></li>
  <li><b>Extrair valores compartilhados quando a repetição surgir</b></li>
  <li><b>Permitir que o contrato evolua quando a UI evoluir</b></li>
</ul>
<br>
Essa abordagem é considerada mais saudável do que criar uma API genérica de tema
sem um benefício prático claramente definido.
<br>
<br>
</h4>

---

<h3>Por que o sistema de temas deve seguir a UI</h3>

<h4 align="left">
No VitaEngine, a UI é tratada como o <b>domínio primário</b> e o sistema de temas
é tratado como uma <b>camada secundária de parametrização</b>.
<br>
<br>
Isso significa:
<br>
<br>
<ul>
  <li>A UI define quais superfícies existem</li>
  <li>A UI define quais componentes realmente importam</li>
  <li>A UI define quais assets são necessários para a apresentação</li>
  <li>O sistema de temas se adapta a essas necessidades</li>
</ul>
<br>
Por causa disso, o VitaEngine rejeita intencionalmente a ideia de forçar a UI a
se encaixar em um schema de tema excessivamente genérico.
<br>
<br>
Uma forma mais precisa de descrever a direção pretendida é:
<br>
<br>
<b>os temas do VitaEngine são projetados para a UI, e não o contrário.</b>
<br>
<br>
Isso preserva um alinhamento mais forte entre a implementação do renderer e o
contrato de tema, ao mesmo tempo em que permite que o sistema de temas continue
modular e extensível.
<br>
<br>
</h4>

---

<h3>Modularidade e alinhamento com a UI real</h3>

<h4 align="left">
Seguir a estrutura real da UI <b>não quebra</b> a modularidade.
<br>
<br>
Na verdade, o modelo de tema pretendido para o renderer trata superfícies estáveis
de UI como:
<br>
<br>
<ul>
  <li><b>launcher</b></li>
  <li><b>editor</b></li>
  <li><b>sidebar</b></li>
  <li><b>titleBar</b></li>
  <li><b>footer</b></li>
  <li><b>overlay</b></li>
  <li><b>infoWindow</b></li>
</ul>
<br>
como módulos semânticos legítimos do renderer.
<br>
<br>
Isso é considerado uma modularidade saudável porque o tema mira
<b>superfícies estáveis de UI</b>, e não detalhes frágeis de implementação, como
células de grid, slots arbitrários de layout ou nomes excessivamente específicos
de variáveis CSS.
<br>
<br>
A regra pretendida é:
<br>
<br>
<b>tematização consciente de contexto é aceitável, desde que mire superfícies
estáveis de UI e não detalhes de implementação em baixo nível.</b>
<br>
<br>
</h4>

---

<h3>Modelo de diretório de temas do renderer</h3>

<h4 align="left">
A direção atualmente pretendida é que os temas embutidos vivam sob o diretório
compartilhado de temas do renderer:
<br>
<br>
<i>Renderer/Shared/Themes/</i>
<br>
<br>
Espera-se que cada tema embutido seja representado como um
<b>pacote de tema autocontido</b>.
<br>
<br>
Um exemplo atual de estrutura é:
<br>
<br>
<pre><code style="font-family:nunito">Renderer/
└── Shared/
    └── Themes/
        ├── Themes.json
        └── Dark/
            ├── Theme.json
            ├── Preview.png
            ├── Shared/
            │   └── Assets/
            │       ├── closeButton.png
            │       ├── minimizeButton.png
            │       └── veLogo.png
            ├── Launcher/
            │   └── Assets/
            │       ├── infoIcon.png
            │       ├── psWave.jpg
            │       └── veText.png
            └── Editor/
                └── Assets/
                    └── maximizeButton.png</code></pre>
<br>
Essa estrutura foi pensada para tornar cada pacote de tema:
<br>
<br>
<ul>
  <li>Autocontido</li>
  <li>Fácil de inspecionar</li>
  <li>Fácil de duplicar em futuras variantes embutidas</li>
  <li>Pronto para futuros workflows de temas customizados</li>
</ul>
<br>
</h4>

---

<h3>Por que um único tema embutido é suficiente para o primeiro congelamento</h3>

<h4 align="left">
No estágio atual, o VitaEngine pode intencionalmente manter apenas um único tema
embutido, como:
<br>
<br>
<b>Dark</b>
<br>
<br>
Isso é considerado um primeiro passo saudável porque o objetivo imediato não é
entregar múltiplas variantes visuais de uma só vez, mas sim:
<br>
<br>
<ul>
  <li>Cristalizar a estrutura</li>
  <li>Validar o contrato</li>
  <li>Confirmar que assets, janelas e resolução de tema se comportam corretamente</li>
  <li>Estabelecer um modelo de pacote repetível</li>
</ul>
<br>
Quando a direção estrutural estiver estável, temas embutidos adicionais, como
<b>Light</b>, podem ser adicionados seguindo o mesmo contrato, em vez de exigir
mudanças no próprio sistema.
<br>
<br>
Isso é considerado preferível a expandir prematuramente o catálogo antes que o
modelo tenha sido validado na prática.
<br>
<br>
</h4>

---

<h3>Themes.json</h3>

<h4 align="left">
O <b>Themes.json</b> foi concebido para atuar como o <b>catálogo de temas</b>
apresentado pela UI de configurações do renderer.
<br>
<br>
Seu papel não é definir o contrato visual completo de um tema.
<br>
<br>
Em vez disso, ele foi pensado para fornecer:
<br>
<br>
<ul>
  <li>Descoberta de temas</li>
  <li>Metadados de exibição do tema</li>
  <li>Referências de preview do tema</li>
  <li>Resolução de <b>themeId</b> para o respectivo <b>Theme.json</b></li>
</ul>
<br>
Um exemplo atual inclui informações como:
<br>
<br>
<ul>
  <li><b>themeId</b></li>
  <li><b>name</b></li>
  <li><b>base</b></li>
  <li><b>kind</b></li>
  <li><b>preview</b></li>
  <li><b>path</b></li>
  <li><b>description</b></li>
</ul>
<br>
Esse arquivo deve ser entendido como a <b>camada de catálogo e descoberta</b>, e
não como a definição completa do tema.
<br>
<br>
</h4>

<h4>Exemplo ilustrativo</h4>

<pre><code style="font-family:nunito">{
  "formatVersion": 1,
  "themes": [
    {
      "themeId": "dark",
      "name": "Dark",
      "base": "dark",
      "kind": "built-in",
      "preview": "./Dark/Preview.png",
      "path": "./Dark/Theme.json",
      "description": "Tema escuro padrão."
    }
  ]
}</code></pre>

<h4 align="left">
Essa estrutura atual já está bem alinhada com a direção pretendida para o
catálogo de temas voltado às configurações.
<br>
<br>
</h4>

---

<h3>Por que o Themes.json deve permanecer leve</h3>

<h4 align="left">
Embora o <b>Themes.json</b> possa repetir alguns campos que também existem em
<b>Theme.json</b>, ele deve permanecer intencionalmente leve.
<br>
<br>
Seu papel não é armazenar:
<br>
<br>
<ul>
  <li>Definições completas de cores</li>
  <li>Valores de componentes</li>
  <li>Estilização de superfícies de janela</li>
  <li>Contratos completos de assets</li>
</ul>
<br>
Esses dados pertencem ao próprio pacote de tema.
<br>
<br>
O benefício pretendido dessa separação é que a UI de configurações pode listar e
apresentar temas rapidamente, sem precisar carregar toda definição completa de
cada tema logo de início.
<br>
<br>
</h4>

---

<h3>Theme.json</h3>

<h4 align="left">
O <b>Theme.json</b> foi concebido para ser o <b>contrato visual autoritativo</b>
de um pacote específico de tema do renderer.
<br>
<br>
Seu papel é definir:
<br>
<br>
<ul>
  <li>Identidade do tema</li>
  <li>Valores visuais compartilhados</li>
  <li>Valores visuais específicos por janela</li>
  <li>Referências de assets com escopo de tema</li>
</ul>
<br>
Diferente de <b>Themes.json</b>, espera-se que esse arquivo contenha os dados
reais de tema do renderer usados durante a aplicação do tema.
<br>
<br>
Um exemplo atual já inclui:
<br>
<br>
<ul>
  <li><b>formatVersion</b></li>
  <li><b>themeId</b></li>
  <li><b>name</b></li>
  <li><b>base</b></li>
  <li><b>author</b></li>
  <li><b>shared</b></li>
  <li><b>windows</b></li>
</ul>
<br>
Essa estrutura já está fortemente alinhada com a direção pretendida para a v1.
<br>
<br>
</h4>

<h4>Exemplo ilustrativo</h4>

<pre><code style="font-family:nunito">{
  "formatVersion": 1,
  "themeId": "dark",
  "name": "Dark",
  "base": "dark",
  "author": "VitaEngine Team",
  "shared": {
    "colors": {
      "text": {
        "primary": "#FFFFFF",
        "warning": "#FF8080",
        "link": "#1E90FF",
        "linkHover": "#86C2FF"
      }
    },
    "components": {
      "circleButton": {
        "hoverOpacity": 0.7
      }
    },
    "assets": {
      "windowControls": {
        "minimize": "Shared/Assets/minimizeButton.png",
        "close": "Shared/Assets/closeButton.png"
      },
      "branding": {
        "logoIcon": "Shared/Assets/veLogo.png"
      }
    }
  },
  "windows": {
    "launcher": {
      "shell": {
        "background": {
          "content": "rgba(45,45,45,0.94)"
        }
      },
      "sidebar": {
        "background": "#191919"
      },
      "titleBar": {
        "background": "#444444"
      },
      "footer": {
        "background": "#444444"
      },
      "overlay": {
        "backdrop": "rgba(0,0,0,0.486)"
      },
      "infoWindow": {
        "background": "#2D2D2D"
      },
      "assets": {
        "background": {
          "wallpaper": "Launcher/Assets/psWave.jpg"
        },
        "branding": {
          "logoText": "Launcher/Assets/veText.png"
        },
        "icons": {
          "info": "Launcher/Assets/infoIcon.png"
        }
      }
    }
  }
}</code></pre>

---

<h3>Por que o Theme.json deve seguir a demanda real do renderer</h3>

<h4 align="left">
A direção pretendida é que o <b>Theme.json</b> seja modelado em torno do que a
UI do renderer realmente precisa, e não em torno de uma API universal e
especulativa de tematização.
<br>
<br>
Isso significa que o contrato deve refletir:
<br>
<br>
<ul>
  <li>Janelas reais, como <b>launcher</b> e <b>editor</b></li>
  <li>Superfícies reais de UI, como <b>sidebar</b>, <b>titleBar</b>, <b>footer</b> e <b>overlay</b></li>
  <li>Controles compartilhados reais quando a repetição existir</li>
  <li>Assets reais consumidos pelo renderer</li>
</ul>
<br>
Isso é considerado preferível a construir uma interface genérica de tema sem
ganho prático claramente definido.
<br>
<br>
A regra pretendida é:
<br>
<br>
<b>o Theme.json deve ser moldado pelo que o renderer consome, e não por uma API
teórica de temas.</b>
<br>
<br>
</h4>

---

<h3>Seções compartilhadas vs específicas por janela</h3>

<h4 align="left">
A estrutura atualmente pretendida de <b>Theme.json</b> é baseada em duas camadas
principais:
<br>
<br>
<ul>
  <li><b>shared</b> para valores reutilizados entre múltiplas janelas do renderer</li>
  <li><b>windows</b> para valores visuais e assets com escopo de janela</li>
</ul>
<br>
Essa separação foi pensada para oferecer um equilíbrio mais saudável entre:
<br>
<br>
<ul>
  <li>Consistência</li>
  <li>Reuso</li>
  <li>Especialização local</li>
  <li>Crescimento futuro</li>
</ul>
<br>
A regra pretendida é:
<br>
<br>
<ul>
  <li>Se um valor claramente se repete em múltiplas janelas, ele pertence a <b>shared</b></li>
  <li>Se um valor pertence apenas a uma janela específica ou difere intencionalmente, ele pertence a <b>windows.&lt;nome&gt;</b></li>
</ul>
<br>
Isso mantém o contrato modular sem forçar generalização artificial.
<br>
<br>
</h4>

---

<h3>Assets com escopo de tema</h3>

<h4 align="left">
Uma das características mais importantes da direção atual é que um pacote de
tema pode conter seus próprios <b>assets voltados ao renderer</b>.
<br>
<br>
Isso é considerado benéfico porque:
<br>
<br>
<ul>
  <li>Assets que dependem de contraste ou background podem variar com segurança por tema</li>
  <li>Pacotes de tema permanecem autocontidos</li>
  <li>Nomes de arquivo podem permanecer localmente claros sem exigir unicidade global</li>
  <li>Futuros temas customizados se tornam mais realistas e independentes</li>
</ul>
<br>
Por exemplo:
<br>
<br>
<ul>
  <li>Ícones de controles de janela podem viver em <b>Shared/Assets/</b></li>
  <li>Visuais do launcher podem viver em <b>Launcher/Assets/</b></li>
  <li>Visuais do editor podem viver em <b>Editor/Assets/</b></li>
</ul>
<br>
Isso <b>não</b> significa que todo asset do renderer precise ter escopo de tema.
<br>
<br>
A regra pretendida é:
<br>
<br>
<ul>
  <li>Assets que dependem visualmente do tema podem viver dentro do pacote de tema</li>
  <li>Assets realmente agnósticos ao tema ainda podem permanecer globais se isso continuar mais limpo</li>
</ul>
<br>
No entanto, a direção atual favorece intencionalmente assets com escopo de tema
quando a identidade visual ou o contraste do renderer se beneficiarem disso.
<br>
<br>
</h4>

---

<h3>Por que nomes locais de assets não precisam de unicidade global</h3>

<h4 align="left">
Como o pacote de tema foi pensado para ser uma unidade autocontida e
<b>Theme.json</b> é a fonte autoritativa das referências de assets, os nomes de
arquivo dentro de um pacote de tema não precisam ser globalmente únicos em todo
o renderer.
<br>
<br>
Isso é considerado uma vantagem estrutural.
<br>
<br>
Por exemplo, um pacote de tema pode legitimamente conter arquivos como:
<br>
<br>
<ul>
  <li><b>Preview.png</b></li>
  <li><b>Shared/Assets/closeButton.png</b></li>
  <li><b>Launcher/Assets/infoIcon.png</b></li>
</ul>
<br>
sem exigir nomes globais verbosos como:
<br>
<br>
<ul>
  <li><b>dark-launcher-info-icon-v2.png</b></li>
  <li><b>theme-dark-close-button-main.png</b></li>
</ul>
<br>
O princípio pretendido é:
<br>
<br>
<b>unicidade global não é necessária, mas clareza local continua sendo.</b>
<br>
<br>
</h4>

---

<h3>Temas embutidos e futuros temas customizados</h3>

<h4 align="left">
Um dos benefícios de longo prazo pretendidos pela estrutura atual é que os temas
embutidos já são modelados como <b>pacotes de tema de primeira classe</b>.
<br>
<br>
Isso é importante porque prepara o renderer para futuros temas customizados sem
exigir um contrato separado ou enfraquecido para temas fornecidos pelo usuário.
<br>
<br>
A filosofia pretendida é:
<br>
<br>
<b>temas embutidos devem seguir, sempre que razoavelmente possível, o mesmo
contrato de pacote pretendido para futuros temas customizados.</b>
<br>
<br>
Isso ajuda a preservar:
<br>
<br>
<ul>
  <li>Consistência entre o tratamento de temas embutidos e customizados</li>
  <li>Possibilidades mais limpas de importação e validação de temas no futuro</li>
  <li>Menos privilégio hardcoded para temas embutidos</li>
  <li>Uma arquitetura de renderer mais escalável no longo prazo</li>
</ul>
<br>
</h4>

---

<h3>Política de seleção e resolução de tema</h3>

<h4 align="left">
A direção atualmente pretendida é que o tema ativo do renderer possa ser
resolvido por meio de um modelo simples de prioridade:
<br>
<br>
<ol>
  <li><b>Preferência de tema do workspace</b>, se definida explicitamente</li>
  <li><b>Política de aparência do sistema operacional</b> (dark / light), se não existir preferência explícita no workspace</li>
  <li><b>Fallback interno seguro</b>, se a detecção do sistema não estiver disponível</li>
</ol>
<br>
Isso significa:
<br>
<br>
<ul>
  <li>Uma preferência explícita do workspace deve sobrescrever a aparência do sistema</li>
  <li>Se não houver preferência de workspace, o renderer pode seguir a política de aparência do sistema</li>
  <li>Se a detecção do sistema não estiver disponível, um fallback embutido seguro pode ser usado</li>
</ul>
<br>
Esse comportamento é considerado mais elegante e moderno do que forçar um
default fixo hardcoded em todos os casos.
<br>
<br>
</h4>

---

<h3>Por que o CSS deve permanecer o sistema primário de estilo</h3>

<h4 align="left">
O sistema de temas do renderer <b>não foi concebido para substituir o CSS</b>.
<br>
<br>
Em vez disso, o limite pretendido atualmente é:
<br>
<br>
<ul>
  <li><b>CSS</b> continua responsável por layout, estrutura, espaçamento, posicionamento, regras de interação e composição visual</li>
  <li><b>Theme.json</b> fornece valores de design, valores visuais semânticos e referências de assets com escopo de tema</li>
</ul>
<br>
Isso significa que o sistema de temas deve fornecer valores como:
<br>
<br>
<ul>
  <li>Cores</li>
  <li>Opacidades</li>
  <li>Valores visuais de controles compartilhados</li>
  <li>Valores de superfícies de janela</li>
  <li>Caminhos de assets do tema</li>
</ul>
<br>
enquanto o CSS deve continuar definindo:
<br>
<br>
<ul>
  <li>Layout com grid e flex</li>
  <li>Tamanhos e espaçamento</li>
  <li>Transições e composição de interação</li>
  <li>Comportamento estrutural dos componentes do renderer</li>
</ul>
<br>
Essa separação é considerada mais saudável do que tentar transformar o
<b>Theme.json</b> em um substituto serializado de CSS.
<br>
<br>
</h4>

---

<h3>Como o contrato deve evoluir</h3>

<h4 align="left">
O modelo atual de temas do renderer foi intencionalmente concebido para ser
<b>evolutivo</b>.
<br>
<br>
Isso significa que o contrato de tema não precisa nascer totalmente generalizado
para toda superfície hipotética de UI futura.
<br>
<br>
Em vez disso:
<br>
<br>
<ul>
  <li>Se o renderer ganhar uma nova superfície estável de UI, o contrato pode se expandir para servi-la</li>
  <li>Se valores repetidos surgirem, eles podem ser promovidos para <b>shared</b></li>
  <li>Se uma janela ganhar novos assets voltados ao renderer, esses assets podem ser adicionados à seção relevante da janela</li>
</ul>
<br>
Isso é considerado preferível a forçar abstração prematura para recursos que
ainda nem existem.
<br>
<br>
A regra pretendida é:
<br>
<br>
<b>se novas superfícies de UI surgirem depois, o contrato de tema deve se
expandir para servi-las, em vez de forçar abstração antecipada para casos
hipotéticos.</b>
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
  <li><b>Renderer/Shared/Themes/</b> é a raiz de temas embutidos do renderer</li>
  <li><b>Themes.json</b> é o catálogo de temas voltado às configurações</li>
  <li><b>Theme.json</b> é o contrato visual autoritativo de um pacote de tema</li>
  <li>O pacote embutido inicial atual pode ser apenas <b>Dark</b> enquanto a estrutura é validada</li>
  <li>Pacotes de tema podem incluir seus próprios assets voltados ao renderer</li>
  <li><b>shared</b> armazena valores visuais reutilizáveis</li>
  <li><b>windows</b> armazena valores visuais e assets com escopo de janela</li>
  <li>Pacotes de tema devem ser modelados como unidades de primeira classe compatíveis com futuros temas customizados</li>
  <li>O sistema de temas deve permanecer com escopo nas janelas do renderer, e não no modelo completo de assets do SDK</li>
  <li>O CSS permanece como o sistema primário de estilo estrutural e layout</li>
  <li>O contrato de tema deve crescer a partir de necessidades reais do renderer, e não de abstração especulativa</li>
</ul>
<br>
Esse modelo foi pensado para oferecer um equilíbrio melhor entre:
<br>
<br>
<ul>
  <li>Coerência visual</li>
  <li>Manutenibilidade</li>
  <li>Escalabilidade</li>
  <li>Implementação prática</li>
  <li>Extensibilidade futura de temas</li>
</ul>
<br>
</h4>

---

<h3>Nota final</h3>

<h4 align="left">
O sistema de temas do renderer no VitaEngine não foi pensado como um recurso
decorativo ou puramente cosmético.
<br>
<br>
Ele é uma parte estrutural de como a UI do renderer deve preservar:
<br>
<br>
<ul>
  <li>Consistência visual</li>
  <li>Uma separação mais limpa entre preocupações de apresentação</li>
  <li>Um limite mais saudável entre CSS e dados de tema</li>
  <li>Um modelo de assets mais gerenciável para janelas do renderer</li>
  <li>Um caminho mais forte para suporte futuro a temas embutidos e customizados</li>
</ul>
<br>
Se mantido com consistência, esse modelo deve ajudar o VitaEngine a entregar uma
experiência de renderer que pareça mais intencional, mais polida e mais fácil de
evoluir ao longo do tempo.
<br>
<br>
</h4>

---

</div>