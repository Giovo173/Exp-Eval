// File: Benchmark.java
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

    private static final List<String> SORTER_NAMES = Arrays.asList(
            "BubbleSortUntilNoChange",
            "BubbleSortWhileNeeded",
            "QuickSortGPT",
            "SelectionSortGPT"
    );

    private static final int[] ARRAY_SIZES = {1000, 5000, 10000};

    private static final int RUNS = 10;

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

        reportResults(results);
        results.clear();
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

        reportResults(results);
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

        if(type == sorting.RANDOM){
            for (int i = 0; i < size; i++) {
                array[i] = rand.nextInt();
            }
        }
        else if(type == sorting.SORTED){
            for (int i = 0; i < size; i++) {
                array[i] = i;
            }
        }
        else if(type == sorting.REVERSE_SORTED){
            for (int i = 0; i < size; i++) {
                array[i] = size - i;
            }
        }
        else if(type == sorting.ALL_EQUAL){
            Arrays.fill(array, 5);
        }
        else if(type == sorting.BLOCK_SORTED){
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

        if(type == sorting.RANDOM){
            for (int i = 0; i < size; i++) {
                array[i] = rand.nextFloat();
            }
        }
        else if(type == sorting.SORTED){
            for(int i = 0; i < size; i++){
                float j = rand.nextFloat();
                array[i] = j;
            }
            Arrays.sort(array);
        }
        else if(type == sorting.REVERSE_SORTED){
            for(int i = 0; i < size; i++){
                float j = rand.nextFloat();
                array[i] = j;
            }
            Arrays.sort(array, Collections.reverseOrder());
        }
        else if(type == sorting.ALL_EQUAL){
            Arrays.fill(array, rand.nextFloat());
        }
        else if(type == sorting.BLOCK_SORTED){
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
     * Reports the benchmarking results by calculating descriptive statistics.
     *
     * @param results the benchmarking results
     */
    private static void reportResults(Map<String, Map<sorting, Map<Integer, List<Long>>>> results) {
        for (String sorterName : SORTER_NAMES) {
            System.out.println(sorterName);
            for (sorting type : sorting.values()) {

                System.out.println(" Data Type: " + type);
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
        return nanos / 1000000.0;
    }
}
