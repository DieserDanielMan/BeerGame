# Beergame - Server-Dokumentation (Backend)

Das Backend nutzt NodeJS als Technologie.

## Externe Technologien
- NodeJS
- Socket.IO
- Mongoose
- Dotenv

## Installation und Start des Projekts (lokal)
Damit das Projekt gestartet werden kann, muss der richtige Ordner (server) angewählt sein. Sollte eine höhere Ordnerebene gewählt sein, ist der Wechsel des Ordners mit dem Befehl `cd server` möglich. 

### `npm install`
Dieser Befehl wird genutzt, um die benötigten Pakete von Drittanbietern zu installieren. Er ist Voraussetzung dafür, dass das Projekt selbst ausführbar ist. 

### `npm start` oder `node index.js`
Dieser Befehl wird genutzt, um das Projekt zu starten und den Aufruf durch das Frontend (Client) zu ermöglichen.

## Installation und Start des Projekts auf einem Server (Ubuntu 22.04. LTS)
```diff
ACHTUNG:
Ein Server der produktiv im Internet arbeitet, sollte immer abgesichert werden.
```
1. Verbindung zum Server herstellen (Putty, SSH).
2. Sofern Erstinstallation:
    1. Ausführen der Befehle `sudo apt-get update` und `sudo apt-get upgrade`
    2. Installieren von NodeJS und NPM mit `sudo apt-get install nodejs npm -y`
3. Upload der Dateien auf den Server (z.B. mit WinSCP)
4. Installation der benötigten Pakete (auf Projektebene) mit `npm install`
5. Ausführen des Servers mit dem Befehl `node index.js` oder `npm start`

## Weitere (wichtige) Informationen
- In der Datei `.gitignore` werden Pfade und Dateien aufgelistet, die nicht auf GitHub hochgeladen werden sollen.