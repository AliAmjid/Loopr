# Bodový systém
Stránka plní funkci přehledu a úpravy klasifikace žáků v daném předmětu.

Na stránce se nachází horní lišta, která obsahuje název rozkliklého předmětu, filtr zobrazení hodnocení a tlačítko `přidat test` pro vytvoření nového testu. <br>
Pod ní tabulka rozdělena do 3 částí.

### První část
První část obsahuje jména a příjmení žáků. <br>
### Druhá část
Druhá část jsou vytvořené testy a jejich hodnocení rozdělené na body a procenta. <br>
Test lze upravit pomocí `ikony tužky` v jeho hlavičce, kde se také nachází jeho jméno, datum vytvoření a počet maximálně získatelných bodů.
### Třetí část
Třetí část je celkové hodnocení, čili výsledky ze všech testů, rozdělené do třech sloupců - počet bodů, procenta a výsledná známka odpovídající hodnotě nastavené v `převodníku bodů`. <br>
`Převodník bodů` lze otevřít pomocí `ikony tužky` pod textem `výsledná známka`. <br>
Ve sloupci `výsledná známka` se nachází pro každý stupěň známky jedna barva, pro větší přehlednost. <br>
![](images/grading-colors.png)
![](images/grading.png)

## Převodník bodů
Okno obsahuje 5 textových polí, ve kterých si je možné nastavit spodní hranici pro odpovídající známku.
![](images/grading-converter.png)

## Přidat test/Upravit test
Otevře se okno s listem žáků a textovými poli pro zapsaní jejich bodů. Nad listem se nachází pole pro zadání maximálního počtu bodů. Ve hlavičce se dále nachází informace o názvu testu, datu vytvoření a předmětu, ve kterém je test vytvářen. Název lze upravit pomocí `ikony tužky` a celý test odstranit pomocí `ikony koše`. Pro jednodušší pohyb mezi testy v případě upravování testů, lze použít `ikony šipek`.
![](images/grading-addtest.png)
