import { useEffect, useMemo, useRef, useState } from 'react';

const PROFILE = {
  name: 'Alex Carter',
  title: 'Senior Data Engineer',
  branding:
    'I build reliable, cost-efficient data platforms that turn noisy events into trustworthy decisions.',
  about:
    'Data Engineer with 7+ years delivering batch + streaming pipelines, cloud lakehouse platforms, and governed analytics for product, finance, and operations teams.',
  contact: {
    email: 'alex.carter.data@gmail.com',
    linkedin: 'https://www.linkedin.com/in/alex-carter-data',
    github: 'https://github.com/alexcarter-data'
  },
  resumeUrl: 'https://example.com/alex-carter-data-engineer-resume.pdf'
};

const SKILLS = {
  SQL: ['Query optimization', 'Data modeling', 'Dimensional modeling', 'Performance tuning'],
  Python: ['PySpark', 'Pandas', 'Data quality frameworks', 'API ingestion'],
  Databricks: ['Delta Lake', 'Unity Catalog', 'Auto Loader', 'Job orchestration'],
  Airflow: ['DAG authoring', 'Backfill strategy', 'SLA alerting', 'Operational monitoring'],
  'Power BI': ['Semantic models', 'DAX measures', 'Executive dashboards', 'Row-level security']
};

const PROJECTS = {
  customer360: {
    title: 'Customer 360 Lakehouse',
    summary: 'Unified fragmented customer events into one trusted profile used by growth and support.',
    problem:
      'Customer interactions lived across CRM, product events, billing, and support systems, causing duplicate outreach and inconsistent reporting.',
    architecture:
      'Airflow orchestrates incremental ingestion into Databricks Bronze. PySpark + SQL transform into Silver entities and Gold customer marts. Power BI consumes Gold tables through governed semantic models.',
    stack: ['Databricks', 'Airflow', 'SQL', 'Python', 'Power BI', 'Delta Lake'],
    impact: [
      'Reduced time-to-insight from 2 days to 30 minutes.',
      'Improved campaign targeting accuracy by 23%.',
      'Cut manual reporting effort by ~15 analyst hours/week.'
    ]
  },
  finops: {
    title: 'Cloud FinOps Pipeline',
    summary: 'Built daily cost intelligence pipelines with anomaly detection and chargeback reporting.',
    problem:
      'Engineering leaders lacked visibility into cloud spend drivers and discovered budget overruns too late.',
    architecture:
      'Billing exports land in object storage, loaded through Databricks Auto Loader, enriched with tagging metadata, and exposed via Gold fact tables. Airflow triggers alerts for abnormal spend patterns.',
    stack: ['Databricks', 'Airflow', 'SQL', 'Python'],
    impact: [
      'Lowered monthly cloud spend by 18% in 2 quarters.',
      'Enabled team-level cost ownership with automated chargeback.',
      'Detected anomalies within 2 hours instead of weekly reviews.'
    ]
  },
  realtime_orders: {
    title: 'Real-Time Order Reliability Platform',
    summary: 'Introduced near-real-time order event processing for ops and customer success teams.',
    problem:
      'Order failure signals arrived too late, resulting in delayed customer communication and fulfillment risk.',
    architecture:
      'Streaming ingestion captures order events into Delta tables with CDC logic, while Airflow coordinates reconciliation and late-arriving event repair jobs. Curated metrics feed operational dashboards.',
    stack: ['Databricks', 'SQL', 'Python', 'Airflow'],
    impact: [
      'Reduced failed-order detection latency from 4 hours to under 5 minutes.',
      'Improved fulfillment SLA adherence by 14%.',
      'Decreased support ticket volume tied to order status issues by 19%.'
    ]
  }
};

const EXPERIENCE = [
  {
    period: '2023 - Present',
    role: 'Senior Data Engineer · Nimbus Commerce',
    highlights: [
      'Led migration from legacy warehouse ETL to Databricks lakehouse.',
      'Designed reusable data quality checks across 60+ pipelines.'
    ]
  },
  {
    period: '2020 - 2023',
    role: 'Data Engineer · Northstar Analytics',
    highlights: [
      'Built Airflow-based orchestration framework reducing DAG failures by 35%.',
      'Implemented semantic marts powering executive KPI reporting.'
    ]
  },
  {
    period: '2018 - 2020',
    role: 'BI / Data Analyst · Vertex Retail',
    highlights: [
      'Transitioned reporting workflows from spreadsheets to scalable SQL models.',
      'Automated KPI reporting and improved stakeholder data trust.'
    ]
  }
];

