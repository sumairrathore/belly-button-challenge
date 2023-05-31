const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


function createChartsandMetadata(id) {
    d3.json(url).then(function (response) {
        // Separate the response 
        var metadata = response.metadata;
        var samples = response.samples;

        // Initialize the filter
        var singleMetadata = metadata.filter(info => info.id == id)[0];
        var singleSample = samples.filter(info => info.id == id)[0];

        // Create the variables 
        var sample_values = singleSample.sample_values;
        var otu_ids = singleSample.otu_ids;
        var otu_labels = singleSample.otu_labels;
    }
)}
