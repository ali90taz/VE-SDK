<div style="font-family:nunito">

<h2 align="center">
Identifier Strategy in VitaEngine
<br>
<br>
</h2>

<h4 align="left">
In <b>VitaEngine</b>, identifiers are intended to follow a <b>two-layer model</b> 
with clearly separated responsibilities.
<br>
<br>
Rather than relying on a single identifier for every purpose, the long-term 
direction is to distinguish between:
<br>
<br>
<ul>
  <li><b>Project identifiers</b>, used by the desktop IDE and local project structure</li>
  <li><b>Title identifiers</b>, used by Vita-facing packaging, installation and deployment workflows</li>
</ul>
<br>
This distinction exists to preserve flexibility inside the VitaEngine workflow, 
avoid unnecessary coupling between internal project organization and Vita package 
constraints, and allow the same project to generate multiple installable variants 
when needed.
<br>
<br>
</h4>

---

<h3>Implementation status disclaimer</h3>

<h4 align="left">
This document describes the <b>intended long-term identifier model</b> for 
<b>VitaEngine</b>.
<br>
<br>
It should be understood as an <b>architectural direction</b> and a 
<b>long-term execution plan</b>, not as a guarantee that every part of this 
model is already fully implemented in the current state of the project.
<br>
<br>
Some aspects described here may still be planned, partial, or subject to 
evolution as the platform matures.
<br>
<br>
Its purpose is to document the <b>intended structure</b>, preserve consistency in 
future implementation decisions, and make the design philosophy explicit as the 
ecosystem grows.
<br>
<br>
</h4>

---

<h3>Core distinction</h3>

<h4 align="left">
VitaEngine identifiers are intended to be separated into two distinct categories:
<br>
<br>
<ul>
  <li><b>Project ID</b>, which identifies a VitaEngine project inside the IDE and local filesystem</li>
  <li><b>Title ID</b>, which identifies a Vita-facing packaged application for build, deploy and installation contexts</li>
</ul>
<br>
These identifiers <b>do not serve the same purpose</b> and are not expected to 
follow the same lifecycle or the same formatting rules.
<br>
<br>
The <b>Project ID</b> belongs to the <b>desktop-side project identity model</b>, 
while the <b>Title ID</b> belongs to the <b>device-facing package identity model</b>.
<br>
<br>
Most importantly, the <b>Project ID should not imply or permanently define the 
final application identity</b>.
<br>
<br>
A single project may produce multiple Vita-facing outputs over time, and each one 
may legitimately require a different Title ID depending on the intended workflow.
<br>
<br>
</h4>

---

<h3>Project ID</h3>

<h4 align="left">
The <b>Project ID</b> is intended to be the main internal identity of a project 
inside the VitaEngine IDE.
<br>
<br>
Its purpose is to provide a stable, unique and IDE-oriented identifier for:
<br>
<br>
<ul>
  <li>Project folder naming</li>
  <li>Recent project records</li>
  <li>Internal project lookup</li>
  <li>Persistent IDE-side references</li>
  <li>General project organization on the desktop side</li>
</ul>
<br>
A Project ID is expected to remain <b>stable</b> for the lifetime of the project 
and independent from the current Windows username or absolute machine-specific 
paths.
<br>
<br>
</h4>

---

<h3>Recommended Project ID format</h3>

<h4 align="left">
The current preferred direction is to use a format based on a <b>prefix</b> plus 
a <b>timestamp-derived numeric sequence</b>.
<br>
<br>
Example:
<br>
<br>
<b>VEP-080426152620</b>
<br>
<br>
This format is intended to provide:
<br>
<br>
<ul>
  <li>Very low collision probability in normal usage</li>
  <li>Simple generation without requiring a global counter</li>
  <li>Clear visual identity consistent with VitaEngine naming</li>
  <li>Better robustness than short sequential values such as <b>0001</b></li>
