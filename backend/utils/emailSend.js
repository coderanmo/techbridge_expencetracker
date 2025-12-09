const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const dataParserForItems = require("./dataParser");

function generatePDF(data) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 30 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));

    doc.fontSize(22).text("Your Expenses In Last One Month !!", {
      align: "center",
    });

    doc.moveDown();
    doc.fontSize(14);

    const tableTop = 100;
    doc.text("S.No", 50, tableTop);
    doc.text("Date", 120, tableTop);
    doc.text("Amount", 250, tableTop);
    doc.text("Category", 350, tableTop);

    let y = tableTop + 25;

    data.body.forEach((row) => {
      doc.text(row[0], 50, y);
      doc.text(row[1], 120, y);
      doc.text(row[2], 250, y);
      doc.text(row[3], 350, y);
      y += 25;
    });

    doc.text(`Total: ₹${data.total}`, { align: "right" });
    doc.end();
  });
}

async function sendEmailWithAttachment(recipient, items) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const body = dataParserForItems(items);
  const pdfBuffer = await generatePDF(body);

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: recipient,
    subject: "Expense Report for This Month",
    text: "Please find your expense report attached.",
    attachments: [
      {
        filename: "expense_report.pdf",
        content: pdfBuffer,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("MAIL ERROR:", error);
  }
}

module.exports = sendEmailWithAttachment;
