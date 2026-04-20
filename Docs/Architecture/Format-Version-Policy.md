<div style="font-family:nunito">

<h2 align="center">
Format Version Policy in VitaEngine
</br>
<br>
</h2>

<h4 align="left">
In <b>VitaEngine</b>, every structural file that participates in the engine, IDE 
or workspace workflow is intended to explicitly declare its own 
<b>formatVersion</b>.
<br>
<br>
This policy exists to preserve <b>clarity</b>, <b>compatibility awareness</b> and 
a more controlled evolution of file contracts as the platform grows.
<br>
<br>
Rather than assuming that all files always match the current implementation, 
VitaEngine treats file formats as <b>versioned contracts</b> that may evolve over 
time.
<br>
<br>
</h4>

---

<h3>Implementation status disclaimer</h3>

<h4 align="left">
This document describes the <b>intended format version policy</b> for 
<b>VitaEngine</b>.
<br>
<br>
It should be understood as a <b>structural direction</b> and a 
<b>contract-oriented design policy</b>, not as a guarantee that every part of 
this policy is already fully enforced in the current state of the project.
<br>
<br>
Some parts of this model may already exist, while others may still be partial, 
incremental, or subject to further refinement as the platform matures.
<br>
<br>
Its purpose is to establish a <b>clear long-term rule</b> for how file formats 
should be treated, so future implementation can remain more coherent and easier 
to evolve.
<br>
<br>
</h4>

---

<h3>Core decision</h3>

<h4 align="left">
The current intended direction is:
<br>
<br>
<ul>
  <li>Every structural file that <b>converses with the engine</b> should declare a <b>formatVersion</b></li>
  <li><b>formatVersion</b> should be the <b>first serialized property</b> in the JSON file</li>
  <li>The engine should identify the version by <b>key</b>, not by physical property order</li>
</ul>
<br>
This means the property order is treated as a <b>convention of clarity</b>, not as 
a parsing dependency.
<br>
<br>
</h4>

---

<h3>Why this policy exists</h3>

<h4 align="left">
VitaEngine is still evolving rapidly, and some file formats are expected to 
change as the architecture becomes more stable.
<br>
<br>
Because of that, relying on implicit assumptions about file structure would make 
the ecosystem more fragile over time.
<br>
<br>
By requiring an explicit <b>formatVersion</b>, the platform gains:
<br>
<br>
<ul>
  <li>Clearer file identity</li>
  <li>Safer long-term compatibility handling</li>
  <li>A better foundation for migration or repair flows</li>
  <li>Less ambiguity when formats evolve</li>
</ul>
<br>
</h4>

---

<h3>Scope of the policy</h3>

<h4 align="left">
This policy is intended for <b>structural files</b> that participate in the 
engine, IDE or workspace model.
<br>
<br>
Examples include files such as:
<br>
<br>
<ul>
  <li><b>App.vep</b></li>
  <li><b>ProjectsIndex.json</b></li>
  <li><b>RecentProjects.json</b></li>
  <li><b>ResourceIndex.json</b></li>
  <li><b>ProjectState.json</b></li>
  <li><b>Integrity.json</b></li>
  <li><b>Settings.json</b></li>
  <li><b>Lang.json</b></li>
  <li><b>Links.json</b></li>
</ul>
<br>
In practical terms:
<br>
<br>
<i>If the file has a structural contract that VitaEngine depends on, it should 
have a formatVersion.</i>
<br>
<br>
</h4>

---

<h3>FormatSupport.json</h3>

<h4 align="left">
In addition to each file declaring its own <b>formatVersion</b>, VitaEngine may 
maintain a central compatibility manifest named <b>FormatSupport.json</b>.
<br>
<br>
This file is intended to describe which file format versions the current build 
<b>prefers</b> and which versions it currently <b>supports</b>.
<br>
<br>
Its role is not to replace the file-local version.
<br>
<br>
Instead, the intended model is:
<br>
<br>
<ul>
  <li>The file declares <b>what version it is</b></li>
  <li>The engine declares <b>what versions it accepts</b></li>
