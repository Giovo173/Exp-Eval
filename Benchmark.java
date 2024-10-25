// File: Benchmark.java

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;

public class Benchmark {

    private static final List<Sorter<Integer>> SORTERS = Arrays.asList(
            new BubbleSortUntilNoChange<>(),
            new BubbleSortWhileNeeded<>(),
            new QuickSortGPT<>(),
            new SelectionSortGPT<>()
    );

    private static final List<Sorter<Float>> FLOAT_SORTERS = Arrays.asList(
            new BubbleSortUntilNoChange<>(),
            new BubbleSortWhileNeeded<>(),
            new QuickSortGPT<>(),
            new SelectionSortGPT<>()
    );

    private static final List<Sorter<Double>> DOUBLE_SORTERS = Arrays.asList(
            new BubbleSortUntilNoChange<>(),
            new BubbleSortWhileNeeded<>(),
            new QuickSortGPT<>(),
            new SelectionSortGPT<>()
    );

    private static final List<String> SORTER_NAMES = Arrays.asList(
            "BubbleSortUntilNoChange",
            "BubbleSortWhileNeeded",
            "QuickSortGPT",
            "SelectionSortGPT"
    );

    private static final int[] ARRAY_SIZES = {1000, 5000, 10000};

    private static final int RUNS = 50;

    private enum sorting {
        RANDOM,
        SORTED,
        REVERSE_SORTED,
        ALL_EQUAL,
        BLOCK_SORTED
    }

    public static void main(String[] args) {
        //   name      sort type   array length    data
        Map<String, Map<sorting, Map<Integer, List<Long>>>> results = new HashMap<>();

        for (int i = 0; i < SORTERS.size(); i++) {

            String sorterName = SORTER_NAMES.get(i);
            results.put(sorterName, new HashMap<>());

            for (sorting type : sorting.values()) {

                results.get(sorterName).put(type, new HashMap<>());

                for (int size : ARRAY_SIZES) {

                    results.get(sorterName).get(type).put(size, new ArrayList<>());
                }
            }
        }

        for (int size : ARRAY_SIZES) {

            for (sorting type : sorting.values()) {

                Integer[] baseArray = generateIntArray(size, type);

                for (int run = 0; run < RUNS; run++) {

                    for (int i = 0; i < SORTERS.size(); i++) {

                        String sorterName = SORTER_NAMES.get(i);
                        Sorter<Integer> sorter = SORTERS.get(i);

                        Integer[] arrayToSort = Arrays.copyOf(baseArray, baseArray.length);

                        //measure
                        long startTime = System.nanoTime();
                        sorter.sort(arrayToSort);
                        long endTime = System.nanoTime();
                        long duration = endTime - startTime;

                        results.get(sorterName).get(type).get(size).add(duration);
                    }
                }
            }
        }

        //insert results into csv
        saveResultsToCsv(results, "integer_sort_results.csv");

        //clear result array after pritning
        results.clear();

        //sort float arrays
        for (int i = 0; i < FLOAT_SORTERS.size(); i++) {

            String sorterName = SORTER_NAMES.get(i);
            results.put(sorterName, new HashMap<>());

            for (sorting type : sorting.values()) {

                results.get(sorterName).put(type, new HashMap<>());

                for (int size : ARRAY_SIZES) {

                    results.get(sorterName).get(type).put(size, new ArrayList<>());
                }
            }
        }

        for (int size : ARRAY_SIZES) {

            for (sorting type : sorting.values()) {

                Float[] baseArray = generateFloatArray(size, type);

                for (int run = 0; run < RUNS; run++) {

                    for (int i = 0; i < SORTERS.size(); i++) {

                        String sorterName = SORTER_NAMES.get(i);
                        Sorter<Float> sorter = FLOAT_SORTERS.get(i);

                        Float[] arrayToSort = Arrays.copyOf(baseArray, baseArray.length);

                        //measure
                        long startTime = System.nanoTime();
                        sorter.sort(arrayToSort);
                        long endTime = System.nanoTime();
                        long duration = endTime - startTime;

                        results.get(sorterName).get(type).get(size).add(duration);
                    }
                }
            }
        }
        //insert results into csv
        saveResultsToCsv(results, "float_sort_results.csv");
        results.clear();

        //sort float arrays
        for (int i = 0; i < DOUBLE_SORTERS.size(); i++) {

            String sorterName = SORTER_NAMES.get(i);
            results.put(sorterName, new HashMap<>());

            for (sorting type : sorting.values()) {

                results.get(sorterName).put(type, new HashMap<>());

                for (int size : ARRAY_SIZES) {

                    results.get(sorterName).get(type).put(size, new ArrayList<>());
                }
            }
        }

        for (int size : ARRAY_SIZES) {

            for (sorting type : sorting.values()) {

                Double[] baseArray = generateDoubleArray(size, type);

                for (int run = 0; run < RUNS; run++) {

                    for (int i = 0; i < SORTERS.size(); i++) {

                        String sorterName = SORTER_NAMES.get(i);
                        Sorter<Double> sorter = DOUBLE_SORTERS.get(i);

                        Double[] arrayToSort = Arrays.copyOf(baseArray, baseArray.length);

                        //measure
                        long startTime = System.nanoTime();
                        sorter.sort(arrayToSort);
                        long endTime = System.nanoTime();
                        long duration = endTime - startTime;

                        results.get(sorterName).get(type).get(size).add(duration);
                    }
                }
            }
        }
        //insert results into csv
        saveResultsToCsv(results, "double_sort_results.csv");
    }

