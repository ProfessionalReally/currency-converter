# 💱 Currency Converter

Single Page Application (SPA) for currency conversion with support for displaying and interacting with multiple currency
pairs simultaneously. Built with **React**, **TypeScript**, **MobX**.

![default_pages](https://github.com/user-attachments/assets/cb7529b8-fbc2-4e73-95f0-afd35b5e0298)


---

## 📌 Key Features

- 🔁 Default pairs: **RUB – USD**, **RUB – EUR**
- ➕ Add and remove custom currency pairs
- 💰 Interactive amount input with automatic conversion
- 🧠 Persist pairs state using localStorage
- ⚡ Cache currency rates (updated once per day)
- 🌐 Responsive UI with animations and currency icons

---

## 🧪 Technology Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [MobX](https://mobx.js.org/README.html)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [Fawaz Exchange Rate API](https://github.com/fawazahmed0/exchange-api)

## 🔗 Currency Rates API

The app uses the **[Fawaz Exchange Rate API](https://github.com/fawazahmed0/exchange-api)** — a free, open-source API
providing up-to-date currency exchange rates.  
The rates are sourced
from [https://latest.currency-api.pages.dev/v1/currencies/](https://latest.currency-api.pages.dev/v1/currencies/) based
on a base currency.

Since the data is updated only once per day, the app caches the currency rates locally and makes requests no more than
once per day, fetching rates only for the currencies currently in use.  
This approach optimizes performance and reduces unnecessary network calls.

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/ProfessionalReally/currency-converter.git

# 2. Navigate into the project directory
cd currency-converter

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
