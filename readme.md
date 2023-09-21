#   BeerGame

##  Lokale Installation für Entwickler
Für eine lokale Installation für die Entwicklung werden folgende Programme benötigt:
- Eine Entwicklungsumgebung (z. B. VS Code oder Webstorms)
- NodeJS
- Git für Windows/MacOS/Linux


### Installation der Entwicklungsumgebung

Es gibt zwei Möglichkeiten das Projekt zum Entwickeln zu starten.
Entweder es wird lokal über die Konsole ausgeführt oder über Docker Container.
Eine lokale Installation ist für die Entwicklung zu empfehlen, da die Änderungen direkt sichtbar sind und die Entwicklungsumgebung nicht so viel Ressourcen benötigt. 
Die Docker Container Variante ist dann zu empfehlen, sobald die Änderungen fertig sind und das Projekt auf einem Server deployed werden soll.

#### Lokale Installation

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

#### Docker Container

# Waaaaaas? Docker Container? Was ist das?
Docker ist eine Plattform, die es Entwicklern ermöglicht, Anwendungen in Containern zu erstellen, zu testen und bereitzustellen. Container sind eine Art von Virtualisierung, die es ermöglicht, Anwendungen in einer isolierten Umgebung auszuführen, die unabhängig von der zugrunde liegenden Infrastruktur ist. Docker bietet viele Vorteile, wie z.B. die Möglichkeit, Anwendungen schnell und einfach zu erstellen, zu testen und bereitzustellen, die Möglichkeit, Anwendungen in einer konsistenten Umgebung auszuführen, die unabhängig von der zugrunde liegenden Infrastruktur ist, und die Möglichkeit, Ressourcen effizienter zu nutzen, indem mehrere Anwendungen auf einem einzigen Host ausgeführt werden können.

Um die Docker Container zu starten muss Docker installiert sein.
Docker kann [hier](https://www.docker.com/products/docker-desktop) heruntergeladen werden.

Im Ordner [Docker](./Docker) befinden sich die Docker-Compose Dateien, die für das Starten der Container notwendig sind, sowie eine Readme Datei, die die Verwendung der Docker-Compose Dateien erklärt.



Viel Spaß beim Coden 🧑‍💻