<link href="https://fonts.googleapis.com/css?family=Nunito:400,700" rel="stylesheet">
<div style="font-family:nunito">

<h2 align="center">
Docs-Index
<br>
<br>
</h2>

<h4 align="left">
This file acts as an <b>internal master index</b> for the current
<b>VE-SDK / VitaEngine</b> documentation ecosystem.
<br>
<br>
Its purpose is to:
<br>
<br>
<ul>
  <li>Organize the recommended reading order</li>
  <li>Reduce friction when returning to the project after long pauses</li>
  <li>Preserve architectural and philosophical context</li>
  <li>Serve as an internal entry point for future reviews and new decisions</li>
  <li>Function as a context anchor for AI-assisted work</li>
</ul>
<br>
This index <b>does not replace</b> the individual documents.
It exists to help navigate them more clearly.
<br>
<br>
</h4>

---

<h3>How to use this index</h3>

<h4 align="left">
A healthy way to use this file is:
<br>
<br>
<ul>
  <li>Re-read the <b>Essential Reading</b> section before major structural changes</li>
  <li>Consult the <b>Architectural Reading</b> section when changing internal organization, project workflow or component boundaries</li>
  <li>Consult the <b>Workflow Reading</b> section before changing tooling, branches, setup or development flow</li>
  <li>Consult the <b>Philosophical Reading</b> section whenever the project risks losing identity, coherence or direction</li>
</ul>
<br>
If there is uncertainty around a new decision:
<br>
<br>
<b>return to the foundational documents first before creating new abstractions or expanding scope.</b>
<br>
<br>
</h4>

---

<h3>Quick map of the current documentation block</h3>

<h4 align="left">
The current documentation block can be understood in four layers:
<br>
<br>
<ul>
  <li><b>Structural foundation</b> → how the project is organized and preserves technical identity</li>
  <li><b>Workflow and operations</b> → how the project is built, maintained and iterated</li>
  <li><b>Ecosystem and tooling</b> → how external or auxiliary components fit into the whole</li>
  <li><b>Philosophy and direction</b> → why the project exists and what it is trying to protect</li>
</ul>
<br>
</h4>

---

<h3>Essential Reading (recommended order)</h3>

<h4 align="left">
If you only need to re-read the core of the project before continuing
development, this is the most important sequence:
<br>
<br>
<ol>
  <li><b>Project-Workspace-Model.md</b></li>
  <li><b>Identifier-Strategy.md</b></li>
  <li><b>Renderer-Theme-System.md</b></li>
  <li><b>Git-Workflow.md</b></li>
  <li><b>Why-VSCode.md</b></li>
  <li><b>README.md</b></li>
</ol>
<br>
This sequence tends to quickly restore:
<br>
<br>
<ul>
  <li>The mental structure of the workspace</li>
  <li>The project and resource identity model</li>
  <li>Healthy boundaries between UI and theme</li>
  <li>The role of each branch</li>
  <li>The separation between VE-SDK, VitaEngine and external tooling</li>
  <li>The current positioning of the <b>dev</b> branch</li>
</ul>
<br>
</h4>

---

<h3>Architectural Reading</h3>

<h4 align="left">
These documents matter most when the decision involves
<b>internal architecture</b>, <b>modeling</b>, <b>component organization</b>
or <b>responsibility boundaries</b>.
<br>
<br>
<ul>
  <li><b>Project-Workspace-Model.md</b><br><i>Foundational document for the workspace model, state files, indexes and project registration.</i></li>
  <li><b>Identifier-Strategy.md</b><br><i>Defines Project ID, RID, Title ID and the multi-layer identity separation.</i></li>
  <li><b>Renderer-Theme-System.md</b><br><i>Defines the theme contract as a layer that serves the real renderer UI.</i></li>
  <li><b>Debugging-Philosophy.md</b><br><i>Separates application debugging from engine debugging, preserving healthy boundaries.</i></li>
</ul>
<br>
<b>Use this section before:</b>
<br>
<br>
<ul>
  <li>Creating new workspace state files</li>
  <li>Changing the <b>.VEP</b> structure</li>
  <li>Adding new identifiers or persistent metadata</li>
  <li>Expanding the theme contract</li>
  <li>Mixing engine internals with public API or user-facing tooling</li>
</ul>
<br>
</h4>

---

<h3>Workflow Reading</h3>

