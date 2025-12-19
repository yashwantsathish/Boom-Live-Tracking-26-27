// Basketball Paint Touch & Scoring Analytics - Clean Version

// State management
let teamStats = {
    white: {
        paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
        noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
    },
    blue: {
        paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
        noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
    }
};

// Season-wide cumulative stats
let seasonStats = {
    white: {
        paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
        noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
    },
    blue: {
        paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
        noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
    }
};

// Scrimmage-wide cumulative stats
let scrimmageStats = {
    white: {
        paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
        noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
    },
    blue: {
        paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
        noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
    }
};

// Regular Season cumulative stats
let regularSeasonStats = {
    white: {
        paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
        noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
    },
    blue: {
        paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
        noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
    }
};

// First 5 games historical snapshot (11/16/2024)
const first5Stats = {
    white: {
        paintTouch: { possessions: 365, points: 404, scores: { 0: 183, 1: 1, 2: 140, 3: 41, 4: 0 } },
        noPaintTouch: { possessions: 234, points: 174, scores: { 0: 172, 1: 0, 2: 12, 3: 50, 4: 0 } }
    },
    blue: {
        paintTouch: { possessions: 385, points: 485, scores: { 0: 157, 1: 0, 2: 199, 3: 29, 4: 0 } },
        noPaintTouch: { possessions: 211, points: 115, scores: { 0: 167, 1: 0, 2: 17, 3: 27, 4: 0 } }
    }
};

const first5PlayerStats = {
    1: { pressUp: { positive: 37, negative: 28 }, atLevel: { positive: 8, negative: 3 } },
    2: { pressUp: { positive: 9, negative: 30 }, atLevel: { positive: 8, negative: 3 } },
    3: { pressUp: { positive: 30, negative: 18 }, atLevel: { positive: 6, negative: 1 } },
    11: { pressUp: { positive: 16, negative: 15 }, atLevel: { positive: 0, negative: 1 } },
    12: { pressUp: { positive: 2, negative: 10 }, atLevel: { positive: 5, negative: 4 } },
    15: { pressUp: { positive: 2, negative: 7 }, atLevel: { positive: 2, negative: 3 } },
    18: { pressUp: { positive: 0, negative: 1 }, atLevel: { positive: 19, negative: 35 } },
    30: { pressUp: { positive: 0, negative: 0 }, atLevel: { positive: 34, negative: 20 } }
};

let actionHistory = []; // Track all actions for undo

// Player tracking system
const playerRoster = {
    0: "Blackshear", 1: "Ashworth", 2: "Guy", 3: "Gordon", 4: "Peter", 5: "Thompson",
    6: "Hildreth", 7: "Jones", 10: "Dennis", 11: "Felton", 12: "Iraldi",
    13: "Spalding", 15: "Toney", 18: "Slawson", 23: "Ithiel", 29: "Jackson",
    30: "McGlothan", 31: "Taylor", 33: "El-Sheikh", 35: "Johnson"
};

let playerStats = {};
let seasonPlayerStats = {};
let scrimmagePlayerStats = {};
let regularSeasonPlayerStats = {};
let playerActionHistory = [];
let selectedPlayer = null;

// Undo functionality for season saves
let seasonStatsBackup = null;
let seasonPlayerStatsBackup = null;
let lastSeasonSaveTimestamp = null;

// Sorting state
let paintSortColumn = null;
let paintSortOrder = 'asc';
let playerSortColumn = null;
let playerSortOrder = 'asc';
let teamPressSortColumn = null;
let teamPressSortOrder = 'asc';
let seasonPaintSortColumn = null;
let seasonPaintSortOrder = 'asc';
let seasonPlayerSortColumn = null;
let seasonPlayerSortOrder = 'asc';
let seasonTeamPressSortColumn = null;
let seasonTeamPressSortOrder = 'asc';
let regularSeasonPaintSortColumn = null;
let regularSeasonPaintSortOrder = 'asc';
let regularSeasonPlayerSortColumn = null;
let regularSeasonPlayerSortOrder = 'asc';
let regularSeasonTeamPressSortColumn = null;
let regularSeasonTeamPressSortOrder = 'asc';

// LocalStorage keys
const STORAGE_KEY = 'basketball-paint-analytics-v2';
const SEASON_STORAGE_KEY = 'basketball-paint-analytics-season-v2';
const SCRIMMAGE_STORAGE_KEY = 'basketball-paint-analytics-scrimmage-v2';
const REGULAR_SEASON_STORAGE_KEY = 'basketball-paint-analytics-regular-season-v2';
const SNAPSHOTS_STORAGE_KEY = 'basketball-paint-analytics-snapshots-v2';
const REGULAR_SEASON_SNAPSHOTS_STORAGE_KEY = 'basketball-paint-analytics-regular-season-snapshots-v2';

// Quarter tracking variables
let lastQuarterSnapshot = null;
let quarterNumber = 1;

// Half tracking variables
let lastHalfSnapshot = null;
let halfNumber = 1;

// Initialize player stats
function initializePlayerStats() {
    Object.keys(playerRoster).forEach(playerNum => {
        playerStats[playerNum] = {
            pressUp: { positive: 0, negative: 0 },
            atLevel: { positive: 0, negative: 0 }
        };
        seasonPlayerStats[playerNum] = {
            pressUp: { positive: 0, negative: 0 },
            atLevel: { positive: 0, negative: 0 }
        };
        gamesPlayerStats[playerNum] = {
            pressUp: { positive: 0, negative: 0 },
            atLevel: { positive: 0, negative: 0 }
        };
        // Initialize regularSeasonPlayerStats if doesn't exist
        if (!regularSeasonPlayerStats[playerNum]) {
            regularSeasonPlayerStats[playerNum] = {
                pressUp: { positive: 0, negative: 0 },
                atLevel: { positive: 0, negative: 0 }
            };
        }
        // Initialize scrimmagePlayerStats if doesn't exist
        if (!scrimmagePlayerStats[playerNum]) {
            scrimmagePlayerStats[playerNum] = {
                pressUp: { positive: 0, negative: 0 },
                atLevel: { positive: 0, negative: 0 }
            };
        }
    });
}

// Hotkey system state
let activeTeam = 'white'; // Current team being tracked
let activePaintTouch = true; // true = paint touch, false = no paint touch

// Save data to localStorage
function saveToLocalStorage() {
    const data = {
        teamStats: teamStats,
        actionHistory: actionHistory,
        timestamp: Date.now()
    };
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
        console.error('Error saving to localStorage:', err);
    }
}

// Save season data to localStorage
function saveSeasonToLocalStorage() {
    const seasonData = {
        seasonStats: seasonStats,
        seasonPlayerStats: seasonPlayerStats,
        timestamp: Date.now()
    };
    try {
        localStorage.setItem(SEASON_STORAGE_KEY, JSON.stringify(seasonData));
    } catch (err) {
        console.error('Error saving season data to localStorage:', err);
    }
}

// Save games data to localStorage
function saveScrimmageToLocalStorage() {
    const scrimmageData = {
        scrimmageStats: scrimmageStats,
        scrimmagePlayerStats: scrimmagePlayerStats,
        timestamp: Date.now()
    };
    try {
        localStorage.setItem(SCRIMMAGE_STORAGE_KEY, JSON.stringify(scrimmageData));
    } catch (err) {
        console.error('Error saving scrimmage data to localStorage:', err);
    }
}

// Load data from localStorage
function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            teamStats = data.teamStats || teamStats;
            actionHistory = data.actionHistory || [];
            playerStats = data.playerStats || {};
            playerActionHistory = data.playerActionHistory || [];
            
            // Ensure ALL players in current roster are initialized
            Object.keys(playerRoster).forEach(playerNum => {
                if (!playerStats[playerNum]) {
                    playerStats[playerNum] = {
                        pressUp: { positive: 0, negative: 0 },
                        atLevel: { positive: 0, negative: 0 }
                    };
                }
            });
            
            return true;
        }
    } catch (err) {
        console.error('Error loading from localStorage:', err);
    }
    
    // Initialize player stats for new sessions
    initializePlayerStats();
    return false;
}

// Load season data from localStorage
function loadSeasonFromLocalStorage() {
    try {
        const saved = localStorage.getItem(SEASON_STORAGE_KEY);
        if (saved) {
            const seasonData = JSON.parse(saved);
            seasonStats = seasonData.seasonStats || seasonStats;
            seasonPlayerStats = seasonData.seasonPlayerStats || seasonPlayerStats;
            
            // Ensure ALL players in current roster are initialized
            Object.keys(playerRoster).forEach(playerNum => {
                if (!seasonPlayerStats[playerNum]) {
                    seasonPlayerStats[playerNum] = {
                        pressUp: { positive: 0, negative: 0 },
                        atLevel: { positive: 0, negative: 0 }
                    };
                }
            });
            
            return true;
        }
    } catch (err) {
        console.error('Error loading season data from localStorage:', err);
    }
    
    // Initialize season player stats for new seasons
    Object.keys(playerRoster).forEach(playerNum => {
        seasonPlayerStats[playerNum] = {
            pressUp: { positive: 0, negative: 0 },
            atLevel: { positive: 0, negative: 0 }
        };
    });
    return false;
}

// Load games data from localStorage
function loadScrimmageFromLocalStorage() {
    try {
        const saved = localStorage.getItem(SCRIMMAGE_STORAGE_KEY);
        if (saved) {
            const scrimmageData = JSON.parse(saved);
            scrimmageStats = scrimmageData.scrimmageStats || scrimmageStats;
            scrimmagePlayerStats = scrimmageData.scrimmagePlayerStats || scrimmagePlayerStats;
            
            // Ensure ALL players in current roster are initialized
            Object.keys(playerRoster).forEach(playerNum => {
                if (!scrimmagePlayerStats[playerNum]) {
                    scrimmagePlayerStats[playerNum] = {
                        pressUp: { positive: 0, negative: 0 },
                        atLevel: { positive: 0, negative: 0 }
                    };
                }
            });
            
            return true;
        }
    } catch (err) {
        console.error('Error loading scrimmage data from localStorage:', err);
    }
    
    // Initialize scrimmage player stats for new scrimmage data
    Object.keys(playerRoster).forEach(playerNum => {
        scrimmagePlayerStats[playerNum] = {
            pressUp: { positive: 0, negative: 0 },
            atLevel: { positive: 0, negative: 0 }
        };
    });
    return false;
}

// Save Regular Season data to localStorage
function saveRegularSeasonToLocalStorage() {
    const regularSeasonData = {
        regularSeasonStats: regularSeasonStats,
        regularSeasonPlayerStats: regularSeasonPlayerStats,
        timestamp: Date.now()
    };
    try {
        localStorage.setItem(REGULAR_SEASON_STORAGE_KEY, JSON.stringify(regularSeasonData));
    } catch (err) {
        console.error('Error saving regular season data to localStorage:', err);
    }
}

// Load Regular Season data from localStorage
function loadRegularSeasonFromLocalStorage() {
    try {
        const saved = localStorage.getItem(REGULAR_SEASON_STORAGE_KEY);
        if (saved) {
            const regularSeasonData = JSON.parse(saved);
            regularSeasonStats = regularSeasonData.regularSeasonStats || regularSeasonStats;
            regularSeasonPlayerStats = regularSeasonData.regularSeasonPlayerStats || regularSeasonPlayerStats;
            
            // Ensure ALL players in current roster are initialized
            Object.keys(playerRoster).forEach(playerNum => {
                if (!regularSeasonPlayerStats[playerNum]) {
                    regularSeasonPlayerStats[playerNum] = {
                        pressUp: { positive: 0, negative: 0 },
                        atLevel: { positive: 0, negative: 0 }
                    };
                }
            });
            
            return true;
        }
    } catch (err) {
        console.error('Error loading regular season data from localStorage:', err);
    }
    
    // Initialize regular season player stats for new regular season data
    Object.keys(playerRoster).forEach(playerNum => {
        regularSeasonPlayerStats[playerNum] = {
            pressUp: { positive: 0, negative: 0 },
            atLevel: { positive: 0, negative: 0 }
        };
    });
    return false;
}

// Save data to localStorage (updated)
function saveToLocalStorage() {
    const data = {
        teamStats: teamStats,
        actionHistory: actionHistory,
        playerStats: playerStats,
        playerActionHistory: playerActionHistory,
        timestamp: Date.now()
    };
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
        console.error('Error saving to localStorage:', err);
    }
}

// Player tracking functions
function selectPlayer(playerNum) {
    if (selectedPlayer === playerNum) {
        // Deselect if clicking the same player
        selectedPlayer = null;
        updatePlayerDisplay();
        showStatus('Player deselected');
    } else {
        selectedPlayer = playerNum;
        updatePlayerDisplay();
        showStatus(`Selected player: #${playerNum} ${playerRoster[playerNum]}`);
    }
}

function addPlayerAction(playerNum, type, value) {
    if (!playerNum) {
        showStatus('Please select a player first!', 'error');
        return;
    }
    
    // Update player stats
    if (value > 0) {
        playerStats[playerNum][type].positive++;
    } else {
        playerStats[playerNum][type].negative++;
    }
    
    // Track action for undo
    const action = {
        playerNum: playerNum,
        type: type,
        value: value,
        timestamp: Date.now()
    };
    playerActionHistory.push(action);
    
    updatePlayerStatsDisplay();
    updateTeamPressStatsDisplay();
    saveToLocalStorage();
    
    const actionType = type === 'pressUp' ? 'Press Up' : 'At Level';
    const sign = value > 0 ? '+' : '-';
    showStatus(`#${playerNum} ${playerRoster[playerNum]}: ${actionType} ${sign}`);
    
    // Deselect player after action
    selectedPlayer = null;
    updatePlayerDisplay();
}

function undoLastPlayerAction() {
    if (playerActionHistory.length === 0) {
        showStatus('No player actions to undo!', 'error');
        return;
    }
    
    const lastAction = playerActionHistory.pop();
    
    // Reverse the action
    if (lastAction.value > 0) {
        playerStats[lastAction.playerNum][lastAction.type].positive--;
    } else {
        playerStats[lastAction.playerNum][lastAction.type].negative--;
    }
    
    updatePlayerStatsDisplay();
    updateTeamPressStatsDisplay();
    saveToLocalStorage();
    
    const actionType = lastAction.type === 'pressUp' ? 'Press Up' : 'At Level';
    const sign = lastAction.value > 0 ? '+' : '-';
    showStatus(`Undone: #${lastAction.playerNum} ${playerRoster[lastAction.playerNum]} ${actionType} ${sign}`);
}

function resetPlayerData() {
    if (confirm('Are you sure you want to reset player ballscreen data for the current practice? This will not affect saved game totals.')) {
        // Only reset current practice player stats, not scrimmage totals
        initializePlayerStats();
        playerActionHistory = [];
        updatePlayerStatsDisplay();
        updateTeamPressStatsDisplay();
        // Don't save to localStorage - this is only for current practice
        showStatus('Current practice player data has been reset');
    }
}

function updatePlayerDisplay() {
    // Update player buttons
    document.querySelectorAll('.player-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.player == selectedPlayer);
    });
    
    // Update status display
    const statusEl = document.getElementById('current-player-status');
    if (statusEl) {
        if (selectedPlayer) {
            statusEl.innerHTML = `<strong>Selected Player:</strong> #${selectedPlayer} ${playerRoster[selectedPlayer]}`;
        } else {
            statusEl.innerHTML = `<strong>Selected Player:</strong> None`;
        }
    }
}

function calculateRate(positive, negative) {
    const total = positive + negative;
    return total > 0 ? ((positive / total) * 100).toFixed(1) : '0.0';
}

function getRateClass(rate) {
    const rateNum = parseFloat(rate);
    if (rateNum >= 80) return 'rate-excellent';
    if (rateNum >= 65) return 'rate-good';
    if (rateNum >= 50) return 'rate-average';
    return 'rate-poor';
}

function updatePlayerStatsDisplay() {
    const tbody = document.getElementById('player-stats-tbody');
    if (!tbody) return;
    
    let html = '';
    
    Object.keys(playerRoster).forEach(playerNum => {
        const stats = playerStats[playerNum];
        const pressUpRate = calculateRate(stats.pressUp.positive, stats.pressUp.negative);
        const atLevelRate = calculateRate(stats.atLevel.positive, stats.atLevel.negative);
        const totalActions = stats.pressUp.positive + stats.pressUp.negative + stats.atLevel.positive + stats.atLevel.negative;
        
        html += `
            <tr>
                <td><strong>#${playerNum} ${playerRoster[playerNum]}</strong></td>
                <td><span class="highlight-number">${stats.pressUp.positive}</span></td>
                <td><span class="highlight-number">${stats.pressUp.negative}</span></td>
                <td><span class="${getRateClass(pressUpRate)}">${pressUpRate}%</span></td>
                <td><span class="highlight-number">${stats.atLevel.positive}</span></td>
                <td><span class="highlight-number">${stats.atLevel.negative}</span></td>
                <td><span class="${getRateClass(atLevelRate)}">${atLevelRate}%</span></td>
                <td><span class="highlight-number">${totalActions}</span></td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

function updateTeamPressStatsDisplay() {
    const tbody = document.getElementById('team-press-stats-tbody');
    if (!tbody) return;
    
    // Calculate team totals
    let pressUpPositive = 0, pressUpNegative = 0;
    let atLevelPositive = 0, atLevelNegative = 0;
    
    Object.keys(playerStats).forEach(playerNum => {
        const stats = playerStats[playerNum];
        pressUpPositive += stats.pressUp.positive;
        pressUpNegative += stats.pressUp.negative;
        atLevelPositive += stats.atLevel.positive;
        atLevelNegative += stats.atLevel.negative;
    });
    
    const pressUpRate = calculateRate(pressUpPositive, pressUpNegative);
    const atLevelRate = calculateRate(atLevelPositive, atLevelNegative);
    const pressUpTotal = pressUpPositive + pressUpNegative;
    const atLevelTotal = atLevelPositive + atLevelNegative;
    
    const html = `
        <tr class="team-row-overall">
            <td><strong>Press Up</strong></td>
            <td><span class="highlight-number">${pressUpPositive}</span></td>
            <td><span class="highlight-number">${pressUpNegative}</span></td>
            <td><span class="${getRateClass(pressUpRate)}">${pressUpRate}%</span></td>
            <td><span class="highlight-number">${pressUpTotal}</span></td>
        </tr>
        <tr class="team-row-overall">
            <td><strong>At Level</strong></td>
            <td><span class="highlight-number">${atLevelPositive}</span></td>
            <td><span class="highlight-number">${atLevelNegative}</span></td>
            <td><span class="${getRateClass(atLevelRate)}">${atLevelRate}%</span></td>
            <td><span class="highlight-number">${atLevelTotal}</span></td>
        </tr>
    `;
    
    tbody.innerHTML = html;
}

function updateSeasonStatsDisplay() {
    // Update season paint percentage table
    const seasonPaintPercentageTbody = document.getElementById('season-paint-percentage-tbody');
    if (seasonPaintPercentageTbody) {
        let html = '';
        
        ['white', 'blue'].forEach(team => {
            const paintTouchPoss = seasonStats[team].paintTouch.possessions;
            const noPaintTouchPoss = seasonStats[team].noPaintTouch.possessions;
            const totalPoss = paintTouchPoss + noPaintTouchPoss;
            
            const paintTouchPercent = totalPoss > 0 ? ((paintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
            const noPaintTouchPercent = totalPoss > 0 ? ((noPaintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
            
            // Calculate PPP (Points Per Possession)
            const paintTouchPPP = paintTouchPoss > 0 ? (seasonStats[team].paintTouch.points / paintTouchPoss).toFixed(2) : '0.00';
            const noPaintTouchPPP = noPaintTouchPoss > 0 ? (seasonStats[team].noPaintTouch.points / noPaintTouchPoss).toFixed(2) : '0.00';
            
            // Determine percentage styling classes
            const paintPercentClass = parseFloat(paintTouchPercent) >= 70 ? 'percentage-high' : 
                                    parseFloat(paintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
            const noPaintPercentClass = parseFloat(noPaintTouchPercent) >= 70 ? 'percentage-high' : 
                                       parseFloat(noPaintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
            
            // Determine PPP styling classes (higher is better)
            const paintPPPClass = parseFloat(paintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                 parseFloat(paintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
            const noPaintPPPClass = parseFloat(noPaintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                   parseFloat(noPaintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
            
            html += `
                <tr class="team-row-${team}">
                    <td><strong>${team.charAt(0).toUpperCase() + team.slice(1)}</strong></td>
                    <td><span class="highlight-number">${totalPoss}</span></td>
                    <td><span class="highlight-number">${paintTouchPoss}</span></td>
                    <td><span class="${paintPercentClass}">${paintTouchPercent}%</span></td>
                    <td><span class="${paintPPPClass}">${paintTouchPPP}</span></td>
                    <td><span class="highlight-number">${noPaintTouchPoss}</span></td>
                    <td><span class="${noPaintPercentClass}">${noPaintTouchPercent}%</span></td>
                    <td><span class="${noPaintPPPClass}">${noPaintTouchPPP}</span></td>
                </tr>
            `;
        });
        
        // Add overall row
        const overallPaintTouchPoss = seasonStats.white.paintTouch.possessions + seasonStats.blue.paintTouch.possessions;
        const overallNoPaintTouchPoss = seasonStats.white.noPaintTouch.possessions + seasonStats.blue.noPaintTouch.possessions;
        const overallTotalPoss = overallPaintTouchPoss + overallNoPaintTouchPoss;
        
        const overallPaintTouchPercent = overallTotalPoss > 0 ? ((overallPaintTouchPoss / overallTotalPoss) * 100).toFixed(1) : '0.0';
        const overallNoPaintTouchPercent = overallTotalPoss > 0 ? ((overallNoPaintTouchPoss / overallTotalPoss) * 100).toFixed(1) : '0.0';
        
        // Calculate overall PPP
        const overallPaintTouchPoints = seasonStats.white.paintTouch.points + seasonStats.blue.paintTouch.points;
        const overallNoPaintTouchPoints = seasonStats.white.noPaintTouch.points + seasonStats.blue.noPaintTouch.points;
        const overallPaintTouchPPP = overallPaintTouchPoss > 0 ? (overallPaintTouchPoints / overallPaintTouchPoss).toFixed(2) : '0.00';
        const overallNoPaintTouchPPP = overallNoPaintTouchPoss > 0 ? (overallNoPaintTouchPoints / overallNoPaintTouchPoss).toFixed(2) : '0.00';
        
        // Styling for overall row
        const overallPaintPercentClass = parseFloat(overallPaintTouchPercent) >= 70 ? 'percentage-high' : 
                                        parseFloat(overallPaintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
        const overallNoPaintPercentClass = parseFloat(overallNoPaintTouchPercent) >= 70 ? 'percentage-high' : 
                                          parseFloat(overallNoPaintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
        const overallPaintPPPClass = parseFloat(overallPaintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                    parseFloat(overallPaintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
        const overallNoPaintPPPClass = parseFloat(overallNoPaintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                      parseFloat(overallNoPaintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
        
        html += `
            <tr class="team-row-overall">
                <td><strong>SEASON OVERALL</strong></td>
                <td><span class="highlight-number">${overallTotalPoss}</span></td>
                <td><span class="highlight-number">${overallPaintTouchPoss}</span></td>
                <td><span class="${overallPaintPercentClass}">${overallPaintTouchPercent}%</span></td>
                <td><span class="${overallPaintPPPClass}">${overallPaintTouchPPP}</span></td>
                <td><span class="highlight-number">${overallNoPaintTouchPoss}</span></td>
                <td><span class="${overallNoPaintPercentClass}">${overallNoPaintTouchPercent}%</span></td>
                <td><span class="${overallNoPaintPPPClass}">${overallNoPaintTouchPPP}</span></td>
            </tr>
        `;
        
        seasonPaintPercentageTbody.innerHTML = html;
    }
    
    // Update season player stats table
    const seasonPlayerTbody = document.getElementById('season-player-stats-tbody');
    if (seasonPlayerTbody) {
        let html = '';
        
        Object.keys(playerRoster).forEach(playerNum => {
            const stats = seasonPlayerStats[playerNum];
            const pressUpRate = calculateRate(stats.pressUp.positive, stats.pressUp.negative);
            const atLevelRate = calculateRate(stats.atLevel.positive, stats.atLevel.negative);
            const totalActions = stats.pressUp.positive + stats.pressUp.negative + stats.atLevel.positive + stats.atLevel.negative;
            
            html += `
                <tr>
                    <td><strong>#${playerNum} ${playerRoster[playerNum]}</strong></td>
                    <td><span class="highlight-number">${stats.pressUp.positive}</span></td>
                    <td><span class="highlight-number">${stats.pressUp.negative}</span></td>
                    <td><span class="${getRateClass(pressUpRate)}">${pressUpRate}%</span></td>
                    <td><span class="highlight-number">${stats.atLevel.positive}</span></td>
                    <td><span class="highlight-number">${stats.atLevel.negative}</span></td>
                    <td><span class="${getRateClass(atLevelRate)}">${atLevelRate}%</span></td>
                    <td><span class="highlight-number">${totalActions}</span></td>
                </tr>
            `;
        });
        
        seasonPlayerTbody.innerHTML = html;
    }
}

// Sorting functions
function sortPaintTable(column) {
    const table = document.getElementById('paint-percentage-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr:not(.team-row-overall)'));
    const overallRow = tbody.querySelector('.team-row-overall');
    
    // Toggle sort order if same column
    if (paintSortColumn === column) {
        paintSortOrder = paintSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        paintSortOrder = 'asc';
        paintSortColumn = column;
    }
    
    // Clear previous sort indicators
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        delete th.dataset.order;
    });
    
    // Sort rows (keeping overall row at bottom)
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'team':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'totalPoss':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'paintPoss':
                aValue = parseInt(a.cells[2].textContent) || 0;
                bValue = parseInt(b.cells[2].textContent) || 0;
                break;
            case 'paintPercent':
                aValue = parseFloat(a.cells[3].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[3].textContent.replace('%', '')) || 0;
                break;
            case 'paintPPP':
                aValue = parseFloat(a.cells[4].textContent) || 0;
                bValue = parseFloat(b.cells[4].textContent) || 0;
                break;
            case 'noPaintPoss':
                aValue = parseInt(a.cells[5].textContent) || 0;
                bValue = parseInt(b.cells[5].textContent) || 0;
                break;
            case 'noPaintPercent':
                aValue = parseFloat(a.cells[6].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[6].textContent.replace('%', '')) || 0;
                break;
            case 'noPaintPPP':
                aValue = parseFloat(a.cells[7].textContent) || 0;
                bValue = parseFloat(b.cells[7].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return paintSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return paintSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    // Clear tbody and re-add sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    if (overallRow) tbody.appendChild(overallRow);
    
    // Update sort indicator
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${paintSortOrder}`);
    header.dataset.order = paintSortOrder;
}

function sortPlayerTable(column) {
    const table = document.getElementById('player-stats-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Toggle sort order if same column
    if (playerSortColumn === column) {
        playerSortOrder = playerSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        playerSortOrder = 'asc';
        playerSortColumn = column;
    }
    
    // Clear previous sort indicators
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        delete th.dataset.order;
    });
    
    // Sort rows
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'player':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'pressUpPos':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'pressUpNeg':
                aValue = parseInt(a.cells[2].textContent) || 0;
                bValue = parseInt(b.cells[2].textContent) || 0;
                break;
            case 'pressUpRate':
                aValue = parseFloat(a.cells[3].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[3].textContent.replace('%', '')) || 0;
                break;
            case 'atLevelPos':
                aValue = parseInt(a.cells[4].textContent) || 0;
                bValue = parseInt(b.cells[4].textContent) || 0;
                break;
            case 'atLevelNeg':
                aValue = parseInt(a.cells[5].textContent) || 0;
                bValue = parseInt(b.cells[5].textContent) || 0;
                break;
            case 'atLevelRate':
                aValue = parseFloat(a.cells[6].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[6].textContent.replace('%', '')) || 0;
                break;
            case 'totalActions':
                aValue = parseInt(a.cells[7].textContent) || 0;
                bValue = parseInt(b.cells[7].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return playerSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return playerSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    // Clear tbody and re-add sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort indicator
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${playerSortOrder}`);
    header.dataset.order = playerSortOrder;
}

function sortTeamPressTable(column) {
    const table = document.getElementById('team-press-stats-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Toggle sort order if same column
    if (teamPressSortColumn === column) {
        teamPressSortOrder = teamPressSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        teamPressSortOrder = 'asc';
        teamPressSortColumn = column;
    }
    
    // Clear previous sort indicators
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        delete th.dataset.order;
    });
    
    // Sort rows
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'category':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'totalPos':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'totalNeg':
                aValue = parseInt(a.cells[2].textContent) || 0;
                bValue = parseInt(b.cells[2].textContent) || 0;
                break;
            case 'successRate':
                aValue = parseFloat(a.cells[3].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[3].textContent.replace('%', '')) || 0;
                break;
            case 'totalActions':
                aValue = parseInt(a.cells[4].textContent) || 0;
                bValue = parseInt(b.cells[4].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return teamPressSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return teamPressSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    // Clear tbody and re-add sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort indicator
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${teamPressSortOrder}`);
    header.dataset.order = teamPressSortOrder;
}