</ul>
<br>
Using a timestamp-derived identifier avoids many of the weaknesses normally 
associated with short incremental IDs, especially in environments where project 
state may be reset, moved or reconstructed later.
<br>
<br>
The <b>VEP</b> prefix is intended to align the identifier with the 
<b>VitaEngine project model</b> rather than with the final packaged application.
<br>
<br>
This reinforces that the Project ID belongs to the IDE-side project structure, 
while the Title ID belongs to the Vita-facing output layer.
<br>
<br>
</h4>

---

<h3>Why short sequential Project IDs are not preferred</h3>

<h4 align="left">
A short sequential identifier such as:
<br>
<br>
<b>VEP-0001</b>
<br>
<br>
may appear simple, but it introduces several structural weaknesses:
<br>
<br>
<ul>
  <li>It depends on a reliable global counter</li>
  <li>It is more vulnerable to accidental collision</li>
  <li>It becomes fragile if configuration state is reset or lost</li>
  <li>It creates unnecessary dependence on previous creation history</li>
</ul>
<br>
For a platform like VitaEngine, where projects are expected to be persistent and 
architecturally distinct, a timestamp-derived Project ID is considered a much 
better fit.
<br>
<br>
</h4>

---

<h3>Project ID and local project structure</h3>

<h4 align="left">
The Project ID is intended to be part of the local project structure managed by 
the IDE.
<br>
<br>
A typical long-term structure may look like:
<br>
<br>
<i>Documents/VitaEngine/Projects/VEP-080426152620/</i>
<br>
<br>
with the project file stored inside that directory, for example:
<br>
<br>
<i>Documents/VitaEngine/Projects/VEP-080426152620/App.vep</i>
<br>
<br>
Because of that, the IDE does not need to persist absolute paths containing the 
current system username as part of the long-term project identity model.
<br>
<br>
Instead, the project can be resolved by combining:
<br>
<br>
<ul>
  <li>The known VitaEngine projects root</li>
  <li>The stored Project ID</li>
  <li>The expected internal project file structure</li>
</ul>
<br>
This keeps the project model cleaner, more portable and less dependent on 
machine-specific path details.
<br>
<br>
</h4>

---

<h3>Recent project records</h3>

<h4 align="left">
Because the Project ID is intended to be stable and unique, recent project 
records do not need to store a full absolute path.
<br>
<br>
A cleaner long-term approach is to persist only project-oriented metadata, such as:
<br>
<br>
<ul>
  <li><b>id</b></li>
  <li><b>name</b></li>
  <li><b>lastOpened</b> (optional)</li>
</ul>
<br>
The full project location can then be reconstructed by the IDE using the known 
project root and the project folder convention.
<br>
<br>
This keeps recent-project data lighter, cleaner and less coupled to a specific 
machine environment.
<br>
<br>
</h4>

---

<h3>Title ID</h3>

<h4 align="left">
The <b>Title ID</b> serves a different role.
<br>
<br>
It is intended to identify the packaged application in Vita-facing workflows, 
such as:
<br>
<br>
<ul>
  <li>Build output identity</li>
  <li>Package identity</li>
  <li>Installable application identity on the target system</li>
  <li>Deployment and replacement behavior</li>
</ul>
<br>
Unlike the Project ID, the Title ID is expected to follow the constraints of the 
target packaging and installation model.
<br>
<br>
Because of that, it should not be treated as the main internal identity of the 
project inside the IDE.
<br>
<br>
A Title ID is better understood as an <b>output-scoped identity</b>, not as the 
canonical identity of the project itself.
<br>
<br>
</h4>

---

<h3>Why Project ID and Title ID should remain separate</h3>

<h4 align="left">
Keeping Project ID and Title ID separate provides several important advantages:
<br>
<br>
<ul>
  <li>It prevents Vita-facing identifier constraints from shaping the entire desktop project model</li>
  <li>It allows the Project ID to remain stable while package variants evolve independently</li>
  <li>It enables the same project to generate multiple installable variants over time</li>
  <li>It keeps project identity and package identity conceptually clean</li>
</ul>
<br>
This separation is one of the most important structural benefits of the current 
identifier model.
<br>
<br>
</h4>

---

<h3>Multiple variants from the same project</h3>

