package br.com.pjcode.biolab.util;

import java.text.ParseException;

import javax.swing.text.MaskFormatter;

public final class MaskUtil {

	private MaskUtil() {
		 throw new IllegalStateException("Utility class");
	}

	public static String includeMask(String cpfCpnj, String pattern) {
		try {
			MaskFormatter mask = new MaskFormatter(pattern);
			mask.setValueContainsLiteralCharacters(false);
			return mask.valueToString(cpfCpnj);
		} catch (ParseException e) {
			return null;
		}
	}
}
