const { Client } = require("@notionhq/client")

const notion = new Client({ auth: "foo" }) // Start with dummy auth just to check object structure

console.log("Client keys:", Object.keys(notion))
if (notion.databases) {
    console.log("Databases keys:", Object.keys(notion.databases))
} else {
    console.log("notion.databases is undefined")
}
