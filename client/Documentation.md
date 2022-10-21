# Beergame - Client-Dokumentation

Das Projekt nutzt das React-Framework als Client-Technologie. 

## Externe Technologien
- React-Framework
- Socket.IO

## Installation und Start des Projekts
Damit das Projekt gestartet werden kann, muss der richtige Ordner (client) angewählt sein. Sollte eine höhere Ordnerebene gewählt sein, ist der Wechsel des Ordners mit dem Befehl `cd client` möglich. 

### `npm install`
Dieser Befehl wird genutzt, um die benötigten Pakete von Drittanbietern zu installieren. Er ist Voraussetzung dafür, dass das Projekt selbst ausführbar ist. 

### `npm start`
Dieser Befehl wird genutzt, um das Projekt zu starten und den Aufruf im Browser (lokal, bzw. im Netzwerk) zu ermöglichen.

### `npm run build`
Dieser Befehl wird genutzt, um eine Produktivversion des Projekts zu erstellen. Hierbei wird im Ordner `/client` ein neuer Ordner `/build` angelegt. Der Inhalt kann auf einem Webserver bereitgestellt werden.

## Weitere (wichtige) Informationen
- In der Datei `.gitignore` werden Pfade und Dateien aufgelistet, die nicht auf GitHub hochgeladen werden sollen. 