import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def plot_boxplot(csv_file, output_file):
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(csv_file)

    # Convert 'Duration (ms)' to a numeric type if not already
    df['Duration (ms)'] = pd.to_numeric(df['Duration (ms)'], errors='coerce')

    # Set the plot style
    sns.set(style="whitegrid")

    # Create a box plot
    plt.figure(figsize=(12, 8))
    sns.boxplot(
        x='Array Size',
        y='Duration (ms)',
        hue='Sorter',
        data=df,
        showfliers=False  # Optionally, hide outliers
    )

    # Set plot labels and title
    plt.xlabel('Array Size')
    plt.ylabel('Duration (ms)')
    plt.title('Sorting Algorithm Performance')
    plt.legend(title='Sorter')

    # Save the plot to a file
    plt.tight_layout()
    plt.savefig(output_file)
    plt.show()

# Example usage
plot_boxplot('integer_sort_results.csv', 'sorting_performance_boxplot.png')