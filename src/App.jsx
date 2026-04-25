import { useEffect, useMemo, useRef, useState } from 'react';

const PROFILE = {
  name: 'Padmapiyush Pathak',
  title: 'Data Engineer | Batch & Streaming Pipelines | AWS',
  location: 'Noida, Uttar Pradesh, India',
  phone: '9532683568',
  branding:
    'Data Engineering Analyst transforming raw, high-volume data into reliable, analytics-ready systems for faster business decisions.',
  about:
    'I am a Data Engineering Analyst with hands-on experience building production ETL/ELT pipelines, optimizing data workflows, and enabling analytics teams with clean, trusted datasets. I focus on scalable pipeline architecture, data quality, and orchestration across modern cloud data stacks using SQL, Python, Databricks, and Azure services.',
  contact: {
    email: 'thepadmapiyush@gmail.com',
    linkedin: 'https://www.linkedin.com/in/padmapiyush',
    github: 'https://github.com/padmapiyush'
  },
  resumeUrl: 'https://example.com/padmapiyush-pathak-data-engineer-resume.pdf'
};

const SKILLS = {
  'Top Skills': ['Extract, Transform, Load (ETL)', 'Azure Databricks', 'Data Engineering'],
  'Core Engineering': [
    'Batch and streaming data pipelines',
    'Data modeling for analytics',
    'Data quality and governance',
    'Pipeline optimization and observability'
  ],
  SQL: ['SQL Server (T-SQL)', 'Query tuning', 'Transformations for reporting', 'Data validation'],
  Python: ['PySpark transformations', 'ETL automation', 'API integration'],
  Cloud: ['Azure Data Factory', 'Azure Resource Groups', 'Storage Accounts', 'Managed Identities & Key Vault'],
  DevOps: ['Terraform (IaC)', 'GitHub Actions CI/CD', 'Release automation'],
  Analytics: ['Power BI', 'Tableau', 'A/B testing analysis', 'Business KPI storytelling'],
  Certifications: [
    'Google Data Analytics Professional Certificate',
    'The Python Certification Course',
    'Learning Ansible',
    'Data Analytics A-Z with Python',
    'Graphite and Grafana: Visualizing Application Performance'
  ],
  Honors: ['Spot Award', 'Shining Star Award']
};

const PROJECTS = {
  secure_azure_data_platform: {
    type: 'Data Engineering Project',
    title: 'Secure Azure Data Platform Setup (IDEMIA-style)',
    summary:
      'Provisioned secure cloud foundations for enterprise-scale data processing across environments.',
    problem:
      'Data workloads required secure, repeatable infrastructure and identity controls before production onboarding.',
    architecture:
      'Implemented Azure Resource Groups, Storage Accounts, virtual networking, Managed Identities, and Key Vault integrations; automated provisioning using Terraform and CI/CD workflows.',
    stack: ['Azure', 'Terraform', 'GitHub Actions', 'Key Vault', 'Managed Identity'],
    impact: [
      'Reduced environment setup time by ~50% through IaC.',
      'Improved deployment consistency across dev/test/prod.',
      'Strengthened security posture with standardized secret management.'
    ]
  },
  million_record_etl_fabric: {
    type: 'Data Engineering Project',
    title: '10M+ Records/Day ETL Fabric with ADF + Databricks',
    summary:
      'Built production ETL/ELT pipelines processing 10M+ records daily with faster runtime.',
    problem:
      'Existing ingestion pipelines were slow and brittle, impacting downstream analytics SLAs.',
    architecture:
      'Orchestrated ingestion and transformations using Azure Data Factory, Databricks, PySpark, and SQL Server models. Added monitoring and retry logic for robust operations.',
    stack: ['Azure Data Factory', 'Databricks', 'PySpark', 'SQL Server (T-SQL)'],
    impact: [
      'Improved runtime efficiency by 30–40%.',
      'Reduced compute cost by 25% via optimized transformations.',
      'Increased pipeline reliability for business-critical reporting.'
    ]
  },
  operations_kpi_command_center: {
    type: 'Data Analytics Project',
    title: 'Operations KPI Command Center (Power BI + Tableau)',
    summary:
      'Created interactive operations dashboards that replaced manual reporting with self-serve insights.',
    problem:
      'Operational teams relied on static reports and manual consolidation, causing delays in decisions.',
    architecture:
      'Modeled cleaned datasets in SQL/Python, published semantic KPI layers, and delivered multi-stakeholder dashboards in Power BI and Tableau with role-based visibility.',
    stack: ['SQL', 'Python', 'Power BI', 'Tableau'],
    impact: [
      'Delivered 7+ interactive dashboards.',
      'Reduced manual reporting effort by 40%.',
      'Improved decision turnaround for operations teams.'
    ]
  },
  vendor_experiment_analytics: {
    type: 'Data Analytics Project',
    title: 'Vendor Optimization via A/B Testing Analytics',
    summary:
      'Designed experiment analytics for vendor evaluation and delivery performance improvement.',
    problem:
      'Vendor selection lacked evidence-based experimentation and measurable outcome tracking.',
    architecture:
      'Built experiment datasets in SQL/Python, defined conversion/cost/delivery metrics, and surfaced before-vs-after performance dashboards for stakeholder review.',
    stack: ['SQL', 'Python', 'Power BI', 'Experiment Design'],
    impact: [
      'Achieved 12% cost reduction in targeted workflows.',
      'Improved delivery timelines by 8% in test cohorts.',
      'Standardized experimentation process for procurement analytics.'
    ]
  }
};

