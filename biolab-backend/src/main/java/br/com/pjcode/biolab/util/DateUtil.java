package br.com.pjcode.biolab.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class DateUtil {

	private DateUtil() {
		 throw new IllegalStateException("Utility class");
	}

	public static LocalDate convertDateStringToLocalDate(String dataString) {
		String [] data = dataString.split("T");
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		try {
			return LocalDate.parse(data[0], formatter);
		} catch (RuntimeException e) {
			return null;
		}
	}

	public static String convertLocalDateToStringDate(LocalDate date) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		try {
			return date.format(formatter);
		} catch (RuntimeException e) {
			return null;
		}
	}

	public static String convertLocalDateToString(LocalDateTime date, String pattern) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		try {
			return date.format(formatter);
		} catch (RuntimeException e) {
			return null;
		}
	}

	public static String convertLocalDateToString(LocalDate date, String pattern) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		try {
			return date.format(formatter);
		} catch (RuntimeException e) {
			return null;
		}
	}

	 public static boolean validate(LocalDate date) {
		try {
			return (date.isEqual(LocalDate.now()) || date.isAfter(LocalDate.now()));
		} catch (RuntimeException e) {
			return false;
		}
	  }
}
