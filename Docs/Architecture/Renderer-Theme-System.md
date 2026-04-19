<div style="font-family:nunito">

<h2 align="center">
Renderer Theme System in VitaEngine
<br>
<br>
</h2>

<h4 align="left">
In <b>VitaEngine</b>, the renderer theme system is intended to provide a
<b>practical visual contract</b> for renderer-based UI windows such as the
launcher, editor and other future desktop interface surfaces.
<br>
<br>
Rather than treating theming as a generic styling API or as a universal asset
system for the entire SDK, the current direction is to define a
<b>renderer-scoped theming layer</b> that exists to serve the actual UI
structure implemented by the application.
<br>
<br>
This means the theme system is intended to:
<br>
<br>
<ul>
  <li>Provide visual values for renderer UI surfaces</li>
  <li>Expose theme-scoped assets used by renderer windows</li>
  <li>Allow built-in dark and light behavior without forcing premature abstraction</li>
  <li>Remain compatible with future custom themes</li>
  <li>Respect CSS as the primary layout and structural rule system</li>
</ul>
<br>
The core principle is simple:
<br>
<br>
<b>the theme system exists to serve the UI, not to dictate it.</b>
<br>
<br>
</h4>

---

<h3>Implementation status disclaimer</h3>

<h4 align="left">
This document describes the <b>intended renderer theme system</b> for
<b>VitaEngine</b>.
<br>
<br>
It should be understood as a <b>structural direction</b> and a
<b>renderer-oriented visual architecture model</b>, not as a guarantee that
every part of this model is already fully implemented in the current state of
the project.
<br>
<br>
Some aspects described here may still be partial, planned, or subject to
evolution as the renderer ecosystem grows.
<br>
<br>
Its purpose is to preserve a <b>coherent theming philosophy</b>, document the
current intended structure, and guide future implementation decisions in a more
consistent way.
<br>
<br>
</h4>

---

<h3>Scope boundary</h3>

<h4 align="left">
The renderer theme system is intentionally scoped to the
<b>renderer-based UI windows</b> of VitaEngine.
<br>
<br>
This includes visual presentation concerns such as:
<br>
<br>
<ul>
  <li>Launcher window surfaces</li>
  <li>Editor window surfaces</li>
  <li>Shared renderer UI controls</li>
  <li>Renderer-facing theme assets such as icons, branding elements, wallpapers and decorative visuals</li>
</ul>
<br>
This system is <b>not intended</b> to define the broader SDK asset model.
<br>
<br>
It should not be understood as the universal owner of:
<br>
<br>
<ul>
  <li>Global SDK assets unrelated to renderer theming</li>
  <li>Non-renderer application assets</li>
  <li>Source design artifacts such as <b>.ai</b> files</li>
  <li>Master artwork or authoring files used to produce exported UI assets</li>
</ul>
<br>
In other words:
<br>
<br>
<b>the renderer theme system governs renderer presentation assets, not the full
asset domain of the VitaEngine ecosystem.</b>
<br>
<br>
</h4>

---

<h3>Design philosophy</h3>

<h4 align="left">
The theme system of VitaEngine is intentionally designed as a
<b>practical UI contract</b>, not as an abstract or speculative theming API.
<br>
<br>
This means the theme model should follow:
<br>
<br>
<ul>
  <li>The real UI surfaces implemented by the renderer</li>
  <li>The real components used by those windows</li>
  <li>The actual visual states that need variation</li>
  <li>The actual assets required by the renderer interface</li>
</ul>
<br>
It should <b>not</b> attempt to predict every hypothetical future UI case before
those cases exist.
<br>
<br>
Instead, the intended philosophy is:
<br>
<br>
<ul>
  <li><b>Model from real UI demand</b></li>
  <li><b>Extract shared values when repetition appears</b></li>
  <li><b>Allow the contract to evolve when the UI evolves</b></li>
</ul>
<br>
This approach is considered healthier than creating a generic theme API without
clear practical benefit.
<br>
<br>
</h4>

---

<h3>Why the theme system should follow the UI</h3>

<h4 align="left">
In VitaEngine, the UI is considered the <b>primary domain</b> and the theme
system is considered a <b>secondary parametrization layer</b>.
<br>
<br>
This means:
<br>
<br>
<ul>
  <li>The UI defines which surfaces exist</li>
  <li>The UI defines which components actually matter</li>
  <li>The UI defines which assets are required for presentation</li>
  <li>The theme system adapts to those needs</li>
</ul>
<br>
Because of that, VitaEngine intentionally rejects the idea of forcing the UI to
fit an overly generic theme schema.
<br>
<br>
A more accurate way to describe the intended direction is:
<br>
<br>
<b>VitaEngine themes are designed for the UI, not the other way around.</b>
<br>
<br>
This preserves stronger alignment between the renderer implementation and the
theme contract, while still allowing the theme system to remain modular and
extensible.
<br>
<br>
</h4>

