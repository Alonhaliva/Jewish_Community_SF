function doGet(e) {
    return ContentService.createTextOutput(JSON.stringify({ "success": true, "message": "GET request received", "version": "v9000" }))
        .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    // If standalone, we need to open by ID, but wait, standalone scripts don't have an "active spreadsheet" by default unless bound.
    // CRITICAL: This is a standalone script (from `clasp create --type standalone`).
    // It is NOT bound to the user's sheet.
    // I need the Sheet ID.
    var sheetId = "1_Wl6mtu4gb0Z-wLRwWyQsJRxrLZXDV7YPpu_Cxh4thI"; // From user request
    var ss = SpreadsheetApp.openById(sheetId);

    var sheet = ss.getSheetByName("Talent Requests");

    // Create sheet if it doesn't exist
    if (!sheet) {
        sheet = ss.insertSheet("Talent Requests");
        sheet.appendRow(["Name", "Email", "Company", "Role", "Type", "Hiring For", "Timestamp"]);
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
        data.name,
        data.email,
        data.company,
        data.role,
        data.type,
        data.hiringFor,
        new Date().toISOString()
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "success": true, "version": "v9000" }))
        .setMimeType(ContentService.MimeType.JSON);
}
