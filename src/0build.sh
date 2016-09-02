#!/bin/sh

pug CBDocumentation.pug -o ../
pug index.pug -o ../
pug OldCBDatabase.pug -o ../
pug LouCypherButtons.pug -o ../
pug StandAloneOldCBDatabaseDark.pug -o ../
pug StandAloneOldCBDatabaseLight.pug -o ../
pug StandAloneUnofficialDocsDark.pug -o ../
pug StandAloneUnofficialDocsLight.pug -o ../

