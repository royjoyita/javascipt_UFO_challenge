// from data.js
var tableData = data;

// YOUR CODE HERE!

// get table references or get all attributes  tbody
var tbody = d3.select("tbody");

// First clear out any existing data
function buildTable(data){
    tbody.html("");

    // Next loop through each object in the data
    // append a row and cell for each value in the row

    data.forEach(function(dataRow){
        var row = tbody.append("tr");

        // Loop through each field in the data row

        Object.values(dataRow).forEach(function(val){
            var cell = row.append("td");
            cell.text(val);

        })

    })
}

// Keep Track of all filters
var filters = {};
// Set filteredData to tableData
function filterTable(){
        let filteredData = tableData;

// Loop through all the filters and keep any data that matches filter values

    Object.entries(filters).forEach(function([key, value]){
        filteredData = filteredData.filter((row) => row[key] === value);
    })

    buildTable(filteredData);

}

function updateFilters(){
    // Save the elements, values and id of the filter was changed
    var changeElement = d3.select(this).select("input");
    var elementValue = changeElement.property("value");
    var filterID = changeElement.attr("id");

    // If a filter was entered then add that filterID and Value
    // to the 
    if(elementValue){
        filters[filterID] = elementValue;
    }
    else {
        delete filters[filterID];
    }

    filterTable()
}
        
// Attach an event to listen for changes to each filter

d3.selectAll(".filter").on("change", updateFilters);

// Build the table when the page loads

buildTable(tableData);