<h4 align="left">
One of the practical advantages of this model is that a single Project ID may be 
used to generate <b>multiple Title ID variants</b> over time.
<br>
<br>
This opens the door to workflows such as:
<br>
<br>
<ul>
  <li>Debug and release variants</li>
  <li>Experimental package variants</li>
  <li>Alternative installable identities for testing</li>
  <li>Package replacement choices controlled at export or deploy time</li>
</ul>
<br>
In other words, the same VitaEngine project may remain structurally the same in 
the IDE while producing different Vita-facing outputs when needed.
<br>
<br>
This is considered a strong advantage of separating desktop project identity from 
package identity.
<br>
<br>
</h4>

---

<h3>Collision handling philosophy</h3>

<h4 align="left">
The current Project ID strategy is expected to make collisions extremely unlikely 
during normal usage.
<br>
<br>
However, collisions on the <b>Title ID</b> side may still become relevant over 
time, especially when multiple package variants are possible.
<br>
<br>
In such cases, a reasonable long-term workflow may include:
<br>
<br>
<ul>
  <li>Warning that the target Title ID already exists</li>
  <li>Offering the option to overwrite the existing package or installation</li>
  <li>Requesting manual removal before continuing</li>
  <li>Allowing the user to generate or assign a different Title ID</li>
</ul>
<br>
This approach keeps the system explicit and avoids hiding potentially destructive 
deployment behavior behind silent automatic replacement.
<br>
<br>
</h4>

---

<h3>Path independence and machine neutrality</h3>

<h4 align="left">
Another important principle behind this design is that project records should not 
be tightly bound to a specific machine username such as:
<br>
<br>
<i>C:\Users\SomeUser\...</i>
<br>
<br>
Whenever possible, project identity should be resolved through:
<br>
<br>
<ul>
  <li>A known VitaEngine root path determined by the IDE</li>
  <li>A stable Project ID</li>
  <li>A predictable folder and file naming convention</li>
</ul>
<br>
This reduces unnecessary dependence on environment-specific details and keeps the 
project model cleaner.
<br>
<br>
</h4>

---

<h3>Design philosophy</h3>

<h4 align="left">
The long-term identifier philosophy of VitaEngine is based on a simple principle:
<br>
<br>
<b>project identity and package identity should not be treated as the same thing.</b>
<br>
<br>
The desktop IDE needs an identifier that is stable, robust and project-oriented.
<br>
<br>
The Vita-facing packaging workflow needs an identifier that is compatible with 
installation and deployment constraints.
<br>
<br>
Trying to force both concerns into a single identifier would make the system more 
fragile, more restrictive and less flexible over time.
<br>
<br>
By separating them, VitaEngine preserves a healthier and more scalable 
architectural model.
<br>
<br>
</h4>

---

<h3>Implementation direction</h3>

<h4 align="left">
The current long-term direction can be summarized as:
<br>
<br>
<ul>
  <li><b>Project ID</b> is the stable identity of a VitaEngine project inside the IDE</li>
  <li><b>Project ID</b> is expected to follow the <b>VEP-*</b> format</li>
  <li><b>Title ID</b> is the installable and package-facing identity used for Vita output workflows</li>
  <li><b>Title ID</b> should remain independent from the canonical project identity</li>
  <li>Recent project records should prefer project-oriented metadata over absolute paths</li>
  <li>The local project structure should be derived from known folder conventions whenever possible</li>
</ul>
<br>
This model is intended to keep the VitaEngine ecosystem more flexible, more 
coherent and easier to evolve over time.
<br>
<br>
</h4>

---

<h3>Final note</h3>

<h4 align="left">
The identifier model of VitaEngine is not intended to be a purely cosmetic naming 
choice.
<br>
<br>
It is a structural decision meant to support:
<br>
<br>
<ul>
  <li>Clearer project organization</li>
  <li>Safer long-term persistence of project references</li>
  <li>Greater flexibility in packaging and deployment workflows</li>
  <li>A healthier separation between IDE-side identity and Vita-facing identity</li>
</ul>
<br>
If maintained consistently, this distinction should help VitaEngine remain more 
predictable, more maintainable and more adaptable as the platform grows.
<br>
<br>
</h4>

---

</div>