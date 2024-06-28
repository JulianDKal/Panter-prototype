## Abstract
Die Website ist ein Prototyp für die Seite des Projekts **Panter** (Publishing Analytics Tracker). Das ist eine öffentlich zugängliche Seite, auf der man gut aufbereitete, aktuelle Informationen über den Open Access Markt abrufen und auch den eigenen Bestand (für z.B. Bibliotheken interessant) dahingehend analysieren können soll.

## Einleitung
**Panter** etabliert einen zuverlässigen, öffentlich zur Verfügung stehenden Monitor für Finanzierungsmodelle, Preise und Preisentwicklungen auf dem Open-Access Zeitschriftenmarkt. Das Fehlen von diesem Angebot aktuell noch ein Hindernis für die weitere Verbreitung des Open-Access Marktes. Das Gesamtzielt ist die Entwicklung eines datenbankgestützten Webservices, der es wissenschaftlichen Akteursgruppen ermöglicht, aktuelle und historische Preise für Artikel in Open-Access-Zeitschriften zu ermitteln und zu vergleichen. Dabei wird jedoch auch ein Fokus auf Personalisierung gelegt. Das ist vor allem für Institutionen interessant, die ihre eigenen Bestände analysieren und erweitern wollen. Diese Seite soll ein erster Prototyp sein und Visualisierungen für einen (sehr abgespeckten) Datensatz darstellen sowie ein erster Vorschlag für das potenzielle Design sein. 

## Grundlagen
Die Vergleichsgrundlage bilden auf der Seite bilden verschiedene Kenngrößen von Open-Access und nicht Open-Access Zeitschriften. Aufgrund der Limitiertheit der uns zur Verfügung stehenden Daten gibt es folgende fünf Vergleichsgrößen:

