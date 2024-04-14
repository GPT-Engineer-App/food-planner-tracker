# food-planner-tracker

Foodtracker app composta da questi oggetti:
- Inventario
 1. Nome Alimento
 2. Quantità (g o cucchiaio o cucchiaino o fetta)
 3. Calorie per quantità indicata
 4. Macro (Carboidrati, Grassi, Proteine)
 5. Tag
- Giorni della settimana
1. Lunedì
2. Martedì
3. Mercoledì
4. Giovedì
5. Venerdì
6. Sabato
7. Domenica
- Pasti
1. Nome del pasto
2. Calorie per pasto
3. Macro per pasto (Carboidrati, Grassi, Proteine)


UI: 
- In alto a DX tasto "Aggiungi alimento" che apre un dialog che permette di aggiungere un alimento all'inventario, chiede come input: Nome alimento, quantità, Calorie, macro, TAG (menu a selezione, corrispondono ai "PASTI".
- Header composto dall'inventario; qui vengono inseriti gli alimenti aggiunti all'inventario come se fossero delle card. in alto all header ci sono i tags (PASTI), in maniera tale da poter filtrare l inventario velocemente.
- Componente Card "Alimento"; è Una card con nome alimento, Quantità modificabile e gli altri dati (CAL e Marco) invece cambiano in base a quanto viene modificata la quantità. presente il tasto "modifica alimento" per cambiare il rapporto tra CAL/MACRO/QUANTITà
Sotto l'inventario ci sta la tabella divisa in colonne (giorni) e righe (pasti). In alto a dx c'è un tasto "modifica" che apre un dialog che chiede il numero di pasti per giorno.

Descrizione:

Gestione dell'inventario alimentare:

Gli utenti devono poter inserire alimenti nel loro inventario, specificando per ciascuno le calorie e i macronutrienti per unità di misura selezionabile (grammi, fette, cucchiaini, cucchiai).
Pianificazione dei pasti:

Gli utenti devono poter indicare quante volte al giorno mangiano.

Trascinamento degli alimenti:

Gli utenti devono poter trascinare gli alimenti dal loro inventario direttamente nelle colonne dei giorni desiderati e righe dei pasti desiderati.
Devono poter modificare la quantità degli alimenti direttamente nella tabella e questa modifica deve riflettersi immediatamente nelle calorie e macro nel giorno e riga del pasto.

Calcolo automatico delle calorie e dei macronutrienti:

Ogni volta che un alimento viene aggiunto a una colonna e riga dei pasti, l'applicazione deve calcolare automaticamente le calorie e i macronutrienti totali per quel pasto e giorno.

Aggiornamento in tempo reale:

Gli utenti devono poter vedere in tempo reale quante calorie e macronutrienti hanno consumato per ciascun pasto e per l'intera giornata.

Interfaccia utente intuitiva:

L'applicazione deve avere un'interfaccia utente intuitiva e facile da navigare, con funzionalità drag-and-drop per il trascinamento degli alimenti e opzioni di modifica dell'inventario.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/food-planner-tracker.git
cd food-planner-tracker
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
