#   BeerGame

##  Lokale Installation für Entwickler
Für eine lokale Installation für die Entwicklung werden folgende Programme benötigt:
- Eine Entwicklungsumgebung (z. B. VS Code oder Webstorms)
- NodeJS
- Git für Windows/MacOS/Linux

Zum Starten des Frontends müssen die Abhängigkeiten geladen und installiert werden. Dazu muss in der Konsole folgender Befehl im aktuellen Order ausgeführt werden:

```
npm run install:frontend
```

Dasselbe gibt auch für das Backend:

```
npm run install:backend
```

Das Frontend kann nun mit folgendem Befehl gestartet werden:

```
npm run start:frontend
```

Beim Backend sind weitere Umgebungsvariablen notwendig, damit dieses gestartet werden kann. Die Datei [server.env.template](./server/server.env.template) bietet eine Vorlage dafür. Um diese zu nutzen muss die Datei Dupliziert werden und zu .env umbenannt werden. Sind alle Variablen richtig gesetzt kann das Backend ähnlich wie das Frontend mit folgendem Befehl gestartet werden:

```
npm run start:backend
```

Viel Spaß beim Coden 🧑‍💻