1. **APC Preis** - Article Processing Charge ist der Preis der von den Autor:innen verlangt wird, um ihre Werke in einem Open Access Journal zu veröffentlichen
2. **Themenbereich (Sektion)** - Der grobe Themenbereich, dem sich ein Journal oder Fachzeitschrift unterordnet. Z.B. Mathematik, Chemie etc. 
3. **Lizenz** - Die Creative Commons Lizenz, unter der eine Fachzeitschrift bzw. ein Journal veröffentlicht wurde
4. **Veröffentlichungsmodell** - Wurde das Journal Open Access, nur Subscription basiert oder mit einem Mischmodell veröffentlicht. Mehr Informationen zu den verschiedenen Veröffentlichungsmethoden [hier](https://guides.library.cornell.edu/openaccess)
5. **Verlag** - Der Verlag, unter dem das Journal veröffentlicht wurde. In unserem Datensätze haben wir Daten des Verlags "Springer Nature" und des Verlags "Wiley" verglichen. 

## Eigenes Konzept
Die Seite ist vier große Teilbereiche eingeteilt: 
1. **Landing Page** - Die Übersichtsseite, von der man sich anmeldet sowie auf die anderen Teilseiten findet. Enthält auch das Impressum und allgemeine Infos.
2. **Kosten/Marktanalyse** - Eine Seite, auf der sich Daten über den gesamten Open-Access Markt visualisert und aufbereitet finden und sich analysieren lassen. 
3. **Portfolio** - Enthält alle relevanten Daten über den Bestand einer Institution und lässt das mit potenziellen zukünftigen Deals vergleichen. Gibt Einblicke über alle Entwicklungen im eigenen Bestand. 
4. **Filterung/Suche** - Vor allem für Privatpersonen interessant. Lässt nach spezifischen Journals und Themenbereichen suchen und die Zeitschriften auf dem Open-Access Markt auf vielfältige Weise filtern. 

## Umsetzung 
Die Website nutzt das Web-Framework **Angular**. Es wurde kein CSS-Framework eingesetzt. Aufgrund fehlender Zeit war es uns leider nur möglich, die Landing-Page und eine prototypische Version der Portfolio Seite umzusetzen. Die Navigation auf die verschiedenen Seiten funktioniert über das in Angular integrierte Routing System, es handelt sich also um eine Single Page Application. 
Es lagen Daten für zwei Deals mit den Verlägen *Wiley* und *Springer Nature* in Form von CSV-Dateien vor. Für das auslesen der CSV-Dateien haben wir den csv-Parser **Papa Parse** (https://www.papaparse.com/) genutzt. Für die Erstellung der Graphen auf der Seite wurde die JavaScript Version von Plot.ly (https://plotly.com/javascript/) verwendet. Genauer haben ist es die Plot.ly Angular Komponente, die ein fertiges html template für Graphen zur Verfügung stellt(https://github.com/plotly/angular-plotly.js). Da Angular TypeScript nutzt, haben wir eigene Typen definiert, um Parsen mit Papa Parse möglich zu machen und die Erstellung von Graphen (Charts) übersichtlicher zu gestalten. Fast alle selbstdefinierten Typen finden sich in der Datei *custom-types.d.ts*. Es gibt außerdem Klassendefinitionen für verschiedene Charttypen, zu finden in der Datei `Chart.ts` Das Parsen der Daten wird von zwei Services übernommen (zu finden im Ordner `src/app/services`): dem **csv-service** und dem **data-service**. Ersterer macht nichts anderes als die Dateien auszulesen und in dem von Papa Parse spezifzierten Format weiter an den Data-Service zu schicken. Jedes mal, wenn er mit einer Datei fertig ist, wird ein Event getriggered und der Data-Service beginnt mit der Verarbeitung der entsprechenden Daten. Der Data-Service packt alle relevanten Daten in in Arrays ein, die dann später in den Komponenten für die Erstellung von Graphen genutzt werden können. Er wird dann in die entsprechenden Komponenten über das Dependency Injection Feature von Angular injected. 
Die Komponente, die alle Graph-Objekte enthält, ist die **Portfolio-Component**. Da der Data-Service injected wird, kann sie dessen Objekte direkt nutzen. Dann werden die Daten mit von uns geschriebenen Funktionen für die Graphen aufbereitet und die Graphenobjekte nach den von uns definierten Typen generiert. Für das tatsächliche rendern des Graphen ist die **chart-element component** verantwortlich. Sie enthält das html template, welches von der importierten Plotly Angular Komponente bereitgestellt wird. Dieser Komponente werden von den Parent Componentes verschiedene Parameter übergeben, um das erstellen der Parameter dynamisch zu machen. Der Rest ist reguläres html und CSS und nutzt einige Features von Angular, wie z.B. die eingebauten Directives. 
Da einige Benennungen über die Dateien hinweg nicht konsistent waren, mussten wir die CSV-Dateien teilweise bearbeiten um eine sinnvolle Darstellung zu gewährleisten. 

## Fazit
Die Webseite funktioniert gut und es gibt keine auffallenden Bugs, die die User experience stören. Auch die Aufteilung auf die verschiedenen Komponenten hat gut funktioniert und es gab bei der Entwicklung nur sehr selten Konflikte. Die Seite ist jedoch nicht wirklich responsive. Viele Werte sind noch hardcoded und sehen deswegen auf anderen Bildschirmformaten weniger gut aus als auf anderen. Hier hätte sich wahrscheinlich die frühzeitige Einbindung es CSS-Frameworks angeboten. Wir haben uns jedoch dagegen entschieden, da es für uns noch zusätzlicher Lernaufwand gewesen wäre. Für die Größe der Anwendung funktioniert das Design noch recht gut, würde man jedoch mehr Graphen bauen wollen würde es sehr unübersichtlich werden. Die Graphendefinitionen sollten auf jeden Fall nicht alle in der Portfolio Komponente stehen. Perspektivisch wäre es sinnvoll, noch zusätzliche Services zu erstellen, die z.B. die Graphen in einer JSON Datei übersichtlich abspeichern und dann schnell wieder abrufen können. Insgesamt ist die Entwicklung jedoch nach kleinen anfänglichen Schwierigkeiten gut gelaufen und es gab keine nicht lösbaren Hindernisse. 

## Angular Hinweise
### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

