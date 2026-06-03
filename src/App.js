import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentChecks, setRecentChecks] = useState([]);
  
  // Load recent checks from localStorage on component mount
  useEffect(() => {
    const savedChecks = localStorage.getItem('recentChecks');
    if (savedChecks) {
      try {
        setRecentChecks(JSON.parse(savedChecks));
      } catch (e) {
        console.error('Error loading recent checks:', e);
      }
    }
  }, []);

  // Function to check if a URL is valid
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Function to check common phishing patterns
  const checkPhishingPatterns = (url) => {
    const phishingIndicators = [
      { pattern: /paypal.*\.(?!paypal\.com)/i, score: 0.8, description: 'Suspicious PayPal domain' },
      { pattern: /amazon.*\.(?!amazon\.com)/i, score: 0.8, description: 'Suspicious Amazon domain' },
      { pattern: /apple.*\.(?!apple\.com)/i, score: 0.8, description: 'Suspicious Apple domain' },
      { pattern: /microsoft.*\.(?!microsoft\.com)/i, score: 0.8, description: 'Suspicious Microsoft domain' },
      { pattern: /google.*\.(?!google\.com)/i, score: 0.8, description: 'Suspicious Google domain' },
      { pattern: /facebook.*\.(?!facebook\.com)/i, score: 0.8, description: 'Suspicious Facebook domain' },
      { pattern: /instagram.*\.(?!instagram\.com)/i, score: 0.8, description: 'Suspicious Instagram domain' },
      { pattern: /netflix.*\.(?!netflix\.com)/i, score: 0.8, description: 'Suspicious Netflix domain' },
      { pattern: /bank|banking|chase|wellsfargo|citibank|hsbc/i, score: 0.7, description: 'Banking-related domain (high-risk target)' },
      { pattern: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, score: 0.6, description: 'IP address used instead of domain name' },
      { pattern: /bit\.ly|tinyurl\.com|goo\.gl|t\.co|is\.gd/i, score: 0.4, description: 'URL shortener (can hide actual destination)' },
      { pattern: /\.tk|\.ml|\.ga|\.cf|\.gq/i, score: 0.5, description: 'Free domain TLD often used in scams' },
      { pattern: /secure|login|signin|verify|account|update|confirm/i, score: 0.3, description: 'Common phishing keywords in domain' },
      { pattern: /[^\w.-]/, score: 0.2, description: 'Special characters in domain' },
      { pattern: /\.(xyz|top|club|online|site|icu|vip|fun|loan)$/i, score: 0.3, description: 'TLDs with higher abuse rates' },
      { pattern: /^[a-zA-Z0-9]{10,}\.[a-zA-Z]{2,}$/, score: 0.4, description: 'Random-looking domain name' },
      { pattern: /^\d+\.[a-zA-Z]{2,}$/, score: 0.4, description: 'Domain starting with numbers' },
      { pattern: /-(secure|login|signin|account)\./, score: 0.5, description: 'Hyphenated security terms' }
    ];

    let totalScore = 0;
    let matchedPatterns = [];

    phishingIndicators.forEach(indicator => {
      if (indicator.pattern.test(url)) {
        totalScore += indicator.score;
        matchedPatterns.push({
          pattern: indicator.pattern.toString(),
          score: indicator.score,
          description: indicator.description
        });
      }
    });

    return {
      score: totalScore,
      matchedPatterns
    };
  };

  // Function to check domain age (simulated)
  const checkDomainAge = (domain) => {
    // In a real application, this would call an API to check domain registration date
    // For this demo, we'll use a simple hash-based simulation
    const hash = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const ageInDays = (hash % 1000) + 1; // 1-1000 days
    
    return {
      ageInDays,
      isNew: ageInDays < 30 // Consider domains less than 30 days old as new
    };
  };
  
  // Function to generate alternative URLs for a suspicious/fake domain
  const generateAlternativeUrls = (domain) => {
    // Remove subdomains and TLD
    const parts = domain.split('.');
    let base = parts.length > 2 ? parts.slice(-2).join('.') : domain;
    let suggestions = [];
    if (!base.endsWith('.com')) {
      suggestions.push(base.replace(/\.[^.]+$/, '.com'));
    }
    if (!base.endsWith('.org')) {
      suggestions.push(base.replace(/\.[^.]+$/, '.org'));
    }
    if (!base.endsWith('.net')) {
      suggestions.push(base.replace(/\.[^.]+$/, '.net'));
    }
    // Add www prefix
    if (!base.startsWith('www.')) {
      suggestions.push('www.' + base);
    }
    // Remove duplicates
    return Array.from(new Set(suggestions));
  };

  // Function to analyze URL safety
  const analyzeUrl = () => {
    setError('');
    setResult(null);
    setAlternativeUrls([]);
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    // Check if URL is valid
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }
    setLoading(true);
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      // Check for phishing patterns
      const phishingCheck = checkPhishingPatterns(domain);
      // Check domain age (simulated)
      const domainAge = checkDomainAge(domain);
      // Add domain age to the phishing score if it's a new domain
      let finalScore = phishingCheck.score;
      if (domainAge.isNew) {
        finalScore += 0.3;
        phishingCheck.matchedPatterns.push({
          pattern: 'New domain',
          score: 0.3,
          description: `Domain appears to be only ${domainAge.ageInDays} days old. New domains are often used for phishing.`
        });
      }
      // Determine safety level based on phishing score
      let safetyLevel;
      let safetyMessage;
      if (finalScore < 0.3) {
        safetyLevel = 'safe';
        safetyMessage = 'This URL appears to be safe.';
      } else if (finalScore < 0.6) {
        safetyLevel = 'suspicious';
        safetyMessage = 'This URL shows some suspicious patterns. Proceed with caution.';
      } else {
        safetyLevel = 'dangerous';
        safetyMessage = 'This URL shows multiple signs of being potentially malicious. We recommend not visiting this site.';
      }
      // Generate alternative URLs if the site is suspicious or dangerous
      let alternatives = [];
      if (safetyLevel === 'suspicious' || safetyLevel === 'dangerous') {
        alternatives = generateAlternativeUrls(domain);
        setAlternativeUrls(alternatives);
      }
      const resultData = {
        url: url,
        domain: domain,
        protocol: urlObj.protocol,
        safetyLevel: safetyLevel,
        safetyMessage: safetyMessage,
        phishingScore: finalScore,
        domainAge: domainAge.ageInDays,
        matchedPatterns: phishingCheck.matchedPatterns,
        checkedAt: new Date().toISOString()
      };
      setResult(resultData);
      // Save to recent checks
      const updatedChecks = [resultData, ...recentChecks.slice(0, 4)]; // Keep only 5 most recent
      setRecentChecks(updatedChecks);
      localStorage.setItem('recentChecks', JSON.stringify(updatedChecks));
    } catch (err) {
      setError('Error analyzing URL: ' + err.message);
    } finally {
      setLoading(false);
    }
  };



  // Function to clear history
  const clearHistory = () => {
    setRecentChecks([]);
    localStorage.removeItem('recentChecks');
  };

  // State for alternative URLs
  const [alternativeUrls, setAlternativeUrls] = useState([]);
  
  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      analyzeUrl();
    }
  };
  
  return (
    <div className="app">
      <header className="header">
        <h1>ScanWise</h1>
          <p>Because not all links are what they seem</p>
      </header>

      <main>
        <div className="search-container">
          <div className="input-wrapper">
            <i className="fas fa-link input-icon"></i>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a URL to check (e.g., https://example.com)"
              className="url-input"
            />
          </div>
          <button 
            onClick={analyzeUrl} 
            disabled={loading}
            className="check-button"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Checking...
              </>
            ) : (
              <>
                <i className="fas fa-search"></i> Check URL
              </>
            )}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {result && (
          <div className={`result-container ${result.safetyLevel}`}>
            <h2>Analysis Results</h2>
            <div className="result-header">
              <div className={`safety-indicator ${result.safetyLevel}`}>
                {result.safetyLevel === 'safe' && <><i className="fas fa-check-circle"></i> Safe</>}
                {result.safetyLevel === 'suspicious' && <><i className="fas fa-exclamation-triangle"></i> Suspicious</>}
                {result.safetyLevel === 'dangerous' && <><i className="fas fa-exclamation-circle"></i> Dangerous</>}
              </div>
            </div>
            <p className="safety-message">{result.safetyMessage}</p>
            <div className="result-details">
              <div className="detail-item">
                <span className="detail-label"><i className="fas fa-link"></i> URL:</span>
                <span className="detail-value">{result.url}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><i className="fas fa-globe"></i> Domain:</span>
                <span className="detail-value">{result.domain}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><i className="fas fa-lock"></i> Protocol:</span>
                <span className="detail-value">{result.protocol}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><i className="fas fa-chart-bar"></i> Risk Score:</span>
                <span className="detail-value">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${Math.min(result.phishingScore * 100, 100)}%`}}
                    ></div>
                  </div>
                  <span>{result.phishingScore.toFixed(2)}</span>
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><i className="fas fa-calendar-alt"></i> Domain Age:</span>
                <span className="detail-value">{result.domainAge} days</span>
              </div>
            </div>
            {result.matchedPatterns.length > 0 && (
              <div className="patterns-container">
                <h3><i className="fas fa-search"></i> Detected Patterns:</h3>
                <ul className="patterns-list">
                  {result.matchedPatterns.map((pattern, index) => (
                    <li key={index}>
                      <div className="pattern-header">
                        <span className="pattern-name">{pattern.description}</span>
                        <span className="pattern-score">Score: {pattern.score}</span>
                      </div>
                      <div className="pattern-details">
                        <code>{pattern.pattern}</code>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Alternative URLs section */}
            {(result.safetyLevel === 'suspicious' || result.safetyLevel === 'dangerous') && alternativeUrls.length > 0 && (
              <div className="alternative-urls">
                <h3><i className="fas fa-lightbulb"></i> Suggested Alternative URLs:</h3>
                <ul>
                  {alternativeUrls.map((alt, idx) => (
                    <li key={idx}>
                      <a href={`https://${alt}`} target="_blank" rel="noopener noreferrer">{alt}</a>
                    </li>
                  ))}
                </ul>
                <p className="alt-url-note">These are common trusted alternatives based on the domain you entered. Always verify before visiting.</p>
              </div>
            )}
            <div className="disclaimer">
              <p><strong>Disclaimer:</strong> This tool provides a basic analysis based on common patterns. 
              It cannot guarantee with 100% accuracy whether a URL is safe or malicious. 
              Always exercise caution when visiting unfamiliar websites.</p>
            </div>
          </div>
        )}
        
        {recentChecks.length > 0 && (
          <div className="recent-checks">
            <div className="recent-header">
              <h3><i className="fas fa-history"></i> Recent Checks</h3>
              <button onClick={clearHistory} className="clear-history-btn">
                <i className="fas fa-trash"></i> Clear History
              </button>
            </div>
            <ul className="recent-list">
              {recentChecks.map((check, index) => (
                <li key={index} className={`recent-item ${check.safetyLevel}`}>
                  <div className="recent-url" onClick={() => setUrl(check.url)}>
                    <div className={`recent-indicator ${check.safetyLevel}`}>
                      {check.safetyLevel === 'safe' && <i className="fas fa-check-circle"></i>}
                      {check.safetyLevel === 'suspicious' && <i className="fas fa-exclamation-triangle"></i>}
                      {check.safetyLevel === 'dangerous' && <i className="fas fa-exclamation-circle"></i>}
                    </div>
                    <div className="recent-details">
                      <span className="recent-domain">{check.domain}</span>
                      <span className="recent-full-url">{check.url}</span>
                    </div>
                  </div>
                  <div className="recent-score">
                    Score: {check.phishingScore.toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer>
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} ScanWise - URL Safety Checker</p>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;