---

<h3>Modularity and real UI alignment</h3>

<h4 align="left">
Following the real UI structure does <b>not</b> break modularity.
<br>
<br>
In fact, the intended renderer theme model treats stable UI surfaces such as:
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
as legitimate semantic modules of the renderer.
<br>
<br>
This is considered healthy modularity because the theme targets
<b>stable UI surfaces</b>, not fragile implementation details such as grid cells,
arbitrary layout slots or overly specific CSS variable names.
<br>
<br>
The intended rule is:
<br>
<br>
<b>context-aware theming is acceptable as long as it targets stable UI surfaces
rather than low-level implementation details.</b>
<br>
<br>
</h4>

---

<h3>Renderer theme directory model</h3>

<h4 align="left">
The current intended direction is that built-in themes should live under the
renderer shared theme directory:
<br>
<br>
<i>Renderer/Shared/Themes/</i>
<br>
<br>
Each built-in theme is expected to be represented as a self-contained
<b>theme package</b>.
<br>
<br>
A current example structure is:
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
This structure is intended to make each theme package:
<br>
<br>
<ul>
  <li>Self-contained</li>
  <li>Easy to inspect</li>
  <li>Easy to duplicate into future built-in variants</li>
  <li>Ready for future custom theme workflows</li>
</ul>
<br>
</h4>

---

<h3>Why a single built-in theme is enough for the first freeze</h3>

<h4 align="left">
At the current stage, VitaEngine may intentionally keep only a single built-in
theme such as:
<br>
<br>
<b>Dark</b>
<br>
<br>
This is considered a healthy first step because the immediate goal is not to
ship multiple visual variants at once, but to:
<br>
<br>
<ul>
  <li>Crystallize the structure</li>
  <li>Validate the contract</li>
  <li>Confirm that assets, windows and theme resolution behave correctly</li>
  <li>Establish a repeatable package model</li>
</ul>
<br>
Once the structural direction is stable, additional built-in themes such as
<b>Light</b> can be added by following the same contract rather than by changing
the system itself.
<br>
<br>
This is considered preferable to prematurely expanding the catalog before the
model has been validated in practice.
<br>
<br>
</h4>

---

<h3>Themes.json</h3>

<h4 align="left">
<b>Themes.json</b> is intended to act as the <b>theme catalog</b> presented by
the renderer settings UI.
<br>
<br>
Its role is not to define the full visual contract of a theme.
<br>
<br>
Instead, it is intended to provide:
<br>
<br>
<ul>
  <li>Theme discovery</li>
  <li>Theme display metadata</li>
  <li>Theme preview references</li>
  <li>Resolution from <b>themeId</b> to the corresponding <b>Theme.json</b></li>
</ul>
<br>
A current example includes information such as:
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
This file should be understood as the <b>catalog and discovery layer</b>, not as
the full theme definition.
<br>
<br>
</h4>

<h4>Illustrative example</h4>

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
      "description": "Default dark theme."
    }
  ]
}</code></pre>

<h4 align="left">
This current structure is already aligned with the intended direction for the
settings-facing theme catalog.
<br>
<br>
</h4>

---

<h3>Why Themes.json should remain lightweight</h3>

<h4 align="left">
Although <b>Themes.json</b> may repeat a few fields that also exist in
<b>Theme.json</b>, it should remain intentionally lightweight.
<br>
<br>
Its role is not to store:
<br>
<br>
<ul>
  <li>Complete color definitions</li>
  <li>Component values</li>
  <li>Window surface styling</li>
  <li>Full asset contracts</li>
</ul>
<br>
That data belongs to the theme package itself.
<br>
<br>
The intended benefit of this separation is that the settings UI can quickly list
and present themes without loading every full theme definition up front.
<br>
<br>
</h4>

---

<h3>Theme.json</h3>

<h4 align="left">
<b>Theme.json</b> is intended to be the <b>authoritative visual contract</b> of
a specific renderer theme package.
<br>
<br>
Its role is to define:
<br>
<br>
<ul>
  <li>Theme identity</li>
  <li>Shared visual values</li>
  <li>Window-specific visual values</li>
  <li>Theme-scoped asset references</li>
</ul>
<br>
Unlike <b>Themes.json</b>, this file is expected to contain the actual renderer
theme data used during theme application.
<br>
<br>
A current example already includes:
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
This structure is already strongly aligned with the intended v1 direction.
<br>
<br>
</h4>

<h4>Illustrative example</h4>

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
      },
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

<h3>Why Theme.json should follow real renderer demand</h3>

