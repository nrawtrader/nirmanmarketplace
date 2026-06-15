export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string
  category: "cement" | "steel" | "construction-tips" | "guides";
  readTime: number; // minutes
  publishedAt: string;
  author: string;
  coverImage?: string;
  tags: string[];
}

export const blogs: Blog[] = [
  {
    id: "blog-1",
    slug: "opc-vs-ppc-cement-which-is-better",
    title: "OPC vs PPC Cement — Which One Should You Use?",
    excerpt: "Confused between OPC and PPC cement? This guide explains the key differences, where each type works best, and how to choose the right cement for your construction project.",
    category: "cement",
    readTime: 5,
    publishedAt: "2026-06-10",
    author: "Nirman Team",
    tags: ["cement", "OPC", "PPC", "construction basics"],
    content: `
      <h2>What is OPC Cement?</h2>
      <p>OPC stands for <strong>Ordinary Portland Cement</strong>. It is the most basic and widely used type of cement in construction. OPC comes in three grades:</p>
      <ul>
        <li><strong>OPC 33 Grade</strong> – Low strength, used for general plastering</li>
        <li><strong>OPC 43 Grade</strong> – Medium strength, used for masonry and general construction</li>
        <li><strong>OPC 53 Grade</strong> – Highest strength, used for RCC (columns, beams, slabs, foundations)</li>
      </ul>
      <p>OPC gains strength very quickly — it reaches about 70% of its final strength within 7 days. This makes it ideal when you need fast formwork removal.</p>

      <h2>What is PPC Cement?</h2>
      <p>PPC stands for <strong>Portland Pozzolana Cement</strong>. It is made by mixing OPC clinker with fly ash (15–35%). PPC is slower to gain strength initially but is more durable long-term.</p>
      <p>Key benefits of PPC:</p>
      <ul>
        <li>Better resistance to chemicals, salts, and sulphates</li>
        <li>Less heat generation during hydration (reduces cracking)</li>
        <li>Better workability — easier to apply for plastering</li>
        <li>More eco-friendly (uses fly ash waste)</li>
        <li>Slightly cheaper than OPC</li>
      </ul>

      <h2>Which Should You Use?</h2>
      <table>
        <thead><tr><th>Use Case</th><th>Recommended</th></tr></thead>
        <tbody>
          <tr><td>Foundations, columns, beams, slabs (RCC)</td><td>OPC 53</td></tr>
          <tr><td>Interior plastering</td><td>PPC</td></tr>
          <tr><td>Exterior plastering</td><td>PPC or OPC 43</td></tr>
          <tr><td>Waterproofing areas (bathrooms, roofs)</td><td>PPC</td></tr>
          <tr><td>Brick masonry and block work</td><td>PPC</td></tr>
          <tr><td>Roads and pavements</td><td>OPC 53</td></tr>
        </tbody>
      </table>

      <h2>Our Recommendation</h2>
      <p>For a typical house construction in J&K:</p>
      <ul>
        <li>Use <strong>UltraTech OPC 53</strong> for all structural RCC work — foundation, columns, beams, roof slab</li>
        <li>Use <strong>ACC Gold or Bangur PPC</strong> for plastering, brickwork, and external finishing</li>
      </ul>
      <p>This combination gives you the best strength and durability at an optimal cost.</p>
    `,
  },
  {
    id: "blog-2",
    slug: "how-much-cement-do-i-need-to-build-a-house",
    title: "How Much Cement Do You Need to Build a House? (With Calculator)",
    excerpt: "Planning to build a 1000 sq ft or 1500 sq ft home? Here's a simple breakdown of how many cement bags you'll need for each stage of construction — foundation, walls, plastering, and more.",
    category: "guides",
    readTime: 7,
    publishedAt: "2026-06-08",
    author: "Nirman Team",
    tags: ["cement", "quantity estimation", "house construction", "budget planning"],
    content: `
      <h2>Cement Consumption at Each Stage of Construction</h2>
      <p>Many homeowners ask: "How many bags of cement do I need to build my house?" The answer depends on the size, design, and quality of work. Here's a practical breakdown for a standard 1000 sq ft G+1 house:</p>

      <h2>Stage-wise Cement Requirements (1000 sq ft house)</h2>

      <h3>1. Foundation & Basement (PCC + RCC)</h3>
      <p>This includes Plain Cement Concrete (PCC) at the base and Reinforced Cement Concrete (RCC) for footings.</p>
      <p><strong>Approx. cement needed: 150–200 bags</strong></p>

      <h3>2. Columns & Beams (RCC)</h3>
      <p>Vertical columns and horizontal beams form the skeleton of the building. Use OPC 53 grade for maximum strength.</p>
      <p><strong>Approx. cement needed: 100–130 bags</strong></p>

      <h3>3. Roof Slab (RCC)</h3>
      <p>A 1000 sq ft slab of 4.5 inch thickness requires significant cement. Use M20 concrete (1:1.5:3 ratio).</p>
      <p><strong>Approx. cement needed: 200–250 bags</strong></p>

      <h3>4. Brick/Block Masonry</h3>
      <p>Cement mortar for laying bricks in walls. 1:6 ratio mortar is commonly used.</p>
      <p><strong>Approx. cement needed: 80–100 bags</strong></p>

      <h3>5. Plastering (Internal + External)</h3>
      <p>Internal walls typically use 1:4 or 1:6 mortar, external walls use 1:4.</p>
      <p><strong>Approx. cement needed: 150–200 bags</strong></p>

      <h3>6. Flooring (Tiles + Waterproofing)</h3>
      <p>Tile fixing mortar, waterproofing membrane, and levelling work.</p>
      <p><strong>Approx. cement needed: 50–80 bags</strong></p>

      <h2>Total Cement for 1000 sq ft House</h2>
      <p><strong>730–960 bags</strong> (roughly 800 bags as a practical estimate)</p>
      <p>At ₹360–400 per bag, total cement cost = approximately <strong>₹2.88 to ₹3.84 lakhs</strong></p>

      <h2>For a 1500 sq ft House</h2>
      <p>Multiply by 1.5 — you'll need approximately <strong>1100–1400 bags</strong></p>

      <h2>Pro Tips</h2>
      <ul>
        <li>Always buy 5–10% extra to account for wastage</li>
        <li>Store cement in a dry, elevated place — never on bare ground</li>
        <li>Use OPC 53 for all RCC structural work and PPC for plastering</li>
        <li>Don't mix cement from different batches or brands in the same pour</li>
      </ul>

      <p>Use our <a href="/calculator">Construction Cost Calculator</a> to get a personalized estimate for your project.</p>
    `,
  },
  {
    id: "blog-3",
    slug: "fe500-vs-fe550-tmt-bars-difference",
    title: "Fe500 vs Fe550D TMT Bars — What's the Difference?",
    excerpt: "When buying steel for construction, you'll see grades like Fe415, Fe500, Fe550D. This guide explains what these numbers mean and which grade is right for your home.",
    category: "steel",
    readTime: 5,
    publishedAt: "2026-06-05",
    author: "Nirman Team",
    tags: ["steel", "TMT bars", "Fe500", "Fe550D", "construction"],
    content: `
      <h2>What Do the Numbers Mean?</h2>
      <p>The "Fe" stands for iron (Ferrum in Latin), and the number represents the <strong>minimum yield strength</strong> of the steel in Megapascals (MPa).</p>
      <ul>
        <li><strong>Fe415</strong> — yields at 415 MPa (older standard, less common now)</li>
        <li><strong>Fe500</strong> — yields at 500 MPa (most widely used)</li>
        <li><strong>Fe550D</strong> — yields at 550 MPa, with enhanced ductility ("D")</li>
        <li><strong>Fe600</strong> — highest grade, used in bridges and heavy industrial structures</li>
      </ul>

      <h2>What is TMT?</h2>
      <p>TMT stands for <strong>Thermo-Mechanically Treated</strong>. The bars are passed through a water cooling system immediately after rolling, creating a hard outer layer (martensite) and a tough inner core (pearlite/bainite). This makes TMT bars both strong AND flexible — critical for earthquake resistance.</p>

      <h2>Fe500 vs Fe550D — Key Comparison</h2>
      <table>
        <thead><tr><th>Property</th><th>Fe500</th><th>Fe550D</th></tr></thead>
        <tbody>
          <tr><td>Yield Strength</td><td>500 MPa</td><td>550 MPa</td></tr>
          <tr><td>Tensile Strength</td><td>545 MPa</td><td>600 MPa</td></tr>
          <tr><td>Elongation (Ductility)</td><td>12%</td><td>16% (higher = better)</td></tr>
          <tr><td>Earthquake Resistance</td><td>Good</td><td>Excellent</td></tr>
          <tr><td>Cost</td><td>Lower</td><td>Slightly higher</td></tr>
          <tr><td>Best For</td><td>Standard residential</td><td>Multi-storey, seismic zones</td></tr>
        </tbody>
      </table>

      <h2>Which Grade for J&K Construction?</h2>
      <p>Jammu & Kashmir falls in <strong>Seismic Zone IV and V</strong> — among the highest earthquake risk zones in India. Our strong recommendation:</p>
      <ul>
        <li>Use <strong>Fe550D</strong> for all columns, beams, and foundations in multi-storey buildings</li>
        <li>Use <strong>Fe500</strong> for single-storey residential construction in lower-risk areas</li>
      </ul>
      <p>The "D" in Fe550D specifically indicates enhanced ductility — meaning the steel bends before it breaks, giving the structure time to withstand seismic shocks without sudden collapse.</p>

      <h2>Common Bar Diameters & Uses</h2>
      <table>
        <thead><tr><th>Diameter</th><th>Common Use</th></tr></thead>
        <tbody>
          <tr><td>8mm</td><td>Stirrups, distribution bars in slabs</td></tr>
          <tr><td>10mm</td><td>Slab main bars, mild loading</td></tr>
          <tr><td>12mm</td><td>Beams, lintels, general use</td></tr>
          <tr><td>16mm</td><td>Columns, heavy beams</td></tr>
          <tr><td>20mm</td><td>Heavy columns, industrial structures</td></tr>
          <tr><td>25mm–32mm</td><td>Commercial and industrial RCC</td></tr>
        </tbody>
      </table>
    `,
  },
  {
    id: "blog-4",
    slug: "how-to-store-cement-properly",
    title: "5 Rules for Storing Cement Properly — Avoid Wastage",
    excerpt: "Improper cement storage can make bags go bad within days. Follow these 5 simple rules to ensure your cement stays fresh and strong throughout your construction project.",
    category: "construction-tips",
    readTime: 3,
    publishedAt: "2026-06-02",
    author: "Nirman Team",
    tags: ["cement", "storage", "tips", "wastage prevention"],
    content: `
      <p>Many homebuilders lose thousands of rupees every year because cement bags go bad before use. Cement is highly sensitive to moisture — even the air's humidity can start the hardening process, ruining the entire bag.</p>

      <h2>Rule 1 — Never Store on Bare Ground</h2>
      <p>Always place cement bags on wooden planks or a raised platform, at least 15–20 cm above the floor. Ground moisture travels upward and destroys cement bags from the bottom. Use pallets or wooden battens arranged 10–15 cm apart.</p>

      <h2>Rule 2 — Keep Away from Walls</h2>
      <p>Leave at least 30 cm gap between cement bags and the walls. Walls absorb and release moisture — bags touching walls absorb this moisture and become lumpy.</p>

      <h2>Rule 3 — Stack Maximum 10 Bags High</h2>
      <p>Never stack more than 10 bags in a single column. Excessive weight at the bottom compresses the lower bags, which can cause pre-hydration and reduce strength. Rotate stock so older bags are used first (FIFO — First In, First Out).</p>

      <h2>Rule 4 — Cover with Waterproof Sheets</h2>
      <p>Always cover cement bags with waterproof polythene or tarpaulin sheets — top AND sides. Even if you store it indoors, humidity in the air can damage cement over time.</p>

      <h2>Rule 5 — Use Within 3 Months</h2>
      <p>Fresh cement bags must be used within 90 days of manufacture. After that, the strength drops:</p>
      <ul>
        <li>After 3 months: strength reduces by 20–30%</li>
        <li>After 6 months: strength reduces by 30–40%</li>
        <li>After 1 year: mostly unusable for structural work</li>
      </ul>
      <p>Always check the <strong>date of manufacture</strong> printed on the bag before purchasing. Don't accept bags older than 2 months.</p>

      <h2>Quick Test: Is Your Cement Still Good?</h2>
      <p>Take a pinch of cement and rub between your fingers. <strong>Good cement</strong> feels smooth and cool. If it feels rough, lumpy, or warm — it has already started hydrating and should not be used for structural work.</p>
    `,
  },
  {
    id: "blog-5",
    slug: "construction-cost-per-sqft-jammu-kashmir-2026",
    title: "Construction Cost Per Sq Ft in Jammu & Kashmir (2026 Guide)",
    excerpt: "Planning to build a house in J&K? Here's the complete 2026 breakdown of construction costs per square foot — material costs, labour rates, and total budget estimates.",
    category: "guides",
    readTime: 8,
    publishedAt: "2026-05-28",
    author: "Nirman Team",
    tags: ["construction cost", "Jammu Kashmir", "budget", "house construction", "2026"],
    content: `
      <h2>Overview</h2>
      <p>Building a house in Jammu & Kashmir in 2026 typically costs between <strong>₹1,800 to ₹2,800 per square foot</strong> depending on construction quality, location, and design. Here's a complete breakdown.</p>

      <h2>Cost Categories</h2>

      <h3>1. Material Costs (approx. 55–60% of total)</h3>
      <table>
        <thead><tr><th>Material</th><th>Rate</th><th>Share of Cost</th></tr></thead>
        <tbody>
          <tr><td>Cement (structural + finishing)</td><td>₹355–400/bag</td><td>12–15%</td></tr>
          <tr><td>Steel (TMT bars)</td><td>₹62,000–65,000/ton</td><td>18–22%</td></tr>
          <tr><td>Sand & Aggregate</td><td>₹1,800–2,100/ton</td><td>5–7%</td></tr>
          <tr><td>Bricks / Blocks</td><td>₹5,500–7,000 per 500 pcs</td><td>6–8%</td></tr>
          <tr><td>Paint & Finishing</td><td>₹3,200–4,200 per 20L</td><td>4–5%</td></tr>
          <tr><td>Tiles & Flooring</td><td>₹40–150/sq ft</td><td>5–8%</td></tr>
          <tr><td>Doors & Windows</td><td>₹8,000–25,000/unit</td><td>5–8%</td></tr>
        </tbody>
      </table>

      <h3>2. Labour Costs (approx. 30–35% of total)</h3>
      <table>
        <thead><tr><th>Work Type</th><th>Labour Rate</th></tr></thead>
        <tbody>
          <tr><td>Mason (Raj Mistri)</td><td>₹700–1,000/day</td></tr>
          <tr><td>Helper</td><td>₹400–600/day</td></tr>
          <tr><td>Carpenter</td><td>₹800–1,200/day</td></tr>
          <tr><td>Electrician</td><td>₹700–1,000/day</td></tr>
          <tr><td>Plumber</td><td>₹700–900/day</td></tr>
          <tr><td>Painter</td><td>₹600–900/day</td></tr>
        </tbody>
      </table>

      <h3>3. Design & Approval Costs (5–10%)</h3>
      <ul>
        <li>Architect fee: 2–5% of construction cost</li>
        <li>Structural engineer: ₹15,000–40,000 (one-time)</li>
        <li>Building approval & plan sanction fees vary by district</li>
      </ul>

      <h2>Total Estimated Budget</h2>
      <table>
        <thead><tr><th>House Size</th><th>Economy</th><th>Standard</th><th>Premium</th></tr></thead>
        <tbody>
          <tr><td>800 sq ft</td><td>₹14.4L</td><td>₹18L</td><td>₹22L</td></tr>
          <tr><td>1000 sq ft</td><td>₹18L</td><td>₹22.5L</td><td>₹28L</td></tr>
          <tr><td>1200 sq ft</td><td>₹21.6L</td><td>₹27L</td><td>₹33.6L</td></tr>
          <tr><td>1500 sq ft</td><td>₹27L</td><td>₹33.75L</td><td>₹42L</td></tr>
        </tbody>
      </table>

      <p><em>Note: These are estimates for 2026. Actual costs vary based on design complexity, site access, and local market rates.</em></p>

      <h2>Tips to Reduce Construction Cost Without Compromising Quality</h2>
      <ul>
        <li>Buy cement and steel in bulk — negotiate with your supplier for bulk discounts</li>
        <li>Don't compromise on structural materials (cement grade, steel grade) — save on finishes instead</li>
        <li>Plan construction during non-peak season (avoid summer festival season when labour rates are high)</li>
        <li>Use our <a href="/calculator">free Construction Calculator</a> to estimate material quantities accurately before buying</li>
      </ul>
    `,
  },
  {
    id: "blog-6",
    slug: "tmt-bar-weight-chart-all-sizes",
    title: "TMT Bar Weight Chart — 8mm to 32mm (All Sizes)",
    excerpt: "Quick reference chart for TMT bar weight per metre and per piece. Use this to calculate steel requirements and cost for your construction project.",
    category: "steel",
    readTime: 3,
    publishedAt: "2026-05-20",
    author: "Nirman Team",
    tags: ["steel", "TMT bars", "weight chart", "reference"],
    content: `
      <h2>TMT Bar Weight Per Metre</h2>
      <p>The weight of a TMT bar per metre can be calculated using this formula:</p>
      <p><strong>Weight (kg/m) = D² / 162</strong> — where D is diameter in mm</p>

      <h2>Standard TMT Bar Weight Chart</h2>
      <table>
        <thead>
          <tr>
            <th>Diameter</th>
            <th>Weight per metre (kg)</th>
            <th>Weight per 12m piece (kg)</th>
            <th>Pieces per ton</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>8mm</td><td>0.395 kg</td><td>4.74 kg</td><td>211 pcs</td></tr>
          <tr><td>10mm</td><td>0.617 kg</td><td>7.40 kg</td><td>135 pcs</td></tr>
          <tr><td>12mm</td><td>0.888 kg</td><td>10.66 kg</td><td>94 pcs</td></tr>
          <tr><td>16mm</td><td>1.580 kg</td><td>18.96 kg</td><td>53 pcs</td></tr>
          <tr><td>20mm</td><td>2.470 kg</td><td>29.64 kg</td><td>34 pcs</td></tr>
          <tr><td>25mm</td><td>3.858 kg</td><td>46.30 kg</td><td>22 pcs</td></tr>
          <tr><td>32mm</td><td>6.313 kg</td><td>75.76 kg</td><td>13 pcs</td></tr>
        </tbody>
      </table>
      <p><em>Note: Standard TMT bars come in 12-metre lengths. Weight may vary slightly by ±3% due to manufacturing tolerances.</em></p>

      <h2>How to Use This Chart</h2>
      <p><strong>Example:</strong> You need 50 pieces of 12mm TMT bars.</p>
      <ul>
        <li>Each 12m piece weighs 10.66 kg</li>
        <li>50 pieces × 10.66 = <strong>533 kg = 0.533 tons</strong></li>
        <li>At ₹62,000/ton → Cost = <strong>₹33,000</strong></li>
      </ul>

      <h2>Steel Requirement for Typical House Construction</h2>
      <table>
        <thead><tr><th>House Size</th><th>Steel Required</th><th>Approx. Cost</th></tr></thead>
        <tbody>
          <tr><td>600 sq ft (G+0)</td><td>2.5–3 tons</td><td>₹1.55–1.86L</td></tr>
          <tr><td>1000 sq ft (G+0)</td><td>4–5 tons</td><td>₹2.48–3.1L</td></tr>
          <tr><td>1000 sq ft (G+1)</td><td>7–9 tons</td><td>₹4.34–5.58L</td></tr>
          <tr><td>1500 sq ft (G+1)</td><td>10–13 tons</td><td>₹6.2–8.06L</td></tr>
        </tbody>
      </table>

      <p>Use our <a href="/calculator">Steel Calculator</a> for a precise estimate based on your house dimensions.</p>
    `,
  },
];

export const blogCategories = {
  cement: "Cement",
  steel: "Steel",
  "construction-tips": "Construction Tips",
  guides: "Guides & Estimates",
} as const;
