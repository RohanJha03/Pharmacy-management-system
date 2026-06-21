import Medicine from "../models/Medicine.js";
import { logger } from "./logger.js";

const MEDICINES_SEED_DATA = [
  // TABLETS
  { 
    productName: "Paracetamol 650mg", 
    manufacturer: "GSK", 
    productCategory: "tablet", 
    mrp: 30.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Commonly used for reducing fever and providing fast relief from headaches, toothaches, cold symptoms, and muscle pain."
  },
  { 
    productName: "Ibuprofen 400mg", 
    manufacturer: "Abbott", 
    productCategory: "tablet", 
    mrp: 25.0, 
    discount: 5,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Non-steroidal anti-inflammatory drug (NSAID) used to relieve pain, swelling, inflammation, and stiffness."
  },
  { 
    productName: "Cetirizine 10mg", 
    manufacturer: "Cipla", 
    productCategory: "tablet", 
    mrp: 18.0, 
    discount: 8,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Antihistamine that treats allergy symptoms such as sneezing, runny nose, watery eyes, and hives."
  },
  { 
    productName: "Metformin 500mg", 
    manufacturer: "USV", 
    productCategory: "tablet", 
    mrp: 45.0, 
    discount: 12,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Oral diabetes medicine that helps control blood sugar levels in type 2 diabetes patients."
  },
  { 
    productName: "Atorvastatin 10mg", 
    manufacturer: "Lupin", 
    productCategory: "tablet", 
    mrp: 75.0, 
    discount: 15,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Statin medication used to prevent cardiovascular disease and lower lipids/cholesterol in the blood."
  },
  { 
    productName: "Pantoprazole 40mg", 
    manufacturer: "Alkem", 
    productCategory: "tablet", 
    mrp: 90.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Proton pump inhibitor (PPI) that decreases the amount of acid produced in the stomach to heal acid reflux."
  },
  { 
    productName: "Azithromycin 500mg", 
    manufacturer: "Pfizer", 
    productCategory: "tablet", 
    mrp: 120.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Macrolide-type antibiotic used to treat a wide variety of bacterial infections, especially respiratory infections."
  },
  { 
    productName: "Amlodipine 5mg", 
    manufacturer: "Sun Pharma", 
    productCategory: "tablet", 
    mrp: 22.0, 
    discount: 6,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Calcium channel blocker used to treat high blood pressure (hypertension) and chest pain (angina)."
  },
  { 
    productName: "Telmisartan 40mg", 
    manufacturer: "Glenmark", 
    productCategory: "tablet", 
    mrp: 68.0, 
    discount: 14,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Angiotensin II receptor antagonist used to treat high blood pressure and help protect kidneys from diabetes damage."
  },
  { 
    productName: "Glimepiride 2mg", 
    manufacturer: "Torrent", 
    productCategory: "tablet", 
    mrp: 55.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Medium-to-long acting sulfonylurea class drug used to control type 2 diabetes along with diet and exercise."
  },
  { 
    productName: "Clopidogrel 75mg", 
    manufacturer: "Sanofi", 
    productCategory: "tablet", 
    mrp: 85.0, 
    discount: 12,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Antiplatelet medication used to reduce the risk of heart disease and stroke in people at high risk."
  },
  { 
    productName: "Losartan 50mg", 
    manufacturer: "Zydus", 
    productCategory: "tablet", 
    mrp: 48.0, 
    discount: 8,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Blood pressure medication used to treat hypertension and decrease the risk of stroke in patients with heart issues."
  },
  { 
    productName: "Rosuvastatin 10mg", 
    manufacturer: "Sun Pharma", 
    productCategory: "tablet", 
    mrp: 135.0, 
    discount: 20,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Statin medication used to lower bad cholesterol (LDL), raise good cholesterol (HDL), and decrease triglycerides."
  },
  { 
    productName: "Montelukast 10mg", 
    manufacturer: "Cipla", 
    productCategory: "tablet", 
    mrp: 110.0, 
    discount: 15,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    description: "Leukotriene receptor antagonist used for the maintenance treatment of asthma and to relieve seasonal allergy symptoms."
  },

  // CAPSULES
  { 
    productName: "Amoxicillin 500mg", 
    manufacturer: "Novartis", 
    productCategory: "capsule", 
    mrp: 80.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60",
    description: "Penicillin-type antibiotic used to treat a wide variety of bacterial infections in the ear, nose, throat, or skin."
  },
  { 
    productName: "Omeprazole 20mg", 
    manufacturer: "Dr. Reddy's", 
    productCategory: "capsule", 
    mrp: 35.0, 
    discount: 5,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60",
    description: "Used to treat symptoms of gastroesophageal reflux disease (GERD) and other conditions caused by excess stomach acid."
  },
  { 
    productName: "Vitamin D3 60k UI", 
    manufacturer: "Cadila", 
    productCategory: "capsule", 
    mrp: 150.0, 
    discount: 18,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60",
    description: "High-potency Vitamin D3 supplement to improve bone density, calcium absorption, and boost general immunity."
  },
  { 
    productName: "Itraconazole 100mg", 
    manufacturer: "Janssen", 
    productCategory: "capsule", 
    mrp: 210.0, 
    discount: 25,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60",
    description: "Antifungal medication used to treat a variety of fungal infections, including nail, skin, and systemic fungal issues."
  },
  { 
    productName: "Multivitamin Gold Capsules", 
    manufacturer: "Apollo Life", 
    productCategory: "capsule", 
    mrp: 299.0, 
    discount: 20,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60",
    description: "Daily health supplement containing essential vitamins, minerals, and antioxidants to support overall vitality."
  },
  { 
    productName: "Carbonyl Iron & Folic Acid", 
    manufacturer: "Sun Pharma", 
    productCategory: "capsule", 
    mrp: 95.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60",
    description: "Hematinic capsules used to treat iron deficiency anemia and maintain healthy red blood cells during pregnancy."
  },
  { 
    productName: "Becosules Capsule", 
    manufacturer: "Pfizer", 
    productCategory: "capsule", 
    mrp: 40.0, 
    discount: 5,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60",
    description: "Vitamin B-complex with Vitamin C to treat vitamins deficiency, improve mouth ulcers, and maintain skin health."
  },

  // SYRUPS
  { 
    productName: "Cough Syrup Ascoril 100ml", 
    manufacturer: "Glenmark", 
    productCategory: "syrup", 
    mrp: 125.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=500&auto=format&fit=crop&q=60",
    description: "Expectorant cough syrup used to relieve congestion and ease chest tightness during acute bronchitis or cold."
  },
  { 
    productName: "Benadryl Cough Formula 150ml", 
    manufacturer: "Kenvue", 
    productCategory: "syrup", 
    mrp: 160.0, 
    discount: 8,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=500&auto=format&fit=crop&q=60",
    description: "Soothes dry tickly coughs and eases throat irritation. Provides quick relief from scratchy throat feelings."
  },
  { 
    productName: "Zincovit Syrup 200ml", 
    manufacturer: "Apex Labs", 
    productCategory: "syrup", 
    mrp: 145.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=500&auto=format&fit=crop&q=60",
    description: "Multivitamin and multimineral health syrup containing zinc to boost children's growth and general immunity."
  },
  { 
    productName: "Gelusil Antacid Liquid 200ml", 
    manufacturer: "Pfizer", 
    productCategory: "syrup", 
    mrp: 138.0, 
    discount: 5,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=500&auto=format&fit=crop&q=60",
    description: "Fast-acting relief from acidity, heartburn, and gas. Neutralizes excess stomach acid within minutes."
  },
  { 
    productName: "Lactulose Laxative 150ml", 
    manufacturer: "Abbott", 
    productCategory: "syrup", 
    mrp: 240.0, 
    discount: 12,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=500&auto=format&fit=crop&q=60",
    description: "Synthetic sugar used to treat chronic constipation by drawing water into the bowel to soften stools."
  },
  { 
    productName: "Crocin Suspension 60ml", 
    manufacturer: "GSK", 
    productCategory: "syrup", 
    mrp: 42.0, 
    discount: 5,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=500&auto=format&fit=crop&q=60",
    description: "Pediatric paracetamol suspension to reduce fever, teething pain, and mild aches in babies and kids."
  },

  // INJECTIONS
  { 
    productName: "Insulin Glargine 100 IU", 
    manufacturer: "Biocon", 
    productCategory: "injection", 
    mrp: 650.0, 
    discount: 15,
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=500&auto=format&fit=crop&q=60",
    description: "Long-acting human insulin analogue injection used to improve glycemic control in diabetes mellitus."
  },
  { 
    productName: "Ceftriaxone 1g Injection", 
    manufacturer: "Cipla", 
    productCategory: "injection", 
    mrp: 58.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=500&auto=format&fit=crop&q=60",
    description: "Cephalosporin antibiotic injection used to treat severe bacterial infections (meningitis, sepsis, joint infections)."
  },
  { 
    productName: "Diclofenac Sodium Injection", 
    manufacturer: "Troikaa", 
    productCategory: "injection", 
    mrp: 15.0, 
    discount: 0,
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=500&auto=format&fit=crop&q=60",
    description: "Fast-acting NSAID painkiller injection used in clinical emergencies to relieve severe post-operative pain or kidney stones."
  },
  { 
    productName: "Methylcobalamin 1500mcg Injection", 
    manufacturer: "Wockhardt", 
    productCategory: "injection", 
    mrp: 78.0, 
    discount: 12,
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=500&auto=format&fit=crop&q=60",
    description: "Vitamin B12 injection used to treat peripheral neuropathies, megaloblastic anemia, and vitamin deficiency."
  },

  // OINTMENTS
  { 
    productName: "Volini Pain Relief Gel 50g", 
    manufacturer: "Sun Pharma", 
    productCategory: "ointment", 
    mrp: 165.0, 
    discount: 15,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60",
    description: "Soothes back pain, joint pain, shoulder sprains, and sports injuries. Penetrates deep for fast cooling relief."
  },
  { 
    productName: "Betadine 10% Ointment 20g", 
    manufacturer: "Win-Medicare", 
    productCategory: "ointment", 
    mrp: 115.0, 
    discount: 5,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60",
    description: "Povidone-iodine antiseptic cream used to prevent and treat skin infections in minor cuts, scrapes, and burns."
  },
  { 
    productName: "Mupirocin 2% Cream 5g", 
    manufacturer: "Glenmark", 
    productCategory: "ointment", 
    mrp: 140.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60",
    description: "Topical antibacterial cream used to treat skin bacterial infections like impetigo or folliculitis."
  },
  { 
    productName: "Quadriderm RF Cream 10g", 
    manufacturer: "Fulford", 
    productCategory: "ointment", 
    mrp: 98.0, 
    discount: 8,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60",
    description: "Combination cream used to treat inflammatory skin conditions associated with fungal and bacterial infections."
  },

  // DROPS
  { 
    productName: "Tears Natural Eye Drops 10ml", 
    manufacturer: "Alcon", 
    productCategory: "drops", 
    mrp: 190.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500&auto=format&fit=crop&q=60",
    description: "Artificial tears eye drops designed to soothe burning, dry eyes, and irritation caused by screens or wind."
  },
  { 
    productName: "Otrivin Nasal Drops 10ml", 
    manufacturer: "GSK", 
    productCategory: "drops", 
    mrp: 96.0, 
    discount: 5,
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500&auto=format&fit=crop&q=60",
    description: "Nasal decongestant drops providing quick relief from a blocked nose due to common cold or allergies."
  },
  { 
    productName: "Waxsolve Ear Drops 10ml", 
    manufacturer: "Neon Pharma", 
    productCategory: "drops", 
    mrp: 75.0, 
    discount: 8,
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500&auto=format&fit=crop&q=60",
    description: "Wax softening drops formulated to dissolve hardened earwax build-up for easy and painless removal."
  },

  // PERSONAL CARE
  { 
    productName: "Dettol Antiseptic Liquid 500ml", 
    manufacturer: "Reckitt", 
    productCategory: "personal_care", 
    mrp: 230.0, 
    discount: 5,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60",
    description: "Concentrated antiseptic disinfectant liquid used for first aid, medical sanitation, and personal hygiene washing."
  },
  { 
    productName: "Sensodyne Fresh Mint Toothpaste 100g", 
    manufacturer: "GSK", 
    productCategory: "personal_care", 
    mrp: 195.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60",
    description: "Clinically proven toothpaste for sensitive teeth, providing 24/7 protection against temperature sensitivity."
  },
  { 
    productName: "Sebamed Baby Gentle Wash 200ml", 
    manufacturer: "Sebamed", 
    productCategory: "personal_care", 
    mrp: 450.0, 
    discount: 15,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60",
    description: "Soap-free ultra-mild baby wash formulated at pH 5.5 to support natural barrier function of baby's delicate skin."
  },
  { 
    productName: "Nivea Soft Moisturizer 200ml", 
    manufacturer: "Nivea", 
    productCategory: "personal_care", 
    mrp: 325.0, 
    discount: 20,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60",
    description: "Lightweight, non-greasy moisturizing cream enriched with Vitamin E and Jojoba Oil for soft, glowing skin."
  },

  // AYURVEDIC
  { 
    productName: "Himalaya Ashwagandha 60 Tabs", 
    manufacturer: "Himalaya", 
    productCategory: "ayurvedic", 
    mrp: 180.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=500&auto=format&fit=crop&q=60",
    description: "Herbal tablets designed to reduce stress levels, improve stamina, combat fatigue, and promote general wellness."
  },
  { 
    productName: "Dabur Chyawanprash 1kg", 
    manufacturer: "Dabur", 
    productCategory: "ayurvedic", 
    mrp: 425.0, 
    discount: 12,
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=500&auto=format&fit=crop&q=60",
    description: "Ancient ayurvedic formulation with amla and 40+ herbs to strengthen the immune system and increase daily energy."
  },
  { 
    productName: "Liv 52 DS Syrup 200ml", 
    manufacturer: "Himalaya", 
    productCategory: "ayurvedic", 
    mrp: 170.0, 
    discount: 5,
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=500&auto=format&fit=crop&q=60",
    description: "Double strength hepatoprotective herbal syrup to support liver function, improve appetite, and promote digestive health."
  },
  { 
    productName: "Patanjali Triphala Churna 100g", 
    manufacturer: "Patanjali", 
    productCategory: "ayurvedic", 
    mrp: 45.0, 
    discount: 0,
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=500&auto=format&fit=crop&q=60",
    description: "Traditional formulation of Amalaki, Bibhitaki, and Haritaki to relieve constipation and support digestive detox."
  },
  { 
    productName: "Dabur Honey 500g", 
    manufacturer: "Dabur", 
    productCategory: "ayurvedic", 
    mrp: 220.0, 
    discount: 15,
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=500&auto=format&fit=crop&q=60",
    description: "100% pure raw honey loaded with natural antioxidants. Can be used as a healthy sugar substitute."
  },

  // NUTRITION
  { 
    productName: "Horlicks Chocolate Delight 1kg", 
    manufacturer: "Unilever", 
    productCategory: "nutrition", 
    mrp: 499.0, 
    discount: 8,
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500&auto=format&fit=crop&q=60",
    description: "Nutritious health food drink powder for kids to support bone and muscle strength, growth, and focus."
  },
  { 
    productName: "Ensure Diabetes Care Vanilla 400g", 
    manufacturer: "Abbott", 
    productCategory: "nutrition", 
    mrp: 780.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500&auto=format&fit=crop&q=60",
    description: "Complete, balanced nutrition powder specifically designed for people with diabetes to manage blood glucose."
  },
  { 
    productName: "Protinex Original Powder 400g", 
    manufacturer: "Danone", 
    productCategory: "nutrition", 
    mrp: 620.0, 
    discount: 12,
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500&auto=format&fit=crop&q=60",
    description: "High-protein daily nutritional powder with 34% protein and essential vitamins to help build strength and energy."
  },
  { 
    productName: "Omega 3 Fish Oil 1000mg 60 Caps", 
    manufacturer: "HealthKart", 
    productCategory: "nutrition", 
    mrp: 549.0, 
    discount: 25,
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500&auto=format&fit=crop&q=60",
    description: "Rich source of EPA and DHA fatty acids to support joint mobility, brain function, and cardiovascular heart health."
  },
  { 
    productName: "Revital H Daily Health 30 Caps", 
    manufacturer: "Sun Pharma", 
    productCategory: "nutrition", 
    mrp: 330.0, 
    discount: 10,
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500&auto=format&fit=crop&q=60",
    description: "Daily health capsule enriched with Ginseng, 10 vitamins, and 9 minerals to build daily stamina and reduce stress."
  },

  // OTHERS / MEDICAL DEVICES
  { 
    productName: "Accu-Chek Active Test Strips 50s", 
    manufacturer: "Roche", 
    productCategory: "medical_device", 
    mrp: 975.0, 
    discount: 15,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500&auto=format&fit=crop&q=60",
    description: "Accurate blood glucose test strips for monitoring blood sugar levels. For use with Accu-Chek Active blood sugar monitor."
  },
  { 
    productName: "Dr. Trust Digital Thermometer", 
    manufacturer: "Dr. Trust", 
    productCategory: "medical_device", 
    mrp: 299.0, 
    discount: 30,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500&auto=format&fit=crop&q=60",
    description: "Quick-reading, highly accurate digital thermometer. Safe for kids and adults with clear fever alerts."
  },
  { 
    productName: "Omron BP Monitor Hem 7120", 
    manufacturer: "Omron", 
    productCategory: "medical_device", 
    mrp: 2450.0, 
    discount: 25,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500&auto=format&fit=crop&q=60",
    description: "Automated digital blood pressure monitor with one-touch operation. Measures blood pressure and pulse rate quickly."
  }
];

export const seedMedicines = async () => {
  try {
    const count = await Medicine.countDocuments();
    // Count is checked. If it is less than 10 or doesn't have the updated fields, re-seed.
    // Let's force re-seed if the existing entries do not have descriptions.
    const sample = await Medicine.findOne({});
    const needsReseed = !sample || !sample.description || count < 10;

    if (needsReseed) {
      logger.info(`Seeding/Re-seeding 55+ detailed pharmacy medicines with images and descriptions...`);

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

      // Clear all existing medicines to start clean
      await Medicine.deleteMany({});
      
      const inserted = await Medicine.insertMany(processedMedicines);
      logger.info(`Successfully seeded ${inserted.length} medicines into the database!`);
    } else {
      logger.info(`Database already has ${count} detailed medicines. Skipping seeding.`);
    }
  } catch (error) {
    logger.error({
      message: "Failed to seed medicines database",
      error: error.message,
      stack: error.stack
    });
  }
};
