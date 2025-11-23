const backend = "http://192.168.2.52:3000/";
const mcServers = ['Bungeecord', 'Minigames', 'Arrowfight', 'Bedwars', 'CTF', 'Parcour'];

async function update() {
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 500);

        const response = await fetch(backend + 'status' , { signal: controller.signal });
        clearTimeout(timer);
        const text = await response.json();
        for (let i = 0; i < mcServers.length; i++) {
            const btn = document.getElementById(mcServers[i]);
            btn.className = '';
            switch (text[mcServers[i]]) {
                case 0:
                    btn.textContent = "Starten";
                    btn.classList.add('green');
                    btn.onclick = () => send(mcServers[i]);
                    break;
                case 1:
                    btn.textContent = "Startet...";
                    btn.classList.add('orange');
                    btn.onclick = null;
                    break;
                case 2:
                    btn.textContent = "Stoppen";
                    btn.classList.add('red');
                    btn.onclick = () => stop(mcServers[i]);
                    break;
            }
        }
    }
    catch (error) {
        location.href = "index.html";
    }
};

async function send(server) {
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 100);

        const response = await fetch(backend + 'start?cmd=' + server, { signal: controller.signal });
        clearTimeout(timer);
        const text = await response.text();

        if (text === 'running') {
            update();
        } else {
            location.href = "index.html";
        }
    }
    catch (error) {
        console.error(error);
    }
};

async function stop(server) {
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 100);

        const response = await fetch(backend + 'stop?cmd=' + server, { signal: controller.signal });
        clearTimeout(timer);
        const text = await response.text();
        
        if (text === 'stopped') {
            update();
        } else {
            location.href = "index.html";
        }
    }
    catch (error) {
        console.error(error);
    }
};

async function restartPanel() {
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 100);

        const response = await fetch(backend + 'restart', { signal: controller.signal });
        clearTimeout(timer);
        const text = await response.text();
        if (text === 'ok') {
            location.href = "index.html";
        } else { console.error('Backend konnte nicht neu gestartet werden'); }
    }
    catch (error) {
        console.error(error);
    }
};
async function shutdown() {
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 100);

        const response = await fetch(backend + 'shutdown', { signal: controller.signal });
        clearTimeout(timer);
        const text = await response.text();
        if (text === 'ok') {
            console.log('Server-2 wird heruntergefahren...');
        } else { console.error('Server-2 konnte nicht heruntergefahren werden.'); }
    }
    catch (error) {
        console.error(error);
    }
};

function startAll() {
    for (let i = 0; i < mcServers.length; i++) {
         send(mcServers[i]);
         console.log('Starte ' + mcServers[i]);
    }
};

update();
setInterval(update, 2000);