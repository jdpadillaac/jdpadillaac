import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:jdpadillac/ui/constants/colors.dart';

class AppTheme {
  static ThemeData mainTheme() {
    return ThemeData(
      colorScheme: const ColorScheme(
        primary: AppColors.primary,
        primaryVariant: AppColors.primary,
        secondary: AppColors.secundary,
        secondaryVariant: AppColors.secundary,
        surface: AppColors.gray,
        background: AppColors.white,
        error: Colors.white,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: AppColors.grayDark,
        onBackground: Colors.white,
        onError: Colors.white,
        brightness: Brightness.light,
      ),
      textTheme: TextTheme(
        headline1: GoogleFonts.montserrat(
          color: AppColors.primary,
        ),
        headline2: GoogleFonts.montserrat(
          color: AppColors.secundary,
          fontWeight: FontWeight.w600,
        ),
        headline3: GoogleFonts.montserrat(
          color: AppColors.secundary,
          fontWeight: FontWeight.w400,
        ),
        subtitle1: GoogleFonts.montserrat(
          color: AppColors.primary,
          fontWeight: FontWeight.w700,
        ),
        bodyText1: GoogleFonts.montserrat(
          color: AppColors.primary,
        ),
        bodyText2: GoogleFonts.montserrat(
          color: AppColors.secundary,
        ),
      ),
    );
  }

  static ThemeData darkTheme() {
    return ThemeData(
      primaryColor: AppColors.primary,
      textTheme: TextTheme(
        subtitle1: GoogleFonts.montserrat(
          color: AppColors.primary,
          fontWeight: FontWeight.w700,
        ),
        bodyText1: GoogleFonts.montserrat(
          color: Colors.white,
        ),
      ),
    );
  }
}
