/*

- ---CHECK--- - singular namn på namnen: router, controller, model
- CRUD metod framför URL:en ist för tex /api/get...
- filnamnen i resurs-mapparna: router, controller, model istället för user.router osv
- I koddiagram --> kopplingar mellan tex order- och product-controller-filer för uppdatering av lagersaldo
- speca schemat endast i ER-diagrammet, behövs ej i båda
- sätt kort-egenskaperna färg, cmc, expansion osv som icke-required i product-schemat ------ pris, namn osv blir required i schemat
- checkout är på front-end, varukorgen blir en order
- Den riktiga produkten (ej bara _id:t) ligger i ordern
- engelska i diagrammen
- mitten-kolumnen ska vara namn i ER, tex 'products' ist för product[]
- blanda ej stora och små bokstäver (var konsekvent)
- order borde ha hela frakt-objektet{}, inte bara kopplas med _id:t
- i ordern får produkten ett antal (kan defineras som antal i produkten som är inte required)

- Orderkontrollen kanske pratar med produktkontroller etc.
- kommer vi behöva uppdatera flera modeller
- Modeller kommer skapa modeller (+)
- innehåller i ert schema kan defineras i ER-diagrammet

*/