</ul>
<br>
This separation helps keep compatibility explicit and provides a cleaner 
foundation for future migration, repair and fallback logic.
<br>
<br>
</h4>

<h4>Illustrative example</h4>

<pre><code style="font-family:nunito">{
  "settingsFile": {
    "preferred": 1,
    "supported": [1]
  },
  "vepFile": {
    "preferred": 1,
    "supported": [1]
  },
  "resourceIndexFile": {
    "preferred": 1,
    "supported": [1]
  }
}</code></pre>

<br>

<h4 align="left">
In this model:
<br>
<br>
<ul>
  <li><b>preferred</b> represents the format version the current build should ideally write or normalize toward</li>
  <li><b>supported</b> represents the format versions the current build is still able to read or accept</li>
</ul>
<br>
This allows compatibility to evolve more safely over time without forcing every 
format change to become an immediate hard break.
<br>
<br>
</h4>

---

<h3>Implementation direction</h3>

<h4 align="left">
The current practical direction is intentionally incremental.
<br>
<br>
All structural files should begin carrying a <b>formatVersion</b> now, even if 
not every file is immediately enforced with the same level of rigor.
<br>
<br>
For the current stage of VitaEngine:
<br>
<br>
<ul>
  <li><b>Critical files</b> should receive real format validation earlier</li>
  <li><b>Rebuildable or convenience files</b> may adopt the version field now and receive stricter handling later</li>
</ul>
<br>
This approach allows the platform to establish the format contract early without 
slowing down progress through premature full enforcement.
<br>
<br>
</h4>

---

<h3>Priority of enforcement</h3>

<h4 align="left">
The first files expected to benefit from stricter version handling are the ones 
with stronger structural impact on the workspace and project model.
<br>
<br>
Typical early candidates include:
<br>
<br>
<ul>
  <li><b>App.vep</b></li>
  <li><b>ProjectsIndex.json</b></li>
  <li><b>ResourceIndex.json</b></li>
  <li><b>ProjectState.json</b></li>
</ul>
<br>
Other files may still carry <b>formatVersion</b> from the beginning, even if 
their handling remains more permissive during earlier development stages.
<br>
<br>
</h4>

---

<h3>Serialization convention</h3>

<h4 align="left">
To keep file identity immediately visible during manual inspection, 
<b>formatVersion</b> is intended to be written as the <b>first property</b> in the 
serialized JSON structure.
<br>
<br>
Example:
<br>
<br>
</h4>

<pre><code style="font-family:nunito">{
  "formatVersion": 1,
  "projectId": "VEP-080426152620",
  "meta": {
    "name": "My Project"
  }
}</code></pre>

<br>

<h4 align="left">
This improves readability in editors, diffs, debugging and manual review.
<br>
<br>
However, the engine should always resolve the field by <b>property name</b>, not 
by assuming positional order.
<br>
<br>
</h4>

---

<h3>Design philosophy</h3>

<h4 align="left">
The long-term intention behind this policy is simple:
<br>
<br>
<b>file formats should be treated as explicit contracts, not as silent assumptions.</b>
<br>
<br>
This helps VitaEngine remain:
<br>
<br>
<ul>
  <li>More predictable as formats evolve</li>
  <li>Less fragile when internal structures change</li>
  <li>Better prepared for migration and repair workflows</li>
  <li>More coherent as a workspace-oriented ecosystem</li>
</ul>
<br>
</h4>

---

<h3>Final note</h3>

<h4 align="left">
The current format version policy is intentionally simple:
<br>
<br>
<ul>
  <li>Every structural file should declare <b>formatVersion</b></li>
  <li><b>formatVersion</b> should appear first in the JSON as a clarity convention</li>
  <li>The engine should validate by <b>key</b>, not by order</li>
  <li><b>FormatSupport.json</b> may act as the build-level compatibility manifest</li>
  <li>Stricter enforcement should begin with the most structurally important files</li>
</ul>
<br>
This policy is not meant to freeze all formats immediately.
<br>
<br>
Its purpose is to establish a <b>clear foundation</b> so VitaEngine can evolve 
its file contracts in a more controlled and maintainable way over time.
<br>
<br>
</h4>

---

</div>