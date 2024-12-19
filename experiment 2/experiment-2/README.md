# Experiment 2: camelCase vs kebab-case

Rossinelli Luca, Elisei Giovanni

The project contains the webapp and the results extracted from running the experiment
by 16 subjects. The results are stored in the _results_ folder.

To run the webapp open the experiment folder in the terminal and run the following commands:

- `npm install` to intall all the dependencies needed to run the webapp, namely:

  - React
  - Tailwindcss

- `npm start` to run the application, this should automatically open the webapp on start

## The experiment is carried out in 3 sections

1. _Information panel_: merely explains the procedure to the test subject
2. _Personal info form_: asks the subject for their name, age, gender and level of expertise (name is simply used to name the result file)
3. _Experiment section_: a sequence of 18 questions that the subject has to answer

At the end of the experiment, the personal results of the subject will be displayed together with `Save Results to CSV` button;
on click, this will download a .csv file on the computer, simply transfer the file in the _results_ folder.

Click on `Go Back` button to reset the experiment or `CTRL+C` in the terminal to stop the application.

## Running the script

The jupiter notebook sections should be run to perform all calculation on the obtained results.
This will produce both numerical and graphical results.
