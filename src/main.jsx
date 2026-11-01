
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { experiments } from "./data/experiments";
import "./styles.css";

const files = [
  "Aim",
  "Requirements",
  "Procedure",
  "Terminal Commands",
  "Java Code",
  "Expected Output",
  "Viva Notes"
];

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button className="copy" onClick={copy}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function CodeBlock({ title, code }) {
  return (
    <div className="code-block">
      <div className="code-header">
        <span>{title}</span>
        <CopyButton code={code} />
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

function DataTable({ data }) {
  if (!data?.length) return null;

  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {data[0].map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProcedureContent({ procedure }) {
  return (
    <section className="content-section">
      <h2>Procedure</h2>

      {procedure?.map((step, index) => {
        if (typeof step === "string") {
          return (
            <div className="crud-step" key={index}>
              <div className="step-heading">
                <span className="step-number">{index + 1}</span>
                <h3>{step}</h3>
              </div>
            </div>
          );
        }

        return (
          <div className="crud-step" key={index}>
            <div className="step-heading">
              <span className="step-number">{index + 1}</span>
              <h3>{step.title}</h3>
            </div>

            {step.description && <p>{step.description}</p>}

            {step.commands?.map((command, commandIndex) => (
              <CodeBlock
                key={commandIndex}
                title={`Command ${commandIndex + 1}`}
                code={command}
              />
            ))}

            {step.code && (
              <CodeBlock
                title="File Content / Source Code"
                code={step.code}
              />
            )}

            {step.table && <DataTable data={step.table} />}

            {step.note && (
              <div className="step-note">{step.note}</div>
            )}

            {step.verify?.map((command, verifyIndex) => (
              <CodeBlock
                key={verifyIndex}
                title={`Verification ${verifyIndex + 1}`}
                code={command}
              />
            ))}
          </div>
        );
      })}
    </section>
  );
}

function App() {
  const [experiment, setExperiment] = useState(null);
  const [tab, setTab] = useState("Overview");
  const [search, setSearch] = useState("");

  const filteredExperiments = experiments.filter((item) =>
    `${item.title} ${item.short}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const open = (item) => {
    setExperiment(item);

    setTab(
      item.codeOnly
        ? item.codeTab
        : item.procedureOnly
          ? "Procedure"
          : item.commandsOnly
            ? item.commandTab
            : "Overview"
    );
  };

  const visibleTabs = !experiment
    ? []
    : experiment.codeOnly
      ? [experiment.codeTab]
      : experiment.procedureOnly
        ? ["Procedure"]
        : experiment.commandsOnly
          ? [experiment.commandTab]
          : ["Overview", ...files];

  const renderContent = () => {
    if (!experiment) {
      return (
        <div className="welcome">
          <div className="welcome-icon">▣</div>
          <h2>Welcome to BDA Practical Library</h2>
          <p>
            Select an experiment from the left panel to access
            its practical material.
          </p>
          <div className="welcome-count">
            {experiments.length} Experiments Available
          </div>
        </div>
      );
    }

    switch (tab) {
      case "Overview":
        return (
          <div className="overview-grid">
            <div className="info-card">
              <span>EXPERIMENT</span>
              <h3>{String(experiment.id).padStart(2, "0")}</h3>
            </div>

            <div className="info-card">
              <span>SUBJECT</span>
              <h3>Big Data Analytics</h3>
            </div>

            <div className="info-card full-card">
              <span>EXPERIMENT TITLE</span>
              <h3>{experiment.title}</h3>
              <p>{experiment.subtitle}</p>
            </div>

            <div className="info-card full-card">
              <span>AIM</span>
              <p>{experiment.aim}</p>
            </div>
          </div>
        );

      case "Aim":
        return (
          <section className="content-section">
            <h2>Aim</h2>
            <p>{experiment.aim}</p>
          </section>
        );

      case "Requirements":
        return (
          <section className="content-section">
            <h2>Hardware and Software Requirements</h2>
            <ul>
              {experiment.requirements?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        );

      case "Procedure":
        return (
          <ProcedureContent procedure={experiment.procedure} />
        );

      case "Terminal Commands":
        return (
          <section className="content-section">
            <h2>Terminal Commands</h2>

            {experiment.commands?.map((item, index) => (
              <CodeBlock
                key={index}
                title={item.title}
                code={item.command}
              />
            ))}
          </section>
        );

      case "Java Code":
        return (
          <section className="content-section">
            <h2>Java Source Code</h2>
            <CodeBlock
              title="WordCount.java"
              code={experiment.code}
            />
          </section>
        );

      case "Python Code":
        return (
          <section className="content-section">
            <h2>Python Source Code</h2>
            <CodeBlock
              title="BloomFilter.py"
              code={experiment.code}
            />
          </section>
        );

      case "Expected Output":
        return (
          <section className="content-section">
            <h2>Input</h2>
            <CodeBlock
              title="input.txt"
              code={experiment.input || ""}
            />

            <h2 className="output-heading">Expected Output</h2>

            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Word</th>
                    <th>Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {experiment.output?.map((item) => (
                    <tr key={item.word}>
                      <td>{item.word}</td>
                      <td>{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );

      case "Viva Notes":
        return (
          <section className="content-section">
            <h2>Viva Notes</h2>

            {experiment.viva?.length ? (
              <ul>
                {experiment.viva.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>Viva notes have not been added yet.</p>
            )}
          </section>
        );

      case "HDFS Commands":
        return (
          <section className="hdfs-section">
            <h2>HDFS File System Commands</h2>
            <p>
              Execute the following commands in the
              Cloudera QuickStart VM terminal.
            </p>

            <div className="hdfs-table-wrapper">
              <table className="hdfs-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Command</th>
                    <th>Purpose</th>
                    <th>Copy</th>
                  </tr>
                </thead>
                <tbody>
                  {experiment.commands?.map((item) => (
                    <tr key={item.no}>
                      <td>{item.no}</td>
                      <td><code>{item.command}</code></td>
                      <td>{item.purpose}</td>
                      <td><CopyButton code={item.command} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon">▣</span>
          <span>BDA Practical Library</span>
        </div>

        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search experiments..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </header>

      <div className="breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>BDA Experiments</span>
        {experiment && (
          <>
            <span>/</span>
            <strong>{experiment.short}</strong>
          </>
        )}
      </div>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-heading">QUICK ACCESS</div>

          <button
            className={`sidebar-link ${!experiment ? "active" : ""}`}
            onClick={() => {
              setExperiment(null);
              setTab("Overview");
            }}
          >
            <span>⌂</span> Home
          </button>

          <div className="sidebar-heading experiment-heading">
            BDA EXPERIMENTS
          </div>

          <div className="experiment-list">
            {filteredExperiments.map((item) => (
              <button
                key={item.id}
                className={`experiment-link ${
                  experiment?.id === item.id ? "active" : ""
                }`}
                onClick={() => open(item)}
              >
                <span className="file-icon">▤</span>
                <span className="experiment-name">
                  <strong>
                    {String(item.id).padStart(2, "0")}.
                  </strong>{" "}
                  {item.short}
                </span>
              </button>
            ))}

            {filteredExperiments.length === 0 && (
              <p className="no-results">No experiments found.</p>
            )}
          </div>

          <div className="sidebar-footer">
            {experiments.length} Experiments
          </div>
        </aside>

        <main className="main-content">
          {experiment && (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">
                    EXPERIMENT {String(experiment.id).padStart(2, "0")}
                  </div>
                  <h1>{experiment.title}</h1>
                  <p>{experiment.subtitle}</p>
                </div>
              </div>

              <nav className="tabs">
                {visibleTabs.map((item) => (
                  <button
                    key={item}
                    className={tab === item ? "selected" : ""}
                    onClick={() => setTab(item)}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </>
          )}

          <div className="content-area">
            {renderContent()}
          </div>

          <footer className="main-footer">
            BDA Practical Library · Hadoop · MapReduce · Python · MongoDB · Mahout · Hive · Pig
          </footer>
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
