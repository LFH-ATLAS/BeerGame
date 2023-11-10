## Docker
Hier liegen die docker-compose Dateien, die für das Ausführen über Docker nötig sind.
Dafür sind eine Docker Installation erforderlich und eine Kopie des Github Repositories auf dem Entwicklercomputer notwendig.
Für Docker gibt es sowohl die Unterscheidung in Development und Production.
In den Development Images sind alle Abhängigkeiten für die Entwicklung enthalten, wodurch die Images größer sind als die Production Images. Zudem wird kein nginx als Webserver verwendet, sondern der Webserver von NodeJS.

Zusätzlich können die Images entweder lokal gebaut werden oder von Docker Hub heruntergeladen werden.
Für die lokale kompilierung der Images müssen die local-* Dateien verwendet werden, für die Images von Docker Hub die remote-* Dateien.


### Lokale Installation

Hinweis: Die Images werden lokal gebaut und können daher einige Minuten dauern.

Um die Images lokal zu bauen muss folgendes eingegeben werden:
```
    docker compose -f docker-compose-local.yml build
```

Zum Starten des Stacks über die lokalen Images muss folgendes eingegeben werden:
```
    docker compose -f docker-compose-local.yml up -d
```

### Öffentliche Installation

Zum Starten des Stacks über die öffenlichen Images von Docker Hub muss folgendes eingegeben werden:
```
    docker compose -f docker-compose-remote.yml up -d
```