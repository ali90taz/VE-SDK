<div style="font-family:nunito">

<h2 align="center">
Plans for Debugging in VitaEngine
</br>
<br>
</h2>

<h4 align="left">
Debugging in <b>VitaEngine</b> is intended to follow a <b>layered</b> and 
<b>purpose-driven</b> philosophy.
<br>
<br>
Rather than treating all debugging needs as part of a single system, the 
long-term direction is to distinguish between <b>application-level debugging</b> 
and <b>engine-level debugging</b>, with each one belonging to a different scope 
inside the VitaEngine ecosystem.
<br>
<br>
This document exists as a <b>long-term implementation reference</b> and outlines 
the intended direction for how debugging responsibilities may be separated over 
time.
<br>
<br>
</h4>

---

<h3>Important note</h3>

<h4 align="left">
The ideas described here represent <b>long-term plans and design intentions</b>.
<br>
<br>
Their presence in this document <b>does not imply immediate availability</b>, 
fixed milestones, guaranteed implementation, or a strict roadmap.
<br>
<br>
This file is meant to preserve the intended <b>architectural philosophy</b> of 
debugging in VitaEngine and help maintain consistency as the platform evolves.
<br>
<br>
</h4>

---

<h3>Core vision</h3>

<h4 align="left">
The long-term debugging model of VitaEngine is expected to be based on a clear 
distinction between:
<br>
<br>
<ul>
  <li><b>Application debugging</b>, focused on projects created with VitaEngine</li>
  <li><b>Engine debugging</b>, focused on the internal implementation of VitaEngine itself</li>
</ul>
<br>
This distinction is intended to keep the development experience more coherent, 
reduce unnecessary complexity for application creators, and preserve clear 
architectural boundaries inside the ecosystem.
<br>
<br>
In practical terms, VitaEngine is expected to primarily expose debugging tools 
for <b>high-level application behavior</b>, while debugging of the engine host 
itself is expected to remain part of the <b>internal SDK development workflow</b>.
<br>
<br>
</h4>

---

<h3>Design philosophy</h3>

<h4 align="left">
The long-term debugging philosophy of VitaEngine is intended to follow a 
<b>separation of responsibilities</b>.
<br>
<br>
It should:
<br>
<br>
<ul>
  <li>Prioritize <b>application debugging</b> for the creators of VitaEngine projects</li>
  <li>Avoid exposing unnecessary <b>low-level engine internals</b> as part of the normal workflow</li>
  <li>Preserve a clear boundary between <b>public engine behavior</b> and <b>private engine implementation</b></li>
  <li>Allow the engine to evolve internally without forcing users to depend on its internal structure</li>
</ul>
<br>
Because of that, the normal VitaEngine experience is not intended to become a 
general-purpose debugger for the internal host engine running on the device.
<br>
<br>
</h4>

---

<h3>Application debugging</h3>

<h4 align="left">
In long-term terms, the main debugging experience exposed by VitaEngine is 
expected to focus on the <b>application layer</b>.
<br>
<br>
This includes the logic written by the project creator and the high-level 
behavior of the application inside the VitaEngine runtime environment.
<br>
<br>
Potential long-term capabilities may include:
<br>
<br>
<ul>
  <li>Reporting script-side execution errors</li>
  <li>Providing source file and line information when available</li>
  <li>Showing stack traces related to application logic</li>
  <li>Supporting controlled execution flow for scripts</li>
  <li>Providing visibility into the state of the running application</li>
  <li>Improving iteration during testing on real hardware</li>
</ul>
<br>
The goal of this layer is to help developers understand <b>what their project is 
doing</b>, why it failed, and how it behaves during execution.
<br>
<br>
</h4>

---

<h3>Why application debugging is the priority</h3>

<h4 align="left">
For creators using VitaEngine, the most valuable debugging information is 
expected to be related to:
<br>
<br>
<ul>
  <li>Their own script logic</li>
  <li>Their project state</li>
  <li>Their assets and application flow</li>
  <li>The way their application interacts with the VitaEngine API</li>
</ul>
<br>
In other words, the main purpose of VitaEngine debugging is not to expose the 
internal anatomy of the engine, but to help the developer understand and improve 
the behavior of the <b>application being built</b>.
<br>
<br>
This makes application debugging the most practical and user-relevant layer of 
the overall debugging model.
<br>
<br>
</h4>

---

<h3>Engine debugging</h3>

<h4 align="left">
Debugging the <b>VitaEngine host engine itself</b> is expected to remain outside 
the scope of the normal VitaEngine application workflow.
<br>
<br>
This includes areas such as:
<br>
<br>
<ul>
  <li>Native C or C++ execution issues</li>
  <li>Internal engine crashes</li>
  <li>Memory-related problems inside the engine implementation</li>
  <li>Rendering, threading or subsystem diagnostics</li>
  <li>Low-level behavior associated with Vita-specific internals</li>
</ul>
<br>
These responsibilities are expected to belong to the <b>internal SDK and engine 
development environment</b>, where low-level diagnostics are more appropriate 
and more technically justified.
<br>
<br>
</h4>

---

<h3>Why engine debugging should remain internal</h3>

