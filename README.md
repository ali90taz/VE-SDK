<div style="font-family:nunito">

<p align="center">
<br>
<img src="./Assets/Logos/veSdkLogo.svg" alt="VitaEngine Icon" height="96">
<br>
<br>
</p>

---

<h3>Branch status</h3>

<h4 align="left">
<b>This is the active day-to-day development branch of VE-SDK.</b>
<br>
<br>
The <b>dev</b> branch is the primary <b>working branch</b> of the VE-SDK 
(VitaEngine SDK) technical repository.
<br>
<br>
This is where implementation, refactors, experiments, structural changes and 
lower-level technical decisions usually happen first.
<br>
<br>
As a result, this branch may be <b>unstable</b>, <b>incomplete</b>, 
<b>temporarily broken</b> or <b>not runnable at all</b> depending on the current 
phase of development.
<br>
<br>
If you are here, you should assume you are looking at the project’s 
<b>rawest technical layer</b>.
<br>
<br>
</h4>

<h4 align="left">
<b>Project maturity:</b> <b>Pre-Alpha</b>
<br>
<br>
Branch organization reflects <b>workflow structure</b>, not final product 
maturity.
<br>
<br>
Even with separate branches for presentation, integration and active 
development, VitaEngine should still be considered a <b>pre-alpha project</b>.
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
</h4>

---

<h3>What is this branch for?</h3>

<h4 align="left">
The <b>dev</b> branch exists for:
<br>
<br>
<ul>
  <li><b>Ongoing implementation</b></li>
  <li><b>Architecture work</b></li>
  <li><b>Refactors</b></li>
  <li><b>Internal experimentation</b></li>
  <li><b>Lower-level technical inspection</b></li>
</ul>
<br>
This is <b>not</b> the recommended branch for general testing or for judging the 
project’s short-term stability.
<br>
<br>
If you want the most recent branch that is still expected to remain reasonably 
launchable, the <b>staging</b> branch is usually the better choice.
<br>
<br>
</h4>

---

<h3>What is VitaEngine?</h3>

<h4 align="left">
<b>VitaEngine</b> is an open source platform envisioned to make <b>PS Vita</b> 
game and application development more accessible, integrated and user-friendly.
<br>
<br>
The long-term goal is to provide a more direct creation workflow in <b>Lua</b>, 
powered by a native <b>C++</b> engine running on the console itself, alongside a 
dedicated <b>desktop IDE</b> designed around the development process.
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
It contains the structural foundation used to build, test and evolve the 
platform, including:
<br>
<br>
<ul>
  <li>Source code</li>
  <li>Scripts and automation</li>
  <li>Dependencies and supporting tools</li>
  <li>Technical documentation</li>
  <li>Experimental components</li>
  <li>Internal assets and support files</li>
</ul>
<br>
This repository <b>does not represent the final end-user distribution of 
VitaEngine</b>.
<br>
<br>
</h4>

---

<h3>Who is this branch for?</h3>

<h4 align="left">
The <b>dev</b> branch is primarily intended for:
<br>
<br>
<ul>
  <li><b>Contributors</b></li>
  <li><b>Technically curious users</b></li>
  <li><b>Architecture-oriented readers</b></li>
  <li>People who want to inspect lower-level changes as they happen</li>
  <li>People who understand that active development may temporarily break things</li>
</ul>
<br>
If you are looking for a more approachable or more test-oriented entry point, 
the <b>staging</b> branch is usually the better place to start.
<br>
<br>
</h4>

---

<h3>Working expectations</h3>

<h4 align="left">
In this branch, it is normal for:
<br>
<br>
<ul>
  <li>Folder structure to change</li>
  <li>Internal naming to be revised</li>
  <li>Scripts to move or be renamed</li>
  <li>Startup flow to be temporarily incomplete</li>
  <li>Features to exist in partial or transitional form</li>
  <li>The application to fail to launch during some phases</li>
</ul>
<br>
This is expected and does not necessarily indicate a regression in the broader 
direction of the project.
<br>
<br>
</h4>

---

<h3>Current technical scope</h3>

<h4 align="left">
At a high level, the VitaEngine platform is expected to involve:
<br>
<br>
<ul>
  <li>A dedicated <b>desktop IDE</b></li>
  <li>A native <b>C++ engine/runtime</b> on PS Vita</li>
  <li>A <b>Lua API</b> for game and application logic</li>
  <li>A <b>VitaEngine Companion</b> application for development-oriented hardware integration</li>
  <li>A project workflow centered around <b>.vep</b> files</li>
  <li>Packaging into <b>.VPK</b> for PS Vita distribution</li>
</ul>
<br>
In the <b>dev</b> branch, the exact structure and implementation details may 
shift frequently while these layers are being actively shaped.
<br>
<br>
</h4>

---

<h3>Installing VE-SDK</h3>

<h4 align="left">
This branch may include installer, setup and maintenance scripts used during 
active development, but <b>installer behavior in the dev branch should not be 
assumed to represent a stable or validated workflow</b>.
<br>
<br>
Because <b>dev</b> is where architectural changes, refactors and internal 
experiments land first, installation routines, folder structure, script names, 
dependencies and startup flow may temporarily change without notice.
<br>
<br>
If your goal is to test the latest branch that is still expected to remain 
reasonably launchable, the <b>staging</b> branch is usually the recommended 
choice instead.
<br>
<br>
</h4>

> **🛠️ VE-SDK is primarily intended for VitaEngine development itself, technical contribution and architecture-oriented inspection — not for end-user production use.**

> **⚠️ Warning: executing remote scripts can be highly unsafe. Only run files from trusted sources and, whenever possible, verify the signature/hash before executing them.**

> **⚠️ Additional note for this branch: setup routines, file layout and helper shortcuts may change more frequently in <b>dev</b> than in other branches.**

> **✅ Current Install.zip file signature (SHA-256, may change more frequently in dev):  
> 42478EB9BF4360AC56E81D4E5345BE152B54101AA49D90675AA0D600F7DE9A3D**

<h4 align="left">
<em>Installation file: 
<a href="https://raw.githubusercontent.com/ali90taz/VE-SDK/refs/heads/dev/Install.zip">
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
If you prefer a manual installation or want to inspect the current setup logic, 
check:
<br>
<br>
<i>Scripts/Setup/<a href="https://github.com/ali90taz/VE-SDK/blob/dev/Scripts/Setup/Install-VE-SDK.ps1">Install-VE-SDK.ps1</a></i>
<br>
</h4>

---

<h3>FAQ</h3>

<h4 align="left">

<b>Q:</b> Is this the best branch for testing the current project state?
<br>
<b>A:</b> Usually no. The <b>dev</b> branch is the active work branch and may be 
unstable or temporarily non-runnable. For a more recent branch that is still 
expected to remain reasonably launchable, the <b>staging</b> branch is usually 
the better choice.
<br>
<br>

<b>Q:</b> Is this repository already the final recommended way to use VitaEngine?
<br>
<b>A:</b> No. This repository represents <b>VE-SDK</b>, meaning the technical 
foundation and development environment of the platform itself. The long-term goal 
is to provide a more user-friendly end-user distribution of VitaEngine separately.
<br>
<br>

<b>Q:</b> Why can things look incomplete or temporarily broken here?
<br>
<b>A:</b> Because this branch is intentionally used for active development, 
structural changes and transitional work. Temporary instability is expected.
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
<a href="https://github.com/ali90taz/VE-SDK/blob/dev/CREDITS.md">
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
