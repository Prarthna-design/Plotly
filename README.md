# Plotly Dashboard

In this assignment, I created n this assignment, you will build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

In this assignment Plotly was used to create an interactive Dash board!

The D3 library used to read into 'sample.json'.

Bar Chart was created using 'sample_values' as values, 'otu_ids' as labels and 'otu_labels" as hovertext for the chart."

Bubble Chart was created using 'otu_ids' for the x values, 'sample_values' for the y values and 'sample_values' as a marker size.

For Bubble Chart 'otu_ids' was used for the marker colors.

Again in  Bubble Chart 'otu_labels' was used for the text values.

Using Javascript code the  sample metadata was displayed on the Dashboard.

Dash board is designed to be interactive where user can choose any ID and all information for that ID updates on all charts and tables on the Dash Board.

The Gauge Chart was created to plot the weekly washing frequency of the individual.

The Guge Chart was modified to account for the values ranging from 0 through 9.

Guage Chart also updates whenever a new sample is selected. The needle moves as the frequency changes in data sample.

Finally, the dashboard was deployed on the web!
