// Define the placement of hitboxes on the map image using percentages
// top and left define position, width and height define the click area size
const hitboxCoordinates = {
    // Top Left (Forest)
    "1982": { top: "20%", left: "20%", width: "10%", height: "10%" },
    "1983": { top: "15%", left: "35%", width: "8%", height: "8%" },
    // Top Right (Snow)
    "1984": { top: "25%", left: "70%", width: "12%", height: "10%" },
    "1985": { top: "10%", left: "80%", width: "10%", height: "10%" },
    "1986": { top: "35%", left: "85%", width: "8%", height: "8%" },
    // Center (Castle/Plains)
    "1987": { top: "40%", left: "45%", width: "15%", height: "12%" },
    "1988": { top: "50%", left: "35%", width: "8%", height: "8%" },
    "1989": { top: "60%", left: "45%", width: "10%", height: "8%" },
    "1990": { top: "50%", left: "60%", width: "8%", height: "8%" },
    "1991": { top: "55%", left: "75%", width: "8%", height: "8%" },
    // Center Bottom (Village/Farms)
    "1992": { top: "70%", left: "35%", width: "18%", height: "12%" },
    "1993": { top: "85%", left: "30%", width: "8%", height: "8%" },
    // Bottom Right (Lava/Volcano)
    "1994": { top: "65%", left: "80%", width: "15%", height: "15%" },
    "1995": { top: "80%", left: "70%", width: "12%", height: "12%" },
    // Bottom Left (Desert/Oasis)
    "1996": { top: "50%", left: "15%", width: "12%", height: "12%" },
    "1997": { top: "65%", left: "10%", width: "10%", height: "10%" },
    "1998": { top: "40%", left: "25%", width: "8%", height: "8%" },
    // Bottom Left Corner (Start/Pier)
    "1999": { top: "85%", left: "10%", width: "12%", height: "10%" }
};

document.addEventListener('DOMContentLoaded', async () => {
    const hitboxesContainer = document.getElementById('hitboxes-container');
    const gameOverlay = document.getElementById('game-overlay');
    const closeGameBtn = document.getElementById('close-game-btn');
    const gameIframe = document.getElementById('game-iframe');

    // Fetch games configuration
    let gamesConfig = {};
    try {
        const response = await fetch('games.json');
        if (response.ok) {
            gamesConfig = await response.json();
            console.log("Loaded game configuration successfully.");
        } else {
            console.warn("Could not load games.json. Reverting to empty config.");
        }
    } catch (e) {
        console.error("Error fetching games.json:", e);
    }

    // Render Hitboxes
    for (const year in hitboxCoordinates) {
        const coords = hitboxCoordinates[year];
        const hitbox = document.createElement('div');
        hitbox.className = 'hitbox';
        hitbox.innerText = year;

        hitbox.style.top = coords.top;
        hitbox.style.left = coords.left;
        hitbox.style.width = coords.width;
        hitbox.style.height = coords.height;

        // Click handler
        hitbox.addEventListener('click', () => {
            const gameData = gamesConfig[year];
            if (gameData && gameData.path) {
                openGame(gameData.path);
            } else {
                alert(`No game configured for ${year}. Please map it in games.json.`);
                // For demo purposes, try opening a default index
                openGame(`./games/${year}/index.html`);
            }
        });

        hitboxesContainer.appendChild(hitbox);
    }

    // Overlay Controls
    function openGame(path) {
        console.log("Opening game at:", path);
        // Add a query param to dodge cache sometimes if needed, or just set it
        gameIframe.src = path;
        gameOverlay.classList.remove('hidden');
    }

    function closeGame() {
        gameOverlay.classList.add('hidden');
        // Clear src to stop game audio/processing when hidden
        setTimeout(() => {
            gameIframe.src = '';
        }, 300); // Wait for fade transition
    }

    closeGameBtn.addEventListener('click', closeGame);
});
