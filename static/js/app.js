var names = []
var metadata = []
var samples = []
d3.json('static/data/samples.json').then(function(data) {


    names = data.names;
    metadata = data.metadata;
    samples = data.samples;




    var dropDown = d3.select("#selDataset");
    names.forEach(name => {
        dropDown.append('option').property('value', name).text(name);
    });
    var dropDownValue = dropDown.property('value');

    displayDemographicInfo(dropDownValue);
    displayBarPlot(dropDownValue);
    displayGuagePlot(dropDownValue);
    displayBubblePlot(dropDownValue);

});

function optionChanged(value) {

    displayDemographicInfo(value);

    displayBarPlot(value);

    displayGuagePlot(value);

    displayBubblePlot(value);
}

function displayDemographicInfo(dropDownValue) {

    var demographicDivTag = d3.select('#sample-metadata');

    demographicDivTag.html("");

    var tableTag = demographicDivTag.append("table").classed("table table-striped", true);

    var filteredMetaData = metadata.filter(row => parseInt(row.id) === parseInt(dropDownValue))[0];

    Object.entries(filteredMetaData).forEach(([key, value]) => {
        var tableRow = tableTag.append('tr');
        tableRow.append('td').text(key + ':');
        tableRow.append('td').text(value).style('word-break', 'break-word');
    });
}


function displayBarPlot(dropDownValue) {
    // filter the data based on user selected drop down value
    var filteredSample = samples.filter(row => parseInt(row.id) === parseInt(dropDownValue))[0];
    // fetch the top 10 values
    var sample = filteredSample.sample_values.slice(0, 10);
    var otuLabel = filteredSample.otu_labels.slice(0, 10);
    var otuId = filteredSample.otu_ids.slice(0, 10);
    var reversedSample = sample.reverse();
    var reversedOtuLabel = otuLabel.reverse();
    var reversedOtuId = otuId.reverse().map(id => 'OTU ' + id);
    var barTrace = {
        x: reversedSample,
        y: reversedOtuId,
        text: reversedOtuLabel,
        type: 'bar',
        orientation: 'h'
    };
    var barData = [barTrace];
    var barLayout = {
        showlegend: false,
        xaxis: {
            title: "No. of Samples"
        },
        yaxis: {
            title: "OTU Ids"
        },
        title: "Top 10 OTUs for " + dropDownValue
    }
    Plotly.newPlot('bar', barData, barLayout);
}

function displayBubblePlot(dropDownValue) {

    // filter the data based on user selected drop down value
    var filteredSample = samples.filter(row => parseInt(row.id) === parseInt(dropDownValue))[0];

    // fetch the values
    var sample = filteredSample.sample_values;
    var otuLabel = filteredSample.otu_labels;
    var otuId = filteredSample.otu_ids;
    var opacity = sample.map(value => 0.75);

    var bubbleTrace = {
        x: otuId,
        y: sample,
        marker: {
            size: sample,
            color: otuId,
            opacity: opacity,
            colorscale: "Earth"
        },
        text: otuLabel,
        mode: 'markers',

    }
    var bubbleData = [bubbleTrace];
    var bubbleLayout = {
        showlegend: false,
        xaxis: {
            title: "OTU IDs"
        },
        yaxis: {
            title: "No. of Samples"
        },
        title: "All OTUs for " + dropDownValue
    }
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
}

// Function to calc gauge needle points
function gaugePointer(value) {


    var degrees = 180 - value;
    var radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: to create a triangle
    var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    return path;
}

function displayGuagePlot(dropDownValue) {
    // Update the Title for the chart with the user selected ID
    var guageTitle = d3.select('#gauge-heading-1');
    guageTitle.html(`<strong>Wash Frequency for Test Subject ID ${dropDownValue}</strong>`)

    var filteredMetaData = metadata.filter(row => parseInt(row.id) === parseInt(dropDownValue))[0];
    washFrequency = filteredMetaData.wfreq;

    var level = washFrequency * 180 / 9;

    var needleHeadTrace = {
        type: 'scatter',
        x: [0],
        y: [0],
        marker: { size: 18, color: '850000' },
        showlegend: false,
        text: washFrequency,
        name: 'Wash Frequency',
        hoverinfo: 'text+name'
    }

    var guageTrace = {
        type: 'pie',
        hole: .5,
        values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ' '],
        rotation: 90,
        textposition: 'inside',
        textinfo: 'text',
        labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ' '],
        hoverinfo: 'label',
        showlegend: false,
        marker: {
            colors: ['#00441b',
                '#006d2c',
                '#238b45',
                '#41ab5d',
                '#74c476',
                '#a1d99b',
                '#c7e9c0',
                '#e5f5e0',
                '#f7fcf5',
                '#ffffff'

            ]

        }
    }

    var gaugeData = [needleHeadTrace, guageTrace];

    var gaugeLayout = {
        shapes: [{
            type: 'path',
            path: gaugePointer(level),
            fillcolor: '850000',
            line: {
                color: '850000'
            }
        }],
        autosize: true,
        xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
        },
        yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
        },
        margin: {
            l: 0,
            r: 0,
            t: 0,
            b: 0
        }
    }
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);

}