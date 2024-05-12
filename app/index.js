const fs = require("fs");
const crypto = require("crypto");
const mailer = require("nodemailer");
const csvParse = require("csv-parse/sync");
const csvStringify = require("csv-stringify/sync");
const handlebars = require("handlebars");
const mjml2html = require("mjml");
const html2text = require("html-to-text");

const knownTemplate = handlebars.compile(
  fs.readFileSync("./data/known.mjml", "utf8")
);

const unknownTemplate = handlebars.compile(
  fs.readFileSync("./data/unknown.mjml", "utf8")
);

const env = JSON.parse(fs.readFileSync("./env.json", "utf8"));
const transporter = mailer.createTransport(env.email);

const members = csvParse.parse(fs.readFileSync("./data/guests.csv", "utf8"), {
  columns: true,
  trim: true,
  skipEmptyLines: true,
});

function sendEmail(guest) {
  return new Promise((resolve, reject) => {
    try {
      let mjml;
      if (`${guest.is_known}` === "1") {
        mjml = knownTemplate({ name: guest.name });
      } else {
        mjml = unknownTemplate({ name: guest.name });
      }
      const html = mjml2html(mjml).html;
      transporter.sendMail(
        {
          from: env.from,
          cc: env.cc,
          to: guest.email,
          subject: "Invitation as a Guest on Our Podcast: Cast.AI",
          priority: "high",
          mjml,
          html,
          text: html2text.convert(html),
        },
        (err, info) => {
          if (err || !info.messageId) return reject(err || info);
          resolve();
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

async function bootstrap() {
  // loop on the members
  for (const memberIndex in members) {
    const member = members[memberIndex];
    // skip in case of insufficient data
    if (!member.name || !member.email) {
      console.log(
        `Skipped ${member.name} <${member.email}>, guest has not sufficient data!`
      );
      continue;
    }
    // skip if sent
    if (member.sent) {
      console.log(
        `Skipped ${member.name} <${member.email}>, email already sent!`
      );
      continue;
    }
    // skip if not onside
    if (member.type !== "onsite") {
      console.log(
        `Skipped ${member.name} <${member.email}>, guest is not onsite!`
      );
      continue;
    }
    try {
      await sendEmail(member);
      members[memberIndex].sent = "YES";
      console.log(`Sent the Email to ${member.name} <${member.email}>`);
      console.log(
        `Finished ${parseInt(memberIndex) + 1} out of ${members.length}`
      );
    } catch (error) {
      // catch the error to save the result
      console.log(`Failed at ${member.name} <${member.email}>!`);
      console.log(error);
    }
    // save the result
    fs.writeFileSync(
      "./data/guests.csv",
      csvStringify.stringify(members, {
        header: true,
        columns: ["name", "email", "type", "is_known", "sent"],
      })
    );
  }
}

bootstrap();
