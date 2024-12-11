
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

def plot_boxplots(csv_file):
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(csv_file)

    # Get the base file name without the extension for output naming
    base_name = os.path.splitext(os.path.basename(csv_file))[0]

    # Iterate through the unique array sizes and sorting types
    for array_size in df['Array Size'].unique():
        for sorting_type in df['Sorting Type'].unique():
            # Filter the DataFrame for the current array size and sorting type
            df_filtered = df[(df['Array Size'] == array_size) & (df['Sorting Type'] == sorting_type)]

            # Create a box plot with seaborn
            plt.figure(figsize=(12, 8))  # Adjust figure size
            sns.set_theme(style="whitegrid")   # Set seaborn style
            ax = sns.boxplot(
                x='Sorter',
                y='Duration (ms)',
                data=df_filtered,
                hue='Sorter',
                showfliers=True,
                palette="Set3",
                dodge=False
            )

            # Set plot labels and title
            plt.xlabel('Sorter', fontsize=12)
            plt.ylabel('Duration (ms)', fontsize=12)
            plt.title(f'Sorting Performance for Array Size {array_size} ({sorting_type})', fontsize=14)

            # Rotate x-axis labels for better readability
            plt.xticks(rotation=45, ha='right', fontsize=10)

            # Adjust layout to prevent clipping of tick-labels
            plt.tight_layout()

            # Save the plot to a file with high resolution
            output_file = f"{base_name}_size_{array_size}_{sorting_type}_boxplot.png"
            plt.savefig(output_file, dpi=200)
            plt.close()

# Run the function
plot_boxplots('float_sort_results.csv')
plot_boxplots('integer_sort_results.csv')
plot_boxplots('double_sort_results.csv')

#%%