<h4 align="left">
These documents are most relevant when the decision involves
<b>development flow</b>, <b>process</b>, <b>branching</b>,
<b>AI-assisted documentation</b> or <b>support tooling</b>.
<br>
<br>
<ul>
  <li><b>Git-Workflow.md</b><br><i>Defines the roles of <b>dev</b>, <b>staging</b> and <b>main</b>.</i></li>
  <li><b>AI-Workflow.md</b><br><i>Defines how AI enters the project without replacing vision, authorship or responsibility.</i></li>
  <li><b>Why-VSCode.md</b><br><i>Defines VS Code as part of the VE-SDK build context, not part of VitaEngine’s identity.</i></li>
  <li><b>README.md</b><br><i>Summarizes the current state of the <b>dev</b> branch and the general positioning of the technical repository.</i></li>
</ul>
<br>
<b>Use this section before:</b>
<br>
<br>
<ul>
  <li>Reorganizing branches</li>
  <li>Changing the role of <b>dev</b>, <b>staging</b> or <b>main</b></li>
  <li>Changing the AI usage strategy</li>
  <li>Replacing important external tools</li>
  <li>Changing the tone or positioning of the technical repository</li>
</ul>
<br>
</h4>

---

<h3>Ecosystem Reading</h3>

<h4 align="left">
These documents explain how components and ecosystem tools fit together.
<br>
<br>
<ul>
  <li><b>Companion-Plans.md</b><br><i>Defines the role of VitaEngine Companion as a bridge between the IDE and real hardware.</i></li>
  <li><b>Why-VSCode.md</b><br><i>Defines external tooling as enabling support, not part of the final product.</i></li>
  <li><b>README.md</b><br><i>Summarizes the current VE-SDK technical ecosystem in the <b>dev</b> branch.</i></li>
</ul>
<br>
<b>Use this section before:</b>
<br>
<br>
<ul>
  <li>Expanding the role of Companion</li>
  <li>Adding new desktop ↔ Vita integrations</li>
  <li>Re-evaluating important external dependencies</li>
  <li>Changing how VE-SDK presents itself in relation to VitaEngine</li>
</ul>
<br>
</h4>

---

<h3>Philosophical Reading</h3>

<h4 align="left">
These documents exist to protect the <b>identity of the project</b>.
<br>
<br>
They should be revisited whenever the project seems to be:
<br>
<br>
<ul>
  <li>Losing coherence</li>
  <li>Sliding into unnecessary complexity</li>
  <li>Drifting away from the end creator</li>
  <li>Confusing tooling with product</li>
  <li>Expanding scope without real foundation</li>
</ul>
<br>
Primary documents:
<br>
<br>
<ul>
  <li><b>Creative-First-Manifesto.md</b><br><i>Defines the central philosophy of VitaEngine as a creative-first platform.</i></li>
  <li><b>AI-Workflow.md</b><br><i>Defines AI usage as serious, transparent and subordinate to human vision.</i></li>
  <li><b>Why-VSCode.md</b><br><i>Protects the separation between build context and platform identity.</i></li>
  <li><b>README.md</b><br><i>Acts as the public/technical anchor for the <b>dev</b> branch positioning.</i></li>
</ul>
<br>
</h4>

---

<h3>Foundational documents (high decision weight)</h3>

<h4 align="left">
If any of these documents enters revision, the change should be treated more
carefully, because they affect multiple layers of the project:
<br>
<br>
<ul>
  <li><b>Project-Workspace-Model.md</b></li>
  <li><b>Identifier-Strategy.md</b></li>
  <li><b>Renderer-Theme-System.md</b></li>
  <li><b>Git-Workflow.md</b></li>
  <li><b>Why-VSCode.md</b></li>
</ul>
<br>
<b>Rule of thumb:</b>
<br>
<br>
<i>If a change touches a foundational document, it probably affects more than it seems at first glance.</i>
<br>
<br>
</h4>

---

<h3>High-identity documents (high philosophical weight)</h3>

<h4 align="left">
These documents do not necessarily define internal technical structures, but
they define the <b>spirit of the project</b>.
<br>
<br>
<ul>
  <li><b>Creative-First-Manifesto.md</b></li>
  <li><b>AI-Workflow.md</b></li>
  <li><b>Why-VSCode.md</b></li>
  <li><b>README.md</b></li>
</ul>
<br>
<b>Rule of thumb:</b>
<br>
<br>
<i>If a change makes these documents lose coherence, the problem may not be the text — it may be the direction of the project.</i>
<br>
<br>
</h4>

---

