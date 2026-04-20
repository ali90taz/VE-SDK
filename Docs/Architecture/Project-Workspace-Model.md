<div style="font-family:nunito">

<h2 align="center">
Project Workspace Model in VitaEngine
<br>
<br>
</h2>

<h4 align="left">
In <b>VitaEngine</b>, the project model is intended to be represented by a small
set of clearly separated layers, each one with a different responsibility.
<br>
<br>
Rather than concentrating all project-related data into a single file or mixing
project definition, project contents, per-project workspace data and global
workspace state together, the current direction is to distinguish between:
<br>
<br>
<ul>
  <li><b>The workspace root</b>, represented by <b>Documents/VitaEngine/</b></li>
  <li><b>The global workspace layer</b>, represented by the hidden <b>.VE/</b> directory</li>
  <li><b>The project contract</b>, represented by <b>App.vep</b></li>
  <li><b>The real project contents</b>, such as <b>Scripts</b> and <b>Resources</b></li>
  <li><b>The internal project workspace</b>, represented by the hidden <b>.VEP/</b> directory</li>
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
This document describes the <b>intended workspace model</b> for
<b>VitaEngine</b>.
<br>
<br>
It should be understood as a <b>structural direction</b> and a
<b>workspace-oriented architecture model</b>, not as a guarantee that every part
of this model is already fully implemented in the current state of the project.
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

<h3>Workspace root</h3>

<h4 align="left">
The intended root of the VitaEngine desktop workspace is:
<br>
<br>
<i>Documents/VitaEngine/</i>
<br>
<br>
This directory is intended to act as the official environment root for the local
VitaEngine workflow.
<br>
<br>
A typical structure may include:
<br>
<br>
<ul>
  <li><b>.VE/</b> for global workspace state</li>
  <li><b>Projects/</b> for project folders</li>
  <li>Other future workspace-level directories such as imports, exports or templates</li>
</ul>
<br>
This root is not just a convenience folder. It is intended to be the
<b>canonical desktop-side workspace boundary</b> for VitaEngine.
<br>
<br>
</h4>

---

<h3>The global workspace layer (.VE)</h3>

<h4 align="left">
The hidden <b>.VE/</b> directory is intended to act as the <b>global workspace
layer</b> of VitaEngine.
<br>
<br>
Its role is to store engine-owned data that belongs to the workspace as a whole,
not to any single project.
<br>
<br>
Current important examples of this layer include:
<br>
<br>
<ul>
  <li><b>ProjectsIndex.json</b></li>
  <li><b>RecentProjects.json</b></li>
</ul>
<br>
This distinction is important because it creates a clear separation between:
<br>
<br>
<ul>
  <li>Global workspace state</li>
  <li>Per-project state</li>
  <li>Project definition</li>
</ul>
<br>
</h4>

---

<h3>ProjectsIndex.json</h3>

<h4 align="left">
<b>ProjectsIndex.json</b> is intended to be the <b>authoritative project registry</b>
for the VitaEngine launcher.
<br>
<br>
Its role is to represent which projects belong to the active VitaEngine
workspace.
<br>
<br>
A current example includes information such as:
<br>
<br>
<ul>
  <li><b>formatVersion</b></li>
  <li><b>projectId</b></li>
  <li><b>path</b> (relative to the workspace root)</li>
  <li><b>registeredAtUtc</b></li>
  <li><b>lastOpenedUtc</b> (optional)</li>
</ul>
<br>
This file should be understood as the <b>source of truth</b> for project listing
inside the launcher.
<br>
<br>
</h4>

<h4>Illustrative example</h4>

<pre><code style="font-family:nunito">{
  "formatVersion": 1,
  "projects": [
    {
      "projectId": "VEP-080426152620",
      "path": "./Projects/VEP-080426152620",
      "registeredAtUtc": "2026-04-17T12:00:00Z",
      "lastOpenedUtc": "2026-04-17T12:15:00Z"
    }
  ]
}</code></pre>

<br>

---

<h3>Registration vs physical presence</h3>