<h4 align="left">
The intended direction is that <b>Theme.json</b> should be modeled around what
the renderer UI actually needs, not around a speculative universal theming API.
<br>
<br>
This means the contract should reflect:
<br>
<br>
<ul>
  <li>Real windows such as <b>launcher</b> and <b>editor</b></li>
  <li>Real UI surfaces such as <b>sidebar</b>, <b>titleBar</b>, <b>footer</b> and <b>overlay</b></li>
  <li>Real shared controls when repetition exists</li>
  <li>Real assets consumed by the renderer</li>
</ul>
<br>
This is considered preferable to building a generic theme interface with no clear
practical gain.
<br>
<br>
The intended rule is:
<br>
<br>
<b>Theme.json should be shaped by what the renderer consumes, not by a
theoretical theme API.</b>
<br>
<br>
</h4>

---

<h3>Shared vs window-specific sections</h3>

<h4 align="left">
The current intended structure of <b>Theme.json</b> is based on two main layers:
<br>
<br>
<ul>
  <li><b>shared</b> for values reused across multiple renderer windows</li>
  <li><b>windows</b> for window-scoped visual values and assets</li>
</ul>
<br>
This separation is intended to provide a healthier balance between:
<br>
<br>
<ul>
  <li>Consistency</li>
  <li>Reuse</li>
  <li>Local specialization</li>
  <li>Future growth</li>
</ul>
<br>
The intended rule is:
<br>
<br>
<ul>
  <li>If a value clearly repeats across multiple windows, it belongs in <b>shared</b></li>
  <li>If a value belongs only to a specific window or differs intentionally, it belongs in <b>windows.&lt;name&gt;</b></li>
</ul>
<br>
This keeps the contract modular without forcing artificial generalization.
<br>
<br>
</h4>

---

<h3>Theme-scoped assets</h3>

<h4 align="left">
One of the most important characteristics of the current direction is that a
theme package may contain its own renderer-facing assets.
<br>
<br>
This is considered beneficial because:
<br>
<br>
<ul>
  <li>Assets that depend on contrast or background can vary safely by theme</li>
  <li>Theme packages remain self-contained</li>
  <li>File names can remain locally clear without requiring global uniqueness</li>
  <li>Future custom themes become more realistic and more independent</li>
</ul>
<br>
For example:
<br>
<br>
<ul>
  <li>Window control icons may live under <b>Shared/Assets/</b></li>
  <li>Launcher visuals may live under <b>Launcher/Assets/</b></li>
  <li>Editor visuals may live under <b>Editor/Assets/</b></li>
</ul>
<br>
This does <b>not</b> mean every asset in the renderer must be theme-scoped.
<br>
<br>
The intended rule is:
<br>
<br>
<ul>
  <li>Assets that are visually theme-dependent may live inside the theme package</li>
  <li>Assets that are truly theme-agnostic may still remain global if that remains cleaner</li>
</ul>
<br>
However, the current direction intentionally favors theme-scoped assets when the
visual identity or contrast of the renderer would benefit from it.
<br>
<br>
</h4>

---

<h3>Why local asset names do not need global uniqueness</h3>

<h4 align="left">
Because the theme package is intended to be a self-contained unit and
<b>Theme.json</b> is the authoritative source of asset references, asset file
names inside a theme package do not need to be globally unique across the
renderer.
<br>
<br>
This is considered a structural advantage.
<br>
<br>
For example, a theme package may legitimately contain files such as:
<br>
<br>
<ul>
  <li><b>Preview.png</b></li>
  <li><b>Shared/Assets/closeButton.png</b></li>
  <li><b>Launcher/Assets/infoIcon.png</b></li>
</ul>
<br>
without requiring verbose global names such as:
<br>
<br>
<ul>
  <li><b>dark-launcher-info-icon-v2.png</b></li>
  <li><b>theme-dark-close-button-main.png</b></li>
</ul>
<br>
The intended principle is:
<br>
<br>
<b>global uniqueness is not required, but local clarity still is.</b>
<br>
<br>
</h4>

---

<h3>Built-in themes and future custom themes</h3>

<h4 align="left">
One of the intended long-term benefits of the current structure is that built-in
themes are already modeled as <b>first-class theme packages</b>.
<br>
<br>
This is important because it prepares the renderer for future custom themes
without requiring a separate or weaker contract for user-provided themes.
<br>
<br>
The intended philosophy is:
<br>
<br>
<b>built-in themes should follow the same package contract intended for future
custom themes whenever reasonably possible.</b>
<br>
<br>
This helps preserve:
<br>
<br>
<ul>
  <li>Consistency between built-in and custom theme handling</li>
  <li>Cleaner theme import and validation possibilities in the future</li>
  <li>Less hardcoded privilege for built-in themes</li>
  <li>A more scalable long-term renderer architecture</li>
</ul>
<br>
</h4>

---

<h3>Theme selection and resolution policy</h3>