const EXPERIENCE = [
  {
    period: 'August 2025 - Present',
    role: 'Data Engineering Analyst · IDEMIA Public Security · Noida',
    highlights: [
      'Provisioned and configured Azure infrastructure (Resource Groups, Storage Accounts, networking, Managed Identities, Key Vault).',
      'Designed and implemented production ETL/ELT pipelines with Azure Data Factory processing 10M+ records/day.',
      'Developed PySpark transformation logic in Databricks to improve large-scale processing performance and reduce compute cost by 25%.',
      'Built and tuned SQL-based pipelines in SQL Server (T-SQL) for analytics data modeling.',
      'Implemented Terraform-based IaC to reduce deployment time by 50% and improve environment consistency.',
      'Developed CI/CD workflows with GitHub Actions to streamline releases and improve reliability.',
      'Collaborated with cross-functional analytics teams on requirements, delivery, and pipeline reliability.'
    ]
  },
  {
    period: 'June 2025 - August 2025',
    role: 'Data Analyst · IDEMIA · Noida',
    highlights: [
      'Analyzed and transformed datasets with SQL, Python, and Excel for operational decision-making.',
      'Designed and delivered 7+ interactive dashboards in Power BI and Tableau reducing manual reporting by 40%.',
      'Led A/B testing initiatives that delivered 12% cost reduction and 8% faster delivery timelines.'
    ]
  },
  {
    period: 'June 2024 - May 2025',
    role: 'Analyst Trainee · IDEMIA · Noida',
    highlights: ['Supported analytics workflow standardization and built foundational reporting assets.']
  },
  {
    period: 'January 2024 - May 2024',
    role: 'Data Analyst Apprentice · IDEMIA · Noida',
    highlights: ['Built data preparation routines and supported business reporting pipelines.']
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
    text: `Role: ${PROFILE.title} | Location: ${PROFILE.location}`
  },
  {
    id: crypto.randomUUID(),
    type: 'system',
    text: "Type 'help' to explore commands and 'projects' to review case studies."
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
        { text: "Tip: Try 'projects' then 'open million_record_etl_fabric'." }
      ]);
      return;
    }

    if (normalized === 'about') {
      queueOutput([{ text: PROFILE.about }]);
      return;
    }

    if (normalized === 'skills') {
      queueOutput([
        { text: 'Skills, Certifications, and Honors:' },
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
        { text: `Mobile: ${PROFILE.phone}` },
        { text: `Email: ${PROFILE.contact.email}` },
        { text: `LinkedIn: ${PROFILE.contact.linkedin}` },
        { text: `GitHub: ${PROFILE.contact.github}` },
        { text: `Location: ${PROFILE.location}` }
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
      queueOutput([{ text: '☕ Brew complete. Pipelines ready for production.' }]);
      return;
    }

    if (normalized === 'joke') {
      queueOutput([
        { text: 'My ETL job and I have a lot in common — we both run better after retries.' }
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
        { text: '[1/5] Ingesting records with ADF trigger...' },
        { text: '[2/5] Landing Bronze Delta tables in Databricks...' },
        { text: '[3/5] Running PySpark transformations + data quality checks...' },
        { text: '[4/5] Building Gold marts for BI consumption...' },
        { text: '[5/5] Publishing dashboard dataset... done ✅' }
      ]);
      return;
    }

    if (normalized.startsWith('github')) {
      const username = value.split(' ')[1] || 'padmapiyush';

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