// Sorting functions for season tables
function sortSeasonPaintTable(column) {
    const table = document.getElementById('season-paint-percentage-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr:not(.team-row-overall)'));
    const overallRow = tbody.querySelector('.team-row-overall');
    
    // Toggle sort order if same column
    if (seasonPaintSortColumn === column) {
        seasonPaintSortOrder = seasonPaintSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        seasonPaintSortOrder = 'asc';
        seasonPaintSortColumn = column;
    }
    
    // Clear previous sort indicators
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        delete th.dataset.order;
    });
    
    // Sort rows (keeping overall row at bottom)
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'team':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'totalPoss':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'paintPoss':
                aValue = parseInt(a.cells[2].textContent) || 0;
                bValue = parseInt(b.cells[2].textContent) || 0;
                break;
            case 'paintPercent':
                aValue = parseFloat(a.cells[3].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[3].textContent.replace('%', '')) || 0;
                break;
            case 'paintPPP':
                aValue = parseFloat(a.cells[4].textContent) || 0;
                bValue = parseFloat(b.cells[4].textContent) || 0;
                break;
            case 'noPaintPoss':
                aValue = parseInt(a.cells[5].textContent) || 0;
                bValue = parseInt(b.cells[5].textContent) || 0;
                break;
            case 'noPaintPercent':
                aValue = parseFloat(a.cells[6].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[6].textContent.replace('%', '')) || 0;
                break;
            case 'noPaintPPP':
                aValue = parseFloat(a.cells[7].textContent) || 0;
                bValue = parseFloat(b.cells[7].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return seasonPaintSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return seasonPaintSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    // Clear tbody and re-add sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    if (overallRow) tbody.appendChild(overallRow);
    
    // Update sort indicator
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${seasonPaintSortOrder}`);
    header.dataset.order = seasonPaintSortOrder;
}

function sortSeasonPlayerTable(column) {
    const table = document.getElementById('season-player-stats-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Toggle sort order if same column
    if (seasonPlayerSortColumn === column) {
        seasonPlayerSortOrder = seasonPlayerSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        seasonPlayerSortOrder = 'asc';
        seasonPlayerSortColumn = column;
    }
    
    // Clear previous sort indicators
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        delete th.dataset.order;
    });
    
    // Sort rows
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'player':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'pressUpPos':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'pressUpNeg':
                aValue = parseInt(a.cells[2].textContent) || 0;
                bValue = parseInt(b.cells[2].textContent) || 0;
                break;
            case 'pressUpRate':
                aValue = parseFloat(a.cells[3].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[3].textContent.replace('%', '')) || 0;
                break;
            case 'atLevelPos':
                aValue = parseInt(a.cells[4].textContent) || 0;
                bValue = parseInt(b.cells[4].textContent) || 0;
                break;
            case 'atLevelNeg':
                aValue = parseInt(a.cells[5].textContent) || 0;
                bValue = parseInt(b.cells[5].textContent) || 0;
                break;
            case 'atLevelRate':
                aValue = parseFloat(a.cells[6].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[6].textContent.replace('%', '')) || 0;
                break;
            case 'totalActions':
                aValue = parseInt(a.cells[7].textContent) || 0;
                bValue = parseInt(b.cells[7].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return seasonPlayerSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return seasonPlayerSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    // Clear tbody and re-add sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort indicator
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${seasonPlayerSortOrder}`);
    header.dataset.order = seasonPlayerSortOrder;
}

function sortSeasonTeamPressTable(column) {
    const table = document.getElementById('season-team-press-stats-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Toggle sort order if same column
    if (seasonTeamPressSortColumn === column) {
        seasonTeamPressSortOrder = seasonTeamPressSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        seasonTeamPressSortOrder = 'asc';
        seasonTeamPressSortColumn = column;
    }
    
    // Clear previous sort indicators
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        delete th.dataset.order;
    });
    
    // Sort rows
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'category':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'totalPos':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'totalNeg':
                aValue = parseInt(a.cells[2].textContent) || 0;
                bValue = parseInt(b.cells[2].textContent) || 0;
                break;
            case 'successRate':
                aValue = parseFloat(a.cells[3].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[3].textContent.replace('%', '')) || 0;
                break;
            case 'totalActions':
                aValue = parseInt(a.cells[4].textContent) || 0;
                bValue = parseInt(b.cells[4].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return seasonTeamPressSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return seasonTeamPressSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    // Clear tbody and re-add sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort indicator
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${seasonTeamPressSortOrder}`);
    header.dataset.order = seasonTeamPressSortOrder;
}

// Regular Season table sorting functions
function sortRegularSeasonPaintTable(column) {
    const table = document.getElementById('regular-season-paint-percentage-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr:not(.team-row-overall)'));
    const overallRow = tbody.querySelector('.team-row-overall');
    
    // Toggle sort order if same column
    if (regularSeasonPaintSortColumn === column) {
        regularSeasonPaintSortOrder = regularSeasonPaintSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        regularSeasonPaintSortOrder = 'asc';
        regularSeasonPaintSortColumn = column;
    }
    
    // Clear previous sort indicators
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        delete th.dataset.order;
    });
    
    // Sort rows (keeping overall row at bottom)
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'team':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'totalPoss':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'paintPoss':
                aValue = parseInt(a.cells[2].textContent) || 0;
                bValue = parseInt(b.cells[2].textContent) || 0;
                break;
            case 'paintPercent':
                aValue = parseFloat(a.cells[3].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[3].textContent.replace('%', '')) || 0;
                break;
            case 'paintPPP':
                aValue = parseFloat(a.cells[4].textContent) || 0;
                bValue = parseFloat(b.cells[4].textContent) || 0;
                break;
            case 'noPaintPoss':
                aValue = parseInt(a.cells[5].textContent) || 0;
                bValue = parseInt(b.cells[5].textContent) || 0;
                break;
            case 'noPaintPercent':
                aValue = parseFloat(a.cells[6].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[6].textContent.replace('%', '')) || 0;
                break;
            case 'noPaintPPP':
                aValue = parseFloat(a.cells[7].textContent) || 0;
                bValue = parseFloat(b.cells[7].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return regularSeasonPaintSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return regularSeasonPaintSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    // Clear tbody and re-add sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    if (overallRow) tbody.appendChild(overallRow);
    
    // Update sort indicator
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${regularSeasonPaintSortOrder}`);
    header.dataset.order = regularSeasonPaintSortOrder;
}

function sortRegularSeasonPlayerTable(column) {
    const table = document.getElementById('regular-season-player-stats-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Toggle sort order if same column
    if (regularSeasonPlayerSortColumn === column) {
        regularSeasonPlayerSortOrder = regularSeasonPlayerSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        regularSeasonPlayerSortOrder = 'asc';
        regularSeasonPlayerSortColumn = column;
    }
    
    // Clear previous sort indicators
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        delete th.dataset.order;
    });
    
    // Sort rows
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'player':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'pressUpTotal':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'pressUpRate':
                aValue = parseFloat(a.cells[2].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[2].textContent.replace('%', '')) || 0;
                break;
            case 'atLevelTotal':
                aValue = parseInt(a.cells[3].textContent) || 0;
                bValue = parseInt(b.cells[3].textContent) || 0;
                break;
            case 'atLevelRate':
                aValue = parseFloat(a.cells[4].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[4].textContent.replace('%', '')) || 0;
                break;
            case 'totalActions':
                aValue = parseInt(a.cells[5].textContent) || 0;
                bValue = parseInt(b.cells[5].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return regularSeasonPlayerSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return regularSeasonPlayerSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    // Clear tbody and re-add sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort indicator
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${regularSeasonPlayerSortOrder}`);
    header.dataset.order = regularSeasonPlayerSortOrder;
}

function sortRegularSeasonTeamPressTable(column) {
    const table = document.getElementById('regular-season-team-press-stats-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Toggle sort order if same column
    if (regularSeasonTeamPressSortColumn === column) {
        regularSeasonTeamPressSortOrder = regularSeasonTeamPressSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        regularSeasonTeamPressSortOrder = 'asc';
        regularSeasonTeamPressSortColumn = column;
    }
    
    // Clear previous sort indicators
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        delete th.dataset.order;
    });
    
    // Sort rows
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'category':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'totalPos':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'totalNeg':
                aValue = parseInt(a.cells[2].textContent) || 0;
                bValue = parseInt(b.cells[2].textContent) || 0;
                break;
            case 'successRate':
                aValue = parseFloat(a.cells[3].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[3].textContent.replace('%', '')) || 0;
                break;
            case 'totalActions':
                aValue = parseInt(a.cells[4].textContent) || 0;
                bValue = parseInt(b.cells[4].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return regularSeasonTeamPressSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return regularSeasonTeamPressSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    // Clear tbody and re-add sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort indicator
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${regularSeasonTeamPressSortOrder}`);
    header.dataset.order = regularSeasonTeamPressSortOrder;
}

// Scrimmage table sorting functions
let scrimmagesSortColumn = null;
let scrimmagesSortOrder = 'asc';
let scrimmagesPlayerSortColumn = null;
let scrimmagesPlayerSortOrder = 'asc';
let scrimmagesTeamPressSortColumn = null;
let scrimmagesTeamPressSortOrder = 'asc';

function sortScrimmageTable(column) {
    const table = document.getElementById('scrimmage-paint-percentage-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Toggle sort order if same column
    if (scrimmagesSortColumn === column) {
        scrimmagesSortOrder = scrimmagesSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        scrimmagesSortOrder = 'asc';
        scrimmagesSortColumn = column;
    }
    
    // Clear previous sort indicators
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        delete th.dataset.order;
    });
    
    // Sort rows
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'team':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'totalPoss':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'paintPoss':
                aValue = parseInt(a.cells[2].textContent) || 0;
                bValue = parseInt(b.cells[2].textContent) || 0;
                break;
            case 'paintPercent':
                aValue = parseFloat(a.cells[3].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[3].textContent.replace('%', '')) || 0;
                break;
            case 'paintPPP':
                aValue = parseFloat(a.cells[4].textContent) || 0;
                bValue = parseFloat(b.cells[4].textContent) || 0;
                break;
            case 'noPaintPoss':
                aValue = parseInt(a.cells[5].textContent) || 0;
                bValue = parseInt(b.cells[5].textContent) || 0;
                break;
            case 'noPaintPercent':
                aValue = parseFloat(a.cells[6].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[6].textContent.replace('%', '')) || 0;
                break;
            case 'noPaintPPP':
                aValue = parseFloat(a.cells[7].textContent) || 0;
                bValue = parseFloat(b.cells[7].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return scrimmagesSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return scrimmagesSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    // Clear tbody and re-add sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort indicator
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${scrimmagesSortOrder}`);
    header.dataset.order = scrimmagesSortOrder;
}

function sortScrimmagePlayerTable(column) {
    const table = document.getElementById('scrimmage-player-stats-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Toggle sort order if same column
    if (scrimmagesPlayerSortColumn === column) {
        scrimmagesPlayerSortOrder = scrimmagesPlayerSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        scrimmagesPlayerSortOrder = 'asc';
        scrimmagesPlayerSortColumn = column;
    }
    
    // Clear previous sort indicators
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        delete th.dataset.order;
    });
    
    // Sort rows
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'player':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'pressUpTotal':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'pressUpRate':
                aValue = parseFloat(a.cells[2].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[2].textContent.replace('%', '')) || 0;
                break;
            case 'atLevelTotal':
                aValue = parseInt(a.cells[3].textContent) || 0;
                bValue = parseInt(b.cells[3].textContent) || 0;
                break;
            case 'atLevelRate':
                aValue = parseFloat(a.cells[4].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[4].textContent.replace('%', '')) || 0;
                break;
            case 'totalActions':
                aValue = parseInt(a.cells[5].textContent) || 0;
                bValue = parseInt(b.cells[5].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return scrimmagesPlayerSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return scrimmagesPlayerSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    // Clear tbody and re-add sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort indicator
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${scrimmagesPlayerSortOrder}`);
    header.dataset.order = scrimmagesPlayerSortOrder;
}

