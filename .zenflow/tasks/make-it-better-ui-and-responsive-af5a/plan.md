# Auto

## Configuration
- **Artifacts Path**: {@artifacts_path} → `.zenflow/tasks/{task_id}`

## Implementation Steps
[x] Step 1: Planning and setup
- Analyze UI/UX requirements and responsive strategy
[x] Step 2: Create a beautiful and responsive Navbar component
- Build `./src/components/Navbar.jsx` with full responsive menus, logo, and active links
[x] Step 3: Redesign the Home page `./src/pages/Home.jsx`
- Implement hero header, exam card, instruction lists, and responsive grid layout
[x] Step 4: Refactor and redesign the Exam page `./src/pages/ExamPage.jsx`
- Add fallback to local `./src/data/questions.js` when the server is offline
- Restore previous, next, mark-for-review, and submit-exam buttons
- Show live question counters and statistics
[x] Step 5: Improve Question Palette and Timer components
- Update `./src/components/QuestionPalette.jsx` and `./src/components/Timer.jsx` for clean visual representation
[x] Step 6: Redesign the Result page `./src/pages/ResultPage.jsx`
- Calculate correct, wrong, and unattempted question stats
- Display interactive charts/cards and option to retake exam
[x] Step 7: Run verification and clean up
- Verify eslint and build passes successfully

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:
- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

**Debug requests, questions, and investigations:** answer or investigate first. Do not create a plan upfront — the user needs an answer, not a plan. A plan may become relevant later once the investigation reveals what needs to change.

**For all other tasks**, before writing any code, assess the scope of the actual change (not the prompt length — a one-sentence prompt can describe a large feature). Scale your approach:

- **Trivial** (typo, config tweak, single obvious change): implement directly, no plan needed.
- **Small** (a few files, clear what to do): write 2–3 sentences in `plan.md` describing what and why, then implement. No substeps.
- **Medium** (multiple components, design decisions, edge cases): write a plan in `plan.md` with requirements, affected files, key decisions, verification. Break into 3–5 steps.
- **Large** (new feature, cross-cutting, unclear scope): gather requirements and write a technical spec first (`requirements.md`, `spec.md` in `{@artifacts_path}/`). Then write `plan.md` with concrete steps referencing the spec.

**Skip planning and implement directly when** the task is trivial, or the user explicitly asks to "just do it" / gives a clear direct instruction.

To reflect the actual purpose of the first step, you can rename it to something more relevant (e.g., Planning, Investigation). Do NOT remove meta information like comments for any step.

Rule of thumb for step size: each step = a coherent unit of work (component, endpoint, test suite). Not too granular (single function), not too broad (entire feature). Unit tests are part of each step, not separate.

Update `{@artifacts_path}/plan.md` if it makes sense to have a plan and task has more than 1 big step.
