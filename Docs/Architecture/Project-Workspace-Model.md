<div style="font-family:nunito">

<h2 align="center">
Project Workspace Model in VitaEngine
<br>
<br>
</h2>

<h4 align="left">
In <b>VitaEngine</b>, a project is intended to be represented by a small set of
clearly separated layers, each one with a different responsibility.
<br>
<br>
Rather than concentrating all project-related data into a single file or mixing
cache, configuration and project definition together, the long-term direction is
to distinguish between:
<br>
<br>
<ul>
  <li><b>The project contract</b>, represented by <b>App.vep</b></li>
  <li><b>The real project contents</b>, such as <b>Scripts</b> and <b>Assets</b></li>
  <li><b>The internal IDE workspace</b>, represented by the hidden <b>.VEP/</b> directory</li>
</ul>
<br>
This separation is intended to keep the project model cleaner, reduce structural
ambiguity, preserve a clearer boundary between authoritative data and auxiliary
data, and make the ecosystem easier to evolve over time.
<br>
<br>
</h4>

---

<h3>Implementation status disclaimer</h3>

<h4 align="left">
This document describes the <b>intended long-term workspace model</b> for
<b>VitaEngine</b>.
<br>
<br>
It should be understood as an <b>architectural direction</b> and a
<b>long-term execution plan</b>, not as a guarantee that every part of this
model is already fully implemented in the current state of the project.
<br>
<br>
Some aspects described here may still be planned, partial, or subject to
adjustment as the platform matures.
<br>
<br>
Its purpose is to preserve a <b>coherent design philosophy</b>, document the
current intended structure, and help guide future implementation decisions in a
more consistent way.
<br>
<br>
</h4>

---

<h3>Core model</h3>

<h4 align="left">
The current intended VitaEngine project model is based on three distinct layers:
<br>
<br>
<ul>
  <li><b>App.vep</b>, which defines the project itself</li>
  <li><b>Project folders</b>, which contain the actual user content</li>
  <li><b>.VEP/</b>, which stores IDE-managed internal workspace data</li>
</ul>
<br>
These layers are <b>not interchangeable</b> and are not intended to carry the
same level of responsibility.
<br>
<br>
At a high level:
<br>
<br>
<ul>
  <li><b>App.vep</b> is authoritative</li>
  <li><b>Scripts</b> and <b>Assets</b> are the real project contents</li>
  <li><b>.VEP/</b> is operational, auxiliary and rebuildable</li>
</ul>
<br>
This distinction is considered one of the most important structural principles of
the project workspace model.
<br>
<br>
</h4>

---

<h3>App.vep</h3>

<h4 align="left">
<b>App.vep</b> is intended to be the main project manifest of a VitaEngine
project.
<br>
<br>
Its role is to describe the <b>identity</b> and <b>core technical definition</b>
of the project.
<br>
<br>
It is expected to contain information such as:
<br>
<br>
<ul>
  <li>Format version</li>
  <li>Project ID</li>
  <li>Project metadata</li>
  <li>System entry information</li>
  <li>Application mode</li>
  <li>Build or export profiles</li>
</ul>
<br>
This file is intended to be <b>IDE-owned</b>, meaning that it is primarily meant
to be created, edited and maintained by the VitaEngine IDE rather than manually
edited as part of the normal workflow.
<br>
<br>
Because of that, its structure may prioritize consistency, validation and
internal stability over hand-editing convenience.
<br>
<br>
</h4>

<h4>Illustrative example</h4>

<pre><code style="font-family:nunito">{
  "FormatVersion": 1,
  "ProjectId": "VEP-080426152620",
  "Meta": {
    "Name": "Fruit Demence: Blastlicious",
    "Version": "1.0.0",
    "Genre": "Puzzle",
    "Author": "VitaEngine Team"
  },
  "System": {
    "Entry": "./Scripts/Main.lua",
    "AppMode": 0,
    "Profiles": {
      "Debug": {
        "TitleId": null
      },
      "Release": {
        "TitleId": null
      }
    }
  }
}</code></pre>

<h4 align="left">
In this model, <b>App.vep</b> remains focused on the project definition itself,
while auxiliary workspace concerns are kept outside of it.
<br>
<br>
</h4>

---

<h3>Authoritative role of App.vep</h3>

<h4 align="left">
App.vep is intended to be the <b>authoritative project contract</b>.
<br>
<br>
This means that it defines the core shape of the project in a way that may
directly affect:
<br>
<br>
<ul>
  <li>How the project is interpreted by the IDE</li>
  <li>How runtime-related settings are resolved</li>
  <li>How build and packaging workflows behave</li>
  <li>How compatibility and validation should be handled</li>
