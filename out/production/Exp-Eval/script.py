import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import glob
import os

def plot_boxplots(csv_file):
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(csv_file)

    # Convert 'Duration (ms)' to a numeric type if not already
    df['Duration (ns)'] = pd.to_numeric(df['Duration (ns)'], errors='coerce')

    # Get the base file name without the extension for output naming
    base_name = os.path.splitext(os.path.basename(csv_file))[0]

    # Set the plot style
    sns.set(style="whitegrid")

    # Iterate through the unique array sizes and sorting types
    for array_size in df['Array Size'].unique():
        for sorting_type in df['Sorting Type'].unique():
            # Filter the DataFrame for the current array size and sorting type
            df_filtered = df[(df['Array Size'] == array_size) & (df['Sorting Type'] == sorting_type)]

            # Create a box plot
            plt.figure(figsize=(12, 8))
            sns.boxplot(
                x='Sorter',
                y='Duration (ns)',
                data=df_filtered,
                showfliers=True  # Optionally, hide outliers
            )

            # Set plot labels and title
            plt.xlabel('Sorter')
            plt.ylabel('Duration (ns)')
            plt.title(f'Sorting Performance for Array Size {array_size} ({sorting_type})')
            plt.xticks(rotation=45)
            plt.legend(title='Sorter')

            # Save the plot to a file
            output_file = f"{base_name}_size_{array_size}_{sorting_type}_boxplot.png"
            plt.tight_layout()
            plt.savefig(output_file)
            plt.close()

# Iterate through all CSV files in the current directory
for csv_file in glob.glob("*.csv"):
    plot_boxplots(csv_file)

print("Box plots have been generated for all CSV files.")
