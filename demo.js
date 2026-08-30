// demo.js

function $(id) {
  return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.THERMA_CONFIG || {};
  const openSheetBtn = $("openSheetBtn");
  const auditForm = $("auditForm");

  // Open Google Sheet
  if (openSheetBtn) {
    openSheetBtn.addEventListener("click", () => {
      if (!cfg.googleSheetUrl || !cfg.googleSheetUrl.startsWith("http")) {
        alert("Missing config: set THERMA_CONFIG.googleSheetUrl in config.js");
        return;
      }
      window.open(cfg.googleSheetUrl, "_blank", "noopener,noreferrer");
    });
  }

  // Email audit form
  if (auditForm) {
    auditForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailEl = $("evalEmail");
      const email = emailEl ? emailEl.value : "";

      if (!email) {
        alert("Please enter a valid email.");
        return;
      }

      const workerUrl =
        cfg.workerAuditUrl || "https://thermashift.shahrukhkknmd.workers.dev";

      fetch(`${workerUrl}?email=${encodeURIComponent(email)}`);

      alert("Audit dispatched! Wait for a while, then Check your inbox and the Google Sheet.");
    });
  }
});