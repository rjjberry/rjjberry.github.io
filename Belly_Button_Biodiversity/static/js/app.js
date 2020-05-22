function DrawBargraph(sampleId)
{
    console.log(`Calling DrawBargraph( ${sampleId})`);

    d3.json("samples.json").then((data) => 
{

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        };

        Plotly.newPlot("bar", barArray, barLayout);
});
}

function DrawBubblechart(sampleId)
{
    console.log(`Calling DrawBubblechart( ${sampleId})`);

    d3.json("samples.json").then((data) => 
{

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var bubbleData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bubble",
            mode: 'markers',
            marker: {
                color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                opacity: [1, 0.8, 0.6, 0.4],
                size: [40, 60, 80, 100]
              },
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        data = [bubbleData];

        var layout = {
            title: "Bubble Chart",
            backgroundColor: ['yellow', 'blue', 'red', 'green', 'orange'],
            borderColor: '#fff',
            margin: {t: 30, l: 150}
            
        };

        Plotly.newPlot("bubble", data, layout);
});

}

function DrawGauge(sampleId)
{
    console.log(`Calling DrawGauge( ${sampleId})`);
}

function ShowMetadata(sampleId)
{
    console.log(`Calling ShowMetadata( ${sampleId})`);

    d3.json("samples.json").then((data) => 
    {
    
            var metadata = data.metadata;
            var resultArray = metadata.filter(md => md.id == sampleId);
            var result = resultArray[0];
    
            var PANEL = d3.select("#sample-metadata");

            Object.entries(result).forEach(([key, value]) => {
                var textToShow = [key] + " : " + [value] + " " + parseInt(value);
                PANEL.append("h6").text(textToShow);
            });
    });
}

function optionChanged(newSampleId)
{
    console.log(`User selected ${newSampleId}`);

    DrawBubblechart(newSampleId);
    DrawBargraph(newSampleId);
    DrawGauge(newSampleId);
    ShowMetadata(newSampleId);
}

function InitDashboard()
{
    console.log("Initializing Dashboard");

    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {

        console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach((sampleId) => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        var sampleId = sampleNames[0];

        DrawBargraph(sampleId);
        DrawBubblechart(sampleId);
        DrawGauge(sampleId);
        ShowMetadata(sampleId);
    });

}

InitDashboard();
