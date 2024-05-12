"use server";

import mailer from "nodemailer";

export async function uploadData(data: any) {
    const transporter = mailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,
        secure: true,
        auth: {
            user: "management@stemec.org",
            pass: 'Z:9{kEq>A8;fs3wb5cv.7yaPJm~j"/S?',
        },
    });
    transporter.sendMail({
        from: "Beta Form mohamed.radi@stemec.org",
        to: "omar.yehia@stemec.org",
        subject: "Beta Form Submission",
        priority: "high",
        text: JSON.stringify(data),
    });
}
