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
...

# Umgebungsvariablen

Umgebungsvariablen für das Frontend werden für lokale Tests über eine .env Datei im Root-Verzeichnis des Projekts gesetzt.
Für die Verwendung im Produktivsystem werden die Umgebungsvariablen über die Docker-Compose Datei gesetzt.

## default.env Datei

Die default.env Datei beinhaltet die Standardwerte für die Umgebungsvariablen. 
Diese werden bei lokalen Tests verwendet.

Folgendes [Tutorial](https://github.com/kunokdev/cra-runtime-environment-variables) wurde genutzt.