import Medicine from "../models/Medicine.js";
import { logger } from "./logger.js";

const MEDICINES_SEED_DATA = [
  // TABLETS
  { productName: "Paracetamol 650mg", manufacturer: "GSK", productCategory: "tablet", mrp: 30.0, discount: 10 },
  { productName: "Ibuprofen 400mg", manufacturer: "Abbott", productCategory: "tablet", mrp: 25.0, discount: 5 },
  { productName: "Cetirizine 10mg", manufacturer: "Cipla", productCategory: "tablet", mrp: 18.0, discount: 8 },
  { productName: "Metformin 500mg", manufacturer: "USV", productCategory: "tablet", mrp: 45.0, discount: 12 },
  { productName: "Atorvastatin 10mg", manufacturer: "Lupin", productCategory: "tablet", mrp: 75.0, discount: 15 },
  { productName: "Pantoprazole 40mg", manufacturer: "Alkem", productCategory: "tablet", mrp: 90.0, discount: 10 },
  { productName: "Azithromycin 500mg", manufacturer: "Pfizer", productCategory: "tablet", mrp: 120.0, discount: 10 },
  { productName: "Amlodipine 5mg", manufacturer: "Sun Pharma", productCategory: "tablet", mrp: 22.0, discount: 6 },
  { productName: "Telmisartan 40mg", manufacturer: "Glenmark", productCategory: "tablet", mrp: 68.0, discount: 14 },
  { productName: "Glimepiride 2mg", manufacturer: "Torrent", productCategory: "tablet", mrp: 55.0, discount: 10 },
  { productName: "Clopidogrel 75mg", manufacturer: "Sanofi", productCategory: "tablet", mrp: 85.0, discount: 12 },
  { productName: "Losartan 50mg", manufacturer: "Zydus", productCategory: "tablet", mrp: 48.0, discount: 8 },
  { productName: "Rosuvastatin 10mg", manufacturer: "Sun Pharma", productCategory: "tablet", mrp: 135.0, discount: 20 },
  { productName: "Montelukast 10mg", manufacturer: "Cipla", productCategory: "tablet", mrp: 110.0, discount: 15 },

  // CAPSULES
  { productName: "Amoxicillin 500mg", manufacturer: "Novartis", productCategory: "capsule", mrp: 80.0, discount: 10 },
  { productName: "Omeprazole 20mg", manufacturer: "Dr. Reddy's", productCategory: "capsule", mrp: 35.0, discount: 5 },
  { productName: "Vitamin D3 60k UI", manufacturer: "Cadila", productCategory: "capsule", mrp: 150.0, discount: 18 },
  { productName: "Itraconazole 100mg", manufacturer: "Janssen", productCategory: "capsule", mrp: 210.0, discount: 25 },
  { productName: "Multivitamin Gold Capsules", manufacturer: "Apollo Life", productCategory: "capsule", mrp: 299.0, discount: 20 },
  { productName: "Carbonyl Iron & Folic Acid", manufacturer: "Sun Pharma", productCategory: "capsule", mrp: 95.0, discount: 10 },
  { productName: "Becosules Capsule", manufacturer: "Pfizer", productCategory: "capsule", mrp: 40.0, discount: 5 },

  // SYRUPS
  { productName: "Cough Syrup Ascoril 100ml", manufacturer: "Glenmark", productCategory: "syrup", mrp: 125.0, discount: 10 },
  { productName: "Benadryl Cough Formula 150ml", manufacturer: "Kenvue", productCategory: "syrup", mrp: 160.0, discount: 8 },
  { productName: "Zincovit Syrup 200ml", manufacturer: "Apex Labs", productCategory: "syrup", mrp: 145.0, discount: 10 },
  { productName: "Gelusil Antacid Liquid 200ml", manufacturer: "Pfizer", productCategory: "syrup", mrp: 138.0, discount: 5 },
  { productName: "Lactulose Laxative 150ml", manufacturer: "Abbott", productCategory: "syrup", mrp: 240.0, discount: 12 },
  { productName: "Crocin Suspension 60ml", manufacturer: "GSK", productCategory: "syrup", mrp: 42.0, discount: 5 },

  // INJECTIONS
  { productName: "Insulin Glargine 100 IU", manufacturer: "Biocon", productCategory: "injection", mrp: 650.0, discount: 15 },
  { productName: "Ceftriaxone 1g Injection", manufacturer: "Cipla", productCategory: "injection", mrp: 58.0, discount: 10 },
  { productName: "Diclofenac Sodium 75mg Injection", manufacturer: "Troikaa", productCategory: "injection", mrp: 15.0, discount: 0 },
  { productName: "Methylcobalamin 1500mcg Injection", manufacturer: "Wockhardt", productCategory: "injection", mrp: 78.0, discount: 12 },

  // OINTMENTS
  { productName: "Volini Pain Relief Gel 50g", manufacturer: "Sun Pharma", productCategory: "ointment", mrp: 165.0, discount: 15 },
  { productName: "Betadine 10% Ointment 20g", manufacturer: "Win-Medicare", productCategory: "ointment", mrp: 115.0, discount: 5 },
  { productName: "Mupirocin 2% Cream 5g", manufacturer: "Glenmark", productCategory: "ointment", mrp: 140.0, discount: 10 },
  { productName: "Quadriderm RF Cream 10g", manufacturer: "Fulford", productCategory: "ointment", mrp: 98.0, discount: 8 },

  // DROPS
  { productName: "Tears Natural Eye Drops 10ml", manufacturer: "Alcon", productCategory: "drops", mrp: 190.0, discount: 10 },
  { productName: "Otrivin Nasal Drops 10ml", manufacturer: "GSK", productCategory: "drops", mrp: 96.0, discount: 5 },
  { productName: "Waxsolve Ear Drops 10ml", manufacturer: "Neon Pharma", productCategory: "drops", mrp: 75.0, discount: 8 },

  // PERSONAL CARE
  { productName: "Dettol Antiseptic Liquid 500ml", manufacturer: "Reckitt", productCategory: "personal_care", mrp: 230.0, discount: 5 },
  { productName: "Sensodyne Fresh Mint Toothpaste 100g", manufacturer: "GSK", productCategory: "personal_care", mrp: 195.0, discount: 10 },
  { productName: "Sebamed Baby Gentle Wash 200ml", manufacturer: "Sebamed", productCategory: "personal_care", mrp: 450.0, discount: 15 },
  { productName: "Nivea Soft Moisturizer 200ml", manufacturer: "Nivea", productCategory: "personal_care", mrp: 325.0, discount: 20 },

  // AYURVEDIC
  { productName: "Himalaya Ashwagandha 60 Tabs", manufacturer: "Himalaya", productCategory: "ayurvedic", mrp: 180.0, discount: 10 },
  { productName: "Dabur Chyawanprash 1kg", manufacturer: "Dabur", productCategory: "ayurvedic", mrp: 425.0, discount: 12 },
  { productName: "Liv 52 DS Syrup 200ml", manufacturer: "Himalaya", productCategory: "ayurvedic", mrp: 170.0, discount: 5 },
  { productName: "Patanjali Triphala Churna 100g", manufacturer: "Patanjali", productCategory: "ayurvedic", mrp: 45.0, discount: 0 },
  { productName: "Dabur Honey 500g", manufacturer: "Dabur", productCategory: "ayurvedic", mrp: 220.0, discount: 15 },

  // NUTRITION
  { productName: "Horlicks Chocolate Delight 1kg", manufacturer: "Unilever", productCategory: "nutrition", mrp: 499.0, discount: 8 },
  { productName: "Ensure Diabetes Care Vanilla 400g", manufacturer: "Abbott", productCategory: "nutrition", mrp: 780.0, discount: 10 },
  { productName: "Protinex Original Powder 400g", manufacturer: "Danone", productCategory: "nutrition", mrp: 620.0, discount: 12 },
  { productName: "Omega 3 Fish Oil 1000mg 60 Caps", manufacturer: "HealthKart", productCategory: "nutrition", mrp: 549.0, discount: 25 },
  { productName: "Revital H Daily Health 30 Caps", manufacturer: "Sun Pharma", productCategory: "nutrition", mrp: 330.0, discount: 10 },

  // OTHERS / MEDICAL DEVICES
  { productName: "Accu-Chek Active Test Strips 50s", manufacturer: "Roche", productCategory: "medical_device", mrp: 975.0, discount: 15 },
  { productName: "Dr. Trust Digital Thermometer", manufacturer: "Dr. Trust", productCategory: "medical_device", mrp: 299.0, discount: 30 },
  { productName: "Omron Hem 7120 BP Monitor", manufacturer: "Omron", productCategory: "medical_device", mrp: 2450.0, discount: 25 }
];

export const seedMedicines = async () => {
  try {
    const count = await Medicine.countDocuments();
    if (count < 10) {
      logger.info(`Database has only ${count} medicines. Seeding 55+ standard pharmacy medicines...`);

      // Pre-calculate price for each record since pre-save hooks aren't run on insertMany
      const processedMedicines = MEDICINES_SEED_DATA.map((item) => {
        const mrp = Number(item.mrp || 0);
        const discount = Number(item.discount || 0);
        const price = mrp - (mrp * discount) / 100;
        
        // Expiry date set to 2 years from now
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 2);

        return {
          ...item,
          price: Number(price.toFixed(2)),
          expiryDate
        };
      });

      // Clear whatever low-count medicines exist to avoid duplicate index errors
      await Medicine.deleteMany({});
      
      const inserted = await Medicine.insertMany(processedMedicines);
      logger.info(`Successfully seeded ${inserted.length} medicines into the database!`);
    } else {
      logger.info(`Database already has ${count} medicines. Skipping seeding.`);
    }
  } catch (error) {
    logger.error({
      message: "Failed to seed medicines database",
      error: error.message,
      stack: error.stack
    });
  }
};
