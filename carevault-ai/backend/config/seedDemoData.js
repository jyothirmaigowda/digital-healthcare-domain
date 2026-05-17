const fs = require("fs");
const path = require("path");

const User = require("../models/User");
const Record = require("../models/Record");

const uploadDir = path.join(__dirname, "../uploads");

const demoUsers = [
  {
    username: "patient1",
    password: "Patient@123",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    role: "patient",
  },
  {
    username: "patient2",
    password: "Patient@123",
    name: "Priya Mehta",
    email: "priya@example.com",
    role: "patient",
  },
  {
    username: "patient3",
    password: "Patient@123",
    name: "Rohit Verma",
    email: "rohit@example.com",
    role: "patient",
  },
  {
    username: "doctor1",
    password: "Doctor@123",
    name: "Dr. Neha Kapoor",
    email: "neha@hospital.com",
    role: "doctor",
  },
  {
    username: "doctor2",
    password: "Doctor@123",
    name: "Dr. Anil Patel",
    email: "anil@hospital.com",
    role: "doctor",
  },
];

const demoRecords = [
  {
    username: "patient1",
    title: "Complete Blood Count (CBC)",
    type: "Lab Report",
    date: "2026-04-20",
    doctor: "Dr. Neha Kapoor",
    filename: "demo-patient1-cbc.pdf",
    description:
      "Hemoglobin: 11.2 g/dL (Low). WBC: 11500/uL (slightly elevated). Platelet count: 150000. Patient reports fatigue and dizziness for 2 weeks. Possible iron deficiency anemia detected. Fasting glucose: 127 mg/dL (borderline high).",
  },
  {
    username: "patient1",
    title: "Diabetes Management Follow-up",
    type: "Prescription",
    date: "2026-04-12",
    doctor: "Dr. Neha Kapoor",
    filename: "demo-patient1-diabetes-followup.pdf",
    description:
      "HbA1c: 7.8%. Fasting blood sugar: 148 mg/dL. Blood pressure: 145/95 mmHg. Prescribed Metformin 500mg twice daily. Diet counseling advised. Patient complains of frequent urination and excessive thirst.",
  },
  {
    username: "patient1",
    title: "Chest X-Ray Report",
    type: "Radiology",
    date: "2026-04-01",
    doctor: "Apollo Radiology Dept",
    filename: "demo-patient1-chest-xray.pdf",
    description:
      "PA view chest X-Ray performed. Mild cardiomegaly noted. No acute consolidation or pleural effusion. Lung fields appear clear. Impression: mild cardiac enlargement, suggest echocardiography.",
  },
  {
    username: "patient2",
    title: "Thyroid Function Test (TFT)",
    type: "Lab Report",
    date: "2026-04-18",
    doctor: "Dr. Anil Patel",
    filename: "demo-patient2-thyroid.pdf",
    description:
      "TSH: 0.2 mIU/L (low, indicating hyperthyroidism). T3: 220 ng/dL (high). T4: 14.8 ug/dL (elevated). Patient reports weight loss, palpitations, heat intolerance. Diagnosed with hyperthyroidism.",
  },
  {
    username: "patient2",
    title: "Lipid Profile Test",
    type: "Lab Report",
    date: "2026-04-08",
    doctor: "City Diagnostics",
    filename: "demo-patient2-lipid-profile.pdf",
    description:
      "Total Cholesterol: 240 mg/dL (High). LDL: 165 mg/dL (High). HDL: 38 mg/dL (Low). Triglycerides: 210 mg/dL (High). Patient has family history of cardiac disease.",
  },
  {
    username: "patient3",
    title: "COVID-19 Vaccination",
    type: "Vaccination",
    date: "2026-01-21",
    doctor: "PHC Vaccination Centre",
    filename: "demo-patient3-vaccination.pdf",
    description:
      "Covishield second dose administered. No adverse reactions observed. Certificate issued. Vaccination complete. Booster due in 9 months.",
  },
  {
    username: "patient3",
    title: "Hospital Discharge Summary",
    type: "Discharge Summary",
    date: "2026-03-20",
    doctor: "Dr. Neha Kapoor",
    filename: "demo-patient3-discharge-summary.pdf",
    description:
      "Patient admitted with high fever, severe dehydration, dengue fever confirmed (NS1 antigen positive). Platelet count dropped to 65000. IV fluids administered. Patient recovered after 5 days.",
  },
];

const escapePdfText = text =>
  text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const createDemoPdf = record => {
  fs.mkdirSync(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, record.filename);
  if (fs.existsSync(filePath)) return fs.statSync(filePath).size;

  const lines = [
    "CareVault AI Demo Medical Record",
    `Patient: ${record.username}`,
    `Title: ${record.title}`,
    `Type: ${record.type}`,
    `Date: ${record.date}`,
    `Doctor: ${record.doctor}`,
    "",
    record.description,
  ];

  const textCommands = lines
    .map((line, index) => `BT /F1 12 Tf 50 ${760 - index * 20} Td (${escapePdfText(line)}) Tj ET`)
    .join("\n");

  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length ${Buffer.byteLength(textCommands)} >>
stream
${textCommands}
endstream
endobj
xref
0 6
0000000000 65535 f 
trailer
<< /Root 1 0 R /Size 6 >>
startxref
0
%%EOF
`;

  fs.writeFileSync(filePath, pdf);
  return Buffer.byteLength(pdf);
};

const seedDemoData = async () => {
  for (const user of demoUsers) {
    const existingUser = await User.findOne({ username: user.username });
    if (!existingUser) {
      await User.create(user);
    }
  }

  for (const record of demoRecords) {
    const size = createDemoPdf(record);
    const file = {
      originalName: record.filename,
      filename: record.filename,
      path: `/uploads/${record.filename}`,
      mimetype: "application/pdf",
      size,
      uploadDate: new Date(record.date),
    };

    const existingRecord = await Record.findOne({
      username: record.username,
      title: record.title,
      date: new Date(record.date),
    });

    if (existingRecord) {
      if (!existingRecord.file || !existingRecord.file.filename) {
        existingRecord.file = file;
        await existingRecord.save();
      }
      continue;
    }

    await Record.create({
      username: record.username,
      title: record.title,
      type: record.type,
      description: record.description,
      date: new Date(record.date),
      doctor: record.doctor,
      file,
    });
  }

  console.log("Demo users, records, and files are ready");
};

module.exports = seedDemoData;
