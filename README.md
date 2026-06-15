# Humanizer

A skill for Claude Code and OpenCode that removes signs of AI-generated writing from text and adds the positive qualities of genuinely human writing.

> **Fork notice.** This is an extended fork of [blader/humanizer](https://github.com/blader/humanizer) by Siqi Chen (MIT). The original detects and removes 29 AI-writing patterns — that work is kept in full as **Part I**. This fork adds **Part II: 14 positive "human factor" patterns** distilled from acclaimed pre-LLM writing, plus a research write-up in [`human-factors-analysis.md`](human-factors-analysis.md). See [Attribution](#attribution) and [LICENSE](LICENSE).
>
> **This is a personal-use fork** maintained by [@Gavin-Qiao](https://github.com/Gavin-Qiao) for my own writing workflow. It is not an official release of, or a substitute for, the upstream project, and it is not affiliated with or endorsed by the original author.

## What's new in this fork (v2.7.0)

- **Part II — Positive Human Patterns (P1–P14):** what to *add*, not only what to remove. Removing tics makes text clean; clean, voiceless text is its own tell.
- **Calibration corpus:** 12 pre-LLM sources across nine fields (biology, computer science, mathematics, economics, statistics, psychology, philosophy of mind), 1945–2015, each contributing a verbatim model sentence.
- **Process additions:** a calibrated-confidence step, a positive pass, and a read-it-aloud (spoken-language) test.
- **[`human-factors-analysis.md`](human-factors-analysis.md):** the full analysis with verbatim excerpts and a removal→addition cross-map.

## Installation

### Claude Code

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/Gavin-Qiao/humanizer.git ~/.claude/skills/humanizer
```

Or copy the skill file manually if you already have this repo cloned:

```bash
mkdir -p ~/.claude/skills/humanizer
cp SKILL.md ~/.claude/skills/humanizer/
```

### OpenCode

```bash
mkdir -p ~/.config/opencode/skills
git clone https://github.com/Gavin-Qiao/humanizer.git ~/.config/opencode/skills/humanizer
```

> **Note:** OpenCode also scans `~/.claude/skills/` for compatibility, so a single clone into `~/.claude/skills/humanizer/` works for both tools.

## Usage

### Claude Code / OpenCode

```
/humanizer

[paste your text here]
```

Or ask the model directly:

```
Please humanize this text: [your text]
```

### Voice calibration

To match your personal writing style, provide a sample of your own writing:

```
/humanizer

Here's a sample of my writing for voice matching:
[paste 2-3 paragraphs of your own writing]

Now humanize this text:
[paste AI text to humanize]
```

The skill will analyze your sentence rhythm, word choices, and quirks, then apply them to the rewrite instead of producing generic "clean" output.

## Overview

**Part I** is based on [Wikipedia's "Signs of AI writing"](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), maintained by WikiProject AI Cleanup, drawn from observations of thousands of instances of AI-generated text. It also includes a final "obviously AI generated" audit pass and a second rewrite, to catch lingering AI-isms.

**Part II** is the constructive half. It was derived from acclaimed writing published before large language models existed (1945–2015), and asks the opposite question: not "what tells on the machine" but "what does a human writer actually do that a model tends not to." The full method and excerpts are in [`human-factors-analysis.md`](human-factors-analysis.md).

> Key insight from Wikipedia: "LLMs use statistical algorithms to guess what should come next. The result tends toward the most statistically likely result that applies to the widest variety of cases."

## Part I — 29 patterns detected (with before/after examples)

### Content patterns

| # | Pattern | Before | After |
| --- | --- | --- | --- |
| 1 | **Significance inflation** | "marking a pivotal moment in the evolution of..." | "was established in 1989 to collect regional statistics" |
| 2 | **Notability name-dropping** | "cited in NYT, BBC, FT, and The Hindu" | "In a 2024 NYT interview, she argued..." |
| 3 | **Superficial -ing analyses** | "symbolizing... reflecting... showcasing..." | Remove or expand with actual sources |
| 4 | **Promotional language** | "nestled within the breathtaking region" | "is a town in the Gonder region" |
| 5 | **Vague attributions** | "Experts believe it plays a crucial role" | "according to a 2019 survey by..." |
| 6 | **Formulaic challenges** | "Despite challenges... continues to thrive" | Specific facts about actual challenges |

### Language patterns

| # | Pattern | Before | After |
| --- | --- | --- | --- |
| 7 | **AI vocabulary** | "Actually... additionally... testament... landscape... showcasing" | "also... remain common" |
| 8 | **Copula avoidance** | "serves as... features... boasts" | "is... has" |
| 9 | **Negative parallelisms / tailing negations** | "It's not just X, it's Y", "..., no guessing" | State the point directly |
| 10 | **Rule of three** | "innovation, inspiration, and insights" | Use natural number of items |
| 11 | **Synonym cycling** | "protagonist... main character... central figure... hero" | "protagonist" (repeat when clearest) |
| 12 | **False ranges** | "from the Big Bang to dark matter" | List topics directly |
| 13 | **Passive voice / subjectless fragments** | "No configuration file needed" | Name the actor when it helps clarity |

### Style patterns

| # | Pattern | Before | After |
| --- | --- | --- | --- |
| 14 | **Em dash overuse** | "institutions—not the people—yet this continues—" | Prefer commas or periods |
| 15 | **Boldface overuse** | "**OKRs**, **KPIs**, **BMC**" | "OKRs, KPIs, BMC" |
| 16 | **Inline-header lists** | "**Performance:** Performance improved" | Convert to prose |
| 17 | **Title Case headings** | "Strategic Negotiations And Partnerships" | "Strategic negotiations and partnerships" |
| 18 | **Emojis** | "🚀 Launch Phase: 💡 Key Insight:" | Remove emojis |
| 19 | **Curly quotes** | curly `“...”` | straight `"..."` |
| 26 | **Hyphenated word pairs** | "cross-functional, data-driven, client-facing" | Drop hyphens on common word pairs |
| 27 | **Persuasive authority tropes** | "At its core, what matters is..." | State the point directly |
| 28 | **Signposting announcements** | "Let's dive in", "Here's what you need to know" | Start with the content |
| 29 | **Fragmented headers** | "## Performance" + "Speed matters." | Let the heading do the work |

### Communication patterns

| # | Pattern | Before | After |
| --- | --- | --- | --- |
| 20 | **Chatbot artifacts** | "I hope this helps! Let me know if..." | Remove entirely |
| 21 | **Cutoff disclaimers** | "While details are limited in available sources..." | Find sources or remove |
| 22 | **Sycophantic tone** | "Great question! You're absolutely right!" | Respond directly |

### Filler and hedging

| # | Pattern | Before | After |
| --- | --- | --- | --- |
| 23 | **Filler phrases** | "In order to", "Due to the fact that" | "To", "Because" |
| 24 | **Excessive hedging** | "could potentially possibly" | "may" (see P1: calibrate, don't blanket-delete) |
| 25 | **Generic conclusions** | "The future looks bright" | Specific plans or facts |

## Part II — 14 positive human patterns (what to add)

Each is anchored to a verbatim sentence from a writer who never met an LLM. Full excerpts, context, and sources are in [`human-factors-analysis.md`](human-factors-analysis.md).

| # | Pattern | The idea | Model source |
| --- | --- | --- | --- |
| P1 | **Calibrated confidence** | Match certainty to evidence; re-sort hedges instead of deleting them | Wilkins/Watson–Crick, 1953 |
| P2 | **A first-person thinker** | Let an "I"/"we" own the claims where register allows | Turing, 1950 |
| P3 | **Engage the strongest counterargument** | Raise the best objection, then answer it | Turing, 1950 |
| P4 | **Concrete, worked detail** | Cash out abstractions in something you can picture | Feynman, 1974 |
| P5 | **Analogies that explain** | Keep analogies that let the reader predict something | Turing, 1950 |
| P6 | **Plain words for big ideas** | Prefer the shorter, older word | Watson & Crick, 1953 |
| P7 | **Real rhythm, including brevity** | Vary sentence length; short sentence as the punch | Feynman, 1974 |
| P8 | **Earned understatement** | Underplay big findings; let the reader supply the awe | Watson & Crick, 1953 |
| P9 | **Dry humor and personality** | Stop sanding off the wry aside | Dijkstra, 1968 |
| P10 | **Specific generosity (name names)** | Credit and disagree by name, not "experts say" | Watson & Crick, 1953 |
| P11 | **Connective tissue that tracks reasoning** | Transitions that report logic, not participial filler | Watson & Crick, 1953 |
| P12 | **Coin and define your terms** | Name a concept once and reuse the name | Chalmers, 1995; Gould & Lewontin, 1979 |
| P13 | **Earn an aphorism** | One compressed, load-bearing line | Box, 1976; Graham, 2015 |
| P14 | **Write like you talk** | Read it aloud; replace anything you wouldn't say to a friend | Graham, 2015; Varian, 1997 |

## Full example

**Before (AI-sounding):**
> Great question! Here is an essay on this topic. I hope this helps!
>
> AI-assisted coding serves as an enduring testament to the transformative potential of large language models, marking a pivotal moment in the evolution of software development. In today's rapidly evolving technological landscape, these groundbreaking tools—nestled at the intersection of research and practice—are reshaping how engineers ideate, iterate, and deliver, underscoring their vital role in modern workflows.
>
> At its core, the value proposition is clear: streamlining processes, enhancing collaboration, and fostering alignment. The tool serves as a catalyst. The assistant functions as a partner. The system stands as a foundation for innovation.
>
> In conclusion, the future looks bright. Exciting times lie ahead as we continue this journey toward excellence. Let me know if you'd like me to expand on any section!

**After (humanized):**
> AI coding assistants can speed up the boring parts of the job. They're great at boilerplate: config files and the little glue code you don't want to write. They can also help you sketch a test, but you still have to read it.
>
> The dangerous part is how confident the suggestions look. I've accepted code that compiled and passed lint, then discovered later it missed the point because I stopped paying attention.
>
> If you treat it like autocomplete and review every line, it's useful. If you use it to avoid thinking, it will help you ship bugs faster. The only real backstop is tests. Without them, you're mostly judging vibes.

## Attribution

- Forked from [blader/humanizer](https://github.com/blader/humanizer), MIT, Copyright (c) 2025 Siqi Chen. The original copyright and license are retained in [LICENSE](LICENSE); provenance and the list of changes are in [NOTICE](NOTICE).
- **Part I** patterns are based on [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) and [WikiProject AI Cleanup](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup).
- **Part II** is derived from: Turing (1950); Watson & Crick, with Wilkins et al. and Franklin & Gosling (1953); Dijkstra (1968); Vannevar Bush (1945); Feynman (1974); Miller (1956); Box (1976); Gould & Lewontin (1979); Chalmers (1995); Varian (1997); Graham (2015). Full citations in [`human-factors-analysis.md`](human-factors-analysis.md).

## References

- [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) — primary source for Part I
- [WikiProject AI Cleanup](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup)
- [`human-factors-analysis.md`](human-factors-analysis.md) — the analysis behind Part II

## Version history

- **2.7.0** — Broadened the Part II calibration corpus to other fields and up to 2015 (psychology, statistics, evolutionary biology, philosophy of mind, economics, an essay on writing); added three positive patterns: P12 coin and define your terms, P13 earn an aphorism, P14 write like you talk; added a read-it-aloud step.
- **2.6.0** — Added **Part II: Positive Human Patterns** (P1–P11) derived from pre-LLM writing, a calibrated-confidence step, a positive pass, and `human-factors-analysis.md`. (Fork of blader/humanizer.)
- **2.5.1** — Added a passive-voice / subjectless-fragment rule, raising the total to 29 patterns.
- **2.5.0** — Added patterns for persuasive framing, signposting, and fragmented headers; expanded negative parallelisms to cover tailing negations; tightened wording around em dash overuse.
- **2.4.0** — Added voice calibration: match the user's personal writing style from samples.
- **2.3.0** — Added pattern: hyphenated word pair overuse.
- **2.2.0** — Added a final "obviously AI generated" audit + second-pass rewrite prompts.
- **2.1.1** — Fixed curly vs straight quotes example.
- **2.1.0** — Added before/after examples for all patterns.
- **2.0.0** — Complete rewrite based on raw Wikipedia article content.
- **1.0.0** — Initial release.

## License

MIT — Copyright (c) 2025 Siqi Chen and Copyright (c) 2026 Gavin-Qiao. See [LICENSE](LICENSE). Personal-use fork.