</ul>
<br>
For that reason, some parts of App.vep should be understood as
<b>structurally sensitive</b>.
<br>
<br>
Examples of fields with potentially stronger implications may include:
<br>
<br>
<ul>
  <li><b>FormatVersion</b></li>
  <li><b>ProjectId</b></li>
  <li><b>System.Entry</b></li>
  <li><b>System.AppMode</b></li>
  <li><b>System.Profiles</b></li>
</ul>
<br>
Changes to fields of this kind may require revalidation, cache invalidation, or
a broader project refresh inside the IDE.
<br>
<br>
</h4>

---

<h3>Project contents</h3>

<h4 align="left">
The actual user content of the project is expected to live in the normal project
folders, such as:
<br>
<br>
<ul>
  <li><b>Scripts/</b></li>
  <li><b>Assets/</b></li>
  <li>Other future project directories as needed</li>
</ul>
<br>
These directories are intended to be the <b>real source of truth</b> for project
content.
<br>
<br>
In practical terms:
<br>
<br>
<ul>
  <li>The project scripts exist because they are present in <b>Scripts/</b></li>
  <li>The project assets exist because they are present in <b>Assets/</b></li>
</ul>
<br>
The IDE may index, classify, cache or interpret those files, but the filesystem
itself remains the authoritative location for the project contents.
<br>
<br>
</h4>

---

<h3>Why assets should not be primarily defined in App.vep</h3>

<h4 align="left">
Although the IDE may maintain auxiliary information about assets, the long-term
direction is that App.vep should <b>not become the canonical inventory of project
files</b>.
<br>
<br>
The main reason is that this would create two competing sources of truth:
<br>
<br>
<ul>
  <li>The real filesystem</li>
  <li>The project manifest</li>
</ul>
<br>
That kind of duplication tends to increase fragility, create synchronization
issues, and make the project model harder to maintain.
<br>
<br>
Instead, project content should continue to be resolved from the actual folder
structure, while auxiliary asset-related information may be stored separately in
IDE-managed workspace data.
<br>
<br>
</h4>

---

<h3>The .VEP workspace</h3>

<h4 align="left">
The hidden <b>.VEP/</b> directory is intended to act as the <b>internal workspace
layer</b> of a VitaEngine project.
<br>
<br>
Its purpose is to store data managed by the IDE itself, such as:
<br>
<br>
<ul>
  <li>Checksums or integrity information</li>
  <li>Asset indexes</li>
  <li>Per-project IDE state</li>
  <li>Other future cache or workspace-related files</li>
</ul>
<br>
This directory is intended to be:
<br>
<br>
<ul>
  <li><b>important for IDE operation</b></li>
  <li><b>not authoritative for project definition</b></li>
  <li><b>safe to rebuild</b></li>
  <li><b>not intended for manual editing</b></li>
</ul>
<br>
In other words, <b>.VEP/</b> is expected to be useful and valuable, but not a
single point of failure for project validity.
<br>
<br>
</h4>

<h4>Illustrative structure</h4>

<pre><code style="font-family:nunito">MyProject/
├── App.vep
├── Scripts/
├── Assets/
└── .VEP/
    ├── Integrity.json
    ├── AssetIndex.json
    └── ProjectState.json</code></pre>

<br>

---

<h3>Why .VEP should remain disposable</h3>

<h4 align="left">
One of the core design intentions behind <b>.VEP/</b> is that it should remain
<b>disposable and self-healing</b>.
<br>
<br>
If the directory is deleted, partially lost or invalidated, the IDE should be
able to recreate it automatically from the real project structure and the
authoritative contents of App.vep.
<br>
<br>
This design is intended to provide several advantages:
<br>
<br>
<ul>
  <li>It prevents the internal workspace from becoming a hard dependency for project validity</li>
  <li>It allows cache and state files to evolve more freely over time</li>
  <li>It keeps the project definition cleaner</li>
  <li>It makes repair and recovery workflows simpler</li>
</ul>
<br>
The long-term expectation is that deleting <b>.VEP/</b> should never destroy the
project itself.
<br>
<br>
At most, it should only remove convenience, cache and local IDE memory until the
workspace is rebuilt.
<br>
<br>
</h4>

---

<h3>Integrity.json</h3>

<h4 align="left">
Inside <b>.VEP/</b>, <b>Integrity.json</b> is intended to provide lightweight
integrity information related to the project manifest.
<br>
<br>
A current example of this idea includes values such as:
<br>
<br>
<ul>
  <li><b>AppChecksum</b></li>
  <li><b>CriticalConfigChecksum</b></li>
  <li><b>LastValidatedUtc</b></li>
