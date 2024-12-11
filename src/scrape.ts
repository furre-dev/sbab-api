import { BankWithTableIndexType, scrapeBank } from "../utils/scrapeBank"
const fs = require("fs");

const banksWithTableIndexes: BankWithTableIndexType[] = [
  {
    bank_name: "Nordea",
    table_index: 2,
    url: "https://www.nordea.se/privat/produkter/bolan/bolanerantor.html",
    information_outside_table: false,
    img_url: "https://pbs.twimg.com/profile_images/729590013856382976/KEp-3zPj_400x400.jpg",
  },
  {
    bank_name: "SEB",
    table_index: 5,
    url: "https://seb.se/privat/tjanster/aktuella-rantor",
    information_outside_table: false,
    img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvfhDwZQbMQzwJ03LRudOsZW0bFaiuv3htYA&s",
  },
  {
    bank_name: "Swedbank",
    table_index: 1,
    url: "https://www.swedbank.se/privat/boende-och-bolan/bolanerantor.html",
    information_outside_table: true,
    img_url: "https://i.ibb.co/0YfYhWM/Group-4.jpg",
  },
  {
    bank_name: "Skandia",
    table_index: 2,
    url: "https://www.skandia.se/lana/bolan/bolanerantor/",
    information_outside_table: false,
    img_url: "https://i.ibb.co/Vp5MWg2/Group-5.jpg",
  },
]

async function main() {
  const results = await Promise.all(
    banksWithTableIndexes.map(async (data) => {
      const bank_mortgage = await scrapeBank(data);
      return bank_mortgage;
    })
  );

  const filePath = "./bankRates.json";
  fs.writeFileSync(filePath, JSON.stringify(results, null, 2));

  console.log("succesfully scraped data")
}

main();