<h4 align="left">
The current intended direction is that the active renderer theme may be resolved
through a simple priority model:
<br>
<br>
<ol>
  <li><b>Workspace theme preference</b>, if explicitly defined</li>
  <li><b>Operating system appearance policy</b> (dark / light), if no explicit workspace preference exists</li>
  <li><b>Internal safe fallback</b>, if system detection is unavailable</li>
</ol>
<br>
This means:
<br>
<br>
<ul>
  <li>An explicit workspace preference should override system appearance</li>
  <li>If no workspace preference exists, the renderer may follow the system appearance policy</li>
  <li>If system detection is unavailable, a safe built-in fallback may be used</li>
</ul>
<br>
This is considered a more elegant and modern behavior than forcing a fixed
hardcoded default in all cases.
<br>
<br>
</h4>

---

<h3>Why CSS should remain the primary styling rule system</h3>

<h4 align="left">
The renderer theme system is <b>not intended to replace CSS</b>.
<br>
<br>
Instead, the current intended boundary is:
<br>
<br>
<ul>
  <li><b>CSS</b> remains responsible for layout, structure, spacing, positioning, interaction rules and visual composition</li>
  <li><b>Theme.json</b> provides design values, semantic visual values and theme-scoped asset references</li>
</ul>
<br>
This means the theme system should provide values such as:
<br>
<br>
<ul>
  <li>Colors</li>
  <li>Opacities</li>
  <li>Shared control visual values</li>
  <li>Window surface values</li>
  <li>Theme asset paths</li>
</ul>
<br>
while CSS should continue to define:
<br>
<br>
<ul>
  <li>Grid and flex layout</li>
  <li>Sizing and spacing</li>
  <li>Transitions and interaction composition</li>
  <li>Structural behavior of renderer components</li>
</ul>
<br>
This separation is considered healthier than trying to turn <b>Theme.json</b>
into a serialized CSS replacement.
<br>
<br>
</h4>

---

<h3>How the contract should evolve</h3>

<h4 align="left">
The current renderer theme model is intentionally designed to be
<b>evolutionary</b>.
<br>
<br>
This means the theme contract is not expected to be born fully generalized for
every hypothetical future UI surface.
<br>
<br>
Instead:
<br>
<br>
<ul>
  <li>If the renderer adds a new stable UI surface, the theme contract may expand to serve it</li>
  <li>If repeated values emerge, they may be promoted into <b>shared</b></li>
  <li>If a window gains new renderer-facing assets, those assets may be added to the relevant window section</li>
</ul>
<br>
This is considered preferable to forcing premature abstraction for features that
do not yet exist.
<br>
<br>
The intended rule is:
<br>
<br>
<b>if new UI surfaces appear later, the theme contract should expand to serve
them, rather than forcing early abstraction for hypothetical cases.</b>
<br>
<br>
</h4>

---

<h3>Current intended direction</h3>

<h4 align="left">
The current intended direction can be summarized as:
<br>
<br>
<ul>
  <li><b>Renderer/Shared/Themes/</b> is the built-in renderer theme root</li>
  <li><b>Themes.json</b> is the settings-facing theme catalog</li>
  <li><b>Theme.json</b> is the authoritative visual contract of a theme package</li>
  <li>The current initial built-in package may be <b>Dark</b> only while the structure is being validated</li>
  <li>Theme packages may include their own renderer-facing assets</li>
  <li><b>shared</b> stores reusable visual values</li>
  <li><b>windows</b> stores window-scoped visual values and assets</li>
  <li>Theme packages should be modeled as first-class units compatible with future custom themes</li>
  <li>The theme system should remain scoped to renderer windows, not the full SDK asset model</li>
  <li>CSS remains the primary structural and layout styling system</li>
  <li>The theme contract should grow from real renderer needs rather than speculative abstraction</li>
</ul>
<br>
This model is intended to provide a better balance between:
<br>
<br>
<ul>
  <li>Visual coherence</li>
  <li>Maintainability</li>
  <li>Scalability</li>
  <li>Practical implementation</li>
  <li>Future theme extensibility</li>
</ul>
<br>
</h4>

---

<h3>Final note</h3>

<h4 align="left">
The renderer theme system of VitaEngine is not intended to be a decorative or
purely cosmetic feature.
<br>
<br>
It is a structural part of how the renderer UI is expected to preserve:
<br>
<br>
<ul>
  <li>Visual consistency</li>
  <li>Cleaner separation of presentation concerns</li>
  <li>A healthier boundary between CSS and theme data</li>
  <li>A more manageable asset model for renderer windows</li>
  <li>A stronger path toward future built-in and custom theme support</li>
</ul>
<br>
If maintained consistently, this model should help VitaEngine deliver a renderer
experience that feels more intentional, more polished, and easier to evolve over
time.
<br>
<br>
</h4>

---

</div>