<h3>Re-reading sequences by decision type</h3>

<h4 align="left">
<b>If the change involves workspace / files / .VEP:</b>
<br>
<br>
<ol>
  <li><b>Project-Workspace-Model.md</b></li>
  <li><b>Identifier-Strategy.md</b></li>
  <li><b>README.md</b></li>
</ol>
<br>

<b>If the change involves theme / UI / renderer:</b>
<br>
<br>
<ol>
  <li><b>Renderer-Theme-System.md</b></li>
  <li><b>Creative-First-Manifesto.md</b></li>
  <li><b>README.md</b></li>
</ol>
<br>

<b>If the change involves Companion / deploy / real hardware:</b>
<br>
<br>
<ol>
  <li><b>Companion-Plans.md</b></li>
  <li><b>Debugging-Philosophy.md</b></li>
  <li><b>Creative-First-Manifesto.md</b></li>
</ol>
<br>

<b>If the change involves external tooling / VS Code / IDE workflow:</b>
<br>
<br>
<ol>
  <li><b>Why-VSCode.md</b></li>
  <li><b>Git-Workflow.md</b></li>
  <li><b>README.md</b></li>
</ol>
<br>

<b>If the change involves AI-assisted documentation or continuity:</b>
<br>
<br>
<ol>
  <li><b>AI-Workflow.md</b></li>
  <li><b>Docs-Index.md</b></li>
  <li><b>README.md</b></li>
</ol>
<br>
</h4>

---

<h3>Recommended order for future documents</h3>

<h4 align="left">
If new documents are created, a healthy convention is to classify them into one
of these categories:
<br>
<br>
<ul>
  <li><b>Foundational</b> → affects base architecture, structural identity or central contracts</li>
  <li><b>Workflow</b> → affects development process, tooling, branches or maintenance</li>
  <li><b>Ecosystem</b> → affects component integration, auxiliary apps or platform boundaries</li>
  <li><b>Philosophical</b> → affects direction, tone, vision and project limits</li>
</ul>
<br>
Whenever possible, new documents should:
<br>
<br>
<ul>
  <li>Clearly declare their category</li>
  <li>Indicate whether they are <b>foundational</b> or not</li>
  <li>Reference which previous documents are relevant to their reading</li>
  <li>Avoid silently contradicting older documents</li>
</ul>
<br>
</h4>

---

<h3>Recommendation for future AI sessions</h3>

<h4 align="left">
Before starting an important planning session, structural refactor or direction
change, it is recommended to:
<br>
<br>
<ul>
  <li>Review this index first</li>
  <li>Select the documents most relevant to the intended change</li>
  <li>Explicitly recall which decisions have already been crystallized</li>
  <li>Avoid starting from zero when the documentation already contains the necessary foundation</li>
</ul>
<br>
Rule of thumb:
<br>
<br>
<b>do not use AI to rediscover what has already been crystallized; use AI to evolve what is already well defined.</b>
<br>
<br>
</h4>

---

<h3>Current document list</h3>

<h4 align="left">
<ul>
  <li><b>Project-Workspace-Model.md</b></li>
  <li><b>Identifier-Strategy.md</b></li>
  <li><b>Renderer-Theme-System.md</b></li>
  <li><b>Debugging-Philosophy.md</b></li>
  <li><b>Companion-Plans.md</b></li>
  <li><b>Creative-First-Manifesto.md</b></li>
  <li><b>AI-Workflow.md</b></li>
  <li><b>Git-Workflow.md</b></li>
  <li><b>Why-VSCode.md</b></li>
  <li><b>README.md</b></li>
  <li><b>Docs-Index.md</b></li>
</ul>
<br>
</h4>

---

<h3>Final note</h3>

<h4 align="left">
This index exists because VitaEngine is no longer just a loose collection of
ideas.
<br>
<br>
It now has a <b>structured documentation core</b>, and that changes how the
project can evolve.
<br>
<br>
Good documentation does not only record the past.
It also:
<br>
<br>
<ul>
  <li>Preserves good decisions</li>
  <li>Reduces mental rework</li>
  <li>Lowers the risk of premature abstraction</li>
  <li>Protects the identity of the project</li>
  <li>Improves continuity between human and AI-assisted sessions</li>
</ul>
<br>
If maintained consistently, this documentation block can become one of the most
valuable invisible infrastructures in VitaEngine:
<br>
<br>
<b>not just documentation, but active architectural memory.</b>
<br>
<br>
</h4>

---

</div>