package in.arogya.common.numberseries;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Redis-backed atomic sequence generator for hospital-scoped number series.
 * Falls back to in-memory AtomicLong sequences if Redis is unreachable.
 *
 * Generates codes like:
 *   OP-2026-000001  (OPD visit number)
 *   IP-2026-001234  (IPD admission number)
 *   UHID-MH-001     (Patient UHID)
 *   BILL-2026-00099 (Bill number)
 *
 * Key format: number_series:{hospitalId}:{seriesKey}:{year}
 * Reset strategy: each series resets on new year automatically.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NumberSeriesService {

    private final StringRedisTemplate redisTemplate;
    private final ConcurrentHashMap<String, AtomicLong> localFallback = new ConcurrentHashMap<>();

    /**
     * Generate the next code in a series.
     *
     * @param hospitalId  UUID of the hospital
     * @param seriesKey   Key like "OP", "IP", "BILL", "UHID"
     * @param prefix      Human-readable prefix e.g. "OP", "BILL"
     * @param padding     Total digits in the sequence part, e.g. 6 → 000001
     * @param yearInKey   Whether to include the year in the key and output
     */
    public String next(String hospitalId, String seriesKey, String prefix,
                       int padding, boolean yearInKey) {
        String year = String.valueOf(Year.now().getValue());
        String redisKey = buildRedisKey(hospitalId, seriesKey, yearInKey ? year : null);

        Long seq = null;
        try {
            seq = redisTemplate.opsForValue().increment(redisKey);
        } catch (Exception e) {
            log.warn("Redis unavailable for NumberSeries, using in-memory sequence: {}", e.getMessage());
            seq = localFallback.computeIfAbsent(redisKey, k -> new AtomicLong(0)).incrementAndGet();
        }

        if (seq == null) seq = 1L;

        String seqFormatted = String.format("%0" + padding + "d", seq);

        if (yearInKey) {
            return prefix + "-" + year + "-" + seqFormatted;
        } else {
            return prefix + "-" + seqFormatted;
        }
    }

    /**
     * Generate next with year included (most common case).
     */
    public String next(String hospitalId, String seriesKey, String prefix, int padding) {
        return next(hospitalId, seriesKey, prefix, padding, true);
    }

    /**
     * Preview the current value without incrementing.
     */
    public long current(String hospitalId, String seriesKey) {
        String year = String.valueOf(Year.now().getValue());
        String redisKey = buildRedisKey(hospitalId, seriesKey, year);
        try {
            String value = redisTemplate.opsForValue().get(redisKey);
            return value != null ? Long.parseLong(value) : 0L;
        } catch (Exception e) {
            AtomicLong al = localFallback.get(redisKey);
            return al != null ? al.get() : 0L;
        }
    }

    private String buildRedisKey(String hospitalId, String seriesKey, String year) {
        if (year != null) {
            return "number_series:" + hospitalId + ":" + seriesKey + ":" + year;
        }
        return "number_series:" + hospitalId + ":" + seriesKey;
    }
}
