## Docker
Hier liegen die docker-compose Dateien, die für das Ausführen über Docker nötig sind.
Dafür sind eine Docker Installation erforderlich und eine Kopie des Github Repositories auf dem Entwicklercomputer notwendig.
Für Docker gibt es sowohl die Unterscheidung in Development und Production.
In den Development Images sind alle Abhängigkeiten für die Entwicklung enthalten, wodurch die Images größer sind als die Production Images. Zudem wird kein nginx als Webserver verwendet, sondern der Webserver von NodeJS.

Zusätzlich können die Images entweder lokal gebaut werden oder von Docker Hub heruntergeladen werden.
Für die lokale kompilierung der Images müssen die local-* Dateien verwendet werden, für die Images von Docker Hub die remote-* Dateien.


### Lokale Installation

Zum Starten vom Development Setup muss folgendes eingegeben werden:
```
    docker compose -f local-development.yml up -d
```


Zum Starten vom Produktiven Setup muss folgendes eingegeben werden:
```
    docker compose -f local-production.yml up -d
```

### Remote Installation

Zum Starten vom Development Setup muss folgendes eingegeben werden:
```
    docker compose -f remote-development.yml up -d
```

Zum Starten vom Produktiven Setup muss folgendes eingegeben werden:
```
    docker compose -f remote-production.yml up -d
```