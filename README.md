# Göta Magic 2.0

Göta Magic är tillbaka! Denna gången på en helt ny nivå!

---

## För att köra projektet:

Installera först alla nödvändiga dependencies med:

### `npm install`

### Starta sedan upp servern genom att ange i terminalen:

#### `cd server`

och sedan

#### `npm start`

### Starta sedan upp klient-sidan genom att ange i en ny terminal:

#### `cd client`

och sedan

#### `npm start`

---

# Inloggningsuppgifter att testa med:

### Admin-konto: 

Anv: admin@gotamagic.se
Lösen: gotamagic123

### Vanligt användarkonto: 

Anv: user@gotamagic.se
Lösen: gotamagic123

... eller skapa ett eget konto och testa!

---

# Krav-spec

## G-krav:

### Avklarade:

#### Alla sidor skall vara responsiva. (G)
- Media queries och Grid från MUI

#### Arbetet ska implementeras med en React frontend och en Express backend. (G)
- Vi använder React frontend och Express backend

#### Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet G)
- Använde Lucid Chart

#### Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
- Företagsbeskrivning: Vårt mål är att tillhandahålla det mest väsäntliga för kompetativt magic-spelande i Göteborg. Dels genom att tillgodose väsentliga kort i butik, samt även att arrangera turneringar och andra trevliga tillställningar kring vårat favoritspel.

#### All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)
- Lagt in vissa resurser manuellt, och vissa via CRUD endpoints i vår Mongo Databas

#### Man ska kunna logga in som administratör i systemet (G)
- Vid inloggning görs en check om användaren är admin via `isAdmin: Boolean` på user

#### Inga Lösenord får sparas i klartext i databasen (G)
- Lösenord hashas med bcrypt

#### En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
- Tar hem all information som matas in an användaren i frontenden och skickar med ett objekt av detta. Sen POSTas detta till databasen och på servern uppdateras lagersaldot via en PUT endpoint.

#### Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
- Admin-sidan visar alla produkter med ett input-fält där man kan skriva i nytt lagersaldo och trycka på en knapp som kör en endpoint för uppdatering av saldot.

#### Administratörer ska kunna se en lista på alla gjorda beställningar (G)
- Ordrar mappas ut på admin sidan från databasen

#### Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
- Manuellt lagt till kategori(er) på produkterna i mongo databasen

#### Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
- Per default visas alla produkter, men man kan välja att endast se en kategori av prdukter i en dropdown-meny. Man filtrerar kategorin, jämför med produkternas kategori, och visar upp de som tillhör den

#### Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
- Gjort sedan innan

#### En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
- När en användare går till kassan görs en check med auth-middleware som kollar om det finns en user-cookie, om inte redirectas användaren till login-sidan (där man också kan enkelt kan klicka sig vidare till skapa-konto om man ej har konto)

#### Besökare ska kunna välja ett av flera fraktalternativ (G)
- Användare kan välja mellan Postnord, Earlybird, Instabox, Brevduva och Magic Shipping

#### Tillgängliga fraktalternativ ska vara hämtade från databasen (G)
- Hämtas från collection 'shippingmethods'

#### Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)
- Gjort sedan innan. 

### Ej avklarade:

---

## VG-krav:

### Avklarade:

### Ej avklarade:

• Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i
databasen (VG)\
• En administratör behöver godkännas av en tidigare administratör innan man kan logga
in fösta gången (VG)\
• Administratörer ska kunna markera beställningar som skickade (VG)\
• När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är
skickade eller inte (VG)\
• Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG)\
• Administratörer ska kunna lägga till och ta bort produkter (VG)\
• Backendapplikationen måste ha en fungerande global felhantering (VG)
