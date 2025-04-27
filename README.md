# DropMate App

## Description
DropMate is daily dropshipping software that lets customers schedule a shipment and "border" into an ongoing shipment window. Shipping costs are predetermined(fixed) for all main cities. Through state persistance, users can interact with the app, navigating across border, drop log and about routes.


## User Stories
As a user, you can accomplish the following actions:
- view available shipment windows and their cut-off times.
So you can plan your drop-offs before the window closes.

- View drop logs including past, current, and upcoming shipments.
To keep track of your shipping history and future plans.

- Filter shipments by item category or location.
To quickly find what I’ve shipped or plan to ship.

- Navigate between Home, Services, and Dashboard routes while maintaining your current session state.
To ensure a seamless experience when exploring the app.

- View fixed shipping rates based on your city.
So you understand the cost without needing to calculate or guess.

- Search and select a company or brand by name.
To make informed choices about who delivers your items.

- Save your preferred shipping details for faster future bookings.
To avoid re-entering data every time.


## App structure

```
my-app/
│
├── backend/
│   ├── db.json
│   ├── package.json
│   └── server.js
│
├── src/
│   ├── components/
│   │   ├── DropOrder.jsx
│   │   ├── EditOrder.jsx
│   │   ├── OrderCard.jsx
│   │   ├── SettingsPanel.jsx
│   │   └── Signup.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Layout.jsx
│   │   ├── NoPage.jsx
│   │   └── Services.jsx
│   │
│   ├── provider/
│   │   └── Provider.jsx
│   │
│   ├── utility/
│   │   └── calculatePrice.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package-lock.json
├── package.json
├── tailwind.config.js
└── vite.config.js

```

Backend/base route url(deployed through [render.com](https://dashboard.render.com/)): https://dropmate-shipping-app-with-react.onrender.com

Frontend view/URL(deployed in vercel): https://dropmate-shipping-app-with-react.vercel.app/

## Data Schema

db.json file:
{
  "users": [],
  "dropOrder": [
    {
      "name": "Dedan",
      "userName": "dens",
      "userId": false,
      "location": "Nairobi",
      "item": "Maize",
      "itemCategory": "Agricultural - Farming",
      "window": "",
      "weight": "58",
      "company": "Easy Coach",
      "status": "in-progress",
      "subscribed": false,
      "dayFrequency": "",
      "price": 100,
      "submittetAt": "2025-04-25T20:03:05.601Z",
      "shipBy": "2025-04-26T20:04:32.416Z",
      "updatedAt": "2025-04-25T20:04:32.416Z",
      "id": 1
    }
  ],
  "services": [
    {
      "userId": "",
      "companyName": "Easy Coach",
      "name": "Shipping",
      "cost": "4000",
      "license": "1234567",
      "imageUrl": "https://images.unsplash.com/photo-1449247666642-264389f5f5b1?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "id": 1
    }
  ]
}


## An insight of how state is managed

Provider Component
The Provider component (in provider/Provider.jsx) centralizes the app’s state and provides it to child components via the React Context API. Here's what it does:

It sets up a context provider that wraps the app.

It passes down a value prop including:

providerValue – core state data

Fetching logic: fetchDropOrders, fetchServices

State updaters: updateOrder, deleteOrder

Service handlers: handleDelete

Theme state: darkMode, toggleDark

This centralizes all shared logic (like fetching and updating orders/services) and theme settings.

useTheContext function
Simplifies context access through useTheContext custom hook:

```
const useTheContext = () => {
    const contextValue = useContext(DropDetails)
    if (!contextValue) {
        throw new Error('useDropDetails must be used within DropDetailsProvider');
    } else {
        return contextValue
    }
}
```

This allows components to consume shared state/functions without drilling props.

## Conclusion
This application provides a seamless interface for managing shipment orders, designed with a user-first approach. Frontend uses Vite and Tailwind CSS, backend uses lightweight server.js and db.json. Users can do the following:

Book shipments within available time windows

Update or cancel existing orders

View a detailed shipment history

Add and manage shipment services

Filter shipments by item category or location

Search and select preferred shipping companies or brands

The architecture is modular and scalable, with centralized state and logic management through a Context Provider. This ensures consistent, efficient data flow and a smooth user experience throughout the application.