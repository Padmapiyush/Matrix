import { useEffect, useMemo, useRef, useState } from 'react';

const PROFILE = {
  name: 'Riya Sharma',
  title: 'Data Engineering Analyst',
  branding:
    'Data Engineering Analyst focused on building trusted analytics layers and production-grade data pipelines that directly improve business decisions.',
  about:
    'I design and maintain modern data platforms across ingestion, transformation, and BI delivery. My work combines analytics storytelling with strong engineering practices using SQL, Python, Databricks, and Airflow.',
  contact: {
    email: 'riya.sharma.analytics@gmail.com',
    linkedin: 'https://www.linkedin.com/in/riya-sharma-data',
    github: 'https://github.com/riyasharma-data'
  },
  resumeUrl: 'https://example.com/riya-sharma-data-engineering-analyst-resume.pdf'
};

const SKILLS = {
  'Data Engineering': [
    'Medallion architecture (Bronze/Silver/Gold)',
    'Batch and streaming ETL/ELT design',
    'Data quality checks and observability',
    'Pipeline performance optimization'
  ],
  SQL: ['Advanced joins/window functions', 'Dimensional modeling', 'Query tuning', 'Data validation frameworks'],
  Python: ['PySpark ETL', 'Pandas analytics', 'API ingestion', 'Automation scripting'],
  Databricks: ['Delta Lake', 'Unity Catalog', 'Auto Loader', 'Workflows & Jobs'],
  Airflow: ['DAG design', 'Scheduling and backfills', 'SLA alerting', 'Production monitoring'],
  Analytics: ['Power BI', 'KPI design', 'Executive dashboards', 'Business storytelling']
};

const PROJECTS = {
  sales_intelligence_360: {
    type: 'Data Analytics Project',
    title: 'Sales Intelligence 360 Dashboard',
    summary:
      'Unified CRM, product, and revenue data into a KPI command center used by sales, finance, and leadership.',
    problem:
      'Revenue reporting was delayed, and leadership lacked a single trusted source for pipeline conversion and regional performance.',
    architecture:
      'Built scheduled ingestion from CRM + finance systems into Databricks Bronze, transformed into conformed dimensions/facts in Silver/Gold using SQL + PySpark, and served executive dashboards in Power BI.',
    stack: ['Databricks', 'SQL', 'Python', 'Power BI', 'Delta Lake'],
    impact: [
      'Reduced monthly reporting cycle from 3 days to 2 hours.',
      'Improved forecast accuracy by 17% through standardized KPI logic.',
      'Increased regional drill-down adoption among sales leaders to 90% weekly usage.'
    ]
  },
  churn_risk_insights: {
    type: 'Data Analytics Project',
    title: 'Customer Churn Risk Insights Platform',
    summary:
      'Delivered churn-risk segmentation and renewal-risk dashboards for customer success teams.',
    problem:
      'Customer success teams could not proactively identify at-risk accounts due to disconnected engagement and billing signals.',
    architecture:
      'Ingested product usage, support tickets, and billing events into a curated model. Created churn-risk scoring features with Python and published account-level risk views and action recommendations in BI dashboards.',
    stack: ['SQL', 'Python', 'Databricks', 'Airflow', 'Power BI'],
    impact: [
      'Enabled weekly at-risk account targeting across 4 customer segments.',
      'Improved renewal retention by 11% in two quarters.',
      'Cut manual account health prep time by ~12 hours/week.'
    ]
  },
  realtime_fraud_lakehouse: {
    type: 'Data Engineering Project',
    title: 'Real-Time Fraud Detection Lakehouse Pipeline',
    summary:
      'Built a streaming lakehouse pipeline for near real-time fraud scoring and investigator alerting.',
    problem:
      'Fraud detection relied on hourly jobs, delaying intervention and increasing financial exposure.',
    architecture:
      'Streamed transaction events into Delta Bronze, enriched with entity/device intelligence in Silver, and produced fraud feature marts in Gold. Airflow orchestrated daily retraining and reconciliation workflows.',
    stack: ['Databricks', 'Structured Streaming', 'Airflow', 'SQL', 'Python', 'Delta Lake'],
    impact: [
      'Reduced fraud alert latency from 60 minutes to under 3 minutes.',
      'Supported 25M+ daily events with resilient checkpointing and replay.',
      'Improved confirmed fraud catch rate by 21%.'
    ]
  },
  iot_medallion_observability: {
    type: 'Data Engineering Project',
    title: 'IoT Medallion Pipeline with Data Observability',
    summary:
      'Implemented a scalable IoT ingestion and quality-observability framework for manufacturing telemetry.',
    problem:
      'Sensor data quality issues and schema drift caused unreliable plant performance metrics.',
    architecture:
      'Auto Loader ingested high-volume telemetry into Bronze; quality contracts validated schema, null thresholds, and freshness before promotion to Silver/Gold. Airflow managed SLA checks and incident notifications.',
    stack: ['Databricks', 'Auto Loader', 'Airflow', 'SQL', 'Python', 'Delta Live Tables'],
    impact: [
      'Decreased pipeline failures from schema drift by 70%.',
      'Improved trusted telemetry coverage to 98% across monitored lines.',
      'Cut incident triage time by 45% via automated quality alerts.'
    ]
  }
};