<h4 align="left">
There are several long-term reasons for keeping engine debugging separate from 
the normal VitaEngine user workflow.
<br>
<br>
<ul>
  <li>It prevents the public workflow from becoming unnecessarily complex</li>
  <li>It avoids coupling application creators to engine implementation details</li>
  <li>It allows the engine internals to evolve more freely over time</li>
  <li>It keeps the platform focused on the needs of project creators rather than engine maintainers</li>
</ul>
<br>
By maintaining this separation, VitaEngine can offer a cleaner and more stable 
experience at the application level while preserving the freedom to refine, 
replace or reorganize internal engine systems when needed.
<br>
<br>
</h4>

---

<h3>Public behavior versus private implementation</h3>

<h4 align="left">
One of the core long-term principles behind this approach is that developers 
using VitaEngine are expected to debug the <b>behavior exposed by the platform</b>, 
not the <b>private internal structure</b> of the engine.
<br>
<br>
That means the debugging experience should remain centered on:
<br>
<br>
<ul>
  <li>Project code</li>
  <li>Runtime behavior visible at the application level</li>
  <li>Errors related to the public API and execution flow</li>
  <li>State and logic that belong to the project itself</li>
</ul>
<br>
At the same time, implementation details such as internal host scheduling, 
native subsystem orchestration, renderer internals or private engine bindings are 
expected to remain outside the scope of end-user debugging.
<br>
<br>
</h4>

---

<h3>Relationship with the Companion</h3>

<h4 align="left">
As the VitaEngine ecosystem evolves, the <b>VitaEngine Companion</b> may become 
an important part of the application debugging workflow on real hardware.
<br>
<br>
In long-term terms, its role may include supporting application-oriented 
debugging tasks such as:
<br>
<br>
<ul>
  <li>Helping run development sessions on device</li>
  <li>Supporting inspection of application execution state</li>
  <li>Assisting with controlled testing and iteration workflows</li>
  <li>Participating in future high-level debugging flows between desktop and device</li>
</ul>
<br>
However, even in that role, the Companion is not intended to become a general 
low-level debugger for the VitaEngine host engine itself.
<br>
<br>
Its long-term role is expected to stay aligned with <b>application behavior</b>, 
not with the internal maintenance workflow of the engine.
<br>
<br>
</h4>

---

<h3>What VitaEngine debugging is <i>not</i> intended to be</h3>

<h4 align="left">
To preserve a clear scope, debugging in VitaEngine is currently <b>not intended</b> 
to become:
<br>
<br>
<ul>
  <li>A full native debugger for the internal host engine on the device</li>
  <li>A public interface for low-level engine diagnostics</li>
  <li>A tool centered around private implementation details of the runtime</li>
  <li>A replacement for internal SDK-oriented debugging workflows</li>
  <li>A generalized low-level inspection environment for engine development</li>
</ul>
<br>
Its intended role is narrower and more focused:
<br>
<br>
<i>A practical debugging experience centered on the behavior of applications 
created with VitaEngine, while keeping engine-level diagnostics within the 
internal development scope of the platform.</i>
<br>
<br>
</h4>

---

<h3>Implementation philosophy</h3>

<h4 align="left">
The debugging model of VitaEngine is planned as a <b>long-term architectural 
direction</b> and is expected to evolve incrementally.
<br>
<br>
A reasonable long-term progression may look like:
<br>
<br>
</h4>

<h4>Early stage</h4>

<h4 align="left">
<ul>
  <li>Basic runtime error reporting for applications</li>
  <li>Clearer feedback during execution failures</li>
  <li>Improved visibility into script-side problems</li>
</ul>
<br>
</h4>

<h4>Mid stage</h4>

<h4 align="left">
<ul>
  <li>Better application state inspection</li>
  <li>More structured reporting of execution context</li>
  <li>Improved real-hardware testing support through the Companion</li>
</ul>
<br>
</h4>

<h4>Later stage</h4>

<h4 align="left">
<ul>
  <li>More refined application-oriented debugging workflows</li>
  <li>Stronger desktop-to-device integration for testing</li>
  <li>Expanded tools for understanding high-level runtime behavior</li>
</ul>
<br>
At every stage, the intended direction remains the same:
<br>
<br>
<b>application debugging belongs to the normal VitaEngine experience, while 
engine debugging belongs to the internal SDK and engine development workflow.</b>
<br>
<br>
</h4>

---

<h3>Final note</h3>

<h4 align="left">
The long-term goal of debugging in VitaEngine is not to expose every internal 
detail of the platform, but to provide a clearer and more useful understanding 
of how <b>VitaEngine applications</b> behave during development and testing.
<br>
<br>
By separating <b>application debugging</b> from <b>engine debugging</b>, 
VitaEngine can remain more focused, more maintainable and more coherent as a 
platform.
<br>
<br>
This distinction is expected to help preserve a healthier ecosystem over time:
<br>
<br>
<ul>
  <li>Creators focus on building and debugging their applications</li>
  <li>The platform remains centered on high-level development workflows</li>
  <li>Internal engine diagnostics stay where they belong: inside engine development</li>
</ul>
<br>
If maintained carefully, this approach can help VitaEngine offer a more 
practical and better-defined development experience without blurring the line 
between <b>using the engine</b> and <b>maintaining the engine</b>.
<br>
<br>
</h4>

---

</div>