</ul>
<br>
This file is intended to help the IDE detect situations such as:
<br>
<br>
<ul>
  <li>External modification of App.vep</li>
  <li>Potential corruption or unexpected edits</li>
  <li>Changes to configuration areas with stronger execution implications</li>
  <li>When internal caches should be invalidated or refreshed</li>
</ul>
<br>
The purpose of this file is not to provide cryptographic security, but to support
consistency validation and more reliable workspace management.
<br>
<br>
</h4>

<h4>Illustrative example</h4>

<pre><code style="font-family:nunito">{
  "AppChecksum": "7A31C8F2",
  "CriticalConfigChecksum": "A91F22BC",
  "LastValidatedUtc": "2026-04-13T18:22:00Z"
}</code></pre>

<br>

---

<h3>Why integrity matters in VitaEngine</h3>

<h4 align="left">
In VitaEngine, the project manifest is not intended to be treated as superficial
metadata.
<br>
<br>
Some of its fields may have meaningful implications for project interpretation,
runtime exposure, validation rules, or build behavior.
<br>
<br>
Because of that, integrity tracking is considered especially valuable for fields
that can affect:
<br>
<br>
<ul>
  <li>Execution assumptions</li>
  <li>Project compatibility interpretation</li>
  <li>Available API behavior</li>
  <li>Profile-related export or deploy behavior</li>
</ul>
<br>
This is one of the reasons why integrity information is considered worth keeping
as part of the internal workspace model.
<br>
<br>
</h4>

---

<h3>AssetIndex.json</h3>

<h4 align="left">
<b>AssetIndex.json</b> is intended to provide a lightweight, IDE-managed view of
the assets currently present in the project.
<br>
<br>
A current example includes information such as:
<br>
<br>
<ul>
  <li><b>Path</b></li>
  <li><b>Type</b></li>
  <li><b>Size</b></li>
  <li><b>LastWriteTimeUtc</b></li>
</ul>
<br>
Its role is not to redefine what assets exist, but to help the IDE perform tasks
such as:
<br>
<br>
<ul>
  <li>Fast asset indexing</li>
  <li>Lightweight change detection</li>
  <li>Reimport or refresh decisions</li>
  <li>Cache invalidation</li>
  <li>Editor-side browsing support</li>
</ul>
<br>
This file should be understood as a <b>derived workspace artifact</b>, not as the
canonical definition of the project’s contents.
<br>
<br>
</h4>

<h4>Illustrative example</h4>

<pre><code style="font-family:nunito">{
  "FormatVersion": 1,
  "Assets": [
    {
      "Path": "Assets/Images/Logo.png",
      "Type": 0,
      "Size": 48231,
      "LastWriteTimeUtc": "2026-04-13T18:45:12Z"
    }
  ]
}</code></pre>

<br>

---

<h3>Why asset validation should remain lightweight</h3>

<h4 align="left">
The current intended direction is that asset validation should remain
<b>lightweight and pragmatic</b>.
<br>
<br>
Rather than performing expensive deep verification on every asset every time, the
IDE may rely primarily on inexpensive signals such as:
<br>
<br>
<ul>
  <li>File presence</li>
  <li>Path changes</li>
  <li>File size</li>
  <li>Last write time</li>
</ul>
<br>
This approach is intended to provide a good balance between:
<br>
<br>
<ul>
  <li>Responsiveness</li>
  <li>Incremental refresh</li>
  <li>Reasonable consistency checking</li>
  <li>Lower overhead during normal project use</li>
</ul>
<br>
Deeper verification may still become appropriate in specific future situations,
but the normal workspace model is not intended to depend on heavy validation for
every asset at all times.
<br>
<br>
</h4>

---

<h3>ProjectState.json</h3>

<h4 align="left">
<b>ProjectState.json</b> is intended to store the <b>working memory</b> of the IDE
for a specific project.
<br>
<br>
A current example includes sections such as:
<br>
<br>
<ul>
  <li><b>Session</b></li>
  <li><b>Layout</b></li>
  <li><b>Explorer</b></li>
</ul>
<br>
This file may contain information such as:
<br>
<br>
<ul>
  <li>Last opened script</li>
  <li>Last selected profile</li>
  <li>Last run target</li>
  <li>Explorer expansion state</li>
  <li>Selected path</li>
  <li>Panel sizes or layout information</li>
</ul>
<br>
Its role is to preserve <b>per-project IDE continuity</b>, not to define the
project itself.
<br>
<br>
</h4>

