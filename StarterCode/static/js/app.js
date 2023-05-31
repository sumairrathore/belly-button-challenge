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

        // Create the variable for the gauge chart
        var wfreq = singleMetadata.wfreq;

        //bar layout
        var bar_data = [{
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).reverse().map(otu_id => `OTU ${otu_id}`),
            text: otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];

        var bar_layout = {
            title: 'Top 10 OTUs',
            xaxis: { title: 'Sample Values' }
        };

        //bubble data 
        var bubble_data = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values
            }
        }];

        var bubble_layout = {
            title: 'Sample Values by OTU ID',
            xaxis: { title: 'OTU ID' },
            yaxis: { title: 'Sample Values' }
        };

        // gauge data
        var gauge_data = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: 'Belly Button Washing Freq (Scrubs per Week)' },
            type: 'indicator',
            mode: 'gauge+number',
            gauge: {
                bar: { color: 'black' },
                axis: { range: [null, 9] },
                steps: [
                    { range: [0, 1], color: '#ff0000' },
                    { range: [1, 2], color: '#ff4000' },
                    { range: [2, 3], color: '#ff8000' },
                    { range: [3, 4], color: '#ffbf00' },
                    { range: [4, 5], color: '#ffff00' },
                    { range: [5, 6], color: '#bfff00' },
                    { range: [6, 7], color: '#80ff00' },
                    { range: [7, 8], color: '#40ff00' },
                    { range: [8, 9], color: '#00ff00' }
                ]
            }
        }];

        var gauge_layout = {
            width: 500,
            height: 400,
            margin: { t: 0, b: 0 }
        };

        //charts
        Plotly.newPlot('bar', bar_data, bar_layout);
        Plotly.newPlot('bubble', bubble_data, bubble_layout);
        Plotly.newPlot('gauge', gauge_data, gauge_layout);

        //demo data box
        var demo_data = d3.select('#sample-metadata');

        // Make sure to check that the demo data is empty
        demo_data.html('');
        console.log(singleMetadata);

        // the metadata output
        Object.entries(singleMetadata).forEach(([key, value]) => {
            demo_data.append('p').text(`${key}: ${value}`)
        });
    });
};

//rebuild chart on option change
function optionChanged(id) {
    console.log(`Updated site with new data from test subject: ${id}`);
    createChartsandMetadata(id);
};

// initialize the page with a default plot and also make the dropdown menu functional
function init() {
    // Use D3 to select the dropdown menu and append all options
    var dropdownMenu = d3.select("#selDataset");

    d3.json(url).then(function (response) {
        var names = response.names;
        names.forEach(name => {
            dropdownMenu.append('option').text(name).property('value', name)
        });
        createChartsandMetadata(names[0]);
    });
};

init();