function sortScrimmageTeamPressTable(column) {
    const table = document.getElementById('scrimmage-team-press-stats-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Toggle sort order if same column
    if (scrimmagesTeamPressSortColumn === column) {
        scrimmagesTeamPressSortOrder = scrimmagesTeamPressSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        scrimmagesTeamPressSortOrder = 'asc';
        scrimmagesTeamPressSortColumn = column;
    }
    
    // Clear previous sort indicators
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        delete th.dataset.order;
    });
    
    // Sort rows
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'category':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'totalPos':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'totalNeg':
                aValue = parseInt(a.cells[2].textContent) || 0;
                bValue = parseInt(b.cells[2].textContent) || 0;
                break;
            case 'successRate':
                aValue = parseFloat(a.cells[3].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[3].textContent.replace('%', '')) || 0;
                break;
            case 'totalActions':
                aValue = parseInt(a.cells[4].textContent) || 0;
                bValue = parseInt(b.cells[4].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return scrimmagesTeamPressSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return scrimmagesTeamPressSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    // Clear tbody and re-add sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort indicator
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${scrimmagesTeamPressSortOrder}`);
    header.dataset.order = scrimmagesTeamPressSortOrder;
}

// Clear localStorage
function clearLocalStorage() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
        console.error('Error clearing localStorage:', err);
    }
}

// Save current practice to season totals and reset practice
function savePracticeToSeason() {
    if (confirm('Save current practice data to season totals? This will add current stats to your season-long totals.')) {
        // Create backup of current season data before modifying
        seasonStatsBackup = JSON.parse(JSON.stringify(seasonStats));
        seasonPlayerStatsBackup = JSON.parse(JSON.stringify(seasonPlayerStats));
        lastSeasonSaveTimestamp = Date.now();
        
        // Add team stats to season totals
        ['white', 'blue'].forEach(team => {
            ['paintTouch', 'noPaintTouch'].forEach(category => {
                seasonStats[team][category].possessions += teamStats[team][category].possessions;
                seasonStats[team][category].points += teamStats[team][category].points;
                
                // Add score breakdowns
                for (let points = 0; points <= 4; points++) {
                    seasonStats[team][category].scores[points] += teamStats[team][category].scores[points];
                }
            });
        });
        
        // Add player stats to season totals
        Object.keys(playerStats).forEach(playerNum => {
            ['pressUp', 'atLevel'].forEach(type => {
                seasonPlayerStats[playerNum][type].positive += playerStats[playerNum][type].positive;
                seasonPlayerStats[playerNum][type].negative += playerStats[playerNum][type].negative;
            });
        });
        
        // Save season data
        saveSeasonToLocalStorage();
        
        // Update displays (but don't reset)
        updateSeasonStatsDisplay();
        updateSeasonTeamPressStatsDisplay();
        
        showStatus('Practice data saved to season totals! Practice data preserved.');
        
        // Show undo button
        updateUndoButtonVisibility();
    }
}

// Undo last save to season
function undoLastSeasonSave() {
    if (!seasonStatsBackup || !seasonPlayerStatsBackup) {
        showStatus('No season save to undo!', 'error');
        return;
    }
    
    if (confirm('Undo the last save to season totals? This will restore the season data to its previous state.')) {
        // Restore the backup data
        seasonStats = JSON.parse(JSON.stringify(seasonStatsBackup));
        seasonPlayerStats = JSON.parse(JSON.stringify(seasonPlayerStatsBackup));
        
        // Clear the backup
        seasonStatsBackup = null;
        seasonPlayerStatsBackup = null;
        lastSeasonSaveTimestamp = null;
        
        // Save the restored data
        saveSeasonToLocalStorage();
        
        // Update displays
        updateSeasonStatsDisplay();
        updateSeasonTeamPressStatsDisplay();
        
        // Hide undo button
        updateUndoButtonVisibility();
        
        showStatus('Season save undone! Data restored to previous state.');
    }
}

// Update undo button visibility
function updateUndoButtonVisibility() {
    const undoBtn = document.getElementById('undo-season-save-btn');
    if (undoBtn) {
        if (seasonStatsBackup && seasonPlayerStatsBackup) {
            undoBtn.style.display = 'inline-block';
            // Show how long ago the save was made
            if (lastSeasonSaveTimestamp) {
                const minutesAgo = Math.floor((Date.now() - lastSeasonSaveTimestamp) / (1000 * 60));
                undoBtn.title = `Undo save from ${minutesAgo} minute(s) ago`;
            }
        } else {
            undoBtn.style.display = 'none';
        }
    }
}

// Save current practice data to scrimmage totals
function saveToScrimmages() {
    if (confirm('Save current practice data to scrimmage totals? This will add current stats to your scrimmage-long totals.')) {
        // If viewing a snapshot, restore actual totals first
        if (isViewingSnapshot && actualScrimmageStats) {
            scrimmageStats = JSON.parse(JSON.stringify(actualScrimmageStats));
            scrimmagePlayerStats = JSON.parse(JSON.stringify(actualScrimmagePlayerStats));
            isViewingSnapshot = false;
            const backBtn = document.getElementById('back-to-previous-btn');
            if (backBtn) {
                backBtn.style.display = 'none';
            }
        }
        
        // Add team stats to scrimmage totals
        ['white', 'blue'].forEach(team => {
            ['paintTouch', 'noPaintTouch'].forEach(category => {
                scrimmageStats[team][category].possessions += teamStats[team][category].possessions;
                scrimmageStats[team][category].points += teamStats[team][category].points;
                
                // Add score breakdowns
                for (let points = 0; points <= 4; points++) {
                    scrimmageStats[team][category].scores[points] += teamStats[team][category].scores[points];
                }
            });
        });
        
        // Add player stats to scrimmage totals
        Object.keys(playerStats).forEach(playerNum => {
            ['pressUp', 'atLevel'].forEach(type => {
                scrimmagePlayerStats[playerNum][type].positive += playerStats[playerNum][type].positive;
                scrimmagePlayerStats[playerNum][type].negative += playerStats[playerNum][type].negative;
            });
        });
        
        // Save scrimmage data
        saveScrimmageToLocalStorage();
        
        // Update the actual totals to match (since we just saved new data)
        actualScrimmageStats = JSON.parse(JSON.stringify(scrimmageStats));
        actualScrimmagePlayerStats = JSON.parse(JSON.stringify(scrimmagePlayerStats));
        
        // Auto-sync to Google Sheets if connected
        if (autoSyncEnabled && googleScriptUrl) {
            saveToGoogleSheets();
        }
        
        // Update displays (but don't reset)
        updateScrimmageStatsDisplay();
        updateScrimmageTeamPressStatsDisplay();
        
        showStatus('Practice data saved to scrimmage totals! Practice data preserved.' + (autoSyncEnabled ? ' (Synced to Google Sheets)' : ''));
    }
}

// Save current practice data to regular season totals
function saveToRegularSeason() {
    if (confirm('Save current practice data to Regular Season totals? This will add current stats to your regular season totals.')) {
        // Add team stats to regular season totals
        ['white', 'blue'].forEach(team => {
            ['paintTouch', 'noPaintTouch'].forEach(category => {
                regularSeasonStats[team][category].possessions += teamStats[team][category].possessions;
                regularSeasonStats[team][category].points += teamStats[team][category].points;
                
                // Add score breakdowns
                for (let points = 0; points <= 4; points++) {
                    regularSeasonStats[team][category].scores[points] += teamStats[team][category].scores[points];
                }
            });
        });
        
        // Add player stats to regular season totals
        Object.keys(playerStats).forEach(playerNum => {
            ['pressUp', 'atLevel'].forEach(type => {
                regularSeasonPlayerStats[playerNum][type].positive += playerStats[playerNum][type].positive;
                regularSeasonPlayerStats[playerNum][type].negative += playerStats[playerNum][type].negative;
            });
        });
        
        // Save regular season data
        saveRegularSeasonToLocalStorage();
        
        // Update displays
        updateRegularSeasonStatsDisplay();
        updateRegularSeasonTeamPressStatsDisplay();
        
        // Auto-sync to Google Sheets if enabled
        console.log('Auto-sync check:', { autoSyncEnabled, googleScriptUrl, hasUrl: !!googleScriptUrl });
        if (autoSyncEnabled && googleScriptUrl) {
            console.log('Triggering Google Sheets sync...');
            saveToGoogleSheets();
        } else {
            console.log('Auto-sync skipped - not enabled or no URL');
        }
        
        showStatus('Practice data saved to Regular Season totals! Practice data preserved.');
    }
}

// Reset only current practice data (not season totals)
// Reset only paint touch data (preserve player stats)
function resetPaintTouchData() {
    if (confirm('Reset paint touch data? This will clear team paint touch stats but preserve player press up/at level data.')) {
        teamStats = {
            white: {
                paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
                noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
            },
            blue: {
                paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
                noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
            }
        };
        
        // Clear only paint touch related action history
        actionHistory = [];
        
        // Reset quarter/half tracking
        lastQuarterSnapshot = null;
        quarterNumber = 1;
        lastHalfSnapshot = null;
        halfNumber = 1;
        
        updateStatsDisplay();
        updateActiveTeamDisplay();
        saveToLocalStorage();
        showStatus('Paint touch data cleared (player stats preserved)');
    }
}

function resetCurrentPractice() {
    teamStats = {
        white: {
            paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
            noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
        },
        blue: {
            paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
            noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
        }
    };
    
    // Reset player stats
    Object.keys(playerRoster).forEach(playerNum => {
        playerStats[playerNum] = {
            pressUp: { positive: 0, negative: 0 },
            atLevel: { positive: 0, negative: 0 }
        };
    });
    
    actionHistory = [];
    playerActionHistory = [];
    
    // Reset quarter tracking
    lastQuarterSnapshot = null;
    quarterNumber = 1;
    
    // Reset half tracking
    lastHalfSnapshot = null;
    halfNumber = 1;
    
    updateStatsDisplay();
    updateActiveTeamDisplay();
    updatePlayerStatsDisplay();
    updateTeamPressStatsDisplay();
    updateSeasonStatsDisplay();
    saveToLocalStorage();
}

// Reset scrimmage totals data
function resetScrimmageData() {
    if (confirm('Clear all scrimmage totals? This will permanently delete all saved scrimmage data but preserve current practice and season data.')) {
        // Reset scrimmage stats
        scrimmageStats = {
            white: {
                paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
                noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
            },
            blue: {
                paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
                noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
            }
        };
        
        // Reset scrimmage player stats
        Object.keys(playerRoster).forEach(playerNum => {
            scrimmagePlayerStats[playerNum] = {
                pressUp: { positive: 0, negative: 0 },
                atLevel: { positive: 0, negative: 0 }
            };
        });
        
        // Save cleared data
        saveScrimmageToLocalStorage();
        
        // Update displays
        updateScrimmageStatsDisplay();
        updateScrimmageTeamPressStatsDisplay();
        
        showStatus('Scrimmage totals have been cleared!');
    }
}

function resetRegularSeasonData() {
    if (confirm('Clear all Regular Season totals? This will permanently delete all saved Regular Season data but preserve current practice data.')) {
        // Reset regular season stats
        regularSeasonStats = {
            white: {
                paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
                noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
            },
            blue: {
                paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
                noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
            }
        };
        
        // Reset regular season player stats
        Object.keys(playerRoster).forEach(playerNum => {
            regularSeasonPlayerStats[playerNum] = {
                pressUp: { positive: 0, negative: 0 },
                atLevel: { positive: 0, negative: 0 }
            };
        });
        
        // Save cleared data
        saveRegularSeasonToLocalStorage();
        
        // Update displays
        updateRegularSeasonStatsDisplay();
        updateRegularSeasonTeamPressStatsDisplay();
        
        showStatus('Regular Season totals have been cleared!');
    }
}

// Add possession with score
function addPossession(team, paintTouch, points) {
    const category = paintTouch ? 'paintTouch' : 'noPaintTouch';
    
    // Update stats
    teamStats[team][category].possessions++;
    teamStats[team][category].points += points;
    teamStats[team][category].scores[points]++;
    
    // Track action for undo
    const action = {
        team: team,
        paintTouch: paintTouch,
        points: points,
        timestamp: Date.now()
    };
    actionHistory.push(action);
    
    updateStatsDisplay();
    updateActiveTeamDisplay();
    saveToLocalStorage();
    
    const touchType = paintTouch ? 'with paint touch' : 'without paint touch';
    showStatus(`${team} team: ${points} points ${touchType}`);
}

// Undo last action
function undoLastAction() {
    if (actionHistory.length === 0) {
        showStatus('No actions to undo!', 'error');
        return;
    }
    
    const lastAction = actionHistory.pop();
    const category = lastAction.paintTouch ? 'paintTouch' : 'noPaintTouch';
    
    // Reverse the action
    teamStats[lastAction.team][category].possessions--;
    teamStats[lastAction.team][category].points -= lastAction.points;
    teamStats[lastAction.team][category].scores[lastAction.points]--;
    
    updateStatsDisplay();
    updateActiveTeamDisplay();
    saveToLocalStorage();
    
    const touchType = lastAction.paintTouch ? 'with paint touch' : 'without paint touch';
    showStatus(`Undone: ${lastAction.team} team ${lastAction.points} points ${touchType}`);
}

// Hotkey system functions
function switchActiveTeam(team) {
    activeTeam = team;
    updateActiveTeamDisplay();
    showStatus(`Active team: ${team}`);
}

function togglePaintTouch() {
    activePaintTouch = !activePaintTouch;
    updateActiveTeamDisplay();
    const touchType = activePaintTouch ? 'Paint Touch' : 'No Paint Touch';
    showStatus(`Mode: ${touchType}`);
}

function updateActiveTeamDisplay() {
    // Update team buttons
    document.querySelectorAll('.team-selector').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.team === activeTeam);
    });
    
    // Update paint touch buttons
    document.querySelectorAll('.paint-touch-toggle').forEach(btn => {
        if (btn.classList.contains('paint-touch')) {
            btn.classList.toggle('active', activePaintTouch);
        } else if (btn.classList.contains('no-paint-touch')) {
            btn.classList.toggle('active', !activePaintTouch);
        }
    });
    
    // Update status display
    const statusEl = document.getElementById('current-status');
    if (statusEl) {
        const teamName = activeTeam.charAt(0).toUpperCase() + activeTeam.slice(1);
        const mode = activePaintTouch ? 'Paint Touch' : 'No Paint Touch';
        statusEl.innerHTML = `<strong>Active Team:</strong> ${teamName} | <strong>Mode:</strong> ${mode}`;
    }
}

// Show status message
function showStatus(message, type = 'info') {
    const statusEl = document.getElementById('status-message');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.className = `status-message ${type}`;
        statusEl.style.display = 'block';
        
        setTimeout(() => {
            statusEl.style.display = 'none';
        }, 3000);
    }
    
    console.log(`Status (${type}):`, message);
}

// Update statistics display
function updateStatsDisplay() {
    // Update team stats table
    const tbody = document.getElementById('team-stats-tbody');
    if (tbody) {
        let html = '';
        
        ['white', 'blue'].forEach(team => {
            ['paintTouch', 'noPaintTouch'].forEach(category => {
                const stats = teamStats[team][category];
                const categoryName = category === 'paintTouch' ? 'Paint Touch' : 'No Paint Touch';
                const avg = stats.possessions > 0 ? (stats.points / stats.possessions).toFixed(2) : '0.00';
                
                html += `
                    <tr class="team-row-${team}">
                        <td><strong>${team.charAt(0).toUpperCase() + team.slice(1)}</strong></td>
                        <td>${categoryName}</td>
                        <td><span class="highlight-number">${stats.possessions}</span></td>
                        <td><span class="highlight-number">${stats.points}</span></td>
                        <td><strong>${avg}</strong></td>
                    </tr>
                `;
            });
        });
        
        tbody.innerHTML = html;
    }
    
    // Update paint touch percentage table
    const paintPercentageTbody = document.getElementById('paint-percentage-tbody');
    if (paintPercentageTbody) {
        let html = '';
        
        ['white', 'blue'].forEach(team => {
            const paintTouchPoss = teamStats[team].paintTouch.possessions;
            const noPaintTouchPoss = teamStats[team].noPaintTouch.possessions;
            const totalPoss = paintTouchPoss + noPaintTouchPoss;
            
            const paintTouchPercent = totalPoss > 0 ? ((paintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
            const noPaintTouchPercent = totalPoss > 0 ? ((noPaintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
            
            // Calculate PPP (Points Per Possession)
            const paintTouchPPP = paintTouchPoss > 0 ? (teamStats[team].paintTouch.points / paintTouchPoss).toFixed(2) : '0.00';
            const noPaintTouchPPP = noPaintTouchPoss > 0 ? (teamStats[team].noPaintTouch.points / noPaintTouchPoss).toFixed(2) : '0.00';
            
            // Determine percentage styling classes
            const paintPercentClass = parseFloat(paintTouchPercent) >= 70 ? 'percentage-high' : 
                                    parseFloat(paintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
            const noPaintPercentClass = parseFloat(noPaintTouchPercent) >= 70 ? 'percentage-high' : 
                                       parseFloat(noPaintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
            
            // Determine PPP styling classes (higher is better)
            const paintPPPClass = parseFloat(paintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                 parseFloat(paintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
            const noPaintPPPClass = parseFloat(noPaintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                   parseFloat(noPaintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
            
            html += `
                <tr class="team-row-${team}">
                    <td><strong>${team.charAt(0).toUpperCase() + team.slice(1)}</strong></td>
                    <td><span class="highlight-number">${totalPoss}</span></td>
                    <td><span class="highlight-number">${paintTouchPoss}</span></td>
                    <td><span class="${paintPercentClass}">${paintTouchPercent}%</span></td>
                    <td><span class="${paintPPPClass}">${paintTouchPPP}</span></td>
                    <td><span class="highlight-number">${noPaintTouchPoss}</span></td>
                    <td><span class="${noPaintPercentClass}">${noPaintTouchPercent}%</span></td>
                    <td><span class="${noPaintPPPClass}">${noPaintTouchPPP}</span></td>
                </tr>
            `;
        });
        
        // Add overall row
        const overallPaintTouchPoss = teamStats.white.paintTouch.possessions + teamStats.blue.paintTouch.possessions;
        const overallNoPaintTouchPoss = teamStats.white.noPaintTouch.possessions + teamStats.blue.noPaintTouch.possessions;
        const overallTotalPoss = overallPaintTouchPoss + overallNoPaintTouchPoss;
        
        const overallPaintTouchPercent = overallTotalPoss > 0 ? ((overallPaintTouchPoss / overallTotalPoss) * 100).toFixed(1) : '0.0';
        const overallNoPaintTouchPercent = overallTotalPoss > 0 ? ((overallNoPaintTouchPoss / overallTotalPoss) * 100).toFixed(1) : '0.0';
        
        // Calculate overall PPP
        const overallPaintTouchPoints = teamStats.white.paintTouch.points + teamStats.blue.paintTouch.points;
        const overallNoPaintTouchPoints = teamStats.white.noPaintTouch.points + teamStats.blue.noPaintTouch.points;
        const overallPaintTouchPPP = overallPaintTouchPoss > 0 ? (overallPaintTouchPoints / overallPaintTouchPoss).toFixed(2) : '0.00';
        const overallNoPaintTouchPPP = overallNoPaintTouchPoss > 0 ? (overallNoPaintTouchPoints / overallNoPaintTouchPoss).toFixed(2) : '0.00';
        
        // Styling for overall row
        const overallPaintPercentClass = parseFloat(overallPaintTouchPercent) >= 70 ? 'percentage-high' : 
                                        parseFloat(overallPaintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
        const overallNoPaintPercentClass = parseFloat(overallNoPaintTouchPercent) >= 70 ? 'percentage-high' : 
                                          parseFloat(overallNoPaintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
        const overallPaintPPPClass = parseFloat(overallPaintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                    parseFloat(overallPaintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
        const overallNoPaintPPPClass = parseFloat(overallNoPaintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                      parseFloat(overallNoPaintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
        
        html += `
            <tr class="team-row-overall">
                <td><strong>OVERALL</strong></td>
                <td><span class="highlight-number">${overallTotalPoss}</span></td>
                <td><span class="highlight-number">${overallPaintTouchPoss}</span></td>
                <td><span class="${overallPaintPercentClass}">${overallPaintTouchPercent}%</span></td>
                <td><span class="${overallPaintPPPClass}">${overallPaintTouchPPP}</span></td>
                <td><span class="highlight-number">${overallNoPaintTouchPoss}</span></td>
                <td><span class="${overallNoPaintPercentClass}">${overallNoPaintTouchPercent}%</span></td>
                <td><span class="${overallNoPaintPPPClass}">${overallNoPaintTouchPPP}</span></td>
            </tr>
        `;
        
        paintPercentageTbody.innerHTML = html;
    }
    
    // Update scoring breakdown table
    const scoringTbody = document.getElementById('scoring-breakdown-tbody');
    if (scoringTbody) {
        let html = '';
        
        ['white', 'blue'].forEach(team => {
            ['paintTouch', 'noPaintTouch'].forEach(category => {
                const stats = teamStats[team][category];
                const categoryName = category === 'paintTouch' ? 'Paint Touch' : 'No Paint Touch';
                
                html += `
                    <tr class="team-row-${team}">
                        <td><strong>${team.charAt(0).toUpperCase() + team.slice(1)}</strong></td>
                        <td>${categoryName}</td>
                        <td>${stats.scores[0]}</td>
                        <td>${stats.scores[1]}</td>
                        <td>${stats.scores[2]}</td>
                        <td>${stats.scores[3]}</td>
                        <td>${stats.scores[4]}</td>
                        <td><span class="highlight-number">${stats.possessions}</span></td>
                    </tr>
                `;
            });
        });
        
        scoringTbody.innerHTML = html;
    }
}

// Keyboard event handler
function handleKeyPress(event) {
    // Prevent hotkeys when typing in input fields
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }
    
    const key = event.key;
    const keyLower = key.toLowerCase();
    
    // Handle player selection hotkeys
    if (event.shiftKey && /^\d$/.test(key)) {
        // Shift + number for double digit jerseys
        const digit = key;
        handleShiftNumberPress(digit);
        event.preventDefault();
        return;
    } else if (/^\d$/.test(key)) {
        // Single digit for jersey numbers 1-9
        const playerNum = key;
        if (playerRoster[playerNum]) {
            selectPlayer(playerNum);
            event.preventDefault();
            return;
        }
    }
    
    switch (keyLower) {
        case 'w':
            event.preventDefault();
            switchActiveTeam('white');
            break;
        case 'b':
            event.preventDefault();
            switchActiveTeam('blue');
            break;
        case 't':
            event.preventDefault();
            switchActiveTeam(activeTeam === 'white' ? 'blue' : 'white');
            break;
        case 'p':
            event.preventDefault();
            togglePaintTouch();
            break;
        case 'u':
            event.preventDefault();
            undoLastAction();
            break;
        case 'escape':
            event.preventDefault();
            if (selectedPlayer) {
                selectedPlayer = null;
                updatePlayerDisplay();
                showStatus('Player deselected');
            }
            break;
    }
}

// Handle shift + number combinations for double digit jerseys
let shiftNumberBuffer = '';
let shiftNumberTimeout = null;

function handleShiftNumberPress(digit) {
    // Clear any existing timeout
    if (shiftNumberTimeout) {
        clearTimeout(shiftNumberTimeout);
    }
    
    // Add digit to buffer
    shiftNumberBuffer += digit;
    
    // Check if we have a valid jersey number
    if (playerRoster[shiftNumberBuffer]) {
        selectPlayer(shiftNumberBuffer);
        shiftNumberBuffer = '';
        return;
    }
    
    // Set timeout to clear buffer if no valid number is formed
    shiftNumberTimeout = setTimeout(() => {
        // Check for valid two-digit combinations
        const possibleNumbers = Object.keys(playerRoster).filter(num => num.startsWith(shiftNumberBuffer));
        
        if (possibleNumbers.length === 1) {
            // Only one possible match, select it
            selectPlayer(possibleNumbers[0]);
        } else if (shiftNumberBuffer.length >= 2) {
            // Two digits entered but no match
            showStatus(`No player with jersey #${shiftNumberBuffer}`, 'error');
        }
        
        shiftNumberBuffer = '';
    }, 1000); // 1 second timeout
}

// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Set active tab button
    const targetBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    // Update season stats when switching to season totals tab
    if (tabName === 'season-totals') {
        updateSeasonStatsDisplay();
        updateSeasonTeamPressStatsDisplay();
    }
    
    // Update first 5 stats when switching to first 5 tab
    if (tabName === 'first-5') {
        updateFirst5StatsDisplay();
        updateFirst5PlayerStatsDisplay();
        updateFirst5TeamPressStatsDisplay();
    }
    
    // Populate comparison selectors when switching to comparison tab
    if (tabName === 'snapshot-comparison') {
        populateComparisonSelectors();
    }
}

// Update season team press stats display
function updateSeasonTeamPressStatsDisplay() {
    const tbody = document.getElementById('season-team-press-stats-tbody');
    if (!tbody) return;
    
    // Calculate season team totals
    let pressUpPositive = 0, pressUpNegative = 0;
    let atLevelPositive = 0, atLevelNegative = 0;
    
    Object.keys(seasonPlayerStats).forEach(playerNum => {
        const stats = seasonPlayerStats[playerNum];
        pressUpPositive += stats.pressUp.positive;
        pressUpNegative += stats.pressUp.negative;
        atLevelPositive += stats.atLevel.positive;
        atLevelNegative += stats.atLevel.negative;
    });
    
    const pressUpRate = calculateRate(pressUpPositive, pressUpNegative);
    const atLevelRate = calculateRate(atLevelPositive, atLevelNegative);
    const pressUpTotal = pressUpPositive + pressUpNegative;
    const atLevelTotal = atLevelPositive + atLevelNegative;
    
    const html = `
        <tr class="team-row-overall">
            <td><strong>Season Press Up</strong></td>
            <td><span class="highlight-number">${pressUpPositive}</span></td>
            <td><span class="highlight-number">${pressUpNegative}</span></td>
            <td><span class="${getRateClass(pressUpRate)}">${pressUpRate}%</span></td>
            <td><span class="highlight-number">${pressUpTotal}</span></td>
        </tr>
        <tr class="team-row-overall">
            <td><strong>Season At Level</strong></td>
            <td><span class="highlight-number">${atLevelPositive}</span></td>
            <td><span class="highlight-number">${atLevelNegative}</span></td>
            <td><span class="${getRateClass(atLevelRate)}">${atLevelRate}%</span></td>
            <td><span class="highlight-number">${atLevelTotal}</span></td>
        </tr>
    `;
    
    tbody.innerHTML = html;
}

