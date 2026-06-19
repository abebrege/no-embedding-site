No Embedding — Refactor & Redesign Implementation Plan

Audience: an LLM coding agent working in a workspace that contains both repos:
no-embedding-site (React 19 + Vite 8 + MUI 9 + Emotion + react-router 7) and
no-embedding-api (Express + MySQL via mysql2 pool).

Goal: drastically simplify the site into a minimalist dark UI, consolidate
duplicated code into a service-file pattern and shared components, and add the
data plumbing needed for the new sections — while preserving the DAG graph as an
isolated component pinned to the bottom of the home page.

Read this whole document before writing code. Implement in the phase order given.
Each phase ends with acceptance criteria; do not advance until they pass.


0. Ground truth (verified against the current code)

0.1 API surface

All routes are mounted under /api: /languages, /institutions, /literature,
/research-groups. Each exposes GET /, GET /:id, POST /, PUT /:id,
DELETE /:id. List responses are { success: true, data: [...], count }.

0.2 Schema fields and the URLs that exist (this is the source of truth for "use all available URLs")


languages: languageId, name, repoUrl, type, host — clickable URL: repoUrl. There is no description/summary column and no code column (see bug 1).
institutions: institutionId, shortName, name, location, type — no URL field and no logo column. Logos are resolved on the frontend by matching name against files in public/institutions/.
research_groups: researchGroupId, name, url, institutionId — clickable URL: url.
literature: literatureId, title, author, abstract, languageId, institutionId, publication_year, doi_url, open_access_url, reference — clickable URLs: open_access_url, doi_url.
literature_institutions: join table (is_primary flag).


So the complete set of clickable URLs is: language.repoUrl, researchGroup.url,
literature.open_access_url, literature.doi_url. Institutions have none.

0.3 Association shapes currently returned


GET /languages (list): each item has associations.literature only.
GET /languages/:id: associations.{literature, institutions, researchGroups}.
GET /institutions (list): each item has associations.researchGroups[] (each with associations.institution and associations.literature[].associations.language) and associations.literature[].associations.language. This nested shape is what the DAG renderer walks.
GET /literature: page consumes associations.{language, institutions, researchGroups}.


0.4 The nine featured languages already exist in the seed (db/seeders/01-languages.sql)

Silq, Qunity, Quipper, Tower, Twist, Scaffold, QWire, Qwerty, Qrisp — all present
with repoUrl, type, host. None has a summary string.

0.5 Bugs / gaps to fix as part of this work (do not skip — the new features depend on these)


Phantom columns. languagesController.createLanguage/updateLanguage write code and description, which don't exist in the schema. LanguagesPage renders language.code / language.description (always undefined). Remove/replace these.
No language summary source. The redesign requires "short summary text" beside each language, but no such field exists. Decision required — pick one and note it in the PR:

(A, recommended) add a summary VARCHAR(500) (or description TEXT) column to languages, migrate, and seed summaries for at least the nine featured languages; OR
(B, fallback) derive the summary client-side from the linked literature's abstract (truncated). Lossy and often empty — only if a schema change is off-limits.
This plan assumes (A).



Languages list lacks institution/research-group associations. The new languages section needs each language's repo + linked paper + university. Enrich GET /languages to mirror GET /languages/:id (add institutions and researchGroups), so the frontend doesn't have to cross-join client-side.
No "most recent" ordering for literature. The "most recent research" section needs ordering. Add support for GET /literature?sort=recent&limit=N (order by publication_year DESC, tie-break created_at DESC). Client-side sort is the fallback but server-side is preferred.
Wrong contribution link. home.jsx links to github.com/bregeabe/no-embedding-site; the real org is abebrege. Fix.
Dead styles. theme.css carries the Vite starter CSS (.hero, #next-steps, #docs, #spacer, .ticks) and .frame { background-color: aqua }. Remove all of it during the theme work.
BASE_URL is import.meta.env.VITE_BASE and must include the /api prefix. Keep a single definition (see Phase 2).



1. Target structures

1.1 API (no-embedding-api) — controller → service → repository

Thin controllers (HTTP only) delegating to services (business logic / association
assembly) that call repositories (all SQL). Add one shared response helper.

src/
  lib/
    respond.js            # ok(res,data,meta) / fail(res,status,error) — one response shape everywhere
    asyncRoute.js         # wraps handlers so thrown errors hit the error middleware
  repositories/
    languagesRepo.js      # findAll/findById/insert/update/remove + findLiteratureByLanguageId, etc. (raw SQL only)
    institutionsRepo.js
    literatureRepo.js     # findAll({sort,limit}) supports recent ordering
    researchGroupsRepo.js
  services/
    languagesService.js   # composes repo calls into the association shape (list now includes institutions+researchGroups)
    institutionsService.js# owns the nested DAG shape (moved out of the controller)
    literatureService.js
    researchGroupsService.js
  controllers/            # thin: parse req -> call service -> respond.ok/fail
  routes/                 # unchanged shape; handlers wrapped in asyncRoute
db/
  model/create_db.sql     # + languages.summary column
  seeders/01-languages.sql# + summaries for >= the 9 featured languages
  migrations/             # add a forward migration for the summary column if a migration runner exists; else update create_db.sql + a notes entry

The current institutionsController already has mapResearchGroupsWithAssociations —
move that into institutionsService.js essentially verbatim so the DAG payload
shape is byte-for-byte preserved. Do not change association keys/casing; the
frontend DAG depends on them.

1.2 Site (no-embedding-site) — services, hook, shared UI, generic inventory page

src/
  theme.js                       # dark tokens (black / grey / navy) — single source
  theme.css                      # reset + CSS vars only; delete all Vite starter CSS
  services/
    apiClient.js                 # BASE_URL + get/post/... + unwrap {success,data} -> data | throw
    languagesService.js          # getLanguages(), getLanguage(id)
    literatureService.js         # getLiterature({sort,limit}), getLiteratureItem(id)
    institutionsService.js       # getInstitutions() (DAG payload), getInstitution(id)
    researchGroupsService.js
  hooks/
    useResource.js               # useResource(fetcher, deps) -> {data, loading, error}
  components/
    frame.component.jsx          # layout shell (dark), top nav links
    ui/                          # shared primitives (used by every page)
      PageShell.jsx              # title + optional BackButton + content slot
      InventoryTable.jsx         # GENERIC table; driven by a `columns` config + `rows`
      ExternalLink.jsx           # safe <a target=_blank rel=noopener>; renders nothing if no href
      LinkRow.jsx                # row of ExternalLinks (repo / paper / DOI / group), hides empties
      AssociationList.jsx        # the repeated "Label (n) + list + ...and X more" block
      Logo.jsx                   # renamed/cleaned InstitutionLogo (keep multi-format fallback)
      Loading.jsx / EmptyState.jsx
    dag/
      Dag.jsx                    # isolated DAG (BranchSpine, renderNode, countNodes, NodeCard, arms)
      dag.styles.js              # DAG-only styled components, reading dark tokens
    screens/
      home/Home.jsx              # hero + RecentResearch + FeaturedLanguages + Universities + <Dag/>
      home/sections/RecentResearch.jsx
      home/sections/FeaturedLanguages.jsx
      home/sections/Universities.jsx
      inventory/InventoryPage.jsx# ONE page component; receives a config and renders InventoryTable
      inventory/configs.js       # languagesConfig / literatureConfig / institutionsConfig (columns + fetcher)

main.jsx routes languages, literature, institutions all to the same
<InventoryPage config={...}/> — satisfying "same template index/inventory page
that just takes different data and displays different fields."