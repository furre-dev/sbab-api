import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import { generateBankRateData } from "./openai/generateBankRateData";
export async function scrapeBank(bank) {
    const response = await fetch(bank.url);
    const html = await response.text();
    const $ = cheerio.load(html);
    //Nordea 2, Skandia 2, SEB 5, Swedbank 1,
    const table = $("table").eq(bank.table_index - 1);
    const last_updated_text = bank.information_outside_table ? table.siblings().last().text() : null;
    const table_content = table.html() + "\n" + last_updated_text;
    if (table.length > 0) {
        const data = await generateBankRateData(table_content);
        return { bank_name: bank.bank_name, rates: data.rates };
    }
    else {
        return null;
    }
}