<h4>Illustrative example</h4>

<pre><code style="font-family:nunito">{
  "FormatVersion": 1,
  "Session": {
    "LastOpenedScript": "./Scripts/Main.lua",
    "LastProfile": "Debug",
    "LastRunTarget": "Companion"
  },
  "Layout": {
    "LeftPanelWidth": 280,
    "RightPanelWidth": 320,
    "BottomPanelHeight": 220
  },
  "Explorer": {
    "ExpandedFolders": [
      "./Scripts",
      "./Assets/Images"
    ],
    "SelectedPath": "./Scripts/Main.lua"
  }
}</code></pre>

<br>

---

<h3>Why per-project state matters</h3>

<h4 align="left">
One of the advantages of storing project state per project is that each project
may naturally develop its own working context inside the IDE.
<br>
<br>
Different projects may involve:
<br>
<br>
<ul>
  <li>Different workflows</li>
  <li>Different run targets</li>
  <li>Different preferred profiles</li>
  <li>Different frequently opened scripts</li>
  <li>Different explorer structures and focus areas</li>
</ul>
<br>
Because of that, preserving IDE state on a per-project basis is considered an
important part of making VitaEngine feel more like a real workspace rather than a
generic editor with no memory of context.
<br>
<br>
</h4>

---

<h3>What ProjectState.json should not contain</h3>

<h4 align="left">
To preserve a clear boundary, ProjectState.json should not become a second
project definition file.
<br>
<br>
It is not intended to store:
<br>
<br>
<ul>
  <li>Core project identity</li>
  <li>Runtime-critical configuration</li>
  <li>Build-critical project definition</li>
  <li>Anything required for the project to remain valid</li>
</ul>
<br>
Its intended role is narrower:
<br>
<br>
<b>to preserve convenience, continuity and per-project IDE context.</b>
<br>
<br>
</h4>

---

<h3>Recovery behavior</h3>

<h4 align="left">
If <b>.VEP/</b> is missing, incomplete or invalid, the intended long-term behavior
is that VitaEngine should rebuild it automatically.
<br>
<br>
A reasonable recovery flow may include:
<br>
<br>
<ul>
  <li>Recreating the .VEP directory</li>
  <li>Rebuilding Integrity.json</li>
  <li>Rebuilding AssetIndex.json</li>
  <li>Creating a default ProjectState.json</li>
  <li>Refreshing the internal workspace as needed</li>
</ul>
<br>
This is intended to make the system more resilient and reduce the operational
weight of internal workspace data.
<br>
<br>
The absence of .VEP should not imply that the project itself is invalid.
<br>
<br>
</h4>

---

<h3>Design philosophy</h3>

<h4 align="left">
The long-term project workspace philosophy of VitaEngine is based on a simple
principle:
<br>
<br>
<b>project definition, project contents and IDE workspace state should not be
collapsed into the same layer.</b>
<br>
<br>
App.vep should remain focused on the project contract.
<br>
<br>
Scripts and Assets should remain the real project contents.
<br>
<br>
.VEP should remain the internal operational layer of the IDE.
<br>
<br>
By keeping these responsibilities separate, the platform can remain cleaner, more
maintainable and easier to evolve.
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
  <li><b>App.vep</b> is the authoritative project manifest</li>
  <li><b>Scripts/</b> and <b>Assets/</b> are the real contents of the project</li>
  <li><b>.VEP/</b> is the internal, IDE-managed workspace layer</li>
  <li><b>Integrity.json</b> is used for manifest consistency tracking</li>
  <li><b>AssetIndex.json</b> is used for lightweight asset indexing and refresh support</li>
  <li><b>ProjectState.json</b> is used for per-project IDE continuity</li>
  <li><b>.VEP/</b> is important, but should remain rebuildable and safe to delete</li>
</ul>
<br>
This model is intended to provide a better balance between correctness,
performance, clarity and future evolution.
<br>
<br>
</h4>

---

<h3>Final note</h3>

<h4 align="left">
The VitaEngine project workspace model is not intended to be a matter of simple
folder organization alone.
<br>
<br>
It is a structural decision meant to preserve:
<br>
<br>
<ul>
  <li>Clearer project boundaries</li>
  <li>A cleaner authoritative manifest</li>
  <li>A healthier separation between user content and IDE internals</li>
  <li>Stronger long-term maintainability</li>
  <li>Greater resilience through rebuildable workspace data</li>
</ul>
<br>
If maintained consistently, this model should help VitaEngine offer a more
coherent project structure, a more polished editor experience, and a stronger
foundation for future workflow expansion.
<br>
<br>
</h4>

---

</div>