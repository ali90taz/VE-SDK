<div style="font-family:nunito">

<h2 align="center">
Git Workflow Philosophy
<br>
<br>
</h2>

<h3>What is this document?</h3>

<h4 align="left">
This document defines the <b>Git workflow philosophy</b> currently used by 
<b>VE-SDK</b> (VitaEngine SDK).
<br>
<br>
Its purpose is to make branch roles explicit, reduce ambiguity during 
development, and preserve different levels of project readability, stability and 
presentation.
<br>
<br>
This is especially important because VitaEngine is still in a <b>pre-alpha</b> 
stage, where active development, runnable integration and public-facing project 
presentation do not always align to the same commit.
<br>
<br>
</h4>

---

<h3>Why use multiple branches?</h3>

<h4 align="left">
VitaEngine is not just a single executable or a simple codebase.
<br>
<br>
Even in its early stages, it already involves multiple layers such as:
<br>
<br>
<ul>
  <li>The desktop IDE</li>
  <li>The project workflow and <b>.vep</b> structure</li>
  <li>Setup and maintenance scripts</li>
  <li>Technical documentation</li>
  <li>The future runtime / host layer</li>
  <li>The VitaEngine Companion application</li>
</ul>
<br>
Because of that, a single branch would eventually mix together:
<br>
<br>
<ul>
  <li>Raw work-in-progress code</li>
  <li>The latest runnable state</li>
  <li>The most presentable public-facing state</li>
</ul>
<br>
To avoid that, the project currently uses three branches with different roles.
<br>
<br>
</h4>

---

<h3>Branch philosophy</h3>

<h4 align="left">
In simple terms:
<br>
<br>
<ul>
  <li><b>dev</b> = construction truth</li>
  <li><b>staging</b> = executable truth</li>
  <li><b>main</b> = narrative truth</li>
</ul>
<br>
These branches are not intended to represent different product maturity levels.
They represent different <b>workflow responsibilities</b>.
<br>
<br>
This means that VitaEngine can still honestly be described as a 
<b>pre-alpha project</b> even while using a more structured multi-branch model.
<br>
<br>
</h4>

---

<h3>Branch roles</h3>

<h4 align="left">
<b>main</b>
<br>
<br>
<ul>
  <li>Official public-facing milestone branch</li>
  <li>Most curated and presentable branch</li>
  <li>High-level documentation and project overview</li>
  <li>Best entry point for new visitors</li>
  <li>May intentionally lag behind more recent technical work</li>
</ul>
<br>
<b>staging</b>
<br>
<br>
<ul>
  <li>Latest reasonably stable and testable integration branch</li>
  <li>Intended to remain the most recent state that is still meaningfully runnable</li>
  <li>Best branch for inspecting practical progress</li>
  <li>May be incomplete, but should ideally remain launchable</li>
</ul>
<br>
<b>dev</b>
<br>
<br>
<ul>
  <li>Active day-to-day development branch</li>
  <li>Primary working branch for implementation and refactors</li>
  <li>May be unstable, incomplete, temporarily broken or non-runnable</li>
  <li>Best branch for lower-level technical work and contributor-facing changes</li>
</ul>
<br>
</h4>

---

<h3>Branch expectations</h3>

<h4 align="left">
The branches should be understood as follows:
<br>
<br>
<ul>
  <li><b>main</b> should explain the platform</li>
  <li><b>staging</b> should demonstrate the latest runnable progress</li>
  <li><b>dev</b> should allow active construction, even when temporary breakage occurs</li>
</ul>
<br>
Because of that:
<br>
<br>
<ul>
  <li><b>dev</b> is allowed to break</li>
  <li><b>staging</b> should ideally continue to breathe</li>
  <li><b>main</b> should remain coherent and presentable</li>
</ul>
<br>
</h4>

---

<h3>Current project maturity</h3>

<h4 align="left">
<b>Project maturity:</b> <b>Pre-Alpha</b>
<br>
<br>
This matters because branch structure should not be confused with product maturity.
<br>
<br>
The existence of:
<br>
<br>
<ul>
  <li><b>main</b></li>
  <li><b>staging</b></li>
  <li><b>dev</b></li>
</ul>
<br>
does <b>not</b> imply that the project is already in alpha, beta or stable form.
<br>
<br>
It simply means the project is large enough to benefit from separating:
<br>
<br>
<ul>
  <li>public presentation</li>
  <li>runnable integration</li>
  <li>raw development work</li>
</ul>
<br>
</h4>

---

<h3>Recommended workflow</h3>