    /**
     * Generates an array of integers based on the specified type.
     *
     * @param size the size of the array
     * @param type the type of data in the array
     * @return the generated array
     */
    private static Integer[] generateIntArray(int size, sorting type) {
        Integer[] array = new Integer[size];
        Random rand = new Random();

        if (type == sorting.RANDOM) {
            for (int i = 0; i < size; i++) {
                array[i] = rand.nextInt();
            }
        } else if (type == sorting.SORTED) {
            for (int i = 0; i < size; i++) {
                array[i] = i;
            }
        } else if (type == sorting.REVERSE_SORTED) {
            for (int i = 0; i < size; i++) {
                array[i] = size - i;
            }
        } else if (type == sorting.ALL_EQUAL) {
            Arrays.fill(array, rand.nextInt());
        } else if (type == sorting.BLOCK_SORTED) {
            int blockSize = size / 4;

            for (int i = 0; i < size; i += blockSize) {
                Integer[] tmp = new Integer[blockSize];

                for (int j = 0; j < tmp.length; j++) {
                    tmp[j] = rand.nextInt(100);
                }
                Arrays.sort(tmp);

                System.arraycopy(tmp, 0, array, i, blockSize);
            }
        }
        return array;
    }

    /**
     * Generates an array of floating point numbers based on the type
     *
     * @param size the size of the array
     * @param type the type of the data in the array
     * @return the generated array
     */
    private static Float[] generateFloatArray(int size, sorting type) {
        Float[] array = new Float[size];
        Random rand = new Random();

        if (type == sorting.RANDOM) {
            for (int i = 0; i < size; i++) {
                array[i] = rand.nextFloat();
            }
        } else if (type == sorting.SORTED) {
            for (int i = 0; i < size; i++) {
                float j = rand.nextFloat();
                array[i] = j;
            }
            Arrays.sort(array);
        } else if (type == sorting.REVERSE_SORTED) {
            for (int i = 0; i < size; i++) {
                float j = rand.nextFloat();
                array[i] = j;
            }
            Arrays.sort(array, Collections.reverseOrder());
        } //fill array with
        else if (type == sorting.ALL_EQUAL) {
            Arrays.fill(array, rand.nextFloat());
        } //divide the array in 4 block, individually sort them and add to the array
        else if (type == sorting.BLOCK_SORTED) {
            int blockSize = size / 4;

            for (int i = 0; i < size; i += blockSize) {
                Float[] tmp = new Float[blockSize];

                for (int j = 0; j < tmp.length; j++) {
                    tmp[j] = rand.nextFloat();
                }
                Arrays.sort(tmp);

                System.arraycopy(tmp, 0, array, i, blockSize);
            }
        }
        return array;
    }

    /**
     * Generates an array of double precision numbers based on the type
     *
     * @param size the size of the array
     * @param type the type of the data in the array
     * @return the generated array
     */
    private static Double[] generateDoubleArray(int size, sorting type) {
        Double[] array = new Double[size];
        Random rand = new Random();

        if (type == sorting.RANDOM) {
            for (int i = 0; i < size; i++) {
                array[i] = rand.nextDouble();
            }
        } else if (type == sorting.SORTED) {
            for (int i = 0; i < size; i++) {
                double j = rand.nextDouble();
                array[i] = j;
            }
            Arrays.sort(array);
        } else if (type == sorting.REVERSE_SORTED) {
            for (int i = 0; i < size; i++) {
                double j = rand.nextDouble();
                array[i] = j;
            }
            Arrays.sort(array, Collections.reverseOrder());
        } //fill array with
        else if (type == sorting.ALL_EQUAL) {
            Arrays.fill(array, rand.nextDouble());
        } //divide the array in 4 block, individually sort them and add to the array
        else if (type == sorting.BLOCK_SORTED) {
            int blockSize = size / 4;

            for (int i = 0; i < size; i += blockSize) {
                Double[] tmp = new Double[blockSize];

                for (int j = 0; j < tmp.length; j++) {
                    tmp[j] = rand.nextDouble();
                }
                Arrays.sort(tmp);

                System.arraycopy(tmp, 0, array, i, blockSize);
            }
        }
        return array;
    }

    /**
     * Saves the benchmarking results to a CSV file.
     *
     * @param results the benchmarking results
     * @param fileName the name of the output CSV file
     */
    private static void saveResultsToCsv(Map<String, Map<sorting, Map<Integer, List<Long>>>> results, String fileName) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName))) {
            // Write CSV header
            writer.write("Sorter,Sorting Type,Array Size,Run Number,Duration (ms)");
            writer.newLine();

            // Iterate over results and write to the CSV
            for (String sorterName : SORTER_NAMES) {
                for (sorting type : sorting.values()) {
                    for (int size : ARRAY_SIZES) {
                        List<Long> timings = results.get(sorterName).get(type).get(size);
                        for (int run = 0; run < timings.size(); run++) {
                            long durationNanos = timings.get(run);
                            double durationMillis = nanosToMillis(durationNanos);
                            writer.write(String.format("%s,%s,%d,%d,%.2f", sorterName, type, size, run + 1, durationMillis));
                            writer.newLine();
                        }
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
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
    private static double nanosToMillis(long nanos) {
        return nanos / 1000000.0;
    }
}