const COMMANDS = [
  'help',
  'about',
  'skills',
  'projects',
  'open',
  'experience',
  'contact',
  'resume',
  'clear',
  'whoami',
  'theme',
  'coffee',
  'joke',
  'github',
  'run pipeline demo'
];

const initialLines = [
  {
    id: crypto.randomUUID(),
    type: 'system',
    text: `Welcome to ${PROFILE.name}'s CLI Portfolio.`
  },
  {
    id: crypto.randomUUID(),
    type: 'system',
    text: "Type 'help' to see available commands."
  }
];

const TYPE_INTERVAL_MS = 12;

const normalize = (value) => value.toLowerCase().trim();

const formatProject = (project) => [
  `Project: ${project.title}`,
  `Problem: ${project.problem}`,
  `Architecture: ${project.architecture}`,
  `Tech Stack: ${project.stack.join(', ')}`,
  'Impact:',
  ...project.impact.map((item) => `  - ${item}`)
];

function App() {
  const [lines, setLines] = useState(initialLines);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState('dark');
  const [isTyping, setIsTyping] = useState(false);

  const terminalRef = useRef(null);
  const typingQueueRef = useRef([]);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (isTyping) {
      return;
    }

    if (!typingQueueRef.current.length) {
      return;
    }

    const next = typingQueueRef.current.shift();
    setIsTyping(true);

    let idx = 0;
    const lineId = crypto.randomUUID();
    setLines((prev) => [...prev, { id: lineId, type: next.type, text: '' }]);

    const timer = setInterval(() => {
      idx += 1;

      setLines((prev) =>
        prev.map((entry) =>
          entry.id === lineId
            ? {
                ...entry,
                text: next.text.slice(0, idx)
              }
            : entry
        )
      );

      if (idx >= next.text.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, TYPE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isTyping, lines]);

  const queueOutput = (items) => {
    typingQueueRef.current.push(
      ...items.map((item) => ({
        type: item.type ?? 'output',
        text: item.text
      }))
    );

    setLines((prev) => [...prev]);
  };

  const suggestions = useMemo(() => {
    const trimmed = normalize(input);
    if (!trimmed) return COMMANDS;
    return COMMANDS.filter((cmd) => cmd.startsWith(trimmed));
  }, [input]);

  const prompt = `${PROFILE.name.split(' ')[0].toLowerCase()}@portfolio:~$`;

  const runCommand = async (rawInput) => {
    const value = rawInput.trim();
    const normalized = normalize(value);

    if (!value) return;

    setLines((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: 'input',
        text: `${prompt} ${value}`
      }
    ]);

    if (normalized === 'clear') {
      setLines([]);
      return;
    }

    if (normalized === 'help') {
      queueOutput([
        { text: 'Available commands:' },
        ...COMMANDS.map((cmd) => ({ text: `  - ${cmd}` }))
      ]);
      return;
    }

    if (normalized === 'about') {
      queueOutput([{ text: PROFILE.about }]);
      return;
    }

    if (normalized === 'skills') {
      queueOutput([
        { text: 'Skills:' },
        ...Object.entries(SKILLS).flatMap(([group, values]) => [
          { text: `  ${group}:` },
          ...values.map((skill) => ({ text: `    - ${skill}` }))
        ])
      ]);
      return;
    }

    if (normalized === 'projects') {
      queueOutput([
        { text: 'Projects (use open <project_name> for full case study):' },
        ...Object.entries(PROJECTS).map(([key, project]) => ({ text: `  - ${key}: ${project.summary}` }))
      ]);
      return;
    }

    if (normalized.startsWith('open ')) {
      const key = normalize(normalized.replace('open ', ''));
      const selected = PROJECTS[key];
      if (!selected) {
        queueOutput([{ type: 'error', text: `Project '${key}' not found.` }]);
        return;
      }

      queueOutput(formatProject(selected).map((line) => ({ text: line })));
      return;
    }

    if (normalized === 'experience') {
      queueOutput([
        { text: 'Experience Timeline:' },
        ...EXPERIENCE.flatMap((item) => [
          { text: `  ${item.period} · ${item.role}` },
          ...item.highlights.map((highlight) => ({ text: `    - ${highlight}` }))
        ])
      ]);
      return;
    }

    if (normalized === 'contact') {
      queueOutput([
        { text: `Email: ${PROFILE.contact.email}` },
        { text: `LinkedIn: ${PROFILE.contact.linkedin}` },
        { text: `GitHub: ${PROFILE.contact.github}` }
      ]);
      return;
    }

    if (normalized === 'resume') {
      queueOutput([{ text: `Resume: ${PROFILE.resumeUrl}` }]);
      return;
    }

    if (normalized === 'whoami') {
      queueOutput([{ text: PROFILE.branding }]);
      return;
    }

    if (normalized === 'coffee') {
      queueOutput([{ text: '☕ Brewing... Data pipelines run better with caffeine.' }]);
      return;
    }

    if (normalized === 'joke') {
      queueOutput([
        {
          text: 'Why did the data engineer break up with the CSV? It had too many unresolved issues.'
        }
      ]);
      return;
    }

    if (normalized === 'theme') {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
      queueOutput([{ text: `Theme switched to ${theme === 'dark' ? 'light' : 'dark'} mode.` }]);
      return;
    }

    if (normalized === 'run pipeline demo') {
      queueOutput([
        { text: '[1/4] Ingesting source events...' },
        { text: '[2/4] Validating schema and quality checks...' },
        { text: '[3/4] Transforming Silver -> Gold models...' },
        { text: '[4/4] Publishing dashboard dataset... done ✅' }
      ]);
      return;
    }

    if (normalized.startsWith('github')) {
      const username = value.split(' ')[1] || 'alexcarter-data';

      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);

        if (!response.ok) {
          throw new Error('GitHub API request failed');
        }

        const repos = await response.json();

        if (!repos.length) {
          queueOutput([{ text: `No repositories found for ${username}.` }]);
          return;
        }

        queueOutput([
          { text: `Latest repositories for ${username}:` },
          ...repos.map((repo) => ({ text: `  - ${repo.name}: ${repo.html_url}` }))
        ]);
      } catch {
        queueOutput([
          { type: 'error', text: 'Unable to reach GitHub API right now. Try again shortly.' }
        ]);
      }

      return;
    }

    queueOutput([{ type: 'error', text: `${value}: command not found. Type 'help' to list commands.` }]);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && !isTyping) {
      const current = input;
      setInput('');
      setHistory((prev) => [current, ...prev.filter((item) => item !== current)]);
      setHistoryIndex(-1);
      runCommand(current);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHistoryIndex((prev) => {
        const nextIndex = Math.min(prev + 1, history.length - 1);
        const nextValue = history[nextIndex] ?? '';
        setInput(nextValue);
        return nextIndex;
      });
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHistoryIndex((prev) => {
        const nextIndex = Math.max(prev - 1, -1);
        const nextValue = nextIndex === -1 ? '' : history[nextIndex] ?? '';
        setInput(nextValue);
        return nextIndex;
      });
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      if (suggestions.length) {
        setInput(suggestions[0]);
      }
    }
  };

  return (
    <main className="terminal-page">
      <section className="terminal-window" role="application" aria-label="CLI portfolio terminal">
        <header className="terminal-header">
          <div className="terminal-dots">
            <span />
            <span />
            <span />
          </div>
          <p>
            {PROFILE.name} · {PROFILE.title}
          </p>
          <button className="toggle" onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}>
            {theme === 'dark' ? 'Light' : 'Dark'} Theme
          </button>
        </header>

        <div className="terminal-output" ref={terminalRef}>
          {lines.map((line) => (
            <p key={line.id} className={`line line-${line.type}`}>
              {line.text}
            </p>
          ))}

          <label className="prompt-row" htmlFor="terminal-input">
            <span className="prompt">{prompt}</span>
            <input
              id="terminal-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              autoFocus
            />
            <span className="cursor" aria-hidden="true" />
          </label>

          {!!input && suggestions.length > 0 && (
            <p className="suggestion">suggestion: {suggestions[0]} {suggestions.length > 1 ? `(+${suggestions.length - 1} more)` : ''}</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
