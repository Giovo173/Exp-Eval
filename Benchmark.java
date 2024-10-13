// File: Benchmark.java
import java.util.*;
import java.util.concurrent.TimeUnit;

public class Benchmark {

    // Define the sorting algorithms to benchmark
    private static final List<Sorter<Integer>> SORTERS = Arrays.asList(
            new BubbleSortUntilNoChange<>(),
            new BubbleSortWhileNeeded<>(),
            new QuickSortGPT<>(),
            new SelectionSortGPT<>()
    );

    // Define the names of the sorting algorithms for reporting
    private static final List<String> SORTER_NAMES = Arrays.asList(
            "BubbleSortUntilNoChange",
            "BubbleSortWhileNeeded",
            "QuickSortGPT",
            "SelectionSortGPT"
    );

    // Define array sizes for benchmarking
    private static final int[] ARRAY_SIZES = {1000, 5000};

    // Define the number of runs for each test to ensure reliability
    private static final int RUNS = 10;

    // Define types of data to sort
    private enum ArrayType {
        RANDOM,
        SORTED,
        REVERSE_SORTED
    }

    public static void main(String[] args) {
        // Map to store benchmarking results
        Map<String, Map<ArrayType, Map<Integer, List<Long>>>> results = new HashMap<>();

        // Initialize the results map
        for (int i = 0; i < SORTERS.size(); i++) {
            String sorterName = SORTER_NAMES.get(i);
            results.put(sorterName, new HashMap<>());
            for (ArrayType type : ArrayType.values()) {
                results.get(sorterName).put(type, new HashMap<>());
                for (int size : ARRAY_SIZES) {
                    results.get(sorterName).get(type).put(size, new ArrayList<>());
                }
            }
        }

        // Perform benchmarking
        for (int size : ARRAY_SIZES) {
            for (ArrayType type : ArrayType.values()) {
                // Generate the base array based on the type
                Integer[] baseArray = generateArray(size, type);

                for (int run = 0; run < RUNS; run++) {
                    for (int i = 0; i < SORTERS.size(); i++) {
                        String sorterName = SORTER_NAMES.get(i);
                        Sorter<Integer> sorter = SORTERS.get(i);

                        // Create a copy of the array to sort
                        Integer[] arrayToSort = Arrays.copyOf(baseArray, baseArray.length);

                        // Measure execution time
                        long startTime = System.nanoTime();
                        sorter.sort(arrayToSort);
                        long endTime = System.nanoTime();

                        long duration = endTime - startTime; // Duration in nanoseconds

                        // Store the result
                        results.get(sorterName).get(type).get(size).add(duration);
                    }
                }
            }
        }

        // Report the results
        reportResults(results);
    }

    /**
     * Generates an array of integers based on the specified type.
     *
     * @param size the size of the array
     * @param type the type of data in the array
     * @return the generated array
     */
    private static Integer[] generateArray(int size, ArrayType type) {
        Integer[] array = new Integer[size];
        Random rand = new Random();

        switch (type) {
            case RANDOM:
                for (int i = 0; i < size; i++) {
                    array[i] = rand.nextInt();
                }
                break;
            case SORTED:
                for (int i = 0; i < size; i++) {
                    array[i] = i;
                }
                break;
            case REVERSE_SORTED:
                for (int i = 0; i < size; i++) {
                    array[i] = size - i;
                }
                break;
        }

        return array;
    }

    /**
     * Reports the benchmarking results by calculating descriptive statistics.
     *
     * @param results the benchmarking results
     */
    private static void reportResults(Map<String, Map<ArrayType, Map<Integer, List<Long>>>> results) {
        for (String sorterName : SORTER_NAMES) {
            System.out.println("=== " + sorterName + " ===");
            for (ArrayType type : ArrayType.values()) {
                System.out.println("  Data Type: " + type);
                for (int size : ARRAY_SIZES) {
                    List<Long> timings = results.get(sorterName).get(type).get(size);
                    double average = timings.stream().mapToLong(Long::longValue).average().orElse(0.0);
                    double median = calculateMedian(timings);
                    double min = timings.stream().mapToLong(Long::longValue).min().orElse(0L);
                    double max = timings.stream().mapToLong(Long::longValue).max().orElse(0L);

                    System.out.printf("    Size: %6d | Avg: %8.2f ms | Median: %8.2f ms | Min: %8.2f ms | Max: %8.2f ms%n",
                            size,
                            nanosToMillis(average),
                            nanosToMillis(median),
                            nanosToMillis(min),
                            nanosToMillis(max));
                }
                System.out.println();
            }
            System.out.println();
        }
    }

    /**
     * Calculates the median of a list of longs.
     *
     * @param data the list of longs
     * @return the median value
     */
    private static double calculateMedian(List<Long> data) {
        List<Long> sorted = new ArrayList<>(data);
        Collections.sort(sorted);
        int n = sorted.size();
        if (n % 2 == 0) {
            return (sorted.get(n / 2 - 1) + sorted.get(n / 2)) / 2.0;
        } else {
            return sorted.get(n / 2);
        }
    }

    /**
     * Converts nanoseconds to milliseconds.
     *
     * @param nanos the time in nanoseconds
     * @return the time in milliseconds
     */
    private static double nanosToMillis(double nanos) {
        return nanos / 1_000_000.0;
    }
}