const EXPERIENCE = [
  {
    period: '2024 - Present',
    role: 'Data Engineering Analyst · Nova Retail Analytics',
    highlights: [
      'Developed analytics-ready Gold layers for finance and growth reporting.',
      'Implemented standardized quality checks across mission-critical pipelines.'
    ]
  },
  {
    period: '2021 - 2024',
    role: 'Data Analyst / Junior Data Engineer · BrightEdge Commerce',
    highlights: [
      'Automated ETL reporting workflows and improved dashboard reliability.',
      'Partnered with business teams to translate KPI definitions into governed models.'
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
    text: "Type 'help' to explore commands and 'projects' to view portfolio case studies."
  }
];

const TYPE_INTERVAL_MS = 12;

const normalize = (value) => value.toLowerCase().trim();

const formatProject = (project) => [
  `${project.type}: ${project.title}`,
  `Problem: ${project.problem}`,
  `Architecture: ${project.architecture}`,
  `Tech Stack: ${project.stack.join(', ')}`,
  'Business Impact:',
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
    if (isTyping || !typingQueueRef.current.length) {
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
        ...COMMANDS.map((cmd) => ({ text: `  - ${cmd}` })),
        { text: "Tip: Try 'projects' then 'open realtime_fraud_lakehouse'." }
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
        { text: 'Portfolio Projects (2 Analytics + 2 Engineering):' },
        ...Object.entries(PROJECTS).map(([key, project]) => ({
          text: `  - ${key}: [${project.type}] ${project.summary}`
        }))
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
      queueOutput([{ text: '☕ Brewing... ETL reliability increases by +10 focus points.' }]);
      return;
    }

    if (normalized === 'joke') {
      queueOutput([
        {
          text: 'I told my pipeline to stay calm. It said: sorry, I am under a lot of pressure (from streaming).'
        }
      ]);
      return;
    }

    if (normalized === 'theme') {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      queueOutput([{ text: `Theme switched to ${newTheme} mode.` }]);
      return;
    }

    if (normalized === 'run pipeline demo') {
      queueOutput([
        { text: '[1/5] Pulling source data (API + files)...' },
        { text: '[2/5] Writing Bronze Delta tables...' },
        { text: '[3/5] Running quality checks and expectations...' },
        { text: '[4/5] Transforming to Silver/Gold marts...' },
        { text: '[5/5] Refreshing analytics model... done ✅' }
      ]);
      return;
    }

    if (normalized.startsWith('github')) {
      const username = value.split(' ')[1] || 'riyasharma-data';

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
            <p className="suggestion">
              suggestion: {suggestions[0]} {suggestions.length > 1 ? `(+${suggestions.length - 1} more)` : ''}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