<h4 align="left">
The intended flow is:
<br>
<br>
<ul>
  <li>Work primarily in <b>dev</b></li>
  <li>Promote a runnable snapshot to <b>staging</b> when a suitable state exists</li>
  <li>Promote a more curated milestone snapshot to <b>main</b> when appropriate</li>
</ul>
<br>
In practical terms:
<br>
<br>
<ul>
  <li><b>dev</b> is updated frequently</li>
  <li><b>staging</b> is updated when a recent commit is still meaningfully launchable</li>
  <li><b>main</b> is updated more selectively, when the project has a cleaner milestone worth presenting</li>
</ul>
<br>
</h4>

---

<h3>Promoting a runnable state to staging</h3>

<h4 align="left">
When the current <b>dev</b> head is no longer suitable for testing or inspection, 
the recommended approach is:
<br>
<br>
<ul>
  <li>Identify the most recent commit in <b>dev</b> that still launches or remains meaningfully inspectable</li>
  <li>Move <b>staging</b> to that commit</li>
  <li>Push the updated <b>staging</b> branch</li>
</ul>
<br>
This makes <b>staging</b> the branch that preserves the latest practical state, 
even if <b>dev</b> is currently in a transitional or partially broken phase.
<br>
<br>
</h4>

---

<h3>Promoting a milestone state to main</h3>

<h4 align="left">
The <b>main</b> branch should be updated more carefully than <b>staging</b>.
<br>
<br>
A good candidate for promotion to <b>main</b> is usually a state that:
<br>
<br>
<ul>
  <li>Feels coherent as a project snapshot</li>
  <li>Has documentation that still matches the visible structure</li>
  <li>Represents a milestone worth presenting publicly</li>
  <li>Can support screenshots, high-level documentation or architectural references without feeling misleading</li>
</ul>
<br>
This means <b>main</b> may intentionally lag behind the latest integration state.
That is acceptable and expected.
<br>
<br>
</h4>

---

<h3>Force push policy</h3>

<h4 align="left">
Because <b>staging</b> and sometimes <b>main</b> may be treated as 
<b>snapshot branches</b>, it can be acceptable to use <b>force push</b> when:
<br>
<br>
<ul>
  <li>The branch is intentionally being moved to a specific known-good commit</li>
  <li>The goal is to preserve a clearer snapshot rather than strict linear history</li>
  <li>The branch role is being respected as a reference point, not as the primary work branch</li>
</ul>
<br>
However:
<br>
<br>
<ul>
  <li><b>dev</b> should usually remain the primary continuous work history</li>
  <li>Force push should be intentional, not casual</li>
  <li>If this project ever gains regular external contributors, branch protection policies may need to be revisited</li>
</ul>
<br>
</h4>

---

<h3>README maintenance rules</h3>

<h4 align="left">
Each branch may have its own README tone and focus.
<br>
<br>
Recommended guideline:
<br>
<br>
<ul>
  <li><b>main</b> → more visual, more high-level, more approachable, more presentation-oriented</li>
  <li><b>staging</b> → practical, current, test-oriented, clearer about runnable expectations</li>
  <li><b>dev</b> → more direct, more technical, more contributor-facing, more honest about instability</li>
</ul>
<br>
Even when the tone changes, some core concepts should remain aligned across all branches:
<br>
<br>
<ul>
  <li>VE-SDK is the technical development repository of VitaEngine</li>
  <li>The project is still in <b>pre-alpha</b></li>
  <li>The final end-user distribution is a separate long-term goal</li>
  <li>The three branches serve different purposes</li>
</ul>
<br>
</h4>

---

<h3>Practical rule of thumb</h3>

<h4 align="left">
If in doubt:
<br>
<br>
<ul>
  <li>Use <b>dev</b> to build</li>
  <li>Use <b>staging</b> to validate</li>
  <li>Use <b>main</b> to present</li>
</ul>
<br>
This simple rule is usually enough to keep the branch model coherent.
<br>
<br>
</h4>

---

<h3>Final note</h3>

<h4 align="left">
This workflow is intentionally lightweight.
<br>
<br>
It is not meant to simulate a large corporate Git policy.
Its purpose is simply to give VitaEngine enough structure to support:
<br>
<br>
<ul>
  <li>active experimentation</li>
  <li>a preserved runnable reference point</li>
  <li>a coherent public-facing project snapshot</li>
</ul>
<br>
As the project grows, this document may evolve.
For now, the priority is clarity, not bureaucracy.
<br>
<br>
</h4>

---

</div>