/**
 * GitHub Octoverse 2026 - Canonical Data Loader
 * Asynchronously loads and caches the canonical dataset from the local `dataset/` directory.
 * Preserves source IDs, reporting periods, scopes, data types, units, and notes without alteration.
 */

class DataLoader {
  constructor() {
    this.octoverseData = null;
    this.openSourceRankings = null;
    this.sourceRegister = null;
    this.chartCatalog = null;
    this.isLoaded = false;
    this.loadPromise = null;
  }

  /**
   * Load all canonical JSON datasets concurrently.
   * @returns {Promise<DataLoader>}
   */
  async load() {
    if (this.isLoaded) return this;
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      try {
        const [octoverseRes, rankingsRes, sourcesRes, catalogRes] = await Promise.all([
          fetch('./dataset/data/octoverse-2026.json'),
          fetch('./dataset/data/open-source-rankings.json'),
          fetch('./dataset/metadata/source-register.json'),
          fetch('./dataset/metadata/chart-catalog.json'),
        ]);

        if (!octoverseRes.ok) throw new Error(`HTTP ${octoverseRes.status} loading octoverse-2026.json`);
        if (!rankingsRes.ok) throw new Error(`HTTP ${rankingsRes.status} loading open-source-rankings.json`);
        if (!sourcesRes.ok) throw new Error(`HTTP ${sourcesRes.status} loading source-register.json`);
        if (!catalogRes.ok) throw new Error(`HTTP ${catalogRes.status} loading chart-catalog.json`);

        this.octoverseData = await octoverseRes.json();
        this.openSourceRankings = await rankingsRes.json();
        this.sourceRegister = await sourcesRes.json();
        this.chartCatalog = await catalogRes.json();

        this.isLoaded = true;
        console.info(`[DataLoader] Successfully loaded ${this.octoverseData.records.length} canonical records.`);
        return this;
      } catch (err) {
        console.error('[DataLoader] Failed to load canonical datasets:', err);
        throw err;
      }
    })();

    return this.loadPromise;
  }

  /**
   * Get report level metadata.
   */
  getReportMeta() {
    return {
      title: this.octoverseData?.report_title || 'GitHub Octoverse 2026',
      date: this.octoverseData?.report_date || '2026-10-28',
      window: this.octoverseData?.reporting_window || 'October 1, 2025–September 30, 2026',
      publisher: this.octoverseData?.source_owner || 'GitHub',
      rules: this.octoverseData?.data_integrity_rules || [],
    };
  }

  /**
   * Get all canonical records.
   * @returns {Array<Object>}
   */
  getAllRecords() {
    return this.octoverseData?.records || [];
  }

  /**
   * Filter records by topic name.
   * @param {string} topic
   * @returns {Array<Object>}
   */
  getRecordsByTopic(topic) {
    return this.getAllRecords().filter((r) => r.topic === topic);
  }

  /**
   * Find a specific record by its unique stable ID.
   * @param {string} id
   * @returns {Object|undefined}
   */
  getRecordById(id) {
    return this.getAllRecords().find((r) => r.id === id);
  }

  /**
   * Get the four open-source ranking lists.
   * @returns {Object} { fastest_growing, most_engaged }
   */
  getOpenSourceRankings() {
    return this.openSourceRankings || { fastest_growing: {}, most_engaged: {} };
  }

  /**
   * Get the source registry list.
   * @returns {Array<Object>}
   */
  getSourceRegister() {
    return this.sourceRegister || [];
  }

  /**
   * Get metadata for a specific source ID.
   * @param {string} sourceId
   * @returns {Object|undefined}
   */
  getSourceById(sourceId) {
    return this.getSourceRegister().find((s) => s.source_id === sourceId);
  }

  /**
   * Get chart catalog recommendations.
   * @returns {Array<Object>}
   */
  getChartCatalog() {
    return this.chartCatalog || [];
  }
}

export const dataLoader = new DataLoader();