// Update scrimmage stats display
function updateScrimmageStatsDisplay() {
    // Update scrimmage paint percentage table
    const scrimmagePercentageTbody = document.getElementById('scrimmage-paint-percentage-tbody');
    if (scrimmagePercentageTbody) {
        let html = '';
        
        ['white', 'blue'].forEach(team => {
            const paintTouchPoss = scrimmageStats[team].paintTouch.possessions;
            const noPaintTouchPoss = scrimmageStats[team].noPaintTouch.possessions;
            const totalPoss = paintTouchPoss + noPaintTouchPoss;
            
            const paintTouchPercent = totalPoss > 0 ? ((paintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
            const noPaintTouchPercent = totalPoss > 0 ? ((noPaintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
            
            // Calculate PPP (Points Per Possession)
            const paintTouchPPP = paintTouchPoss > 0 ? (scrimmageStats[team].paintTouch.points / paintTouchPoss).toFixed(2) : '0.00';
            const noPaintTouchPPP = noPaintTouchPoss > 0 ? (scrimmageStats[team].noPaintTouch.points / noPaintTouchPoss).toFixed(2) : '0.00';
            
            // Determine percentage styling classes
            const paintPercentClass = parseFloat(paintTouchPercent) >= 70 ? 'percentage-high' : 
                                    parseFloat(paintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
            const noPaintPercentClass = parseFloat(noPaintTouchPercent) >= 70 ? 'percentage-high' : 
                                       parseFloat(noPaintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
            
            // Determine PPP styling classes (higher is better)
            const paintPPPClass = parseFloat(paintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                 parseFloat(paintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
            const noPaintPPPClass = parseFloat(noPaintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                   parseFloat(noPaintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
            
            html += `
                <tr class="team-row-${team}">
                    <td><strong>${team.charAt(0).toUpperCase() + team.slice(1)}</strong></td>
                    <td><span class="highlight-number">${totalPoss}</span></td>
                    <td><span class="highlight-number">${paintTouchPoss}</span></td>
                    <td><span class="${paintPercentClass}">${paintTouchPercent}%</span></td>
                    <td><span class="${paintPPPClass}">${paintTouchPPP}</span></td>
                    <td><span class="highlight-number">${noPaintTouchPoss}</span></td>
                    <td><span class="${noPaintPercentClass}">${noPaintTouchPercent}%</span></td>
                    <td><span class="${noPaintPPPClass}">${noPaintTouchPPP}</span></td>
                </tr>
            `;
        });
        
        // Add overall row
        const overallPaintTouchPoss = scrimmageStats.white.paintTouch.possessions + scrimmageStats.blue.paintTouch.possessions;
        const overallNoPaintTouchPoss = scrimmageStats.white.noPaintTouch.possessions + scrimmageStats.blue.noPaintTouch.possessions;
        const overallTotalPoss = overallPaintTouchPoss + overallNoPaintTouchPoss;
        
        const overallPaintTouchPercent = overallTotalPoss > 0 ? ((overallPaintTouchPoss / overallTotalPoss) * 100).toFixed(1) : '0.0';
        const overallNoPaintTouchPercent = overallTotalPoss > 0 ? ((overallNoPaintTouchPoss / overallTotalPoss) * 100).toFixed(1) : '0.0';
        
        // Calculate overall PPP
        const overallPaintTouchPoints = scrimmageStats.white.paintTouch.points + scrimmageStats.blue.paintTouch.points;
        const overallNoPaintTouchPoints = scrimmageStats.white.noPaintTouch.points + scrimmageStats.blue.noPaintTouch.points;
        const overallPaintTouchPPP = overallPaintTouchPoss > 0 ? (overallPaintTouchPoints / overallPaintTouchPoss).toFixed(2) : '0.00';
        const overallNoPaintTouchPPP = overallNoPaintTouchPoss > 0 ? (overallNoPaintTouchPoints / overallNoPaintTouchPoss).toFixed(2) : '0.00';
        
        // Styling for overall row
        const overallPaintPercentClass = parseFloat(overallPaintTouchPercent) >= 70 ? 'percentage-high' : 
                                        parseFloat(overallPaintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
        const overallNoPaintPercentClass = parseFloat(overallNoPaintTouchPercent) >= 70 ? 'percentage-high' : 
                                          parseFloat(overallNoPaintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
        const overallPaintPPPClass = parseFloat(overallPaintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                    parseFloat(overallPaintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
        const overallNoPaintPPPClass = parseFloat(overallNoPaintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                      parseFloat(overallNoPaintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
        
        html += `
            <tr class="team-row-overall">
                <td><strong>SCRIMMAGE OVERALL</strong></td>
                <td><span class="highlight-number">${overallTotalPoss}</span></td>
                <td><span class="highlight-number">${overallPaintTouchPoss}</span></td>
                <td><span class="${overallPaintPercentClass}">${overallPaintTouchPercent}%</span></td>
                <td><span class="${overallPaintPPPClass}">${overallPaintTouchPPP}</span></td>
                <td><span class="highlight-number">${overallNoPaintTouchPoss}</span></td>
                <td><span class="${overallNoPaintPercentClass}">${overallNoPaintTouchPercent}%</span></td>
                <td><span class="${overallNoPaintPPPClass}">${overallNoPaintTouchPPP}</span></td>
            </tr>
        `;
        
        scrimmagePercentageTbody.innerHTML = html;
    }
    
    // Update scrimmage player stats table
    const scrimmagePlayerTbody = document.getElementById('scrimmage-player-stats-tbody');
    if (scrimmagePlayerTbody) {
        let html = '';
        
        Object.keys(playerRoster).forEach(playerNum => {
            const stats = scrimmagePlayerStats[playerNum];
            // Skip if player data doesn't exist in this snapshot
            if (!stats || !stats.pressUp || !stats.atLevel) {
                return;
            }
            const pressUpTotal = stats.pressUp.positive + stats.pressUp.negative;
            const atLevelTotal = stats.atLevel.positive + stats.atLevel.negative;
            const pressUpRate = calculateRate(stats.pressUp.positive, stats.pressUp.negative);
            const atLevelRate = calculateRate(stats.atLevel.positive, stats.atLevel.negative);
            const totalActions = pressUpTotal + atLevelTotal;
            
            html += `
                <tr>
                    <td><strong>#${playerNum} ${playerRoster[playerNum]}</strong></td>
                    <td><span class="highlight-number">${pressUpTotal}</span></td>
                    <td><span class="${getRateClass(pressUpRate)}">${pressUpRate}%</span></td>
                    <td><span class="highlight-number">${atLevelTotal}</span></td>
                    <td><span class="${getRateClass(atLevelRate)}">${atLevelRate}%</span></td>
                    <td><span class="highlight-number">${totalActions}</span></td>
                </tr>
            `;
        });
        
        scrimmagePlayerTbody.innerHTML = html;
    }
}

function updateScrimmageTeamPressStatsDisplay() {
    const tbody = document.getElementById('scrimmage-team-press-stats-tbody');
    if (!tbody) {
        console.error('scrimmage-team-press-stats-tbody not found!');
        return;
    }
    
    console.log('Updating scrimmage team press stats with data:', scrimmagePlayerStats);
    
    // Calculate scrimmage team totals
    let pressUpPositive = 0, pressUpNegative = 0;
    let atLevelPositive = 0, atLevelNegative = 0;
    
    Object.keys(scrimmagePlayerStats).forEach(playerNum => {
        const stats = scrimmagePlayerStats[playerNum];
        pressUpPositive += stats.pressUp.positive;
        pressUpNegative += stats.pressUp.negative;
        atLevelPositive += stats.atLevel.positive;
        atLevelNegative += stats.atLevel.negative;
    });
    
    console.log('Calculated totals - Press Up:', pressUpPositive, '/', pressUpNegative, 'At Level:', atLevelPositive, '/', atLevelNegative);
    
    const pressUpRate = calculateRate(pressUpPositive, pressUpNegative);
    const atLevelRate = calculateRate(atLevelPositive, atLevelNegative);
    const pressUpTotal = pressUpPositive + pressUpNegative;
    const atLevelTotal = atLevelPositive + atLevelNegative;
    
    const html = `
        <tr class="team-row-overall">
            <td><strong>Season Press Up</strong></td>
            <td><span class="highlight-number">${pressUpPositive}</span></td>
            <td><span class="highlight-number">${pressUpNegative}</span></td>
            <td><span class="${getRateClass(pressUpRate)}">${pressUpRate}%</span></td>
            <td><span class="highlight-number">${pressUpTotal}</span></td>
        </tr>
        <tr class="team-row-overall">
            <td><strong>Season At Level</strong></td>
            <td><span class="highlight-number">${atLevelPositive}</span></td>
            <td><span class="highlight-number">${atLevelNegative}</span></td>
            <td><span class="${getRateClass(atLevelRate)}">${atLevelRate}%</span></td>
            <td><span class="highlight-number">${atLevelTotal}</span></td>
        </tr>
    `;
    
    tbody.innerHTML = html;
}

// Regular Season Display Functions
function updateRegularSeasonStatsDisplay() {
    const regularSeasonPercentageTbody = document.getElementById('regular-season-paint-percentage-tbody');
    if (regularSeasonPercentageTbody) {
        let html = '';
        
        ['white', 'blue'].forEach(team => {
            const paintTouchPoss = regularSeasonStats[team].paintTouch.possessions;
            const noPaintTouchPoss = regularSeasonStats[team].noPaintTouch.possessions;
            const totalPoss = paintTouchPoss + noPaintTouchPoss;
            
            const paintTouchPercent = totalPoss > 0 ? ((paintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
            const noPaintTouchPercent = totalPoss > 0 ? ((noPaintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
            
            const paintTouchPPP = paintTouchPoss > 0 ? (regularSeasonStats[team].paintTouch.points / paintTouchPoss).toFixed(2) : '0.00';
            const noPaintTouchPPP = noPaintTouchPoss > 0 ? (regularSeasonStats[team].noPaintTouch.points / noPaintTouchPoss).toFixed(2) : '0.00';
            
            const paintPercentClass = parseFloat(paintTouchPercent) >= 60 ? 'highlight-good' : parseFloat(paintTouchPercent) <= 40 ? 'highlight-bad' : '';
            const noPaintPercentClass = parseFloat(noPaintTouchPercent) >= 40 ? 'highlight-bad' : '';
            const paintPPPClass = parseFloat(paintTouchPPP) >= 1.0 ? 'highlight-good' : parseFloat(paintTouchPPP) < 0.8 ? 'highlight-bad' : '';
            const noPaintPPPClass = parseFloat(noPaintTouchPPP) >= 1.0 ? 'highlight-good' : parseFloat(noPaintTouchPPP) < 0.8 ? 'highlight-bad' : '';
            
            html += `
            <tr>
                <td><strong>${team.charAt(0).toUpperCase() + team.slice(1)}</strong></td>
                <td><span class="highlight-number">${totalPoss}</span></td>
                <td><span class="highlight-number">${paintTouchPoss}</span></td>
                <td><span class="${paintPercentClass}">${paintTouchPercent}%</span></td>
                <td><span class="${paintPPPClass}">${paintTouchPPP}</span></td>
                <td><span class="highlight-number">${noPaintTouchPoss}</span></td>
                <td><span class="${noPaintPercentClass}">${noPaintTouchPercent}%</span></td>
                <td><span class="${noPaintPPPClass}">${noPaintTouchPPP}</span></td>
            </tr>
            `;
        });
        
        // Calculate overall stats
        const overallPaintTouch = regularSeasonStats.white.paintTouch.possessions + regularSeasonStats.blue.paintTouch.possessions;
        const overallNoPaintTouch = regularSeasonStats.white.noPaintTouch.possessions + regularSeasonStats.blue.noPaintTouch.possessions;
        const overallTotal = overallPaintTouch + overallNoPaintTouch;
        
        const overallPaintTouchPercent = overallTotal > 0 ? ((overallPaintTouch / overallTotal) * 100).toFixed(1) : '0.0';
        const overallNoPaintTouchPercent = overallTotal > 0 ? ((overallNoPaintTouch / overallTotal) * 100).toFixed(1) : '0.0';
        
        const overallPaintTouchPoints = regularSeasonStats.white.paintTouch.points + regularSeasonStats.blue.paintTouch.points;
        const overallNoPaintTouchPoints = regularSeasonStats.white.noPaintTouch.points + regularSeasonStats.blue.noPaintTouch.points;
        
        const overallPaintTouchPPP = overallPaintTouch > 0 ? (overallPaintTouchPoints / overallPaintTouch).toFixed(2) : '0.00';
        const overallNoPaintTouchPPP = overallNoPaintTouch > 0 ? (overallNoPaintTouchPoints / overallNoPaintTouch).toFixed(2) : '0.00';
        
        const overallPaintPercentClass = parseFloat(overallPaintTouchPercent) >= 60 ? 'highlight-good' : parseFloat(overallPaintTouchPercent) <= 40 ? 'highlight-bad' : '';
        const overallNoPaintPercentClass = parseFloat(overallNoPaintTouchPercent) >= 40 ? 'highlight-bad' : '';
        const overallPaintPPPClass = parseFloat(overallPaintTouchPPP) >= 1.0 ? 'highlight-good' : parseFloat(overallPaintTouchPPP) < 0.8 ? 'highlight-bad' : '';
        const overallNoPaintPPPClass = parseFloat(overallNoPaintTouchPPP) >= 1.0 ? 'highlight-good' : parseFloat(overallNoPaintTouchPPP) < 0.8 ? 'highlight-bad' : '';
        
        html += `
            <tr class="team-row-overall">
                <td><strong>Overall</strong></td>
                <td><span class="highlight-number">${overallTotal}</span></td>
                <td><span class="highlight-number">${overallPaintTouch}</span></td>
                <td><span class="${overallPaintPercentClass}">${overallPaintTouchPercent}%</span></td>
                <td><span class="${overallPaintPPPClass}">${overallPaintTouchPPP}</span></td>
                <td><span class="highlight-number">${overallNoPaintTouch}</span></td>
                <td><span class="${overallNoPaintPercentClass}">${overallNoPaintTouchPercent}%</span></td>
                <td><span class="${overallNoPaintPPPClass}">${overallNoPaintTouchPPP}</span></td>
            </tr>
        `;
        
        regularSeasonPercentageTbody.innerHTML = html;
    }
    
    // Update regular season player stats table
    const regularSeasonPlayerTbody = document.getElementById('regular-season-player-stats-tbody');
    if (regularSeasonPlayerTbody) {
        let html = '';
        
        Object.keys(playerRoster).forEach(playerNum => {
            const stats = regularSeasonPlayerStats[playerNum];
            if (!stats || !stats.pressUp || !stats.atLevel) {
                return;
            }
            const pressUpTotal = stats.pressUp.positive + stats.pressUp.negative;
            const atLevelTotal = stats.atLevel.positive + stats.atLevel.negative;
            const pressUpRate = calculateRate(stats.pressUp.positive, stats.pressUp.negative);
            const atLevelRate = calculateRate(stats.atLevel.positive, stats.atLevel.negative);
            const totalActions = pressUpTotal + atLevelTotal;
            
            html += `
                <tr>
                    <td><strong>#${playerNum} ${playerRoster[playerNum]}</strong></td>
                    <td><span class="highlight-number">${pressUpTotal}</span></td>
                    <td><span class="${getRateClass(pressUpRate)}">${pressUpRate}%</span></td>
                    <td><span class="highlight-number">${atLevelTotal}</span></td>
                    <td><span class="${getRateClass(atLevelRate)}">${atLevelRate}%</span></td>
                    <td><span class="highlight-number">${totalActions}</span></td>
                </tr>
            `;
        });
        
        regularSeasonPlayerTbody.innerHTML = html;
    }
}

function updateRegularSeasonTeamPressStatsDisplay() {
    const tbody = document.getElementById('regular-season-team-press-stats-tbody');
    if (!tbody) {
        console.error('regular-season-team-press-stats-tbody not found!');
        return;
    }
    
    // Calculate regular season team totals
    let pressUpPositive = 0, pressUpNegative = 0;
    let atLevelPositive = 0, atLevelNegative = 0;
    
    Object.keys(regularSeasonPlayerStats).forEach(playerNum => {
        const stats = regularSeasonPlayerStats[playerNum];
        pressUpPositive += stats.pressUp.positive;
        pressUpNegative += stats.pressUp.negative;
        atLevelPositive += stats.atLevel.positive;
        atLevelNegative += stats.atLevel.negative;
    });
    
    const pressUpRate = calculateRate(pressUpPositive, pressUpNegative);
    const atLevelRate = calculateRate(atLevelPositive, atLevelNegative);
    const pressUpTotal = pressUpPositive + pressUpNegative;
    const atLevelTotal = atLevelPositive + atLevelNegative;
    
    const html = `
        <tr class="team-row-overall">
            <td><strong>Regular Season Press Up</strong></td>
            <td><span class="highlight-number">${pressUpPositive}</span></td>
            <td><span class="highlight-number">${pressUpNegative}</span></td>
            <td><span class="${getRateClass(pressUpRate)}">${pressUpRate}%</span></td>
            <td><span class="highlight-number">${pressUpTotal}</span></td>
        </tr>
        <tr class="team-row-overall">
            <td><strong>Regular Season At Level</strong></td>
            <td><span class="highlight-number">${atLevelPositive}</span></td>
            <td><span class="highlight-number">${atLevelNegative}</span></td>
            <td><span class="${getRateClass(atLevelRate)}">${atLevelRate}%</span></td>
            <td><span class="highlight-number">${atLevelTotal}</span></td>
        </tr>
    `;
    
    tbody.innerHTML = html;
}

// First 5 Games Display Functions
function updateFirst5StatsDisplay() {
    const first5PercentageTbody = document.getElementById('first5-paint-percentage-tbody');
    if (first5PercentageTbody) {
        let html = '';
        
        ['white', 'blue'].forEach(team => {
            const paintTouchPoss = first5Stats[team].paintTouch.possessions;
            const noPaintTouchPoss = first5Stats[team].noPaintTouch.possessions;
            const totalPoss = paintTouchPoss + noPaintTouchPoss;
            
            const paintTouchPercent = totalPoss > 0 ? ((paintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
            const noPaintTouchPercent = totalPoss > 0 ? ((noPaintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
            
            const paintTouchPPP = paintTouchPoss > 0 ? (first5Stats[team].paintTouch.points / paintTouchPoss).toFixed(2) : '0.00';
            const noPaintTouchPPP = noPaintTouchPoss > 0 ? (first5Stats[team].noPaintTouch.points / noPaintTouchPoss).toFixed(2) : '0.00';
            
            const paintPercentClass = parseFloat(paintTouchPercent) >= 70 ? 'percentage-high' : 
                                    parseFloat(paintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
            const noPaintPercentClass = parseFloat(noPaintTouchPercent) >= 70 ? 'percentage-high' : 
                                       parseFloat(noPaintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
            
            const paintPPPClass = parseFloat(paintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                 parseFloat(paintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
            const noPaintPPPClass = parseFloat(noPaintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                   parseFloat(noPaintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
            
            html += `
                <tr class="team-row-${team}">
                    <td><strong>${team.charAt(0).toUpperCase() + team.slice(1)}</strong></td>
                    <td><span class="highlight-number">${totalPoss}</span></td>
                    <td><span class="highlight-number">${paintTouchPoss}</span></td>
                    <td><span class="${paintPercentClass}">${paintTouchPercent}%</span></td>
                    <td><span class="${paintPPPClass}">${paintTouchPPP}</span></td>
                    <td><span class="highlight-number">${noPaintTouchPoss}</span></td>
                    <td><span class="${noPaintPercentClass}">${noPaintTouchPercent}%</span></td>
                    <td><span class="${noPaintPPPClass}">${noPaintTouchPPP}</span></td>
                </tr>
            `;
        });
        
        // Add overall row
        const overallPaintTouchPoss = first5Stats.white.paintTouch.possessions + first5Stats.blue.paintTouch.possessions;
        const overallNoPaintTouchPoss = first5Stats.white.noPaintTouch.possessions + first5Stats.blue.noPaintTouch.possessions;
        const overallTotalPoss = overallPaintTouchPoss + overallNoPaintTouchPoss;
        
        const overallPaintTouchPercent = overallTotalPoss > 0 ? ((overallPaintTouchPoss / overallTotalPoss) * 100).toFixed(1) : '0.0';
        const overallNoPaintTouchPercent = overallTotalPoss > 0 ? ((overallNoPaintTouchPoss / overallTotalPoss) * 100).toFixed(1) : '0.0';
        
        const overallPaintTouchPoints = first5Stats.white.paintTouch.points + first5Stats.blue.paintTouch.points;
        const overallNoPaintTouchPoints = first5Stats.white.noPaintTouch.points + first5Stats.blue.noPaintTouch.points;
        const overallPaintTouchPPP = overallPaintTouchPoss > 0 ? (overallPaintTouchPoints / overallPaintTouchPoss).toFixed(2) : '0.00';
        const overallNoPaintTouchPPP = overallNoPaintTouchPoss > 0 ? (overallNoPaintTouchPoints / overallNoPaintTouchPoss).toFixed(2) : '0.00';
        
        const overallPaintPercentClass = parseFloat(overallPaintTouchPercent) >= 70 ? 'percentage-high' : 
                                        parseFloat(overallPaintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
        const overallNoPaintPercentClass = parseFloat(overallNoPaintTouchPercent) >= 70 ? 'percentage-high' : 
                                          parseFloat(overallNoPaintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
        const overallPaintPPPClass = parseFloat(overallPaintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                    parseFloat(overallPaintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
        const overallNoPaintPPPClass = parseFloat(overallNoPaintTouchPPP) >= 1.5 ? 'percentage-high' : 
                                      parseFloat(overallNoPaintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
        
        html += `
            <tr class="team-row-overall">
                <td><strong>FIRST 5 OVERALL</strong></td>
                <td><span class="highlight-number">${overallTotalPoss}</span></td>
                <td><span class="highlight-number">${overallPaintTouchPoss}</span></td>
                <td><span class="${overallPaintPercentClass}">${overallPaintTouchPercent}%</span></td>
                <td><span class="${overallPaintPPPClass}">${overallPaintTouchPPP}</span></td>
                <td><span class="highlight-number">${overallNoPaintTouchPoss}</span></td>
                <td><span class="${overallNoPaintPercentClass}">${overallNoPaintTouchPercent}%</span></td>
                <td><span class="${overallNoPaintPPPClass}">${overallNoPaintTouchPPP}</span></td>
            </tr>
        `;
        
        first5PercentageTbody.innerHTML = html;
    }
}

function updateFirst5PlayerStatsDisplay() {
    const first5PlayerTbody = document.getElementById('first5-player-stats-tbody');
    if (first5PlayerTbody) {
        let html = '';
        
        Object.keys(first5PlayerStats).forEach(playerNum => {
            const stats = first5PlayerStats[playerNum];
            const pressUpRate = calculateRate(stats.pressUp.positive, stats.pressUp.negative);
            const atLevelRate = calculateRate(stats.atLevel.positive, stats.atLevel.negative);
            const totalActions = stats.pressUp.positive + stats.pressUp.negative + stats.atLevel.positive + stats.atLevel.negative;
            
            html += `
                <tr>
                    <td><strong>#${playerNum} ${playerRoster[playerNum]}</strong></td>
                    <td><span class="highlight-number">${stats.pressUp.positive}</span></td>
                    <td><span class="highlight-number">${stats.pressUp.negative}</span></td>
                    <td><span class="${getRateClass(pressUpRate)}">${pressUpRate}%</span></td>
                    <td><span class="highlight-number">${stats.atLevel.positive}</span></td>
                    <td><span class="highlight-number">${stats.atLevel.negative}</span></td>
                    <td><span class="${getRateClass(atLevelRate)}">${atLevelRate}%</span></td>
                    <td><span class="highlight-number">${totalActions}</span></td>
                </tr>
            `;
        });
        
        first5PlayerTbody.innerHTML = html;
    }
}

function updateFirst5TeamPressStatsDisplay() {
    const tbody = document.getElementById('first5-team-press-stats-tbody');
    if (!tbody) return;
    
    let pressUpPositive = 0, pressUpNegative = 0;
    let atLevelPositive = 0, atLevelNegative = 0;
    
    Object.keys(first5PlayerStats).forEach(playerNum => {
        const stats = first5PlayerStats[playerNum];
        pressUpPositive += stats.pressUp.positive;
        pressUpNegative += stats.pressUp.negative;
        atLevelPositive += stats.atLevel.positive;
        atLevelNegative += stats.atLevel.negative;
    });
    
    const pressUpRate = calculateRate(pressUpPositive, pressUpNegative);
    const atLevelRate = calculateRate(atLevelPositive, atLevelNegative);
    const pressUpTotal = pressUpPositive + pressUpNegative;
    const atLevelTotal = atLevelPositive + atLevelNegative;
    
    const html = `
        <tr class="team-row-overall">
            <td><strong>First 5 Press Up</strong></td>
            <td><span class="highlight-number">${pressUpPositive}</span></td>
            <td><span class="highlight-number">${pressUpNegative}</span></td>
            <td><span class="${getRateClass(pressUpRate)}">${pressUpRate}%</span></td>
            <td><span class="highlight-number">${pressUpTotal}</span></td>
        </tr>
        <tr class="team-row-overall">
            <td><strong>First 5 At Level</strong></td>
            <td><span class="highlight-number">${atLevelPositive}</span></td>
            <td><span class="highlight-number">${atLevelNegative}</span></td>
            <td><span class="${getRateClass(atLevelRate)}">${atLevelRate}%</span></td>
            <td><span class="highlight-number">${atLevelTotal}</span></td>
        </tr>
    `;
    
    tbody.innerHTML = html;
}

// Reset all data (including season data)
function resetAllData() {
    const confirmMessage = 'DANGER: This will permanently delete ALL data including:\n\n' +
                          '• All current practice data\n' +
                          '• All season totals and history\n' +
                          '• All player statistics\n' +
                          '• All action history\n\n' +
                          'This action CANNOT be undone!\n\n' +
                          'Type "DELETE ALL" to confirm:';
    
    const userInput = prompt(confirmMessage);
    
    if (userInput === 'DELETE ALL') {
        // Reset current practice
        teamStats = {
            white: {
                paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
                noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
            },
            blue: {
                paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
                noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
            }
        };
        
        // Reset season totals
        seasonStats = {
            white: {
                paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
                noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
            },
            blue: {
                paintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } },
                noPaintTouch: { possessions: 0, points: 0, scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } }
            }
        };
        
        // Reset player stats
        initializePlayerStats();
        
        // Clear undo backup data
        seasonStatsBackup = null;
        seasonPlayerStatsBackup = null;
        lastSeasonSaveTimestamp = null;
        
        actionHistory = [];
        playerActionHistory = [];
        updateStatsDisplay();
        updateActiveTeamDisplay();
        updatePlayerStatsDisplay();
        updateTeamPressStatsDisplay();
        updateSeasonStatsDisplay();
        updateSeasonTeamPressStatsDisplay();
        updateUndoButtonVisibility();
        clearLocalStorage();
        localStorage.removeItem(SEASON_STORAGE_KEY);
        showStatus('ALL DATA HAS BEEN PERMANENTLY DELETED', 'error');
    } else if (userInput !== null) {
        showStatus('Reset cancelled - you must type "DELETE ALL" exactly', 'error');
    }
}

// Export to CSV
function exportToCSV() {
    let csv = 'CURRENT PRACTICE - TEAM PAINT TOUCH ANALYSIS\n';
    csv += 'Team,Type,Possessions,Total Points,Points Per Possession\n';
    
    ['white', 'blue'].forEach(team => {
        ['paintTouch', 'noPaintTouch'].forEach(category => {
            const stats = teamStats[team][category];
            const categoryName = category === 'paintTouch' ? 'Paint Touch' : 'No Paint Touch';
            const avg = stats.possessions > 0 ? (stats.points / stats.possessions).toFixed(2) : '0.00';
            
            csv += `${team.charAt(0).toUpperCase() + team.slice(1)},${categoryName},${stats.possessions},${stats.points},${avg}\n`;
        });
    });
    
    csv += '\nCURRENT PRACTICE - PAINT TOUCH PERCENTAGE\n';
    csv += 'Team,Total Possessions,Paint Touch Possessions,Paint Touch %,Paint Touch PPP,No Paint Touch Possessions,No Paint Touch %,No Paint Touch PPP\n';
    
    ['white', 'blue'].forEach(team => {
        const paintTouchPoss = teamStats[team].paintTouch.possessions;
        const noPaintTouchPoss = teamStats[team].noPaintTouch.possessions;
        const totalPoss = paintTouchPoss + noPaintTouchPoss;
        
        const paintTouchPercent = totalPoss > 0 ? ((paintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
        const noPaintTouchPercent = totalPoss > 0 ? ((noPaintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
        
        const paintTouchPPP = paintTouchPoss > 0 ? (teamStats[team].paintTouch.points / paintTouchPoss).toFixed(2) : '0.00';
        const noPaintTouchPPP = noPaintTouchPoss > 0 ? (teamStats[team].noPaintTouch.points / noPaintTouchPoss).toFixed(2) : '0.00';
        
        csv += `${team.charAt(0).toUpperCase() + team.slice(1)},${totalPoss},${paintTouchPoss},${paintTouchPercent}%,${paintTouchPPP},${noPaintTouchPoss},${noPaintTouchPercent}%,${noPaintTouchPPP}\n`;
    });
    
    // SEASON TOTALS
    csv += '\n\nSEASON TOTALS - TEAM PAINT TOUCH ANALYSIS\n';
    csv += 'Team,Type,Possessions,Total Points,Points Per Possession\n';
    
    ['white', 'blue'].forEach(team => {
        ['paintTouch', 'noPaintTouch'].forEach(category => {
            const stats = seasonStats[team][category];
            const categoryName = category === 'paintTouch' ? 'Paint Touch' : 'No Paint Touch';
            const avg = stats.possessions > 0 ? (stats.points / stats.possessions).toFixed(2) : '0.00';
            
            csv += `${team.charAt(0).toUpperCase() + team.slice(1)},${categoryName},${stats.possessions},${stats.points},${avg}\n`;
        });
    });
    
    csv += '\nSEASON TOTALS - PAINT TOUCH PERCENTAGE\n';
    csv += 'Team,Total Possessions,Paint Touch Possessions,Paint Touch %,Paint Touch PPP,No Paint Touch Possessions,No Paint Touch %,No Paint Touch PPP\n';
    
    ['white', 'blue'].forEach(team => {
        const paintTouchPoss = seasonStats[team].paintTouch.possessions;
        const noPaintTouchPoss = seasonStats[team].noPaintTouch.possessions;
        const totalPoss = paintTouchPoss + noPaintTouchPoss;
        
        const paintTouchPercent = totalPoss > 0 ? ((paintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
        const noPaintTouchPercent = totalPoss > 0 ? ((noPaintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
        
        const paintTouchPPP = paintTouchPoss > 0 ? (seasonStats[team].paintTouch.points / paintTouchPoss).toFixed(2) : '0.00';
        const noPaintTouchPPP = noPaintTouchPoss > 0 ? (seasonStats[team].noPaintTouch.points / noPaintTouchPoss).toFixed(2) : '0.00';
        
        csv += `${team.charAt(0).toUpperCase() + team.slice(1)},${totalPoss},${paintTouchPoss},${paintTouchPercent}%,${paintTouchPPP},${noPaintTouchPoss},${noPaintTouchPercent}%,${noPaintTouchPPP}\n`;
    });
    
    // PLAYER DATA
    csv += '\nCURRENT PRACTICE - PLAYER ANALYSIS\n';
    csv += 'Player,Press Up +,Press Up -,Press Up %,At Level +,At Level -,At Level %,Total Actions\n';
    
    Object.keys(playerRoster).forEach(playerNum => {
        const stats = playerStats[playerNum];
        const pressUpRate = calculateRate(stats.pressUp.positive, stats.pressUp.negative);
        const atLevelRate = calculateRate(stats.atLevel.positive, stats.atLevel.negative);
        const totalActions = stats.pressUp.positive + stats.pressUp.negative + stats.atLevel.positive + stats.atLevel.negative;
        
        csv += `#${playerNum} ${playerRoster[playerNum]},${stats.pressUp.positive},${stats.pressUp.negative},${pressUpRate}%,${stats.atLevel.positive},${stats.atLevel.negative},${atLevelRate}%,${totalActions}\n`;
    });
    
    csv += '\nSEASON TOTALS - PLAYER ANALYSIS\n';
    csv += 'Player,Press Up +,Press Up -,Press Up %,At Level +,At Level -,At Level %,Total Actions\n';
    
    Object.keys(playerRoster).forEach(playerNum => {
        const stats = seasonPlayerStats[playerNum];
        const pressUpRate = calculateRate(stats.pressUp.positive, stats.pressUp.negative);
        const atLevelRate = calculateRate(stats.atLevel.positive, stats.atLevel.negative);
        const totalActions = stats.pressUp.positive + stats.pressUp.negative + stats.atLevel.positive + stats.atLevel.negative;
        
        csv += `#${playerNum} ${playerRoster[playerNum]},${stats.pressUp.positive},${stats.pressUp.negative},${pressUpRate}%,${stats.atLevel.positive},${stats.atLevel.negative},${atLevelRate}%,${totalActions}\n`;
    });
    
    // GAMES TOTALS
    csv += '\n\nGAMES TOTALS - TEAM PAINT TOUCH ANALYSIS\n';
    csv += 'Team,Type,Possessions,Total Points,Points Per Possession\n';
    
    ['white', 'blue'].forEach(team => {
        ['paintTouch', 'noPaintTouch'].forEach(category => {
            const stats = gamesStats[team][category];
            const categoryName = category === 'paintTouch' ? 'Paint Touch' : 'No Paint Touch';
            const avg = stats.possessions > 0 ? (stats.points / stats.possessions).toFixed(2) : '0.00';
            
            csv += `${team.charAt(0).toUpperCase() + team.slice(1)},${categoryName},${stats.possessions},${stats.points},${avg}\n`;
        });
    });
    
    csv += '\nGAMES TOTALS - PAINT TOUCH PERCENTAGE\n';
    csv += 'Team,Total Possessions,Paint Touch Possessions,Paint Touch %,Paint Touch PPP,No Paint Touch Possessions,No Paint Touch %,No Paint Touch PPP\n';
    
    ['white', 'blue'].forEach(team => {
        const paintTouchPoss = gamesStats[team].paintTouch.possessions;
        const noPaintTouchPoss = gamesStats[team].noPaintTouch.possessions;
        const totalPoss = paintTouchPoss + noPaintTouchPoss;
        
        const paintTouchPercent = totalPoss > 0 ? ((paintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
        const noPaintTouchPercent = totalPoss > 0 ? ((noPaintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
        
        const paintTouchPPP = paintTouchPoss > 0 ? (gamesStats[team].paintTouch.points / paintTouchPoss).toFixed(2) : '0.00';
        const noPaintTouchPPP = noPaintTouchPoss > 0 ? (gamesStats[team].noPaintTouch.points / noPaintTouchPoss).toFixed(2) : '0.00';
        
        csv += `${team.charAt(0).toUpperCase() + team.slice(1)},${totalPoss},${paintTouchPoss},${paintTouchPercent}%,${paintTouchPPP},${noPaintTouchPoss},${noPaintTouchPercent}%,${noPaintTouchPPP}\n`;
    });
    
    csv += '\nGAMES TOTALS - PLAYER ANALYSIS\n';
    csv += 'Player,Press Up +,Press Up -,Press Up %,At Level +,At Level -,At Level %,Total Actions\n';
    
    Object.keys(playerRoster).forEach(playerNum => {
        const stats = gamesPlayerStats[playerNum];
        const pressUpRate = calculateRate(stats.pressUp.positive, stats.pressUp.negative);
        const atLevelRate = calculateRate(stats.atLevel.positive, stats.atLevel.negative);
        const totalActions = stats.pressUp.positive + stats.pressUp.negative + stats.atLevel.positive + stats.atLevel.negative;
        
        csv += `#${playerNum} ${playerRoster[playerNum]},${stats.pressUp.positive},${stats.pressUp.negative},${pressUpRate}%,${stats.atLevel.positive},${stats.atLevel.negative},${atLevelRate}%,${totalActions}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `basketball-analytics-complete-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showStatus('Complete CSV file (practice + season) downloaded!');
}

// Copy Player Excel data
function copyPlayerExcelData() {
    let data = 'CURRENT PRACTICE - PLAYER PRESS UP / AT LEVEL ANALYSIS\t\t\t\t\t\t\t\n';
    data += 'Player\tPress Up +\tPress Up -\tPress Up %\tAt Level +\tAt Level -\tAt Level %\tTotal Actions\n';
    
    Object.keys(playerRoster).forEach(playerNum => {
        const stats = playerStats[playerNum];
        const pressUpRate = calculateRate(stats.pressUp.positive, stats.pressUp.negative);
        const atLevelRate = calculateRate(stats.atLevel.positive, stats.atLevel.negative);
        const totalActions = stats.pressUp.positive + stats.pressUp.negative + stats.atLevel.positive + stats.atLevel.negative;
        
        data += `#${playerNum} ${playerRoster[playerNum]}\t${stats.pressUp.positive}\t${stats.pressUp.negative}\t${pressUpRate}%\t${stats.atLevel.positive}\t${stats.atLevel.negative}\t${atLevelRate}%\t${totalActions}\n`;
    });
    
    data += '\nCURRENT PRACTICE - TEAM PRESS/LEVEL SUMMARY\t\t\t\t\n';
    data += 'Category\tTotal Positive\tTotal Negative\tSuccess Rate\tTotal Actions\n';
    
    // Calculate team totals
    let pressUpPositive = 0, pressUpNegative = 0;
    let atLevelPositive = 0, atLevelNegative = 0;
    
    Object.keys(playerStats).forEach(playerNum => {
        const stats = playerStats[playerNum];
        pressUpPositive += stats.pressUp.positive;
        pressUpNegative += stats.pressUp.negative;
        atLevelPositive += stats.atLevel.positive;
        atLevelNegative += stats.atLevel.negative;
    });
    
    const pressUpRate = calculateRate(pressUpPositive, pressUpNegative);
    const atLevelRate = calculateRate(atLevelPositive, atLevelNegative);
    const pressUpTotal = pressUpPositive + pressUpNegative;
    const atLevelTotal = atLevelPositive + atLevelNegative;
    
    data += `Press Up\t${pressUpPositive}\t${pressUpNegative}\t${pressUpRate}%\t${pressUpTotal}\n`;
    data += `At Level\t${atLevelPositive}\t${atLevelNegative}\t${atLevelRate}%\t${atLevelTotal}\n`;
    
    // Add season data if available
    if (Object.keys(seasonPlayerStats).length > 0) {
        data += '\nSEASON TOTALS - PLAYER PRESS UP / AT LEVEL ANALYSIS\t\t\t\t\t\t\t\n';
        data += 'Player\tPress Up +\tPress Up -\tPress Up %\tAt Level +\tAt Level -\tAt Level %\tTotal Actions\n';
        
        Object.keys(playerRoster).forEach(playerNum => {
            const stats = seasonPlayerStats[playerNum];
            const pressUpRate = calculateRate(stats.pressUp.positive, stats.pressUp.negative);
            const atLevelRate = calculateRate(stats.atLevel.positive, stats.atLevel.negative);
            const totalActions = stats.pressUp.positive + stats.pressUp.negative + stats.atLevel.positive + stats.atLevel.negative;
            
            data += `#${playerNum} ${playerRoster[playerNum]}\t${stats.pressUp.positive}\t${stats.pressUp.negative}\t${pressUpRate}%\t${stats.atLevel.positive}\t${stats.atLevel.negative}\t${atLevelRate}%\t${totalActions}\n`;
        });
        
        data += '\nSEASON TOTALS - TEAM PRESS/LEVEL SUMMARY\t\t\t\t\n';
        data += 'Category\tTotal Positive\tTotal Negative\tSuccess Rate\tTotal Actions\n';
        
        // Calculate season team totals
        let seasonPressUpPositive = 0, seasonPressUpNegative = 0;
        let seasonAtLevelPositive = 0, seasonAtLevelNegative = 0;
        
        Object.keys(seasonPlayerStats).forEach(playerNum => {
            const stats = seasonPlayerStats[playerNum];
            seasonPressUpPositive += stats.pressUp.positive;
            seasonPressUpNegative += stats.pressUp.negative;
            seasonAtLevelPositive += stats.atLevel.positive;
            seasonAtLevelNegative += stats.atLevel.negative;
        });
        
        const seasonPressUpRate = calculateRate(seasonPressUpPositive, seasonPressUpNegative);
        const seasonAtLevelRate = calculateRate(seasonAtLevelPositive, seasonAtLevelNegative);
        const seasonPressUpTotal = seasonPressUpPositive + seasonPressUpNegative;
        const seasonAtLevelTotal = seasonAtLevelPositive + seasonAtLevelNegative;
        
        data += `Season Press Up\t${seasonPressUpPositive}\t${seasonPressUpNegative}\t${seasonPressUpRate}%\t${seasonPressUpTotal}\n`;
        data += `Season At Level\t${seasonAtLevelPositive}\t${seasonAtLevelNegative}\t${seasonAtLevelRate}%\t${seasonAtLevelTotal}\n`;
    }
    
    // GAMES TOTALS
    data += '\n\nGAMES TOTALS - PLAYER PRESS UP / AT LEVEL ANALYSIS\t\t\t\t\t\t\t\n';
    data += 'Player\tPress Up +\tPress Up -\tPress Up %\tAt Level +\tAt Level -\tAt Level %\tTotal Actions\n';
    
    Object.keys(playerRoster).forEach(playerNum => {
        const stats = gamesPlayerStats[playerNum];
        const pressUpRate = calculateRate(stats.pressUp.positive, stats.pressUp.negative);
        const atLevelRate = calculateRate(stats.atLevel.positive, stats.atLevel.negative);
        const totalActions = stats.pressUp.positive + stats.pressUp.negative + stats.atLevel.positive + stats.atLevel.negative;
        
        data += `#${playerNum} ${playerRoster[playerNum]}\t${stats.pressUp.positive}\t${stats.pressUp.negative}\t${pressUpRate}%\t${stats.atLevel.positive}\t${stats.atLevel.negative}\t${atLevelRate}%\t${totalActions}\n`;
    });
    
    // Games team totals
    if (Object.keys(gamesPlayerStats).length > 0) {
        data += '\nGAMES TEAM TOTALS\t\t\t\t\t\n';
        data += 'Category\tTotal Positive\tTotal Negative\tSuccess Rate\tTotal Actions\n';
        
        let gamesPressUpPositive = 0, gamesPressUpNegative = 0;
        let gamesAtLevelPositive = 0, gamesAtLevelNegative = 0;
        
        Object.keys(gamesPlayerStats).forEach(playerNum => {
            const stats = gamesPlayerStats[playerNum];
            gamesPressUpPositive += stats.pressUp.positive;
            gamesPressUpNegative += stats.pressUp.negative;
            gamesAtLevelPositive += stats.atLevel.positive;
            gamesAtLevelNegative += stats.atLevel.negative;
        });
        
        const gamesPressUpRate = calculateRate(gamesPressUpPositive, gamesPressUpNegative);
        const gamesAtLevelRate = calculateRate(gamesAtLevelPositive, gamesAtLevelNegative);
        const gamesPressUpTotal = gamesPressUpPositive + gamesPressUpNegative;
        const gamesAtLevelTotal = gamesAtLevelPositive + gamesAtLevelNegative;
        
        data += `Games Press Up\t${gamesPressUpPositive}\t${gamesPressUpNegative}\t${gamesPressUpRate}%\t${gamesPressUpTotal}\n`;
        data += `Games At Level\t${gamesAtLevelPositive}\t${gamesAtLevelNegative}\t${gamesAtLevelRate}%\t${gamesAtLevelTotal}\n`;
    }
    
    navigator.clipboard.writeText(data).then(() => {
        showStatus('Player Excel data copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy to clipboard:', err);
        showStatus('Failed to copy to clipboard', 'error');
    });
}

// Copy Excel data
function copyExcelData() {
    let data = 'TEAM PAINT TOUCH ANALYSIS\t\t\t\t\n';
    data += 'Team\tType\tPossessions\tTotal Points\tPoints Per Possession\n';
    
    ['white', 'blue'].forEach(team => {
        ['paintTouch', 'noPaintTouch'].forEach(category => {
            const stats = teamStats[team][category];
            const categoryName = category === 'paintTouch' ? 'Paint Touch' : 'No Paint Touch';
            const avg = stats.possessions > 0 ? (stats.points / stats.possessions).toFixed(2) : '0.00';
            
            data += `${team.charAt(0).toUpperCase() + team.slice(1)}\t${categoryName}\t${stats.possessions}\t${stats.points}\t${avg}\n`;
        });
    });
    
    data += '\nPAINT TOUCH PERCENTAGE\t\t\t\t\t\t\t\t\n';
    data += 'Team\tTotal Possessions\tPaint Touch Possessions\tPaint Touch %\tPaint Touch PPP\tNo Paint Touch Possessions\tNo Paint Touch %\tNo Paint Touch PPP\n';
    
    ['white', 'blue'].forEach(team => {
        const paintTouchPoss = teamStats[team].paintTouch.possessions;
        const noPaintTouchPoss = teamStats[team].noPaintTouch.possessions;
        const totalPoss = paintTouchPoss + noPaintTouchPoss;
        
        const paintTouchPercent = totalPoss > 0 ? ((paintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
        const noPaintTouchPercent = totalPoss > 0 ? ((noPaintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
        
        const paintTouchPPP = paintTouchPoss > 0 ? (teamStats[team].paintTouch.points / paintTouchPoss).toFixed(2) : '0.00';
        const noPaintTouchPPP = noPaintTouchPoss > 0 ? (teamStats[team].noPaintTouch.points / noPaintTouchPoss).toFixed(2) : '0.00';
        
        data += `${team.charAt(0).toUpperCase() + team.slice(1)}\t${totalPoss}\t${paintTouchPoss}\t${paintTouchPercent}%\t${paintTouchPPP}\t${noPaintTouchPoss}\t${noPaintTouchPercent}%\t${noPaintTouchPPP}\n`;
    });
    
    // Add overall row to Excel data
    const overallPaintTouchPoss = teamStats.white.paintTouch.possessions + teamStats.blue.paintTouch.possessions;
    const overallNoPaintTouchPoss = teamStats.white.noPaintTouch.possessions + teamStats.blue.noPaintTouch.possessions;
    const overallTotalPoss = overallPaintTouchPoss + overallNoPaintTouchPoss;
    
    const overallPaintTouchPercent = overallTotalPoss > 0 ? ((overallPaintTouchPoss / overallTotalPoss) * 100).toFixed(1) : '0.0';
    const overallNoPaintTouchPercent = overallTotalPoss > 0 ? ((overallNoPaintTouchPoss / overallTotalPoss) * 100).toFixed(1) : '0.0';
    
    const overallPaintTouchPoints = teamStats.white.paintTouch.points + teamStats.blue.paintTouch.points;
    const overallNoPaintTouchPoints = teamStats.white.noPaintTouch.points + teamStats.blue.noPaintTouch.points;
    const overallPaintTouchPPP = overallPaintTouchPoss > 0 ? (overallPaintTouchPoints / overallPaintTouchPoss).toFixed(2) : '0.00';
    const overallNoPaintTouchPPP = overallNoPaintTouchPoss > 0 ? (overallNoPaintTouchPoints / overallNoPaintTouchPoss).toFixed(2) : '0.00';
    
    data += `OVERALL\t${overallTotalPoss}\t${overallPaintTouchPoss}\t${overallPaintTouchPercent}%\t${overallPaintTouchPPP}\t${overallNoPaintTouchPoss}\t${overallNoPaintTouchPercent}%\t${overallNoPaintTouchPPP}\n`;
    
    data += '\nSCORING BREAKDOWN\t\t\t\t\t\t\t\n';
    data += 'Team\tType\t0 Points\t1 Point\t2 Points\t3 Points\t4 Points\tTotal Possessions\n';
    
    ['white', 'blue'].forEach(team => {
        ['paintTouch', 'noPaintTouch'].forEach(category => {
            const stats = teamStats[team][category];
            const categoryName = category === 'paintTouch' ? 'Paint Touch' : 'No Paint Touch';
            
            data += `${team.charAt(0).toUpperCase() + team.slice(1)}\t${categoryName}\t${stats.scores[0]}\t${stats.scores[1]}\t${stats.scores[2]}\t${stats.scores[3]}\t${stats.scores[4]}\t${stats.possessions}\n`;
        });
    });
    
    navigator.clipboard.writeText(data).then(() => {
        showStatus('Excel data copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy to clipboard:', err);
        showStatus('Failed to copy to clipboard', 'error');
    });
}

// Quarter Report Functions
function createCurrentSnapshot() {
    return {
        teamStats: JSON.parse(JSON.stringify(teamStats)),
        playerStats: JSON.parse(JSON.stringify(playerStats)),
        timestamp: new Date().toLocaleTimeString()
    };
}

function calculateQuarterStats(currentSnapshot, lastSnapshot) {
    if (!lastSnapshot) {
        return {
            teamStats: currentSnapshot.teamStats,
            playerStats: currentSnapshot.playerStats,
            isFirstQuarter: true
        };
    }

    const quarterTeamStats = {
        white: {
            paintTouch: {
                possessions: currentSnapshot.teamStats.white.paintTouch.possessions - lastSnapshot.teamStats.white.paintTouch.possessions,
                points: currentSnapshot.teamStats.white.paintTouch.points - lastSnapshot.teamStats.white.paintTouch.points,
                scores: {}
            },
            noPaintTouch: {
                possessions: currentSnapshot.teamStats.white.noPaintTouch.possessions - lastSnapshot.teamStats.white.noPaintTouch.possessions,
                points: currentSnapshot.teamStats.white.noPaintTouch.points - lastSnapshot.teamStats.white.noPaintTouch.points,
                scores: {}
            }
        },
        blue: {
            paintTouch: {
                possessions: currentSnapshot.teamStats.blue.paintTouch.possessions - lastSnapshot.teamStats.blue.paintTouch.possessions,
                points: currentSnapshot.teamStats.blue.paintTouch.points - lastSnapshot.teamStats.blue.paintTouch.points,
                scores: {}
            },
            noPaintTouch: {
                possessions: currentSnapshot.teamStats.blue.noPaintTouch.possessions - lastSnapshot.teamStats.blue.noPaintTouch.possessions,
                points: currentSnapshot.teamStats.blue.noPaintTouch.points - lastSnapshot.teamStats.blue.noPaintTouch.points,
                scores: {}
            }
        }
    };

    // Calculate score differentials
    ['white', 'blue'].forEach(team => {
        ['paintTouch', 'noPaintTouch'].forEach(mode => {
            Object.keys(currentSnapshot.teamStats[team][mode].scores).forEach(points => {
                quarterTeamStats[team][mode].scores[points] = 
                    currentSnapshot.teamStats[team][mode].scores[points] - 
                    lastSnapshot.teamStats[team][mode].scores[points];
            });
        });
    });

    return {
        teamStats: quarterTeamStats,
        isFirstQuarter: false
    };
}

function showQuarterReport() {
    const currentSnapshot = createCurrentSnapshot();
    const quarterStats = calculateQuarterStats(currentSnapshot, lastQuarterSnapshot);
    
    let reportMessage = quarterStats.isFirstQuarter ? 
        `🏀 Quarter ${quarterNumber} Report (Practice Start to Now)\n` :
        `🏀 Quarter ${quarterNumber} Report (Since Last Report)\n`;
    
    reportMessage += `Time: ${currentSnapshot.timestamp}\n\n`;

    // Paint Touch Analysis for both teams
    ['white', 'blue'].forEach(team => {
        const teamName = team.charAt(0).toUpperCase() + team.slice(1);
        const paintStats = quarterStats.teamStats[team].paintTouch;
        const noPaintStats = quarterStats.teamStats[team].noPaintTouch;
        const totalPoss = paintStats.possessions + noPaintStats.possessions;
        const totalPoints = paintStats.points + noPaintStats.points;

        reportMessage += `${teamName} Team:\n`;
        
        if (totalPoss > 0) {
            const paintPercent = ((paintStats.possessions / totalPoss) * 100).toFixed(1);
            const paintPPP = paintStats.possessions > 0 ? (paintStats.points / paintStats.possessions).toFixed(2) : '0.00';
            const noPaintPPP = noPaintStats.possessions > 0 ? (noPaintStats.points / noPaintStats.possessions).toFixed(2) : '0.00';
            const overallPPP = (totalPoints / totalPoss).toFixed(2);

            reportMessage += `  Total Possessions: ${totalPoss}\n`;
            reportMessage += `  Paint Touch: ${paintStats.possessions} (${paintPercent}%) - ${paintPPP} PPP\n`;
            reportMessage += `  No Paint Touch: ${noPaintStats.possessions} (${(100 - parseFloat(paintPercent)).toFixed(1)}%) - ${noPaintPPP} PPP\n`;
            reportMessage += `  Overall PPP: ${overallPPP}\n`;
        } else {
            reportMessage += `  No possessions recorded\n`;
        }
        reportMessage += '\n';
    });

    // Show the report
    alert(reportMessage);
    
    // Update the snapshot for next quarter
    lastQuarterSnapshot = currentSnapshot;
    quarterNumber++;
    
    showStatus(`Quarter ${quarterNumber - 1} report generated`);
}

function showHalfReport() {
    const currentSnapshot = createCurrentSnapshot();
    const halfStats = calculateQuarterStats(currentSnapshot, lastHalfSnapshot);
    
    let reportMessage = halfStats.isFirstQuarter ? 
        `🏀 Half ${halfNumber} Report (Practice Start to Now)\n` :
        `🏀 Half ${halfNumber} Report (Since Last Half Report)\n`;
    
    reportMessage += `Time: ${currentSnapshot.timestamp}\n\n`;

    // Paint Touch Analysis for both teams
    ['white', 'blue'].forEach(team => {
        const teamName = team.charAt(0).toUpperCase() + team.slice(1);
        const paintStats = halfStats.teamStats[team].paintTouch;
        const noPaintStats = halfStats.teamStats[team].noPaintTouch;
        const totalPoss = paintStats.possessions + noPaintStats.possessions;
        const totalPoints = paintStats.points + noPaintStats.points;

        reportMessage += `${teamName} Team:\n`;
        
        if (totalPoss > 0) {
            const paintPercent = ((paintStats.possessions / totalPoss) * 100).toFixed(1);
            const paintPPP = paintStats.possessions > 0 ? (paintStats.points / paintStats.possessions).toFixed(2) : '0.00';
            const noPaintPPP = noPaintStats.possessions > 0 ? (noPaintStats.points / noPaintStats.possessions).toFixed(2) : '0.00';
            const overallPPP = (totalPoints / totalPoss).toFixed(2);

            reportMessage += `  Total Possessions: ${totalPoss}\n`;
            reportMessage += `  Paint Touch: ${paintStats.possessions} (${paintPercent}%) - ${paintPPP} PPP\n`;
            reportMessage += `  No Paint Touch: ${noPaintStats.possessions} (${(100 - parseFloat(paintPercent)).toFixed(1)}%) - ${noPaintPPP} PPP\n`;
            reportMessage += `  Overall PPP: ${overallPPP}\n`;
        } else {
            reportMessage += `  No possessions recorded\n`;
        }
        reportMessage += '\n';
    });

    // Show the report
    alert(reportMessage);
    
    // Update the snapshot for next half
    lastHalfSnapshot = currentSnapshot;
    halfNumber++;
    
    showStatus(`Half ${halfNumber - 1} report generated`);
}

// Google Sheets Auto-Sync Functions
let googleScriptUrl = localStorage.getItem('google-script-url') || '';
let autoSyncEnabled = false;
let actualScrimmageStats = null; // Always stores the real running totals
let actualScrimmagePlayerStats = null; // Always stores the real player totals
let isViewingSnapshot = false; // Flag to track if currently viewing a snapshot
let actualRegularSeasonStats = null; // Always stores the real Regular Season running totals
let actualRegularSeasonPlayerStats = null; // Always stores the real Regular Season player totals
let isViewingRegularSeasonSnapshot = false; // Flag to track if viewing Regular Season snapshot

// Manual JSON import function
function loadJSONData(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        
        if (data.scrimmageStats) {
            scrimmageStats = data.scrimmageStats;
            scrimmagePlayerStats = data.scrimmagePlayerStats || {};
            
            console.log('Loaded scrimmagePlayerStats:', scrimmagePlayerStats);
            
            // Save to localStorage
            saveScrimmageToLocalStorage();
            
            // Update displays
            updateScrimmageStatsDisplay();
            updateScrimmagePlayerStatsDisplay();
            updateScrimmageTeamPressStatsDisplay();
            
            console.log('Team press stats display updated');
            
            showStatus('Data loaded successfully!');
            alert('Game data has been restored from JSON!');
        } else {
            showStatus('Invalid JSON format', 'error');
        }
    } catch (error) {
        console.error('Error loading JSON:', error);
        showStatus('Failed to load JSON: ' + error.message, 'error');
    }
}

function loadRegularSeasonJSONData(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        
        if (data.regularSeasonStats) {
            regularSeasonStats = data.regularSeasonStats;
            regularSeasonPlayerStats = data.regularSeasonPlayerStats || {};
            
            console.log('Loaded regularSeasonPlayerStats:', regularSeasonPlayerStats);
            
            // Save to localStorage
            saveRegularSeasonToLocalStorage();
            
            // Update displays
            updateRegularSeasonStatsDisplay();
            updateRegularSeasonTeamPressStatsDisplay();
            
            console.log('Regular Season data loaded');
            
            showStatus('Regular Season data loaded successfully!');
            alert('Regular Season data has been restored from JSON!');
        } else {
            showStatus('Invalid JSON format - must contain regularSeasonStats', 'error');
        }
    } catch (error) {
        console.error('Error loading Regular Season JSON:', error);
        showStatus('Failed to load JSON: ' + error.message, 'error');
    }
}

async function saveToGoogleSheets() {
    if (!googleScriptUrl) return;
    
    try {
        const data = {
            scrimmageStats: scrimmageStats,
            scrimmagePlayerStats: scrimmagePlayerStats,
            regularSeasonStats: regularSeasonStats,
            regularSeasonPlayerStats: regularSeasonPlayerStats,
            timestamp: new Date().toISOString()
        };
        
        console.log('Sending to Google Sheets:', {
            hasScrimmage: !!data.scrimmageStats,
            hasRegularSeason: !!data.regularSeasonStats,
            regularSeasonData: data.regularSeasonStats,
            regularSeasonPlayerData: data.regularSeasonPlayerStats,
            regularSeasonPlayerDataKeys: Object.keys(data.regularSeasonPlayerStats)
        });
        
        const response = await fetch(googleScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        console.log('Data synced to Google Sheets (Tipoff Tourney + Regular Season)');
        return true;
    } catch (error) {
        console.error('Error syncing to Google Sheets:', error);
        return false;
    }
}

async function loadFromGoogleSheets() {
    if (!googleScriptUrl) return;
    
    try {
        const response = await fetch(googleScriptUrl + '?action=load');
        const data = await response.json();
        
        if (data.scrimmageStats) {
            scrimmageStats = data.scrimmageStats;
            scrimmagePlayerStats = data.scrimmagePlayerStats || {};
            
            updateScrimmageStatsDisplay();
            updateScrimmageTeamPressStatsDisplay();
            localStorage.setItem(SCRIMMAGE_STORAGE_KEY, JSON.stringify({
                stats: scrimmageStats,
                playerStats: scrimmagePlayerStats
            }));
            
            console.log('Tipoff Tourney data loaded from Google Sheets');
        }
        
        if (data.regularSeasonStats) {
            regularSeasonStats = data.regularSeasonStats;
            regularSeasonPlayerStats = data.regularSeasonPlayerStats || {};
            
            updateRegularSeasonStatsDisplay();
            updateRegularSeasonTeamPressStatsDisplay();
            localStorage.setItem(REGULAR_SEASON_STORAGE_KEY, JSON.stringify({
                stats: regularSeasonStats,
                playerStats: regularSeasonPlayerStats
            }));
            
            console.log('Regular Season data loaded from Google Sheets');
        }
        
        showStatus('Data loaded from Google Sheets (Tipoff Tourney + Regular Season)!');
    } catch (error) {
        console.error('Error loading from Google Sheets:', error);
        showStatus('Failed to load from Google Sheets', 'error');
    }
}

function saveScriptUrl() {
    const input = document.getElementById('google-script-url');
    const url = input.value.trim();
    
    if (url) {
        googleScriptUrl = url;
        localStorage.setItem('google-script-url', url);
        autoSyncEnabled = true;
        
        document.getElementById('sync-now-btn').style.display = 'inline-block';
        
        // Also update Regular Season input
        const regularSeasonInput = document.getElementById('regular-season-script-url');
        if (regularSeasonInput) {
            regularSeasonInput.value = url;
            document.getElementById('sync-regular-season-now-btn').style.display = 'inline-block';
        }
        
        showStatus('Google Sheets connected! Both tabs will auto-sync.');
        
        // Initial sync
        saveToGoogleSheets();
    } else {
        showStatus('Please enter a valid Google Apps Script URL', 'error');
    }
}

function saveRegularSeasonScriptUrl() {
    const input = document.getElementById('regular-season-script-url');
    const url = input.value.trim();
    
    if (url) {
        googleScriptUrl = url;
        localStorage.setItem('google-script-url', url);
        autoSyncEnabled = true;
        
        document.getElementById('sync-regular-season-now-btn').style.display = 'inline-block';
        
        // Also update Tipoff Tourney input
        const tipoffInput = document.getElementById('google-script-url');
        if (tipoffInput) {
            tipoffInput.value = url;
            document.getElementById('sync-now-btn').style.display = 'inline-block';
        }
        
        showStatus('Google Sheets connected! Both tabs will auto-sync.');
        
        // Initial sync
        saveToGoogleSheets();
    } else {
        showStatus('Please enter a valid Google Apps Script URL', 'error');
    }
}

function showSetupInstructions(e) {
    e.preventDefault();
    
    const instructions = 'GOOGLE SHEETS AUTO-SYNC SETUP (2 minutes)\n\n' +
        '1. Create a new Google Sheet\n' +
        '   - Go to sheets.google.com\n' +
        '   - Create a new blank spreadsheet\n' +
        '   - Name it "Basketball Analytics Data"\n\n' +
        '2. Open Apps Script Editor\n' +
        '   - In your sheet, click: Extensions → Apps Script\n' +
        '   - Delete any default code\n\n' +
        '3. Paste this code:\n\n' +
        'function doPost(e) {\n' +
        '  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");\n' +
        '  if (!sheet) sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Data");\n' +
        '  var data = JSON.parse(e.postData.contents);\n' +
        '  sheet.clear();\n' +
        '  sheet.appendRow(["Last Updated", new Date()]);\n' +
        '  sheet.appendRow(["Data", JSON.stringify(data)]);\n' +
        '  return ContentService.createTextOutput("Success");\n' +
        '}\n\n' +
        'function doGet(e) {\n' +
        '  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");\n' +
        '  if (!sheet) return ContentService.createTextOutput(JSON.stringify({}));\n' +
        '  var data = sheet.getRange(2, 2).getValue();\n' +
        '  return ContentService.createTextOutput(data);\n' +
        '}\n\n' +
        '4. Deploy the script\n' +
        '   - Click: Deploy → New deployment\n' +
        '   - Click the gear icon → Select "Web app"\n' +
        '   - Execute as: "Me"\n' +
        '   - Who has access: "Anyone"\n' +
        '   - Click "Deploy"\n' +
        '   - Copy the Web app URL\n\n' +
        '5. Paste the URL here and click "Connect to Google Sheets"\n\n' +
        'Done! Your game data will now auto-save to Google Sheets.';
    
    alert(instructions);
}

// Snapshot Management Functions
function createSnapshot() {
    const now = new Date();
    const defaultName = 'Game Data - ' + now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const snapshotName = prompt('Enter a name for this snapshot (optional):', defaultName);
    
    if (snapshotName === null) return; // User cancelled
    
    const snapshot = {
        id: Date.now(),
        name: snapshotName || ('Snapshot ' + now.toLocaleDateString()),
        timestamp: now.toISOString(),
        data: {
            scrimmageStats: JSON.parse(JSON.stringify(scrimmageStats)),
            scrimmagePlayerStats: JSON.parse(JSON.stringify(scrimmagePlayerStats))
        }
    };
    
    // Get existing snapshots
    const snapshots = getAllSnapshots();
    snapshots.push(snapshot);
    
    // Save to localStorage
    localStorage.setItem(SNAPSHOTS_STORAGE_KEY, JSON.stringify(snapshots));
    
    showStatus('Snapshot "' + snapshot.name + '" created successfully!');
}

function getAllSnapshots() {
    const stored = localStorage.getItem(SNAPSHOTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function loadSnapshot(snapshotId) {
    const snapshots = getAllSnapshots();
    const snapshot = snapshots.find(s => s.id === parseInt(snapshotId));
    
    if (!snapshot) {
        showStatus('Snapshot not found', 'error');
        return;
    }
    
    // Confirm before loading
    const confirmMsg = 'Load snapshot "' + snapshot.name + '"?\n\n' +
        'This will show historical data in the Game Totals tab.\n\n' +
        'Your actual running totals are preserved and new data will always accumulate to them.';
    if (!confirm(confirmMsg)) {
        return;
    }
    
    // Save actual running totals if not already saved
    if (!isViewingSnapshot) {
        actualScrimmageStats = JSON.parse(JSON.stringify(scrimmageStats));
        actualScrimmagePlayerStats = JSON.parse(JSON.stringify(scrimmagePlayerStats));
    }
    
    // Load the snapshot data for DISPLAY ONLY
    scrimmageStats = JSON.parse(JSON.stringify(snapshot.data.scrimmageStats));
    scrimmagePlayerStats = JSON.parse(JSON.stringify(snapshot.data.scrimmagePlayerStats));
    
    // Mark that we're viewing a snapshot
    isViewingSnapshot = true;
    
    // Update displays (but don't save to localStorage)
    updateScrimmageStatsDisplay();
    updateScrimmageTeamPressStatsDisplay();
    
    showStatus('Viewing snapshot "' + snapshot.name + '" (running totals preserved)');
    
    // Show back to season total button
    const backBtn = document.getElementById('back-to-previous-btn');
    console.log('Looking for back button:', backBtn);
    if (backBtn) {
        backBtn.style.display = '';  // Remove inline display to use default
        backBtn.style.flex = '1';    // Ensure it takes flex space
        console.log('Back button shown, current display:', backBtn.style.display);
    } else {
        console.error('Back button not found!');
    }
    
    // Refresh snapshot selector
    populateSnapshotSelector();
}

function deleteSnapshot(snapshotId) {
    const snapshots = getAllSnapshots();
    const snapshot = snapshots.find(s => s.id === parseInt(snapshotId));
    
    if (!snapshot) {
        showStatus('Snapshot not found', 'error');
        return;
    }
    
    const confirmMsg = 'Delete snapshot "' + snapshot.name + '"?\n\nThis action cannot be undone.';
    if (!confirm(confirmMsg)) {
        return;
    }
    
    const filtered = snapshots.filter(s => s.id !== parseInt(snapshotId));
    localStorage.setItem(SNAPSHOTS_STORAGE_KEY, JSON.stringify(filtered));
    
    showStatus('Deleted snapshot "' + snapshot.name + '"');
    populateSnapshotSelector();
}

function renameSnapshot(snapshotId) {
    const snapshots = getAllSnapshots();
    const snapshot = snapshots.find(s => s.id === parseInt(snapshotId));
    
    if (!snapshot) {
        showStatus('Snapshot not found', 'error');
        return;
    }
    
    const newName = prompt('Enter new name for snapshot:', snapshot.name);
    
    if (newName === null || newName.trim() === '') {
        return; // User cancelled or entered empty name
    }
    
    // Update the snapshot name
    snapshot.name = newName.trim();
    localStorage.setItem(SNAPSHOTS_STORAGE_KEY, JSON.stringify(snapshots));
    
    showStatus('Renamed snapshot to "' + newName + '"');
    populateSnapshotSelector();
}

function populateSnapshotSelector() {
    const selector = document.getElementById('snapshot-selector');
    if (!selector) return;
    
    const snapshots = getAllSnapshots();
    
    // Sort by timestamp (newest first)
    snapshots.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    selector.innerHTML = '<option value="">-- Select a snapshot --</option>';
    
    snapshots.forEach(snapshot => {
        const date = new Date(snapshot.timestamp);
        const option = document.createElement('option');
        option.value = snapshot.id;
        const timeStr = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        option.textContent = snapshot.name + ' (' + date.toLocaleDateString() + ' ' + timeStr + ')';
        selector.appendChild(option);
    });
    
    if (snapshots.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No snapshots created yet';
        option.disabled = true;
        selector.appendChild(option);
    }
}

function toggleSnapshotViewer() {
    const viewer = document.getElementById('snapshot-viewer');
    if (viewer.style.display === 'none') {
        viewer.style.display = 'block';
        populateSnapshotSelector();
    } else {
        viewer.style.display = 'none';
    }
}

function populateComparisonSelectors() {
    const startSelector = document.getElementById('comparison-start-snapshot');
    const endSelector = document.getElementById('comparison-end-snapshot');
    
    if (!startSelector || !endSelector) return;
    
    // Get both Tipoff Tourney and Regular Season snapshots
    const tipoffSnapshots = getAllSnapshots();
    const regularSeasonSnapshots = getAllRegularSeasonSnapshots();
    
    // Combine and sort by timestamp (oldest to newest)
    const allSnapshots = [
        ...tipoffSnapshots.map(s => ({...s, source: 'Tipoff Tourney'})),
        ...regularSeasonSnapshots.map(s => ({...s, source: 'Regular Season'}))
    ];
    allSnapshots.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    startSelector.innerHTML = '<option value="">-- Select start snapshot --</option>';
    endSelector.innerHTML = '<option value="">-- Select end snapshot --</option>';
    
    allSnapshots.forEach(snapshot => {
        const date = new Date(snapshot.timestamp);
        const timeStr = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        const optionText = '[' + snapshot.source + '] ' + snapshot.name + ' (' + date.toLocaleDateString() + ' ' + timeStr + ')';
        
        const startOption = document.createElement('option');
        startOption.value = JSON.stringify({id: snapshot.id, source: snapshot.source});
        startOption.textContent = optionText;
        startSelector.appendChild(startOption);
        
        const endOption = document.createElement('option');
        endOption.value = JSON.stringify({id: snapshot.id, source: snapshot.source});
        endOption.textContent = optionText;
        endSelector.appendChild(endOption);
    });
}

function calculateSnapshotComparison() {
    const startValue = document.getElementById('comparison-start-snapshot').value;
    const endValue = document.getElementById('comparison-end-snapshot').value;
    
    if (!startValue || !endValue) {
        showStatus('Please select both start and end snapshots', 'error');
        return;
    }
    
    const startData = JSON.parse(startValue);
    const endData = JSON.parse(endValue);
    
    if (startData.id === endData.id && startData.source === endData.source) {
        showStatus('Please select two different snapshots', 'error');
        return;
    }
    
    // Get snapshots from their respective sources
    const startSnapshots = startData.source === 'Tipoff Tourney' ? getAllSnapshots() : getAllRegularSeasonSnapshots();
    const endSnapshots = endData.source === 'Tipoff Tourney' ? getAllSnapshots() : getAllRegularSeasonSnapshots();
    
    const startSnapshot = startSnapshots.find(s => s.id === startData.id);
    const endSnapshot = endSnapshots.find(s => s.id === endData.id);
    
    if (!startSnapshot || !endSnapshot) {
        showStatus('Snapshot not found', 'error');
        return;
    }
    
    // Get the correct data keys based on source
    const startStatsKey = startData.source === 'Tipoff Tourney' ? 'scrimmageStats' : 'regularSeasonStats';
    const startPlayerKey = startData.source === 'Tipoff Tourney' ? 'scrimmagePlayerStats' : 'regularSeasonPlayerStats';
    const endStatsKey = endData.source === 'Tipoff Tourney' ? 'scrimmageStats' : 'regularSeasonStats';
    const endPlayerKey = endData.source === 'Tipoff Tourney' ? 'scrimmagePlayerStats' : 'regularSeasonPlayerStats';
    
    // Calculate differences
    const diffStats = {
        white: {
            paintTouch: subtractStats(endSnapshot.data[endStatsKey].white.paintTouch, startSnapshot.data[startStatsKey].white.paintTouch),
            noPaintTouch: subtractStats(endSnapshot.data[endStatsKey].white.noPaintTouch, startSnapshot.data[startStatsKey].white.noPaintTouch)
        },
        blue: {
            paintTouch: subtractStats(endSnapshot.data[endStatsKey].blue.paintTouch, startSnapshot.data[startStatsKey].blue.paintTouch),
            noPaintTouch: subtractStats(endSnapshot.data[endStatsKey].blue.noPaintTouch, startSnapshot.data[startStatsKey].blue.noPaintTouch)
        }
    };
    
    const diffPlayerStats = {};
    const allPlayers = new Set([
        ...Object.keys(startSnapshot.data[startPlayerKey] || {}), 
        ...Object.keys(endSnapshot.data[endPlayerKey] || {})
    ]);
    
    allPlayers.forEach(playerNum => {
        const startPlayer = startSnapshot.data[startPlayerKey][playerNum] || {pressUp: {positive: 0, negative: 0}, atLevel: {positive: 0, negative: 0}};
        const endPlayer = endSnapshot.data[endPlayerKey][playerNum] || {pressUp: {positive: 0, negative: 0}, atLevel: {positive: 0, negative: 0}};
        
        diffPlayerStats[playerNum] = {
            pressUp: {
                positive: endPlayer.pressUp.positive - startPlayer.pressUp.positive,
                negative: endPlayer.pressUp.negative - startPlayer.pressUp.negative
            },
            atLevel: {
                positive: endPlayer.atLevel.positive - startPlayer.atLevel.positive,
                negative: endPlayer.atLevel.negative - startPlayer.atLevel.negative
            }
        };
    });
    
    // Display results
    const displayName = '[' + startData.source + '] ' + startSnapshot.name + ' → [' + endData.source + '] ' + endSnapshot.name;
    displayComparisonResults(diffStats, diffPlayerStats, '[' + startData.source + '] ' + startSnapshot.name, '[' + endData.source + '] ' + endSnapshot.name);
    
    showStatus('Comparison calculated successfully');
}

function subtractStats(endStat, startStat) {
    const result = {
        possessions: endStat.possessions - startStat.possessions,
        points: endStat.points - startStat.points,
        scores: {}
    };
    
    for (let i = 0; i <= 4; i++) {
        result.scores[i] = endStat.scores[i] - startStat.scores[i];
    }
    
    return result;
}

function displayComparisonResults(diffStats, diffPlayerStats, startName, endName) {
    // Show results section
    document.getElementById('comparison-results').style.display = 'block';
    
    // Update period info
    document.getElementById('comparison-period-info').textContent = 'From "' + startName + '" to "' + endName + '"';
    
    // Paint touch table
    const paintTbody = document.getElementById('comparison-paint-tbody');
    let paintHtml = '';
    
    ['white', 'blue'].forEach(team => {
        const paintTouchPoss = diffStats[team].paintTouch.possessions;
        const noPaintTouchPoss = diffStats[team].noPaintTouch.possessions;
        const totalPoss = paintTouchPoss + noPaintTouchPoss;
        
        const paintTouchPercent = totalPoss > 0 ? ((paintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
        const noPaintTouchPercent = totalPoss > 0 ? ((noPaintTouchPoss / totalPoss) * 100).toFixed(1) : '0.0';
        
        const paintTouchPPP = paintTouchPoss > 0 ? (diffStats[team].paintTouch.points / paintTouchPoss).toFixed(2) : '0.00';
        const noPaintTouchPPP = noPaintTouchPoss > 0 ? (diffStats[team].noPaintTouch.points / noPaintTouchPoss).toFixed(2) : '0.00';
        
        const paintPercentClass = parseFloat(paintTouchPercent) >= 70 ? 'percentage-high' : parseFloat(paintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
        const noPaintPercentClass = parseFloat(noPaintTouchPercent) >= 70 ? 'percentage-high' : parseFloat(noPaintTouchPercent) >= 40 ? 'percentage-medium' : 'percentage-low';
        const paintPPPClass = parseFloat(paintTouchPPP) >= 1.5 ? 'percentage-high' : parseFloat(paintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
        const noPaintPPPClass = parseFloat(noPaintTouchPPP) >= 1.5 ? 'percentage-high' : parseFloat(noPaintTouchPPP) >= 1.0 ? 'percentage-medium' : 'percentage-low';
        
        paintHtml += '<tr class="team-row-' + team + '">';
        paintHtml += '<td><strong>' + team.charAt(0).toUpperCase() + team.slice(1) + '</strong></td>';
        paintHtml += '<td><span class="highlight-number">' + totalPoss + '</span></td>';
        paintHtml += '<td><span class="highlight-number">' + paintTouchPoss + '</span></td>';
        paintHtml += '<td><span class="' + paintPercentClass + '">' + paintTouchPercent + '%</span></td>';
        paintHtml += '<td><span class="' + paintPPPClass + '">' + paintTouchPPP + '</span></td>';
        paintHtml += '<td><span class="highlight-number">' + noPaintTouchPoss + '</span></td>';
        paintHtml += '<td><span class="' + noPaintPercentClass + '">' + noPaintTouchPercent + '%</span></td>';
        paintHtml += '<td><span class="' + noPaintPPPClass + '">' + noPaintTouchPPP + '</span></td>';
        paintHtml += '</tr>';
    });
    
    // Overall row
    const overallPaintPoss = diffStats.white.paintTouch.possessions + diffStats.blue.paintTouch.possessions;
    const overallNoPaintPoss = diffStats.white.noPaintTouch.possessions + diffStats.blue.noPaintTouch.possessions;
    const overallTotalPoss = overallPaintPoss + overallNoPaintPoss;
    const overallPaintPercent = overallTotalPoss > 0 ? ((overallPaintPoss / overallTotalPoss) * 100).toFixed(1) : '0.0';
    const overallNoPaintPercent = overallTotalPoss > 0 ? ((overallNoPaintPoss / overallTotalPoss) * 100).toFixed(1) : '0.0';
    const overallPaintPoints = diffStats.white.paintTouch.points + diffStats.blue.paintTouch.points;
    const overallNoPaintPoints = diffStats.white.noPaintTouch.points + diffStats.blue.noPaintTouch.points;
    const overallPaintPPP = overallPaintPoss > 0 ? (overallPaintPoints / overallPaintPoss).toFixed(2) : '0.00';
    const overallNoPaintPPP = overallNoPaintPoss > 0 ? (overallNoPaintPoints / overallNoPaintPoss).toFixed(2) : '0.00';
    
    paintHtml += '<tr class="team-row-overall">';
    paintHtml += '<td><strong>OVERALL</strong></td>';
    paintHtml += '<td><span class="highlight-number">' + overallTotalPoss + '</span></td>';
    paintHtml += '<td><span class="highlight-number">' + overallPaintPoss + '</span></td>';
    paintHtml += '<td><span>' + overallPaintPercent + '%</span></td>';
    paintHtml += '<td><span>' + overallPaintPPP + '</span></td>';
    paintHtml += '<td><span class="highlight-number">' + overallNoPaintPoss + '</span></td>';
    paintHtml += '<td><span>' + overallNoPaintPercent + '%</span></td>';
    paintHtml += '<td><span>' + overallNoPaintPPP + '</span></td>';
    paintHtml += '</tr>';
    
    paintTbody.innerHTML = paintHtml;
    
    // Player stats table
    const playerTbody = document.getElementById('comparison-player-tbody');
    let playerHtml = '';
    
    Object.keys(diffPlayerStats).forEach(playerNum => {
        const stats = diffPlayerStats[playerNum];
        const totalActions = stats.pressUp.positive + stats.pressUp.negative + stats.atLevel.positive + stats.atLevel.negative;
        
        // Only show players with activity
        if (totalActions > 0) {
            const pressUpRate = calculateRate(stats.pressUp.positive, stats.pressUp.negative);
            const atLevelRate = calculateRate(stats.atLevel.positive, stats.atLevel.negative);
            
            playerHtml += '<tr>';
            playerHtml += '<td><strong>#' + playerNum + ' ' + (playerRoster[playerNum] || 'Unknown') + '</strong></td>';
            playerHtml += '<td><span class="highlight-number">' + stats.pressUp.positive + '</span></td>';
            playerHtml += '<td><span class="highlight-number">' + stats.pressUp.negative + '</span></td>';
            playerHtml += '<td><span class="' + getRateClass(pressUpRate) + '">' + pressUpRate + '%</span></td>';
            playerHtml += '<td><span class="highlight-number">' + stats.atLevel.positive + '</span></td>';
            playerHtml += '<td><span class="highlight-number">' + stats.atLevel.negative + '</span></td>';
            playerHtml += '<td><span class="' + getRateClass(atLevelRate) + '">' + atLevelRate + '%</span></td>';
            playerHtml += '<td><span class="highlight-number">' + totalActions + '</span></td>';
            playerHtml += '</tr>';
        }
    });
    
    playerTbody.innerHTML = playerHtml;
    
    // Team press stats
    const teamPressTbody = document.getElementById('comparison-team-press-tbody');
    let pressUpPos = 0, pressUpNeg = 0, atLevelPos = 0, atLevelNeg = 0;
    
    Object.keys(diffPlayerStats).forEach(playerNum => {
        const stats = diffPlayerStats[playerNum];
        pressUpPos += stats.pressUp.positive;
        pressUpNeg += stats.pressUp.negative;
        atLevelPos += stats.atLevel.positive;
        atLevelNeg += stats.atLevel.negative;
    });
    
    const pressUpRate = calculateRate(pressUpPos, pressUpNeg);
    const atLevelRate = calculateRate(atLevelPos, atLevelNeg);
    const pressUpTotal = pressUpPos + pressUpNeg;
    const atLevelTotal = atLevelPos + atLevelNeg;
    
    teamPressTbody.innerHTML = '<tr class="team-row-overall">' +
        '<td><strong>Press Up</strong></td>' +
        '<td><span class="highlight-number">' + pressUpPos + '</span></td>' +
        '<td><span class="highlight-number">' + pressUpNeg + '</span></td>' +
        '<td><span class="' + getRateClass(pressUpRate) + '">' + pressUpRate + '%</span></td>' +
        '<td><span class="highlight-number">' + pressUpTotal + '</span></td>' +
        '</tr>' +
        '<tr class="team-row-overall">' +
        '<td><strong>At Level</strong></td>' +
        '<td><span class="highlight-number">' + atLevelPos + '</span></td>' +
        '<td><span class="highlight-number">' + atLevelNeg + '</span></td>' +
        '<td><span class="' + getRateClass(atLevelRate) + '">' + atLevelRate + '%</span></td>' +
        '<td><span class="highlight-number">' + atLevelTotal + '</span></td>' +
        '</tr>';
}

function backToSeasonTotal() {
    if (!isViewingSnapshot || !actualScrimmageStats) {
        showStatus('Already viewing season totals', 'error');
        return;
    }
    
    // Restore the actual running totals
    scrimmageStats = JSON.parse(JSON.stringify(actualScrimmageStats));
    scrimmagePlayerStats = JSON.parse(JSON.stringify(actualScrimmagePlayerStats));
    
    // Update displays (but don't save - already in localStorage)
    updateScrimmageStatsDisplay();
    updateScrimmageTeamPressStatsDisplay();
    
    showStatus('Restored to season totals');
    
    // Clear the viewing flag and hide button
    isViewingSnapshot = false;
    const backBtn = document.getElementById('back-to-previous-btn');
    if (backBtn) {
        backBtn.style.display = 'none';
    }
}

// Regular Season Snapshot Functions
function createRegularSeasonSnapshot() {
    const now = new Date();
    const defaultName = 'Regular Season - ' + now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const snapshotName = prompt('Enter a name for this snapshot (optional):', defaultName);
    
    if (snapshotName === null) return; // User cancelled
    
    const snapshot = {
        id: Date.now(),
        name: snapshotName || ('Snapshot ' + now.toLocaleDateString()),
        timestamp: now.toISOString(),
        type: 'regular-season',
        data: {
            regularSeasonStats: JSON.parse(JSON.stringify(regularSeasonStats)),
            regularSeasonPlayerStats: JSON.parse(JSON.stringify(regularSeasonPlayerStats))
        }
    };
    
    // Get existing snapshots
    const snapshots = getAllRegularSeasonSnapshots();
    snapshots.push(snapshot);
    
    // Save to localStorage
    localStorage.setItem(REGULAR_SEASON_SNAPSHOTS_STORAGE_KEY, JSON.stringify(snapshots));
    
    showStatus('Snapshot "' + snapshot.name + '" created successfully!');
}

function getAllRegularSeasonSnapshots() {
    const stored = localStorage.getItem(REGULAR_SEASON_SNAPSHOTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function loadRegularSeasonSnapshot(snapshotId) {
    const snapshots = getAllRegularSeasonSnapshots();
    const snapshot = snapshots.find(s => s.id === parseInt(snapshotId));
    
    if (!snapshot) {
        showStatus('Snapshot not found', 'error');
        return;
    }
    
    // Confirm before loading
    const confirmMsg = 'Load snapshot "' + snapshot.name + '"?\n\n' +
        'This will show historical data in the Regular Season tab.\n\n' +
        'Your actual running totals are preserved and new data will always accumulate to them.';
    if (!confirm(confirmMsg)) {
        return;
    }
    
    // Save actual running totals if not already saved
    if (!isViewingRegularSeasonSnapshot) {
        actualRegularSeasonStats = JSON.parse(JSON.stringify(regularSeasonStats));
        actualRegularSeasonPlayerStats = JSON.parse(JSON.stringify(regularSeasonPlayerStats));
    }
    
    // Load the snapshot data for DISPLAY ONLY
    regularSeasonStats = JSON.parse(JSON.stringify(snapshot.data.regularSeasonStats));
    regularSeasonPlayerStats = JSON.parse(JSON.stringify(snapshot.data.regularSeasonPlayerStats));
    
    // Mark that we're viewing a snapshot
    isViewingRegularSeasonSnapshot = true;
    
    // Update displays (but don't save to localStorage)
    updateRegularSeasonStatsDisplay();
    updateRegularSeasonTeamPressStatsDisplay();
    
    showStatus('Viewing snapshot "' + snapshot.name + '" (running totals preserved)');
    
    // Show back to season total button
    const backBtn = document.getElementById('back-to-regular-season-btn');
    if (backBtn) {
        backBtn.style.display = '';
        backBtn.style.flex = '1';
    }
    
    // Refresh snapshot selector
    populateRegularSeasonSnapshotSelector();
    toggleRegularSeasonSnapshotViewer();
}

function deleteRegularSeasonSnapshot(snapshotId) {
    const snapshots = getAllRegularSeasonSnapshots();
    const snapshot = snapshots.find(s => s.id === parseInt(snapshotId));
    
    if (!snapshot) {
        showStatus('Snapshot not found', 'error');
        return;
    }
    
    if (!confirm('Delete snapshot "' + snapshot.name + '"? This cannot be undone.')) {
        return;
    }
    
    const filtered = snapshots.filter(s => s.id !== parseInt(snapshotId));
    localStorage.setItem(REGULAR_SEASON_SNAPSHOTS_STORAGE_KEY, JSON.stringify(filtered));
    
    populateRegularSeasonSnapshotSelector();
    showStatus('Snapshot deleted');
}

function renameRegularSeasonSnapshot(snapshotId) {
    const snapshots = getAllRegularSeasonSnapshots();
    const snapshot = snapshots.find(s => s.id === parseInt(snapshotId));
    
    if (!snapshot) {
        showStatus('Snapshot not found', 'error');
        return;
    }
    
    const newName = prompt('Enter new name for snapshot:', snapshot.name);
    if (newName === null || newName.trim() === '') return;
    
    snapshot.name = newName.trim();
    localStorage.setItem(REGULAR_SEASON_SNAPSHOTS_STORAGE_KEY, JSON.stringify(snapshots));
    
    populateRegularSeasonSnapshotSelector();
    showStatus('Snapshot renamed');
}

function populateRegularSeasonSnapshotSelector() {
    const selector = document.getElementById('regular-season-snapshot-selector');
    if (!selector) return;
    
    const snapshots = getAllRegularSeasonSnapshots();
    
    // Sort by timestamp (newest first)
    snapshots.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    selector.innerHTML = '<option value="">-- Select a snapshot --</option>';
    
    snapshots.forEach(snapshot => {
        const date = new Date(snapshot.timestamp);
        const option = document.createElement('option');
        option.value = snapshot.id;
        const timeStr = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        option.textContent = snapshot.name + ' (' + date.toLocaleDateString() + ' ' + timeStr + ')';
        selector.appendChild(option);
    });
    
    if (snapshots.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No snapshots created yet';
        option.disabled = true;
        selector.appendChild(option);
    }
}

function toggleRegularSeasonSnapshotViewer() {
    const viewer = document.getElementById('regular-season-snapshot-viewer');
    if (viewer.style.display === 'none') {
        viewer.style.display = 'block';
        populateRegularSeasonSnapshotSelector();
    } else {
        viewer.style.display = 'none';
    }
}

function backToRegularSeasonTotal() {
    if (!isViewingRegularSeasonSnapshot || !actualRegularSeasonStats) {
        showStatus('Already viewing season totals', 'error');
        return;
    }
    
    // Restore the actual running totals
    regularSeasonStats = JSON.parse(JSON.stringify(actualRegularSeasonStats));
    regularSeasonPlayerStats = JSON.parse(JSON.stringify(actualRegularSeasonPlayerStats));
    
    // Update displays (but don't save - already in localStorage)
    updateRegularSeasonStatsDisplay();
    updateRegularSeasonTeamPressStatsDisplay();
    
    showStatus('Restored to Regular Season totals');
    
    // Clear the viewing flag and hide button
    isViewingRegularSeasonSnapshot = false;
    const backBtn = document.getElementById('back-to-regular-season-btn');
    if (backBtn) {
        backBtn.style.display = 'none';
    }
}

// Comparison table sorting functions
let comparisonPaintSortColumn = 'team';
let comparisonPaintSortOrder = 'asc';
let comparisonPlayerSortColumn = 'player';
let comparisonPlayerSortOrder = 'asc';
let comparisonTeamPressSortColumn = 'category';
let comparisonTeamPressSortOrder = 'asc';

function sortComparisonPaintTable(column) {
    const table = document.getElementById('comparison-paint-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    if (comparisonPaintSortColumn === column) {
        comparisonPaintSortOrder = comparisonPaintSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        comparisonPaintSortOrder = 'asc';
        comparisonPaintSortColumn = column;
    }
    
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
    });
    
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'team':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'totalPoss':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'paintPoss':
                aValue = parseInt(a.cells[2].textContent) || 0;
                bValue = parseInt(b.cells[2].textContent) || 0;
                break;
            case 'paintPercent':
                aValue = parseFloat(a.cells[3].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[3].textContent.replace('%', '')) || 0;
                break;
            case 'paintPPP':
                aValue = parseFloat(a.cells[4].textContent) || 0;
                bValue = parseFloat(b.cells[4].textContent) || 0;
                break;
            case 'noPaintPoss':
                aValue = parseInt(a.cells[5].textContent) || 0;
                bValue = parseInt(b.cells[5].textContent) || 0;
                break;
            case 'noPaintPercent':
                aValue = parseFloat(a.cells[6].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[6].textContent.replace('%', '')) || 0;
                break;
            case 'noPaintPPP':
                aValue = parseFloat(a.cells[7].textContent) || 0;
                bValue = parseFloat(b.cells[7].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return comparisonPaintSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return comparisonPaintSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${comparisonPaintSortOrder}`);
}

function sortComparisonPlayerTable(column) {
    const table = document.getElementById('comparison-player-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    if (comparisonPlayerSortColumn === column) {
        comparisonPlayerSortOrder = comparisonPlayerSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        comparisonPlayerSortOrder = 'asc';
        comparisonPlayerSortColumn = column;
    }
    
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
    });
    
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'player':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'pressUpPos':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'pressUpNeg':
                aValue = parseInt(a.cells[2].textContent) || 0;
                bValue = parseInt(b.cells[2].textContent) || 0;
                break;
            case 'pressUpRate':
                aValue = parseFloat(a.cells[3].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[3].textContent.replace('%', '')) || 0;
                break;
            case 'atLevelPos':
                aValue = parseInt(a.cells[4].textContent) || 0;
                bValue = parseInt(b.cells[4].textContent) || 0;
                break;
            case 'atLevelNeg':
                aValue = parseInt(a.cells[5].textContent) || 0;
                bValue = parseInt(b.cells[5].textContent) || 0;
                break;
            case 'atLevelRate':
                aValue = parseFloat(a.cells[6].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[6].textContent.replace('%', '')) || 0;
                break;
            case 'totalActions':
                aValue = parseInt(a.cells[7].textContent) || 0;
                bValue = parseInt(b.cells[7].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return comparisonPlayerSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return comparisonPlayerSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${comparisonPlayerSortOrder}`);
}

function sortComparisonTeamPressTable(column) {
    const table = document.getElementById('comparison-team-press-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    if (comparisonTeamPressSortColumn === column) {
        comparisonTeamPressSortOrder = comparisonTeamPressSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        comparisonTeamPressSortOrder = 'asc';
        comparisonTeamPressSortColumn = column;
    }
    
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
    });
    
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch (column) {
            case 'category':
                aValue = a.cells[0].textContent.trim();
                bValue = b.cells[0].textContent.trim();
                break;
            case 'totalPos':
                aValue = parseInt(a.cells[1].textContent) || 0;
                bValue = parseInt(b.cells[1].textContent) || 0;
                break;
            case 'totalNeg':
                aValue = parseInt(a.cells[2].textContent) || 0;
                bValue = parseInt(b.cells[2].textContent) || 0;
                break;
            case 'successRate':
                aValue = parseFloat(a.cells[3].textContent.replace('%', '')) || 0;
                bValue = parseFloat(b.cells[3].textContent.replace('%', '')) || 0;
                break;
            case 'totalActions':
                aValue = parseInt(a.cells[4].textContent) || 0;
                bValue = parseInt(b.cells[4].textContent) || 0;
                break;
            default:
                return 0;
        }
        
        if (typeof aValue === 'string') {
            return comparisonTeamPressSortOrder === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        } else {
            return comparisonTeamPressSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    const header = table.querySelector(`th[data-column="${column}"]`);
    header.classList.add(`sorted-${comparisonTeamPressSortOrder}`);
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting app initialization');
    
    // Try to load saved data first
    const hasLoadedData = loadFromLocalStorage();
    const hasLoadedSeasonData = loadSeasonFromLocalStorage();
    const hasLoadedScrimmageData = loadScrimmageFromLocalStorage();
    const hasLoadedRegularSeasonData = loadRegularSeasonFromLocalStorage();
    
    // Initialize actual totals to match loaded scrimmage data
    if (hasLoadedScrimmageData) {
        actualScrimmageStats = JSON.parse(JSON.stringify(scrimmageStats));
        actualScrimmagePlayerStats = JSON.parse(JSON.stringify(scrimmagePlayerStats));
    }
    
    if (hasLoadedData) {
        showStatus('Previous session restored!');
        console.log('Previous session data loaded');
    } else {
        showStatus('New session started');
        console.log('Starting new session');
    }
    
    if (hasLoadedSeasonData) {
        console.log('Season data loaded');
    } else {
        console.log('Starting new season');
    }
    
    if (hasLoadedRegularSeasonData) {
        console.log('Regular Season data loaded');
    } else {
        console.log('Starting new Regular Season');
    }
    
    // Initialize UI
    console.log('Updating stats display and active team display');
    updateStatsDisplay();
    updateActiveTeamDisplay();
    updateSeasonStatsDisplay();
    updateScrimmageStatsDisplay();
    updateScrimmageTeamPressStatsDisplay();
    updateRegularSeasonStatsDisplay();
    updateRegularSeasonTeamPressStatsDisplay();
    updateUndoButtonVisibility();
    
    // Setup event listeners
    console.log('Setting up event listeners');
    
    // Team selection buttons
    const teamSelectors = document.querySelectorAll('.team-selector');
    console.log('Found team selector buttons:', teamSelectors.length);
    teamSelectors.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            console.log('Team selector clicked:', btn.dataset.team);
            switchActiveTeam(btn.dataset.team);
        });
        console.log(`Team selector ${index + 1} event listener attached`);
    });
    
    // Paint touch toggle buttons
    const paintTouchBtn = document.querySelector('.paint-touch-toggle.paint-touch');
    if (paintTouchBtn) {
        paintTouchBtn.addEventListener('click', () => {
            console.log('Paint touch button clicked');
            activePaintTouch = true;
            updateActiveTeamDisplay();
            showStatus('Mode: Paint Touch');
        });
        console.log('Paint touch button event listener attached');
    } else {
        console.error('Paint touch button not found!');
    }
    
    const noPaintTouchBtn = document.querySelector('.paint-touch-toggle.no-paint-touch');
    if (noPaintTouchBtn) {
        noPaintTouchBtn.addEventListener('click', () => {
            console.log('No paint touch button clicked');
            activePaintTouch = false;
            updateActiveTeamDisplay();
            showStatus('Mode: No Paint Touch');
        });
        console.log('No paint touch button event listener attached');
    } else {
        console.error('No paint touch button not found!');
    }
    
    // Score buttons
    const scoreButtons = document.querySelectorAll('.score-btn');
    console.log('Found score buttons:', scoreButtons.length);
    scoreButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const points = parseInt(btn.dataset.points);
            console.log('Score button clicked:', points);
            addPossession(activeTeam, activePaintTouch, points);
        });
        console.log(`Score button ${index + 1} (${btn.dataset.points} points) event listener attached`);
    });
    
    // Action buttons
    const undoBtn = document.getElementById('undo-btn');
    if (undoBtn) {
        undoBtn.addEventListener('click', undoLastAction);
        console.log('Undo button event listener attached');
    } else {
        console.error('Undo button not found!');
    }
    
    const resetAllBtn = document.getElementById('reset-all-btn');
    if (resetAllBtn) {
        resetAllBtn.addEventListener('click', resetAllData);
        console.log('Reset all button event listener attached');
    } else {
        console.error('Reset all button not found!');
    }
    
    const resetPracticeBtn = document.getElementById('reset-practice-btn');
    if (resetPracticeBtn) {
        resetPracticeBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset current practice data? This will not affect season totals.')) {
                resetCurrentPractice();
                showStatus('Current practice data has been reset');
            }
        });
        console.log('Reset practice button event listener attached');
    } else {
        console.error('Reset practice button not found!');
    }
    
    const resetPaintTouchBtn = document.getElementById('reset-paint-touch-btn');
    if (resetPaintTouchBtn) {
        resetPaintTouchBtn.addEventListener('click', resetPaintTouchData);
        console.log('Reset paint touch button event listener attached');
    }

    const quarterReportBtn = document.getElementById('quarter-report-btn');
    if (quarterReportBtn) {
        quarterReportBtn.addEventListener('click', showQuarterReport);
        console.log('Quarter report button event listener attached');
    } else {
        console.error('Quarter report button not found!');
    }

    const halfReportBtn = document.getElementById('half-report-btn');
    if (halfReportBtn) {
        halfReportBtn.addEventListener('click', showHalfReport);
        console.log('Half report button event listener attached');
    } else {
        console.error('Half report button not found!');
    }

    const savePracticeBtn = document.getElementById('save-practice-btn');
    if (savePracticeBtn) {
        savePracticeBtn.addEventListener('click', savePracticeToSeason);
        console.log('Save practice button event listener attached');
    } else {
        console.error('Save practice button not found!');
    }
    
    const undoSeasonSaveBtn = document.getElementById('undo-season-save-btn');
    if (undoSeasonSaveBtn) {
        undoSeasonSaveBtn.addEventListener('click', undoLastSeasonSave);
        console.log('Undo season save button event listener attached');
    } else {
        console.error('Undo season save button not found!');
    }
    
    const saveScrimmageBtn = document.getElementById('save-scrimmage-btn');
    if (saveScrimmageBtn) {
        saveScrimmageBtn.addEventListener('click', saveToScrimmages);
        console.log('Save scrimmage button event listener attached');
    } else {
        console.error('Save scrimmage button not found!');
    }
    
    const resetScrimmageBtn = document.getElementById('reset-scrimmage-totals-btn');
    if (resetScrimmageBtn) {
        resetScrimmageBtn.addEventListener('click', resetScrimmageData);
        console.log('Reset scrimmage totals button event listener attached');
    } else {
        console.error('Reset scrimmage totals button not found!');
    }
    
    const saveRegularSeasonBtn = document.getElementById('save-regular-season-btn');
    if (saveRegularSeasonBtn) {
        saveRegularSeasonBtn.addEventListener('click', saveToRegularSeason);
        console.log('Save regular season button event listener attached');
    } else {
        console.error('Save regular season button not found!');
    }
    
    const resetRegularSeasonBtn = document.getElementById('reset-regular-season-totals-btn');
    if (resetRegularSeasonBtn) {
        resetRegularSeasonBtn.addEventListener('click', resetRegularSeasonData);
        console.log('Reset regular season totals button event listener attached');
    } else {
        console.error('Reset regular season totals button not found!');
    }

    // Google Sheets loaders
    const saveScriptUrlBtn = document.getElementById('save-script-url-btn');
    if (saveScriptUrlBtn) {
        saveScriptUrlBtn.addEventListener('click', saveScriptUrl);
        console.log('Save script URL button event listener attached');
    }
    
    const saveRegularSeasonScriptUrlBtn = document.getElementById('save-regular-season-script-url-btn');
    if (saveRegularSeasonScriptUrlBtn) {
        saveRegularSeasonScriptUrlBtn.addEventListener('click', saveRegularSeasonScriptUrl);
        console.log('Save Regular Season script URL button event listener attached');
    }

    const syncNowBtn = document.getElementById('sync-now-btn');
    if (syncNowBtn) {
        syncNowBtn.addEventListener('click', () => {
            loadFromGoogleSheets();
        });
        console.log('Sync now button event listener attached');
    }
    
    const syncRegularSeasonNowBtn = document.getElementById('sync-regular-season-now-btn');
    if (syncRegularSeasonNowBtn) {
        syncRegularSeasonNowBtn.addEventListener('click', () => {
            loadFromGoogleSheets();
        });
        console.log('Sync Regular Season now button event listener attached');
    }

    const setupInstructionsLink = document.getElementById('setup-instructions-link');
    if (setupInstructionsLink) {
        setupInstructionsLink.addEventListener('click', showSetupInstructions);
        console.log('Setup instructions link event listener attached');
    }
    
    const regularSeasonSetupInstructionsLink = document.getElementById('regular-season-setup-instructions-link');
    if (regularSeasonSetupInstructionsLink) {
        regularSeasonSetupInstructionsLink.addEventListener('click', showSetupInstructions);
        console.log('Regular Season setup instructions link event listener attached');
    }

    // Snapshot Manager buttons
    const createSnapshotBtn = document.getElementById('create-snapshot-btn');
    if (createSnapshotBtn) {
        createSnapshotBtn.addEventListener('click', createSnapshot);
        console.log('Create snapshot button event listener attached');
    }

    const viewSnapshotsBtn = document.getElementById('view-snapshots-btn');
    if (viewSnapshotsBtn) {
        viewSnapshotsBtn.addEventListener('click', toggleSnapshotViewer);
        console.log('View snapshots button event listener attached');
    }

    const loadSnapshotBtn = document.getElementById('load-snapshot-btn');
    if (loadSnapshotBtn) {
        loadSnapshotBtn.addEventListener('click', () => {
            const selector = document.getElementById('snapshot-selector');
            if (selector && selector.value) {
                loadSnapshot(selector.value);
            } else {
                showStatus('Please select a snapshot to load', 'error');
            }
        });
        console.log('Load snapshot button event listener attached');
    }

    const renameSnapshotBtn = document.getElementById('rename-snapshot-btn');
    if (renameSnapshotBtn) {
        renameSnapshotBtn.addEventListener('click', () => {
            const selector = document.getElementById('snapshot-selector');
            if (selector && selector.value) {
                renameSnapshot(selector.value);
            } else {
                showStatus('Please select a snapshot to rename', 'error');
            }
        });
        console.log('Rename snapshot button event listener attached');
    }

    const deleteSnapshotBtn = document.getElementById('delete-snapshot-btn');
    if (deleteSnapshotBtn) {
        deleteSnapshotBtn.addEventListener('click', () => {
            const selector = document.getElementById('snapshot-selector');
            if (selector && selector.value) {
                deleteSnapshot(selector.value);
            } else {
                showStatus('Please select a snapshot to delete', 'error');
            }
        });
        console.log('Delete snapshot button event listener attached');
    }

    const closeSnapshotsBtn = document.getElementById('close-snapshots-btn');
    if (closeSnapshotsBtn) {
        closeSnapshotsBtn.addEventListener('click', toggleSnapshotViewer);
        console.log('Close snapshots button event listener attached');
    }

    const backToPreviousBtn = document.getElementById('back-to-previous-btn');
    if (backToPreviousBtn) {
        backToPreviousBtn.addEventListener('click', backToSeasonTotal);
        console.log('Back to season total button event listener attached');
    }

    const calculateComparisonBtn = document.getElementById('calculate-comparison-btn');
    if (calculateComparisonBtn) {
        calculateComparisonBtn.addEventListener('click', calculateSnapshotComparison);
        console.log('Calculate comparison button event listener attached');
    }
    
    // Regular Season Snapshot Manager buttons
    const createRegularSeasonSnapshotBtn = document.getElementById('create-regular-season-snapshot-btn');
    if (createRegularSeasonSnapshotBtn) {
        createRegularSeasonSnapshotBtn.addEventListener('click', createRegularSeasonSnapshot);
        console.log('Create Regular Season snapshot button event listener attached');
    }

    const viewRegularSeasonSnapshotsBtn = document.getElementById('view-regular-season-snapshots-btn');
    if (viewRegularSeasonSnapshotsBtn) {
        viewRegularSeasonSnapshotsBtn.addEventListener('click', toggleRegularSeasonSnapshotViewer);
        console.log('View Regular Season snapshots button event listener attached');
    }

    const loadRegularSeasonSnapshotBtn = document.getElementById('load-regular-season-snapshot-btn');
    if (loadRegularSeasonSnapshotBtn) {
        loadRegularSeasonSnapshotBtn.addEventListener('click', () => {
            const selector = document.getElementById('regular-season-snapshot-selector');
            if (selector && selector.value) {
                loadRegularSeasonSnapshot(selector.value);
            } else {
                showStatus('Please select a snapshot to load', 'error');
            }
        });
        console.log('Load Regular Season snapshot button event listener attached');
    }

    const renameRegularSeasonSnapshotBtn = document.getElementById('rename-regular-season-snapshot-btn');
    if (renameRegularSeasonSnapshotBtn) {
        renameRegularSeasonSnapshotBtn.addEventListener('click', () => {
            const selector = document.getElementById('regular-season-snapshot-selector');
            if (selector && selector.value) {
                renameRegularSeasonSnapshot(selector.value);
            } else {
                showStatus('Please select a snapshot to rename', 'error');
            }
        });
        console.log('Rename Regular Season snapshot button event listener attached');
    }

    const deleteRegularSeasonSnapshotBtn = document.getElementById('delete-regular-season-snapshot-btn');
    if (deleteRegularSeasonSnapshotBtn) {
        deleteRegularSeasonSnapshotBtn.addEventListener('click', () => {
            const selector = document.getElementById('regular-season-snapshot-selector');
            if (selector && selector.value) {
                deleteRegularSeasonSnapshot(selector.value);
            } else {
                showStatus('Please select a snapshot to delete', 'error');
            }
        });
        console.log('Delete Regular Season snapshot button event listener attached');
    }

    const closeRegularSeasonSnapshotsBtn = document.getElementById('close-regular-season-snapshots-btn');
    if (closeRegularSeasonSnapshotsBtn) {
        closeRegularSeasonSnapshotsBtn.addEventListener('click', toggleRegularSeasonSnapshotViewer);
        console.log('Close Regular Season snapshots button event listener attached');
    }

    const backToRegularSeasonBtn = document.getElementById('back-to-regular-season-btn');
    if (backToRegularSeasonBtn) {
        backToRegularSeasonBtn.addEventListener('click', backToRegularSeasonTotal);
        console.log('Back to Regular Season total button event listener attached');
    }

    // Load from JSON button
    const loadJsonBtn = document.getElementById('load-json-btn');
    if (loadJsonBtn) {
        loadJsonBtn.addEventListener('click', () => {
            const jsonInput = prompt('Paste your JSON data here:');
            if (jsonInput) {
                loadJSONData(jsonInput);
            }
        });
        console.log('Load JSON button event listener attached');
    }
    
    const loadRegularSeasonJsonBtn = document.getElementById('load-regular-season-json-btn');
    if (loadRegularSeasonJsonBtn) {
        loadRegularSeasonJsonBtn.addEventListener('click', () => {
            const jsonInput = prompt('Paste your Regular Season JSON data here:');
            if (jsonInput) {
                loadRegularSeasonJSONData(jsonInput);
            }
        });
        console.log('Load Regular Season JSON button event listener attached');
    }

    // Load saved Google Script URL and show sync button if exists
    const savedUrl = localStorage.getItem('google-script-url');
    if (savedUrl) {
        document.getElementById('google-script-url').value = savedUrl;
        document.getElementById('sync-now-btn').style.display = 'inline-block';
        
        // Also populate Regular Season field
        const regularSeasonInput = document.getElementById('regular-season-script-url');
        if (regularSeasonInput) {
            regularSeasonInput.value = savedUrl;
            document.getElementById('sync-regular-season-now-btn').style.display = 'inline-block';
        }
        
        autoSyncEnabled = true;
    }
    
    const exportCsvBtn = document.getElementById('export-csv-btn');
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', exportToCSV);
        console.log('Export CSV button event listener attached');
    } else {
        console.error('Export CSV button not found!');
    }
    
    const exportExcelBtn = document.getElementById('export-excel-btn');
    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', copyExcelData);
        console.log('Export Excel button event listener attached');
    } else {
        console.error('Export Excel button not found!');
    }
    
    const copyPlayerExcelBtn = document.getElementById('copy-player-excel-btn');
    if (copyPlayerExcelBtn) {
        copyPlayerExcelBtn.addEventListener('click', copyPlayerExcelData);
        console.log('Copy Player Excel button event listener attached');
    } else {
        console.error('Copy Player Excel button not found!');
    }
    
    // Setup keyboard event listeners
    document.addEventListener('keydown', handleKeyPress);
    console.log('Keyboard event listener attached');
    
    // Setup tab navigation
    console.log('Setting up tab navigation');
    const tabButtons = document.querySelectorAll('.tab-btn');
    console.log('Found tab buttons:', tabButtons.length);
    tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            console.log('Tab clicked:', tabName);
            switchTab(tabName);
        });
        console.log(`Tab button ${index + 1} event listener attached`);
    });
    
    // Setup player tracking event listeners
    console.log('Setting up player tracking event listeners');
    
    // Player selection buttons
    const playerButtons = document.querySelectorAll('.player-btn');
    console.log('Found player buttons:', playerButtons.length);
    playerButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const playerNum = btn.dataset.player;
            console.log('Player selected:', playerNum);
            selectPlayer(playerNum);
        });
        console.log(`Player button ${index + 1} event listener attached`);
    });
    
    // Press/Level action buttons
    const pressButtons = document.querySelectorAll('.press-btn');
    console.log('Found press buttons:', pressButtons.length);
    pressButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            const value = parseInt(btn.dataset.value);
            console.log('Press button clicked:', type, value);
            addPlayerAction(selectedPlayer, type, value);
        });
        console.log(`Press button ${index + 1} event listener attached`);
    });
    
    // Player action buttons
    const undoPlayerBtn = document.getElementById('undo-player-btn');
    if (undoPlayerBtn) {
        undoPlayerBtn.addEventListener('click', undoLastPlayerAction);
        console.log('Undo player button event listener attached');
    } else {
        console.error('Undo player button not found!');
    }
    
    const resetPlayerBtn = document.getElementById('reset-player-btn');
    if (resetPlayerBtn) {
        resetPlayerBtn.addEventListener('click', resetPlayerData);
        console.log('Reset player button event listener attached');
    } else {
        console.error('Reset player button not found!');
    }
    
    // Initialize player displays
    updatePlayerDisplay();
    updatePlayerStatsDisplay();
    updateTeamPressStatsDisplay();
    
    // Setup sortable table headers
    console.log('Setting up sortable table headers');
    
    // Paint percentage table sorting
    document.querySelectorAll('#paint-percentage-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortPaintTable(th.dataset.column));
    });
    
    // Player stats table sorting
    document.querySelectorAll('#player-stats-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortPlayerTable(th.dataset.column));
    });
    
    // Team press stats table sorting
    document.querySelectorAll('#team-press-stats-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortTeamPressTable(th.dataset.column));
    });
    
    // Season table sorting
    document.querySelectorAll('#season-paint-percentage-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortSeasonPaintTable(th.dataset.column));
    });
    
    document.querySelectorAll('#season-player-stats-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortSeasonPlayerTable(th.dataset.column));
    });
    
    document.querySelectorAll('#season-team-press-stats-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortSeasonTeamPressTable(th.dataset.column));
    });
    
    // Regular Season table sorting
    document.querySelectorAll('#regular-season-paint-percentage-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortRegularSeasonPaintTable(th.dataset.column));
    });
    
    document.querySelectorAll('#regular-season-player-stats-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortRegularSeasonPlayerTable(th.dataset.column));
    });
    
    document.querySelectorAll('#regular-season-team-press-stats-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortRegularSeasonTeamPressTable(th.dataset.column));
    });
    
    // Scrimmage tables
    document.querySelectorAll('#scrimmage-paint-percentage-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortScrimmageTable(th.dataset.column));
    });
    
    document.querySelectorAll('#scrimmage-player-stats-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortScrimmagePlayerTable(th.dataset.column));
    });
    
    document.querySelectorAll('#scrimmage-team-press-stats-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortScrimmageTeamPressTable(th.dataset.column));
    });
    
    // Comparison tables
    document.querySelectorAll('#comparison-paint-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortComparisonPaintTable(th.dataset.column));
    });
    
    document.querySelectorAll('#comparison-player-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortComparisonPlayerTable(th.dataset.column));
    });
    
    document.querySelectorAll('#comparison-team-press-table th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => sortComparisonTeamPressTable(th.dataset.column));
    });
    
    console.log('App initialization complete');
}); 