<h4 align="left">
In VitaEngine, project presence in the filesystem and project recognition by the
workspace are intentionally not treated as the same thing.
<br>
<br>
A project folder may physically exist under:
<br>
<br>
<i>Documents/VitaEngine/Projects/</i>
<br>
<br>
but it is only considered part of the active VitaEngine environment after it has
been <b>registered</b> in:
<br>
<br>
<i>Documents/VitaEngine/.VE/ProjectsIndex.json</i>
<br>
<br>
This means:
<br>
<br>
<ul>
  <li>A folder may exist physically and still not appear in the launcher</li>
  <li>The launcher is expected to list <b>registered projects</b>, not simply every folder present on disk</li>
  <li>Project creation and project import are expected to be the official ways a project enters the workspace</li>
</ul>
<br>
This is considered an intentional part of preserving a more curated and coherent
workspace model.
<br>
<br>
</h4>

---

<h3>RecentProjects.json</h3>

<h4 align="left">
<b>RecentProjects.json</b> currently exists as a lightweight <b>convenience layer</b>
for launcher UX and quick access ordering.
<br>
<br>
Unlike <b>ProjectsIndex.json</b>, it is <b>not</b> intended to be the authoritative
source of project membership in the workspace.
<br>
<br>
In practical terms:
<br>
<br>
<ul>
  <li><b>ProjectsIndex.json</b> defines which projects belong to the active workspace</li>
  <li><b>RecentProjects.json</b> stores recency-oriented and display-oriented convenience metadata</li>
</ul>
<br>
A current example may include fields such as:
<br>
<br>
<ul>
  <li><b>formatVersion</b></li>
  <li><b>projectId</b></li>
  <li><b>name</b></li>
  <li><b>lastOpened</b></li>
</ul>
<br>
This distinction helps keep project membership and launcher convenience concerns
separate.
<br>
<br>
</h4>

<h4>Illustrative example</h4>

<pre><code style="font-family:nunito">{
  "formatVersion": 1,
  "projects": [
    {
      "projectId": "VEP-080426152620",
      "name": "Fruit Demence: Blastlicious",
      "lastOpened": "2026-04-12T16:40:00Z"
    }
  ]
}</code></pre>

