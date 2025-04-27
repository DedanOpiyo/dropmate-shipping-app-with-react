// Utility function to calculate Item Price
export default function calculatePrice(itemCategory, location) {
  switch (itemCategory) {
      case "Agricultural - Farming" :
      if(location === "Nairobi") {
        return 100 
      } else if(location === "Nakuru") {
        return 300
      } else if(location === "Eldoret") {
        return 500
      } else if(location === "Kisumu") {
        return 700
      } else if(location === "Mombasa") {
        return 1000
      }
    case "Agricultural - Livestock" :
      if(location === "Nairobi") {
        return 400
      } else if(location === "Nakuru") {
        return 800
      } else if(location === "Eldoret") {
        return 1100
      } else if(location === "Kisumu") {
        return 1200
      } else if(location === "Mombasa") {
        return 1600
      }
    case "Automobile" :
      if(location === "Nairobi") {
        return 100
      } else if(location === "Nakuru") {
        return 2000
      } else if(location === "Eldoret") {
        return 3100
      } else if(location === "Kisumu") {
        return 3600
      } else if(location === "Mombasa") {
        return 4000
      }
    case "Technology - Hardware" :
      if(location === "Nairobi") {
        return 400
      } else if(location === "Nakuru") {
        return 500
      } else if(location === "Eldoret") {
        return 600
      } else if(location === "Kisumu") {
        return 800
      } else if(location === "Mombasa") {
        return 1000
      }
    case "Household - Furniture" :
      if(location === "Nairobi") {
        return 1000
      } else if(location === "Nakuru") {
        return 1500
      } else if(location === "Eldoret") {
        return 1900
      } else if(location === "Kisumu") {
        return 2200
      } else if(location === "Mombasa") {
        return 2600
      }
    case "Clothes - Bales" :
      if(location === "Nairobi") {
        return 400
      } else if(location === "Nakuru") {
        return 800
      } else if(location === "Eldoret") {
        return 1100
      } else if(location === "Kisumu") {
        return 1200
      } else if(location === "Mombasa") {
        return 1600
      }
    default :
      if(location === "Nairobi") {
        return 500
      } else if(location === "Nakuru") {
        return 700
      } else if(location === "Eldoret") {
        return 1000
      } else if(location === "Kisumu") {
        return 1200
      } else if(location === "Mombasa") {
        return 1400
      }
  }
}
