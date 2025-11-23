const backend = "http://192.168.2.52:3000/";

async function update() {
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 1000);

        const response = await fetch(backend + 'status' )
        clearTimeout(timer);
        const text = await response.json();
        const elements = ['Bungeecord', 'Minigames'];//, 'Arrowfight', 'Bedwars', 'CTF', 'Parcour', 'Survival'];
        for (let i = 0; i < elements.length; i++) {
            const btn = document.getElementById(elements[i]);
            btn.className = '';
            switch (text[elements[i]]) {
                case 0:
                    btn.textContent = "Starten";
                    btn.classList.add('green');
                    btn.onclick = () => send(elements[i]);
                    break;
                case 1:
                    btn.textContent = "Startet...";
                    btn.classList.add('orange');
                    btn.onclick = null;
                    break;
                case 2:
                    btn.textContent = "Stoppen";
                    btn.classList.add('red');
                    btn.onclick = () => stop(elements[i]);
                    break;
            }
        }
    }
    catch (error) {
        location.href = "error.html";
    }
};

async function send(server) {
    
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 100);

        const response = await fetch(backend + 'start?cmd=' + server)
        clearTimeout(timer);
        const text = await response.text();
        const btn = document.getElementById(server);

        if (text === 'running') {
            update();
        } else {
            location.href = "error.html";
        }
    }
    catch (error) {
        location.href = "error.html";
    }
};

async function stop(server) {
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 100);

        const response = await fetch(backend + 'stop?cmd=' + server)
        clearTimeout(timer);
        const text = await response.text();
        const btn = document.getElementById(server);
        
        if (text === 'stopped') {
            update();
        } else {
            location.href = "error.html";
        }
    }
    catch (error) {
        location.href = "error.html";
    }
};

update();
setInterval(update, 2000);