<br>

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
  "formatVersion": 1,
  "projectId": "VEP-080426152620",
  "meta": {
    "name": "Fruit Demence: Blastlicious",
    "version": "1.0.0",
    "genre": "Puzzle",
    "author": "VitaEngine Team"
  },
  "system": {
    "entry": "./Scripts/Main.lua",
    "appMode": 0,
    "profiles": {
      "debug": {
        "titleId": null
      },
      "release": {
        "titleId": null
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
  <li><b>formatVersion</b></li>
  <li><b>projectId</b></li>
  <li><b>system.entry</b></li>
  <li><b>system.appMode</b></li>
  <li><b>system.profiles</b></li>
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
  <li><b>Resources/</b></li>
  <li>Other future project directories as needed</li>
</ul>
<br>
These directories are intended to be the <b>real project contents</b>.
<br>
<br>
However, VitaEngine intentionally distinguishes between:
<br>
<br>
<ul>
  <li>Physical files that exist in the project tree</li>
  <li>Resources that have been officially imported and registered by the IDE</li>
</ul>
<br>
This distinction is especially relevant for the resource workflow.
<br>
<br>
</h4>

---

<h3>Why resources should not be primarily defined in App.vep</h3>

<h4 align="left">
Although the IDE may maintain auxiliary information about resources, the current
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
structure, while resource-related registration and indexing should be handled
separately in IDE-managed workspace data.
<br>
<br>
</h4>

---

<h3>The .VEP project workspace</h3>

<h4 align="left">
The hidden <b>.VEP/</b> directory is intended to act as the <b>internal
project workspace layer</b> of a VitaEngine project.
<br>
<br>
Its purpose is to store data managed by the IDE itself, such as:
<br>
<br>
<ul>
  <li>Checksums or integrity information</li>
  <li>Resource indexes</li>
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
  <li><b>rebuildable</b></li>
  <li><b>not intended for manual editing</b></li>
</ul>
<br>
In other words, <b>.VEP/</b> is expected to be useful and valuable, but not a
single point of failure for project validity.
<br>
<br>
</h4>

<h4>Illustrative structure</h4>

<pre><code style="font-family:nunito">Documents/VitaEngine/
├── .VE/
│   ├── ProjectsIndex.json
│   └── RecentProjects.json
└── Projects/
    └── VEP-080426152620/
        ├── App.vep
        ├── Scripts/
        ├── Resources/
        └── .VEP/
            ├── Integrity.json
            ├── ResourceIndex.json
            └── ProjectState.json</code></pre>

<br>

---

<h3>Why .VEP should remain rebuildable</h3>

<h4 align="left">
One of the core design intentions behind <b>.VEP/</b> is that it should remain
<b>rebuildable and self-healing</b>.
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
  <li>It prevents the internal project workspace from becoming a hard dependency for project validity</li>
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
  <li><b>formatVersion</b></li>
  <li><b>appChecksum</b></li>
  <li><b>criticalConfigChecksum</b></li>
  <li><b>lastValidatedUtc</b></li>
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
  "formatVersion": 1,
  "appChecksum": "7A31C8F2",
  "criticalConfigChecksum": "A91F22BC",
  "lastValidatedUtc": "2026-04-13T18:22:00Z"
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

<h3>ResourceIndex.json</h3>

<h4 align="left">
<b>ResourceIndex.json</b> is intended to provide the <b>IDE-managed resource
registry</b> of a project.
<br>
<br>
Its role is to represent the resources that have been officially recognized by
the VitaEngine workflow, while also preserving the internal allocation state for
new <b>Resource IDs (RID)</b>.
<br>
<br>
A current example includes information such as:
<br>
<br>
<ul>
  <li><b>formatVersion</b></li>
  <li><b>nextResourceHexId</b></li>
  <li><b>resourceId</b></li>
  <li><b>path</b></li>
  <li><b>type</b></li>
  <li><b>size</b></li>
  <li><b>lastWriteTimeUtc</b></li>
</ul>
<br>
This file should not be understood as a second project manifest, but it is also
not merely a passive cache of the raw filesystem.
<br>
<br>
Instead, it acts as the <b>project-scoped registry of resources that have been
imported and recognized by the IDE</b>, while also storing the next hexadecimal
value to be used when generating new RIDs.
<br>
<br>
This means:
<br>
<br>
<ul>
  <li>A file may exist physically under <b>Resources/</b> and still not be considered a registered resource</li>
  <li>A resource becomes part of the official resource model when it is imported and indexed by the IDE</li>
  <li>The resource keeps a stable <b>RID</b> even if its physical path changes later</li>
  <li>New resources may receive a new RID based on <b>nextResourceHexId</b></li>
</ul>
<br>
</h4>

<h4>Illustrative example</h4>

<pre><code style="font-family:nunito">{
  "formatVersion": 1,
  "nextResourceHexId": "000002",
  "resources": [
    {
      "resourceId": "RID-000001",
      "path": "Resources/Images/Logo.png",
      "type": 0,
      "size": 48231,
      "lastWriteTimeUtc": "2026-04-13T18:45:12Z"
    }
  ]
}</code></pre>

<br>

---

<h3>RID allocation philosophy</h3>

<h4 align="left">
The current VitaEngine direction is that each imported resource should receive a
stable <b>Resource ID (RID)</b>, and that this identifier should <b>not need to be
recycled</b> later.
<br>
<br>
In practical terms:
<br>
<br>
<ul>
  <li>When importing a new resource, the IDE consumes the current <b>nextResourceHexId</b> value</li>
  <li>That value is converted into the new identifier in the <b>RID-XXXXXX</b> format</li>
  <li>After that, <b>nextResourceHexId</b> is incremented to the next value</li>
</ul>
<br>
This means RID allocation is intentionally <b>disposable from a reuse perspective</b>:
<br>
<br>
<ul>
  <li>If a resource is removed, its old RID does not need to return to the pool</li>
  <li>If a resource is replaced by another one, the new resource may receive a new RID</li>
  <li>The system does not need to compact, reorganize or attempt to fill “holes” in the ID space</li>
</ul>
<br>
This is considered a healthy choice because it reduces complexity and avoids
unnecessary recycling logic.
<br>
<br>
With the current <b>RID-XXXXXX</b> format, there is a space of:
<br>
<br>
<b>16,777,216 possible RIDs per project</b>
<br>
<br>
This is large enough that a simple monotonic allocation strategy is considered
fully adequate for VitaEngine’s scope.
<br>
<br>
</h4>

---

<h3>Why resource validation should remain lightweight</h3>

<h4 align="left">
The current intended direction is that resource validation should remain
<b>lightweight and pragmatic</b>.
<br>
<br>
Rather than performing expensive deep verification on every resource every time,
the IDE may rely primarily on inexpensive signals such as:
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
every resource at all times.
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
  <li><b>session</b></li>
  <li><b>layout</b></li>
  <li><b>explorer</b></li>
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
  "formatVersion": 1,
  "session": {
    "lastOpenedScript": "./Scripts/Main.lua",
    "lastProfile": "Debug",
    "lastRunTarget": "Companion"
  },
  "layout": {
    "leftPanelWidth": 280,
    "rightPanelWidth": 320,
    "bottomPanelHeight": 220
  },
  "explorer": {
    "expandedFolders": [
      "./Scripts",
      "./Resources/Images"
    ],
    "selectedPath": "./Scripts/Main.lua"
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
If <b>.VEP/</b> is missing, incomplete or invalid, the intended long-term
behavior is that VitaEngine should rebuild it automatically.
<br>
<br>
A reasonable recovery flow may include:
<br>
<br>
<ul>
  <li>Recreating the .VEP directory</li>
  <li>Rebuilding Integrity.json</li>
  <li>Rebuilding ResourceIndex.json</li>
  <li>Creating a default ProjectState.json</li>
  <li>Refreshing the internal project workspace as needed</li>
</ul>
<br>
Similarly, if the global workspace registry is lost or needs repair, a future
recovery workflow may allow the workspace to:
<br>
<br>
<ul>
  <li>Scan known project locations</li>
  <li>Validate project structure</li>
  <li>Rebuild or repair ProjectsIndex.json</li>
</ul>
<br>
This preserves the broader VitaEngine principle that <b>registration is the
normal workflow, while scanning is a recovery path rather than the primary
listing strategy</b>.
<br>
<br>
</h4>

---

<h3>Design philosophy</h3>

<h4 align="left">
The project workspace philosophy of VitaEngine is based on a simple principle:
<br>
<br>
<b>global workspace state, project definition, project contents and per-project
IDE workspace state should not be collapsed into the same layer.</b>
<br>
<br>
<ul>
  <li><b>.VE/</b> should remain the global workspace layer</li>
  <li><b>App.vep</b> should remain the project contract</li>
  <li><b>Scripts/</b> and <b>Resources/</b> should remain the real project contents</li>
  <li><b>.VEP/</b> should remain the internal project workspace layer</li>
</ul>
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
  <li><b>Documents/VitaEngine/</b> is the canonical desktop workspace root</li>
  <li><b>.VE/</b> is the global workspace layer</li>
  <li><b>ProjectsIndex.json</b> is the authoritative project registry for the launcher</li>
  <li><b>RecentProjects.json</b> exists as a secondary convenience layer for launcher recency and display metadata</li>
  <li><b>App.vep</b> is the authoritative project manifest</li>
  <li><b>Scripts/</b> and <b>Resources/</b> are the real project contents</li>
  <li><b>.VEP/</b> is the internal, IDE-managed project workspace layer</li>
  <li><b>Integrity.json</b> is used for manifest consistency tracking</li>
  <li><b>ResourceIndex.json</b> is used as the project-scoped resource registry and also maintains <b>nextResourceHexId</b> for monotonic new RID generation</li>
  <li><b>ProjectState.json</b> is used for per-project IDE continuity</li>
  <li><b>.VEP/</b> is important, but should remain rebuildable and safe to regenerate</li>
</ul>
<br>
This model is intended to provide a better balance between:
<br>
<br>
<ul>
  <li>Correctness</li>
  <li>Performance</li>
  <li>Clarity</li>
  <li>Future evolution</li>
</ul>
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
  <li>A healthier separation between global workspace state and per-project workspace state</li>
  <li>A stronger distinction between physical presence and logical registration</li>
  <li>Stronger long-term maintainability</li>
  <li>Greater resilience through rebuildable workspace data</li>
  <li>A simple and robust resource identity strategy based on stable, disposable RIDs</li>
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